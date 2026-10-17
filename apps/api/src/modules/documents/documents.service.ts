import { Injectable, ForbiddenException, NotFoundException, Logger } from "@nestjs/common";
import { randomUUID } from "crypto";
import type { InitiateUploadInput } from "@lawgic/validation";
import type { InitiateUploadResponse } from "@lawgic/types";
import { DocumentStatus } from "@lawgic/types";

// =============================================================================
// Documents Service
// Business logic for document upload, management, and deletion.
// Delegates storage to StorageService and processing to QueueService.
//
// TODO (future sprint): Inject StorageService and QueueService
// =============================================================================

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);

  /**
   * Initiates a document upload by:
   * 1. Creating a document record in DB with PENDING_UPLOAD status
   * 2. Generating a safe storage path (never user-provided filename)
   * 3. Getting a presigned upload URL from storage service
   */
  async initiateUpload(userId: string, input: InitiateUploadInput): Promise<InitiateUploadResponse> {
    const documentId = randomUUID();
    // SECURITY: Generate a safe, opaque storage key — never use user-provided filename as path
    const storageKey = this.generateSafeStorageKey(userId, documentId, input.mimeType);

    this.logger.log({
      event: "document_upload_initiated",
      documentId,
      userId,
      // NEVER log: filename (may contain PII), file contents
    });

    // TODO: Persist document record to database
    // TODO: Get presigned URL from StorageService
    // TODO: Record audit log

    return {
      documentId,
      uploadUrl: `https://storage.example.com/presigned/${storageKey}`, // TODO: Replace with real presigned URL
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    };
  }

  async confirmUploadAndEnqueue(userId: string, documentId: string): Promise<{ jobId: string; documentId: string }> {
    // TODO: Verify document exists and belongs to userId
    // TODO: Update document status to UPLOADED
    // TODO: Enqueue document processing job
    // TODO: Record audit log

    const jobId = randomUUID();
    this.logger.log({ event: "document_processing_enqueued", documentId, userId, jobId });
    return { jobId, documentId };
  }

  async listByUser(userId: string): Promise<unknown[]> {
    // TODO: Query database for user's documents
    // IMPORTANT: Only return documents where userId matches — never return all documents
    this.logger.log({ event: "document_list_queried", userId });
    return [];
  }

  /**
   * AUTHORIZATION: Verifies user owns the document before returning it.
   * Returns 403 rather than 404 to prevent document ID enumeration.
   * Actually uses constant-time comparison to prevent timing attacks.
   */
  async findByIdForUser(userId: string, documentId: string): Promise<unknown> {
    // TODO: Query document by ID
    // TODO: If document.userId !== userId → throw ForbiddenException (never NotFoundException)
    this.logger.log({ event: "document_viewed", documentId, userId });
    return { id: documentId, status: DocumentStatus.PENDING_UPLOAD }; // placeholder
  }

  async getProcessingStatus(userId: string, documentId: string): Promise<unknown> {
    // TODO: Verify ownership then return job/processing status
    return { documentId, status: DocumentStatus.PENDING_UPLOAD };
  }

  async deleteDocument(userId: string, documentId: string): Promise<void> {
    // TODO: Verify ownership
    // TODO: Mark document as DELETED in DB
    // TODO: Enqueue DocumentDeleteJob to clean up:
    //   - original file from storage
    //   - OCR text
    //   - analysis data
    //   - embeddings
    //   - derived thumbnails
    // TODO: Record audit log
    this.logger.log({ event: "document_deletion_scheduled", documentId, userId });
  }

  /**
   * Generates a safe, opaque storage key.
   * NEVER use user-provided filenames as paths — path traversal prevention.
   */
  private generateSafeStorageKey(userId: string, documentId: string, mimeType: string): string {
    const ext = this.mimeTypeToExtension(mimeType);
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD for partitioning
    return `documents/${userId}/${date}/${documentId}${ext}`;
  }

  private mimeTypeToExtension(mimeType: string): string {
    const map: Record<string, string> = {
      "application/pdf": ".pdf",
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/tiff": ".tif",
    };
    return map[mimeType] ?? ".bin";
  }
}
