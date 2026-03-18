'use client';

import { useState } from 'react';
import { SiteContent } from '@/lib/content';
import { Rocket, Save, ImageIcon, Shield, Lightbulb, Target, Award, Plus, Trash2, Globe, Layout, Info, ListChecks } from 'lucide-react';
import { updateSiteContent } from '@/app/actions/site';
import { toast } from 'sonner';
import { useLocale } from 'next-intl';

type TabType = 'home' | 'about';

export function SiteContentForm({ 
  initialAbout, 
  initialHome 
}: { 
  initialAbout: SiteContent | null, 
  initialHome: SiteContent | null 
}) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [aboutContent, setAboutContent] = useState<SiteContent | null>(initialAbout);
  const [homeContent, setHomeContent] = useState<SiteContent | null>(initialHome);
  const [isSaving, setIsSaving] = useState(false);
  const locale = useLocale();

  const currentContent = activeTab === 'home' ? homeContent : aboutContent;
  const setContent = activeTab === 'home' ? setHomeContent : setAboutContent;

  const handleChange = (field: keyof SiteContent, value: any) => {
    if (!currentContent) return;
    setContent({ ...currentContent, [field]: value });
  };

  // Generic helpers for lists
  const handleListChange = (field: keyof SiteContent, index: number, subField: string | null, value: any) => {
    if (!currentContent) return;
    const list = [...((currentContent[field] as any[]) || [])];
    if (subField) {
      list[index] = { ...list[index], [subField]: value };
    } else {
      list[index] = value;
    }
    handleChange(field, list);
  };

  const addListItem = (field: keyof SiteContent, defaultValue: any) => {
    if (!currentContent) return;
    handleChange(field, [...((currentContent[field] as any[]) || []), defaultValue]);
  };

  const removeListItem = (field: keyof SiteContent, index: number) => {
    if (!currentContent) return;
    const list = ((currentContent[field] as any[]) || []).filter((_, i) => i !== index);
    handleChange(field, list);
  };

  const handleSave = async () => {
    if (!currentContent) return;
    setIsSaving(true);
    try {
      const result = await updateSiteContent(currentContent.id, activeTab, locale, currentContent);
      if (result.success) {
        toast.success(`${activeTab === 'home' ? 'Home' : 'About'} content updated successfully`);
      } else {
        toast.error('Error updating content: ' + result.error);
      }
    } catch (err: any) {
      toast.error('Unexpected error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-12 pb-24 max-w-6xl mx-auto">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-[10px] font-black uppercase tracking-widest">
            <Globe className="h-3 w-3" />
            Editing Locale: {locale.toUpperCase()}
          </div>
          <h1 className="text-5xl font-black text-white leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
            Site <span className="text-brand-glow">Manager</span>
          </h1>
          
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'home' ? 'bg-brand-glow text-brand-navy-dark shadow-xl shadow-brand-glow/20' : 'text-white/40 hover:text-white'}`}
            >
              <Layout className="h-4 w-4" />
              HOME PAGE
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'about' ? 'bg-brand-glow text-brand-navy-dark shadow-xl shadow-brand-glow/20' : 'text-white/40 hover:text-white'}`}
            >
              <Info className="h-4 w-4" />
              ABOUT PAGE
            </button>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-2xl bg-brand-glow px-10 py-5 text-sm font-black text-brand-navy-dark shadow-2xl shadow-brand-glow/20 transition-all hover:scale-[1.05] active:scale-[0.98] flex items-center gap-3 disabled:opacity-50 group"
        >
          <Save className={`h-5 w-5 ${isSaving ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
          {isSaving ? 'PUBLISHING...' : 'SAVE CHANGES'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-16">
        {activeTab === 'home' ? (
          <>
            {/* HOME PAGE EDITOR */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-glow border border-white/10">
                  <Rocket className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Hero Section</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#0F1D32]/30 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Hero Badge</label>
                    <input 
                      value={homeContent?.hero_badge || ''} 
                      onChange={(e) => handleChange('hero_badge', e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-brand-glow/50 transition-all font-medium" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Hero Title</label>
                      <input 
                        value={homeContent?.hero_title || ''} 
                        onChange={(e) => handleChange('hero_title', e.target.value)}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-brand-glow/50 transition-all font-bold" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Title Highlight</label>
                      <input 
                        value={homeContent?.hero_highlight || ''} 
                        onChange={(e) => handleChange('hero_highlight', e.target.value)}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-brand-glow outline-none focus:border-brand-glow/50 transition-all font-bold" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Hero Subtitle</label>
                    <textarea 
                      rows={3}
                      value={homeContent?.hero_subtitle || ''} 
                      onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white/60 outline-none focus:border-brand-glow/50 transition-all font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">CTA Button Text</label>
                    <input 
                      value={homeContent?.hero_cta || ''} 
                      onChange={(e) => handleChange('hero_cta', e.target.value)}
                      className="w-full bg-brand-glow/10 border border-brand-glow/20 rounded-2xl p-4 text-brand-glow outline-none focus:border-brand-glow/50 transition-all font-black" 
                    />
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Trust Points (Side List)</label>
                      <button onClick={() => addListItem('hero_trust_points', '')} className="text-[10px] font-black text-brand-glow uppercase tracking-tighter flex items-center gap-1 hover:text-white transition-colors">
                        <Plus className="h-3 w-3" /> Add Point
                      </button>
                    </div>
                    <div className="space-y-3">
                      {homeContent?.hero_trust_points?.map((point, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <input 
                            value={point || ''} 
                            onChange={(e) => handleListChange('hero_trust_points', idx, null, e.target.value)}
                            className="flex-1 bg-white/5 border border-white/5 rounded-xl p-3 text-white/80 text-sm outline-none" 
                          />
                          <button onClick={() => removeListItem('hero_trust_points', idx)} className="text-red-500/40 hover:text-red-500 p-2">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-glow border border-white/10">
                  <Layout className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Feature Slider Badge</h2>
              </div>
              <div className="bg-[#0F1D32]/30 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Overlay Number</label>
                        <input 
                          value={homeContent?.hero_stat_number || ''} 
                          onChange={(e) => handleChange('hero_stat_number', e.target.value)}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white text-3xl font-black outline-none" 
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Overlay Label</label>
                        <input 
                          value={homeContent?.hero_stat_label || ''} 
                          onChange={(e) => handleChange('hero_stat_label', e.target.value)}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white/60 font-medium outline-none" 
                        />
                    </div>
                 </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-glow border border-white/10">
                  <ListChecks className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Floating Quick Services</h2>
              </div>
              <div className="bg-[#0F1D32]/30 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {homeContent?.floating_features?.map((feat, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] space-y-4">
                      <div className="space-y-1">
                        <label className="text-[8px] font-black text-white/20 uppercase tracking-widest">Feature Title</label>
                        <input 
                          value={feat.title || ''} 
                          onChange={(e) => handleListChange('floating_features', idx, 'title', e.target.value)}
                          className="w-full bg-transparent border-none text-white font-bold outline-none" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-black text-white/20 uppercase tracking-widest">Description</label>
                        <textarea 
                          rows={2}
                          value={feat.desc || ''} 
                          onChange={(e) => handleListChange('floating_features', idx, 'desc', e.target.value)}
                          className="w-full bg-transparent border-none text-white/40 text-xs outline-none resize-none" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* ABOUT PAGE EDITOR */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-glow border border-white/10">
                        <Info className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Public Page Content</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8 bg-[#0F1D32]/30 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Main Heading</label>
                                <input 
                                    value={aboutContent?.pageTitle || ''} 
                                    onChange={(e) => handleChange('pageTitle', e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-brand-glow/50 transition-all font-black text-xl" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Sub-Heading</label>
                                <input 
                                    value={aboutContent?.pageSubtitle || ''} 
                                    onChange={(e) => handleChange('pageSubtitle', e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white/60 outline-none focus:border-brand-glow/50 transition-all font-medium" 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Mission Long Statement</label>
                            <textarea 
                                rows={6}
                                value={aboutContent?.mission || ''} 
                                onChange={(e) => handleChange('mission', e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white/60 outline-none focus:border-brand-glow/50 transition-all font-medium leading-relaxed" 
                            />
                        </div>
                    </div>
                    <div className="space-y-8 bg-[#0F1D32]/30 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-14 w-14 rounded-2xl bg-brand-glow/10 flex items-center justify-center text-brand-glow border border-brand-glow/20 mb-6">
                                <ImageIcon className="h-6 w-6" />
                            </div>
                            <h4 className="font-bold text-white mb-4">Mission Media</h4>
                            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-4">
                                <img src={aboutContent?.image_url || ''} className="object-cover w-full h-full" alt="Mission" />
                            </div>
                            <input 
                                value={aboutContent?.image_url || ''} 
                                onChange={(e) => handleChange('image_url', e.target.value)}
                                placeholder="Image URL"
                                className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-white/20 text-[10px] outline-none truncate" 
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-glow border border-white/10">
                        <Layout className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">About Preview (Home Page)</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#0F1D32]/30 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                    <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Preview Badge</label>
                            <input 
                                value={aboutContent?.badge || ''} 
                                onChange={(e) => handleChange('badge', e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-brand-glow/50 transition-all font-medium" 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Preview Heading</label>
                                <input 
                                    value={aboutContent?.title || ''} 
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-brand-glow/50 transition-all font-bold" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Heading Highlight</label>
                                <input 
                                    value={aboutContent?.highlight || ''} 
                                    onChange={(e) => handleChange('highlight', e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-brand-glow outline-none focus:border-brand-glow/50 transition-all font-bold" 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Preview Description</label>
                            <textarea 
                                rows={4}
                                value={aboutContent?.description || ''} 
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white/60 outline-none focus:border-brand-glow/50 transition-all font-medium resize-none" 
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                         <div className="flex items-center justify-between mb-2">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Highlight Points (Preview)</label>
                            <button onClick={() => addListItem('preview_features', '')} className="text-[10px] font-black text-brand-glow uppercase tracking-tighter flex items-center gap-1 hover:text-white transition-colors">
                                <Plus className="h-3 w-3" /> Add Highlight
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {aboutContent?.preview_features?.map((feat, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl group/feat">
                                    <input 
                                        value={feat || ''} 
                                        onChange={(e) => handleListChange('preview_features', idx, null, e.target.value)}
                                        className="flex-1 bg-transparent border-none text-white/80 text-sm outline-none" 
                                    />
                                    <button onClick={() => removeListItem('preview_features', idx)} className="opacity-0 group-hover/feat:opacity-100 transition-opacity p-2 text-red-500/40 hover:text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-glow border border-white/10">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Corporate Values (Full Page)</h2>
              </div>
              <div className="bg-[#0F1D32]/30 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {aboutContent?.features?.map((val, idx) => (
                      <div key={idx} className="relative group/val bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5 hover:border-brand-glow/20 transition-all space-y-6">
                        <button onClick={() => removeListItem('features', idx)} className="absolute top-4 right-4 h-8 w-8 rounded-full bg-red-500/10 text-red-500 opacity-0 group-hover/val:opacity-100 transition-opacity flex items-center justify-center">
                          <Trash2 className="h-3 w-3" />
                        </button>
                        
                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-white/20 uppercase tracking-widest ml-1">Icon Style</label>
                          <select 
                            value={val.icon} 
                            onChange={(e) => handleListChange('features', idx, 'icon', e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-brand-glow text-xs font-bold outline-none focus:border-brand-glow/30 transition-all"
                          >
                            <option value="Shield">🛡️ Shield</option>
                            <option value="Lightbulb">💡 Lightbulb</option>
                            <option value="Target">🎯 Target</option>
                            <option value="Users">👥 Users</option>
                            <option value="Award">🏆 Award</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-white/20 uppercase tracking-widest ml-1">Value Title</label>
                          <input 
                            value={val.title || ''} 
                            placeholder="Enter title..."
                            onChange={(e) => handleListChange('features', idx, 'title', e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-white font-bold text-sm outline-none focus:border-brand-glow/30 transition-all" 
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[8px] font-black text-white/20 uppercase tracking-widest ml-1">Description</label>
                          <textarea 
                            rows={3}
                            placeholder="Enter details..."
                            value={val.description || ''} 
                            onChange={(e) => handleListChange('features', idx, 'description', e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-white/40 text-[10px] outline-none resize-none focus:border-brand-glow/30 transition-all" 
                          />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addListItem('features', { icon: 'Shield', title: '', description: '' })} className="h-full min-h-[300px] rounded-[2.5rem] border-2 border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center gap-4 text-white/20 hover:text-brand-glow transition-all hover:bg-white/[0.03]">
                      <Plus className="h-10 w-10" />
                      <span className="text-[10px] font-black uppercase tracking-widest">New Corporate Value</span>
                    </button>
                  </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-glow border border-white/10">
                  <Award className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Engagement Banner (CTA)</h2>
              </div>
              <div className="bg-[#0F1D32]/30 p-10 rounded-[4rem] border border-white/5 backdrop-blur-xl space-y-8 text-center bg-gradient-to-br from-brand-glow/[0.05] to-transparent">
                  <div className="max-w-xl mx-auto space-y-6">
                    <textarea 
                      rows={2}
                      value={aboutContent?.ctaTitle || ''} 
                      onChange={(e) => handleChange('ctaTitle', e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-3xl p-6 text-white text-3xl font-black text-center outline-none" 
                    />
                    <input 
                      value={aboutContent?.ctaSubtitle || ''} 
                      onChange={(e) => handleChange('ctaSubtitle', e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white/60 text-center outline-none" 
                    />
                    <div className="max-w-xs mx-auto pt-4">
                      <input 
                        value={aboutContent?.ctaBtnText || ''} 
                        onChange={(e) => handleChange('ctaBtnText', e.target.value)}
                        className="w-full bg-brand-glow rounded-2xl p-4 text-brand-navy-dark font-black text-center outline-none" 
                      />
                    </div>
                  </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
