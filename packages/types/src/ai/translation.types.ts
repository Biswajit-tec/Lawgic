// =============================================================================
// Translation Provider Abstraction Types
// Supports Bhashini, Sarvam AI, and future providers
// =============================================================================

import type { SupportedLanguage } from "../domain/user.types";

export enum TranslationProvider {
  BHASHINI = "bhashini",
  SARVAM_AI = "sarvam_ai",
  GOOGLE_TRANSLATE = "google_translate",
  LOCAL_NLLB = "local_nllb", // Meta's NLLB open-source model
}

export interface TranslationRequest {
  readonly text: string;
  readonly sourceLanguage: SupportedLanguage | "auto";
  readonly targetLanguage: SupportedLanguage;
  readonly domain?: "legal" | "general"; // hint for domain-specific translation
  readonly providerOverride?: TranslationProvider;
}

export interface TranslationResponse {
  readonly translatedText: string;
  readonly provider: TranslationProvider;
  readonly detectedSourceLanguage: SupportedLanguage | null;
  readonly confidence: number | null; // 0.0–1.0
  readonly processingTimeMs: number;
}

export interface BatchTranslationRequest {
  readonly texts: string[];
  readonly sourceLanguage: SupportedLanguage | "auto";
  readonly targetLanguage: SupportedLanguage;
  readonly domain?: "legal" | "general";
}

export interface BatchTranslationResponse {
  readonly translations: TranslationResponse[];
  readonly provider: TranslationProvider;
}
