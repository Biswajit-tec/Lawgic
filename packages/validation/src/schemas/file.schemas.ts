import { z } from "zod";
import { DocumentMimeType, MAX_DOCUMENT_SIZE_BYTES, ALLOWED_DOCUMENT_EXTENSIONS } from "@lawgic/types";

// =============================================================================
// File Upload Validation Schemas
// These enforce security rules on uploaded documents
// =============================================================================

export const AllowedMimeTypes = [
  DocumentMimeType.PDF,
  DocumentMimeType.JPEG,
  DocumentMimeType.PNG,
  DocumentMimeType.TIFF,
] as const;

/** Validates file upload initiation request */
export const InitiateUploadSchema = z.object({
  originalFilename: z
    .string()
    .min(1, "Filename is required")
    .max(255, "Filename too long")
    // Strip path traversal attempts
    .refine((name) => !name.includes("/") && !name.includes("\\") && !name.includes(".."), {
      message: "Invalid filename",
    })
    // Only allow safe extensions
    .refine(
      (name) => {
        const ext = name.toLowerCase().slice(name.lastIndexOf("."));
        return (ALLOWED_DOCUMENT_EXTENSIONS as readonly string[]).includes(ext);
      },
      { message: "File type not supported. Allowed types: PDF, JPEG, PNG, TIFF" },
    ),
  mimeType: z.enum([DocumentMimeType.PDF, DocumentMimeType.JPEG, DocumentMimeType.PNG, DocumentMimeType.TIFF], {
    errorMap: () => ({ message: "Unsupported MIME type" }),
  }),
  fileSizeBytes: z
    .number()
    .int()
    .positive("File size must be positive")
    .max(MAX_DOCUMENT_SIZE_BYTES, `File too large. Maximum size is ${MAX_DOCUMENT_SIZE_BYTES / 1024 / 1024}MB`),
});

export type InitiateUploadInput = z.infer<typeof InitiateUploadSchema>;
