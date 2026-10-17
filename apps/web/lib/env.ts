                                                                                // =============================================================================
// Web App Environment Variable Validation
// Called at build time and startup to catch missing config early.
// NEVER import server-only secrets here — these run on the client side too.
// =============================================================================

import { z } from "zod";

// Public environment variables (NEXT_PUBLIC_* — exposed to browser)
const PublicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
  NEXT_PUBLIC_API_URL: z.string().url("NEXT_PUBLIC_API_URL must be a valid URL"),
  NEXT_PUBLIC_APP_NAME: z.string().default("LAWgic"),
});

export function getPublicEnv() {
  const result = PublicEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env["NEXT_PUBLIC_SUPABASE_URL"],
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"],
    NEXT_PUBLIC_API_URL: process.env["NEXT_PUBLIC_API_URL"],
    NEXT_PUBLIC_APP_NAME: process.env["NEXT_PUBLIC_APP_NAME"],
  });

  if (!result.success) {
    const missing = result.error.errors.map((e) => `  ${e.path.join(".")}: ${e.message}`).join("\n");
    throw new Error(`\n\nMissing required environment variables:\n${missing}\n\nSee .env.example for setup.\n`);
  }

  return result.data;
}

export const publicEnv = getPublicEnv();
