// =============================================================================
// Home Page (Locale-Specific)
// The main landing page for Techway's corporate website.
// Uses modular components for Hero and Services.
// =============================================================================

import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/hero';
import { ServicesBentoGrid } from '@/components/home/bento-grid';
import { BlogPreview } from '@/components/home/blog-preview';
import { ContactSection } from '@/components/home/contact';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering for this locale
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <Hero />
      <ServicesBentoGrid />
      <BlogPreview locale={locale} />
      <ContactSection />
    </div>
  );
}
