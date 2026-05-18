// =============================================================================
// WORKER MESSAGE PROTOCOL — Telegram Wrapped
// Typed discriminated unions for communication between main thread and worker.
// =============================================================================

import type { TelegramMessage, WrappedData } from '../analytics/types';

// ---------------------------------------------------------------------------
// Main Thread → Worker
// ---------------------------------------------------------------------------

export interface ParseAndAnalyzeRequest {
  type: 'parse-and-analyze';
  /** The raw ZIP file as ArrayBuffer (Transferable) */
  fileBuffer: ArrayBuffer;
  fileName: string;
}

export type WorkerRequest = ParseAndAnalyzeRequest;

// ---------------------------------------------------------------------------
// Worker → Main Thread
// ---------------------------------------------------------------------------

export interface WorkerProgressMessage {
  type: 'progress';
  step: string;
  percent: number;
}

export interface WorkerResultMessage {
  type: 'result';
  /** WrappedData with blobUrl fields set to original file paths (not blob URLs).
   *  Main thread will remap paths → blob URLs using the media buffers. */
  wrappedData: WrappedData;
  /** Map of file path → ArrayBuffer for media files that need blob URLs */
  mediaBuffers: Array<{ path: string; buffer: ArrayBuffer; mime: string }>;
}

export interface WorkerErrorMessage {
  type: 'error';
  message: string;
}

export type WorkerResponse = WorkerProgressMessage | WorkerResultMessage | WorkerErrorMessage;
