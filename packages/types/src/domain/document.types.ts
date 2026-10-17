// =============================================================================
// Document Domain Types
// =============================================================================

import type { UserId } from "./user.types";

export type DocumentId = string;
export type DocumentPageId = string;

export enum DocumentStatus {
  PENDING_UPLOAD = "pending_upload",
  UPLOADED = "uploaded",
  PROCESSING = "processing",
  OCR_COMPLETE = "ocr_complete",
  CLASSIFICATION_COMPLETE = "classification_complete",
  EXTRACTION_COMPLETE = "extraction_complete",
  ANALYSIS_COMPLETE = "analysis_complete",
  FAILED = "failed",
  DELETED = "deleted",
}

export enum DocumentType {
  COURT_ORDER = "court_order",
  LEGAL_NOTICE = "legal_notice",
  AFFIDAVIT = "affidavit",
  AGREEMENT = "agreement",
  RENTAL_AGREEMENT = "rental_agreement",
  GOVERNMENT_CERTIFICATE = "government_certificate",
  LAND_RECORD = "land_record",
  FIR = "fir",
  CHARGESHEET = "chargesheet",
  BAIL_ORDER = "bail_order",
  SUMMONS = "summons",
  PROPERTY_DOCUMENT = "property_document",
  IDENTITY_DOCUMENT = "identity_document",
  TAX_DOCUMENT = "tax_document",
  UNKNOWN = "unknown",
}

export enum DocumentMimeType {
  PDF = "application/pdf",
  JPEG = "image/jpeg",
  PNG = "image/png",
  TIFF = "image/tiff",
}

/** Allowed file extensions for upload */
export const ALLOWED_DOCUMENT_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".tiff", ".tif"] as const;
export type AllowedDocumentExtension = (typeof ALLOWED_DOCUMENT_EXTENSIONS)[number];

/** Maximum document upload size: 20MB */
export const MAX_DOCUMENT_SIZE_BYTES = 20 * 1024 * 1024;

/** Document metadata stored in DB — does NOT contain file contents */
export interface Document {
  readonly id: DocumentId;
  readonly userId: UserId;
  readonly originalFilename: string; // sanitized, not trusted as path
  readonly storagePath: string; // opaque key in object storage
  readonly mimeType: DocumentMimeType;
  readonly fileSizeBytes: number;
  readonly pageCount: number | null;
  readonly status: DocumentStatus;
  readonly documentType: DocumentType | null;
  readonly processingJobId: string | null;
  readonly createdAt: string; // ISO 8601
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

/** A single extracted page of a document */
export interface DocumentPage {
  readonly id: DocumentPageId;
  readonly documentId: DocumentId;
  readonly pageNumber: number;
  readonly ocrText: string | null; // populated after OCR
  readonly ocrConfidence: number | null; // 0.0–1.0
  readonly createdAt: string;
}

/** Request to initiate a document upload */
export interface InitiateUploadRequest {
  readonly originalFilename: string;
  readonly mimeType: DocumentMimeType;
  readonly fileSizeBytes: number;
}

/** Response containing a presigned upload URL */
export interface InitiateUploadResponse {
  readonly documentId: DocumentId;
  readonly uploadUrl: string; // signed, short-lived
  readonly expiresAt: string; // ISO 8601
}
