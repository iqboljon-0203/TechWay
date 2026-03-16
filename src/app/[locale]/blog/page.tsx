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

  let displayPosts = posts;
  
  if (!posts || posts.length === 0) {
    displayPosts = [
      {
        id: 'mock-1',
        slug: '#',
        title: locale === 'ru' ? 'Секреты увеличения продаж в 2 раза с помощью CRM' : locale === 'en' ? 'Secrets to doubling sales with CRM systems' : 'CRM Tizimlari orqali sotuvlarni 2 barobar oshirish sirlari',
        excerpt: locale === 'ru' ? 'Подробно о роли CRM-систем в современном бизнесе и о том, как их правильно внедрять для максимального эффекта.' : locale === 'en' ? 'Detailed insights into the role of CRM systems in modern business and how to implement them for maximum efficiency.' : "Zamonaviy biznesda CRM tizimlarining o'rni va ularni qanday qilib to'g'ri joriy qilish haqida batafsil ma'lumotlar.",
        image_url: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 'mock-2',
        slug: '#',
        title: locale === 'ru' ? 'Кибербезопасность: Как защитить корпоративные данные?' : locale === 'en' ? 'Cybersecurity: How to protect your corporate data?' : 'Kiberxavfsizlik: Korporativ ma\'lumotlarni qanday himoya qilish kerak?',
        excerpt: locale === 'ru' ? 'Анализ ИТ-решений, необходимых для защиты от самых распространенных кибератак в этом году.' : locale === 'en' ? 'An analysis of the IT solutions needed to protect your business from the most common cyberattacks this year.' : 'Joriy yildagi eng keng tarqalgan kiberhujumlar va ulardan himoyalanish uchun zarur bo\'lgan IT yechimlar tahlili.',
        image_url: null,
        created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
      },
      {
        id: 'mock-3',
        slug: '#',
        title: locale === 'ru' ? 'Будущее IP-телефонии и современных колл-центров' : locale === 'en' ? 'The future of IP telephony and modern call centers' : 'IP Telefoniya va zamonaviy Call-markazlar kelajagi',
        excerpt: locale === 'ru' ? 'Возможности IP-телефонии и искусственного интеллекта в автоматизации общения с клиентами и повышении качества обслуживания.' : locale === 'en' ? 'The capabilities of IP telephony and AI in automating customer relations and improving conversation quality.' : 'Mijozlar bilan aloqalarni avtomatlashtirish va suhbat sifatini oshirishda IP telefoniya hamda maxsus dasturlarning imkoniyatlari.',
        image_url: null,
        created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
      }
    ] as any;
  }

  // Localization fallback text
  const heroTitle = locale === 'ru' ? 'Наш Блог' : locale === 'uz' ? 'Bizning Blog' : 'Insights & Blog';
  const heroSubtitle = locale === 'ru' ? 'Свежие идеи, новости и статьи о технологиях.' : locale === 'uz' ? 'Texnologiyalar haqida yangiliklar va maqolalar.' : 'Fresh perspectives on technology, business, and innovation.';

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          {heroTitle}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          {heroSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPosts.map((post: any) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.slug !== '#' ? post.slug : ''}` as any}
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
            <div className="group relative">
              <h3 className="mt-2 text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                <span className="absolute inset-0" />
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
