import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const FALLBACK_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrcW51cWJmcndmZ2tocW12dmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjczMDcsImV4cCI6MjA2NDk0MzMwN30.C2z2tM44ZAk-i_zwn_I1I3xKGoM94p_2vx9Q1AzT_Y4";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ekqnuqbfrwfgkhqmvvjc.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    }
  );
}
