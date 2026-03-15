// =============================================================================
// Supabase Database Type Definitions
// Matches the schema defined in supabase/schema.sql.
//
// The posts table uses a column-per-locale pattern:
//   title_en, title_uz, title_ru, content_en, content_uz, content_ru
// This avoids JOINs and is optimal for ISR/SSG data fetching.
//
// TIP: Auto-generate these types using the Supabase CLI:
//   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
// =============================================================================

import type { Locale } from '@/i18n/routing';

// =============================================================================
// Database Schema Types
// =============================================================================
export interface Database {
  public: {
    Tables: {
      // ─────────────────────────────────────────────────────────────
      // Blog Posts (multilingual, column-per-locale)
      // ─────────────────────────────────────────────────────────────
      posts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          slug: string;
          image_url: string | null;
          is_published: boolean;
          title_en: string;
          title_uz: string;
          title_ru: string;
          content_en: unknown; // JSONB — parsed as unknown, cast in app code
          content_uz: unknown;
          content_ru: unknown;
          excerpt_en: string | null;
          excerpt_uz: string | null;
          excerpt_ru: string | null;
          author_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          slug: string;
          image_url?: string | null;
          is_published?: boolean;
          title_en: string;
          title_uz?: string;
          title_ru?: string;
          content_en: unknown;
          content_uz?: unknown;
          content_ru?: unknown;
          excerpt_en?: string | null;
          excerpt_uz?: string | null;
          excerpt_ru?: string | null;
          author_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          slug?: string;
          image_url?: string | null;
          is_published?: boolean;
          title_en?: string;
          title_uz?: string;
          title_ru?: string;
          content_en?: unknown;
          content_uz?: unknown;
          content_ru?: unknown;
          excerpt_en?: string | null;
          excerpt_uz?: string | null;
          excerpt_ru?: string | null;
          author_id?: string | null;
        };
      };

      // ─────────────────────────────────────────────────────────────
      // Contact Form Submissions
      // ─────────────────────────────────────────────────────────────
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          created_at?: string;
        };
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      [_ in never]: never;
    };

    Enums: {
      [_ in never]: never;
    };
  };
}

// =============================================================================
// Convenience types derived from the database schema
// =============================================================================

/** A single row from the posts table (all locales included) */
export type PostRow = Database['public']['Tables']['posts']['Row'];

/** Insert payload for creating a new post */
export type PostInsert = Database['public']['Tables']['posts']['Insert'];

/** Update payload for modifying an existing post */
export type PostUpdate = Database['public']['Tables']['posts']['Update'];

/** Locale-resolved post shape for use in the frontend */
export interface LocalizedPost {
  id: string;
  slug: string;
  title: string;
  content: unknown;
  excerpt: string | null;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  author_id: string | null;
}

// =============================================================================
// Helpers for mapping locale columns
// =============================================================================

/** Column name suffix map for title columns */
export type TitleColumn = `title_${Locale}`;

/** Column name suffix map for content columns */
export type ContentColumn = `content_${Locale}`;

/** Column name suffix map for excerpt columns */
export type ExcerptColumn = `excerpt_${Locale}`;
