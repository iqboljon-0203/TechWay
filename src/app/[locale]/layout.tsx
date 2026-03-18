import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from 'sonner';
import { routing, type Locale } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.Metadata as Record<string, string>;

  return {
    metadataBase: new URL('https://techway.uz'),
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
    icons: {
      icon: '/icon.svg',
      apple: '/icon.svg',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TechWay",
              "url": "https://techway.uz",
              "logo": "https://techway.uz/logo.svg",
              "sameAs": [
                "https://t.me/techway_ceo",
                "https://instagram.com/techway.uz"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+998-XX-XXX-XX-XX",
                "contactType": "sales",
                "availableLanguage": ["Uzbek", "Russian", "English"]
              }
            })
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
