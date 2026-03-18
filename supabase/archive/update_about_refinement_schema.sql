-- =============================================================================
-- Site Content Table Expansion (Additional Refinement)
-- =============================================================================

ALTER TABLE site_content 
ADD COLUMN IF NOT EXISTS about_preview_features_uz JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS about_preview_features_ru JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS about_preview_features_en JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS page_subtitle_uz TEXT,
ADD COLUMN IF NOT EXISTS page_subtitle_ru TEXT,
ADD COLUMN IF NOT EXISTS page_subtitle_en TEXT;

-- Update defaults for existing 'about' section
UPDATE site_content SET
    about_preview_features_uz = '["Professional CRM & ERP", "Kiberxavfsizlik xizmati", "IP Telefoniya & Call markaz", "Tarmoqlarni qurish", "Xizmat ko''rsatish", "Litsenziyalar sotuvi"]'::jsonb,
    about_preview_features_ru = '["Профессиональные CRM и ERP", "Кибербезопасность", "IP-телефония и Call-центр", "Построение сетей", "Обслуживание", "Продажа лицензий"]'::jsonb,
    about_preview_features_en = '["Professional CRM & ERP", "Cybersecurity services", "IP Telephony & Call center", "Network building", "Maintenance", "Software licensing"]'::jsonb,
    page_subtitle_uz = 'Sizning ishonchli texnologik hamkoringiz',
    page_subtitle_ru = 'Ваш надежный технологический партнер',
    page_subtitle_en = 'Your trusted technology partner'
WHERE section_type = 'about';
