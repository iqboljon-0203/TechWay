// =============================================================================
// Locale Layout
// This is the primary layout for all locale-specific routes.
// It wraps the application with:
//   - next-intl's translation provider
//   - Theme provider (next-themes)
//   - Shared Navbar component
// Server Component — handles metadata and font loading.
// =============================================================================

import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { routing, type Locale } from '@/i18n/routing';
import '../globals.css';

// =============================================================================
// Font Configuration
// Using Inter for body text (clean, professional) and Geist Mono for code.
// =============================================================================
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

// =============================================================================
// Static Params Generation
// Pre-generates routes for all supported locales at build time.
// =============================================================================
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// =============================================================================
// Dynamic Metadata
// Generates locale-specific metadata for SEO.
// =============================================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.Metadata as Record<string, string>;

  return {
    metadataBase: new URL('https://techway.tech'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ru: '/ru',
        uz: '/uz',
      },
    },
    title: {
      default: meta.title,
      template: `%s | Techway`,
    },
    description: meta.description,
    keywords: ['IT', 'software', 'development', 'Techway', 'cloud', 'digital'],
    authors: [{ name: 'Techway' }],
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: locale,
      siteName: 'Techway',
    },
  };
}

// =============================================================================
// Layout Component
// =============================================================================
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate the locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Load all messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {/* Shared Navbar — renders on every page */}
            <Navbar />

            {/* Main content area with top padding for fixed navbar */}
            <main className="min-h-screen pt-16">
              {children}
            </main>

            {/* Shared Footer */}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
