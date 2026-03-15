// =============================================================================
// i18n Routing Configuration
// Defines the supported locales and the default locale for the application.
// Used by next-intl to generate locale-aware routes.
// =============================================================================

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // All supported locales
  locales: ['en', 'uz', 'ru'],

  // Default locale when no locale is detected
  defaultLocale: 'en',

  // Locale prefix strategy: 'always' ensures the URL always contains the locale
  localePrefix: 'always',
});

// Convenience type for use across the application
export type Locale = (typeof routing.locales)[number];
