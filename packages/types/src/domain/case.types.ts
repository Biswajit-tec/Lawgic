// =============================================================================
// Case Domain Types — Legal case tracking
// =============================================================================

import type { UserId } from "./user.types";

export type CaseId = string;
export type CaseEventId = string;

export enum CaseStatus {
  ACTIVE = "active",
  DISPOSED = "disposed",
  PENDING = "pending",
  STAYED = "stayed",
  ARCHIVED = "archived",
}

export enum CaseType {
  CIVIL = "civil",
  CRIMINAL = "criminal",
  CONSUMER = "consumer",
  LABOUR = "labour",
  FAMILY = "family",
  PROPERTY = "property",
  TAX = "tax",
  OTHER = "other",
}

export interface Case {
  readonly id: CaseId;
  readonly userId: UserId;
  readonly title: string;
  readonly caseNumber: string | null;
  readonly court: string | null;
  readonly type: CaseType;
  readonly status: CaseStatus;
  readonly nextHearingDate: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CaseEvent {
  readonly id: CaseEventId;
  readonly caseId: CaseId;
  readonly date: string;
  readonly description: string;
  readonly outcome: string | null;
  readonly nextDate: string | null;
  readonly createdAt: string;
}
