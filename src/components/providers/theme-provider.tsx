// =============================================================================
// Theme Provider
// Wraps the application with next-themes provider for dark/light mode toggling.
// This is a Client Component since next-themes requires access to the DOM.
// =============================================================================

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
