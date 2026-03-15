// =============================================================================
// Login Page (Placeholder)
// Redirect target for unauthenticated users trying to access /admin
// =============================================================================

import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-xl border border-border/50 bg-card p-6 shadow-xl backdrop-blur-md">
        <div className="mb-6 flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Admin Login</h1>
          <p className="text-sm text-muted-foreground">
            Supabase Auth UI goes here in the future
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg bg-yellow-500/10 p-4 text-sm text-yellow-600 dark:text-yellow-500">
            For development, ensure your <code>.env.local</code> has correct
            Supabase keys to authenticate.
          </div>
          
          <Link 
            href="/" 
            className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
