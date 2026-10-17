-- =============================================================================
-- Migration 001: Core Schema Foundation
-- LAWgic Database Schema
-- PostgreSQL + pgvector
--
-- SECURITY: Row-Level Security (RLS) is enabled on all user-data tables.
-- A user's data must NEVER be accessible through database queries alone
-- without application-layer authorization as an additional defense layer.
-- =============================================================================

-- Enable pgvector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- For text search

-- =============================================================================
-- ENUMS
-- =============================================================================

CREATE TYPE user_role AS ENUM ('citizen', 'admin', 'legal_professional', 'moderator');
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'pending_verification', 'deleted');
CREATE TYPE verification_tier AS ENUM ('unverified', 'email_verified', 'phone_verified', 'professional_verified');
CREATE TYPE supported_language AS ENUM ('en', 'hi', 'ta', 'te', 'kn', 'ml', 'mr', 'gu', 'pa', 'bn', 'or', 'as', 'ur');

CREATE TYPE document_status AS ENUM (
  'pending_upload', 'uploaded', 'processing',
  'ocr_complete', 'classification_complete', 'extraction_complete',
  'analysis_complete', 'failed', 'deleted'
);
CREATE TYPE document_type AS ENUM (
  'court_order', 'legal_notice', 'affidavit', 'agreement', 'rental_agreement',
  'government_certificate', 'land_record', 'fir', 'chargesheet', 'bail_order',
  'summons', 'property_document', 'identity_document', 'tax_document', 'unknown'
);
CREATE TYPE document_mime_type AS ENUM ('application/pdf', 'image/jpeg', 'image/png', 'image/tiff');

CREATE TYPE analysis_status AS ENUM ('pending', 'in_progress', 'complete', 'failed', 'requires_review');
CREATE TYPE claim_type AS ENUM ('document_fact', 'legal_source', 'ai_interpretation', 'suggested_next_step');
CREATE TYPE confidence_level AS ENUM ('high', 'medium', 'low', 'uncertain');
CREATE TYPE citation_source_type AS ENUM (
  'uploaded_document', 'legislation', 'regulation',
  'court_judgment', 'government_notification', 'official_website'
);

CREATE TYPE legal_source_type AS ENUM (
  'central_act', 'state_act', 'regulation', 'government_notification',
  'supreme_court_judgment', 'high_court_judgment', 'legal_article', 'official_faq'
);

CREATE TYPE conversation_status AS ENUM ('active', 'archived', 'deleted');
CREATE TYPE message_role AS ENUM ('user', 'assistant', 'system');

CREATE TYPE case_status AS ENUM ('active', 'disposed', 'pending', 'stayed', 'archived');
CREATE TYPE case_type AS ENUM ('civil', 'criminal', 'consumer', 'labour', 'family', 'property', 'tax', 'other');

CREATE TYPE audit_action AS ENUM (
  'DOCUMENT_UPLOAD_INITIATED', 'DOCUMENT_UPLOADED', 'DOCUMENT_VIEWED',
  'DOCUMENT_DELETED', 'DOCUMENT_SHARED',
  'ANALYSIS_STARTED', 'ANALYSIS_COMPLETED', 'ANALYSIS_FAILED', 'ANALYSIS_VIEWED',
  'CASE_CREATED', 'CASE_UPDATED', 'CASE_ACCESSED', 'CASE_DELETED',
  'ACCOUNT_CREATED', 'ACCOUNT_UPDATED', 'ACCOUNT_DELETED',
  'LOGIN', 'LOGOUT', 'PASSWORD_CHANGED',
  'USER_SUSPENDED', 'USER_REINSTATED', 'ADMIN_DATA_ACCESS'
);
CREATE TYPE audit_result AS ENUM ('success', 'failure', 'denied');

CREATE TYPE job_status AS ENUM ('waiting', 'active', 'completed', 'failed', 'delayed', 'stalled');

-- =============================================================================
-- USERS
-- =============================================================================

CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supabase_user_id    TEXT UNIQUE NOT NULL,  -- Links to Supabase Auth
  email               TEXT UNIQUE NOT NULL,
  display_name        TEXT NOT NULL DEFAULT 'LAWgic User',
  role                user_role NOT NULL DEFAULT 'citizen',
  status              user_status NOT NULL DEFAULT 'pending_verification',
  verification_tier   verification_tier NOT NULL DEFAULT 'unverified',
  preferred_language  supported_language NOT NULL DEFAULT 'en',
  notifications_enabled         BOOLEAN NOT NULL DEFAULT TRUE,
  email_notifications_enabled   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at          TIMESTAMPTZ
);

CREATE INDEX idx_users_supabase_id ON users(supabase_user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status) WHERE deleted_at IS NULL;

-- =============================================================================
-- DOCUMENTS
-- Metadata only — actual files are in object storage (never in DB)
-- =============================================================================

CREATE TABLE documents (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- SECURITY: storage_path is opaque — never derived from user input
  storage_path        TEXT NOT NULL,
  -- SECURITY: original_filename is for display only, never used as path
  original_filename   TEXT NOT NULL,
  mime_type           document_mime_type NOT NULL,
  file_size_bytes     BIGINT NOT NULL,
  page_count          INTEGER,
  status              document_status NOT NULL DEFAULT 'pending_upload',
  document_type       document_type,
  processing_job_id   TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at          TIMESTAMPTZ  -- Soft delete; actual cleanup is async
);

CREATE INDEX idx_documents_user_id ON documents(user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_documents_status ON documents(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_documents_created ON documents(user_id, created_at DESC) WHERE deleted_at IS NULL;

-- =============================================================================
-- DOCUMENT PAGES (OCR results)
-- SECURITY: OCR text is stored here — treat as sensitive
-- =============================================================================

CREATE TABLE document_pages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id     UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  page_number     INTEGER NOT NULL,
  ocr_text        TEXT,          -- populated after OCR — may contain PII
  ocr_confidence  FLOAT,         -- 0.0–1.0
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(document_id, page_number)
);

CREATE INDEX idx_document_pages_document_id ON document_pages(document_id);

-- =============================================================================
-- DOCUMENT ANALYSES
-- =============================================================================

CREATE TABLE document_analyses (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id         UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status              analysis_status NOT NULL DEFAULT 'pending',
  document_type       TEXT,
  model_used          TEXT,
  rag_source_ids      TEXT[] DEFAULT '{}',
  processing_time_ms  INTEGER,
  disclaimer          TEXT NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_analyses_document_id ON document_analyses(document_id);
CREATE INDEX idx_analyses_user_id ON document_analyses(user_id);

-- =============================================================================
-- ANALYSIS CLAIMS — Citation/Evidence Architecture
-- Every claim must have a type and citations if applicable
-- =============================================================================

CREATE TABLE analysis_claims (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id     UUID NOT NULL REFERENCES document_analyses(id) ON DELETE CASCADE,
  claim_type      claim_type NOT NULL,
  claim_text      TEXT NOT NULL,
  confidence      confidence_level NOT NULL,
  is_verified     BOOLEAN NOT NULL DEFAULT FALSE,
  disclaimer      TEXT,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_claims_analysis_id ON analysis_claims(analysis_id);

-- =============================================================================
-- CITATIONS — Source attribution for claims
-- =============================================================================

CREATE TABLE citations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim_id        UUID NOT NULL REFERENCES analysis_claims(id) ON DELETE CASCADE,
  source_type     citation_source_type NOT NULL,
  source_id       TEXT NOT NULL,
  page_number     INTEGER,
  section_id      TEXT,
  excerpt         TEXT,    -- verbatim excerpt — max 2000 chars
  url             TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_citations_claim_id ON citations(claim_id);

-- =============================================================================
-- LEGAL SOURCES — Knowledge base
-- =============================================================================

CREATE TABLE legal_sources (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_type     legal_source_type NOT NULL,
  title           TEXT NOT NULL,
  jurisdiction    TEXT NOT NULL DEFAULT 'India',
  year            INTEGER,
  official_url    TEXT,
  is_verified     BOOLEAN NOT NULL DEFAULT FALSE,
  last_verified_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_legal_sources_type ON legal_sources(source_type);
CREATE INDEX idx_legal_sources_title ON legal_sources USING gin(to_tsvector('english', title));

-- =============================================================================
-- LEGAL SOURCE CHUNKS — RAG retrieval units
-- =============================================================================

CREATE TABLE legal_source_chunks (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id       UUID NOT NULL REFERENCES legal_sources(id) ON DELETE CASCADE,
  chunk_index     INTEGER NOT NULL,
  chunk_text      TEXT NOT NULL,
  section_title   TEXT,
  section_number  TEXT,  -- e.g., "Section 302"
  page_number     INTEGER,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(source_id, chunk_index)
);

CREATE INDEX idx_chunks_source_id ON legal_source_chunks(source_id);
-- Full-text search index
CREATE INDEX idx_chunks_text_search ON legal_source_chunks USING gin(to_tsvector('english', chunk_text));

-- =============================================================================
-- EMBEDDINGS — pgvector for semantic search
-- Dimension: 768 (multilingual-e5-base default; adjust for your model)
-- =============================================================================

CREATE TABLE embeddings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chunk_id        UUID NOT NULL REFERENCES legal_source_chunks(id) ON DELETE CASCADE,
  model_id        TEXT NOT NULL,          -- e.g., "multilingual-e5-base"
  embedding       vector(768) NOT NULL,   -- Adjust dimension to match your model
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(chunk_id, model_id)
);

-- IVFFlat index for approximate nearest neighbor search
-- Note: requires sufficient data before building (run after inserting 1000+ rows)
-- CREATE INDEX idx_embeddings_vector ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- =============================================================================
-- CONVERSATIONS
-- =============================================================================

CREATE TABLE conversations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_id     UUID REFERENCES documents(id) ON DELETE SET NULL,
  title           TEXT NOT NULL DEFAULT 'Legal Question',
  status          conversation_status NOT NULL DEFAULT 'active',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conversations_user_id ON conversations(user_id) WHERE status != 'deleted';

CREATE TABLE conversation_messages (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id     UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role                message_role NOT NULL,
  content             TEXT NOT NULL,
  rag_source_ids      TEXT[] DEFAULT '{}',
  model_used          TEXT,
  disclaimer          TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation_id ON conversation_messages(conversation_id);

-- =============================================================================
-- CASES
-- =============================================================================

CREATE TABLE cases (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  case_number         TEXT,
  court               TEXT,
  case_type           case_type NOT NULL DEFAULT 'other',
  status              case_status NOT NULL DEFAULT 'active',
  next_hearing_date   DATE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cases_user_id ON cases(user_id);

CREATE TABLE case_events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id         UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  event_date      DATE NOT NULL,
  description     TEXT NOT NULL,
  outcome         TEXT,
  next_date       DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_case_events_case_id ON case_events(case_id);

-- =============================================================================
-- AUDIT LOGS
-- SECURITY: NEVER store document content, PII, tokens, or passwords here
-- Store ONLY: identifiers, actions, results, timestamps
-- =============================================================================

CREATE TABLE audit_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id        TEXT NOT NULL,         -- user_id, 'system', or 'anonymous'
  action          audit_action NOT NULL,
  resource_type   TEXT NOT NULL,
  resource_id     TEXT NOT NULL,
  result          audit_result NOT NULL,
  request_id      TEXT,
  ip_address      TEXT,                  -- hashed or anonymized
  user_agent      TEXT,
  metadata        JSONB DEFAULT '{}',    -- safe KV pairs ONLY
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audit logs are append-only — no updates allowed
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id, created_at DESC);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action, created_at DESC);

-- =============================================================================
-- PROCESSING JOBS
-- Tracks background job state alongside BullMQ
-- =============================================================================

CREATE TABLE processing_jobs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bull_job_id     TEXT UNIQUE,           -- BullMQ job ID
  job_type        TEXT NOT NULL,
  status          job_status NOT NULL DEFAULT 'waiting',
  progress        INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  error_message   TEXT,
  attempts        INTEGER NOT NULL DEFAULT 0,
  max_attempts    INTEGER NOT NULL DEFAULT 3,
  payload         JSONB NOT NULL DEFAULT '{}',  -- Job payload (sanitized — no raw content)
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ
);

CREATE INDEX idx_jobs_status ON processing_jobs(status, created_at DESC);
CREATE INDEX idx_jobs_type ON processing_jobs(job_type, status);

-- =============================================================================
-- UPDATE TRIGGERS
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER analyses_updated_at BEFORE UPDATE ON document_analyses FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER legal_sources_updated_at BEFORE UPDATE ON legal_sources FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER cases_updated_at BEFORE UPDATE ON cases FOR EACH ROW EXECUTE FUNCTION update_updated_at();
