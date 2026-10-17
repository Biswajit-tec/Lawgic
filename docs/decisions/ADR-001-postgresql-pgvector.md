# ADR-001: PostgreSQL + pgvector for Unified Data and Vector Storage

**Status**: Accepted  
**Date**: 2026-09-26  
**Author**: LAWgic Engineering

## Context

LAWgic requires:
- Relational storage for users, documents, cases, analyses
- Vector storage for semantic search (RAG over legal sources)
- Row-Level Security for data isolation
- Low-cost managed hosting initially

## Decision

Use **PostgreSQL** (via Supabase free tier) with the **pgvector** extension.

## Rationale

1. **Unified storage**: Avoids maintaining a separate vector database (Pinecone, Weaviate, Qdrant) during early development.
2. **RLS**: PostgreSQL's Row-Level Security provides database-level data isolation.
3. **Supabase**: Provides managed PostgreSQL with RLS + Auth integration at no initial cost.
4. **pgvector**: Sufficient for initial scale (millions of chunks). Approximate nearest-neighbor search available via IVFFlat index.
5. **Simplicity**: One database to backup, monitor, and scale.

## Trade-offs

- **Scalability**: At very large vector corpus sizes (tens of millions), a dedicated vector database may outperform pgvector. This will be revisited based on actual usage.
- **Mitigation**: The embedding storage layer is abstracted so a dedicated vector DB can be introduced later without changing business logic.

## Consequences

- pgvector extension must be enabled on the PostgreSQL instance.
- IVFFlat index should be built after sufficient data is inserted (not before).
- Monitor query performance as vector corpus grows.
