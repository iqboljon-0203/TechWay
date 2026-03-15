// =============================================================================
// Theme Toggle Button
// An animated Sun/Moon icon toggle for switching between light and dark themes.
// Uses next-themes useTheme hook and Lucide icons with CSS transitions.
// =============================================================================

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Nav');

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9" disabled>
        <span className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative h-9 w-9 cursor-pointer overflow-hidden rounded-lg 
                 text-muted-foreground transition-colors duration-300
                 hover:bg-accent hover:text-accent-foreground"
      aria-label={t('themeToggle')}
    >
      {/* Sun Icon — visible in dark mode, fades/rotates out in light mode */}
      <Sun
        className={`absolute h-5 w-5 transition-all duration-500 ease-in-out
          ${isDark 
            ? 'rotate-0 scale-100 opacity-100' 
            : 'rotate-90 scale-0 opacity-0'
          }`}
      />

      {/* Moon Icon — visible in light mode, fades/rotates out in dark mode */}
      <Moon
        className={`absolute h-5 w-5 transition-all duration-500 ease-in-out
          ${isDark 
            ? '-rotate-90 scale-0 opacity-0' 
            : 'rotate-0 scale-100 opacity-100'
          }`}
      />
    </Button>
  );
}
