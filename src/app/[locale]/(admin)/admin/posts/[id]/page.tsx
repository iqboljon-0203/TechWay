// =============================================================================
// Edit Post Page
// Fetches the specific post by ID and instantiates the PostForm with initialData.
// =============================================================================

import { PostForm } from '@/components/admin/post-form';
import { getAdminPostById } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronLeft } from 'lucide-react';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  // Fetch all language strings directly from DB for editing
  const postData = await getAdminPostById(id);

  if (!postData) {
    notFound();
  }

  // Map database data to form values to satisfy the schema typing
  const initialData = {
    id: postData.id,
    title_en: postData.title_en,
    title_uz: postData.title_uz,
    title_ru: postData.title_ru,
    slug: postData.slug,
    content_en: postData.content_en,
    content_uz: postData.content_uz,
    content_ru: postData.content_ru,
    excerpt_en: postData.excerpt_en || '',
    excerpt_uz: postData.excerpt_uz || '',
    excerpt_ru: postData.excerpt_ru || '',
    image_url: postData.image_url || '',
    is_published: postData.is_published,
    category_uz: postData.category_uz || '',
    category_ru: postData.category_ru || '',
    category_en: postData.category_en || '',
  };

  return (
    <div className="space-y-6">
      <Link
        href="/admin/posts"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Posts
      </Link>
      
      {/* Pass fetched data into form */}
      <PostForm initialData={initialData} />
    </div>
  );
}
