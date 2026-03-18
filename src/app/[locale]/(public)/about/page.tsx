import { setRequestLocale } from 'next-intl/server';
import AboutPageContent from '@/components/about/about-content';
import { getSiteContent } from '@/lib/content';
import { type Locale } from '@/i18n/routing';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(locale);

  const aboutData = await getSiteContent('about', typedLocale);

  return (
    <div className="flex flex-col min-h-screen">
      <AboutPageContent content={aboutData} />
    </div>
  );
}
