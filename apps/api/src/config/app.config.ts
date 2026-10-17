import { registerAs } from "@nestjs/config";

// =============================================================================
// Application Configuration
// Reads from validated environment variables (see env.validation.ts)
// =============================================================================

export const appConfig = registerAs("app", () => ({
  nodeEnv: process.env["NODE_ENV"] ?? "development",
  port: parseInt(process.env["PORT"] ?? "3001", 10),
  apiPrefix: process.env["API_PREFIX"] ?? "api/v1",
  corsOrigins: process.env["CORS_ORIGINS"] ?? "http://localhost:3000",

  // Database
  databaseUrl: process.env["DATABASE_URL"],

  // Redis
  redisUrl: process.env["REDIS_URL"],

  // Supabase (Auth)
  supabaseUrl: process.env["SUPABASE_URL"],
  supabaseAnonKey: process.env["SUPABASE_ANON_KEY"],
  // NOTE: supabaseServiceRoleKey is server-only — never expose to clients
  supabaseServiceRoleKey: process.env["SUPABASE_SERVICE_ROLE_KEY"],
  supabaseJwtSecret: process.env["SUPABASE_JWT_SECRET"],

  // AI Service (internal)
  aiServiceUrl: process.env["AI_SERVICE_URL"] ?? "http://localhost:8001",
  aiServiceApiKey: process.env["AI_SERVICE_API_KEY"],

  // Storage
  storageProvider: process.env["STORAGE_PROVIDER"] ?? "local",
  awsRegion: process.env["AWS_REGION"],
  awsS3Bucket: process.env["AWS_S3_BUCKET"],

  // Observability
  sentryDsn: process.env["SENTRY_DSN"],
}));
