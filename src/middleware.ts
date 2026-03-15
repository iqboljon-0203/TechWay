// =============================================================================
// Next.js Middleware
// Handles TWO responsibilities:
//   1. Supabase Auth — Refreshes the session cookie on every request
//   2. next-intl — Locale detection and routing
//
// The Supabase session refresh runs FIRST, then next-intl handles routing.
// This ensures auth cookies are always fresh before any page renders.
// =============================================================================

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create the next-intl middleware handler
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // ─── Step 1: Supabase Session Refresh ──────────────────────────
  // Creates a response object that we can modify (add/update cookies).
  // The Supabase server client reads the session from cookies and
  // refreshes the access token if it's about to expire.
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Forward updated auth cookies to the browser
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh the session — this validates the JWT and refreshes
  // the access token if needed. Do NOT remove this call.
  await supabase.auth.getUser();

  // ─── Step 2: next-intl Locale Routing ──────────────────────────
  // Run the intl middleware to handle locale detection and redirects.
  const intlResponse = intlMiddleware(request);

  // Copy Supabase auth cookies onto the intl response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value);
  });

  return intlResponse;
}

export const config = {
  // Match locale-prefixed routes and the root path
  // Excludes: API routes, _next internals, static files
  matcher: ['/', '/(en|uz|ru)/:path*'],
};
