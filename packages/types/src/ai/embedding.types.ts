// =============================================================================
// Embedding Provider Abstraction Types
// =============================================================================

export enum EmbeddingProvider {
  GOOGLE_TEXT_EMBEDDING = "google_text_embedding",
  OPENAI_TEXT_EMBEDDING = "openai_text_embedding",
  /** Open-source multilingual models suitable for Indian languages */
  SENTENCE_TRANSFORMERS_LOCAL = "sentence_transformers_local",
  COHERE_EMBED = "cohere_embed",
}

export interface EmbeddingRequest {
  readonly texts: string[];
  readonly taskType?: "retrieval_query" | "retrieval_document" | "classification";
  readonly providerOverride?: EmbeddingProvider;
}

export interface EmbeddingResponse {
  readonly embeddings: number[][];
  readonly provider: EmbeddingProvider;
  readonly modelId: string;
  readonly dimensions: number;
  readonly usage: {
    readonly inputTokens: number;
    readonly estimatedCostUsd: number;
  };
}
