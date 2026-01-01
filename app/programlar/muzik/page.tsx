'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Search, ChevronRight, MoveRight } from 'lucide-react';
import { getPrograms, type Program } from '@/lib/data-store';

export default function MusicProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Temel Müzik Eğitimleri');

  const categories = [
    'Temel Müzik Eğitimleri',
    'Müzik Endüstrisi Eğitimleri',
    'Müzik İçerik Üretimi Eğitimleri'
  ];

  useEffect(() => {
    const musicProgs = getPrograms().filter(p => p.category === 'MUSIC').map(p => {
      let subCat = 'Müzik Endüstrisi Eğitimleri';
      
      if (p.title.includes('Basics') || p.title.includes('Vokal') || p.title.includes('Teori')) {
        subCat = 'Temel Müzik Eğitimleri';
      } else if (p.title.includes('Production') || p.title.includes('Mixing') || p.title.includes('Ableton')) {
        subCat = 'Müzik İçerik Üretimi Eğitimleri';
      } else {
        subCat = 'Müzik Endüstrisi Eğitimleri';
      }
      
      return { ...p, subCategory: subCat };
    });
    setPrograms(musicProgs);
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter(prog => {
      const matchesSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = (prog as any).subCategory === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, programs, activeTab]);

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] pt-32 px-6 md:px-24 lg:px-40 pb-20 transition-colors duration-300 relative overflow-x-hidden">
      {/* Background Light Blurs */}
      <div className="absolute top-[-10%] -left-[10%] w-[50%] h-[50%] bg-cloudy-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] -right-[10%] w-[40%] h-[40%] bg-cloudy-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

      <Navigation />
      
      <div className="flex items-center gap-2 mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase text-black dark:text-white">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black dark:text-white">Music Academy</span>
      </div>

      <div className="mb-20 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-black dark:text-white leading-tight">
          MUSIC <span className="opacity-20 italic">Academy</span>
        </h1>
        <p className="text-sm font-bold opacity-30 uppercase tracking-[0.3em] mb-8">Müzik endüstrisinde uzmanlaş ve prodüksiyon dünyasına adım at.</p>
      </div>

      {/* Kategori Tab Sistemi */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 border-b border-black/5 dark:border-white/5">
        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-sm font-bold tracking-tight transition-all relative pb-4 whitespace-nowrap ${
                activeTab === cat 
                  ? 'text-black dark:text-white' 
                  : 'text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat}
              {activeTab === cat && (
                <motion.div 
                  layoutId="activeTabMusic"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-cloudy-sky-500"
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64 mb-4 md:mb-0">
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
            <Link key={prog.id} href={`/program/${prog.id}`} className="h-full p-4 -m-4">
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group p-[1.5px] rounded-[3rem] relative overflow-hidden flex flex-col h-full shadow-xl hover:shadow-cloudy-sky-500/20 transition-all duration-500"
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-cloudy-sky-500 via-cloudy-sky-300 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative w-full h-full bg-[#fcfcfc] dark:bg-[#0a0a0a] rounded-[3rem] flex flex-col overflow-hidden">
                  {/* Image Section */}
                  <div className="h-48 overflow-hidden relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                      style={{ backgroundImage: `url('${prog.image || '/images/foto criativa marketing.jpg'}')` }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>

                  <div className="p-8 flex flex-col flex-grow relative z-10">
                    {/* Glossy Overlay Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none opacity-50" />
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <span className="text-[10px] font-black tracking-widest uppercase text-cloudy-sky-500 bg-cloudy-sky-500/10 px-3 py-1 rounded-full">{prog.category} — {prog.lessons} DERS</span>
                      <div className="w-10 h-10 rounded-full border border-cloudy-sky-500/20 flex items-center justify-center group-hover:bg-cloudy-sky-500 group-hover:border-cloudy-sky-500 transition-all duration-500 shadow-lg">
                        <MoveRight className="w-4 h-4 text-cloudy-sky-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <div className="flex-grow relative z-10">
                      <h3 className="text-2xl font-black tracking-tighter uppercase mb-2 leading-[0.95] group-hover:tracking-tight transition-all duration-500">{prog.title}</h3>
                      <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-6">{prog.instructor}</p>
                      <p className="text-sm font-medium opacity-60 leading-relaxed line-clamp-3 mb-6">{prog.desc || 'Profesyonel eğitim içeriği ve sektörel pratikler.'}</p>
                    </div>
                    
                    {/* Bottom Decorative Element */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cloudy-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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

