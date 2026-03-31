// =============================================================================
// PARSER — Telegram Wrapped
// Reads a Telegram export ZIP using JSZip, extracts result.json and all
// media/sticker files, converts them to blob URLs, then delegates to the
// analytics engine.
//
// IMPORTANT: This file is browser-only (uses File, Blob, URL.createObjectURL).
//            Do NOT import it in any server component or API route.
// =============================================================================

import JSZip from 'jszip';
import type { TelegramExport, TelegramMessage, WrappedData, ProgressCallback } from './types';
import { runAnalytics } from './engine';

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
// MAIN PARSE FUNCTION
// ---------------------------------------------------------------------------

/**
 * Parses a Telegram export ZIP file and returns fully-computed WrappedData.
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
    // Strip the zip prefix so we can match against msg.file paths
    const stripped = zipPrefix && normalised.startsWith(zipPrefix)
      ? normalised.slice(zipPrefix.length)
      : normalised;
    zipEntries.push({ originalPath: relativePath, zipKey: normalised, strippedKey: stripped, zipObj });
  });

  // Only load files that are actually referenced in messages (privacy + perf)
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

    // Map all path variants so lookup always works
    blobUrlMap.set(originalPath, blobUrl);
    blobUrlMap.set(zipKey, blobUrl);
    if (strippedKey !== zipKey) {
      blobUrlMap.set(strippedKey, blobUrl);
    }
  }

  // ── Step 5: Re-map message file paths to blob URLs ─────────────────────
  // We keep original paths as keys in blobUrlMap and let the engine look them up.
  // No mutation of the message objects is needed.

  // ── Step 6: Run analytics engine ─────────────────────────────────────────
  report('Crunching numbers…', 78);
  const wrappedData = runAnalytics(messages, blobUrlMap, chatName);

  report('Done!', 100);
  return wrappedData;
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
