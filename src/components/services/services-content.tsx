'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Database, Network, ShieldCheck, PhoneCall, Key, Globe, Search, BarChart3, Cloud, Layout, Smartphone } from 'lucide-react';
import Image from 'next/image';

export default function ServicesPageContent({ selectedSlug }: { selectedSlug?: string }) {
  const t = useTranslations('Services');

  const detailedServices = [
    {
      id: 'crm',
      title: t('crmTitle'),
      description: t('crmDesc'),
      icon: <Database className="h-8 w-8 text-primary" />,
      features: ['Automated Workflows', 'Customer Tracking', 'Inventory Management', 'Sales Analytics'],
      image: '/images/crm.png',
      color: 'bg-blue-500/10'
    },
    {
      id: 'network',
      title: t('networkTitle'),
      description: t('networkDesc'),
      icon: <Network className="h-8 w-8 text-blue-500" />,
      features: ['High Speed Fiber', 'Managed WiFi', 'SD-WAN Solutions', 'Network Monitoring'],
      image: '/images/network.png',
      color: 'bg-indigo-500/10'
    },
    {
      id: 'cyber',
      title: t('cyberTitle'),
      description: t('cyberDesc'),
      icon: <ShieldCheck className="h-8 w-8 text-emerald-500" />,
      features: ['Firewall Management', 'Endpoint Security', 'Data Encryption', 'Threat Detection'],
      image: '/images/cybersecurity.png',
      color: 'bg-emerald-500/10'
    },
    {
      id: 'ip',
      title: t('ipTitle'),
      description: t('ipDesc'),
      icon: <PhoneCall className="h-8 w-8 text-indigo-500" />,
      features: ['Cloud PBX', 'Call Queueing', 'CRM Integration', '24/7 Support Systems'],
      image: '/images/ip.png',
      color: 'bg-purple-500/10'
    },
    {
      id: 'license',
      title: t('licenseTitle'),
      description: t('licenseDesc'),
      icon: <Key className="h-8 w-8 text-orange-500" />,
      features: ['Windows & Office', 'Antivirus Licenses', 'E-signature Tools', 'Business Software'],
      image: null,
      color: 'bg-orange-500/10'
    }
  ];

  const displayServices = selectedSlug 
    ? detailedServices.filter(s => s.id === selectedSlug)
    : detailedServices;

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header - Only show on main services page */}
      {!selectedSlug && (
        <div className="mb-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
            {t('sectionTitle')}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('sectionSubtitle')}
          </p>
        </div>
      )}

      <div className="space-y-32">
        {displayServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col gap-12 lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
          >
            {/* Image/Visual Part */}
            <div className="flex-1">
              <div className={`relative aspect-square sm:aspect-[16/10] overflow-hidden rounded-3xl border border-border/50 ${service.color} p-8 flex items-center justify-center`}>
                {service.image ? (
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-contain p-12 transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-primary">
                    <service.icon.type className="h-32 w-32 opacity-20" />
                    <span className="text-3xl font-bold opacity-30">TECHWAY</span>
                  </div>
                )}
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Content Part */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {service.icon}
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {service.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust & Stats Section - Only show on main services page */}
      {!selectedSlug && (
        <div className="mt-40 rounded-3xl bg-muted/30 p-12 border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Successful Projects</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-muted-foreground">System Uptime</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Dedicated Support</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
