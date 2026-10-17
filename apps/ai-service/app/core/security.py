"""
Internal API key authentication for the AI service.
This service is INTERNAL ONLY — it should only be called by the NestJS API backend.
Never expose this service directly to the internet.
"""

from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader

from app.core.config import settings

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


def verify_internal_api_key(api_key: str | None = Security(api_key_header)) -> str:
    """
    Verify the internal API key.
    This prevents unauthorized services from calling the AI service directly.
    """
    if api_key is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="API key required",
        )

    # Constant-time comparison to prevent timing attacks
    import hmac

    if not hmac.compare_digest(api_key, settings.AI_SERVICE_API_KEY):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid API key",
        )

    return api_key
