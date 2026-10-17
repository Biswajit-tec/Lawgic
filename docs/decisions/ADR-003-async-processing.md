# ADR-003: Asynchronous Document Processing via BullMQ

**Status**: Accepted  
**Date**: 2026-09-26

## Context

Document processing involves:
- Fetching large files from storage
- Running OCR (can take 30–120 seconds)
- Multiple LLM calls (each taking 5–30 seconds)
- Translation
- Database writes

A synchronous HTTP request handling all this would:
- Time out (HTTP timeout limits: 30–60 seconds typically)
- Block server threads
- Provide poor UX (no progress feedback)

## Decision

All document processing is **asynchronous via BullMQ + Redis**.

## Architecture

```
POST /documents/{id}/confirm-upload
  → Enqueue job (returns immediately with job ID)
  → Worker picks up job
  → Worker calls AI service for each step
  → Worker updates document status + progress
  → Worker enqueues notification

GET /documents/{id}/status
  → Returns current document status and processing progress
```

## Rationale

1. **Reliability**: BullMQ provides retries, exponential backoff, and dead letter queues
2. **Scalability**: Workers can be scaled independently of the API
3. **UX**: Client can poll status endpoint for real-time progress
4. **Decoupling**: AI service failures don't fail HTTP requests

## Consequences

- Redis is a required infrastructure dependency
- Document status must be queryable by the API
- Worker must update document status at each pipeline step
- Future: WebSockets or SSE can replace polling for real-time updates
