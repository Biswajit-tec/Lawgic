# ADR-005: Document Privacy Architecture

**Status**: Accepted  
**Date**: 2026-09-26

## Context

LAWgic will process potentially sensitive personal and legal documents containing:
- Aadhaar numbers
- PAN numbers  
- Names, addresses, phone numbers
- Financial information
- Legal case details
- Court orders

## Decisions

### 1. Documents are not stored in the database

Document files are stored exclusively in object storage (S3/local). PostgreSQL stores only metadata.

**Reason**: Prevents accidental exposure via DB queries, backups, or admin tools.

### 2. Presigned URLs for all file operations

Clients upload/download via short-lived presigned URLs. The API backend never handles raw file bytes.

**Reason**: Minimizes exposure surface. Even if the API is compromised, attacker cannot directly access document contents.

### 3. Safe storage key generation

Storage paths are generated as: `documents/{userId}/{date}/{documentId}.{ext}`

**Never** use user-provided filenames as storage paths.

**Reason**: Path traversal prevention, PII prevention (filenames may contain names/case numbers).

### 4. No PII in logs

Logs contain only: `document_id`, `user_id`, `job_id`, `request_id`.

Never log: document text, Aadhaar, PAN, names, addresses, file contents.

### 5. Data lifecycle

When a user deletes a document, ALL derived data must be deleted:
- Original file from storage
- OCR text (document_pages)
- Analysis and claims
- Embeddings
- Thumbnails
- Processing job records

**Reason**: Prevent orphaned sensitive data.

### 6. Row-Level Security

All user-data tables have RLS enabled. A database query run with a user's credentials cannot access another user's documents.

## Consequences

- Processing pipeline must use service-role credentials
- Cleanup must be asynchronous (document deletion is a background job)
- Presigned URL implementation required for both development and production
