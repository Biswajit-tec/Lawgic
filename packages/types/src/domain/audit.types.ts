// =============================================================================
// Audit Log Domain Types
// Audit logs MUST NOT contain sensitive document content or PII
// =============================================================================

import type { UserId } from "./user.types";

export type AuditLogId = string;

export enum AuditAction {
  // Document actions
  DOCUMENT_UPLOAD_INITIATED = "DOCUMENT_UPLOAD_INITIATED",
  DOCUMENT_UPLOADED = "DOCUMENT_UPLOADED",
  DOCUMENT_VIEWED = "DOCUMENT_VIEWED",
  DOCUMENT_DELETED = "DOCUMENT_DELETED",
  DOCUMENT_SHARED = "DOCUMENT_SHARED",

  // Analysis actions
  ANALYSIS_STARTED = "ANALYSIS_STARTED",
  ANALYSIS_COMPLETED = "ANALYSIS_COMPLETED",
  ANALYSIS_FAILED = "ANALYSIS_FAILED",
  ANALYSIS_VIEWED = "ANALYSIS_VIEWED",

  // Case actions
  CASE_CREATED = "CASE_CREATED",
  CASE_UPDATED = "CASE_UPDATED",
  CASE_ACCESSED = "CASE_ACCESSED",
  CASE_DELETED = "CASE_DELETED",

  // Account actions
  ACCOUNT_CREATED = "ACCOUNT_CREATED",
  ACCOUNT_UPDATED = "ACCOUNT_UPDATED",
  ACCOUNT_DELETED = "ACCOUNT_DELETED",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  PASSWORD_CHANGED = "PASSWORD_CHANGED",

  // Admin actions
  USER_SUSPENDED = "USER_SUSPENDED",
  USER_REINSTATED = "USER_REINSTATED",
  ADMIN_DATA_ACCESS = "ADMIN_DATA_ACCESS",
}

export enum AuditResult {
  SUCCESS = "success",
  FAILURE = "failure",
  DENIED = "denied",
}

/**
 * Audit log entry.
 * NEVER store: document text, PII, passwords, tokens, file contents.
 * ALWAYS store: identifiers, actions, results, timestamps.
 */
export interface AuditLog {
  readonly id: AuditLogId;
  readonly actorId: UserId | "system" | "anonymous";
  readonly action: AuditAction;
  readonly resourceType: string; // e.g., "document", "case", "user"
  readonly resourceId: string; // e.g., document_id
  readonly result: AuditResult;
  readonly requestId: string | null;
  readonly ipAddress: string | null; // hashed or anonymized
  readonly userAgent: string | null;
  readonly metadata: Record<string, string | number | boolean>; // safe KV pairs only
  readonly createdAt: string;
}
