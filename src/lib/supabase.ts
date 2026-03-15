// =============================================================================
// Supabase Client — Re-export Hub
// This file re-exports the browser and server clients for convenience.
// Import from '@/lib/supabase/client' or '@/lib/supabase/server' directly
// when the context is clear, or use this file for backward compatibility.
//
// IMPORTANT:
//   - Browser Client → use in 'use client' components
//   - Server Client → use in Server Components, Route Handlers, Server Actions
//   - NEVER use the service_role key in client-side code
// =============================================================================

// Re-export for convenience
export { createClient as createBrowserClient } from './supabase/client';
export { createClient as createServerClient } from './supabase/server';
