'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MoveRight, ChevronRight, Mail, Lock, Sparkles, User, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { loginUser } from '@/lib/data-store';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (searchParams.get('registered')) {
      setSuccess('KAYIT BAŞARILI! ŞİMDİ GİRİŞ YAPABİLİRSİNİZ.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      loginUser(formData.email, formData.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-black dark:text-white pt-24 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Glow ... (rest of the component) */}
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#CCFF00]/10 dark:bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <Navigation />
      
      {/* Giriş İçeriği */}
      <div className="px-6 md:px-24 lg:px-40 pb-32 flex flex-col min-h-[calc(100vh-96px)] mt-[-20px] md:mt-[-40px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 md:mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black dark:text-white">Giriş Yap</span>
        </div>

        {/* Form ve Başlık Alanı - Dengeli grid */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start flex-grow">
          
          {/* Sol Taraf: Dev Başlık */}
          <div className="flex flex-col pt-4 md:pt-10">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8 md:mb-12">
              Tekrar <br /> Hoş Geldin.
            </h1>
            <div className="space-y-6 md:space-y-8 max-w-md">
              <p className="text-lg md:text-xl font-medium opacity-50 leading-relaxed">
                Hypers Creator Academy ekosistemine geri dön ve eğitimlerine kaldığın yerden devam et.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                    <User className="w-5 h-5 opacity-40" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Kişisel Dashboard</span>
                </div>
                <div className="flex items-center gap-4 group border-t border-black/5 dark:border-white/5 pt-4">
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 opacity-40" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Eğitim Geçmişi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf: Giriş Formu - Kare Yapı */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#0a0a0a] p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border-[1.5px] border-black/10 dark:border-white/10 hover:border-[#CCFF00] hover:bg-[#CCFF00]/[0.01] transition-all duration-500 shadow-2xl min-h-[500px] md:min-h-[600px] lg:h-auto flex flex-col justify-center relative overflow-hidden group/box"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -right-32 -top-32 w-64 h-64 bg-[#CCFF00]/5 blur-[100px] opacity-0 group-hover/box:opacity-100 transition-all duration-700" />
            
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest p-4 rounded-xl text-center"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] text-[9px] font-black uppercase tracking-widest p-4 rounded-xl text-center"
                >
                  {success}
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">E-Posta</label>
                <input 
                  type="email" 
                  required
                  placeholder="e-posta adresiniz"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value.toLowerCase()})}
                  className="w-full bg-gray-50/50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-[11px] font-bold tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2 relative">
                <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">Şifre</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="ŞİFRENİZ"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-gray-50/50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none pr-14"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Şifremi Unuttum Linki */}
              <div className="flex justify-end pt-2">
                <Link href="/forgot-password" className="text-[10px] font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest underline underline-offset-4">
                  Şifremi Unuttum
                </Link>
              </div>

              {/* Giriş Butonu */}
              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="group w-full bg-[#CCFF00] text-black py-6 rounded-[2rem] font-black tracking-[0.2em] uppercase text-xs hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#CCFF00]/30 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'GİRİŞ YAPILIYOR...' : 'Giriş Yap'}
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-[10px] text-center font-bold opacity-30 tracking-widest uppercase pt-4">
                Hesabınız yok mu? <Link href="/register" className="text-black dark:text-white underline decoration-2 underline-offset-4 transition-all">Kayıt Olun</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a]" />}>
      <LoginContent />
    </Suspense>
  );
}

