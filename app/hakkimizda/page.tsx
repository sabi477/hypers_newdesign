'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ChevronRight, ArrowRight, Play } from 'lucide-react';

const categoryData: { [key: string]: { 
  title: string; 
  subtitle: string;
  description: string; 
  longDescription: string;
  color: string;
  dotColor: string;
  buttonColor: string;
  stats: { label: string; value: string }[];
  features: string[];
  videoDescription: string;
} } = {
  'CREATOR': {
    title: 'Hypers Creator Academy Nedir?',
    subtitle: 'İçerik Üreticileri İçin Kapsamlı Eğitim Platformu',
    description: 'Hypers Academy, Hypers New Media tarafından, içerik üreticilerine ve içerik üreticisi olmak isteyenlere yönelik hazırlanan online eğitim platformudur.',
    longDescription: 'Bir içerik üreticisinin sahip olması gereken tüm bilgileri göz önünde bulundurarak tasarlanan Hypers Academy\'de sektör profesyonelleri ve influencerlardan bilgi ve ilham veren içeriklerden oluşan bir eğitim müfredatı bulunmaktadır.\n\nHypers Academy online eğitim platformu olup, internet bağlantısı olan her yerde bu eğitimlere erişim imkanı sağlar. Sadece teori değil, pratik uygulamalar ve gerçek dünya deneyimleri ile sektöre hazırlanırsınız.',
    color: 'bg-tomato-500',
    dotColor: '#ff5500',
    buttonColor: 'bg-tomato-500 text-white',
    stats: [
      { label: 'Size Özel Eğitim', value: '82' },
      { label: 'Uzman Eğitmen', value: '37' }
    ],
    features: [
      'Sektör profesyonellerinden eğitim',
      'Pratik odaklı müfredat',
      'Online erişim imkanı',
      'Güncel içerikler',
      'Topluluk desteği',
      'Sertifikalı programlar'
    ],
    videoDescription: 'Hypers Academy Showreel / 2024'
  },
  'MUSIC': {
    title: 'Hypers Music Academy Nedir?',
    subtitle: 'Müzik Endüstrisinde Uzmanlaşma Fırsatı',
    description: 'Müzik prodüksiyonundan mixing & mastering\'e, canlı performanstan stüdyo kayıtlarına kadar müzik endüstrisinin tüm alanlarında uzmanlaşın.',
    longDescription: 'Hypers Music Academy, müzik dünyasında kendi sesini bulmak isteyenler için kapsamlı bir eğitim programı sunar. Sektörün en iyilerinden öğrenerek prodüksiyondan performansa kadar her alanda yetkinlik kazanırsınız.\n\nDeneyimli prodüktörler ve müzisyenlerden oluşan eğitmen kadromuz ile müzik endüstrisinin tüm inceliklerini öğrenir, pratik uygulamalarla kendinizi geliştirirsiniz.',
    color: 'bg-cloudy-sky-500',
    dotColor: '#ff80ee',
    buttonColor: 'bg-cloudy-sky-500 text-white',
    stats: [
      { label: 'Müzik Programı', value: '24' },
      { label: 'Prodüktör Eğitmen', value: '15' }
    ],
    features: [
      'Prodüksiyon teknikleri',
      'Mixing & Mastering',
      'Canlı performans eğitimi',
      'Stüdyo kayıt teknikleri',
      'Müzik teorisi',
      'Sektör network fırsatları'
    ],
    videoDescription: 'Hypers Music Academy Showreel / 2024'
  },
  'ACTING': {
    title: 'Hypers Acting Academy Nedir?',
    subtitle: 'Oyunculuk Sanatında Profesyonel Gelişim',
    description: 'Kamera önü oyunculuktan sahne performansına, karakter geliştirmeden seslendirmeye kadar oyunculuk sanatının her alanında kendinizi geliştirin.',
    longDescription: 'Hypers Acting Academy, kamera önü ve sahne sanatlarında yeteneğini geliştirmek isteyenler için pratik odaklı eğitimler sunar. Usta oyuncular ve yönetmenlerden oluşan eğitmen kadromuz ile oyunculuk sanatının tüm yönlerini keşfedersiniz.\n\nKarakter geliştirmeden beden diline, seslendirmeden duygusal ifadeye kadar oyunculuk sanatının her detayını öğrenir, gerçek projelerde deneyim kazanırsınız.',
    color: 'bg-slate-blue-500',
    dotColor: '#694aff',
    buttonColor: 'bg-slate-blue-500 text-white',
    stats: [
      { label: 'Oyunculuk Programı', value: '18' },
      { label: 'Oyuncu Eğitmen', value: '12' }
    ],
    features: [
      'Kamera önü oyunculuk',
      'Sahne performansı',
      'Karakter geliştirme',
      'Seslendirme teknikleri',
      'Beden dili ve ifade',
      'Casting hazırlığı'
    ],
    videoDescription: 'Hypers Acting Academy Showreel / 2024'
  },
  'WORKSHOP': {
    title: 'Hypers Workshop Nedir?',
    subtitle: 'Hızlı ve Etkili Yetenek Kazanımı',
    description: 'Yoğun ve pratik odaklı workshop programlarımızla kısa sürede büyük ilerleme kaydedin. Haftalık kamplar ve özel atölyelerle sektöre hızlıca adım atın.',
    longDescription: 'Hypers Workshop, modern dünyanın hızına ayak uyduran, pratik odaklı bir öğrenme deneyimidir. Sektörün güncel ihtiyaçlarına göre tasarlanmış kısa ama yoğun eğitimlerle yeteneklerinizi hızla geliştirirsiniz.\n\nUzman mentorlar eşliğinde gerçekleşen bu atölyelerde, teoriden çok pratiğe odaklanarak gerçek vaka analizleri ve uygulamalı projeler üzerinde çalışırsınız.',
    color: 'bg-blue-500',
    dotColor: '#3b82f6',
    buttonColor: 'bg-blue-500 text-white',
    stats: [
      { label: 'Workshop Programı', value: '32' },
      { label: 'Uzman Mentor', value: '28' }
    ],
    features: [
      'Haftalık yoğun kamplar',
      'Birebir geri bildirim',
      'Proje odaklı çalışma',
      'Hızlı network kurma',
      'Sektörel vaka analizleri',
      'Sürekli güncellenen başlıklar'
    ],
    videoDescription: 'Hypers Workshop Showreel / 2024'
  }
};

function AboutContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('kategori')?.toUpperCase() || 'CREATOR';
  const data = categoryData[category] || categoryData['CREATOR'];

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-black dark:text-white pt-32 px-6 md:px-24 lg:px-40 pb-20 transition-colors duration-300 relative overflow-x-hidden">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black dark:text-white">Hakkımızda</span>
      </div>

      {/* Hero Section - Daha Net ve Güçlü Tasarım */}
      <div className="mb-24 text-center lg:text-left relative z-10">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4 text-black dark:text-white leading-[0.85]">
          <span className="opacity-20 block mb-2">HYPERS</span>
          {data.title.replace('Hypers ', '').replace(' Nedir?', '')}
        </h1>
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 mt-8">
          <p className="text-xl md:text-2xl font-medium italic opacity-40 lowercase">nedir?</p>
          <div className={`h-[1px] flex-grow bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent lg:via-current lg:to-transparent lg:opacity-10`} />
        </div>
      </div>

      {/* İçerik Bölümü */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 relative z-10">
        {/* Sol: Metin ve İstatistikler */}
        <div className="flex flex-col">
          <h2 className="text-[9px] font-black tracking-[0.4em] uppercase opacity-30 mb-8">HAKKIMIZDA / VİZYON</h2>
          
          <p className="text-lg font-bold tracking-tight opacity-60 leading-relaxed mb-12 whitespace-pre-line max-w-xl">
            {data.longDescription}
          </p>

          {/* İstatistikler */}
          <div className="flex gap-16 mb-16">
            {data.stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-5xl md:text-6xl font-black tracking-tighter text-black dark:text-white">{stat.value}</span>
                <span className="text-[9px] font-black tracking-widest uppercase opacity-40 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Özellikler - Glassmorphism Tasarımı */}
          <div className="mb-16">
            <h3 className="text-[10px] font-black tracking-[0.2em] uppercase mb-8 opacity-40">ÖNE ÇIKANLAR</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-5 bg-black/5 dark:bg-white/[0.03] backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 group hover:bg-black/[0.08] dark:hover:bg-white/[0.06] transition-all"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.1)]" style={{ backgroundColor: data.dotColor }} />
                  <span className="text-[11px] font-black uppercase tracking-tight opacity-60 group-hover:opacity-100 transition-opacity">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <Link
            href={
              category === 'CREATOR' ? '/programlar/icerik-ureticiligi' :
              category === 'MUSIC' ? '/programlar/muzik' :
              category === 'ACTING' ? '/programlar/oyunculuk' :
              category === 'WORKSHOP' ? '/programlar/workshop' : '/programlar'
            }
            className={`group flex items-center gap-4 ${data.buttonColor} px-10 py-5 rounded-full font-black tracking-[0.15em] uppercase text-[10px] hover:scale-105 transition-all shadow-2xl shadow-black/10 w-fit`}
          >
            EĞİTİMLERE GÖZ ATIN
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Sağ: Video Alanı */}
        <div className="relative aspect-video bg-gray-100 dark:bg-[#111111] rounded-[2.5rem] overflow-hidden shadow-xl group cursor-pointer border border-black/5 dark:border-white/5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 opacity-80 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-24 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>

          <div className="absolute bottom-8 left-8 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-bold tracking-widest uppercase text-white">{data.videoDescription}</span>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <AboutContent />
    </Suspense>
  );
}

