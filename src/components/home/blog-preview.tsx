import { getPublishedPosts } from '@/lib/blog';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export async function BlogPreview({ locale }: { locale: string }) {
  const { posts } = await getPublishedPosts(locale as any, { pageSize: 3 });
  
  // Next-Intl convention: use getTranslations inside async Server Components
  const t = await getTranslations('BlogPreview');

  let displayPosts = posts;
  
  // If there are no posts from the database, use high-quality static mock data
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

  return (
    <section id="blog" className="py-24 sm:py-32 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('sectionSubtitle')}
          </p>
        </div>
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors gap-2"
        >
          {t('viewAll')}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayPosts.map((post: any) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}` as any}
              className="group flex flex-col rounded-3xl bg-card border border-border p-5 transition-all hover:bg-muted/50 hover:shadow-xl hover:-translate-y-1"
            >
              {post.image_url ? (
                <div className="w-full aspect-[16/10] mb-5 overflow-hidden rounded-2xl bg-muted relative">
                  <Image 
                    src={post.image_url} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[16/10] mb-5 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center border border-border">
                  <span className="text-primary font-bold opacity-30 text-xl tracking-widest">TECHWAY</span>
                </div>
              )}
              
              <div className="flex items-center gap-x-4 text-xs mb-3">
                <time dateTime={post.created_at} className="text-muted-foreground font-medium">
                  {format(new Date(post.created_at), 'MMM d, yyyy')}
                </time>
              </div>
              
              <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              {post.excerpt && (
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
    </section>
  );
}
