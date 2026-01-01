'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import MainEntry from '@/components/MainEntry';
import AboutSection from '@/components/AboutSection';
import Features from '@/components/Features';
import CarouselSection from '@/components/CarouselSection';
import ProgramGrid from '@/components/ProgramGrid';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('CREATOR ACADEMY');

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] relative overflow-x-hidden">
      {/* Global Background Light Blurs */}
      <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-tomato-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] bg-cloudy-sky-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] -left-[5%] w-[35%] h-[35%] bg-slate-blue-500/5 blur-[110px] rounded-full pointer-events-none" />
      
      <Navigation activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      {/* 1. Giriş Ekranı (Durağan) */}
      <MainEntry />
      
      {/* 2. Hakkımızda Bölümü (Kategoriye Göre Dinamik) */}
      <AboutSection activeCategory={activeCategory} />
      
      {/* 2.5 Öne Çıkan Özellikler */}
      <Features />
      
      {/* 3. Yorumlar (Otomatik Akan) */}
      <Testimonials />
      
      {/* 4. Keşfet - 3 Satır (Manuel Kaydırılan) 
          Akan iki bölüm arasına girerek gözü dinlendirir */}
      <ProgramGrid />
      
      {/* 5. Showcase (Otomatik Akan) */}
      <CarouselSection />

      {/* 6. İletişim & Footer */}
      <Footer />
    </main>
  );
}
