import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/blog';

// The base URL of your deployed application
const baseUrl = 'https://techway.uz';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPostSlugs();
  const locales = ['en', 'ru', 'uz'];
  
  const entries: MetadataRoute.Sitemap = [];

  // Home page root entry (auto redirects to logic)
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  for (const locale of locales) {
    // Top-level localized pages
    ['', '/services', '/blog', '/contact', '/login'].forEach((route) => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });

    // Dynamic Blog Post routes per locale
    slugs.forEach((slug) => {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      });
    });
  }

  return entries;
}
