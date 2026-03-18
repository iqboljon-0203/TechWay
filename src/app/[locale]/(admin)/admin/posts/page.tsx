import { createClient } from '@/lib/supabase/server';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2,
  CheckCircle,
  Clock
} from 'lucide-react';
import { DeletePostButton } from '@/components/admin/delete-post-button';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { format } from 'date-fns';

export default async function AdminPostsPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Blog <span className="text-brand-glow">Posts</span>
          </h1>
          <p className="text-white/40">Review, edit, and publish your latest articles.</p>
        </div>
        
        <Link 
            href="/admin/posts/new"
            className="rounded-2xl bg-brand-glow px-8 py-4 text-sm font-black text-brand-navy-dark shadow-xl shadow-brand-glow/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
        >
            <Plus className="h-5 w-5" />
            Create New Article
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-[#0F1D32]/50 backdrop-blur-3xl p-4 rounded-3xl border border-white/5">
        <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
            <input 
                type="text" 
                placeholder="Search posts..." 
                className="w-full h-12 rounded-2xl border border-white/5 bg-white/5 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-colors"
            />
        </div>
        <div className="flex items-center gap-3">
            <button className="h-12 px-6 rounded-2xl border border-white/5 bg-white/5 text-sm font-bold text-white transition-all hover:bg-white/10 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
            </button>
            <div className="h-8 w-px bg-white/5 hidden md:block" />
            <div className="text-xs font-black text-white/20 uppercase tracking-widest px-4">
                {posts?.length || 0} Total
            </div>
        </div>
      </div>

      {/* Posts Grid/List */}
      <div className="rounded-[2.5rem] border border-white/5 bg-[#0F1D32]/50 overflow-hidden backdrop-blur-3xl">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Article</th>
                    <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {posts?.map((post) => (
                    <tr key={post.id} className="group transition-all hover:bg-white/5">
                        <td className="px-8 py-6">
                            <div className="flex items-center gap-5">
                                <div className="relative h-16 w-24 rounded-2xl overflow-hidden border border-white/5 flex-shrink-0">
                                    {post.image_url ? (
                                        <Image 
                                            src={post.image_url} 
                                            alt={post.title_uz} 
                                            fill 
                                            className="object-cover" 
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-white/5 flex items-center justify-center">
                                            <FileText className="h-6 w-6 text-white/10" />
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-white group-hover:text-brand-glow transition-colors truncate mb-1">
                                        {post.title_uz}
                                    </h4>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/5">
                                            {post.category_uz || 'General'}
                                        </span>
                                        <div className="h-1 w-1 rounded-full bg-white/10" />
                                        <span className="text-xs text-white/30">
                                            {format(new Date(post.created_at), 'MMM d, yyyy')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-8 py-6">
                            {post.is_published ? (
                                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black text-emerald-500 uppercase tracking-widest border border-emerald-500/20 shadow-[0_0_15px_-5px_theme(colors.emerald.500)]">
                                    <CheckCircle className="h-3.5 w-3.5" />
                                    Live
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1.5 text-[10px] font-black text-amber-500 uppercase tracking-widest border border-amber-500/20">
                                    <Clock className="h-3.5 w-3.5" />
                                    Draft
                                </div>
                            )}
                        </td>
                        <td className="px-8 py-6">
                            <div className="flex items-center justify-center gap-2">
                                <Link 
                                    href={`/blog/${post.slug}`}
                                    className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <Eye className="h-4 w-4" />
                                </Link>
                                <Link 
                                    href={`/admin/posts/${post.id}`}
                                    className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <Edit className="h-4 w-4" />
                                </Link>
                                <DeletePostButton 
                                    id={post.id} 
                                    title={post.title_uz} 
                                />
                            </div>
                        </td>
                    </tr>
                ))}
                {!posts?.length && (
                    <tr>
                        <td colSpan={3} className="px-8 py-20 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center text-white/10 shadow-inner">
                                    <FileText className="h-10 w-10" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-white font-bold">No articles found</h4>
                                    <p className="text-white/30 text-sm">Your new project is clean. Start by creating a post!</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
}
