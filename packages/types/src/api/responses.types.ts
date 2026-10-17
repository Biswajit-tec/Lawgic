// =============================================================================
// API Response Types — Standardized response envelopes
// Never return raw internal errors or stack traces to clients.
// =============================================================================

export interface SuccessResponse<T> {
  readonly success: true;
  readonly data: T;
  readonly requestId: string;
  readonly timestamp: string;
}

export interface ErrorResponse {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string; // safe, non-sensitive message
    readonly details?: Record<string, unknown>; // validation errors etc.
  };
  readonly requestId: string;
  readonly timestamp: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

/** Standard API error codes */
export enum ApiErrorCode {
  // Auth
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",

  // Validation
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_REQUEST = "INVALID_REQUEST",

  // Resources
  NOT_FOUND = "NOT_FOUND",
  ALREADY_EXISTS = "ALREADY_EXISTS",

  // Documents
  DOCUMENT_TOO_LARGE = "DOCUMENT_TOO_LARGE",
  UNSUPPORTED_FILE_TYPE = "UNSUPPORTED_FILE_TYPE",
  DOCUMENT_PROCESSING_FAILED = "DOCUMENT_PROCESSING_FAILED",

  // Rate limiting
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",

  // Server
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",

  // Business
  QUOTA_EXCEEDED = "QUOTA_EXCEEDED",
}

/** Health check response */
export interface HealthCheckResponse {
  readonly status: "healthy" | "degraded" | "unhealthy";
  readonly version: string;
  readonly timestamp: string;
  readonly services: Record<string, ServiceHealth>;
}

export interface ServiceHealth {
  readonly status: "up" | "down" | "degraded";
  readonly latencyMs?: number;
  readonly message?: string;
}
