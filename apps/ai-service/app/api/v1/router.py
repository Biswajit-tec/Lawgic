"""AI Service API Router — v1"""

from fastapi import APIRouter

from app.api.v1.endpoints import embeddings, health, llm, ocr, translation

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(ocr.router, prefix="/ocr", tags=["ocr"])
api_router.include_router(embeddings.router, prefix="/embeddings", tags=["embeddings"])
api_router.include_router(llm.router, prefix="/llm", tags=["llm"])
api_router.include_router(translation.router, prefix="/translation", tags=["translation"])
