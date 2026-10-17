// =============================================================================
// Rate Limiting Constants
// =============================================================================

/** Rate limits per user per minute */
export const RATE_LIMITS = {
  /** General API endpoints */
  GENERAL: {
    windowMs: 60_000,
    max: 60,
  },
  /** Document upload — strict limit */
  DOCUMENT_UPLOAD: {
    windowMs: 60_000,
    max: 5,
  },
  /** Document analysis — expensive AI operation */
  DOCUMENT_ANALYSIS: {
    windowMs: 3_600_000, // 1 hour
    max: 10,
  },
  /** AI conversation / Q&A */
  CONVERSATION: {
    windowMs: 60_000,
    max: 20,
  },
  /** Auth endpoints — brute force prevention */
  AUTH: {
    windowMs: 900_000, // 15 minutes
    max: 10,
  },
} as const;
