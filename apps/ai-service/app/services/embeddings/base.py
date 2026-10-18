"""
Embedding Service Abstraction — Abstract base class.
Supports local multilingual models (default, free) and cloud providers.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import StrEnum


class EmbeddingProvider(StrEnum):
    SENTENCE_TRANSFORMERS_LOCAL = "sentence_transformers_local"
    GOOGLE_TEXT_EMBEDDING = "google_text_embedding"
    OPENAI_TEXT_EMBEDDING = "openai_text_embedding"
    COHERE_EMBED = "cohere_embed"


@dataclass(frozen=True)
class EmbeddingUsage:
    input_tokens: int
    estimated_cost_usd: float


@dataclass(frozen=True)
class EmbeddingResponse:
    embeddings: list[list[float]]
    provider: EmbeddingProvider
    model_id: str
    dimensions: int
    usage: EmbeddingUsage


@dataclass
class EmbeddingRequest:
    texts: list[str]
    task_type: str = "retrieval_document"  # "retrieval_query" | "retrieval_document" | "classification"
    provider_override: EmbeddingProvider | None = None


class BaseEmbeddingProvider(ABC):
    """Abstract base for all embedding providers."""

    @property
    @abstractmethod
    def provider(self) -> EmbeddingProvider: ...

    @property
    @abstractmethod
    def dimensions(self) -> int: ...

    @abstractmethod
    async def embed(self, request: EmbeddingRequest) -> EmbeddingResponse:
        """Generate embeddings for texts."""
        ...

    @abstractmethod
    async def health_check(self) -> bool: ...


class EmbeddingError(Exception):
    """Base exception for embedding provider errors."""
