// =============================================================================
// Blog Data Fetching Utilities
// Provides type-safe, locale-aware functions for fetching blog posts.
// =============================================================================

import { createClient, createAdminClient } from '@/lib/supabase/server';
import type { Locale } from '@/i18n/routing';

/** Locale-resolved post shape for use in the frontend */
export interface LocalizedPost {
  id: string;
  slug: string;
  title: string;
  content: any;
  excerpt: string | null;
  image_url: string | null;
  is_published: boolean;
  category: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Fetches all published blog posts for the given locale.
 */
export async function getPublishedPosts(
  locale: Locale,
  options?: { page?: number; pageSize?: number }
): Promise<{ posts: LocalizedPost[]; total: number }> {
  try {
    const supabase = createAdminClient();
    
    const page = options?.page ?? 1;
    const pageSize = options?.pageSize ?? 10;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('[blog] Failed to fetch published posts:', error.message);
      return { posts: [], total: 0 };
    }

    const posts = (data as any[]).map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row[`title_${locale}`],
      content: row[`content_${locale}`],
      excerpt: row[`excerpt_${locale}`],
      category: row[`category_${locale}`],
      image_url: row.image_url,
      is_published: row.is_published,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));

    return { posts, total: count ?? 0 };
  } catch (err) {
    console.error('[blog] Unexpected error in getPublishedPosts:', err);
    return { posts: [], total: 0 };
  }
}

/**
 * Fetches a single published post by its slug.
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
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data[`title_${locale}`],
    content: data[`content_${locale}`],
    excerpt: data[`excerpt_${locale}`],
    category: data[`category_${locale}`],
    image_url: data.image_url,
    is_published: data.is_published,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

/**
 * Fetches all post slugs for static generation.
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('is_published', true);

  if (error) return [];
  return (data as { slug: string }[]).map((row) => row.slug);
}

/**
 * Fetches a raw post by ID for administrative purposes (no locale filtering).
 */
export async function getAdminPostById(id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('[blog] Error fetching admin post:', error?.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error('[blog] Unexpected error in getAdminPostById:', err);
    return null;
  }
}
