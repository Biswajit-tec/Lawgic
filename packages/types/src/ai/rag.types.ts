// =============================================================================
// RAG (Retrieval-Augmented Generation) Architecture Types
// Every retrieved source must be traceable. Do not allow hallucinated legal facts.
// =============================================================================

import type { SupportedLanguage } from "../domain/user.types";

export interface RAGQuery {
  readonly queryText: string;
  readonly queryLanguage: SupportedLanguage;
  readonly documentContext: string | null; // relevant document excerpt
  readonly filters: RAGFilter;
  readonly topK: number; // max chunks to retrieve
  readonly rerankEnabled: boolean;
}

export interface RAGFilter {
  readonly sourceTypes?: string[];
  readonly jurisdiction?: string;
  readonly minConfidence?: number;
}

export interface RAGResult {
  readonly query: RAGQuery;
  readonly retrievedChunks: RetrievedChunk[];
  readonly rerankingApplied: boolean;
  readonly retrievalTimeMs: number;
  readonly embeddingProvider: string;
}

export interface RetrievedChunk {
  readonly chunkId: string;
  readonly sourceId: string;
  readonly sourceTitle: string;
  readonly sourceType: string;
  readonly chunkText: string;
  readonly sectionNumber: string | null;
  readonly sectionTitle: string | null;
  readonly pageNumber: number | null;
  readonly similarityScore: number; // 0.0–1.0
  readonly rerankScore: number | null;
  readonly officialUrl: string | null;
}

export interface RAGGroundedResponse {
  readonly answer: string;
  readonly citations: RAGCitation[];
  readonly confidence: "high" | "medium" | "low" | "uncertain";
  readonly disclaimer: string;
}

export interface RAGCitation {
  readonly chunkId: string;
  readonly sourceId: string;
  readonly sourceTitle: string;
  readonly excerpt: string;
  readonly url: string | null;
}
