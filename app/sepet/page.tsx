'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ShoppingBag, MoveRight, ChevronRight, CreditCard, Trash2, ShieldCheck, Check } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import { getCart, clearCart, type CartItem } from '@/lib/data-store';

function CartContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [step, setStep] = useState(1); // 1: Cart, 2: Payment, 3: Success

  useEffect(() => {
    // Önce localStorage'dan al
    const storedCart = getCart();
    if (storedCart) {
      setCartItem(storedCart);
    } else {
      // Yoksa URL'den al (Geriye dönük uyumluluk)
      const itemName = searchParams.get('item');
      const itemPrice = searchParams.get('price');
      const academy = searchParams.get('academy') || 'CREATOR';
      if (itemName && itemPrice) {
        setCartItem({ name: itemName, price: itemPrice, academy });
      }
    }
  }, [searchParams]);

  const handleRemove = () => {
    clearCart();
    setCartItem(null);
    router.push('/sepet');
  };

  const handlePaymentComplete = () => {
    setStep(3);
    clearCart(); // Başarılı ödeme sonrası sepeti temizle
  };

  if (!cartItem) {
    return (
      <div className="max-w-[800px] mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#CCFF00]/20 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-[#CCFF00]" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-[#111111] border-2 border-[#CCFF00] rounded-full flex items-center justify-center">
              <span className="text-[10px] font-black text-[#CCFF00]">0</span>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
              Sepetinize Henüz <br /> Paket Eklemediniz.
            </h1>
            <p className="text-lg font-medium opacity-50 max-w-md mx-auto leading-relaxed">
              Eğitimlerden faydalanmak için; paket seçeneklerimizi inceleyebilirsin.
            </p>
          </div>
          <Link
            href="/fiyatlandirma"
            className="group flex items-center gap-4 bg-[#CCFF00] text-black px-10 py-5 rounded-full font-black tracking-[0.2em] uppercase text-xs hover:scale-105 transition-all shadow-xl shadow-[#CCFF00]/20"
          >
            Paketleri İncele
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto py-12">
      {/* Checkout Steps */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-20 px-4">
        {[
          { id: 1, label: 'SEPETİM', icon: ShoppingBag },
          { id: 2, label: 'ÖDEME', icon: CreditCard },
          { id: 3, label: 'ONAY', icon: ShieldCheck },
        ].map((s, idx) => (
          <div key={s.id} className="flex items-center gap-4">
            <div className={`flex items-center gap-3 transition-all ${step >= s.id ? 'opacity-100' : 'opacity-20'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= s.id ? 'border-[#CCFF00] bg-[#CCFF00]/10' : 'border-black dark:border-white'}`}>
                <s.icon className={`w-4 h-4 ${step >= s.id ? 'text-[#CCFF00]' : ''}`} />
              </div>
              <span className="text-[10px] font-black tracking-widest hidden md:block">{s.label}</span>
            </div>
            {idx < 2 && <div className={`w-8 md:w-16 h-[1px] ${step > s.id ? 'bg-[#CCFF00]' : 'bg-black/10 dark:bg-white/10'}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-4">
        {step === 1 && (
          <>
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-8 bg-white dark:bg-[#111111] rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 text-center md:text-left">
                  <div className="w-20 h-20 rounded-2xl bg-black dark:bg-white flex items-center justify-center font-black text-white dark:text-black text-2xl">H</div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">{cartItem.name}</h3>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">Tek Seferlik Ödeme</p>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <span className="text-2xl font-black tracking-tighter">{cartItem.price}</span>
                  <button onClick={handleRemove} className="p-3 text-red-500 hover:bg-red-500/5 rounded-full transition-all opacity-40 hover:opacity-100">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="space-y-6">
              <div className="p-8 bg-white dark:bg-[#111111] text-black dark:text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-black/5 dark:border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 blur-[60px] -z-0" />
                <h3 className="text-xl font-black uppercase tracking-tight mb-8 relative z-10">Özet</h3>
                <div className="space-y-4 mb-8 relative z-10">
                  <div className="flex justify-between text-[11px] font-bold opacity-40 uppercase tracking-widest">
                    <span>ARA TOPLAM</span>
                    <span>{cartItem.price}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold opacity-40 uppercase tracking-widest">
                    <span>KDV (%20)</span>
                    <span>DAHİL</span>
                  </div>
                  <div className="h-[1px] bg-black/5 dark:bg-white/10 my-4" />
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest opacity-60">TOPLAM</span>
                    <span className="text-4xl font-black tracking-tighter text-black dark:text-[#CCFF00]">{cartItem.price}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-5 bg-[#CCFF00] text-black rounded-2xl font-black uppercase text-xs hover:scale-[1.02] transition-all relative z-10 shadow-xl shadow-[#CCFF00]/20"
                >
                  ÖDEMEYE GEÇ
                </button>
              </div>
              <p className="text-[9px] font-bold opacity-30 text-center uppercase tracking-widest px-4">
                Ödemeniz SSL sertifikası ile %100 güvenli şekilde işlenir.
              </p>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="lg:col-span-3 max-w-2xl mx-auto w-full space-y-8">
            <div className="p-10 bg-white dark:bg-[#111111] rounded-[3rem] border border-black/5 dark:border-white/5 shadow-2xl space-y-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-center">Kart Bilgileri</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">KART ÜZERİNDEKİ İSİM</label>
                  <input type="text" placeholder="AD SOYAD" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-tight focus:ring-1 focus:ring-[#CCFF00]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">KART NUMARASI</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-tight focus:ring-1 focus:ring-[#CCFF00]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">SON KULLANMA</label>
                    <input type="text" placeholder="AA / YY" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-tight focus:ring-1 focus:ring-[#CCFF00]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">CVV</label>
                    <input type="text" placeholder="000" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-tight focus:ring-1 focus:ring-[#CCFF00]" />
                  </div>
                </div>
              </div>
              <button 
                onClick={handlePaymentComplete}
                className="w-full py-5 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-black uppercase text-xs hover:scale-[1.02] transition-all shadow-xl"
              >
                {cartItem.price} ÖDE VE TAMAMLA
              </button>
              <button onClick={() => setStep(1)} className="w-full text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-all">Geri Dön</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="lg:col-span-3 flex flex-col items-center justify-center py-20 text-center space-y-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 rounded-full bg-[#CCFF00] flex items-center justify-center shadow-2xl shadow-[#CCFF00]/40"
            >
              <Check className="w-12 h-12 text-black" strokeWidth={3} />
            </motion.div>
            <div className="space-y-4">
              <h1 className="text-5xl font-black uppercase tracking-tighter">ÖDEME BAŞARILI!</h1>
              <p className="text-lg font-medium opacity-50 max-w-md mx-auto leading-relaxed uppercase tracking-widest text-sm">
                Hoş geldin! {cartItem.name} paketiniz tanımlandı. <br /> Eğitimlerine hemen başlayabilirsin.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="group flex items-center gap-4 bg-black text-white dark:bg-white dark:text-black px-12 py-5 rounded-full font-black tracking-[0.2em] uppercase text-xs hover:scale-105 transition-all shadow-xl"
            >
              DASHBOARD'A GİT
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-black dark:text-white pt-32 px-6 md:px-24 lg:px-40 pb-20 transition-colors duration-300 relative overflow-x-hidden">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black dark:text-white">Checkout</span>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <CartContent />
      </Suspense>

      <Footer />
    </main>
  );
}
