'use client';

import { useState } from 'react';
import { 
  Users, 
  Trash2,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Briefcase,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

interface Submission {
  id: string;
  name: string;
  service: string | null;
  phone: string | null;
  message: string | null;
  created_at: string;
}

export function SubmissionsList({ initialSubmissions }: { initialSubmissions: Submission[] }) {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const supabase = createClient();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev => prev.filter(s => s.id !== id));
      toast.success('Submission deleted successfully');
    } catch (err: any) {
      toast.error('Error deleting submission: ' + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (!submissions.length) {
    return (
      <div className="rounded-[2.5rem] border border-white/5 bg-[#0F1D32]/40 p-24 backdrop-blur-3xl text-center border-dashed">
        <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center text-white/10 mx-auto mb-8 animate-pulse">
          <MessageCircle className="h-12 w-12" />
        </div>
        <h4 className="text-2xl font-black text-white mb-2 tracking-tight">No inquiries yet</h4>
        <p className="text-white/30 max-w-sm mx-auto font-medium">Your contact form is live. Submissions from potential clients will appear here automatically.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {submissions.map((sub) => (
        <div 
          key={sub.id} 
          className="group relative rounded-[2.5rem] border border-white/5 bg-[#0F1D32]/40 p-8 backdrop-blur-3xl transition-all hover:bg-white/[0.03] hover:border-white/10 overflow-hidden shadow-2xl"
        >
          {/* Subtle Glow Effect */}
          <div className="absolute -top-24 -right-24 h-48 w-48 bg-brand-glow/5 blur-[100px] rounded-full group-hover:bg-brand-glow/10 transition-colors" />
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 relative z-10">
            <div className="space-y-8 flex-1">
              {/* Profile & Service Header */}
              <div className="flex items-start gap-5">
                <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-brand-glow/20 to-brand-glow/5 flex items-center justify-center text-brand-glow shadow-2xl border border-brand-glow/20 shrink-0">
                  <span className="text-3xl font-black select-none">{sub.name?.[0].toUpperCase()}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-brand-glow transition-colors">{sub.name}</h3>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-glow/10 text-brand-glow text-[10px] font-black uppercase tracking-[0.2em] border border-brand-glow/20">
                    <Briefcase className="h-3 w-3" />
                    {sub.service || 'General Inquiry'}
                  </div>
                </div>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group/item flex items-center gap-4 px-6 py-4 rounded-3xl bg-white/[0.03] border border-white/5 text-white/70 hover:bg-white/[0.05] transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-brand-glow/10 flex items-center justify-center border border-brand-glow/10 group-hover/item:bg-brand-glow group-hover/item:text-brand-navy-dark transition-all">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-white/20 tracking-widest leading-none mb-1">Phone Number</span>
                    <span className="text-sm font-bold tracking-tight">{sub.phone || 'N/A'}</span>
                  </div>
                </div>
                <div className="group/item flex items-center gap-4 px-6 py-4 rounded-3xl bg-white/[0.03] border border-white/5 text-white/70 hover:bg-white/[0.05] transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-brand-glow/10 flex items-center justify-center border border-brand-glow/10 group-hover/item:bg-brand-glow group-hover/item:text-brand-navy-dark transition-all">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-white/20 tracking-widest leading-none mb-1">Time Received</span>
                    <span className="text-sm font-bold tracking-tight">
                        {formatDistanceToNow(new Date(sub.created_at))} ago
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="group/msg p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative hover:border-brand-glow/20 transition-all duration-500">
                <MessageCircle className="absolute -top-4 -right-4 h-12 w-12 text-brand-glow/[0.03] group-hover/msg:text-brand-glow/[0.07] transition-all" />
                <div className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] mb-4 flex items-center gap-2">
                    <span className="block h-[1px] w-4 bg-brand-glow/30" />
                    Inquiry Details
                </div>
                <p className="text-white/80 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                  {sub.message}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-row lg:flex-col gap-4 self-center lg:self-start lg:pt-10">
              <a 
                href={`tel:${sub.phone}`}
                title="Call Client"
                className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-brand-glow text-brand-navy-dark shadow-2xl shadow-brand-glow/20 transition-all hover:scale-110 active:scale-95 group-hover:shadow-brand-glow/40"
              >
                <Phone className="h-7 w-7" />
              </a>
              <button 
                onClick={() => handleDelete(sub.id)}
                disabled={deletingId === sub.id}
                title="Delete Submission"
                className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-red-500/10 border border-red-500/20 text-red-500 transition-all hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingId === sub.id ? (
                  <Loader2 className="h-7 w-7 animate-spin" />
                ) : (
                  <Trash2 className="h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
