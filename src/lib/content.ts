import { createClient, createAdminClient } from '@/lib/supabase/server';
import type { Locale } from '@/i18n/routing';

export interface LocalizedService {
  id: string;
  slug: string;
  icon: string | null;
  image_url: string | null;
  color_gradient: string | null;
  tag: string | null;
  title: string | null;
  description: string | null;
  features: string[];
  sort_order: number;
}

export interface SiteContent {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  statNumber: string;
  statLabel: string;
  missionTitle: string;
  mission: string;
  missionStats: any[];
  valuesTitle: string;
  pageTitle: string;
  pageSubtitle: string;
  image_url: string;
  features: any[];
  preview_features?: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaBtnText: string;
  
  // Home Page Specific
  hero_badge?: string;
  hero_title?: string;
  hero_highlight?: string;
  hero_subtitle?: string;
  hero_cta?: string;
  hero_trust_points?: string[];
  hero_images?: { src: string; alt: string }[];
  hero_stat_number?: string;
  hero_stat_label?: string;
  floating_features?: { title: string; desc: string }[];
}

/**
 * Fetches all active services from Supabase.
 */
export async function getServices(locale: Locale): Promise<LocalizedService[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('[services] Error fetching services:', error.message);
      return [];
    }

    return (data as any[]).map((row) => ({
      id: row.id,
      slug: row.slug,
      icon: row.icon,
      image_url: row.image_url,
      color_gradient: row.color_gradient,
      tag: row[`tag_${locale}`],
      title: row[`title_${locale}`],
      description: row[`description_${locale}`],
      features: row[`features_${locale}`] || [],
      sort_order: row.sort_order,
    }));
  } catch (err) {
    console.error('[services] Unexpected error:', err);
    return [];
  }
}

/**
 * Fetches site-wide content for a specific section.
 */
export async function getSiteContent(sectionType: string, locale: Locale): Promise<SiteContent | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('section_type', sectionType)
      .single();

    if (error || !data) {
      console.error('[site_content] Error fetching content:', error?.message);
      return null;
    }

    return {
      id: data.id,
      badge: data[`badge_${locale}`] || '',
      title: data[`title_${locale}`] || '',
      highlight: data[`highlight_${locale}`] || '',
      description: data[`description_${locale}`] || '',
      statNumber: data.stat_number || '',
      statLabel: data[`stat_label_${locale}`] || '',
      missionTitle: data[`mission_title_${locale}`] || '',
      mission: data[`mission_${locale}`] || '',
      missionStats: data[`mission_stats_${locale}`] || [],
      valuesTitle: data[`values_title_${locale}`] || '',
      pageTitle: data[`page_title_${locale}`] || '',
      pageSubtitle: data[`page_subtitle_${locale}`] || '',
      image_url: data.image_url || '',
      features: data[`features_${locale}`] || [],
      preview_features: data[`about_preview_features_${locale}`] || [],
      ctaTitle: data[`cta_title_${locale}`] || '',
      ctaSubtitle: data[`cta_subtitle_${locale}`] || '',
      ctaBtnText: data[`cta_btn_${locale}`] || '',
      
      hero_badge: data[`hero_badge_${locale}`],
      hero_title: data[`hero_title_${locale}`],
      hero_highlight: data[`hero_highlight_${locale}`],
      hero_subtitle: data[`hero_subtitle_${locale}`],
      hero_cta: data[`hero_cta_${locale}`],
      hero_trust_points: data[`hero_trust_points_${locale}`] || [],
      hero_images: data.hero_images || [],
      hero_stat_number: data.hero_stat_number,
      hero_stat_label: data[`hero_stat_label_${locale}`],
      floating_features: data[`floating_features_${locale}`] || [],
    };
  } catch (err) {
    console.error('[site_content] Unexpected error:', err);
    return null;
  }
}
