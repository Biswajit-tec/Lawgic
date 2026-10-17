import { z } from "zod";

// =============================================================================
// Common Validation Schemas
// =============================================================================

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export const UUIDSchema = z.string().uuid("Invalid ID format");

export const SortDirectionSchema = z.enum(["asc", "desc"]).default("desc");

/** Safe string — trims, prevents null bytes, limits length */
export const SafeStringSchema = (maxLength = 1000) =>
  z
    .string()
    .trim()
    .min(1)
    .max(maxLength)
    .refine((s) => !s.includes("\0"), { message: "Invalid characters" });

/** ISO 8601 date string */
export const ISODateSchema = z.string().datetime({ message: "Invalid date format. Use ISO 8601." });
