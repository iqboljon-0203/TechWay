'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Database, Network, ShieldCheck, PhoneCall, Key } from 'lucide-react';
import { ServiceCard } from './service-card';

export function ServicesBentoGrid() {
  const t = useTranslations('Services');

  return (
    <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
          >
            {t('sectionTitle')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {t('sectionSubtitle')}
          </motion.h2>
        </div>

        {/* Bento Grid Layout - Uses CSS Grid. lg: 3 columns, auto rows */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(0,1fr)]">
          {/* Item 1: CRM/ERP — Large Feature (Spans 2 columns, 2 rows on Desktop) */}
          <ServiceCard
            title={t('crmTitle')}
            description={t('crmDesc')}
            icon={<Database className="h-6 w-6" />}
            delay={0.2}
            image="/images/crm.png"
            href="/services/crm"
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-background to-primary/[0.03]"
          />

          {/* Item 2: Networking — Small Card (Top right) */}
          <ServiceCard
            title={t('networkTitle')}
            description={t('networkDesc')}
            icon={<Network className="h-6 w-6" />}
            delay={0.3}
            image="/images/network.png"
            href="/services/network"
            className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gradient-to-tr from-background to-blue-500/[0.02]"
          />

          {/* Item 3: Cybersecurity — Small Card (Bottom right) */}
          <ServiceCard
            title={t('cyberTitle')}
            description={t('cyberDesc')}
            icon={<ShieldCheck className="h-6 w-6" />}
            delay={0.4}
            image="/images/cybersecurity.png"
            href="/services/cyber"
            className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-background to-emerald-500/[0.02]"
          />

          {/* Item 4: IP Telephony — Wide Card (Spans 2 cols on bottom row) */}
          <ServiceCard
            title={t('ipTitle')}
            description={t('ipDesc')}
            icon={<PhoneCall className="h-6 w-6" />}
            delay={0.5}
            image="/images/ip.png"
            href="/services/ip"
            className="md:col-span-2 lg:col-span-2 lg:row-span-1 bg-gradient-to-tl from-background to-indigo-500/[0.02]"
          />

          {/* Item 5: Software Licenses — Small Card (Bottom right) */}
          <ServiceCard
            title={t('licenseTitle')}
            description={t('licenseDesc')}
            icon={<Key className="h-6 w-6" />}
            delay={0.6}
            href="/services/license"
            className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-background to-orange-500/[0.02]"
          />
        </div>
      </div>
    </section>
  );
}
