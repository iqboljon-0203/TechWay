'use client';

// =============================================================================
// Custom Global Error Page
// Matches the dark/light minimalist app aesthetic.
// =============================================================================

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Home } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log to an error monitoring service like Sentry
    console.error('Global Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4 space-y-6 animate-in fade-in duration-500">
      <div className="rounded-full bg-destructive/10 p-6 ring-1 ring-destructive/20 inline-flex items-center justify-center mb-6">
        <svg
          className="h-10 w-10 text-destructive"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Something went wrong
      </h1>
      <p className="text-lg text-muted-foreground max-w-lg">
        We encountered an unexpected error while processing your request. Our team has been notified.
      </p>

      <div className="mt-8 flex gap-4 pt-4">
        <Button onClick={() => reset()} size="lg" className="rounded-full gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-8 gap-2"
        >
          <Home className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
