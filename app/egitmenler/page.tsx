'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Search, ChevronRight } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

const academyConfig: { [key: string]: { name: string, color: string, badgeColor: string, description: string, subCategories: string[] } } = {
  'CREATOR': {
    name: 'Creator Academy',
    color: 'bg-[#ff5500]',
    badgeColor: 'text-[#ff5500]',
    description: 'Dijital dünyanın en vizyoner içerik üreticilerinden birebir öğrenin.',
    subCategories: ['TÜMÜ', 'Yeni Medya Mecraları', 'İçerik Üreticiliği', 'Influencer Hikayeleri']
  },
  'MUSIC': {
    name: 'Music Academy',
    color: 'bg-[#ff80ee]',
    badgeColor: 'text-[#ff80ee]',
    description: 'Müzik endüstrisinin dev isimleriyle prodüksiyon ve kariyer yolculuğuna başlayın.',
    subCategories: ['TÜMÜ', 'Temel Müzik Eğitimleri', 'Müzik Endüstrisi Eğitimleri', 'Müzik İçerik Üretimi Eğitimleri']
  },
  'ACTING': {
    name: 'Acting Academy',
    color: 'bg-[#694aff]',
    badgeColor: 'text-[#694aff]',
    description: 'Sahne ve kamera önü sanatlarında Türkiye\'nin en başarılı isimlerinden mentorluk alın.',
    subCategories: ['TÜMÜ', 'Oyuncunun Dünyası - Temel Kavramlar', 'Oyunculuk Teknikleri', 'Başarı Hikayeleri']
  }
};

const instructors = [
  { id: 1, name: 'Tolga Akış', category: 'CREATOR', role: 'KURUCU & EĞİTMEN' },
  { id: 2, name: 'Çiçek Çizmeci', category: 'CREATOR', role: 'TEKNOLOJİ YAZARI' },
  { id: 3, name: 'Ertan Güneş', category: 'MUSIC', role: 'PRODÜKTÖR' },
  { id: 4, name: 'Pınar Musaoğlu', category: 'CREATOR', role: 'YAŞAM KOÇU' },
  { id: 5, name: 'Tulu Erden', category: 'ACTING', role: 'OYUNCU' },
  { id: 6, name: 'Berkan Bilgiç', category: 'CREATOR', role: 'SEYAHAT YAZARI' },
  { id: 7, name: 'Caner Aras', category: 'CREATOR', role: 'TEKNİK EĞİTMEN' },
  { id: 8, name: 'Merve Dizdar', category: 'ACTING', role: 'BAŞARI HİKAYESİ' },
  { id: 9, name: 'Selin Yılmaz', category: 'CREATOR', role: 'DİJİTAL STRATEJİST' },
  { id: 10, name: 'Murat Demir', category: 'CREATOR', role: 'PERFORMANS ANALİSTİ' },
  { id: 11, name: 'Gaye Su Akyol', category: 'MUSIC', role: 'VOKAL TEKNİKLERİ' },
  { id: 12, name: 'Ahmet Faik Dökmeci', category: 'MUSIC', role: 'PRODÜKTÖR' },
  { id: 13, name: 'Haluk Bilginer', category: 'ACTING', role: 'TİYATRO TARİHİ' },
  { id: 14, name: 'Sungun Babacan', category: 'ACTING', role: 'DUBLAJ SANATÇISI' },
  { id: 15, name: 'Nilay Örnek', category: 'CREATOR', role: 'PODCAST YAZARI' },
  { id: 16, name: 'Mustafa Seven', category: 'CREATOR', role: 'FOTOĞRAF YAZARI' },
];

function InstructorsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const academy = searchParams.get('academy') || 'CREATOR';
  const config = academyConfig[academy] || academyConfig['CREATOR'];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(config.subCategories[0]);

  // Akademi değiştiğinde aktif tab'ı sıfırla
  useEffect(() => {
    setActiveTab(config.subCategories[0]);
  }, [academy, config.subCategories]);

  const filteredInstructors = useMemo(() => {
    return instructors.filter(inst => {
      const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = inst.category === academy;
      
      // Eğitmenleri sub-kategorilere (tablara) eşleme mantığı
      if (activeTab === 'TÜMÜ') return matchesSearch && matchesCategory;

      let instSubCat = '';
      if (academy === 'CREATOR') {
        if (inst.role?.includes('YAZAR') || inst.role?.includes('SEYAHAT') || inst.role?.includes('PODCAST')) instSubCat = 'Yeni Medya Mecraları';
        else if (inst.role?.includes('KURUCU') || inst.role?.includes('İÇERİK')) instSubCat = 'İçerik Üreticiliği';
        else instSubCat = 'Influencer Hikayeleri';
      } else if (academy === 'MUSIC') {
        if (inst.role?.includes('PRODÜKTÖR') || inst.role?.includes('ARANJÖR')) instSubCat = 'Müzik İçerik Üretimi Eğitimleri';
        else if (inst.role?.includes('TEORİ') || inst.role?.includes('VOKAL')) instSubCat = 'Temel Müzik Eğitimleri';
        else instSubCat = 'Müzik Endüstrisi Eğitimleri';
      } else if (academy === 'ACTING') {
        if (inst.role?.includes('OYUNCU') || inst.role?.includes('DUBLAJ')) instSubCat = 'Oyunculuk Teknikleri';
        else if (inst.role?.includes('TARİHİ') || inst.role?.includes('KAVRAM')) instSubCat = 'Oyuncunun Dünyası - Temel Kavramlar';
        else instSubCat = 'Başarı Hikayeleri';
      }

      const matchesTab = instSubCat === activeTab;
      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [searchQuery, academy, activeTab]);

  return (
    <div className="max-w-[1800px] mx-auto relative">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 md:mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
        <ChevronRight className="w-3 h-3 text-black dark:text-white" />
        <span className="text-black dark:text-white">{config.name}</span>
        <ChevronRight className="w-3 h-3 text-black dark:text-white" />
        <span className="text-black dark:text-white">Eğitmenler</span>
      </div>

      {/* Sayfa Başlığı */}
      <div className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-end gap-8 md:gap-12 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 text-black dark:text-white leading-tight">
            HYPERS <span className="opacity-20 italic">Instructors</span>
          </h1>
          <p className="text-[9px] md:text-[11px] font-bold opacity-30 uppercase tracking-[0.2em] md:tracking-[0.3em] mt-4 md:mt-6">{config.description}</p>
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

      {/* Akademi Seçici */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-4 mb-12 -mx-6 px-6 md:mx-0 md:px-0">
        {Object.entries(academyConfig).map(([key, value]) => (
          <button
            key={key}
            onClick={() => router.push(`/egitmenler?academy=${key}`)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${
              academy === key 
                ? `${value.color} text-white shadow-xl` 
                : 'bg-black/5 dark:bg-white/5 opacity-40 hover:opacity-100'
            }`}
          >
            {value.name}
          </button>
        ))}
      </div>

      {/* Konu Bazlı Tab Sistemi */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 border-b border-black/5 dark:border-white/5">
        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 w-screen md:w-auto">
          {config.subCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-[11px] font-black tracking-widest transition-all relative pb-4 whitespace-nowrap uppercase ${
                activeTab === cat 
                  ? 'text-black dark:text-white' 
                  : 'text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat}
              {activeTab === cat && (
                <motion.div 
                  layoutId="activeInstTab"
                  className={`absolute bottom-0 left-0 w-full h-[2px] ${config.color}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Eğitmen Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 md:gap-y-16 relative z-10">
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

                  <div className="px-2 pb-2 border-b border-black/5 dark:border-white/5">
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
