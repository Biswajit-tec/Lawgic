import { createBrowserClient } from "@supabase/ssr";

// =============================================================================
// Supabase Browser Client
// Uses only public (anon) key — safe for browser
// NEVER put service role key here
// =============================================================================

let client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
  if (client) return client;

  const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const supabaseAnonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase configuration. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  client = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return client;
}
