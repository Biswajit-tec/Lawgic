// =============================================================================
// Application Constants
// =============================================================================

export const APP_NAME = "LAWgic" as const;
export const APP_VERSION = "0.1.0" as const;

/** API versioning prefix */
export const API_V1_PREFIX = "/api/v1" as const;

/** Internal service communication prefix (not exposed externally) */
export const INTERNAL_API_PREFIX = "/internal" as const;

/** AI service internal port */
export const AI_SERVICE_DEFAULT_PORT = 8001 as const;

/** Worker service */
export const WORKER_DEFAULT_PORT = 3002 as const;

/** Supported environments */
export const ENVIRONMENTS = ["development", "test", "staging", "production"] as const;
export type Environment = (typeof ENVIRONMENTS)[number];

/** Default pagination */
export const DEFAULT_PAGE_SIZE = 20 as const;
export const MAX_PAGE_SIZE = 100 as const;

/** Storage key prefixes — never use user-provided filenames as paths */
export const STORAGE_PREFIXES = {
  DOCUMENTS: "documents/",
  THUMBNAILS: "thumbnails/",
  PROCESSED: "processed/",
} as const;

/** Signed URL expiry times */
export const SIGNED_URL_EXPIRY_SECONDS = {
  UPLOAD: 300, // 5 minutes
  DOWNLOAD: 900, // 15 minutes
  THUMBNAIL: 3600, // 1 hour
} as const;

/** Processing pipeline timeouts (ms) */
export const PIPELINE_TIMEOUTS_MS = {
  OCR: 120_000, // 2 minutes
  CLASSIFICATION: 30_000,
  EXTRACTION: 60_000,
  ANALYSIS: 120_000,
  TRANSLATION: 60_000,
} as const;
