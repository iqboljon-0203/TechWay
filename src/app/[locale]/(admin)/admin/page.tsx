// =============================================================================
// Admin Dashboard
// Displays a list of all posts (including drafts) fetched securely from
// the database via the admin-only getAdminPosts utility.
// =============================================================================

import { getAdminPosts } from '@/lib/blog';
import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch posts securely using the Server Client
  // This automatically respects RLS because the layout already verified auth.
  const { posts, total } = await getAdminPosts({ page: 1, pageSize: 20 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
        <Button>New Post</Button>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <p className="text-sm text-muted-foreground">
            Total posts found: {total}
          </p>

          <div className="mt-4 divide-y">
            {posts.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                No posts found. Create one.
              </p>
            ) : (
              // Note: using the raw PostRow data shape directly for admin purposes
              posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between py-4">
                  <div className="space-y-1">
                    <p className="font-medium leading-none">
                      {/* Show the localized title dynamically based on the current locale */}
                      {(post[`title_${locale}` as keyof typeof post] as string) ||
                        post.title_en ||
                        'Untitled'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      /{post.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        post.is_published
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {post.is_published ? 'Published' : 'Draft'}
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
