'use client';

import { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Grid,
  Edit,
  Trash2,
  CheckCircle,
  Loader2,
  X
} from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import * as LucideIcons from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ServicesList({ initialServices }: { initialServices: any[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [services, setServices] = useState(initialServices);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setIsDeleting(id);
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(prev => prev.filter(s => s.id !== id));
      toast.success('Service deleted successfully');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete service');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Our <span className="text-brand-glow">Services</span>
          </h1>
          <p className="text-white/40">Manage your core IT offerings and their presentation on the site.</p>
        </div>
        
        <Link 
            href="/admin/services/new"
            className="rounded-2xl bg-brand-glow px-8 py-4 text-sm font-black text-brand-navy-dark shadow-xl shadow-brand-glow/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
        >
            <Plus className="h-5 w-5" />
            Add New Service
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
            const IconComponent = (LucideIcons as any)[service.icon || 'Briefcase'] || Briefcase;
            return (
                <div key={service.id} className="group relative rounded-[2.5rem] border border-white/5 bg-[#0F1D32]/50 p-8 backdrop-blur-3xl transition-all hover:bg-white/5">
                    <div className="flex items-start justify-between mb-8">
                        <div className={`h-16 w-16 rounded-3xl bg-gradient-to-br ${service.color_gradient || 'from-blue-600 to-indigo-500'} flex items-center justify-center text-white border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                            <IconComponent className="h-8 w-8" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Link 
                                href={`/admin/services/${service.id}`}
                                className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-white/20 hover:text-white transition-colors"
                            >
                                <Edit className="h-4 w-4" />
                            </Link>
                            <button 
                                onClick={() => handleDelete(service.id, service.title_uz)}
                                disabled={isDeleting === service.id}
                                className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-white/20 hover:text-red-500 transition-colors disabled:opacity-50"
                            >
                                {isDeleting === service.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                             <h3 className="text-2xl font-black text-white truncate" style={{ fontFamily: 'var(--font-heading)' }}>
                                {service.title_uz}
                            </h3>
                            <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                        </div>
                        <p className="text-sm text-white/40 line-clamp-3 leading-relaxed">
                            {service.description_uz}
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{service.slug}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Order: {service.sort_order}</span>
                        </div>
                    </div>
                </div>
            );
        })}
        {!services.length && (
            <div className="col-span-full py-20 text-center">
                 <div className="flex flex-col items-center gap-4">
                    <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center text-white/10 shadow-inner">
                        <Grid className="h-10 w-10" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-white font-bold">No services defined</h4>
                        <p className="text-white/30 text-sm">Add your first service to see it on the website.</p>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
