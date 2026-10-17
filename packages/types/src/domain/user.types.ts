// =============================================================================
// User Domain Types
// =============================================================================

export type UserId = string;

export enum UserRole {
  CITIZEN = "citizen",
  ADMIN = "admin",
  LEGAL_PROFESSIONAL = "legal_professional",
  MODERATOR = "moderator",
}

export enum UserStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  PENDING_VERIFICATION = "pending_verification",
  DELETED = "deleted",
}

export enum VerificationTier {
  UNVERIFIED = "unverified",
  EMAIL_VERIFIED = "email_verified",
  PHONE_VERIFIED = "phone_verified",
  PROFESSIONAL_VERIFIED = "professional_verified",
}

/** Public user profile — safe to expose to other users */
export interface UserPublicProfile {
  readonly id: UserId;
  readonly displayName: string;
  readonly role: UserRole;
  readonly verificationTier: VerificationTier;
  readonly createdAt: string; // ISO 8601
}

/** Authenticated user context attached to requests */
export interface AuthenticatedUser {
  readonly id: UserId;
  readonly email: string;
  readonly role: UserRole;
  readonly status: UserStatus;
  readonly verificationTier: VerificationTier;
  readonly supabaseUserId: string;
}

/** User preferences (stored in DB, not in auth provider) */
export interface UserPreferences {
  readonly preferredLanguage: SupportedLanguage;
  readonly notificationsEnabled: boolean;
  readonly emailNotificationsEnabled: boolean;
}

/** Supported Indian languages + English */
export enum SupportedLanguage {
  ENGLISH = "en",
  HINDI = "hi",
  TAMIL = "ta",
  TELUGU = "te",
  KANNADA = "kn",
  MALAYALAM = "ml",
  MARATHI = "mr",
  GUJARATI = "gu",
  PUNJABI = "pa",
  BENGALI = "bn",
  ODIA = "or",
  ASSAMESE = "as",
  URDU = "ur",
}
