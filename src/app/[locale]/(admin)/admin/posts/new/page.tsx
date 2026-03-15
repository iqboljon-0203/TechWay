// =============================================================================
// Create New Post Page
// Renders the multilingual PostForm for creating a new database record.
// =============================================================================

import { PostForm } from '@/components/admin/post-form';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronLeft } from 'lucide-react';

export default async function NewPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/posts"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Posts
      </Link>
      <PostForm />
    </div>
  );
}
