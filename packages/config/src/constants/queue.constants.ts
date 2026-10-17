// =============================================================================
// BullMQ Queue Names — Used by both API and Worker
// Keeping queue names in shared config prevents string duplication
// =============================================================================

export const QUEUE_NAMES = {
  DOCUMENT_PROCESSING: "document.processing",
  DOCUMENT_DELETION: "document.deletion",
  LEGAL_SOURCE_EMBEDDING: "legal.embedding",
  NOTIFICATIONS: "notifications",
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];

export const JOB_NAMES = {
  PROCESS_DOCUMENT: "process_document",
  OCR_DOCUMENT: "ocr_document",
  CLASSIFY_DOCUMENT: "classify_document",
  EXTRACT_DOCUMENT: "extract_document",
  ANALYZE_DOCUMENT: "analyze_document",
  TRANSLATE_ANALYSIS: "translate_analysis",
  DELETE_DOCUMENT: "delete_document",
  EMBED_CHUNK: "embed_chunk",
  SEND_EMAIL: "send_email",
  SEND_PUSH: "send_push",
} as const;

export type JobName = (typeof JOB_NAMES)[keyof typeof JOB_NAMES];

/** Default BullMQ job options */
export const DEFAULT_JOB_OPTIONS = {
  attempts: 3,
  backoff: {
    type: "exponential" as const,
    delay: 5000,
  },
  removeOnComplete: { count: 100 },
  removeOnFail: { count: 500 },
};
