'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#0A0F1E] relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-brand-glow/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="mb-12 text-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Site
            </Link>
          <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            TechWay <span className="text-brand-glow">Admin</span>
          </h1>
          <p className="text-white/60">Access your dashboard to manage high-fidelity content.</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-3xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm font-medium text-red-500">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <input
                    type="email"
                    required
                    placeholder="admin@techway.uz"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white outline-none ring-primary/20 transition-all focus:border-primary/50 focus:ring-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white outline-none ring-primary/20 transition-all focus:border-primary/50 focus:ring-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <div className="h-5 w-5 rounded-md border border-white/10 bg-white/5 transition-all peer-checked:border-brand-glow peer-checked:bg-brand-glow/10 group-hover:border-white/30" />
                  <div className="absolute opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg className="h-3.5 w-3.5 text-brand-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-semibold text-white/50 transition-colors group-hover:text-white/80 select-none">Remember Me</span>
              </label>
              
              <Link href="#" className="text-sm font-semibold text-brand-glow/60 hover:text-brand-glow transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-2xl bg-brand-glow h-14 font-black tracking-tight text-brand-navy-dark shadow-2xl shadow-brand-glow/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Log In Securely'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
