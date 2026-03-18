'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/client';
import { 
  Save, 
  Image as ImageIcon, 
  Globe, 
  Layout, 
  CheckCircle, 
  XCircle,
  Loader2,
  Type,
  FileText,
  Tag,
  Palette,
  Box,
  Upload,
  X,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

type Language = 'uz' | 'ru' | 'en';

interface ServiceFormProps {
  initialData?: any;
}

export function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeLang, setActiveLang] = useState<Language>('uz');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [manualSlug, setManualSlug] = useState(!!initialData);

  // Form State
  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    image_url: initialData?.image_url || '',
    icon: initialData?.icon || '',
    color_gradient: initialData?.color_gradient || '',
    titles: {
      uz: initialData?.title_uz || '',
      ru: initialData?.title_ru || '',
      en: initialData?.title_en || '',
    },
    tags: {
      uz: initialData?.tag_uz || '',
      ru: initialData?.tag_ru || '',
      en: initialData?.tag_en || '',
    },
    descriptions: {
      uz: initialData?.description_uz || '',
      ru: initialData?.description_ru || '',
      en: initialData?.description_en || '',
    },
  });

  useEffect(() => {
    if (!initialData) {
      const icons = ['Code', 'Database', 'Globe', 'Cpu', 'Layers', 'Shield', 'BarChart', 'Zap'];
      const gradients = [
        'from-indigo-600 to-cyan-500',
        'from-purple-600 to-pink-500',
        'from-emerald-600 to-teal-500',
        'from-orange-600 to-amber-500',
        'from-blue-600 to-indigo-500',
        'from-rose-600 to-orange-500'
      ];
      
      setFormData(prev => ({
        ...prev,
        icon: icons[Math.floor(Math.random() * icons.length)],
        color_gradient: gradients[Math.floor(Math.random() * gradients.length)]
      }));
    }
  }, [initialData]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[oO]['`ʻʼ]/g, 'o')
      .replace(/[gG]['`ʻʼ]/g, 'g')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTextChange = (field: 'titles' | 'tags' | 'descriptions', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [activeLang]: value }
    }));

    if (field === 'titles' && activeLang === 'uz' && !manualSlug) {
        setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `service-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('blog-images') // Re-using existing bucket
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

        setFormData(prev => ({ ...prev, image_url: publicUrl }));
        toast.success('Image uploaded!');
    } catch (err: any) {
        toast.error(err.message || 'Upload failed');
    } finally {
        setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        slug: formData.slug,
        image_url: formData.image_url,
        icon: formData.icon,
        color_gradient: formData.color_gradient,
        title_uz: formData.titles.uz,
        title_ru: formData.titles.ru,
        title_en: formData.titles.en,
        tag_uz: formData.tags.uz,
        tag_ru: formData.tags.ru,
        tag_en: formData.tags.en,
        description_uz: formData.descriptions.uz,
        description_ru: formData.descriptions.ru,
        description_en: formData.descriptions.en,
      };

      if (initialData?.id) {
        const { error } = await supabase
            .from('services')
            .update(payload)
            .eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert(payload);
        if (error) throw error;
      }

      toast.success('Service saved!');
      router.push('/admin/services');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Save failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-3xl font-black text-white">{initialData ? 'Edit' : 'New'} <span className="text-brand-glow">Service</span></h2>
            <button 
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-glow text-brand-navy-dark font-black shadow-lg shadow-brand-glow/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Service
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="rounded-[2.5rem] border border-white/5 bg-[#0F1D32]/50 p-8 backdrop-blur-3xl space-y-8">
                    <div className="flex p-1 bg-white/5 rounded-2xl w-fit">
                        {(['uz', 'ru', 'en'] as Language[]).map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => setActiveLang(lang)}
                                className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${
                                    activeLang === lang 
                                    ? 'bg-brand-glow text-brand-navy-dark shadow-lg' 
                                    : 'text-white/40 hover:text-white'
                                }`}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                             <label className="text-xs font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Type className="h-3 w-3" /> Title ({activeLang.toUpperCase()})
                             </label>
                             <input 
                                required
                                value={formData.titles[activeLang]}
                                onChange={(e) => handleTextChange('titles', e.target.value)}
                                placeholder="Service title..."
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-xl font-bold text-white outline-none focus:border-brand-glow/50 transition-all" 
                             />
                        </div>

                        <div className="space-y-2">
                             <label className="text-xs font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Tag className="h-3 w-3" /> Tag Line ({activeLang.toUpperCase()})
                             </label>
                             <input 
                                value={formData.tags[activeLang]}
                                onChange={(e) => handleTextChange('tags', e.target.value)}
                                placeholder="Short catchphrase..."
                                className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-white outline-none focus:border-brand-glow/50" 
                             />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FileText className="h-3 w-3" /> Description ({activeLang.toUpperCase()})
                            </label>
                            <textarea 
                                rows={6}
                                value={formData.descriptions[activeLang]}
                                onChange={(e) => handleTextChange('descriptions', e.target.value)}
                                placeholder="Detail what this service involves..."
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-brand-glow/50 transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-[2.5rem] border border-white/5 bg-[#0F1D32]/50 p-8 backdrop-blur-3xl space-y-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Palette className="h-5 w-5 text-brand-glow" /> Visual Settings
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2 mb-2">
                                <ImageIcon className="h-3 w-3" /> Service Header Image
                            </label>
                            
                            {formData.image_url ? (
                                <div className="space-y-3">
                                    <div className="relative aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 group">
                                        <img src={formData.image_url} alt="Cover" className="object-cover w-full h-full" />
                                        <button 
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, image_url: '' }))}
                                            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="w-full aspect-[2/1] rounded-2xl border-2 border-dashed border-white/5 bg-white/5 flex flex-col items-center justify-center gap-2 text-white/20 hover:text-brand-glow hover:border-brand-glow/50 transition-all"
                                >
                                    {isUploading ? (
                                        <Loader2 className="h-8 w-8 animate-spin" />
                                    ) : (
                                        <>
                                            <Upload className="h-8 w-8 text-white/10" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Upload Cover Image</span>
                                        </>
                                    )}
                                </button>
                            )}
                            <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Icon & Style</span>
                                <span className="text-xs text-brand-glow font-bold italic">Auto-generated</span>
                            </div>
                            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${formData.color_gradient} flex items-center justify-center shadow-lg shadow-brand-glow/10`}>
                                <Box className="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
  );
}
