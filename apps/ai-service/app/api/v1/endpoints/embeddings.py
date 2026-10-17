"""Embeddings endpoint — generates vector embeddings for text."""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.core.security import verify_internal_api_key

router = APIRouter(dependencies=[Depends(verify_internal_api_key)])


class EmbedRequest(BaseModel):
    texts: list[str]
    task_type: str = "retrieval_document"


class EmbedResponse(BaseModel):
    embeddings: list[list[float]]
    provider: str
    model_id: str
    dimensions: int


@router.post("/embed", response_model=EmbedResponse)
async def embed_texts(request: EmbedRequest) -> EmbedResponse:
    """
    Generate embeddings for a list of texts.
    TODO: Implement embedding generation
    - Use local multilingual-e5-base model by default (free)
    - Switch to cloud provider via EMBEDDING_PROVIDER env var
    """
    raise HTTPException(status_code=501, detail="Embedding service not yet implemented")
