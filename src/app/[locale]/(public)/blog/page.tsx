import { getPublishedPosts } from '@/lib/blog';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { type Locale } from '@/i18n/routing';
import { format } from 'date-fns';
import Image from 'next/image';
import { Metadata } from 'next';

// Use Incremental Static Regeneration (ISR) to cache the results for 1 hour.
// This guarantees instant loading for users while updating content seamlessly.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const title = locale === 'ru' ? 'Блог | Techway' : locale === 'uz' ? 'Blog | Techway' : 'Insights & Blog | Techway';
  const description = locale === 'ru' 
    ? 'Последние новости и статьи от Techway' 
    : locale === 'uz' 
    ? 'Techwaydan eng so‘nggi yangiliklar va maqolalar' 
    : 'Latest news, insights, and articles from Techway.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(locale);

  // Note: t works at the server component level but Next-Intl documentation 
  // recommends passing localized strings or using `getTranslations` for server components.
  // For simplicity, we just inline some server translations or rely on DB data.
  const { posts } = await getPublishedPosts(typedLocale);

  // Localization fallback text
  const heroTitle = locale === 'ru' ? 'Наш Блог' : locale === 'uz' ? 'Bizning Blog' : 'Insights & Blog';
  const heroSubtitle = locale === 'ru' ? 'Свежие идеи, новости и статьи о технологиях.' : locale === 'uz' ? 'Texnologiyalar haqida yangiliklar va maqolalar.' : 'Fresh perspectives on technology, business, and innovation.';

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
          {heroTitle}
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {heroSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post: any) => (
          <div 
            key={post.id} 
            className="group relative flex flex-col items-start justify-between rounded-2xl bg-card p-4 transition-all hover:bg-muted/50 hover:shadow-lg border border-border"
          >
            {post.image_url ? (
              <div className="w-full aspect-[16/9] mb-4 overflow-hidden rounded-xl bg-muted relative">
                <Image 
                  src={post.image_url} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-full aspect-[16/9] mb-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center border border-border">
                <span className="text-primary font-bold opacity-30 text-2xl">TECHWAY</span>
              </div>
            )}
            
            <div className="flex items-center gap-x-4 text-xs mb-3">
              <time dateTime={post.created_at} className="text-muted-foreground font-medium bg-muted px-2.5 py-1 rounded-full">
                {format(new Date(post.created_at), 'MMM d, yyyy')}
              </time>
            </div>
            
            <div className="flex-1 w-full">
              <h3 className="mt-2 text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
            </div>

            <div className="mt-6 w-full pt-6 border-t border-border/50">
              <Link
                href={`/blog/${post.slug !== '#' ? post.slug : ''}` as any}
                className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
              >
                {locale === 'uz' ? 'Batafsil ma\'lumot' : locale === 'ru' ? 'Подробнее' : 'Read More'}
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
