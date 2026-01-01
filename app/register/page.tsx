'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MoveRight, ChevronRight, User as UserIcon, Mail, Lock, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';
import { registerUser } from '@/lib/data-store';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: 'İÇERİK ÜRETİCİLİĞİ',
    kvkk: false,
    newsletter: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['İÇERİK ÜRETİCİLİĞİ', 'MÜZİK', 'OYUNCULUK', 'WORKSHOP'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kvkk) {
      setError('LÜTFEN KVKK METNİNİ ONAYLAYIN.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [firstName, ...lastNameParts] = formData.name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      registerUser({
        firstName,
        lastName,
        email: formData.email,
        password: formData.password,
        category: formData.category
      });

      // Kayıt başarılıysa direkt login yap veya login sayfasına yönlendir
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-black dark:text-white pt-24 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#CCFF00]/10 dark:bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <Navigation />
      
      {/* Kayıt İçeriği */}
      <div className="px-12 md:px-24 lg:px-40 pb-32 flex flex-col min-h-[calc(100vh-96px)] mt-[-20px] md:mt-[-40px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase">
          <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black dark:text-white">Kayıt Ol</span>
        </div>

        {/* Form ve Başlık Alanı - İlk haline döndürüldü: Dengeli grid */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start flex-grow">
          
          {/* Sol Taraf: Dev Başlık */}
          <div className="flex flex-col pt-10">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-12">
              Geleceğin <br /> Parçası Ol.
            </h1>
            <div className="space-y-8 max-w-md">
              <p className="text-xl font-medium opacity-50 leading-relaxed">
                Hypers Creator Academy ekosistemine katılarak sektörün en iyilerinden eğitim al ve kendi markanı inşa et.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 opacity-40" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Özel İçeriklere Erişim</span>
                </div>
                <div className="flex items-center gap-4 group border-t border-black/5 dark:border-white/5 pt-4">
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 opacity-40" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Birebir Mentorluk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf: Form - Kare Yapı */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-[#0a0a0a] p-10 md:p-14 rounded-[3.5rem] border-[1.5px] border-black/10 dark:border-white/10 hover:border-[#CCFF00] hover:bg-[#CCFF00]/[0.01] transition-all duration-500 shadow-2xl min-h-[750px] lg:h-auto flex flex-col justify-center relative overflow-hidden group/box"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -right-32 -top-32 w-64 h-64 bg-[#CCFF00]/5 blur-[100px] opacity-0 group-hover/box:opacity-100 transition-all duration-700" />
            
            <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest p-4 rounded-xl text-center"
                >
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">Adınız ve Soyadınız</label>
                <input 
                  type="text" 
                  required
                  placeholder="ADINIZ VE SOYADINIZ"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50/50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">E-Posta</label>
                <input 
                  type="email" 
                  required
                  placeholder="E-POSTA ADRESİNİZ"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50/50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">Şifre</label>
                <input 
                  type="password" 
                  required
                  placeholder="ŞİFRENİZ"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-gray-50/50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">Odak Alanınız</label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({...formData, category: cat})}
                      className={`py-4 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                        formData.category === cat 
                          ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10' 
                          : 'bg-gray-50/50 dark:bg-white/5 border border-black/5 dark:border-white/5 opacity-40 hover:opacity-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div 
                  className="flex items-center gap-4 cursor-pointer group"
                  onClick={() => setFormData({...formData, kvkk: !formData.kvkk})}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${formData.kvkk ? 'bg-black border-black dark:bg-white dark:border-white' : 'border-black/10 dark:border-white/10 group-hover:border-black/30'}`}>
                    {formData.kvkk && <Check className="w-3 h-3 text-white dark:text-black" />}
                  </div>
                  <p className="text-[11px] font-bold leading-tight opacity-40 group-hover:opacity-100 transition-opacity">
                    <Link href="#" className="underline underline-offset-4">KVKK Metni</Link> ve <Link href="#" className="underline underline-offset-4">Sözleşmeyi</Link> onaylıyorum.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="group w-full bg-[#CCFF00] text-black py-6 rounded-[2rem] font-black tracking-[0.2em] uppercase text-xs hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#CCFF00]/30 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'İŞLENİYOR...' : 'Akademiye Katıl'}
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-[9px] text-center font-bold opacity-30 tracking-widest uppercase pt-2">
                Zaten hesabınız var mı? <Link href="/login" className="text-black dark:text-white underline underline-offset-4 transition-all">Giriş Yapın</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
