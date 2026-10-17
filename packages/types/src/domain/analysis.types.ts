// =============================================================================
// Analysis Domain Types
// Separates document facts, legal sources, AI interpretation, and next steps.
// This is the CORE citation/evidence architecture.
// =============================================================================

import type { DocumentId } from "./document.types";
import type { UserId } from "./user.types";

export type AnalysisId = string;
export type ClaimId = string;
export type CitationId = string;

export enum AnalysisStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETE = "complete",
  FAILED = "failed",
  REQUIRES_REVIEW = "requires_review",
}

export enum ClaimType {
  /** Fact directly stated in the uploaded document */
  DOCUMENT_FACT = "document_fact",
  /** Reference to a relevant law, statute, or regulation */
  LEGAL_SOURCE = "legal_source",
  /** AI interpretation / plain-language explanation */
  AI_INTERPRETATION = "ai_interpretation",
  /** Suggested next steps — NOT legal advice */
  SUGGESTED_NEXT_STEP = "suggested_next_step",
}

export enum ConfidenceLevel {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
  UNCERTAIN = "uncertain",
}

/**
 * A single traceable claim in an analysis.
 * Every claim must have a citation or be explicitly marked as AI interpretation.
 * This prevents the LLM from inventing legal facts without source attribution.
 */
export interface AnalysisClaim {
  readonly id: ClaimId;
  readonly analysisId: AnalysisId;
  readonly type: ClaimType;
  readonly text: string; // plain English statement
  readonly confidence: ConfidenceLevel;
  readonly citations: Citation[];
  readonly isVerified: boolean; // manually verified by legal professional
  readonly disclaimer: string | null; // e.g., "This is general information, not legal advice"
}

/** Traceable source reference for a claim */
export interface Citation {
  readonly id: CitationId;
  readonly claimId: ClaimId;
  readonly sourceType: CitationSourceType;
  /** The document or legal source being cited */
  readonly sourceId: string;
  /** Specific location within the source */
  readonly pageNumber: number | null;
  readonly sectionId: string | null;
  readonly excerpt: string | null; // verbatim excerpt from source
  readonly url: string | null; // public URL if applicable
}

export enum CitationSourceType {
  UPLOADED_DOCUMENT = "uploaded_document",
  LEGISLATION = "legislation",
  REGULATION = "regulation",
  COURT_JUDGMENT = "court_judgment",
  GOVERNMENT_NOTIFICATION = "government_notification",
  OFFICIAL_WEBSITE = "official_website",
}

/** Full document analysis result */
export interface DocumentAnalysis {
  readonly id: AnalysisId;
  readonly documentId: DocumentId;
  readonly userId: UserId;
  readonly status: AnalysisStatus;
  readonly documentType: string | null;
  readonly parties: IdentifiedParty[];
  readonly importantDates: IdentifiedDate[];
  readonly obligations: AnalysisClaim[];
  readonly deadlines: AnalysisClaim[];
  readonly summary: AnalysisClaim | null;
  readonly suggestedNextSteps: AnalysisClaim[];
  readonly legalWarnings: AnalysisClaim[];
  readonly modelUsed: string; // e.g., "gemini-1.5-pro"
  readonly ragSourcesUsed: string[]; // IDs of legal source chunks retrieved
  readonly processingTimeMs: number | null;
  readonly disclaimer: string; // always present — never omit
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface IdentifiedParty {
  readonly name: string;
  readonly role: string; // e.g., "plaintiff", "landlord", "employer"
  readonly pageNumber: number | null;
}

export interface IdentifiedDate {
  readonly date: string;
  readonly description: string;
  readonly significance: "deadline" | "event" | "effective_date" | "expiry";
  readonly pageNumber: number | null;
}

// Standard disclaimer — MUST be included in all analysis responses
export const LEGAL_INFORMATION_DISCLAIMER =
  "This analysis is for general information purposes only and does not constitute legal advice. " +
  "For advice specific to your situation, please consult a qualified legal professional.";
