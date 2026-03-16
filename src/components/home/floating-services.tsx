// =============================================================================
// Floating Service Bar — IT-Flow Style
// A white bar that sits between Hero and next section with 3 quick services.
// =============================================================================

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Database, ShieldCheck, PhoneCall } from 'lucide-react';

const QUICK_SERVICES = [
  { key: 'consultancy', icon: Database, color: 'bg-blue-500' },
  { key: 'security', icon: ShieldCheck, color: 'bg-brand-accent' },
  { key: 'backup', icon: PhoneCall, color: 'bg-blue-600' },
] as const;

export function FloatingServiceBar() {
  const t = useTranslations('FloatingBar');

  return (
    <div className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-5xl rounded-2xl bg-card border border-border/50 p-6 shadow-2xl shadow-brand-navy/10"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {QUICK_SERVICES.map(({ key, icon: Icon, color }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${color} text-white shadow-lg`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3
                  className="text-base font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {t(`${key}Title`)}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {t(`${key}Desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
