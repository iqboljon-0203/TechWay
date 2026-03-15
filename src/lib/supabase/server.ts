// =============================================================================
// Supabase Server Client
// Used in Server Components, Route Handlers, and Server Actions.
// Reads/writes auth cookies for session management.
// NEVER exposes the service_role key.
// =============================================================================

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/**
 * Creates a Supabase client for server-side usage (Server Components,
 * Route Handlers, Server Actions). This client uses the anon key and
 * reads auth cookies from the request to maintain the user's session.
 *
 * @returns A typed Supabase client bound to the current request's cookies.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component where cookies
            // cannot be set. This is safe to ignore — the middleware
            // will refresh the session cookie on the next request.
          }
        },
      },
    }
  );
}
