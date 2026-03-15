// =============================================================================
// Navbar Component
// The primary navigation bar for the Techway corporate website.
// Features:
//   - Animated logo with gradient text
//   - Localized navigation links (Home, Services, Blog, Contact)
//   - Language switcher dropdown
//   - Animated theme toggle (Sun/Moon)
//   - Mobile-responsive hamburger menu
//   - Glassmorphism background with scroll-aware transparency
// =============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { Logo } from '@/components/shared/logo';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Navigation link definitions
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

  // Track scroll position for navbar background effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're already on the homepage, intercept the click to smooth scroll natively
    if (pathname === '/') {
      if (href.startsWith('/#')) {
        e.preventDefault();
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80; // Offset for the fixed navbar
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'border-b border-border/40 bg-background/80 shadow-lg shadow-background/5 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ─── Logo ─────────────────────────────────────────────────────── */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="group relative flex items-center gap-2"
        >
          {/* Animated glow effect behind logo */}
          <div className="absolute -inset-3 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

          {/* Extremely Clean Logo */}
          <Logo className="relative h-10 w-10 transition-all duration-500 group-hover:scale-110" />

          {/* Balanced Brand Text */}
          <div className="flex items-center ml-1.5">
            <span className="text-2xl font-extrabold tracking-tight text-foreground">
              Tech
            </span>
            <span className="text-2xl font-medium tracking-tight text-primary">
              Way
            </span>
          </div>
        </Link>

        {/* ─── Desktop Navigation Links ─────────────────────────────── */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={cn(
                  'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
                )}

                {/* Hover background */}
                <span
                  className={cn(
                    'absolute inset-0 rounded-lg transition-colors duration-300',
                    !isActive && 'hover:bg-accent/50'
                  )}
                />

                <span className="relative">{t(key)}</span>
              </Link>
            );
          })}
        </div>

        {/* ─── Desktop Actions (Theme Toggle + Language Switcher) ──── */}
        <div className="hidden items-center gap-1 md:flex">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* ─── Mobile Menu Toggle ───────────────────────────────────── */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg
                       text-muted-foreground transition-colors duration-300
                       hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle menu"
          >
            <Menu
              className={cn(
                'absolute h-5 w-5 transition-all duration-300',
                isMobileMenuOpen
                  ? 'rotate-90 scale-0 opacity-0'
                  : 'rotate-0 scale-100 opacity-100'
              )}
            />
            <X
              className={cn(
                'absolute h-5 w-5 transition-all duration-300',
                isMobileMenuOpen
                  ? 'rotate-0 scale-100 opacity-100'
                  : '-rotate-90 scale-0 opacity-0'
              )}
            />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu Overlay ──────────────────────────────────── */}
      <div
        className={cn(
          'fixed inset-x-0 top-16 bottom-0 z-40 transition-all duration-500 md:hidden',
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/60 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            'relative mx-4 mt-2 rounded-2xl border border-border/50 bg-card/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-500',
            isMobileMenuOpen
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-4 scale-95 opacity-0'
          )}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ key, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={cn(
                    'flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-300',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="mr-3 h-5 w-0.5 rounded-full bg-primary" />
                  )}
                  {t(key)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
