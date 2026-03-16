// =============================================================================
// Hero Section — IT-Flow Enterprise Style
// Dual-column layout with bold typography on the left and professional
// imagery with decorative borders on the right.
// Features a 'Floating Stats' badge overlapping the images.
// =============================================================================

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="dark relative overflow-hidden bg-brand-navy bg-hero-pattern pattern-diamonds">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 py-16 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* ─── Left Column: Typography & CTA ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20"
            >
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-brand-glow" />
              {t('badge')}
            </motion.div>

            {/* Heading */}
            <h1
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('titlePart1')}{' '}
              <br className="hidden sm:block" />
              <span className="text-brand-glow">{t('titleHighlight')}</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0 mx-auto">
              {t('subtitle')}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/#contact"
                className="group inline-flex items-center rounded-lg bg-brand-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-accent/30 transition-all duration-300 hover:bg-brand-glow hover:shadow-brand-glow/30 hover:scale-105"
              >
                {t('cta')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {['trustPoint1', 'trustPoint2', 'trustPoint3', 'trustPoint4'].map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-white/80"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand-glow" />
                  <span>{t(key)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── Right Column: Professional Imagery ──────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl shadow-black/30">
              <Image
                src="/images/hero-professionals.png"
                alt="TechWay IT Solutions Professionals"
                width={640}
                height={480}
                className="h-auto w-full object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Dark overlay at bottom for gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent" />
            </div>

            {/* Floating Stats Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-6 -left-6 z-10 rounded-2xl bg-brand-accent p-5 text-white shadow-2xl shadow-brand-accent/40 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-extrabold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t('statNumber')}
                  </div>
                  <div className="text-xs font-medium text-white/80">{t('statLabel')}</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative — Navigation Arrows */}
            <div className="absolute -bottom-6 right-4 z-10 flex gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 transition-all hover:bg-brand-accent hover:border-brand-accent">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent text-white transition-all hover:bg-brand-glow">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
