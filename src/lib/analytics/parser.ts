// =============================================================================
// PARSER — Telegram Wrapped
// Reads a Telegram export ZIP using JSZip, extracts result.json and all
// media/sticker files, converts them to blob URLs, then delegates to the
// analytics engine.
//
// IMPORTANT: This file is browser-only (uses File, Blob, URL.createObjectURL).
//            Do NOT import it in any server component or API route.
//
// ARCHITECTURE: Uses a Web Worker for heavy lifting (ZIP decompress, JSON parse,
// analytics). Falls back to synchronous main-thread processing if Workers are
// unavailable. Blob URLs are always created on the main thread (DOM requirement).
// =============================================================================

import JSZip from 'jszip';
import type { TelegramExport, TelegramMessage, WrappedData, ProgressCallback } from './types';
import { runAnalytics } from './engine';
import type { WorkerRequest, WorkerResponse, WorkerResultMessage } from '../workers/types';

// ---------------------------------------------------------------------------
// SUPPORTED STICKER / MEDIA EXTENSIONS
// ---------------------------------------------------------------------------
const MEDIA_EXTENSIONS = new Set([
  'webp',  // static sticker
  'webm',  // animated sticker
  'jpg', 'jpeg', 'png', 'gif', 'mp4',  // photos / videos
  'ogg', 'oga', 'opus',                 // voice messages
]);

function isMediaFile(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return MEDIA_EXTENSIONS.has(ext);
}

// ---------------------------------------------------------------------------
// MIME TYPE HELPER
// ---------------------------------------------------------------------------
const EXT_TO_MIME: Record<string, string> = {
  webp:  'image/webp',
  webm:  'video/webm',
  jpg:   'image/jpeg',
  jpeg:  'image/jpeg',
  png:   'image/png',
  gif:   'image/gif',
  mp4:   'video/mp4',
  ogg:   'audio/ogg',
  oga:   'audio/ogg',
  opus:  'audio/ogg; codecs=opus',
};

function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return EXT_TO_MIME[ext] ?? 'application/octet-stream';
}

// ---------------------------------------------------------------------------
// BLOB URL REGISTRY
// Call revokeAllBlobUrls() when the user leaves the wrapped page
// to free browser memory.
// ---------------------------------------------------------------------------

const _activeBlobUrls: string[] = [];
const _trackedBlobs = new Map<string, Blob>();

export function revokeAllBlobUrls(): void {
  for (const url of _activeBlobUrls) {
    URL.revokeObjectURL(url);
    _trackedBlobs.delete(url);
  }
  _activeBlobUrls.length = 0;
}

export function getTrackedBlob(url: string): Blob | null {
  return _trackedBlobs.get(url) ?? null;
}

function createAndTrackBlobUrl(blob: Blob): string {
  const url = URL.createObjectURL(blob);
  _activeBlobUrls.push(url);
  _trackedBlobs.set(url, blob);
  return url;
}

// ---------------------------------------------------------------------------
// RESULT.JSON FINDER
// ---------------------------------------------------------------------------

/**
 * Finds `result.json` inside the zip regardless of nesting depth.
 * Returns the JSZip file object and the folder prefix (empty string if root-level).
 */
function findResultJson(zip: JSZip): { file: JSZip.JSZipObject; prefix: string } | null {
  // Try root-level first (most common Telegram export structure)
  const root = zip.file('result.json');
  if (root) return { file: root, prefix: '' };

  // Walk all entries and find by name
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
// WEB WORKER PATH (off-thread processing for 60fps UI)
// ---------------------------------------------------------------------------

/**
 * Remaps placeholder paths in WrappedData to real blob URLs.
 * The worker returns paths like "__media__stickers/file_0.webp" which we
 * convert to blob: URLs on the main thread.
 */
function remapBlobUrls(
  wrappedData: WrappedData,
  placeholderToBlobUrl: Map<string, string>,
): WrappedData {
  // Deep-clone via structured clone to avoid mutating the worker's output
  // (structured clone is fast for plain objects)
  const data = structuredClone(wrappedData);

  // Helper to remap a single URL field
  const remap = (url: string | undefined): string => {
    if (!url) return '';
    if (placeholderToBlobUrl.has(url)) return placeholderToBlobUrl.get(url)!;
    return url;
  };

  // Remap sticker blob URLs
  if (data.stickers) {
    data.stickers.holyTrinity = data.stickers.holyTrinity.map((s) => ({
      ...s,
      blobUrl: remap(s.blobUrl),
    }));
    data.stickers.museumEntries = data.stickers.museumEntries.map((s) => ({
      ...s,
      blobUrl: remap(s.blobUrl),
    }));
    data.stickers.mosaicUrls = data.stickers.mosaicUrls.map(remap);

    if (data.stickers.firstSticker) {
      data.stickers.firstSticker.blobUrl = remap(data.stickers.firstSticker.blobUrl);
    }
    if (data.stickers.lastSticker) {
      data.stickers.lastSticker.blobUrl = remap(data.stickers.lastSticker.blobUrl);
    }

    for (const key of Object.keys(data.stickers.byUser)) {
      const userStickers = data.stickers.byUser[key];
      userStickers.podium = userStickers.podium.map((s) => ({
        ...s,
        blobUrl: remap(s.blobUrl),
      }));
      userStickers.onesies = userStickers.onesies.map((s) => ({
        ...s,
        blobUrl: remap(s.blobUrl),
      }));
    }
  }

  // Remap sticker timeline
  if (data.global.stickerTimeline) {
    data.global.stickerTimeline = data.global.stickerTimeline.map((entry) => ({
      ...entry,
      topStickerBlobUrl: remap(entry.topStickerBlobUrl),
    }));
  }

  // Remap monthly journey sticker URLs
  if (data.global.monthlyJourney) {
    data.global.monthlyJourney = data.global.monthlyJourney.map((entry) => ({
      ...entry,
      stickerBlobUrl: entry.stickerBlobUrl ? remap(entry.stickerBlobUrl) : undefined,
    }));
  }

  // Remap monthly snapshots sticker URLs
  if (data.global.monthlySnapshots) {
    data.global.monthlySnapshots = data.global.monthlySnapshots.map((snap) => ({
      ...snap,
      topStickers: snap.topStickers.map((s) => ({
        ...s,
        blobUrl: remap(s.blobUrl),
      })),
    }));
  }

  return data;
}

/**
 * Parses using a Web Worker — keeps UI thread at 60fps.
 */
function parseWithWorker(
  file: File,
  onProgress?: ProgressCallback,
): Promise<WrappedData> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('../workers/parse.worker.ts', import.meta.url),
      { type: 'module' },
    );

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const msg = event.data;

      switch (msg.type) {
        case 'progress':
          onProgress?.(msg.step, msg.percent);
          break;

        case 'result': {
          const { wrappedData, mediaBuffers } = msg as WorkerResultMessage;

          // Create blob URLs on main thread from transferred ArrayBuffers
          const placeholderToBlobUrl = new Map<string, string>();
          for (const { path, buffer, mime } of mediaBuffers) {
            const blob = new Blob([new Uint8Array(buffer)], { type: mime });
            const blobUrl = createAndTrackBlobUrl(blob);
            placeholderToBlobUrl.set(`__media__${path}`, blobUrl);
          }

          // Remap placeholder paths to real blob URLs in the WrappedData
          const finalData = remapBlobUrls(wrappedData, placeholderToBlobUrl);

          onProgress?.('Done!', 100);
          worker.terminate();
          resolve(finalData);
          break;
        }

        case 'error':
          worker.terminate();
          reject(new Error(msg.message));
          break;
      }
    };

    worker.onerror = (event) => {
      worker.terminate();
      reject(new Error(event.message || 'Worker failed unexpectedly'));
    };

    // Transfer the file as ArrayBuffer (zero-copy to worker)
    file.arrayBuffer().then((buffer) => {
      const request: WorkerRequest = {
        type: 'parse-and-analyze',
        fileBuffer: buffer,
        fileName: file.name,
      };
      worker.postMessage(request, [buffer]);
    }).catch(reject);
  });
}

// ---------------------------------------------------------------------------
// FALLBACK: MAIN-THREAD PARSE (no Worker available)
// ---------------------------------------------------------------------------

/**
 * Synchronous fallback — same logic as before, runs on main thread.
 * Used when Web Workers are unavailable (e.g., some privacy browsers).
 */
async function parseOnMainThread(
  file: File,
  onProgress?: ProgressCallback,
): Promise<WrappedData> {
  const report = (step: string, pct: number) => onProgress?.(step, pct);

  // ── Step 1: Load zip ──────────────────────────────────────────────────────
  report('Decompressing ZIP…', 5);
  const zip = await JSZip.loadAsync(file);

  // ── Step 2: Find and parse result.json ───────────────────────────────────
  report('Reading result.json…', 15);
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

  // ── Step 3: Collect all file paths referenced in messages ─────────────────
  report('Collecting media paths…', 25);

  const referencedPaths = new Set<string>();
  for (const msg of messages) {
    if (msg.file) referencedPaths.add(normalizeZipPath(msg.file));
    if (msg.photo) referencedPaths.add(normalizeZipPath(msg.photo));
    if (msg.thumbnail) referencedPaths.add(normalizeZipPath(msg.thumbnail));
  }

  // ── Step 4: Resolve matching zip entries → blob URLs ─────────────────────
  report('Generating media blob URLs…', 35);

  const blobUrlMap = new Map<string, string>();
  const zipEntries: Array<{ originalPath: string; zipKey: string; strippedKey: string; zipObj: JSZip.JSZipObject }> = [];

  zip.forEach((relativePath, zipObj) => {
    if (zipObj.dir) return;
    if (!isMediaFile(relativePath)) return;

    const normalised = normalizeZipPath(relativePath);
    const stripped = zipPrefix && normalised.startsWith(zipPrefix)
      ? normalised.slice(zipPrefix.length)
      : normalised;
    zipEntries.push({ originalPath: relativePath, zipKey: normalised, strippedKey: stripped, zipObj });
  });

  const entriesToLoad = zipEntries.filter(
    (e) =>
      referencedPaths.has(e.zipKey) ||
      referencedPaths.has(e.originalPath) ||
      referencedPaths.has(e.strippedKey),
  );

  const total = entriesToLoad.length;
  for (let i = 0; i < total; i++) {
    const { originalPath, zipKey, strippedKey, zipObj } = entriesToLoad[i];

    if (i % 20 === 0) {
      report(`Loading media… (${i}/${total})`, 35 + Math.floor((i / total) * 40));
    }

    const uint8 = await zipObj.async('uint8array');
    const mime = getMimeType(originalPath);
    const normalizedUint8 = new Uint8Array(uint8);
    const blob = new Blob([normalizedUint8], { type: mime });
    const blobUrl = createAndTrackBlobUrl(blob);

    blobUrlMap.set(originalPath, blobUrl);
    blobUrlMap.set(zipKey, blobUrl);
    if (strippedKey !== zipKey) {
      blobUrlMap.set(strippedKey, blobUrl);
    }
  }

  // ── Step 5: Run analytics engine ─────────────────────────────────────────
  report('Crunching numbers…', 78);
  const wrappedData = runAnalytics(messages, blobUrlMap, chatName);

  report('Done!', 100);
  return wrappedData;
}

// ---------------------------------------------------------------------------
// MAIN PARSE FUNCTION (public API — unchanged signature)
// ---------------------------------------------------------------------------

/**
 * Parses a Telegram export ZIP file and returns fully-computed WrappedData.
 *
 * Uses a Web Worker for off-thread processing when available.
 * Falls back to main-thread processing otherwise.
 *
 * @param file      - The File object from an <input type="file"> or drag-drop
 * @param onProgress - Optional callback for progress updates (step name, 0-100)
 * @returns         - WrappedData ready to be consumed by React components
 * @throws          - Error if result.json is not found or JSON is malformed
 */
export async function parseZipFile(
  file: File,
  onProgress?: ProgressCallback,
): Promise<WrappedData> {
  // Use Web Worker if available (keeps UI at 60fps)
  if (typeof Worker !== 'undefined') {
    try {
      return await parseWithWorker(file, onProgress);
    } catch (err) {
      // If worker fails to instantiate (CSP, bundling issues), fall back
      console.warn('[Telegram Wrapped] Worker failed, falling back to main thread:', err);
    }
  }

  // Fallback: run on main thread
  return parseOnMainThread(file, onProgress);
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

/**
 * Normalizes a file path from Telegram export format to a consistent key.
 * Telegram uses paths like "./stickers/file_0.webp" or "stickers/file_0.webp".
 */
function normalizeZipPath(p: string): string {
  return p.replace(/^\.\//, '');
}
