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
import { PricingSection } from '@/components/home/pricing';
import { TeamSection } from '@/components/home/team';
import { RichBlogPreview } from '@/components/home/blog-rich';
import { getPublishedPosts } from '@/lib/blog';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Fetch real blog posts if available
  const { posts } = await getPublishedPosts(locale, { pageSize: 3 });

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

      {/* 💰 Pricing - 3-tier enterprise plans */}
      <PricingSection />

      {/* 👥 Team & Testimonials - Social proof and trust */}
      <TeamSection />

      {/* 📰 Blog Insights - Expert articles grid */}
      <RichBlogPreview posts={posts.slice(0, 3)} />
    </div>
  );
}
