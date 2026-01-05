'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { addToCart } from '@/lib/data-store';

const academyConfig: { [key: string]: { name: string, color: string, gradient: string, popularGradient: string, popularGlow: string, checkColor: string, buttonColor: string } } = {
  'CREATOR': {
    name: 'Creator Academy',
    color: 'text-tomato-500',
    gradient: 'from-tomato-500 via-tomato-400 to-tomato-600',
    popularGradient: 'from-tomato-500 via-tomato-400 to-tomato-600',
    popularGlow: 'shadow-tomato-500/40',
    checkColor: 'text-tomato-500',
    buttonColor: 'bg-tomato-500'
  },
  'MUSIC': {
    name: 'Music Academy',
    color: 'text-cloudy-sky-500',
    gradient: 'from-cloudy-sky-500 via-cloudy-sky-400 to-cloudy-sky-600',
    popularGradient: 'from-cloudy-sky-500 via-cloudy-sky-400 to-cloudy-sky-600',
    popularGlow: 'shadow-cloudy-sky-500/40',
    checkColor: 'text-cloudy-sky-500',
    buttonColor: 'bg-cloudy-sky-500'
  },
  'ACTING': {
    name: 'Acting Academy',
    color: 'text-slate-blue-500',
    gradient: 'from-slate-blue-500 via-slate-blue-400 to-slate-blue-600',
    popularGradient: 'from-slate-blue-500 via-slate-blue-400 to-slate-blue-600',
    popularGlow: 'shadow-slate-blue-500/40',
    checkColor: 'text-slate-blue-500',
    buttonColor: 'bg-slate-blue-500'
  },
  'WORKSHOP': {
    name: 'Workshop',
    color: 'text-blue-500',
    gradient: 'from-blue-500 via-blue-400 to-blue-600',
    popularGradient: 'from-blue-500 via-blue-400 to-blue-600',
    popularGlow: 'shadow-blue-500/40',
    checkColor: 'text-blue-500',
    buttonColor: 'bg-blue-500'
  }
};

function PricingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const academy = searchParams.get('academy') || 'CREATOR';
  const config = academyConfig[academy] || academyConfig['CREATOR'];

  const handleAddToCart = (plan: any) => {
    addToCart({
      name: plan.desc,
      price: plan.price,
      academy: academy
    });
    router.push('/sepet');
  };

  const plans = [
    {
      id: 1,
      name: '1 Ay',
      dose: 'Monthly',
      price: '390₺',
      desc: `Hypers ${config.name} 1 Ay`,
      features: ['1 ay boyunca eğitimlere sınırsız erişim.', 'Taksitle ödeme imkanı.'],
      gradient: config.gradient,
      glow: 'shadow-black/5'
    },
    {
      id: 2,
      name: '3 Ay',
      dose: 'Quarterly',
      price: '790₺',
      desc: `Hypers ${config.name} 3 Ay`,
      features: ['İlk 1 ay ücretsiz.', '3 ay boyunca eğitimlere sınırsız erişim.', 'Taksitle ödeme imkanı.'],
      gradient: config.popularGradient,
      glow: config.popularGlow,
      popular: true
    },
    {
      id: 3,
      name: '6 Ay',
      dose: 'Semi-Annual',
      price: '1.590₺',
      desc: `Hypers ${config.name} 6 Ay`,
      features: ['İlk 2 ay ücretsiz.', '6 ay boyunca eğitimlere sınırsız erişim.', 'Taksitle ödeme imkanı.'],
      gradient: config.gradient,
      glow: 'shadow-black/5'
    }
  ];

  return (
    <div className="max-w-[1800px] mx-auto relative">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
        <ChevronRight className="w-3 h-3 text-black dark:text-white" />
        <span className="text-black dark:text-white">{config.name}</span>
        <ChevronRight className="w-3 h-3 text-black dark:text-white" />
        <span className="text-black dark:text-white">Fiyatlandırma</span>
      </div>

      {/* Sayfa Başlığı - Daha Zarif ve Minimal Tasarım */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2 text-black dark:text-white leading-tight">
          {config.name}
        </h1>
        <p className="text-[10px] md:text-sm font-bold opacity-20 uppercase tracking-[0.3em] mb-8">PRICING PLANS</p>
        
        <div className="flex justify-center">
          {/* Bilgilendirme - Daha Az Belirgin ve Zarif */}
          <p className="max-w-md text-[9px] font-bold text-black dark:text-white uppercase tracking-[0.15em] leading-relaxed opacity-30">
            * Bu paket sadece <span className="opacity-100">{config.name}</span> eğitimlerini kapsar. 
            Diğer akademiler için ayrı üyelik gereklidir.
          </p>
        </div>
      </div>

      {/* Fiyatlandırma Kartları */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1400px] mx-auto relative z-10">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: plan.popular ? 1.08 : 1.05, zIndex: 10 }}
            className={`relative p-[2px] rounded-[2.5rem] transition-all duration-500 group ${
              plan.popular ? 'scale-105 lg:scale-110 z-10' : 'scale-100'
            }`}
          >
            {/* Gradient Border Background */}
            <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${plan.gradient} ${
              plan.popular ? 'opacity-60 group-hover:opacity-100' : 'opacity-20 group-hover:opacity-100'
            } transition-opacity duration-500`} />
            
            {/* Inner Content Card */}
            <div className="relative h-full w-full bg-white dark:bg-[#0a0a0a] rounded-[2.4rem] flex flex-col overflow-hidden shadow-2xl">
              {/* Üst Kısım */}
              <div className="p-10 border-b border-black/5 dark:border-white/5 flex flex-col relative">
                {/* Glossy Overlay Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-50" />
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className="text-[10px] font-black opacity-30 tracking-widest uppercase">0{plan.id} — {plan.dose}</span>
                  {plan.popular && (
                    <span className={`px-3 py-1 ${config.buttonColor}/10 rounded-full text-[8px] font-black uppercase tracking-widest ${config.color}`}>Most popular</span>
                  )}
                </div>

                <h2 className="text-3xl font-black tracking-tighter uppercase mb-6 text-black dark:text-white leading-tight relative z-10">{plan.desc}</h2>

                <div className="flex items-baseline gap-2 mb-10 relative z-10">
                  <span className="text-5xl font-black tracking-tighter text-black dark:text-white">{plan.price}</span>
                </div>

                <button 
                  onClick={() => handleAddToCart(plan)}
                  className={`w-full py-5 rounded-2xl font-black tracking-widest text-center uppercase text-[10px] transition-all shadow-lg relative z-10 ${
                    plan.popular 
                    ? `${config.buttonColor} text-white shadow-xl ${config.popularGlow}` 
                    : 'bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                  }`}
                >
                  Satın Al
                </button>
              </div>

              {/* Alt Kısım - Özellikler */}
              <div className="p-10 flex-grow bg-gray-50/30 dark:bg-white/[0.02]">
                <ul className="space-y-5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
                        plan.popular ? `${config.buttonColor}/30` : 'border-black/10 dark:border-white/10'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? config.color : 'text-[#CCFF00]'}`} />
                      </div>
                      <span className="text-[11px] font-bold opacity-50 uppercase tracking-tight text-black dark:text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] pt-32 px-6 md:px-24 lg:px-40 pb-32 transition-colors duration-300 relative overflow-x-hidden">
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <PricingContent />
      </Suspense>
      <Footer />
    </main>
  );
}
