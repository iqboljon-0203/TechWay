// =============================================================================
// Not Found 404
// Renders when a requested resource is explicitly missing.
// Features a clean fallback UI with localization handling ignored.
// =============================================================================

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

export default function NotFound() {
  return (
    <Fragment>
      <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4 space-y-6 animate-in fade-in duration-500">
        <h1 className="text-8xl font-black text-primary drop-shadow-sm tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground mt-4">
          Page not found
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        
        <div className="mt-10 flex gap-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90 h-11 px-8 gap-2"
          >
            <Home className="h-4 w-4" />
            Back Home
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
