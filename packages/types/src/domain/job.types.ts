// =============================================================================
// Background Job Domain Types
// =============================================================================

export type JobId = string;

export enum JobType {
  DOCUMENT_PROCESS = "document.process",
  DOCUMENT_OCR = "document.ocr",
  DOCUMENT_CLASSIFY = "document.classify",
  DOCUMENT_EXTRACT = "document.extract",
  DOCUMENT_ANALYZE = "document.analyze",
  DOCUMENT_TRANSLATE = "document.translate",
  DOCUMENT_DELETE = "document.delete",
  EMBED_LEGAL_SOURCE = "legal.embed",
  SEND_NOTIFICATION = "notification.send",
}

export enum JobStatus {
  WAITING = "waiting",
  ACTIVE = "active",
  COMPLETED = "completed",
  FAILED = "failed",
  DELAYED = "delayed",
  STALLED = "stalled",
}

export interface JobRecord {
  readonly id: JobId;
  readonly type: JobType;
  readonly status: JobStatus;
  readonly progress: number; // 0–100
  readonly errorMessage: string | null;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly createdAt: string;
  readonly startedAt: string | null;
  readonly completedAt: string | null;
}

// Typed payloads for each job type
export interface DocumentProcessJobPayload {
  readonly documentId: string;
  readonly userId: string;
  readonly storagePath: string;
}

export interface DocumentDeleteJobPayload {
  readonly documentId: string;
  readonly userId: string;
  readonly storagePath: string;
  /** Derived data paths to also clean up */
  readonly derivedPaths: string[];
}

export interface EmbedLegalSourceJobPayload {
  readonly sourceId: string;
  readonly chunkIds: string[];
}
