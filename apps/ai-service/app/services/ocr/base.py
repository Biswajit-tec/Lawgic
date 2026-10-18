"""
OCR Service Abstraction — Abstract base class.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import StrEnum


class OCRProvider(StrEnum):
    TESSERACT_LOCAL = "tesseract_local"
    AWS_TEXTRACT = "aws_textract"
    GOOGLE_DOCUMENT_AI = "google_document_ai"


@dataclass(frozen=True)
class BoundingBox:
    top: float
    left: float
    width: float
    height: float


@dataclass(frozen=True)
class OCRTextBlock:
    text: str
    confidence: float
    bounding_box: BoundingBox | None
    block_type: str  # "text" | "table" | "form" | "signature"


@dataclass(frozen=True)
class OCRPage:
    page_number: int
    text: str
    confidence: float
    blocks: list[OCRTextBlock]
    detected_languages: list[str]


@dataclass(frozen=True)
class OCRResponse:
    provider: OCRProvider
    pages: list[OCRPage]
    overall_confidence: float
    processing_time_ms: int


@dataclass
class OCRRequest:
    file_bytes: bytes
    mime_type: str
    page_numbers: list[int] | None = None  # None = all pages
    language_hint: str | None = None


class BaseOCRProvider(ABC):
    """Abstract base for all OCR providers."""

    @property
    @abstractmethod
    def provider(self) -> OCRProvider: ...

    @abstractmethod
    async def process(self, request: OCRRequest) -> OCRResponse:
        """Process a document through OCR. Raises OCRError on failure."""
        ...

    @abstractmethod
    async def health_check(self) -> bool: ...


class OCRError(Exception):
    """Base exception for OCR provider errors."""

    def __init__(self, message: str, provider: OCRProvider, retriable: bool = False):
        super().__init__(message)
        self.provider = provider
        self.retriable = retriable
