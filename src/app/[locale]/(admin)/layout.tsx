import { redirect } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { LayoutDashboard, FileText, Settings, LogOut, Briefcase } from 'lucide-react';
import { Toaster } from 'sonner';
import { Link } from '@/i18n/navigation';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const supabase = await createClient();
  const { locale } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: '/login', locale: locale as any });
  }

  return (
    <div className="flex min-h-screen bg-[#0A0F1E]">
      {/* ─── Admin Sidebar ────────────────────────────────────────────────── */}
      <aside className="hidden w-72 flex-col border-r border-white/5 bg-[#0F1D32]/50 backdrop-blur-3xl md:flex">
        <div className="flex h-20 items-center px-8 border-b border-white/5">
          <Link href="/admin" className="text-2xl font-black tracking-tight text-white group">
            TechWay <span className="text-brand-glow group-hover:text-white transition-colors">Admin</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-8">
          <nav className="space-y-1.5 px-6">
            <Link 
              href="/admin" 
              className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/5 group"
            >
              <LayoutDashboard className="h-5 w-5 text-brand-glow group-hover:text-white transition-colors" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/admin/posts" 
              className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold text-white/60 transition-all hover:bg-white/5 hover:text-white group"
            >
              <FileText className="h-5 w-5 group-hover:text-brand-glow transition-colors" />
              <span>Blog Posts</span>
            </Link>
            <Link 
              href="/admin/services" 
              className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold text-white/60 transition-all hover:bg-white/5 hover:text-white group"
            >
              <Briefcase className="h-5 w-5 group-hover:text-brand-glow transition-colors" />
              <span>Services</span>
            </Link>
            <Link 
              href="/admin/site" 
              className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold text-white/60 transition-all hover:bg-white/5 hover:text-white group"
            >
              <Settings className="h-5 w-5 group-hover:text-brand-glow transition-colors" />
              <span>Site Content</span>
            </Link>
          </nav>
        </div>

        <div className="mt-auto border-t border-white/5 p-8">
            <div className="mb-6 px-1 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-brand-glow flex items-center justify-center font-black text-brand-navy-dark shadow-sm">
                    {user.email?.[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-white truncate">{user.email?.split('@')[0]}</p>
                    <p className="text-[10px] font-bold text-white/40 truncate tracking-tight">{user.email}</p>
                </div>
            </div>
          <form action="/auth/signout" method="POST">
            <button 
              type="submit" 
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-black text-red-500 transition-all hover:bg-red-500 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out Securely
            </button>
          </form>
        </div>
      </aside>

      {/* ─── Main Content Area ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 lg:p-12 relative">
            {/* Background Orbs */}
            <div className="absolute top-[5%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[160px] -z-10" />
            <div className="mx-auto max-w-6xl">
                {children}
            </div>
        </div>
      </main>

      <Toaster richColors position="top-right" theme="dark" />
    </div>
  );
}
