'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Search, ChevronRight, MoveRight } from 'lucide-react';

const allPrograms = [
  { 
    id: 101, 
    title: 'Kurumlar için Etkili Sosyal Medya Kullanımı Eğitimi', 
    category: 'WORKSHOP', 
    desc: 'L’Oréal Dermatolojik Güzellik Divizyonu için, 35 eczacıdan oluşan Medfluencer ekibine yönelik dijital görünürlüklerini artırmaya yönelik kapsamlı bir program. Algoritma tabanlı eğitimler ve strateji oturumları.', 
    lessons: 8, 
    instructor: 'L’ORÉAL DERMATOLOJİK GÜZELLİK',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop'
  },
  { 
    id: 102, 
    title: 'Performans Pazarlaması Eğitimi', 
    category: 'WORKSHOP', 
    desc: 'Anadolu Efes Global çalışanlarına özel; Yeni Medya, İçerik Üreticiliği ve Performans Analizi konularında İngilizce olarak gerçekleştirilen kapsamlı eğitim programı.', 
    lessons: 12, 
    instructor: 'ANADOLU EFES',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop'
  },
  { 
    id: 8, 
    title: 'Workshop Weekly', 
    category: 'WORKSHOP', 
    desc: 'Haftalık yoğun kamp. Her hafta yeni bir konu ve pratik uygulama ile yeteneklerini bir üst seviyeye taşı.', 
    lessons: 4, 
    instructor: 'Pınar Musaoğlu',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: 17, 
    title: 'Intensive Bootcamp', 
    category: 'WORKSHOP', 
    desc: 'Yoğun eğitim kampı. Kısa sürede maksimum verim alabileceğiniz, sektörel standartlarda hazırlanan bootcamp programı.', 
    lessons: 6, 
    instructor: 'Pınar Musaoğlu',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'
  },
  { 
    id: 18, 
    title: 'Weekend Workshop', 
    category: 'WORKSHOP', 
    desc: 'Hafta sonu atölye çalışması. Cumartesi ve Pazar günleri gerçekleştirilen, odaklanmış pratik eğitimler.', 
    lessons: 3, 
    instructor: 'Pınar Musaoğlu',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop'
  },
];

export default function WorkshopProgramsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselSlides = [
    { id: 1, img: '/images/kapak2.jpg', title: 'Yeni Nesil Atölyeler', subtitle: 'Yaratıcılığınızı Teknolojiyle Birleştirin' },
    { id: 2, img: 'https://images.unsplash.com/photo-1492619334731-2fce6f0459bb?q=80&w=2070&auto=format&fit=crop', title: 'İçerik Üreticiliği', subtitle: 'Yeni Nesil Dijital Stratejiler' },
    { id: 3, img: 'https://images.unsplash.com/photo-1514525253344-762397117a26?q=80&w=2070&auto=format&fit=crop', title: 'Müzik Prodüksiyonu', subtitle: 'Kendi Sesini Dünyaya Duyur' },
    { id: 4, img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop', title: 'Oyunculuk Workshop', subtitle: 'Sahne ve Kamera Önü Teknikleri' },
    { id: 5, img: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop', title: 'Yaratıcı Yazarlık', subtitle: 'Hikayeni Güçlü Anlat' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredPrograms = useMemo(() => {
    return allPrograms.filter(prog => {
      return prog.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] pt-32 px-6 md:px-24 lg:px-40 pb-20 transition-colors duration-300 relative overflow-x-hidden">
      {/* Background Light Blurs */}
      <div className="absolute top-[-10%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <Navigation />
      
      <div className="flex items-center gap-2 mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase text-black dark:text-white">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black dark:text-white">Workshop Programları</span>
      </div>

      <div className="mb-20 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 text-black dark:text-white leading-tight">
          HYPERS <span className="opacity-20 italic">Workshop</span>
        </h1>
        <p className="text-[10px] md:text-sm font-bold opacity-30 uppercase tracking-[0.3em] mb-8">Yoğun ve pratik odaklı eğitimlerle yeteneklerini geliştir.</p>
      </div>

      {/* Workshop Hero Carousel */}
      <div className="mb-20 relative h-[500px] rounded-[3rem] overflow-hidden group shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${carouselSlides[activeSlide].img}')` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-16 text-white">
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[10px] font-black tracking-[0.4em] uppercase mb-4 opacity-60"
              >
                Workshop Serisi
              </motion.p>
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-6xl font-black tracking-tighter uppercase mb-2 leading-none"
              >
                {carouselSlides[activeSlide].title}
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl font-medium opacity-80"
              >
                {carouselSlides[activeSlide].subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 right-16 flex gap-3 z-10">
          {carouselSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1 transition-all duration-500 rounded-full ${
                idx === activeSlide ? 'w-12 bg-blue-500' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="border-b border-black dark:border-white/10 pb-4 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-black tracking-widest uppercase opacity-40">Tüm Workshoplar</span>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-30 text-black dark:text-white" />
          <input 
            type="text"
            placeholder="PROGRAM ARA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/10 rounded-full focus:outline-none focus:border-black dark:focus:border-white transition-all text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPrograms.map((prog) => (
            <Link key={prog.id} href={`/programlar/workshop/${prog.id}`} className="h-full p-4 -m-4">
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group p-[1.5px] rounded-[2.5rem] relative overflow-hidden flex flex-col h-full shadow-xl hover:shadow-blue-500/20 transition-all duration-500"
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-500/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative w-full h-full bg-[#fcfcfc] dark:bg-[#111111] rounded-[2.5rem] flex flex-col overflow-hidden">
                  {/* Image Section - Always rendered for consistency */}
                  <div className="h-52 overflow-hidden relative shrink-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                      style={{ backgroundImage: `url('${(prog as any).image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'}')` }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>

                  <div className="p-8 flex flex-col flex-grow relative z-10 min-h-[280px]">
                    {/* Glossy Overlay Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-50" />
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <span className="text-[10px] font-black opacity-30 tracking-widest uppercase">{prog.category} — {prog.lessons} DERS</span>
                      <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-colors duration-300 shrink-0">
                        <MoveRight className="w-4 h-4 group-hover:text-white dark:group-hover:text-black transition-colors" />
                      </div>
                    </div>
                    
                    <div className="mb-4 h-20 relative z-10">
                      <h3 className="text-lg md:text-xl font-black tracking-tighter uppercase leading-[1] line-clamp-3">
                        {prog.title}
                      </h3>
                    </div>

                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-6 relative z-10">{prog.instructor}</p>
                    
                    <div className="flex-grow">
                      <p className="text-[11px] md:text-xs font-medium opacity-60 leading-relaxed line-clamp-4 relative z-10">
                        {prog.desc}
                      </p>
                    </div>
                    
                    {/* Bottom spacer to prevent text from touching the edge */}
                    <div className="h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </div>

      {filteredPrograms.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-xl opacity-30 font-bold uppercase tracking-widest text-black dark:text-white">Aradığınız kriterlere uygun program bulunamadı.</p>
        </div>
      )}

      <Footer />
    </main>
  );
}

