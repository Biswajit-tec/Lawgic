import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Strategy, ExtractJwt, StrategyOptionsWithRequest } from "passport-jwt";
import { createClient } from "@supabase/supabase-js";
import type { AuthenticatedUser } from "@lawgic/types";
import { UserRole, UserStatus, VerificationTier } from "@lawgic/types";

// =============================================================================
// Supabase JWT Strategy
// Validates Supabase-issued JWTs and loads the server-side user record.
// The role is loaded from OUR database, NOT from the JWT claims,
// to prevent privilege escalation via token manipulation.
// =============================================================================

interface SupabaseJwtPayload {
  sub: string;
  email: string;
  role: string;
  aud: string;
  exp: number;
}

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, "supabase-jwt") {
  private readonly logger = new Logger(SupabaseStrategy.name);

  constructor(private readonly configService: ConfigService) {
    const options: StrategyOptionsWithRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>("SUPABASE_JWT_SECRET"),
      audience: "authenticated",
      issuer: configService.getOrThrow<string>("SUPABASE_URL"),
      passReqToCallback: true,
    };
    super(options);
  }

  /**
   * Called by Passport after JWT signature verification.
   * Loads the user from our application database to get the application role.
   * NEVER trust the role from JWT claims directly — load from DB.
   */
  async validate(_req: unknown, payload: SupabaseJwtPayload): Promise<AuthenticatedUser> {
    const supabaseUserId = payload.sub;

    if (!supabaseUserId) {
      throw new UnauthorizedException("Invalid token: missing subject");
    }

    // TODO: Load user record from application database
    // For now, return a basic authenticated user from JWT claims
    // In production, replace with: const user = await this.usersService.findBySupabaseId(supabaseUserId)
    const user: AuthenticatedUser = {
      id: supabaseUserId, // Will be our internal UUID once DB is populated
      email: payload.email,
      supabaseUserId,
      role: UserRole.CITIZEN, // ALWAYS load from DB, not JWT
      status: UserStatus.ACTIVE, // ALWAYS load from DB
      verificationTier: VerificationTier.EMAIL_VERIFIED,
    };

    return user;
  }
}
