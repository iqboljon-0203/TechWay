import { setRequestLocale } from 'next-intl/server';
import ServicesPageContent from '@/components/services/services-content';
import { getServices, getAllServiceSlugs } from '@/lib/services';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return routing.locales.flatMap((locale) => 
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const services = await getServices(locale as Locale);

  return (
    <div className="flex flex-col min-h-screen">
      <ServicesPageContent services={services} selectedSlug={slug} />
    </div>
  );
}
