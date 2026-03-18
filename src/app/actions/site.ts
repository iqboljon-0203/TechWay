'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSiteContent(id: string, sectionType: string, locale: string, data: any) {
  try {
    const supabase = await createClient();

    // The data object received contains keys like 'badge', 'title', etc.
    // We need to map them back to database columns for the specific locale.
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (data.badge !== undefined) updateData[`badge_${locale}`] = data.badge;
    if (data.title !== undefined) updateData[`title_${locale}`] = data.title;
    if (data.highlight !== undefined) updateData[`highlight_${locale}`] = data.highlight;
    if (data.description !== undefined) updateData[`description_${locale}`] = data.description;
    if (data.statNumber !== undefined) updateData.stat_number = data.statNumber;
    if (data.statLabel !== undefined) updateData[`stat_label_${locale}`] = data.statLabel;
    if (data.missionTitle !== undefined) updateData[`mission_title_${locale}`] = data.missionTitle;
    if (data.mission !== undefined) updateData[`mission_${locale}`] = data.mission;
    if (data.missionStats !== undefined) updateData[`mission_stats_${locale}`] = data.missionStats;
    if (data.valuesTitle !== undefined) updateData[`values_title_${locale}`] = data.valuesTitle;
    if (data.pageTitle !== undefined) updateData[`page_title_${locale}`] = data.pageTitle;
    if (data.pageSubtitle !== undefined) updateData[`page_subtitle_${locale}`] = data.pageSubtitle;
    if (data.image_url !== undefined) updateData.image_url = data.image_url;
    if (data.features !== undefined) updateData[`features_${locale}`] = data.features;
    if (data.preview_features !== undefined) updateData[`about_preview_features_${locale}`] = data.preview_features;
    if (data.ctaTitle !== undefined) updateData[`cta_title_${locale}`] = data.ctaTitle;
    if (data.ctaSubtitle !== undefined) updateData[`cta_subtitle_${locale}`] = data.ctaSubtitle;
    if (data.ctaBtnText !== undefined) updateData[`cta_btn_${locale}`] = data.ctaBtnText;

    // Home Page Specific
    if (data.hero_badge !== undefined) updateData[`hero_badge_${locale}`] = data.hero_badge;
    if (data.hero_title !== undefined) updateData[`hero_title_${locale}`] = data.hero_title;
    if (data.hero_highlight !== undefined) updateData[`hero_highlight_${locale}`] = data.hero_highlight;
    if (data.hero_subtitle !== undefined) updateData[`hero_subtitle_${locale}`] = data.hero_subtitle;
    if (data.hero_cta !== undefined) updateData[`hero_cta_${locale}`] = data.hero_cta;
    if (data.hero_trust_points !== undefined) updateData[`hero_trust_points_${locale}`] = data.hero_trust_points;
    if (data.hero_images !== undefined) updateData.hero_images = data.hero_images;
    if (data.hero_stat_number !== undefined) updateData.hero_stat_number = data.hero_stat_number;
    if (data.hero_stat_label !== undefined) updateData[`hero_stat_label_${locale}`] = data.hero_stat_label;
    if (data.floating_features !== undefined) updateData[`floating_features_${locale}`] = data.floating_features;

    const { error } = await supabase
      .from('site_content')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('[updateSiteContent] error:', error.message);
      return { success: false, error: error.message };
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (err: any) {
    console.error('[updateSiteContent] Unexpected error:', err);
    return { success: false, error: err.message || 'Unexpected error' };
  }
}
