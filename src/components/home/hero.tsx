'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Hero() {
  const t = useTranslations('Hero');

  // Text reveal animation variants
  const containerVars: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVars: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  const titleWords = t('title').split(' ');

  return (
    <section id="home" className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-background">
      {/* Interactive Background — Animated Grid & Orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Floating Orbs using Framer Motion */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[100px]"
        />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px),
                             linear-gradient(90deg, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
        >
          <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Techway Solutions
        </motion.div>

        {/* Animated Headline */}
        <motion.h1
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="mb-6 flex flex-wrap justify-center gap-x-3 gap-y-1 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVars}
              className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/#contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.7)]"
          >
            {/* Shimmer effect inside the button */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative">{t('cta')}</span>
          </Link>

          <Link
            href="/#services"
            className="group inline-flex items-center justify-center rounded-xl border border-border/50 bg-background/50 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:scale-105"
          >
            <span>{t('ctaSecondary')}</span>
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
