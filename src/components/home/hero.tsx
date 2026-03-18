// =============================================================================
// Hero Section — IT-Flow Enterprise Style
// Dual-column layout with bold typography on the left and professional
// imagery with decorative borders on the right.
// Features a 'Floating Stats' badge overlapping the images.
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

import { SiteContent } from '@/lib/content';

export function Hero({ content }: { content: SiteContent | null }) {
  const t = useTranslations('Hero');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const heroImages = content?.hero_images?.length ? content.hero_images : [
    { src: '/images/hero-professionals.png', alt: 'TechWay Professionals' },
    { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&h=800&auto=format&fit=crop', alt: 'Office' },
    { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&h=800&auto=format&fit=crop', alt: 'Cybersecurity' }
  ];

  const trustPoints = content?.hero_trust_points?.length ? content.hero_trust_points : [
    t('trustPoint1'), t('trustPoint2'), t('trustPoint3'), t('trustPoint4')
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

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
              {content?.hero_badge || t('badge')}
            </motion.div>

            {/* Heading */}
            <h1
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.hero_title || t('titlePart1')}{' '}
              <br className="hidden sm:block" />
              <span className="text-brand-glow">{content?.hero_highlight || t('titleHighlight')}</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0 mx-auto">
              {content?.hero_subtitle || t('subtitle')}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="https://t.me/techway_ceo"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center rounded-lg bg-brand-glow px-7 py-3.5 text-sm font-black text-brand-navy-dark shadow-lg shadow-brand-glow/30 transition-all duration-300 hover:bg-white hover:shadow-white/30 hover:scale-105"
              >
                {content?.hero_cta || t('cta')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Trust Points */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {trustPoints.map((point, i) => (
                <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 + i * 0.1 }}
                   className="flex items-center gap-2 text-sm text-white/80"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand-glow" />
                  <span>{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── Right Column: Professional Imagery (Slider) ──────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="relative"
          >
            {/* Main Image Slider Wrapper */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] w-full overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl shadow-black/30">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 }
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroImages[currentIndex].src}
                    alt={heroImages[currentIndex].alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Dark overlay at bottom for gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
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
                    {content?.hero_stat_number || t('statNumber')}
                  </div>
                  <div className="text-xs font-medium text-white/80">{content?.hero_stat_label || t('statLabel')}</div>
                </div>
              </div>
            </motion.div>

            {/* Active Navigation Arrows */}
            <div className="absolute -bottom-6 right-4 z-10 flex gap-2">
              <button 
                onClick={prevSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 transition-all hover:bg-brand-accent hover:border-brand-accent group"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button 
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent text-white transition-all hover:bg-brand-glow group"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
