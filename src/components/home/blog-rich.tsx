// =============================================================================
// Rich Blog Preview Section — IT-Flow Enterprise Style
// Features:
//   - High-quality card design with hover depth
//   - Metadata (author, category) displayed prominently
//   - Clean, professional grid
// =============================================================================

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

import { LocalizedPost } from '@/lib/blog';

type BlogPreviewProps = {
  posts: LocalizedPost[];
};

export function RichBlogPreview({ posts }: BlogPreviewProps) {
  const t = useTranslations('BlogPreview');

  // Fallback posts if none provided
  const displayPosts = posts.length > 0 ? posts.slice(0, 3) : [
    {
      id: '1',
      slug: 'crm-erp-benefits',
      title: t('mock1_title'),
      excerpt: t('mock1_excerpt'),
      image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&h=250&auto=format&fit=crop',
      created_at: new Date().toISOString(),
      author_name: 'TechWay Team',
      category: 'Business',
    },
    {
      id: '2',
      slug: 'cybersecurity-business',
      title: t('mock2_title'),
      excerpt: t('mock2_excerpt'),
      image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&h=250&auto=format&fit=crop',
      created_at: new Date().toISOString(),
      author_name: 'TechWay Team',
      category: 'Security',
    },
    {
      id: '3',
      slug: 'telephony-call-center',
      title: t('mock3_title'),
      excerpt: t('mock3_excerpt'),
      image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e51ffb?q=80&w=400&h=250&auto=format&fit=crop',
      created_at: new Date().toISOString(),
      author_name: 'TechWay Team',
      category: 'Technology',
    },
  ];

  return (
    <section id="blog" className="py-24 sm:py-32 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 mb-6">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
            {t('badge')}
          </div>
          <h2
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post: any, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Area */}
              <div className="relative h-60 w-full overflow-hidden">
                {post.image_url ? (
                    <Image 
                      src={post.image_url} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-bold">TECHWAY</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-brand-accent text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-lg">
                    {post.category || 'News'}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span>By {(post as any).author_name || 'TechWay Team'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>{format(new Date(post.created_at), 'MMMM d, yyyy')}</span>
                  </div>
                </div>

                <h3 
                  className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                  {post.excerpt}
                </p>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-bold text-foreground hover:text-primary transition-colors group/btn"
                >
                  {t('readMore')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary/20 px-8 py-4 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            {t('viewAllPosts')}
          </Link>
        </div>
      </div>
    </section>
  );
}
