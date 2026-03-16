import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ChevronLeft } from 'lucide-react';
import { type Locale } from '@/i18n/routing';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

// Dynamic SEO metadata mapping
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale as any);

  if (!post) {
    return { title: 'Not Found | Techway' };
  }

  return {
    title: `${post.title} | Techway Blog`,
    description: post.excerpt || `Read ${post.title} on the Techway Blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.created_at,
      images: post.image_url ? [{ url: post.image_url, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: post.image_url ? [post.image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug, typedLocale);

  if (!post) {
    notFound();
  }

  // Convert the unknown JSONB HTML string content to markup (assuming Tiptap returns raw HTML string for now)
  const contentHtml = typeof post.content === 'string' ? post.content : '';

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {locale === 'ru' ? 'Назад в Блог' : locale === 'uz' ? 'Blogga qaytish' : 'Back to Blog'}
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <time dateTime={post.created_at} className="bg-muted px-3 py-1 rounded-full text-foreground font-semibold">
            {format(new Date(post.created_at), 'MMMM d, yyyy')}
          </time>
          <span className="flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold">
            By Techway Team
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>

      {post.image_url && (
        <figure className="relative w-full aspect-[2/1] mb-12 overflow-hidden rounded-2xl border border-border bg-muted shadow-lg">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </figure>
      )}

      {/* 
        Using dangerouslySetInnerHTML because we sanitize and control the Tiptap 
        rich text output from the admin dashboard. In a strict prod environment 
        you may want to use a library like DOMPurify or html-react-parser.
      */}
      <div 
        className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
