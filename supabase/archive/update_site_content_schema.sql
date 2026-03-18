-- =============================================================================
-- Site Content Table Expansion (About Us Page)
-- =============================================================================

-- Add missing columns for refined About Us page management
ALTER TABLE site_content 
ADD COLUMN IF NOT EXISTS mission_title_uz TEXT,
ADD COLUMN IF NOT EXISTS mission_title_ru TEXT,
ADD COLUMN IF NOT EXISTS mission_title_en TEXT,
ADD COLUMN IF NOT EXISTS mission_stats_uz JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS mission_stats_ru JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS mission_stats_en JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS values_title_uz TEXT,
ADD COLUMN IF NOT EXISTS values_title_ru TEXT,
ADD COLUMN IF NOT EXISTS values_title_en TEXT,
ADD COLUMN IF NOT EXISTS cta_title_uz TEXT,
ADD COLUMN IF NOT EXISTS cta_title_ru TEXT,
ADD COLUMN IF NOT EXISTS cta_title_en TEXT,
ADD COLUMN IF NOT EXISTS cta_subtitle_uz TEXT,
ADD COLUMN IF NOT EXISTS cta_subtitle_ru TEXT,
ADD COLUMN IF NOT EXISTS cta_subtitle_en TEXT,
ADD COLUMN IF NOT EXISTS cta_btn_uz TEXT,
ADD COLUMN IF NOT EXISTS cta_btn_ru TEXT,
ADD COLUMN IF NOT EXISTS cta_btn_en TEXT;

-- Update the initial 'about' data with some defaults if they don't exist
UPDATE site_content SET
    mission_title_uz = COALESCE(mission_title_uz, 'Bizning Missiyamiz'),
    mission_title_ru = COALESCE(mission_title_ru, 'Наша Миссия'),
    mission_title_en = COALESCE(mission_title_en, 'Our Mission'),
    values_title_uz = COALESCE(values_title_uz, 'Bizning qadriyatlarimiz'),
    values_title_ru = COALESCE(values_title_ru, 'Наши ценности'),
    values_title_en = COALESCE(values_title_en, 'Our Values'),
    cta_title_uz = COALESCE(cta_title_uz, 'Sizning biznesingiz uchun eng yaxshi tanlov'),
    cta_title_ru = COALESCE(cta_title_ru, 'Лучший выбор для вашего бизнеса'),
    cta_title_en = COALESCE(cta_title_en, 'The best choice for your business'),
    cta_subtitle_uz = COALESCE(cta_subtitle_uz, 'Keling, birgalikda biznesingizni yangi cho''qqilarga olib chiqamiz.'),
    cta_subtitle_ru = COALESCE(cta_subtitle_ru, 'Давайте вместе выведем ваш бизнес на новые высоты.'),
    cta_subtitle_en = COALESCE(cta_subtitle_en, 'Let''s take your business to new heights together.'),
    cta_btn_uz = COALESCE(cta_btn_uz, 'Hoziroq bog''laning'),
    cta_btn_ru = COALESCE(cta_btn_ru, 'Связаться сейчас'),
    cta_btn_en = COALESCE(cta_btn_en, 'Contact Now'),
    mission_stats_uz = COALESCE(mission_stats_uz, '[{"value": "100+", "label": "Loyihalar"}, {"value": "24/7", "label": "Texnik yordam"}]'::jsonb),
    mission_stats_ru = COALESCE(mission_stats_ru, '[{"value": "100+", "label": "Проектов"}, {"value": "24/7", "label": "Техподдержка"}]'::jsonb),
    mission_stats_en = COALESCE(mission_stats_en, '[{"value": "100+", "label": "Projects"}, {"value": "24/7", "label": "Technical Support"}]'::jsonb)
WHERE section_type = 'about';
