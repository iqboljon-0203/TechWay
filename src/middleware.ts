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
  // ─── Step 1: Create the starting response ──────────────────────
  // We first let next-intl handle the routing/locale logic.
  // This gives us the base response (possibly a redirect or a locale-prefixed page).
  let response = intlMiddleware(request);

  // ─── Step 2: Initialize Supabase Client ───────────────────────
  // We use the response FROM next-intl as the target for Supabase cookies.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Guard against missing environment variables
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables in middleware');
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Update both the request and the existing response
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // ─── Step 3: Refresh Session ──────────────────────────────────
  // This will trigger setAll() if the session needs to be refreshed.
  // We don't necessarily need the user object, just the side effect of cookie updates.
  try {
    await supabase.auth.getUser();
  } catch (err) {
    console.error('Supabase session refresh failed:', err);
  }

  return response;
}

export const config = {
  // Match locale-prefixed routes and the root path
  // Excludes: API routes, _next internals, static files
  matcher: ['/', '/(en|uz|ru)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
