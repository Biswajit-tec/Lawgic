"""LLM generation endpoint — internal only."""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.core.security import verify_internal_api_key

router = APIRouter(dependencies=[Depends(verify_internal_api_key)])


class GenerationRequest(BaseModel):
    system_prompt: str
    developer_instructions: str | None = None
    messages: list[dict]
    max_output_tokens: int | None = None
    temperature: float = 0.1


class GenerationResponse(BaseModel):
    content: str
    provider: str
    model_id: str
    input_tokens: int
    output_tokens: int
    estimated_cost_usd: float


@router.post("/generate", response_model=GenerationResponse)
async def generate(request: GenerationRequest) -> GenerationResponse:
    """
    Generate LLM response.
    TODO: Implement LLM gateway with provider abstraction
    SECURITY: Document content in messages must be marked as DOCUMENT_DATA type
    to prevent prompt injection.
    """
    raise HTTPException(status_code=501, detail="LLM service not yet implemented")
