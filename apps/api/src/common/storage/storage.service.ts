// =============================================================================
// Storage Service Interface — Abstraction over S3 / Local storage
// The application MUST NOT depend on a specific storage provider.
// Add new providers by implementing this interface.
// =============================================================================

export interface StorageUploadOptions {
  readonly contentType: string;
  readonly maxSizeBytes?: number;
  /** If true, the file is never publicly accessible */
  readonly private?: boolean;
}

export interface PresignedUploadUrl {
  readonly url: string;
  readonly fields?: Record<string, string>; // for S3 multipart
  readonly expiresAt: string;
}

export interface PresignedDownloadUrl {
  readonly url: string;
  readonly expiresAt: string;
}

export abstract class StorageService {
  /**
   * Generates a short-lived presigned URL for client-side upload.
   * The client uploads directly to storage — API never handles raw bytes.
   */
  abstract getPresignedUploadUrl(
    storageKey: string,
    options: StorageUploadOptions,
  ): Promise<PresignedUploadUrl>;

  /**
   * Generates a short-lived presigned download URL.
   * NEVER return permanent public URLs for user documents.
   */
  abstract getPresignedDownloadUrl(
    storageKey: string,
    expirySeconds: number,
  ): Promise<PresignedDownloadUrl>;

  /** Deletes a file from storage */
  abstract deleteFile(storageKey: string): Promise<void>;

  /** Deletes multiple files (for cleanup on document deletion) */
  abstract deleteFiles(storageKeys: string[]): Promise<void>;

  /** Checks if a file exists */
  abstract fileExists(storageKey: string): Promise<boolean>;
}
