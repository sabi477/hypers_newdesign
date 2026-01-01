'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck, Sparkle } from 'lucide-react';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo için basit bir şifre kontrolü
    if (password === 'hypers2024') {
      localStorage.setItem('admin_auth', 'true');
      localStorage.setItem('admin_auth_user', JSON.stringify({
        id: '1',
        name: 'Sabiha Yılmaz',
        email: 'info@hypers.co',
        role: 'super_admin'
      }));
      router.push('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] flex items-center justify-center p-6 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Logo Area */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-48 h-10 mb-4">
            <Image 
              src="/images/hypers_academy_logo.png"
              alt="Hypers Academy Logo"
              fill
              className="object-contain dark:invert"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <ShieldCheck className="w-3 h-3 opacity-40" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 text-black dark:text-white">Admin Secure Access</span>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-white dark:bg-[#111111] p-10 md:p-12 rounded-[3rem] border border-black/5 dark:border-white/5 shadow-2xl relative overflow-hidden">
          {/* Decorative Sparkle */}
          <div className="absolute -top-4 -right-4 opacity-5">
            <Sparkle className="w-24 h-24 rotate-12" />
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2 text-black dark:text-white">Panel Girişi</h1>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-10 text-black dark:text-white">Lütfen erişim şifresini girin.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-all ${error ? 'text-red-500 opacity-100' : 'opacity-30 group-focus-within:opacity-100'} text-black dark:text-white`} />
                  <input 
                    type="password" 
                    placeholder="ERİŞİM ŞİFRESİ"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-gray-50 dark:bg-black/20 border-none rounded-2xl pl-12 pr-4 py-4 text-[10px] font-black uppercase tracking-[0.3em] outline-none transition-all ${
                      error ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-[#CCFF00]'
                    } text-black dark:text-white`}
                    autoFocus
                  />
                </div>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] font-black text-red-500 uppercase tracking-widest ml-2"
                  >
                    Geçersiz şifre, lütfen tekrar deneyin.
                  </motion.p>
                )}
              </div>

              <button 
                type="submit"
                className="group w-full bg-[#CCFF00] text-black py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-[#CCFF00]/10"
              >
                Sisteme Gir
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-[8px] font-bold opacity-20 uppercase tracking-[0.4em] text-black dark:text-white">
          © 2024 Hypers Academy Management System
        </p>
      </motion.div>
    </main>
  );
}

