// =============================================================================
// Rich Services Section — IT-Flow Style
// Replaces the basic Bento Grid. Dark navy background, cards with image
// backgrounds, colored icon boxes, and 'View More' arrows.
// =============================================================================

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Network, ShieldCheck, Database, CloudCog, ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    key: 'strategy',
    icon: Database,
    image: '/images/service-consulting.png',
    href: '/services/consulting',
  },
  {
    key: 'analytics',
    icon: Network,
    image: '/images/service-analytics.png',
    href: '/services/analytics',
  },
  {
    key: 'advisory',
    icon: ShieldCheck,
    image: '/images/service-advisory.png',
    href: '/services/advisory',
  },
  {
    key: 'optimization',
    icon: CloudCog,
    image: '/images/service-consulting.png',
    href: '/services/optimization',
  },
] as const;

export function RichServices() {
  const t = useTranslations('RichServices');

  return (
    <section id="services" className="dark bg-brand-navy-dark bg-navy-gradient-dark py-24 sm:py-32 relative overflow-hidden">
      {/* Decorative hexagonal pattern background (represented by high opacity svg or css) */}
      <div className="absolute inset-x-0 top-0 h-[300px] bg-[url('/images/pattern-hex.svg')] bg-repeat-x opacity-10 mix-blend-overlay"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center rounded-full bg-brand-accent/20 px-4 py-1.5 text-sm font-medium text-brand-glow border border-brand-accent/30 mb-6">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-glow" />
              {t('badge')}
            </div>
            <h2
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-5xl leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('titlePart1')}{' '}
              <span className="text-brand-glow">{t('titleHighlight')}</span>{' '}
              {t('titlePart2')}
            </h2>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              {t('description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/services"
              className="group inline-flex items-center rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-glow"
            >
              {t('viewAllBtn')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group card-hover-depth"
              >
                <Link href={service.href} className="block relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0F1D32]">
                  {/* Image Background Top Half */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-brand-navy/60 group-hover:bg-brand-navy/40 transition-colors duration-300 z-10 mix-blend-multiply" />
                    <Image
                      src={service.image}
                      alt={t(`${service.key}Title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Floating Icon Box */}
                    <div className="absolute bottom-4 left-6 z-20 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent text-white shadow-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Content Bottom Half */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold text-white transition-colors group-hover:text-brand-glow mb-3 line-clamp-2 min-h-[56px]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {t(`${service.key}Title`)}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-3 mb-6">
                      {t(`${service.key}Desc`)}
                    </p>

                    <div className="flex items-center text-sm font-semibold text-brand-glow group-hover:text-white transition-colors">
                      {t('readMore')}
                      <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-brand-accent group-hover:border-brand-accent transition-all">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
