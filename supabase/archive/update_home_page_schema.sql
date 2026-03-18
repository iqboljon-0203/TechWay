-- =============================================================================
-- Site Content Table Expansion (Home Page Hero & Features)
-- =============================================================================

ALTER TABLE site_content 
ADD COLUMN IF NOT EXISTS hero_badge_uz TEXT,
ADD COLUMN IF NOT EXISTS hero_badge_ru TEXT,
ADD COLUMN IF NOT EXISTS hero_badge_en TEXT,
ADD COLUMN IF NOT EXISTS hero_title_uz TEXT,
ADD COLUMN IF NOT EXISTS hero_title_ru TEXT,
ADD COLUMN IF NOT EXISTS hero_title_en TEXT,
ADD COLUMN IF NOT EXISTS hero_highlight_uz TEXT,
ADD COLUMN IF NOT EXISTS hero_highlight_ru TEXT,
ADD COLUMN IF NOT EXISTS hero_highlight_en TEXT,
ADD COLUMN IF NOT EXISTS hero_subtitle_uz TEXT,
ADD COLUMN IF NOT EXISTS hero_subtitle_ru TEXT,
ADD COLUMN IF NOT EXISTS hero_subtitle_en TEXT,
ADD COLUMN IF NOT EXISTS hero_cta_uz TEXT,
ADD COLUMN IF NOT EXISTS hero_cta_ru TEXT,
ADD COLUMN IF NOT EXISTS hero_cta_en TEXT,
ADD COLUMN IF NOT EXISTS hero_trust_points_uz JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS hero_trust_points_ru JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS hero_trust_points_en JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS hero_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS hero_stat_number TEXT,
ADD COLUMN IF NOT EXISTS hero_stat_label_uz TEXT,
ADD COLUMN IF NOT EXISTS hero_stat_label_ru TEXT,
ADD COLUMN IF NOT EXISTS hero_stat_label_en TEXT,
ADD COLUMN IF NOT EXISTS floating_features_uz JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS floating_features_ru JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS floating_features_en JSONB DEFAULT '[]'::jsonb;

-- Insert initial 'home' data if it doesn't exist
INSERT INTO site_content (section_type) 
VALUES ('home') 
ON CONFLICT (section_type) DO NOTHING;

-- Update the 'home' data with defaults based on current components
UPDATE site_content SET
    hero_badge_uz = 'TechWay IT Solutions',
    hero_badge_ru = 'TechWay IT Solutions',
    hero_badge_en = 'TechWay IT Solutions',
    hero_title_uz = 'Biznesingiz uchun Professional',
    hero_title_ru = 'Профессиональные IT-решения',
    hero_title_en = 'Professional IT Solutions',
    hero_highlight_uz = 'IT-yechimlar',
    hero_highlight_ru = 'для вашего бизнеса',
    hero_highlight_en = 'for your business',
    hero_subtitle_uz = 'Biznes jarayonlarini professional avtomatlashtiring. Biz CRM, ERP tizimlari, xavfsizlik va boshqa ko’plab zamonaviy IT-yechimlarini taqdim etamiz.',
    hero_subtitle_ru = 'Автоматизируйте бизнес-процессы профессионально. Мы предлагаем системы CRM, ERP, решения по безопасности и многое другое.',
    hero_subtitle_en = 'Automate your business processes professionally. We provide CRM, ERP systems, security solutions, and many other modern IT developments.',
    hero_cta_uz = 'Bepul Konsultatsiya',
    hero_cta_ru = 'Бесплатная консультация',
    hero_cta_en = 'Free Consultation',
    hero_stat_number = '5+',
    hero_stat_label_uz = 'Yillik tajriba',
    hero_stat_label_ru = 'Лет опыта',
    hero_stat_label_en = 'Years of experience',
    hero_images = '[{"src": "/images/hero-professionals.png", "alt": "TechWay professionals"}]'::jsonb,
    hero_trust_points_uz = '["CRM va ERP tizimlari", "Kiberxavfsizlik xizmati", "IP telefoniya va Call markaz", "Dasturlar litsenziyasi sotuvi"]'::jsonb,
    hero_trust_points_ru = '["Системы CRM и ERP", "Кибербезопасность", "IP-телефония и Call-центр", "Продажа лицензий ПО"]'::jsonb,
    hero_trust_points_en = '["CRM & ERP systems", "Cybersecurity service", "IP telephony & Call center", "Software licensing"]'::jsonb,
    floating_features_uz = '[{"title": "CRM & ERP", "desc": "Biznes jarayonlarini professional avtomatlashtiring."}, {"title": "Kiberxavfsizlik", "desc": "Ma’lumotlaringizni zamonaviy kiberhujumlardan himoya qiling."}, {"title": "IP Telefoniya", "desc": "Biznesingiz uchun sifatli aloqa joriy eting."}]'::jsonb,
    floating_features_ru = '[{"title": "CRM & ERP", "desc": "Автоматизируйте бизнес-процессы профессионально."}, {"title": "Кибербезопасность", "desc": "Защитите свои данные от современных кибератак."}, {"title": "IP Телефония", "desc": "Внедрите качественную связь для вашего бизнеса."}]'::jsonb,
    floating_features_en = '[{"title": "CRM & ERP", "desc": "Professional business process automation."}, {"title": "Cybersecurity", "desc": "Protect your data from modern cyberattacks."}, {"title": "IP Telephony", "desc": "Implement high-quality communication for your business."}]'::jsonb
WHERE section_type = 'home';
