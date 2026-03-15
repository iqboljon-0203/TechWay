// =============================================================================
// next-intl Navigation Helpers
// Provides locale-aware Link, redirect, usePathname, and useRouter.
// These should be used instead of Next.js defaults for proper i18n routing.
// =============================================================================

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
