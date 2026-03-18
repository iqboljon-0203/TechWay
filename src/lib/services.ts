import { createClient, createAdminClient } from '@/lib/supabase/server';
import type { Locale } from '@/i18n/routing';

export interface LocalizedService {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string | null;
  image_url: string | null;
  tag: string | null;
  color_gradient: string | null;
  features: string[];
}

/**
 * Fetches all services for the given locale.
 */
export async function getServices(locale: Locale): Promise<LocalizedService[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('[services] Failed to fetch services:', error.message);
      return [];
    }

    return (data as any[]).map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row[`title_${locale}`] || '',
      description: row[`description_${locale}`] || '',
      icon: row.icon,
      image_url: row.image_url,
      tag: row[`tag_${locale}`],
      color_gradient: row.color_gradient || 'from-blue-600 to-cyan-500',
      features: (row[`features_${locale}`] as string[]) || []
    }));
  } catch (err) {
    console.error('[services] Unexpected error in getServices:', err);
    return [];
  }
}

/**
 * Fetches a single service by slug.
 */
export async function getServiceBySlug(slug: string, locale: Locale): Promise<LocalizedService | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data[`title_${locale}`] || '',
      description: data[`description_${locale}`] || '',
      icon: data.icon,
      image_url: data.image_url,
      tag: data[`tag_${locale}`],
      color_gradient: data.color_gradient || 'from-blue-600 to-cyan-500',
      features: (data[`features_${locale}`] as string[]) || []
    };
  } catch (err) {
    console.error('[services] Unexpected error in getServiceBySlug:', err);
    return null;
  }
}

/**
 * Fetches all service slugs for static generation.
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('services')
    .select('slug');

  if (error) return [];
  return (data as { slug: string }[]).map((row) => row.slug);
}

/**
 * Fetches a raw service by ID for administrative purposes (no locale filtering).
 */
export async function getAdminServiceById(id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('[services] Error fetching admin service:', error?.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error('[services] Unexpected error in getAdminServiceById:', err);
    return null;
  }
}
