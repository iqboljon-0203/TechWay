'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/shared/logo';

export function Footer() {
  const t = useTranslations('Footer');

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <footer className="border-t border-border/50 bg-background pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand & Description */}
          <div className="col-span-1 lg:col-span-1">
            <Link 
              href="/" 
              onClick={(e) => {
                const element = document.querySelector('header');
                if (element && window.location.pathname.endsWith('/')) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="group flex items-center gap-2"
            >
              <Logo className="h-8 w-8 transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all">
                TechWay
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t('description', { default: 'Empowering businesses with modern IT solutions, from CRM & ERP systems to highly secure network infrastructures.' })}
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {t('quickLinks')}
            </h3>
            <ul className="mt-4 space-y-3">
              {['Services', 'About', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/#${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors relative group">
                    <span>{t(`links.${item.toLowerCase()}` as any)}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {t('services')}
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: 'CRM & ERP', slug: 'crm' },
                { name: 'Cybersecurity', slug: 'cyber' },
                { name: 'Networking', slug: 'network' },
                { name: 'IP Telephony', slug: 'ip' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={`/services/${item.slug}` as any} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t(`servicesList.${item.name.replace(/\s+/g, '').replace('&', '').toLowerCase()}` as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              {t('contact')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary shrink-0 mr-3" />
                <span className="text-sm text-muted-foreground max-w-[200px]">
                  {t('address')}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary shrink-0 mr-3" />
                <a href="tel:+998552050555" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +998 55 205 05 55
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary shrink-0 mr-3" />
                <a href="mailto:hello@techway.tech" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  hello@techway.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Techway. {t('rights')}
          </p>
          <div className="flex space-x-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
