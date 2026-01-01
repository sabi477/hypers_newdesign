'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Search, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const academyConfig: { [key: string]: { name: string, color: string, badgeColor: string, description: string } } = {
  'CREATOR': {
    name: 'Creator Academy',
    color: 'bg-tomato-500',
    badgeColor: 'text-tomato-500',
    description: 'Dijital dünyanın en vizyoner içerik üreticilerinden birebir öğrenin.'
  },
  'MUSIC': {
    name: 'Music Academy',
    color: 'bg-cloudy-sky-500',
    badgeColor: 'text-cloudy-sky-500',
    description: 'Müzik endüstrisinin dev isimleriyle prodüksiyon ve kariyer yolculuğuna başlayın.'
  },
  'ACTING': {
    name: 'Acting Academy',
    color: 'bg-slate-blue-500',
    badgeColor: 'text-slate-blue-500',
    description: 'Sahne ve kamera önü sanatlarında Türkiye\'nin en başarılı isimlerinden mentorluk alın.'
  },
  'WORKSHOP': {
    name: 'Workshop',
    color: 'bg-blue-500',
    badgeColor: 'text-blue-500',
    description: 'Yoğun kamp programlarında uzman mentorlarla pratik odaklı yeteneklerinizi geliştirin.'
  }
};

const instructors = [
  { id: 1, name: 'Tolga Akış', category: 'CREATOR', role: 'KURUCU & EĞİTMEN' },
  { id: 2, name: 'Çiçek Çizmeci', category: 'CREATOR', role: 'TEKNOLOJİ YAZARI' },
  { id: 3, name: 'Ertan Güneş', category: 'MUSIC', role: 'PRODÜKTÖR' },
  { id: 4, name: 'Pınar Musaoğlu', category: 'WORKSHOP', role: 'YAŞAM KOÇU' },
  { id: 5, name: 'Tulu Erden', category: 'ACTING', role: 'OYUNCU' },
  { id: 6, name: 'Berkan Bilgiç', category: 'CREATOR', role: 'SEYAHAT YAZARI' },
  ...Array.from({ length: 14 }, (_, i) => ({
    id: i + 7,
    name: `Eğitmen ${i + 7}`,
    category: ['CREATOR', 'MUSIC', 'ACTING', 'WORKSHOP'][Math.floor(Math.random() * 4)],
    role: 'EĞİTMEN'
  }))
];

function InstructorsContent() {
  const searchParams = useSearchParams();
  const academy = searchParams.get('academy') || 'CREATOR';
  const config = academyConfig[academy] || academyConfig['CREATOR'];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInstructors = useMemo(() => {
    return instructors.filter(inst => {
      const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = inst.category === academy;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, academy]);

  return (
    <div className="max-w-[1800px] mx-auto relative">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
        <ChevronRight className="w-3 h-3 text-black dark:text-white" />
        <span className="text-black dark:text-white">{config.name}</span>
        <ChevronRight className="w-3 h-3 text-black dark:text-white" />
        <span className="text-black dark:text-white">Eğitmenler</span>
      </div>

      {/* Sayfa Başlığı - Daha Zarif ve Minimal Tasarım */}
      <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-black dark:text-white leading-tight">
            HYPERS <span className="opacity-20 italic">Instructors</span>
          </h1>
          <p className="text-sm font-bold opacity-30 uppercase tracking-[0.3em] mt-6">{config.description}</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 text-black dark:text-white" />
          <input 
            type="text"
            placeholder="EĞİTMEN ARA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-black/5 dark:bg-white/5 border-none rounded-2xl text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-white/20 transition-all text-black dark:text-white placeholder:opacity-30"
          />
        </div>
      </div>

      {/* Eğitmen Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredInstructors.map((instructor) => (
            <motion.div 
              key={instructor.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <Link href={`/egitmenler/${instructor.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-gray-100 dark:bg-[#111111] relative overflow-hidden rounded-[2.5rem] mb-6 border border-black/5 dark:border-white/5 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                    <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100 bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="px-2">
                    <h3 className="text-xl font-black tracking-tighter uppercase leading-tight text-black dark:text-white">
                      {instructor.name}
                    </h3>
                    <p className={`text-[9px] font-black tracking-[0.2em] uppercase mt-1 leading-none ${config.badgeColor}`}>
                      {instructor.role}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredInstructors.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-xl opacity-30 font-bold uppercase tracking-widest text-black dark:text-white">Aradığınız kriterlere uygun eğitmen bulunamadı.</p>
        </div>
      )}
    </div>
  );
}

export default function InstructorsPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] pt-32 px-6 md:px-24 lg:px-40 pb-32 transition-colors duration-300 relative overflow-x-hidden">
      <Navigation />
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <InstructorsContent />
      </Suspense>
      <Footer />
    </main>
  );
}
