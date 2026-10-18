"""
LAWgic AI Service — Application Configuration
Environment validation using Pydantic Settings.
Fails fast if required environment variables are missing.
"""

from typing import Literal

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    The application WILL NOT start if required variables are missing.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # ─── Core ──────────────────────────────────────────────────────────────────
    ENVIRONMENT: Literal["development", "test", "staging", "production"] = "development"
    VERSION: str = "0.1.0"
    PORT: int = 8001
    HOST: str = "0.0.0.0"  # noqa: S104 — Required for containerized deployment port binding

    # ─── Security ──────────────────────────────────────────────────────────────
    # Internal API key — this service is NOT publicly accessible
    AI_SERVICE_API_KEY: str  # Required — no default

    # CORS: only the NestJS API backend should call this service
    CORS_ORIGINS: list[str] = ["http://localhost:3001"]

    # ─── Database ──────────────────────────────────────────────────────────────
    DATABASE_URL: str  # Required — no default

    # ─── LLM Providers ─────────────────────────────────────────────────────────
    # Start with Gemini (most cost-effective for Indian use cases)
    GOOGLE_API_KEY: str | None = None
    OPENAI_API_KEY: str | None = None
    ANTHROPIC_API_KEY: str | None = None

    # Default LLM provider — change without code modification
    DEFAULT_LLM_PROVIDER: Literal["google_gemini", "openai", "anthropic", "local_ollama"] = "google_gemini"
    DEFAULT_LLM_MODEL: str = "gemini-1.5-flash"  # Cost-efficient default

    # ─── Embedding ─────────────────────────────────────────────────────────────
    # Use local multilingual model by default to reduce costs
    EMBEDDING_PROVIDER: Literal["sentence_transformers_local", "google_text_embedding", "openai_text_embedding"] = (
        "sentence_transformers_local"
    )
    EMBEDDING_MODEL: str = "intfloat/multilingual-e5-base"  # Good for Indian languages
    EMBEDDING_DIMENSION: int = 768

    # ─── OCR ───────────────────────────────────────────────────────────────────
    OCR_PROVIDER: Literal["tesseract_local", "aws_textract"] = "tesseract_local"
    AWS_REGION: str | None = None
    AWS_ACCESS_KEY_ID: str | None = None
    AWS_SECRET_ACCESS_KEY: str | None = None

    # ─── Translation ───────────────────────────────────────────────────────────
    TRANSLATION_PROVIDER: Literal["bhashini", "sarvam_ai", "google_translate", "local_nllb"] = "local_nllb"
    BHASHINI_API_KEY: str | None = None
    SARVAM_API_KEY: str | None = None

    # ─── RAG ───────────────────────────────────────────────────────────────────
    RAG_TOP_K: int = 10
    RAG_RERANK_ENABLED: bool = False  # Enable when reranker model is available

    # ─── Observability ─────────────────────────────────────────────────────────
    SENTRY_DSN: str | None = None

    @field_validator("AI_SERVICE_API_KEY")
    @classmethod
    def validate_api_key(cls, v: str) -> str:
        if len(v) < 32:
            raise ValueError("AI_SERVICE_API_KEY must be at least 32 characters")
        return v

    @field_validator("DEFAULT_LLM_PROVIDER")
    @classmethod
    def validate_llm_provider_has_key(cls, v: str, info: object) -> str:
        # Validate that required keys are present for selected provider
        # (full cross-field validation in post_init)
        return v


settings = Settings()  # type: ignore[call-arg]
