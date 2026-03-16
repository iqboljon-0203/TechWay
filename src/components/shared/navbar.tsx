// =============================================================================
// Navbar Component — IT-Flow Enterprise Style
// Features:
//   - Sits below the TopBar
//   - White/transparent background with shadow on scroll
//   - "Get A Quote" CTA button
//   - Clean, corporate navigation
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/#services' },
  { key: 'blog', href: '/#blog' },
  { key: 'contact', href: '/#contact' },
] as const;

export function Navbar() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/') {
      if (href.startsWith('/#')) {
        e.preventDefault();
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -120;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else if (href === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-10 left-0 right-0 z-40 transition-all duration-500',
        isScrolled
          ? 'border-b border-border/40 bg-background/95 shadow-lg shadow-brand-navy/5 backdrop-blur-xl'
          : 'bg-background/80 backdrop-blur-sm'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ─── Logo ─────────────────────────────────────────── */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="group relative flex items-center gap-1"
        >
          <div className="absolute -inset-3 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="flex items-center font-extrabold tracking-tight text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-foreground transition-colors duration-300 group-hover:text-primary">
              Tech
            </span>
            <span className="text-primary transition-colors duration-300 group-hover:text-foreground">
              Way
            </span>
          </div>
        </Link>

        {/* ─── Desktop Links ──────────────────────────────── */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={cn(
                  'relative rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300',
                  isActive
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                )}
              >
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
                )}
                <span className="relative">{t(key)}</span>
              </Link>
            );
          })}
        </div>

        {/* ─── Desktop Actions ──────────────────────────── */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="ml-2 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            {t('cta')}
            <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* ─── Mobile Toggle ──────────────────────────── */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 transition-colors duration-300 hover:bg-muted hover:text-foreground"
            aria-label="Toggle menu"
          >
            <Menu className={cn('absolute h-5 w-5 transition-all duration-300', isMobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100')} />
            <X className={cn('absolute h-5 w-5 transition-all duration-300', isMobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0')} />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu ──────────────────────────── */}
      <div
        className={cn(
          'fixed inset-x-0 top-[104px] bottom-0 z-40 transition-all duration-500 md:hidden',
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={cn(
            'relative mx-4 mt-2 rounded-2xl border border-border/50 bg-card p-4 shadow-2xl backdrop-blur-xl transition-all duration-500',
            isMobileMenuOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-4 scale-95 opacity-0'
          )}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ key, href }) => {
              const isActive = pathname === href;
              return (
                <Link key={key} href={href} onClick={(e) => handleNavClick(e, href)}
                  className={cn(
                    'flex items-center rounded-xl px-4 py-3 text-base font-semibold transition-all duration-300',
                    isActive ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                  )}
                >
                  {isActive && <span className="mr-3 h-5 w-0.5 rounded-full bg-primary" />}
                  {t(key)}
                </Link>
              );
            })}
            <Link href="/#contact" onClick={(e) => handleNavClick(e, '/#contact')}
              className="mt-3 flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-base font-semibold text-primary-foreground"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
