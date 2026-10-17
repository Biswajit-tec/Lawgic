"""Health check endpoints for the AI service."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str
    services: dict[str, dict[str, str]]


@router.get("", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Health check — accessible without authentication for load balancers."""
    from app.core.config import settings

    return HealthResponse(
        status="healthy",
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
        services={
            "ai_service": {"status": "up"},
            # TODO: Add DB health, embedding model status, LLM connectivity
        },
    )


@router.get("/ready")
async def readiness() -> dict[str, bool]:
    """Readiness check."""
    return {"ready": True}


@router.get("/live")
async def liveness() -> dict[str, bool]:
    """Liveness check."""
    return {"alive": True}
