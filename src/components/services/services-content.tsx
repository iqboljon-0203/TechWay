'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { CheckCircle2, ArrowRight, Briefcase } from 'lucide-react';
import type { LocalizedService } from '@/lib/services';

export default function ServicesPageContent({ 
    services, 
    selectedSlug 
}: { 
    services: LocalizedService[];
    selectedSlug?: string;
}) {
  const t = useTranslations('Services');

  const displayServices = selectedSlug 
    ? services.filter(s => s.slug === selectedSlug)
    : services;

  return (
    <div className="relative pb-32 overflow-hidden bg-background">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-brand-navy/5 -z-10" />
      <div className="absolute top-[10%] -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-[40%] -left-20 w-96 h-96 bg-brand-glow/10 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        {/* Header Section */}
        {!selectedSlug && (
          <div className="mb-32 text-center relative">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 mb-6">
                TechWay Solutions
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-7xl text-foreground mb-8 text-balance" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('sectionTitle')}
              </h1>
              <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
                {t('sectionSubtitle')}
              </p>
            </motion.div>
          </div>
        )}

        {/* Services List */}
        <div className="space-y-40">
          {displayServices.map((service, index) => {
            const Icon = (LucideIcons as any)[service.icon || 'Briefcase'] || Briefcase;
            return (
                <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col gap-16 lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                >
                {/* Visual Side */}
                <div className="flex-1 relative">
                    <div className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] shadow-2xl group border border-white/5">
                    {service.image_url ? (
                        <Image 
                        src={service.image_url} 
                        alt={service.title} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    ) : (
                        <div className={`absolute inset-0 bg-gradient-to-tr ${service.color_gradient} opacity-40`} />
                    )}
                    {/* Overlay Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-tr ${service.color_gradient} opacity-20 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Floating Tag */}
                    {service.tag && (
                        <div className="absolute top-6 left-6">
                        <span className="backdrop-blur-md bg-white/20 text-white text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full border border-white/30 shadow-xl">
                            {service.tag}
                        </span>
                        </div>
                    )}
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className={`absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-[2.5rem] border-2 border-primary/10 border-dashed ${index % 2 === 1 ? 'hidden' : 'block'}`} />
                </div>

                {/* Content Side */}
                <div className="flex-1 space-y-8">
                    <div className={`inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${service.color_gradient} text-white shadow-xl shadow-primary/20`}>
                        <Icon className="h-10 w-10" />
                    </div>
                    
                    <h2 className="text-4xl font-extrabold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                    {service.title}
                    </h2>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                    </p>
                    
                    {service.features && service.features.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {service.features.map((feature, idx) => (
                                <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="flex items-center gap-3 group/feat"
                                >
                                <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover/feat:bg-primary group-hover/feat:text-white`}>
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-sm font-semibold text-foreground/80 group-hover/feat:text-foreground transition-colors">
                                    {feature}
                                </span>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="pt-6">
                    <Link
                        href="https://t.me/techway_ceo"
                        target="_blank"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all underline decoration-2 underline-offset-8"
                    >
                        Batafsil ma'lumot olish
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    </div>
                </div>
                </motion.div>
            );
          })}
        </div>

        {/* Final Stats Section */}
        {!selectedSlug && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-48 rounded-[3rem] bg-brand-navy-dark p-12 lg:p-20 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-hero-pattern opacity-10" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div>
                <div className="text-6xl font-black text-brand-glow mb-4" style={{ fontFamily: 'var(--font-heading)' }}>100+</div>
                <p className="text-white/60 font-semibold tracking-wider uppercase text-sm">{t('statProjects')}</p>
              </div>
              <div>
                <div className="text-6xl font-black text-brand-glow mb-4" style={{ fontFamily: 'var(--font-heading)' }}>99%</div>
                <p className="text-white/60 font-semibold tracking-wider uppercase text-sm">{t('statSatisfaction')}</p>
              </div>
              <div>
                <div className="text-6xl font-black text-brand-glow mb-4" style={{ fontFamily: 'var(--font-heading)' }}>24/7</div>
                <p className="text-white/60 font-semibold tracking-wider uppercase text-sm">{t('statSupport')}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
