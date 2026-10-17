import { z } from "zod";

// =============================================================================
// Environment Validation — Fail Fast
// If required environment variables are missing, the application MUST NOT start.
// This prevents the application from running in an insecure/broken state.
// =============================================================================

const EnvSchema = z.object({
  // ─── Core ──────────────────────────────────────────────────────────────────
  NODE_ENV: z.enum(["development", "test", "staging", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  API_PREFIX: z.string().default("api/v1"),
  CORS_ORIGINS: z.string().min(1),

  // ─── Database ──────────────────────────────────────────────────────────────
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid PostgreSQL connection URL"),

  // ─── Redis ─────────────────────────────────────────────────────────────────
  REDIS_URL: z.string().min(1, "REDIS_URL is required"),

  // ─── Supabase Auth ─────────────────────────────────────────────────────────
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is required"),
  // CRITICAL: This is a server-only secret. NEVER expose to clients.
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
  SUPABASE_JWT_SECRET: z.string().min(32, "SUPABASE_JWT_SECRET must be at least 32 characters"),

  // ─── AI Service (internal) ─────────────────────────────────────────────────
  AI_SERVICE_URL: z.string().url().default("http://localhost:8001"),
  AI_SERVICE_API_KEY: z.string().min(32, "AI_SERVICE_API_KEY must be at least 32 characters"),

  // ─── Storage ───────────────────────────────────────────────────────────────
  STORAGE_PROVIDER: z.enum(["local", "s3"]).default("local"),
  AWS_REGION: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  // NOTE: AWS credentials should use IAM roles/instance profiles in production
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),

  // ─── Observability ─────────────────────────────────────────────────────────
  SENTRY_DSN: z.string().optional(),
});

export type EnvConfig = z.infer<typeof EnvSchema>;

/**
 * NestJS ConfigModule validate function.
 * Throws if any required variable is missing or invalid.
 * NEVER fall back silently to insecure defaults for secrets.
 */
export function validateEnv(config: Record<string, unknown>): EnvConfig {
  const result = EnvSchema.safeParse(config);
  if (!result.success) {
    const missing = result.error.errors
      .map((e) => `  ${e.path.join(".")}: ${e.message}`)
      .join("\n");
    throw new Error(`\n\nEnvironment validation failed:\n${missing}\n\nSee .env.example for required variables.\n`);
  }

  // Additional cross-field validation
  const env = result.data;
  if (env.STORAGE_PROVIDER === "s3") {
    if (!env.AWS_REGION || !env.AWS_S3_BUCKET) {
      throw new Error("AWS_REGION and AWS_S3_BUCKET are required when STORAGE_PROVIDER=s3");
    }
  }

  return env;
}
