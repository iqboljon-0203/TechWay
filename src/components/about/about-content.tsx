'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Lightbulb, Users, Target, Rocket, Award } from 'lucide-react';
import Image from 'next/image';

import { SiteContent } from '@/lib/content';

export default function AboutPageContent({ content }: { content: SiteContent | null }) {
  const t = useTranslations('About');

  // Value icons map
  const iconMap: Record<string, any> = { Shield, Lightbulb, Target, Users, Award, Rocket };
  const colorMap: Record<string, string> = {
    Shield: 'text-blue-500',
    Lightbulb: 'text-amber-500',
    Target: 'text-emerald-500',
    Users: 'text-purple-500',
    Award: 'text-orange-500',
    Rocket: 'text-red-500',
  };

  const values = content?.features?.length ? content.features : [
    { icon: 'Shield', title: t('value1'), description: "TechWay jamoasi har bir loyihaga mas'uliyat va professionallik bilan yondashadi." },
    { icon: 'Lightbulb', title: t('value2'), description: "Biz har doim yangi va zamonaviy yechimlarni izlaymiz va tatbiq etamiz." },
    { icon: 'Target', title: t('value3'), description: "Mijozlarimizning muvaffaqiyati bizning asosiy maqsadimizdir." },
  ];

  const missionStats = content?.missionStats?.length ? content.missionStats : [
    { value: '100+', label: 'Loyihalar' },
    { value: '24/7', label: 'Texnik Yordam' },
  ];

  return (
    <div className="bg-background pb-32">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-navy/5 -z-10" />
        <div className="absolute top-[10%] -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 mb-6">
              {content?.badge || 'TechWay Family'}
            </div>
            <h1 className="text-5xl font-black tracking-tight sm:text-7xl text-foreground mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.pageTitle || t('pageTitle')}
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
              {content?.pageSubtitle || t('pageSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <Image 
                src={content?.image_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"}
                alt="Our Mission"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <div className="text-5xl font-bold mb-2">{content?.statNumber || '5+'}</div>
                <div className="text-sm font-medium uppercase tracking-widest opacity-80">{content?.statLabel || t('statLabel')}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Rocket className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                {content?.missionTitle || 'Bizning Missiyamiz'}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {content?.mission || t('mission')}
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6">
                {missionStats.map((stat: any, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-brand-navy/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.valuesTitle || t('valuesTitle')}
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((v: any, i) => {
              const Icon = iconMap[v.icon] || Shield;
              const color = colorMap[v.icon] || 'text-blue-500';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card p-10 rounded-[2rem] shadow-xl border border-border/50 text-center group hover:-translate-y-2 transition-all duration-300"
                >
                  <div className={`mx-auto h-20 w-20 flex items-center justify-center rounded-3xl bg-background shadow-inner mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className={`h-10 w-10 ${color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {v.description || "TechWay jamoasi har bir loyihaga mas'uliyat va professionallik bilan yondashadi."}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[4rem] bg-brand-navy-dark overflow-hidden p-12 lg:p-24 text-center">
             <div className="absolute inset-0 bg-hero-pattern opacity-10" />
             <motion.div 
               initial={{ opacity: 0 }} 
               whileInView={{ opacity: 1 }}
               className="relative z-10 space-y-8"
             >
                <Award className="h-16 w-16 text-brand-glow mx-auto mb-8" />
                <h2 className="text-4xl lg:text-6xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                   {content?.ctaTitle || "Sizning biznesingiz uchun eng yaxshi tanlov"}
                </h2>
                <p className="text-white/60 text-xl max-w-2xl mx-auto">
                   {content?.ctaSubtitle || "Keling, birgalikda biznesingizni yangi cho'qqilarga olib chiqamiz."}
                </p>
                <div className="pt-8">
                  <a 
                    href="https://t.me/techway_ceo"
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-2xl bg-brand-glow px-10 py-5 text-lg font-bold text-brand-navy-dark hover:bg-white transition-all shadow-2xl shadow-brand-glow/20"
                  >
                    {content?.ctaBtnText || "Hoziroq bog'laning"}
                  </a>
                </div>
             </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
