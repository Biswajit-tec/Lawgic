// =============================================================================
// OCR Provider Abstraction Types
// =============================================================================

export enum OCRProvider {
  AWS_TEXTRACT = "aws_textract",
  TESSERACT_LOCAL = "tesseract_local",
  GOOGLE_DOCUMENT_AI = "google_document_ai",
  AZURE_FORM_RECOGNIZER = "azure_form_recognizer",
}

export interface OCRRequest {
  readonly storagePath: string;
  readonly mimeType: string;
  readonly pageNumbers?: number[]; // if null, process all pages
  readonly language?: string; // hint for multilingual documents
}

export interface OCRResponse {
  readonly provider: OCRProvider;
  readonly pages: OCRPage[];
  readonly overallConfidence: number; // 0.0–1.0
  readonly processingTimeMs: number;
  readonly rawProviderResponse?: unknown; // for debugging only
}

export interface OCRPage {
  readonly pageNumber: number;
  readonly text: string;
  readonly confidence: number; // 0.0–1.0
  readonly blocks: OCRTextBlock[];
  readonly detectedLanguages: string[];
}

export interface OCRTextBlock {
  readonly text: string;
  readonly confidence: number;
  readonly boundingBox: BoundingBox | null;
  readonly blockType: "text" | "table" | "form" | "signature";
}

export interface BoundingBox {
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;
}
