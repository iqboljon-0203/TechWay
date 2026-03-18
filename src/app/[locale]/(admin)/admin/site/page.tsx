import { getSiteContent } from '@/lib/content';
import { SiteContentForm } from '@/components/admin/site-content-form';
import { type Locale } from '@/i18n/routing';

export default async function AdminSitePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [aboutContent, homeContent] = await Promise.all([
    getSiteContent('about', locale as Locale),
    getSiteContent('home', locale as Locale)
  ]);

  return (
    <SiteContentForm initialAbout={aboutContent} initialHome={homeContent} />
  );
}
