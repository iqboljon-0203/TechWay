// =============================================================================
// Blog Data Fetching Utilities
// Provides type-safe, locale-aware functions for fetching blog posts.
//
// Design decisions:
//   - Uses the SERVER client (runs in Server Components / Route Handlers)
//   - Returns LocalizedPost shape (single title/content, not all locales)
//   - Selects only the columns needed for the current locale (bandwidth optimization)
//   - Compatible with Next.js ISR (Incremental Static Regeneration)
//   - Never exposes service_role or drafts to public visitors
// =============================================================================

import { createClient } from '@/lib/supabase/server';
import type { Locale } from '@/i18n/routing';
import type {
  PostRow,
  LocalizedPost,
  TitleColumn,
  ContentColumn,
  ExcerptColumn,
} from '@/types/supabase';

// =============================================================================
// Constants
// =============================================================================

/** Default page size for paginated queries */
const DEFAULT_PAGE_SIZE = 10;

// =============================================================================
// Internal Helpers
// =============================================================================

/**
 * Maps a raw PostRow to a LocalizedPost by extracting the locale-specific
 * title, content, and excerpt columns.
 */
function localizePost(row: PostRow, locale: Locale): LocalizedPost {
  const titleKey: TitleColumn = `title_${locale}`;
  const contentKey: ContentColumn = `content_${locale}`;
  const excerptKey: ExcerptColumn = `excerpt_${locale}`;

  return {
    id: row.id,
    slug: row.slug,
    title: row[titleKey],
    content: row[contentKey],
    excerpt: row[excerptKey],
    image_url: row.image_url,
    is_published: row.is_published,
    created_at: row.created_at,
    updated_at: row.updated_at,
    author_id: row.author_id,
  };
}

// =============================================================================
// Public API — Blog Post Fetching
// =============================================================================

/**
 * Fetches all published blog posts for the given locale.
 * Returns posts ordered by creation date (newest first).
 *
 * Optimized for ISR:
 *   - Use with `revalidate` in page configuration
 *   - Only fetches published posts (RLS + explicit filter)
 *   - Selects only the columns needed for listing
 *
 * @param locale - The current locale (en, uz, ru)
 * @param options.page - Page number (1-indexed), defaults to 1
 * @param options.pageSize - Number of posts per page, defaults to 10
 * @returns Array of localized posts
 */
export async function getPublishedPosts(
  locale: Locale,
  options?: { page?: number; pageSize?: number }
): Promise<{ posts: LocalizedPost[]; total: number }> {
  try {
    const supabaseAction = await createClient();
    
    // Check if env vars are present (createClient might not throw but fail on first call)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('[blog] Missing Supabase environment variables. Returning empty posts.');
      return { posts: [], total: 0 };
    }

    const supabase = supabaseAction;

    const page = options?.page ?? 1;
    const pageSize = options?.pageSize ?? DEFAULT_PAGE_SIZE;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Build the select string — only fetch required locale columns
    const titleCol: TitleColumn = `title_${locale}`;
    const contentCol: ContentColumn = `content_${locale}`;
    const excerptCol: ExcerptColumn = `excerpt_${locale}`;

    const selectColumns = [
      'id',
      'slug',
      'image_url',
      'is_published',
      'created_at',
      'updated_at',
      'author_id',
      titleCol,
      contentCol,
      excerptCol,
    ].join(', ');

    const { data, error, count } = await supabase
      .from('posts')
      .select(selectColumns, { count: 'exact' })
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('[blog] Failed to fetch published posts:', error.message);
      return { posts: [], total: 0 };
    }

    // Cast rows to PostRow shape for the localizePost helper.
    const posts = (data as unknown as PostRow[]).map((row) =>
      localizePost(row, locale)
    );

    return { posts, total: count ?? 0 };
  } catch (err) {
    console.error('[blog] Unexpected error in getPublishedPosts:', err);
    return { posts: [], total: 0 };
  }
}

/**
 * Fetches a single published post by its slug, localized to the given locale.
 *
 * @param slug - The URL-friendly slug of the post
 * @param locale - The current locale (en, uz, ru)
 * @returns The localized post, or null if not found / not published
 */
export async function getPostBySlug(
  slug: string,
  locale: Locale
): Promise<LocalizedPost | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) {
    if (error?.code !== 'PGRST116') {
      // PGRST116 = "not found", which is expected
      console.error('[blog] Failed to fetch post by slug:', error?.message);
    }
    return null;
  }

  return localizePost(data, locale);
}

/**
 * Fetches all post slugs (for generateStaticParams in ISR).
 * Returns only published post slugs for static generation.
 *
 * @returns Array of slug strings
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[blog] Failed to fetch post slugs:', error.message);
    return [];
  }

  return (data as { slug: string }[]).map((row) => row.slug);
}

// =============================================================================
// Admin API — Full Access (requires authentication)
// These functions are meant for the admin dashboard and should ONLY
// be called from protected routes that verify authentication first.
// =============================================================================

/**
 * Fetches ALL posts (including drafts) for admin management.
 * Requires the user to be authenticated (enforced by RLS).
 *
 * @param options.page - Page number (1-indexed)
 * @param options.pageSize - Number of posts per page
 * @returns Array of raw PostRow objects (all locale columns included)
 */
export async function getAdminPosts(
  options?: { page?: number; pageSize?: number }
): Promise<{ posts: PostRow[]; total: number }> {
  const supabase = await createClient();

  const page = options?.page ?? 1;
  const pageSize = options?.pageSize ?? DEFAULT_PAGE_SIZE;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('[blog/admin] Failed to fetch posts:', error.message);
    return { posts: [], total: 0 };
  }

  return { posts: data ?? [], total: count ?? 0 };
}

/**
 * Fetches a single post by ID for admin editing (includes drafts).
 *
 * @param id - The UUID of the post
 * @returns The raw PostRow, or null if not found
 */
export async function getAdminPostById(id: string): Promise<PostRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('[blog/admin] Failed to fetch post:', error?.message);
    return null;
  }

  return data;
}
