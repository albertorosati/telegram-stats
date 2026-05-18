// =============================================================================
// UNIFIED WORKER — Telegram Wrapped
// Runs ZIP decompression, JSON parse, media extraction, and analytics engine
// in a single Worker. Posts progress updates and returns WrappedData + media
// buffers for main thread to create blob URLs.
//
// This worker has NO DOM dependencies — safe for Web Worker context.
// =============================================================================

import JSZip from 'jszip';
import type { TelegramExport, TelegramMessage } from '../analytics/types';
import { runAnalytics } from '../analytics/engine';
import type { WorkerRequest, WorkerResponse } from './types';

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------

const MEDIA_EXTENSIONS = new Set([
  'webp', 'webm', 'jpg', 'jpeg', 'png', 'gif', 'mp4', 'ogg', 'oga', 'opus',
]);

const EXT_TO_MIME: Record<string, string> = {
  webp: 'image/webp',
  webm: 'video/webm',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  mp4: 'video/mp4',
  ogg: 'audio/ogg',
  oga: 'audio/ogg',
  opus: 'audio/ogg; codecs=opus',
};

function isMediaFile(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return MEDIA_EXTENSIONS.has(ext);
}

function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return EXT_TO_MIME[ext] ?? 'application/octet-stream';
}

function normalizeZipPath(p: string): string {
  return p.replace(/^\.\//, '');
}

// ---------------------------------------------------------------------------
// PROGRESS HELPER
// ---------------------------------------------------------------------------

function postProgress(step: string, percent: number): void {
  const msg: WorkerResponse = { type: 'progress', step, percent };
  self.postMessage(msg);
}

// ---------------------------------------------------------------------------
// RESULT.JSON FINDER
// ---------------------------------------------------------------------------

function findResultJson(zip: JSZip): { file: JSZip.JSZipObject; prefix: string } | null {
  const root = zip.file('result.json');
  if (root) return { file: root, prefix: '' };

  let found: { file: JSZip.JSZipObject; prefix: string } | null = null;
  zip.forEach((relativePath, file) => {
    if (!found && relativePath.endsWith('result.json') && !file.dir) {
      const prefix = relativePath.slice(0, -'result.json'.length);
      found = { file, prefix };
    }
  });
  return found;
}

// ---------------------------------------------------------------------------
// MAIN HANDLER
// ---------------------------------------------------------------------------

async function handleParseAndAnalyze(fileBuffer: ArrayBuffer): Promise<void> {
  // ── Step 1: Decompress ZIP ────────────────────────────────────────────────
  postProgress('Decompressing ZIP…', 5);
  const zip = await JSZip.loadAsync(fileBuffer);

  // ── Step 2: Find and parse result.json ───────────────────────────────────
  postProgress('Reading result.json…', 15);
  const resultInfo = findResultJson(zip);
  if (!resultInfo) {
    throw new Error(
      'result.json not found in the archive. ' +
      'Make sure you are uploading a valid Telegram chat export ZIP.',
    );
  }

  const { file: resultFile, prefix: zipPrefix } = resultInfo;
  const jsonText = await resultFile.async('text');

  let exportData: TelegramExport;
  try {
    exportData = JSON.parse(jsonText) as TelegramExport;
  } catch {
    throw new Error('result.json is not valid JSON. The export file may be corrupted.');
  }

  const messages: TelegramMessage[] = exportData.messages ?? [];
  const chatName: string = exportData.name ?? 'Chat';

  if (messages.length === 0) {
    throw new Error('No messages found in result.json.');
  }

  // ── Step 3: Collect referenced media paths ───────────────────────────────
  postProgress('Collecting media paths…', 25);

  const referencedPaths = new Set<string>();
  for (const msg of messages) {
    if (msg.file) referencedPaths.add(normalizeZipPath(msg.file));
    if (msg.photo) referencedPaths.add(normalizeZipPath(msg.photo));
    if (msg.thumbnail) referencedPaths.add(normalizeZipPath(msg.thumbnail));
  }

  // ── Step 4: Extract media as ArrayBuffers ────────────────────────────────
  postProgress('Extracting media files…', 35);

  const zipEntries: Array<{
    originalPath: string;
    zipKey: string;
    strippedKey: string;
    zipObj: JSZip.JSZipObject;
  }> = [];

  zip.forEach((relativePath, zipObj) => {
    if (zipObj.dir) return;
    if (!isMediaFile(relativePath)) return;

    const normalised = normalizeZipPath(relativePath);
    const stripped = zipPrefix && normalised.startsWith(zipPrefix)
      ? normalised.slice(zipPrefix.length)
      : normalised;
    zipEntries.push({ originalPath: relativePath, zipKey: normalised, strippedKey: stripped, zipObj });
  });

  // Only load files referenced in messages
  const entriesToLoad = zipEntries.filter(
    (e) =>
      referencedPaths.has(e.zipKey) ||
      referencedPaths.has(e.originalPath) ||
      referencedPaths.has(e.strippedKey),
  );

  // Build a path → placeholder map for the analytics engine
  // (engine uses these as keys; main thread will remap to real blob URLs)
  const pathPlaceholderMap = new Map<string, string>();

  const mediaBuffers: Array<{ path: string; buffer: ArrayBuffer; mime: string }> = [];
  const total = entriesToLoad.length;

  for (let i = 0; i < total; i++) {
    const { originalPath, zipKey, strippedKey, zipObj } = entriesToLoad[i];

    if (i % 20 === 0) {
      postProgress(`Loading media… (${i}/${total})`, 35 + Math.floor((i / total) * 35));
    }

    const uint8 = await zipObj.async('uint8array');
    const mime = getMimeType(originalPath);

    // Use the strippedKey as the canonical path for blob URL mapping
    const canonicalPath = strippedKey;
    const buffer = uint8.buffer.slice(0) as ArrayBuffer;
    mediaBuffers.push({ path: canonicalPath, buffer, mime });

    // Map all path variants to the canonical path placeholder
    const placeholder = `__media__${canonicalPath}`;
    pathPlaceholderMap.set(originalPath, placeholder);
    pathPlaceholderMap.set(zipKey, placeholder);
    if (strippedKey !== zipKey) {
      pathPlaceholderMap.set(strippedKey, placeholder);
    }
  }

  // ── Step 5: Run analytics engine ─────────────────────────────────────────
  postProgress('Crunching numbers…', 75);
  const wrappedData = runAnalytics(messages, pathPlaceholderMap, chatName);

  postProgress('Preparing results…', 95);

  // ── Step 6: Send results back ────────────────────────────────────────────
  // Transfer ArrayBuffers for zero-copy
  const transferables = mediaBuffers.map((m) => m.buffer);

  const response: WorkerResponse = {
    type: 'result',
    wrappedData,
    mediaBuffers,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (self.postMessage as (message: unknown, transfer: Transferable[]) => void)(response, transferables);
}

// ---------------------------------------------------------------------------
// MESSAGE LISTENER
// ---------------------------------------------------------------------------

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;

  try {
    switch (request.type) {
      case 'parse-and-analyze':
        await handleParseAndAnalyze(request.fileBuffer);
        break;
      default:
        throw new Error(`Unknown worker request type: ${(request as WorkerRequest).type}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown worker error';
    const response: WorkerResponse = { type: 'error', message };
    self.postMessage(response);
  }
};
