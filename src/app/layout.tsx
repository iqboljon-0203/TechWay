// =============================================================================
// Root Layout
// This is the top-level layout that Next.js requires.
// The actual layout logic (fonts, providers, etc.) is handled by
// the [locale]/layout.tsx file. This root layout is kept minimal.
// =============================================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
