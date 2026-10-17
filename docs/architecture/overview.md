# LAWgic — Architecture Overview

## Platform Vision

LAWgic is a multilingual AI-powered legal information and document-understanding platform for Indian citizens. It helps make India's legal system understandable to everyone.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                            │
│                   Next.js Web App (apps/web)                    │
│              Mobile-first • TypeScript • Tailwind               │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS (JWT Bearer)
┌─────────────────────────────▼───────────────────────────────────┐
│                      Application Layer                          │
│                 NestJS REST API (apps/api)                      │
│     Auth • Authorization • Business Logic • Orchestration       │
│            Validation • Rate Limiting • Audit Logs              │
└──────┬──────────────────────┬──────────────────────────────────┘
       │ SQL                  │ Internal HTTP (API Key)
┌──────▼──────┐        ┌──────▼──────────────────────────────────┐
│  PostgreSQL │        │         AI Service (apps/ai-service)    │
│  + pgvector │        │     FastAPI • Python • Async             │
│  + RLS      │        │  OCR • Embeddings • LLM • RAG • NLP     │
└─────────────┘        └──────────────────────────────────────────┘
       │                                    │ Provider APIs
┌──────▼──────┐        ┌──────▼──────────────────────────────────┐
│   Redis     │        │           Provider Abstraction           │
│  BullMQ     │        │  Gemini │ OpenAI │ Textract │ Bhashini  │
│  Cache      │        └──────────────────────────────────────────┘
└─────────────┘
       │
┌──────▼──────────────────────────────────────────────────────────┐
│                   Worker (apps/worker)                          │
│              BullMQ Processors • TypeScript                     │
│          Document Pipeline: OCR → Classify → Extract            │
│            → RAG Analysis → Translation → Complete              │
└─────────────────────────────────────────────────────────────────┘
```

## Service Responsibilities

| Service | Language | Responsibility |
|---------|----------|----------------|
| `apps/web` | TypeScript/Next.js | User interface, mobile-first |
| `apps/api` | TypeScript/NestJS | Business logic, auth, authorization, API |
| `apps/ai-service` | Python/FastAPI | AI processing, OCR, embeddings, RAG |
| `apps/worker` | TypeScript/BullMQ | Async document processing pipeline |

## Key Architectural Decisions

See [docs/decisions/](decisions/) for full ADRs.

| Decision | Choice | Reason |
|----------|--------|--------|
| Database | PostgreSQL + pgvector | Unified store for relational + vector data |
| Auth | Supabase Auth | Managed auth with RLS support |
| Background Jobs | BullMQ + Redis | Reliable async processing |
| LLM | Abstraction layer | Provider independence |
| OCR | Tesseract (dev) / Textract (prod) | Cost control |
| Translation | Bhashini/Sarvam abstraction | Indian language quality |
| Embeddings | multilingual-e5-base (local) | Free, multilingual |

## Security Architecture

```
Request → JWT Verification → Application Authorization → Database RLS
           (Supabase)        (NestJS Guards)           (PostgreSQL)
```

Three-layer defense in depth:
1. **Authentication**: Supabase JWT tokens
2. **Application Authorization**: NestJS guards, server-side role checks
3. **Database Isolation**: Row-Level Security on all user-data tables

## Document Processing Pipeline

```
POST /documents/upload
  └→ Create DB record (PENDING_UPLOAD)
  └→ Return presigned URL
  
PUT {presigned-url}  (client uploads to storage directly)

POST /documents/{id}/confirm-upload
  └→ Enqueue BullMQ job
  └→ Return job ID

Background Worker:
  OCR → Classify → Extract → RAG Analysis → Translate → Complete
  (Each step updates progress and document status)
```

## Monorepo Structure

See [README.md](../README.md#repository-structure) for the complete directory tree.
