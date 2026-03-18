import { createClient } from '@/lib/supabase/server';
import { 
  Users, 
  MessageSquare,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { SubmissionsList } from '@/components/admin/submissions-list';

export default async function AdminSubmissionsPage() {
  const supabase = await createClient();

  const { data: submissions, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-16 pb-24">
      {/* 🌟 Animated Header Section */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-[10px] font-black uppercase tracking-[0.3em] font-heading">
            <Sparkles className="h-3.5 w-3.5" />
            Lead Management
          </div>
          <h1 className="text-6xl font-black text-white leading-tight tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
            Client <span className="text-brand-glow drop-shadow-[0_0_30px_rgba(45,212,191,0.3)]">Inquiries</span>
          </h1>
          <p className="text-lg text-white/40 max-w-xl font-medium">Manage your professional incoming project inquiries, consultation requests, and leads with high-fidelity administrative tools.</p>
        </div>
        
        {/* 📊 Lead Statistics Badge */}
        <div className="h-20 px-10 rounded-[2rem] bg-brand-glow/5 border border-brand-glow/10 backdrop-blur-3xl flex items-center gap-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-glow/5 group-hover:bg-brand-glow/10 transition-colors" />
            <div className="h-12 w-12 rounded-2xl bg-brand-glow/20 flex items-center justify-center text-brand-glow relative z-10">
                <Users className="h-6 w-6" />
            </div>
            <div className="relative z-10">
                <div className="text-4xl font-black text-white leading-none mb-1">{submissions?.length || 0}</div>
                <div className="text-[10px] font-black text-brand-glow/50 uppercase tracking-[0.2em]">Active Submissions</div>
            </div>
        </div>
      </div>

      {/* 📥 Submissions List - Interactive Client Component */}
      <div className="relative">
          {/* Subtle Side Decals */}
          <div className="absolute -left-20 top-0 h-full w-[1px] bg-gradient-to-b from-brand-glow/0 via-brand-glow/10 to-brand-glow/0 hidden xl:block" />
          
          <SubmissionsList initialSubmissions={submissions || []} />
      </div>

      {/* 🚀 Footer Info */}
      <div className="flex flex-col md:flex-row items-center justify-between py-10 px-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
          <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 md:mb-0">
              End of lead stream • techway professional dashboard
          </div>
          <div className="flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-glow" />
              <span className="text-[10px] font-black text-brand-glow uppercase tracking-[0.2em]">Real-time synchronization enabled</span>
          </div>
      </div>
    </div>
  );
}
