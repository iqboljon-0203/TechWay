-- =============================================================================
-- Techway Database Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- =============================================================================

-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
-- 1. EXTENSIONS
-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

-- Enable UUID generation (usually enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
-- 2. POSTS TABLE
--    Stores multilingual blog posts with per-locale columns for title/content.
--    This column-per-locale approach avoids JOINs and is ISR-friendly.
-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

CREATE TABLE IF NOT EXISTS public.posts (
  -- Primary key
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Timestamps
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- SEO-friendly slug (must be unique across all posts)
  slug          TEXT NOT NULL UNIQUE,

  -- Cover image URL (path from Supabase Storage "blog-images" bucket)
  image_url     TEXT,

  -- Publication status
  is_published  BOOLEAN NOT NULL DEFAULT FALSE,

  -- ─── Localized Title Columns ──────────────────────────────────
  title_en      TEXT NOT NULL DEFAULT '',
  title_uz      TEXT NOT NULL DEFAULT '',
  title_ru      TEXT NOT NULL DEFAULT '',

  -- ─── Localized Content Columns ────────────────────────────────
  -- Using JSONB for rich content (supports structured blocks, HTML, etc.)
  content_en    JSONB NOT NULL DEFAULT '""'::jsonb,
  content_uz    JSONB NOT NULL DEFAULT '""'::jsonb,
  content_ru    JSONB NOT NULL DEFAULT '""'::jsonb,

  -- ─── Optional Metadata ────────────────────────────────────────
  -- Localized excerpt/description for SEO
  excerpt_en    TEXT DEFAULT '',
  excerpt_uz    TEXT DEFAULT '',
  excerpt_ru    TEXT DEFAULT '',

  -- Author reference (links to auth.users)
  author_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Index for fast published-post queries (used by the public blog page)
CREATE INDEX IF NOT EXISTS idx_posts_published
  ON public.posts (is_published, created_at DESC);

-- Index for slug lookups (used by individual blog post pages)
CREATE INDEX IF NOT EXISTS idx_posts_slug
  ON public.posts (slug)
  WHERE is_published = TRUE;

-- ─── Auto-update `updated_at` on row modification ──────────────
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();


-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
-- 3. ROW LEVEL SECURITY (RLS) — POSTS TABLE
-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

-- Enable RLS on posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Policy: Public (anon + authenticated) can SELECT only published posts
CREATE POLICY "Public can view published posts"
  ON public.posts
  FOR SELECT
  USING (is_published = TRUE);

-- Policy: Authenticated users can SELECT ALL posts (including drafts)
-- This allows admins to see their own drafts in the dashboard
CREATE POLICY "Authenticated users can view all posts"
  ON public.posts
  FOR SELECT
  TO authenticated
  USING (TRUE);

-- Policy: Authenticated users can INSERT new posts
CREATE POLICY "Authenticated users can create posts"
  ON public.posts
  FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

-- Policy: Authenticated users can UPDATE any post
CREATE POLICY "Authenticated users can update posts"
  ON public.posts
  FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

-- Policy: Authenticated users can DELETE any post
CREATE POLICY "Authenticated users can delete posts"
  ON public.posts
  FOR DELETE
  TO authenticated
  USING (TRUE);


-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
-- 4. SUPABASE STORAGE — BLOG IMAGES BUCKET
--    Creates a public bucket for storing blog post thumbnails.
--    NOTE: This must be run AFTER storage schema is available.
-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

-- Create the public bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  TRUE,                                    -- Public bucket (images accessible via URL)
  5242880,                                 -- 5MB max file size
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO NOTHING;


-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
-- 5. STORAGE RLS POLICIES — BLOG IMAGES BUCKET
-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

-- Policy: Anyone can VIEW/DOWNLOAD images (public bucket)
CREATE POLICY "Public can view blog images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'blog-images');

-- Policy: Authenticated users can UPLOAD images
CREATE POLICY "Authenticated users can upload blog images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

-- Policy: Authenticated users can UPDATE images (overwrite)
CREATE POLICY "Authenticated users can update blog images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images')
  WITH CHECK (bucket_id = 'blog-images');

-- Policy: Authenticated users can DELETE images
CREATE POLICY "Authenticated users can delete blog images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');


-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
-- 6. SEED DATA (Optional — remove in production)
-- ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

-- INSERT INTO public.posts (slug, is_published, title_en, title_uz, title_ru, content_en, content_uz, content_ru, excerpt_en, excerpt_uz, excerpt_ru)
-- VALUES
-- (
--   'welcome-to-techway',
--   TRUE,
--   'Welcome to Techway',
--   'Techway-ga xush kelibsiz',
--   'Добро пожаловать в Techway',
--   '"Our journey to transform the digital landscape begins here."'::jsonb,
--   '"Raqamli landshaftni o''zgartirish sayohatimiz shu yerdan boshlanadi."'::jsonb,
--   '"Наш путь к преобразованию цифрового ландшафта начинается здесь."'::jsonb,
--   'Our journey to transform the digital landscape begins here.',
--   'Raqamli landshaftni o''zgartirish sayohatimiz shu yerdan boshlanadi.',
--   'Наш путь к преобразованию цифрового ландшафта начинается здесь.'
-- );
