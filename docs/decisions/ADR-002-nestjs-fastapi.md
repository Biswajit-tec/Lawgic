# ADR-002: NestJS (TypeScript) + FastAPI (Python) Hybrid Architecture

**Status**: Accepted  
**Date**: 2026-09-26

## Context

LAWgic needs:
- A robust API framework for business logic, auth, and request handling
- An AI/ML processing service that can use Python ML ecosystem (transformers, sentence-transformers, etc.)
- Clear separation between application logic and AI/ML logic

## Decision

Use **NestJS** for the main application API and **FastAPI** for the AI/ML service.

## Rationale

### NestJS (TypeScript)
- Strong DI container for testability
- Excellent Swagger/OpenAPI support
- Decorators-first architecture fits the module structure
- Guards and interceptors enable clean security boundaries
- Large ecosystem (Passport, BullMQ, TypeORM/Prisma)

### FastAPI (Python)
- Python is the de-facto standard for ML/AI workloads
- Access to: sentence-transformers, pytesseract, pdfplumber, langchain, etc.
- Pydantic v2 for AI output validation
- Async-native for LLM I/O

### Separation of Concerns
- NestJS owns: users, auth, authorization, documents metadata, cases, conversations, audit logs
- FastAPI owns: OCR, embeddings, LLM calls, RAG, translation, document classification

## Communication

Internal HTTP API with API key authentication. Contracts defined via shared TypeScript types (for documentation) and Pydantic models (for Python validation).

## Trade-offs

- Two languages to maintain
- **Mitigation**: Clear boundary — Python is ML-only, TypeScript handles everything else
- Shared types exist only as documentation — not a compile-time contract across languages
