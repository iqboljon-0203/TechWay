'use client';

import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { User, Phone, MessageSquare, Send, Layers, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { submitContact } from '@/app/actions/contact';
import { toast } from 'sonner';
import type { LocalizedService } from '@/lib/content';

export function AppointmentSection({ services = [] }: { services?: LocalizedService[] }) {
  const t = useTranslations('Appointment');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await submitContact(null, formData);
      console.log('[AppointmentSection] Result:', result);
      
      if (result.success) {
        toast.success(t('successMessage') || 'Xabaringiz yuborildi! Tez orada bogʻlanamiz.');
        (e.target as HTMLFormElement).reset();
      } else {
        const errorDetail = result.details ? (typeof result.details === 'string' ? result.details : JSON.stringify(result.details)) : '';
        toast.error(`${t('errorMessage') || 'Xatolik yuz berdi.'} ${errorDetail}`);
      }
    });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/appointment-bg.png')" }}
        />
        {/* Dark overlay to ensure contrast */}
        <div className="absolute inset-0 bg-brand-navy/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* 🔍 Left: Textual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="inline-flex items-center rounded-full bg-brand-glow/20 px-4 py-1.5 text-sm font-medium text-brand-glow border border-brand-glow/30 mb-6">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-glow" />
              {t('badge')}
            </div>
            <h2
              className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('title')}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              {t('description')}
            </p>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-glow/20 text-brand-glow">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-base font-medium text-white/90">{t(`point${i}`)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 📝 Right: Appointment Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-blue rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20"
          >
            <h3 
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('formTitle')}
            </h3>
            <p className="text-white/60 text-sm mb-8">{t('formSubtitle')}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">{t('nameLabel')}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input 
                      required
                      id="name" 
                      name="name"
                      placeholder={t('namePlaceholder')} 
                      className="h-12 pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-brand-glow transition-all rounded-xl shadow-none focus-visible:ring-0 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/80">{t('phoneLabel')}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input 
                      required
                      id="phone" 
                      name="phone"
                      placeholder={t('phonePlaceholder')} 
                      className="h-12 pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-brand-glow transition-all rounded-xl shadow-none focus-visible:ring-0 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-white/80">{t('serviceLabel')}</Label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <select 
                    required
                    id="service"
                    name="service"
                    className="w-full h-12 pl-10 pr-10 rounded-xl border border-white/20 bg-white/10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-glow transition-all cursor-pointer appearance-none"
                  >
                    <option value="" className="bg-brand-navy">{t('selectService')}</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.title || service.id} className="bg-brand-navy">
                            {service.title || service.slug}
                        </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80">{t('messageLabel')}</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                  <textarea 
                    required
                    id="message" 
                    name="message"
                    rows={4}
                    placeholder={t('messagePlaceholder')} 
                    className="w-full pl-10 pt-3 rounded-xl border border-white/20 bg-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-glow transition-all min-h-[100px]"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isPending}
                className="w-full bg-brand-glow hover:bg-white hover:text-brand-navy text-brand-navy-dark font-black py-7 rounded-xl transition-all duration-300 shadow-xl shadow-brand-glow/20 disabled:opacity-50"
              >
                {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <>
                        <Send className="mr-2 h-5 w-5" />
                        {t('submitBtn')}
                    </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
