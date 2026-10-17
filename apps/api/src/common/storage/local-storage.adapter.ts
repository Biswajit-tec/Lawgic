import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "crypto";
import { StorageService, type StorageUploadOptions, type PresignedUploadUrl, type PresignedDownloadUrl } from "./storage.service";
import { SIGNED_URL_EXPIRY_SECONDS } from "@lawgic/config";

// =============================================================================
// Local Storage Adapter — Development Only
// Simulates presigned URL flow for local development without AWS costs.
// NEVER use in production for real user documents.
// Production: replace with S3StorageAdapter via dependency injection.
// =============================================================================

@Injectable()
export class LocalStorageAdapter extends StorageService {
  private readonly logger = new Logger(LocalStorageAdapter.name);
  private readonly uploadDir: string;

  constructor(private readonly configService: ConfigService) {
    super();
    this.uploadDir = process.env["LOCAL_STORAGE_PATH"] ?? "./tmp/storage";
    this.logger.warn("[LocalStorageAdapter] Using LOCAL storage — development only, NOT for production");
  }

  async getPresignedUploadUrl(
    storageKey: string,
    _options: StorageUploadOptions,
  ): Promise<PresignedUploadUrl> {
    // In development, return a fake presigned URL pointing to local upload endpoint
    const token = randomUUID();
    return {
      url: `http://localhost:${this.configService.get("PORT") ?? 3001}/api/v1/internal/upload/${encodeURIComponent(storageKey)}?token=${token}`,
      expiresAt: new Date(Date.now() + SIGNED_URL_EXPIRY_SECONDS.UPLOAD * 1000).toISOString(),
    };
  }

  async getPresignedDownloadUrl(storageKey: string, expirySeconds: number): Promise<PresignedDownloadUrl> {
    const token = randomUUID();
    return {
      url: `http://localhost:${this.configService.get("PORT") ?? 3001}/api/v1/internal/download/${encodeURIComponent(storageKey)}?token=${token}`,
      expiresAt: new Date(Date.now() + expirySeconds * 1000).toISOString(),
    };
  }

  async deleteFile(storageKey: string): Promise<void> {
    this.logger.log({ event: "local_storage_delete", storageKey });
    // TODO: Implement actual local file deletion
  }

  async deleteFiles(storageKeys: string[]): Promise<void> {
    for (const key of storageKeys) {
      await this.deleteFile(key);
    }
  }

  async fileExists(_storageKey: string): Promise<boolean> {
    return false; // TODO: Implement local file existence check
  }
}
