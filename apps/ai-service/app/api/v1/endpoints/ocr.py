"""OCR endpoint — accepts document bytes, returns extracted text."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.core.security import verify_internal_api_key

router = APIRouter(dependencies=[Depends(verify_internal_api_key)])


class OCRRequest(BaseModel):
    storage_path: str
    mime_type: str
    document_id: str
    language_hint: str | None = None


class OCRResponse(BaseModel):
    document_id: str
    pages: list[dict[str, Any]]
    overall_confidence: float
    provider: str
    processing_time_ms: int


@router.post("/process", response_model=OCRResponse)
async def process_document(request: OCRRequest) -> OCRResponse:
    """
    Process a document through OCR.
    TODO: Implement OCR processing pipeline
    - Fetch document from storage
    - Run OCR (local Tesseract during development, AWS Textract in production)
    - Return structured text per page
    """
    raise HTTPException(status_code=501, detail="OCR pipeline not yet implemented")
