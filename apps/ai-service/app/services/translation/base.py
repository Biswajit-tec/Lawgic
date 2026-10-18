"""
Translation Service Abstraction — Abstract base class.
Supports Bhashini, Sarvam AI, and open-source alternatives.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import StrEnum


class TranslationProvider(StrEnum):
    BHASHINI = "bhashini"
    SARVAM_AI = "sarvam_ai"
    GOOGLE_TRANSLATE = "google_translate"
    LOCAL_NLLB = "local_nllb"  # Meta's NLLB open-source model


@dataclass(frozen=True)
class TranslationResponse:
    translated_text: str
    provider: TranslationProvider
    detected_source_language: str | None
    confidence: float | None
    processing_time_ms: int


@dataclass
class TranslationRequest:
    text: str
    source_language: str  # ISO 639-1 or "auto"
    target_language: str  # ISO 639-1
    domain: str = "general"  # "legal" | "general"
    provider_override: TranslationProvider | None = None


class BaseTranslationProvider(ABC):
    """Abstract base for all translation providers."""

    @property
    @abstractmethod
    def provider(self) -> TranslationProvider: ...

    @abstractmethod
    async def translate(self, request: TranslationRequest) -> TranslationResponse:
        """Translate text. Raises TranslationError on failure."""
        ...

    @abstractmethod
    async def health_check(self) -> bool: ...


class TranslationError(Exception):
    """Base exception for translation provider errors."""

    def __init__(self, message: str, provider: TranslationProvider, retriable: bool = False):
        super().__init__(message)
        self.provider = provider
        self.retriable = retriable
