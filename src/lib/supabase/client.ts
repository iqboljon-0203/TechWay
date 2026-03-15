// =============================================================================
// Supabase Browser Client
// Used in Client Components ('use client').
// Uses the anon key — safe for browser exposure.
// =============================================================================

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

/**
 * Creates a Supabase client for use in browser/Client Components.
 * This uses the public anon key and respects RLS policies.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
