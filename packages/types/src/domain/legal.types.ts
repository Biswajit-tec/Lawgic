// =============================================================================
// Legal Domain Types — Legal Sources, Chunks, Embeddings
// =============================================================================

export type LegalSourceId = string;
export type LegalSourceChunkId = string;

export enum LegalSourceType {
  CENTRAL_ACT = "central_act",
  STATE_ACT = "state_act",
  REGULATION = "regulation",
  GOVERNMENT_NOTIFICATION = "government_notification",
  SUPREME_COURT_JUDGMENT = "supreme_court_judgment",
  HIGH_COURT_JUDGMENT = "high_court_judgment",
  LEGAL_ARTICLE = "legal_article",
  OFFICIAL_FAQ = "official_faq",
}

/** A legal source document ingested into the knowledge base */
export interface LegalSource {
  readonly id: LegalSourceId;
  readonly type: LegalSourceType;
  readonly title: string;
  readonly jurisdiction: string; // e.g., "India", "Tamil Nadu"
  readonly year: number | null;
  readonly officialUrl: string | null;
  readonly isVerified: boolean;
  readonly lastVerifiedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/**
 * A chunk of a legal source used for RAG retrieval.
 * Chunks are small enough to fit in context windows and large enough to be meaningful.
 */
export interface LegalSourceChunk {
  readonly id: LegalSourceChunkId;
  readonly sourceId: LegalSourceId;
  readonly chunkIndex: number;
  readonly text: string;
  readonly sectionTitle: string | null;
  readonly sectionNumber: string | null; // e.g., "Section 302"
  readonly pageNumber: number | null;
  // embeddings are stored separately in pgvector — not included here
  readonly createdAt: string;
}
