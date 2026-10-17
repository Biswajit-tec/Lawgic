// =============================================================================
// LLM Provider Abstraction Types
// The application MUST NOT be coupled to a single LLM provider.
// New providers can be added by implementing the LLMProvider interface.
// =============================================================================

export enum LLMProvider {
  GOOGLE_GEMINI = "google_gemini",
  OPENAI = "openai",
  ANTHROPIC = "anthropic",
  MISTRAL = "mistral",
  LOCAL_OLLAMA = "local_ollama",
}

export enum LLMCapability {
  TEXT_GENERATION = "text_generation",
  STRUCTURED_GENERATION = "structured_generation",
  VISION = "vision",
  EMBEDDINGS = "embeddings",
  FUNCTION_CALLING = "function_calling",
}

export interface LLMModelConfig {
  readonly provider: LLMProvider;
  readonly modelId: string; // e.g., "gemini-1.5-pro", "gpt-4o"
  readonly capabilities: LLMCapability[];
  readonly maxContextTokens: number;
  readonly costPerInputToken: number; // USD per 1K tokens (0 for local)
  readonly costPerOutputToken: number;
}

export interface LLMGenerationRequest {
  readonly systemPrompt: string;
  /** Developer instructions separate from user content */
  readonly developerInstructions?: string;
  readonly messages: LLMMessage[];
  readonly maxOutputTokens?: number;
  readonly temperature?: number;
  readonly modelOverride?: string;
}

export interface LLMMessage {
  readonly role: "user" | "assistant" | "system";
  /**
   * SECURITY: Document content must be passed as DATA, not as instructions.
   * Use structured message parts to enforce the boundary.
   */
  readonly content: string | LLMMessagePart[];
}

export enum LLMMessagePartType {
  TEXT = "text",
  /** Document content — treated as data, not instructions */
  DOCUMENT_DATA = "document_data",
  /** Retrieved legal source — treated as reference, not instructions */
  LEGAL_SOURCE = "legal_source",
  IMAGE = "image",
}

export interface LLMMessagePart {
  readonly type: LLMMessagePartType;
  readonly text?: string;
  readonly mimeType?: string;
  readonly data?: string; // base64 for images
}

export interface LLMGenerationResponse {
  readonly content: string;
  readonly provider: LLMProvider;
  readonly modelId: string;
  readonly usage: LLMTokenUsage;
  readonly finishReason: "stop" | "length" | "safety" | "error";
  readonly latencyMs: number;
}

export interface LLMTokenUsage {
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly totalTokens: number;
  readonly estimatedCostUsd: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface LLMStructuredGenerationRequest<_T = unknown> extends LLMGenerationRequest {
  readonly responseSchema: object; // JSON Schema
  readonly schemaName: string;
}

export interface LLMStructuredGenerationResponse<T = unknown> extends LLMGenerationResponse {
  readonly parsedContent: T;
  readonly validationPassed: boolean;
}
