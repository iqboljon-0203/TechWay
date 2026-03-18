// =============================================================================
// Next.js Middleware
// Handles next-intl locale detection and Supabase session refreshing.
// =============================================================================

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// 1. Initialize next-intl middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Subdomain Rewrite Logic
  // Detect if 'admin' subdomain is used
  const host = request.headers.get('host');
  const subdomain = host?.split('.')[0];
  const isSubdomainAdmin = subdomain === 'admin';

  // 3. Supabase Session Refresh
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // 4. Determine Effective Path and Protect Admin Routes
  let currentPath = request.nextUrl.pathname;
  
  // If using the admin subdomain, we effectively target the admin path
  const hasAdminPrefix = routing.locales.some(l => currentPath.startsWith(`/${l}/admin`)) || currentPath.startsWith('/admin');
  const isTargetingAdmin = isSubdomainAdmin || hasAdminPrefix;

  if (isTargetingAdmin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 5. Run intl middleware first to handle locales
  const intlResponse = intlMiddleware(request);

  // 6. Final Rewrite for Subdomain
  if (isSubdomainAdmin && !hasAdminPrefix && intlResponse.status === 200) {
    // If it's a success response (not a redirect from intl), wrap it in a rewrite
    const url = request.nextUrl.clone();
    
    // Determine locale from current or intl-applied headers
    const localeMatch = url.pathname.split('/')[1];
    const locale = routing.locales.includes(localeMatch as any) ? localeMatch : routing.defaultLocale;
    const cleanPath = routing.locales.includes(localeMatch as any) 
      ? url.pathname.replace(`/${localeMatch}`, '') 
      : url.pathname;
      
    url.pathname = `/${locale}/admin${cleanPath === '/' ? '' : cleanPath}`;
    
    // Create rewrite response but keep cookies/headers from intlResponse and original response
    const rewriteResponse = NextResponse.rewrite(url);
    
    // Copy headers and cookies
    intlResponse.headers.forEach((v, k) => rewriteResponse.headers.set(k, v));
    response.cookies.getAll().forEach(c => rewriteResponse.cookies.set(c.name, c.value));
    
    return rewriteResponse;
  }

  return intlResponse;
}

export const config = {
  // Catch all routes except api, _next/static, _next/image, and favicon
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
