// =============================================================================
// Admin Route Group Layout
// Protects all routes inside the (admin) folder from unauthorized access.
// Includes the Sidebar and Providers for the Admin Dashboard.
// =============================================================================

import { redirect, Link, usePathname } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import { Toaster } from 'sonner';
import { ReactQueryProvider } from '@/components/providers/query-provider';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const supabase = await createClient();
  const { locale } = await params;

  // Verify the user's session securely on the server
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect({ href: '/login', locale: locale as any });
    return null;
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* ─── Admin Sidebar ────────────────────────────────────────────────── */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center px-6 border-b border-border">
          <Link href="/admin" className="text-xl font-bold tracking-tight text-primary">
            Techway Admin
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-4">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary shadow-sm"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              href="/admin/posts" 
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
              Blog Posts
            </Link>
          </nav>
        </div>

        <div className="border-t border-border p-4">
          <div className="mb-4 truncate px-2 text-xs text-muted-foreground">
            {user.email}
          </div>
          <form action="/auth/signout" method="POST">
            <button 
              type="submit" 
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* ─── Main Content ────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </div>
      </main>

      <Toaster richColors position="top-right" />
    </div>
  );
}
