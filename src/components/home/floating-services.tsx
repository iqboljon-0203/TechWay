// =============================================================================
// Floating Service Bar — IT-Flow Style
// A white bar that sits between Hero and next section with 3 quick services.
// =============================================================================

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Layout, PhoneForwarded } from 'lucide-react';
import { SiteContent } from '@/lib/content';

// Map string icon names to LucideReact components
const ICON_MAP = {
  Layout: Layout,
  ShieldCheck: ShieldCheck,
  PhoneForwarded: PhoneForwarded,
  // Add other icons as needed
};

export function FloatingServiceBar({ content }: { content: SiteContent | null }) {
  const t = useTranslations('FloatingBar');

  // If content or floating_features is not available, don't render the bar
  if (!content || !content.floating_features || content.floating_features.length === 0) {
    return null;
  }

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
          {content.floating_features.map((feat, i) => {
            // Pick icon based on index or title if needed
            const Icon = i === 0 ? Layout : i === 1 ? ShieldCheck : PhoneForwarded;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-brand-glow/10 border border-brand-glow/20 text-brand-glow shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3
                    className="text-base font-bold text-foreground"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {feat.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
