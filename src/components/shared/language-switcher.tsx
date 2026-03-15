// =============================================================================
// Language Switcher Dropdown
// Allows users to switch between supported locales (en, uz, ru).
// Uses next-intl navigation helpers for locale-aware routing.
// =============================================================================

'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

// Human-readable language labels
const LOCALE_DETAILS: Record<Locale, { label: string; name: string; countryCode: string }> = {
  en: { label: 'EN', name: 'English', countryCode: 'us' },
  uz: { label: 'UZ', name: 'Oʻzbekcha', countryCode: 'uz' },
  ru: { label: 'RU', name: 'Русский', countryCode: 'ru' },
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Nav');
  const [isPending, startTransition] = useTransition();

  /**
   * Switches the locale by navigating to the same pathname
   * with the new locale prefix.
   */
  function handleLocaleChange(newLocale: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <DropdownMenu>
      {/* Use the trigger directly — do NOT wrap in a Button to avoid nested <button> */}
      <DropdownMenuTrigger
        className={cn(
          'flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5',
          'text-sm font-medium text-muted-foreground',
          'transition-colors duration-300',
          'hover:bg-accent hover:text-accent-foreground',
          'outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
        aria-label={t('languageLabel')}
        disabled={isPending}
      >
        <span className="flex items-center gap-2">
          <img 
            src={`https://flagcdn.com/w40/${LOCALE_DETAILS[locale].countryCode}.png`}
            alt={LOCALE_DETAILS[locale].label}
            className="w-4 h-3 object-cover rounded-sm shadow-sm"
          />
          <span>{LOCALE_DETAILS[locale].label}</span>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-[160px] rounded-xl border border-border/50
                   bg-popover/95 p-1 shadow-xl backdrop-blur-lg"
      >
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={cn(
              'cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200',
              loc === locale
                ? 'bg-primary/10 font-semibold text-primary'
                : 'text-popover-foreground hover:bg-accent'
            )}
          >
            <img 
              src={`https://flagcdn.com/w40/${LOCALE_DETAILS[loc].countryCode}.png`}
              alt={LOCALE_DETAILS[loc].name}
              className="w-5 h-4 object-cover rounded-sm shadow-sm"
            />
            {LOCALE_DETAILS[loc].name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
