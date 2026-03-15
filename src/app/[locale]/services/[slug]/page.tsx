import { setRequestLocale } from 'next-intl/server';
import ServicesPageContent from '@/components/services/services-content';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  const slugs = ['crm', 'network', 'cyber', 'ip', 'license'];
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

  return (
    <div className="flex flex-col min-h-screen">
      <ServicesPageContent selectedSlug={slug} />
    </div>
  );
}
