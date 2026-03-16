// =============================================================================
// Pricing Section — IT-Flow Enterprise Style
// Features:
//   - 3-tier pricing structure
//   - High-contrast 'Standard' plan with glow effect
//   - Clean, professional design with navy and royal blue accents
// =============================================================================

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    key: 'basic',
    price: '49',
    featured: false,
    features: [1, 2, 3, 4],
  },
  {
    key: 'standard',
    price: '99',
    featured: true,
    features: [1, 2, 3, 4, 5, 6],
  },
  {
    key: 'premium',
    price: '199',
    featured: false,
    features: [1, 2, 3, 4, 5, 6, 7],
  },
] as const;

export function PricingSection() {
  const t = useTranslations('Pricing');

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 mb-6"
          >
            {t('badge')}
          </motion.div>
          <h2
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={cn(
                "relative flex flex-col rounded-3xl p-8 transition-all duration-300",
                plan.featured 
                  ? "bg-brand-navy text-white glow-blue scale-105 z-10 border-2 border-brand-accent/50" 
                  : "bg-card border border-border hover:border-primary/50"
              )}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {t('mostPopular')}
                </div>
              )}

              <div className="mb-8">
                <h3 className={cn(
                  "text-xl font-bold mb-4",
                  plan.featured ? "text-white" : "text-foreground"
                )}>
                  {t(`${plan.key}Title`)}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className={cn(
                    "text-sm font-medium",
                    plan.featured ? "text-white/60" : "text-muted-foreground"
                  )}>/ {t('month')}</span>
                </div>
                <p className={cn(
                  "mt-4 text-sm",
                  plan.featured ? "text-white/70" : "text-muted-foreground"
                )}>
                  {t(`${plan.key}Desc`)}
                </p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((featIdx) => (
                  <div key={featIdx} className="flex items-start gap-3">
                    <div className={cn(
                      "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full mt-0.5",
                      plan.featured ? "bg-brand-accent" : "bg-primary/20"
                    )}>
                      <Check className={cn(
                        "h-3 w-3",
                        plan.featured ? "text-white" : "text-primary"
                      )} />
                    </div>
                    <span className={cn(
                      "text-sm",
                      plan.featured ? "text-white/80" : "text-foreground/80"
                    )}>
                      {t(`feature${featIdx}`)}
                    </span>
                  </div>
                ))}
              </div>

              <Button 
                className={cn(
                  "w-full rounded-xl py-6 font-bold transition-all duration-300",
                  plan.featured 
                    ? "bg-brand-accent hover:bg-white hover:text-brand-navy" 
                    : "bg-secondary hover:bg-primary hover:text-white"
                )}
              >
                {t('getStarted')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
