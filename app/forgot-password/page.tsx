'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MoveRight, ChevronRight, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-black dark:text-white pt-24 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#CCFF00]/10 dark:bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <Navigation />
      
      <div className="px-6 md:px-24 lg:px-40 pb-32 flex flex-col min-h-[calc(100vh-96px)] mt-[-20px] md:mt-[-40px]">
        <div className="flex items-center gap-2 mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/login" className="hover:text-black dark:hover:text-white transition-colors">Giriş Yap</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black dark:text-white">Şifremi Unuttum</span>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center flex-grow">
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-12">
              Şifreni mi <br /> Unuttun?
            </h1>
            <p className="text-xl font-medium opacity-50 leading-relaxed max-w-md">
              Endişelenme, e-posta adresini girerek şifreni sıfırlaman için gerekli bağlantıyı alabilirsin.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#0a0a0a] p-10 md:p-14 rounded-[3.5rem] border-[1.5px] border-black/10 dark:border-white/10 shadow-2xl flex flex-col justify-center relative overflow-hidden"
          >
            {!submitted ? (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">E-Posta</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                    <input 
                      type="email" 
                      required
                      placeholder="E-POSTA ADRESİNİZ"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50/50 dark:bg-white/5 border-none rounded-2xl pl-14 pr-6 py-5 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#CCFF00] transition-all outline-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="group w-full bg-[#CCFF00] text-black py-6 rounded-[2rem] font-black tracking-[0.2em] uppercase text-xs hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#CCFF00]/30 transition-all flex items-center justify-center gap-4"
                >
                  Sıfırlama Bağlantısı Gönder
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <Link href="/login" className="flex items-center justify-center gap-2 text-[10px] font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">
                  <ArrowLeft className="w-3 h-3" />
                  Giriş Sayfasına Dön
                </Link>
              </form>
            ) : (
              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-[#CCFF00]/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-[#CCFF00]" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">E-POSTA GÖNDERİLDİ</h3>
                  <p className="text-sm font-medium opacity-50 leading-relaxed">
                    {email} adresine şifre sıfırlama bağlantısı gönderdik. Lütfen kutunu kontrol et.
                  </p>
                </div>
                <Link 
                  href="/login"
                  className="inline-flex items-center gap-4 text-[10px] font-black tracking-widest uppercase opacity-40 hover:opacity-100 transition-all"
                >
                  Giriş Sayfasına Dön
                  <MoveRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}



