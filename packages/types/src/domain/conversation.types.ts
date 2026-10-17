// =============================================================================
// Conversation Domain Types
// =============================================================================

import type { UserId } from "./user.types";
import type { DocumentId } from "./document.types";

export type ConversationId = string;
export type MessageId = string;

export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

export enum ConversationStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
  DELETED = "deleted",
}

export interface Conversation {
  readonly id: ConversationId;
  readonly userId: UserId;
  readonly documentId: DocumentId | null; // null if general legal Q&A
  readonly title: string;
  readonly status: ConversationStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ConversationMessage {
  readonly id: MessageId;
  readonly conversationId: ConversationId;
  readonly role: MessageRole;
  readonly content: string;
  /** IDs of legal source chunks used for this response */
  readonly ragSourceIds: string[];
  readonly modelUsed: string | null;
  readonly disclaimer: string | null;
  readonly createdAt: string;
}
