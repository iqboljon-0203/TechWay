// =============================================================================
// Services Page
// =============================================================================

import { setRequestLocale } from 'next-intl/server';
import ServicesPageContent from '@/components/services/services-content';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <ServicesPageContent />
    </div>
  );
}
