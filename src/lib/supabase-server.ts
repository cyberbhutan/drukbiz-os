import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const FALLBACK_ANON_KEY = "sb_publishable_Z_R-rRCK_OVDoT-ZQREKGg_OAGFAhz6";

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
