-- =============================================================================
-- Supabase Security Policies (RLS Fix)
-- Execute this entire script in the Supabase SQL Editor to fix 
-- the "violates row-level security policy" error.
-- =============================================================================

-- 1. Enable RLS for all tables (if not already enabled)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts (Optional but recommended)
DROP POLICY IF EXISTS "Public read access for site_content" ON site_content;
DROP POLICY IF EXISTS "Admin full access for site_content" ON site_content;
DROP POLICY IF EXISTS "Public read access for services" ON services;
DROP POLICY IF EXISTS "Admin full access for services" ON services;
DROP POLICY IF EXISTS "Public read access for published posts" ON posts;
DROP POLICY IF EXISTS "Admin full access for posts" ON posts;
DROP POLICY IF EXISTS "Public insert for contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admin read access for submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admin delete access for submissions" ON contact_submissions;

-- 3. SITE CONTENT POLICIES
-- Anyone can see the content
CREATE POLICY "Public read access for site_content" ON site_content 
FOR SELECT USING (TRUE);

-- Only authenticated admins can change it
CREATE POLICY "Admin full access for site_content" ON site_content 
FOR ALL USING (auth.role() = 'authenticated');


-- 4. SERVICES POLICIES
-- Anyone can see services
CREATE POLICY "Public read access for services" ON services 
FOR SELECT USING (TRUE);

-- Only authenticated admins can manage services
CREATE POLICY "Admin full access for services" ON services 
FOR ALL USING (auth.role() = 'authenticated');


-- 5. BLOG POSTS POLICIES
-- Public can only see published posts
CREATE POLICY "Public read access for published posts" ON posts 
FOR SELECT USING (is_published = TRUE);

-- Admins can do everything (Create, Read, Update, Delete) with all posts
CREATE POLICY "Admin full access for posts" ON posts 
FOR ALL USING (auth.role() = 'authenticated');


-- 6. CONTACT SUBMISSIONS POLICIES
-- Public can send messages
CREATE POLICY "Public insert for contact_submissions" ON contact_submissions 
FOR INSERT WITH CHECK (TRUE);

-- Only admins can see and delete messages
CREATE POLICY "Admin read access for submissions" ON contact_submissions 
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete access for submissions" ON contact_submissions 
FOR DELETE USING (auth.role() = 'authenticated');

-- 7. STORAGE POLICIES (For image uploads)
-- Create bucket if it doesn't exist (can also be done in Dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true) ON CONFLICT DO NOTHING;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;

CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Admin Upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Update" ON storage.objects 
FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Delete" ON storage.objects 
FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
