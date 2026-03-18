import { 
  FileText, 
  Briefcase, 
  Settings, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  ArrowRight 
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatDistanceToNow } from 'date-fns';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch Stats
  const [
    { count: postCount },
    { count: serviceCount },
    { count: submissionCount },
    { data: recentSubmissions }
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(5)
  ]);

  const stats = [
    { label: 'Blog Posts', value: postCount?.toString() || '0', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Services', value: serviceCount?.toString() || '0', icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Submissions', value: submissionCount?.toString() || '0', icon: MessageSquare, color: 'text-brand-glow', bg: 'bg-brand-glow/10' },
    { label: 'Total Views', value: '2.4k', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  const quickLinks = [
    { title: 'Create Blog Post', href: '/admin/posts/new', icon: FileText },
    { title: 'Edit Services', href: '/admin/services', icon: Briefcase },
    { title: 'Home Content', href: '/admin/site', icon: Settings },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Welcome back, <span className="text-brand-glow">Admin</span>
          </h1>
          <p className="text-white/40">Manage your high-fidelity content and site settings.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <Link 
                href="/"
                className="rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
            >
                View Live Site
            </Link>
            <Link 
                href="/admin/posts/new"
                className="rounded-xl bg-brand-glow px-6 py-3 text-sm font-black text-brand-navy-dark shadow-lg shadow-brand-glow/20 transition-all hover:scale-[1.02]"
            >
                New Post
            </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="rounded-3xl border border-white/5 bg-[#0F1D32]/50 p-6 backdrop-blur-3xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-black text-white/20 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-white">Recent Submissions</h3>
            <div className="rounded-[2rem] border border-white/5 bg-[#0F1D32]/50 overflow-hidden divide-y divide-white/5 pr-2">
                {recentSubmissions && recentSubmissions.length > 0 ? (
                    recentSubmissions.map((sub: any) => (
                        <div key={sub.id} className="p-6 flex items-center justify-between group transition-all hover:bg-white/5">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-white/40" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-0.5">{sub.name}</h4>
                                    <p className="text-xs text-white/40">{sub.service || 'General Inquiry'} • {formatDistanceToNow(new Date(sub.created_at))} ago</p>
                                </div>
                            </div>
                            <Link href={`/admin/submissions/${sub.id}`} className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center">
                        <MessageSquare className="h-12 w-12 text-white/10 mx-auto mb-4" />
                        <p className="text-white/40 font-bold">No submissions yet.</p>
                    </div>
                )}
                {recentSubmissions && recentSubmissions.length > 0 && (
                    <Link href="/admin/submissions" className="block p-5 text-center text-xs font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors bg-white/5">
                        View All Submissions
                    </Link>
                )}
            </div>
        </div>

        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Quick Actions</h3>
            <div className="space-y-4">
                {quickLinks.map((link, i) => (
                    <Link 
                        key={i}
                        href={link.href}
                        className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10 group"
                    >
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:text-white transition-colors">
                            <link.icon className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-white/80 group-hover:text-white">{link.title}</span>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
