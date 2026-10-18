"""
LLM Provider Abstraction — Abstract base class.
All LLM providers must implement this interface.
The application business logic MUST NOT depend on provider-specific APIs.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import StrEnum
from typing import Any


class LLMProvider(StrEnum):
    GOOGLE_GEMINI = "google_gemini"
    OPENAI = "openai"
    ANTHROPIC = "anthropic"
    LOCAL_OLLAMA = "local_ollama"


class MessagePartType(StrEnum):
    TEXT = "text"
    # SECURITY: Document content is marked as DATA, not instructions
    DOCUMENT_DATA = "document_data"
    # Retrieved legal sources are marked as references
    LEGAL_SOURCE = "legal_source"
    IMAGE = "image"


@dataclass(frozen=True)
class MessagePart:
    type: MessagePartType
    text: str | None = None
    mime_type: str | None = None
    data: bytes | None = None  # For images


@dataclass(frozen=True)
class LLMMessage:
    role: str  # "user" | "assistant" | "system"
    content: str | list[MessagePart]


@dataclass(frozen=True)
class TokenUsage:
    input_tokens: int
    output_tokens: int
    total_tokens: int
    estimated_cost_usd: float


@dataclass(frozen=True)
class GenerationResponse:
    content: str
    provider: LLMProvider
    model_id: str
    usage: TokenUsage
    finish_reason: str  # "stop" | "length" | "safety" | "error"
    latency_ms: int


@dataclass
class GenerationRequest:
    """
    SECURITY: system_prompt and developer_instructions are separate from
    user content to enforce prompt injection boundaries.
    Document content should be passed via MessagePart with type=DOCUMENT_DATA.
    """

    system_prompt: str
    messages: list[LLMMessage]
    developer_instructions: str | None = None
    max_output_tokens: int | None = None
    temperature: float = 0.1  # Low temperature for legal information accuracy
    model_override: str | None = None


class BaseLLMProvider(ABC):
    """Abstract base for all LLM providers."""

    @property
    @abstractmethod
    def provider(self) -> LLMProvider:
        """Provider identifier."""
        ...

    @property
    @abstractmethod
    def default_model(self) -> str:
        """Default model ID for this provider."""
        ...

    @abstractmethod
    async def generate(self, request: GenerationRequest) -> GenerationResponse:
        """Generate text from a prompt. Raises LLMError on failure."""
        ...

    @abstractmethod
    async def generate_structured(
        self, request: GenerationRequest, response_schema: dict[str, Any], schema_name: str
    ) -> tuple[GenerationResponse, dict[str, Any]]:
        """Generate structured output validated against a JSON schema."""
        ...

    @abstractmethod
    async def health_check(self) -> bool:
        """Returns True if the provider is reachable."""
        ...


class LLMError(Exception):
    """Base exception for LLM provider errors."""

    def __init__(self, message: str, provider: LLMProvider, retriable: bool = False):
        super().__init__(message)
        self.provider = provider
        self.retriable = retriable
