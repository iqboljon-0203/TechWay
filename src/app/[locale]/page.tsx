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

  // Fetch real blog posts if available
  const { posts } = await getPublishedPosts(typedLocale, { pageSize: 3 });

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* 🚀 Hero Section - Redesigned dual-column layout */}
      <Hero />

      {/* 📊 Floating Quick Services */}
      <FloatingServiceBar />

      {/* 🏢 About Us - Core features and team stats */}
      <AboutSection />

      {/* 🛠 Rich Services Grid - Professional IT-Flow cards */}
      <RichServices />

      {/* 📝 Appointment Form - High conversion glassmorphism */}
      <AppointmentSection />

      {/* 📰 Blog Insights - Expert articles grid */}
      <RichBlogPreview posts={posts.slice(0, 3)} />
    </div>
  );
}
