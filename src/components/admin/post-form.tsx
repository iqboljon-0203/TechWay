'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TiptapEditor } from './tiptap-editor';
import { ImageUpload } from './image-upload';
import { Save, Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';
import slugify from 'slugify';
import { useEffect } from 'react';
import { PostInsert, PostUpdate } from '@/types/supabase';

// Create the unified schema covering all locales and global fields
const postSchema = z.object({
  id: z.string().optional(),
  title_en: z.string().min(1, 'English Title is required'),
  title_uz: z.string(),
  title_ru: z.string(),
  slug: z.string().min(1, 'Slug is required'),
  content_en: z.any(),
  content_uz: z.any(),
  content_ru: z.any(),
  excerpt_en: z.string().optional(),
  excerpt_uz: z.string().optional(),
  excerpt_ru: z.string().optional(),
  image_url: z.string().optional(),
  is_published: z.boolean(),
});

type PostFormValues = z.infer<typeof postSchema>;

type PostFormProps = {
  initialData?: PostFormValues;
};

export function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();

  // Initialize the form with rhf
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || {
      title_en: '',
      title_uz: '',
      title_ru: '',
      slug: '',
      content_en: '',
      content_uz: '',
      content_ru: '',
      excerpt_en: '',
      excerpt_uz: '',
      excerpt_ru: '',
      image_url: '',
      is_published: false,
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

  // Auto-generate slug from English title if the user hasn't typed in the slug
  const titleEn = watch('title_en');
  useEffect(() => {
    if (!initialData && titleEn) { // Only auto-generate on create
      setValue('slug', slugify(titleEn, { lower: true, strict: true }), { shouldValidate: true });
    }
  }, [titleEn, setValue, initialData]);

  const mutation = useMutation({
    mutationFn: async (values: PostFormValues) => {
      const { id, ...postData } = values;
      
      const { data: { user } } = await supabase.auth.getUser();

      if (id) {
        // Prepare precise Update type
        const payload: PostUpdate = {
          title_en: postData.title_en,
          title_uz: postData.title_uz,
          title_ru: postData.title_ru,
          slug: postData.slug,
          content_en: postData.content_en || null,
          content_uz: postData.content_uz || null,
          content_ru: postData.content_ru || null,
          excerpt_en: postData.excerpt_en || null,
          excerpt_uz: postData.excerpt_uz || null,
          excerpt_ru: postData.excerpt_ru || null,
          image_url: postData.image_url || null,
          is_published: postData.is_published,
          author_id: user?.id || null,
        };

        const { error } = await (supabase as any)
          .from('posts')
          .update(payload)
          .eq('id', id);
        if (error) throw error;
      } else {
        // Prepare precise Insert type
        const payload: PostInsert = {
          title_en: postData.title_en,
          title_uz: postData.title_uz,
          title_ru: postData.title_ru,
          slug: postData.slug,
          content_en: postData.content_en || null,
          content_uz: postData.content_uz || null,
          content_ru: postData.content_ru || null,
          excerpt_en: postData.excerpt_en || null,
          excerpt_uz: postData.excerpt_uz || null,
          excerpt_ru: postData.excerpt_ru || null,
          image_url: postData.image_url || null,
          is_published: postData.is_published,
          author_id: user?.id || null,
        };

        const { error } = await (supabase as any)
          .from('posts')
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      toast.success(initialData ? 'Post updated' : 'Post created');
      router.push('/admin/posts');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (values: PostFormValues) => {
    mutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {initialData ? 'Edit Post' : 'New Post'}
          </h1>
          <p className="text-muted-foreground mt-1">Manage your centralized content</p>
        </div>
        <Button disabled={mutation.isPending} type="submit" size="sm">
          {mutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="en">English (EN)</TabsTrigger>
              <TabsTrigger value="uz">Uzbek (UZ)</TabsTrigger>
              <TabsTrigger value="ru">Russian (RU)</TabsTrigger>
            </TabsList>

            {/* ENGLISH TAB */}
            <TabsContent value="en" className="space-y-4 outline-none">
              <div className="space-y-2">
                <Label htmlFor="title_en">Title (EN)</Label>
                <Input id="title_en" {...register('title_en')} placeholder="e.g. Next.js 15 Launch" />
                {errors.title_en?.message && <p className="text-xs text-destructive">{String(errors.title_en.message)}</p>}
              </div>
              <div className="space-y-2">
                <Label>Content (EN)</Label>
                <TiptapEditor
                  value={watch('content_en') as string || ''}
                  onChange={(val) => setValue('content_en', val)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt_en">Excerpt (EN)</Label>
                <textarea
                  id="excerpt_en"
                  {...register('excerpt_en')}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  rows={3}
                />
              </div>
            </TabsContent>

            {/* UZBEK TAB */}
            <TabsContent value="uz" className="space-y-4 outline-none">
              <div className="space-y-2">
                <Label htmlFor="title_uz">Title (UZ)</Label>
                <Input id="title_uz" {...register('title_uz')} placeholder="m. Next.js 15 Taqdimoti" />
              </div>
              <div className="space-y-2">
                <Label>Content (UZ)</Label>
                <TiptapEditor
                  value={watch('content_uz') as string || ''}
                  onChange={(val) => setValue('content_uz', val)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt_uz">Excerpt (UZ)</Label>
                <textarea
                  id="excerpt_uz"
                  {...register('excerpt_uz')}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  rows={3}
                />
              </div>
            </TabsContent>

            {/* RUSSIAN TAB */}
            <TabsContent value="ru" className="space-y-4 outline-none">
              <div className="space-y-2">
                <Label htmlFor="title_ru">Title (RU)</Label>
                <Input id="title_ru" {...register('title_ru')} placeholder="н. Запуск Next.js 15" />
              </div>
              <div className="space-y-2">
                <Label>Content (RU)</Label>
                <TiptapEditor
                  value={watch('content_ru') as string || ''}
                  onChange={(val) => setValue('content_ru', val)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt_ru">Excerpt (RU)</Label>
                <textarea
                  id="excerpt_ru"
                  {...register('excerpt_ru')}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Post Settings</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input id="slug" {...register('slug')} />
                {errors.slug?.message && <p className="text-xs text-destructive">{String(errors.slug.message)}</p>}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_published"
                  {...register('is_published')}
                  className="h-4 w-4 rounded border-input"
                />
                <Label htmlFor="is_published" className="font-normal cursor-pointer">
                  Publish (Available publicly)
                </Label>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Featured Image</h3>
            <ImageUpload 
              value={watch('image_url') || ''} 
              onChange={(url) => setValue('image_url', url)} 
            />
          </div>
        </div>
      </div>
    </form>
  );
}
