import { createClient } from "@supabase/supabase-js";

const FALLBACK_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrcW51cWJmcndmZ2tocW12dmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjczMDcsImV4cCI6MjA2NDk0MzMwN30.C2z2tM44ZAk-i_zwn_I1I3xKGoM94p_2vx9Q1AzT_Y4";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ekqnuqbfrwfgkhqmvvjc.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createAdminClient() {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_ANON_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
