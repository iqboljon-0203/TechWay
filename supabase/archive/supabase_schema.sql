-- =============================================================================
-- TechWay Database Schema (Multilingual)
-- Execute this in the Supabase SQL Editor.
-- =============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SITE CONTENT TABLE (For Home/About page content)
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_type TEXT UNIQUE NOT NULL, -- 'about', 'services_intro', 'stats'
  badge_uz TEXT,
  badge_ru TEXT,
  badge_en TEXT,
  title_uz TEXT,
  title_ru TEXT,
  title_en TEXT,
  highlight_uz TEXT,
  highlight_ru TEXT,
  highlight_en TEXT,
  description_uz TEXT,
  description_ru TEXT,
  description_en TEXT,
  stat_number TEXT,
  stat_label_uz TEXT,
  stat_label_ru TEXT,
  stat_label_en TEXT,
  mission_uz TEXT,
  mission_ru TEXT,
  mission_en TEXT,
  page_title_uz TEXT,
  page_title_ru TEXT,
  page_title_en TEXT,
  page_subtitle_uz TEXT,
  page_subtitle_ru TEXT,
  page_subtitle_en TEXT,
  image_url TEXT,
  features_uz JSONB DEFAULT '[]'::jsonb,
  features_ru JSONB DEFAULT '[]'::jsonb,
  features_en JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. SERVICES TABLE
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  icon TEXT, -- Lucide icon name (e.g., 'Database')
  image_url TEXT,
  color_gradient TEXT, -- Tailwind class prefix (e.g., 'from-blue-600 to-cyan-500')
  tag_uz TEXT,
  tag_ru TEXT,
  tag_en TEXT,
  title_uz TEXT,
  title_ru TEXT,
  title_en TEXT,
  description_uz TEXT,
  description_ru TEXT,
  description_en TEXT,
  features_uz JSONB DEFAULT '[]'::jsonb,
  features_ru JSONB DEFAULT '[]'::jsonb,
  features_en JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. BLOG POSTS TABLE
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  title_uz TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_uz JSONB,
  content_ru JSONB,
  content_en JSONB,
  excerpt_uz TEXT,
  excerpt_ru TEXT,
  excerpt_en TEXT,
  category_uz TEXT,
  category_ru TEXT,
  category_en TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. CONTACT SUBMISSIONS TABLE
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  service TEXT,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. ROW LEVEL SECURITY (RLS)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 7. POLICIES (Public Read/Write)

-- Site Content Patterns
CREATE POLICY "Public read access for site_content" ON site_content FOR SELECT USING (TRUE);
CREATE POLICY "Admin full access for site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- Services Patterns
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (TRUE);
CREATE POLICY "Admin full access for services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- Blog Posts Patterns
CREATE POLICY "Public read access for published posts" ON posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admin full access for posts" ON posts FOR ALL USING (auth.role() = 'authenticated');

-- Contact Submissions Patterns
CREATE POLICY "Public insert for contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin read access for submissions" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete access for submissions" ON contact_submissions FOR DELETE USING (auth.role() = 'authenticated');

-- 7. INITIAL SEED DATA
INSERT INTO site_content (
  section_type,
  badge_uz, badge_ru, badge_en,
  title_uz, title_ru, title_en,
  highlight_uz, highlight_ru, highlight_en,
  description_uz, description_ru, description_en,
  stat_number, stat_label_uz, stat_label_ru, stat_label_en,
  mission_uz, mission_ru, mission_en,
  page_title_uz, page_title_ru, page_title_en,
  page_subtitle_uz, page_subtitle_ru, page_subtitle_en,
  image_url,
  features_uz, features_ru, features_en
) VALUES (
  'about',
  'TechWay Haqida', 'О TechWay', 'About TechWay',
  'Biz biznes uchun professional', 'Мы создаем профессиональные', 'We create professional',
  'IT-yechimlar yaratamiz.', 'ИТ-решения для бизнеса.', 'IT solutions for business.',
  'TechWay kompaniyasi CRM, ERP tizimlari, kiberxavfsizlik, IP telefoniya hamda tarmoqlarni qurish kabi keng qamrovli IT xizmatlarini taqdim etadi.',
  'Компания TechWay предоставляет широкий спектр ИТ-услуг, включая CRM, ERP системы, кибербезопасность, IP-телефонию и построение сетей.',
  'TechWay provides a wide range of IT services including CRM and ERP systems, cybersecurity, IP telephony, and network construction.',
  '5+', 'Yillik tajriba', 'Лет опыта', 'Years of experience',
  'Bizning maqsadimiz — kichik va o''rta biznesni eng zamonaviy IT-yechimlar bilan qurollantirish orqali ularning rivojlanishiga hissa qo''shishdir.',
  'Наша цель — способствовать развитию малого и среднего бизнеса, вооружив его самыми современными ИТ-решениями.',
  'Our mission is to contribute to the growth of small and medium businesses by providing them with advanced IT solutions.',
  'TechWay Haqida', 'О TechWay', 'About TechWay',
  'Sizning ishonchli texnologik hamkoringiz', 'Ваш надежный технологический партнер', 'Your trusted technology partner',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
  '["Professional CRM & ERP", "Kiberxavfsizlik xizmati", "IP Telefoniya & Call markaz", "Tarmoqlarni qurish", "Xizmat ko''rsatish", "Litsenziyalar sotuvi"]'::jsonb,
  '["Профессиональные CRM и ERP", "Услуги кибербезопасности", "IP-телефония и Call-центр", "Строительство сетей", "Обслуживание", "Продажа лицензий"]'::jsonb,
  '["Professional CRM & ERP", "Cybersecurity Service", "IP Telephony & Call Center", "Network Construction", "Service Support", "Software Licensing"]'::jsonb
);

-- Seed Services
INSERT INTO services (slug, icon, image_url, color_gradient, tag_uz, tag_ru, tag_en, title_uz, title_ru, title_en, description_uz, description_ru, description_en, features_uz, features_ru, features_en, sort_order)
VALUES 
('crm', 'Database', 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop', 'from-blue-600 to-cyan-500', 'Avtomatlashtirish', 'Автоматизация', 'Automation', 'CRM va ERP Tizimlari', 'Системы CRM и ERP', 'CRM & ERP Systems', 'Biznes jarayonlarini avtomatlashtirish.', 'Системы для автоматизации бизнес-процессов.', 'Systems for automating business processes.', '["Avtomatlashtirilgan oqimlar", "Mijozlarni kuzatish", "Ombor boshqaruvi", "Sotuv tahlili"]'::jsonb, '["Автоматизация процессов", "Отслеживание клиентов", "Управление складом", "Аналитика продаж"]'::jsonb, '["Automated Workflows", "Customer Tracking", "Inventory Management", "Sales Analytics"]'::jsonb, 0),
('network', 'Network', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=800&auto=format&fit=crop', 'from-indigo-600 to-blue-500', 'Infratuzilma', 'Инфраструктура', 'Infrastructure', 'Tarmoqlarni Qurish va Texnik Xizmat', 'Строительство и Обслуживание Сетей', 'Network Construction & Maintenance', 'Yuqori tezlikdagi lokal tarmoqlar.', 'Проектирование и установка высокоскоростных локальных сетей.', 'Designing and installing high-speed local area networks.', '["Yuqori tezlikdagi optika", "Boshqariladigan Wi-Fi", "Server infratuzilmasi", "Tarmoq monitoringi"]'::jsonb, '["Высокоскоростная оптика", "Управляемый Wi-Fi", "Серверная инфраструктура", "Мониторинг сети"]'::jsonb, '["High Speed Fiber", "Managed WiFi", "Server Infrastructure", "Network Monitoring"]'::jsonb, 1),
('cyber', 'ShieldCheck', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop', 'from-emerald-600 to-teal-500', 'Xavfsizlik', 'Безопасность', 'Security', 'Kiberxavfsizlik Xizmatlari', 'Услуги Кибербезопасности', 'Cybersecurity Services', 'Ma''lumotlar xavfsizligini ta''minlash.', 'Обеспечение безопасности данных.', 'Ensuring data security.', '["Firewall nazorati", "Endpoint xavfsizligi", "Ma''lumotlarni shifrlash", "Tahdidlarni aniqlash"]'::jsonb, '["Управление Firewall", "Защита конечных точек", "Шифрование данных", "Обнаружение угроз"]'::jsonb, '["Firewall Management", "Endpoint Security", "Data Encryption", "Threat Detection"]'::jsonb, 2),
('ip', 'PhoneForwarded', 'https://images.unsplash.com/photo-1516321318423-f06f85e51ffb?q=80&w=800&auto=format&fit=crop', 'from-purple-600 to-indigo-500', 'Aloqa', 'Связь', 'Communication', 'IP Telefoniya va Call-markaz', 'IP-Телефония и Call-центр', 'IP Telephony & Call Center', 'Zamonaviy aloqa tizimlari.', 'Современные системы связи.', 'Modern communication systems.', '["Bulutli ATS", "Qo''ng''iroqlar navbati", "CRM integratsiyasi", "Professional yordam"]'::jsonb, '["Облачная АТС", "Очередь вызовов", "Интеграция с CRM", "Профессиональная поддержка"]'::jsonb, '["Cloud PBX", "Call Queueing", "CRM Integration", "Professional Support"]'::jsonb, 3),
('license', 'Key', 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=800&auto=format&fit=crop', 'from-orange-600 to-yellow-500', 'Litsenziyalash', 'Лицензирование', 'Licensing', 'Dasturiy Ta''minot Litsenziyalari', 'Лицензирование ПО', 'Software Licensing', 'Rasmiy litsenziyalarni sotish.', 'Официальное лицензирование и продажа.', 'Official licensing and sales.', '["Windows va Office", "Antivirus litsenziyalari", "Ixtisoslashgan dasturlar", "Aktivatsiya yordami"]'::jsonb, '["Windows и Office", "Антивирусные лицензии", "Специализированное ПО", "Помощь в активации"]'::jsonb, '["Windows & Office", "Antivirus Licenses", "Specialized Software", "Activation Support"]'::jsonb, 4);

-- Seed Posts
INSERT INTO posts (slug, title_uz, title_ru, title_en, excerpt_uz, excerpt_ru, excerpt_en, image_url, is_published, content_uz, content_ru, content_en, category_uz, category_ru, category_en)
VALUES 
('crm-erp-benefits', 'CRM va ERP tizimlari orqali sotuvlarni 2 barobar oshirish sirlari', 'Секреты увеличения продаж в 2 раза с помощью CRM', 'Secrets to doubling sales with CRM systems', 'Zamonaviy biznesda CRM tizimlarining o''rni haqida.', 'Подробно о внедрении CRM.', 'Details on CRM implementation.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop', TRUE, '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Ma''lumotlar..."}]}]}'::jsonb, '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Данные..."}]}]}'::jsonb, '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Data..."}]}]}'::jsonb, 'Biznes', 'Бизнес', 'Business');
-- 8. STORAGE (Executed via SQL)
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images');
