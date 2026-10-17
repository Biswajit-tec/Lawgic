import { z } from "zod";

// =============================================================================
// Document Validation Schemas
// =============================================================================

export const GetDocumentParamsSchema = z.object({
  documentId: z.string().uuid("Invalid document ID"),
});

export const ListDocumentsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  status: z.string().optional(),
});

export type GetDocumentParams = z.infer<typeof GetDocumentParamsSchema>;
export type ListDocumentsQuery = z.infer<typeof ListDocumentsQuerySchema>;
