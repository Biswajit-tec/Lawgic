-- =============================================================================
-- Migration 002: Row-Level Security Policies
-- Defense in depth: authentication + application authorization + database isolation
-- =============================================================================

-- =============================================================================
-- Enable RLS on all user-data tables
-- =============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- USERS policies
-- =============================================================================

-- Users can only read their own profile
CREATE POLICY users_select_own ON users
  FOR SELECT USING (supabase_user_id = auth.uid()::TEXT);

-- Users can update their own profile (not role/status — those are admin-only)
CREATE POLICY users_update_own ON users
  FOR UPDATE USING (supabase_user_id = auth.uid()::TEXT);

-- Service role (backend) can read/write all users
CREATE POLICY users_service_role ON users
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- DOCUMENTS policies — Critical: user_id isolation
-- =============================================================================

-- Users can only see their own documents
CREATE POLICY documents_select_own ON documents
  FOR SELECT USING (
    user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
    AND deleted_at IS NULL
  );

CREATE POLICY documents_insert_own ON documents
  FOR INSERT WITH CHECK (
    user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
  );

CREATE POLICY documents_update_own ON documents
  FOR UPDATE USING (
    user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
  );

-- Documents cannot be hard-deleted by users — they can only be soft-deleted
-- Hard deletion is performed by the service role during cleanup jobs
CREATE POLICY documents_service_role ON documents
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- DOCUMENT PAGES — Inherits document access control
-- =============================================================================

CREATE POLICY pages_select_own ON document_pages
  FOR SELECT USING (
    document_id IN (
      SELECT id FROM documents
      WHERE user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
      AND deleted_at IS NULL
    )
  );

CREATE POLICY pages_service_role ON document_pages
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- ANALYSES — Inherits document access control
-- =============================================================================

CREATE POLICY analyses_select_own ON document_analyses
  FOR SELECT USING (
    user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
  );

CREATE POLICY analyses_service_role ON document_analyses
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- ANALYSIS CLAIMS — Via analysis ownership
-- =============================================================================

CREATE POLICY claims_select_own ON analysis_claims
  FOR SELECT USING (
    analysis_id IN (
      SELECT id FROM document_analyses
      WHERE user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
    )
  );

CREATE POLICY claims_service_role ON analysis_claims
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- CITATIONS — Via claim ownership
-- =============================================================================

CREATE POLICY citations_select_own ON citations
  FOR SELECT USING (
    claim_id IN (
      SELECT ac.id FROM analysis_claims ac
      JOIN document_analyses da ON ac.analysis_id = da.id
      WHERE da.user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
    )
  );

CREATE POLICY citations_service_role ON citations
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- CONVERSATIONS
-- =============================================================================

CREATE POLICY conversations_select_own ON conversations
  FOR SELECT USING (
    user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
    AND status != 'deleted'
  );

CREATE POLICY conversations_insert_own ON conversations
  FOR INSERT WITH CHECK (
    user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
  );

CREATE POLICY conversations_service_role ON conversations
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- MESSAGES
-- =============================================================================

CREATE POLICY messages_select_own ON conversation_messages
  FOR SELECT USING (
    conversation_id IN (
      SELECT id FROM conversations
      WHERE user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
      AND status != 'deleted'
    )
  );

CREATE POLICY messages_service_role ON conversation_messages
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- CASES
-- =============================================================================

CREATE POLICY cases_select_own ON cases
  FOR SELECT USING (
    user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
  );

CREATE POLICY cases_insert_own ON cases
  FOR INSERT WITH CHECK (
    user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
  );

CREATE POLICY cases_update_own ON cases
  FOR UPDATE USING (
    user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
  );

CREATE POLICY cases_service_role ON cases
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- CASE EVENTS
-- =============================================================================

CREATE POLICY case_events_select_own ON case_events
  FOR SELECT USING (
    case_id IN (
      SELECT id FROM cases
      WHERE user_id = (SELECT id FROM users WHERE supabase_user_id = auth.uid()::TEXT)
    )
  );

CREATE POLICY case_events_service_role ON case_events
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- AUDIT LOGS — Read-only for users (their own logs), write via service role only
-- =============================================================================

CREATE POLICY audit_logs_select_own ON audit_logs
  FOR SELECT USING (
    actor_id = (SELECT id::TEXT FROM users WHERE supabase_user_id = auth.uid()::TEXT)
  );

-- Audit logs are ONLY written by the service role (backend)
-- Never allow direct user insertion — prevents audit log tampering
CREATE POLICY audit_logs_service_role ON audit_logs
  FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- LEGAL SOURCES — Publicly readable (not user-specific)
-- =============================================================================

-- Legal sources are publicly readable (they are public legal information)
CREATE POLICY legal_sources_public_read ON legal_sources
  FOR SELECT USING (is_verified = TRUE);

CREATE POLICY legal_sources_service_role ON legal_sources
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY chunks_public_read ON legal_source_chunks
  FOR SELECT USING (
    source_id IN (SELECT id FROM legal_sources WHERE is_verified = TRUE)
  );

CREATE POLICY chunks_service_role ON legal_source_chunks
  FOR ALL USING (auth.role() = 'service_role');
