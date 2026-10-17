import { z } from "zod";
import { ConfidenceLevel, ClaimType, CitationSourceType } from "@lawgic/types";

// =============================================================================
// AI Output Validation Schemas
// LLM output MUST be validated before storing or returning to clients.
// These schemas prevent hallucinated or malformed AI responses from propagating.
// =============================================================================

export const IdentifiedPartySchema = z.object({
  name: z.string().min(1).max(500),
  role: z.string().min(1).max(200),
  pageNumber: z.number().int().positive().nullable(),
});

export const IdentifiedDateSchema = z.object({
  date: z.string().min(1),
  description: z.string().min(1).max(500),
  significance: z.enum(["deadline", "event", "effective_date", "expiry"]),
  pageNumber: z.number().int().positive().nullable(),
});

export const CitationSchema = z.object({
  sourceType: z.nativeEnum(CitationSourceType),
  sourceId: z.string().min(1).max(500),
  pageNumber: z.number().int().positive().nullable(),
  sectionId: z.string().nullable(),
  excerpt: z.string().max(2000).nullable(),
  url: z.string().url().nullable(),
});

export const AnalysisClaimSchema = z.object({
  type: z.nativeEnum(ClaimType),
  text: z.string().min(1).max(5000),
  confidence: z.nativeEnum(ConfidenceLevel),
  citations: z.array(CitationSchema),
  disclaimer: z.string().nullable(),
});

/** Full document analysis schema — validated before storing AI output */
export const DocumentAnalysisOutputSchema = z.object({
  documentType: z.string().max(200).nullable(),
  parties: z.array(IdentifiedPartySchema).max(50),
  importantDates: z.array(IdentifiedDateSchema).max(50),
  obligations: z.array(AnalysisClaimSchema).max(20),
  deadlines: z.array(AnalysisClaimSchema).max(20),
  summary: AnalysisClaimSchema.nullable(),
  suggestedNextSteps: z.array(AnalysisClaimSchema).max(10),
  legalWarnings: z.array(AnalysisClaimSchema).max(10),
  disclaimer: z.string().min(10), // disclaimer is mandatory
});

export type DocumentAnalysisOutput = z.infer<typeof DocumentAnalysisOutputSchema>;
