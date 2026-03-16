// =============================================================================
// Team & Testimonials Section — IT-Flow Enterprise Style
// Features:
//   - Professional profile cards for team members
//   - 'Client Reviews' with Google ratings (5.0 stars)
//   - Brand logos row (Sisense, Netskope, etc.)
// =============================================================================

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const TEAM = [
  { name: 'John Smith', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Sarah Wilson', role: 'CTO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'David Chen', role: 'Security Architect', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop' },
] as const;

const LOGOS = [
  { name: 'Sisense', src: 'https://logo.clearbit.com/sisense.com' },
  { name: 'Netskope', src: 'https://logo.clearbit.com/netskope.com' },
  { name: 'Razorpay', src: 'https://logo.clearbit.com/razorpay.com' },
  { name: 'Flutterwave', src: 'https://logo.clearbit.com/flutterwave.com' },
  { name: 'Riskified', src: 'https://logo.clearbit.com/riskified.com' },
  { name: 'Workato', src: 'https://logo.clearbit.com/workato.com' },
];

export function TeamSection() {
  const t = useTranslations('Team');

  return (
    <section id="team" className="py-24 sm:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Team Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 mb-6">
            {t('teamBadge')}
          </div>
          <h2
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('teamTitle')}
          </h2>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative flex flex-col items-center text-center p-8 bg-card rounded-3xl border border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              
              <div className="relative mb-6 h-32 w-32 rounded-full overflow-hidden border-4 border-muted shadow-lg">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm text-primary font-semibold">{member.role}</p>
              
              <div className="flex gap-3 mt-6">
                {/* Social icons placeholder */}
                {[1, 2, 3].map(j => (
                  <div key={j} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-brand-accent hover:text-white transition-colors cursor-pointer">
                    <Star className="h-3 w-3 fill-current" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-brand-navy rounded-[3rem] p-8 sm:p-16 text-white mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-glow border border-white/20">
              {t('testimonialBadge')}
            </div>
            <h2
              className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('testimonialTitle')}
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="Google" width={24} height={24} />
              </div>
              <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(j => <Star key={j} className="h-4 w-4 fill-brand-glow text-brand-glow" />)}
                </div>
                <p className="text-sm font-bold mt-1">5.0 Rating / 2,500+ Reviews</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-white/5 rounded-2xl p-8 border border-white/10 italic"
          >
            <Quote className="absolute -top-4 -left-4 h-12 w-12 text-brand-accent opacity-50" />
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              "TechWay completely transformed our network infrastructure. Their team's expertise in cybersecurity gave us the confidence to scale our operations globally without fear of data breaches."
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-brand-accent overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop" alt="Emily Watson" width={48} height={48} />
              </div>
              <div>
                <p className="font-bold text-white">Emily Watson</p>
                <p className="text-xs text-white/60">Web Designer @ DigitalPro</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Brand Logos Row */}
        <div className="border-y border-border py-12">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">
            Trusted By 5,000+ Clients Worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-700">
            {LOGOS.map((logo) => (
              <div key={logo.name} className="flex justify-center">
                <Image 
                  src={logo.src} 
                  alt={logo.name} 
                  width={120} 
                  height={40} 
                  className="h-8 w-auto object-contain" 
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
