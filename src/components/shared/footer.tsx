// =============================================================================
// Footer Component — IT-Flow Enterprise Style
// Features:
//   - Dark navy background with branding
//   - Fixed @/i18n/navigation Link usage for locale prefixes
//   - Newsletter section and clear site navigation
// =============================================================================

'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-brand-navy-dark text-white pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-stretch">
          {/* Logo & Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-extrabold tracking-tight leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                TechWay
              </span>
            </Link>
            <p className="text-white/60 text-base leading-relaxed max-w-md">
              {t('description', { default: 'Credibly harness client-centric opportunities with prospective bandwidth. Objectively engineer processes client-centric manufactured products.' })}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ y: -5 }}
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-brand-accent hover:text-white transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('company')}
            </h3>
            <ul className="space-y-4">
              {['About', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/#${item.toLowerCase()}`} className="text-white/60 hover:text-brand-glow transition-colors block">
                    {t(`links.${item.toLowerCase()}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('serviceLinks')}
            </h3>
            <ul className="space-y-4">
              {['businessconsult', 'cybersecurity', 'itconsultancy', 'networkarchitect', 'iptelephony'].map((item) => (
                <li key={item}>
                  <Link href="/#services" className="text-white/60 hover:text-brand-glow transition-colors block">
                    {t(`services.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('addressTitle')}
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-brand-accent transition-all duration-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="text-sm text-white/60">
                   <a 
                     href={`https://yandex.com/maps/?text=${encodeURIComponent(t('address'))}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="hover:text-brand-glow transition-colors"
                   >
                    {t('address')}
                   </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-brand-accent transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="text-sm text-white/60">
                  <a href={`tel:${t('phone').replace(/\s+/g, '')}`} className="hover:text-brand-glow transition-colors">
                    {t('phone')}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-brand-accent transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="text-sm text-white/60">
                   <a href={`mailto:${t('email')}`} className="hover:text-brand-glow transition-colors">
                    {t('email')}
                   </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium">
          <p className="text-white/40">
            {t('copyright', { year: currentYear })} <span className="text-white">TechWay</span>
          </p>
          <div className="flex gap-8">
            <Link href="/" className="text-white/40 hover:text-white transition-colors">{t('terms')}</Link>
            <Link href="/" className="text-white/40 hover:text-white transition-colors">{t('privacy')}</Link>
            <Link href="/" className="text-white/40 hover:text-white transition-colors">{t('legal')}</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
