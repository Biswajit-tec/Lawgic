"""Translation endpoint."""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.core.security import verify_internal_api_key

router = APIRouter(dependencies=[Depends(verify_internal_api_key)])


class TranslateRequest(BaseModel):
    text: str
    source_language: str
    target_language: str
    domain: str = "general"


class TranslateResponse(BaseModel):
    translated_text: str
    provider: str
    detected_source_language: str | None
    processing_time_ms: int


@router.post("/translate", response_model=TranslateResponse)
async def translate(request: TranslateRequest) -> TranslateResponse:
    """
    Translate text between languages.
    TODO: Implement translation with Bhashini/Sarvam/NLLB
    """
    raise HTTPException(status_code=501, detail="Translation service not yet implemented")
