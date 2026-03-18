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
  Upload,
  X
} from 'lucide-react';
import { toast } from 'sonner';

type Language = 'uz' | 'ru' | 'en';

interface PostFormProps {
  initialData?: {
    id: string;
    slug: string;
    image_url: string;
    is_published: boolean;
    title_uz: string;
    title_ru: string;
    title_en: string;
    excerpt_uz: string;
    excerpt_ru: string;
    excerpt_en: string;
    content_uz: any;
    content_ru: any;
    content_en: any;
    category_uz?: string;
    category_ru?: string;
    category_en?: string;
  };
}

export function PostForm({ initialData }: PostFormProps) {
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
    is_published: initialData?.is_published || false,
    titles: {
      uz: initialData?.title_uz || '',
      ru: initialData?.title_ru || '',
      en: initialData?.title_en || '',
    },
    excerpts: {
      uz: initialData?.excerpt_uz || '',
      ru: initialData?.excerpt_ru || '',
      en: initialData?.excerpt_en || '',
    },
    contents: {
      uz: typeof initialData?.content_uz === 'string' ? initialData.content_uz : (initialData?.content_uz as any)?.content?.[0]?.content?.[0]?.text || '',
      ru: typeof initialData?.content_ru === 'string' ? initialData.content_ru : (initialData?.content_ru as any)?.content?.[0]?.content?.[0]?.text || '',
      en: typeof initialData?.content_en === 'string' ? initialData.content_en : (initialData?.content_en as any)?.content?.[0]?.content?.[0]?.text || '',
    },
    categories: {
      uz: initialData?.category_uz || '',
      ru: initialData?.category_ru || '',
      en: initialData?.category_en || '',
    },
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[oO]['`ʻʼ]/g, 'o')
      .replace(/[gG]['`ʻʼ]/g, 'g')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTextChange = (field: 'titles' | 'excerpts' | 'contents' | 'categories', value: string) => {
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

    if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
    }

    setIsUploading(true);
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `post-covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath);

        setFormData(prev => ({ ...prev, image_url: publicUrl }));
        toast.success('Image uploaded successfully!');
    } catch (err: any) {
        toast.error(err.message || 'Failed to upload image');
    } finally {
        setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug) {
        toast.error('Slug is required');
        return;
    }

    setIsSubmitting(true);

    try {
      const postPayload = {
        slug: formData.slug,
        image_url: formData.image_url,
        is_published: formData.is_published,
        title_uz: formData.titles.uz,
        title_ru: formData.titles.ru,
        title_en: formData.titles.en,
        excerpt_uz: formData.excerpts.uz,
        excerpt_ru: formData.excerpts.ru,
        excerpt_en: formData.excerpts.en,
        category_uz: formData.categories.uz,
        category_ru: formData.categories.ru,
        category_en: formData.categories.en,
        content_uz: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: formData.contents.uz }] }] },
        content_ru: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: formData.contents.ru }] }] },
        content_en: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: formData.contents.en }] }] },
      };

      if (initialData?.id) {
        const { error } = await supabase
            .from('posts')
            .update(postPayload)
            .eq('id', initialData.id);
        if (error) throw error;
        toast.success('Post updated successfully!');
      } else {
        const { error } = await supabase.from('posts').insert(postPayload);
        if (error) throw error;
        toast.success('Post created successfully!');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="text-3xl font-black text-white">
                {initialData ? 'Edit' : 'New'} <span className="text-brand-glow">Blog Post</span>
            </h2>
            <div className="flex items-center gap-3">
                <button 
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, is_published: !p.is_published }))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all font-bold text-sm ${
                        formData.is_published 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                        : 'bg-white/5 border-white/10 text-white/40'
                    }`}
                >
                    {formData.is_published ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    {formData.is_published ? 'Published' : 'Draft'}
                </button>
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-glow text-brand-navy-dark font-black shadow-lg shadow-brand-glow/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {initialData ? 'Update Post' : 'Save Post'}
                </button>
            </div>
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
                                placeholder="Enter post title..."
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-xl font-bold text-white outline-none focus:border-brand-glow/50 transition-all" 
                             />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FileText className="h-3 w-3" /> Excerpt ({activeLang.toUpperCase()})
                            </label>
                            <textarea 
                                rows={3}
                                value={formData.excerpts[activeLang]}
                                onChange={(e) => handleTextChange('excerpts', e.target.value)}
                                placeholder="Brief summary of the post..."
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-brand-glow/50 transition-all resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Layout className="h-3 w-3" /> Content ({activeLang.toUpperCase()})
                            </label>
                            <textarea 
                                rows={12}
                                value={formData.contents[activeLang]}
                                onChange={(e) => handleTextChange('contents', e.target.value)}
                                placeholder="Write your post content here..."
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-brand-glow/50 transition-all font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-[2.5rem] border border-white/5 bg-[#0F1D32]/50 p-8 backdrop-blur-3xl space-y-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Globe className="h-5 w-5 text-brand-glow" /> Post Settings
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Tag className="h-3 w-3" /> Category ({activeLang.toUpperCase()})
                            </label>
                            <input 
                                value={formData.categories[activeLang]}
                                onChange={(e) => handleTextChange('categories', e.target.value)}
                                placeholder="Business, IT, etc."
                                className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm text-white outline-none focus:border-brand-glow/50"
                            />
                        </div>

                        <div className="space-y-px">
                            <label className="text-xs font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2 mb-2">
                                <ImageIcon className="h-3 w-3" /> Post Cover
                            </label>
                            
                            {formData.image_url ? (
                                <div className="space-y-3">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
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
                                    className="w-full aspect-video rounded-2xl border-2 border-dashed border-white/5 bg-white/5 flex flex-col items-center justify-center gap-2 text-white/20 hover:text-brand-glow hover:border-brand-glow/50 transition-all font-black text-[10px] tracking-widest uppercase"
                                >
                                    {isUploading ? (
                                        <Loader2 className="h-8 w-8 animate-spin" />
                                    ) : (
                                        <>
                                            <ImageIcon className="h-8 w-8 text-white/10" />
                                            <span>Upload Image</span>
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
                    </div>
                </div>
            </div>
        </div>
    </form>
  );
}
