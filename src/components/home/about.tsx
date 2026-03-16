// =============================================================================
// About Section — IT-Flow Style
// Dual column: Image w/ floating stat badge on left, content on right.
// =============================================================================

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  const t = useTranslations('About');

  const features = ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'] as const;

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* ─── Left: Image with floating badge ────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/about-team.png"
                alt="TechWay team collaborating"
                width={600}
                height={450}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating stats badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-8 -right-4 z-10 rounded-2xl bg-brand-navy p-6 text-white shadow-2xl sm:-right-8"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="h-8 w-8 text-brand-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div
                  className="text-3xl font-extrabold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {t('statNumber')}
                </div>
                <div className="text-xs text-white/70 mt-1">{t('statLabel')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right: Content ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
              {t('badge')}
            </div>

            {/* Heading */}
            <h2
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl !leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('title')}{' '}
              <span className="text-primary">{t('titleHighlight')}</span>
            </h2>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              {t('description')}
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
              {features.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2.5 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{t(key)}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/#services"
              className="group mt-4 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
            >
              {t('cta')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
