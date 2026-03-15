'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminPosts } from '@/lib/blog';
import { PostRow } from '@/types/supabase';
import { Link } from '@/i18n/navigation';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { createClient } from '@/lib/supabase/client';

export default function PostsPage() {
  const supabase = createClient();
  
  // Use React Query for fetching posts client-side so we can invalidate easily
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      // getAdminPosts runs on the server, but we are in a client component.
      // We should use an API route or supabase directly for client-side React Query.
      // Let's use supabase directly.
      const { data, count, error } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return { posts: data as PostRow[], total: count || 0 };
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your localized blog content
          </p>
        </div>
        <Link 
          href="/admin/posts/new"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title (EN)</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading posts...
                </TableCell>
              </TableRow>
            ) : data?.posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No posts found. Create your first post!
                </TableCell>
              </TableRow>
            ) : (
              data?.posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    {post.title_en || 'Untitled'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {post.slug}
                  </TableCell>
                  <TableCell>
                    {post.is_published ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-500">
                        <Eye className="h-3.5 w-3.5" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-500">
                        <EyeOff className="h-3.5 w-3.5" /> Draft
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {format(new Date(post.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-transparent hover:bg-muted"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      {/* Delete button would go here */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
