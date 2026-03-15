// =============================================================================
// Contact Page
// =============================================================================

import { setRequestLocale } from 'next-intl/server';
import { ContactSection } from '@/components/home/contact';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="pt-24 pb-8 flex justify-center">
        {/* We reuse the visually stunning contact block */}
      </div>
      <ContactSection />
    </div>
  );
}
