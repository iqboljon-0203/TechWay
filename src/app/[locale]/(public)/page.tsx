// =============================================================================
// Home Page (Locale-Specific) — IT-Flow Enterprise Style
// The redesigned main landing page for Techway with a professional, 
// content-rich layout matching the IT-Flow high-fidelity aesthetic.
// =============================================================================

import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/hero';
import { FloatingServiceBar } from '@/components/home/floating-services';
import { AboutSection } from '@/components/home/about';
import { RichServices } from '@/components/home/services-rich';
import { AppointmentSection } from '@/components/home/appointment';
import { RichBlogPreview } from '@/components/home/blog-rich';
import { getPublishedPosts } from '@/lib/blog';
import { getServices, getSiteContent } from '@/lib/content';
import { type Locale } from '@/i18n/routing';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  
  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Parallel data fetching for optimal performance
  const [
    { posts },
    services,
    aboutData,
    homeData
  ] = await Promise.all([
    getPublishedPosts(typedLocale, { pageSize: 3 }),
    getServices(typedLocale),
    getSiteContent('about', typedLocale),
    getSiteContent('home', typedLocale)
  ]);

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* 🚀 Hero Section - Redesigned dual-column layout */}
      <Hero content={homeData} />

      {/* 📊 Floating Quick Services */}
      <FloatingServiceBar content={homeData} />

      {/* 🏢 About Us - Core features and team stats */}
      <AboutSection content={aboutData} />

      {/* 🛠 Rich Services Grid - Professional IT-Flow cards */}
      <RichServices services={services} />

      {/* 📝 Appointment Form - High conversion glassmorphism */}
      <AppointmentSection services={services} />

      {/* 📰 Blog Insights - Expert articles grid */}
      <RichBlogPreview posts={posts.slice(0, 3)} />
    </div>
  );
}
