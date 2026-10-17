"""
LAWgic AI Service — FastAPI Application Entry Point
"""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

import structlog
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.logging import configure_logging

logger = structlog.get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan events."""
    configure_logging()
    logger.info("LAWgic AI Service starting", version=settings.VERSION, environment=settings.ENVIRONMENT)
    
    # TODO: Initialize database connection pool
    # TODO: Load embedding model (lazy or eager based on memory constraints)
    # TODO: Verify LLM provider connectivity
    
    logger.info("LAWgic AI Service ready")
    yield
    
    logger.info("LAWgic AI Service shutting down")
    # TODO: Close database connections, cleanup resources


def create_application() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="LAWgic AI Service",
        description=(
            "Internal AI service for LAWgic — document processing, OCR, "
            "classification, embeddings, RAG, and LLM orchestration. "
            "NOT directly accessible to frontend clients."
        ),
        version=settings.VERSION,
        # Only expose docs in non-production
        docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
        redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None,
        openapi_url="/openapi.json" if settings.ENVIRONMENT != "production" else None,
        lifespan=lifespan,
    )

    # ─── CORS — Internal service only ─────────────────────────────────────────
    # Only the NestJS API backend should call this service
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=False,
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type", "X-API-Key", "X-Request-ID"],
    )

    # ─── Routes ───────────────────────────────────────────────────────────────
    app.include_router(api_router, prefix="/api/v1")

    # ─── Global Exception Handler ─────────────────────────────────────────────
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        """
        Catch-all exception handler.
        NEVER expose: stack traces, internal paths, database details.
        ALWAYS log: request_id for correlation.
        """
        request_id = request.headers.get("X-Request-ID", "unknown")
        logger.error(
            "Unhandled exception",
            request_id=request_id,
            path=request.url.path,
            method=request.method,
            error_type=type(exc).__name__,
            # Deliberately NOT logging: exc details which may contain PII
        )
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": {"code": "INTERNAL_SERVER_ERROR", "message": "An unexpected error occurred"},
                "request_id": request_id,
            },
        )

    return app


app = create_application()
