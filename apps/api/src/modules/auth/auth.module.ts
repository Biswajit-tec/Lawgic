import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { SupabaseStrategy } from "./strategies/supabase.strategy";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";

// =============================================================================
// Auth Module — Supabase JWT-based authentication
// Authorization is ALWAYS server-side. Never trust client-provided role claims
// without verifying them against the database.
// =============================================================================

@Module({
  imports: [PassportModule.register({ defaultStrategy: "supabase-jwt" })],
  providers: [SupabaseStrategy, JwtAuthGuard, RolesGuard],
  exports: [PassportModule, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
