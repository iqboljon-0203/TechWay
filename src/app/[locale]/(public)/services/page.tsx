import { setRequestLocale } from 'next-intl/server';
import ServicesPageContent from '@/components/services/services-content';
import { getServices } from '@/lib/services';
import type { Locale } from '@/i18n/routing';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services = await getServices(locale as Locale);

  return (
    <div className="flex flex-col min-h-screen">
      <ServicesPageContent services={services} />
    </div>
  );
}
