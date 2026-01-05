'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { getPrograms, type Program } from '@/lib/data-store';

const ProgramRow = ({ title, catCode, items }: { title: string, catCode: string, items: Program[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const colorMap: { [key: string]: { accent: string, glow: string, gradient: string } } = {
    'CREATOR': { 
      accent: 'bg-tomato-500', 
      glow: 'group-hover:shadow-[0_0_50px_-10px_rgba(255,85,0,0.3)]',
      gradient: 'from-tomato-500 via-tomato-300 to-transparent'
    },
    'MUSIC': { 
      accent: 'bg-cloudy-sky-500', 
      glow: 'group-hover:shadow-[0_0_50px_-10px_rgba(255,128,238,0.3)]',
      gradient: 'from-cloudy-sky-500 via-cloudy-sky-300 to-transparent'
    },
    'ACTING': { 
      accent: 'bg-slate-blue-500', 
      glow: 'group-hover:shadow-[0_0_50px_-10px_rgba(105,74,255,0.3)]',
      gradient: 'from-slate-blue-500 via-slate-blue-300 to-transparent'
    },
    'WORKSHOP': { 
      accent: 'bg-blue-500', 
      glow: 'group-hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)]',
      gradient: 'from-blue-500 via-blue-300 to-transparent'
    }
  };

  const colors = colorMap[catCode] || colorMap['CREATOR'];

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amt = dir === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: amt, behavior: 'smooth' });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="mb-12 last:mb-0 px-6 md:px-24 lg:px-40 text-black dark:text-white overflow-x-hidden">
      <div className="flex justify-between items-end mb-6 border-b border-black/5 dark:border-white/5 pb-2">
        <h3 className="text-lg font-black tracking-tighter uppercase">{title}</h3>
        <div className="flex gap-2 items-center">
          <Link 
            href={
              catCode === 'CREATOR' ? '/programlar/icerik-ureticiligi' :
              catCode === 'MUSIC' ? '/programlar/muzik' :
              catCode === 'ACTING' ? '/programlar/oyunculuk' :
              catCode === 'WORKSHOP' ? '/programlar/workshop' : '/'
            }
            className="group flex items-center gap-1 text-[8px] font-bold tracking-widest uppercase opacity-30 hover:opacity-100 transition-all mr-4"
          >
            TÜMÜNÜ GÖR <MoveRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex gap-1">
            <button onClick={() => scroll('left')} className="p-1.5 border border-black/10 dark:border-white/10 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => scroll('right')} className="p-1.5 border border-black/10 dark:border-white/10 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-12 pt-10 px-10 -mx-10 -mt-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`group flex-shrink-0 w-[240px] md:w-[320px] h-[380px] md:h-[440px] p-[1.5px] rounded-[2.5rem] md:rounded-[3rem] relative ${colors.glow} transition-all duration-500 gpu-accelerated shadow-xl overflow-hidden`}
          >
            {/* The Gradient Border Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col relative bg-[#fcfcfc] dark:bg-[#0a0a0a] backdrop-blur-2xl">
              {/* Glossy Overlay Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none opacity-50" />
              
              <div className="p-6 md:p-8 flex-grow relative z-10">
                <div className="flex gap-2 mb-4 md:mb-6">
                  {item.isFeatured && (
                    <span className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[7px] md:text-[8px] font-black tracking-widest ${item.category === 'WORKSHOP' ? 'bg-blue-500 text-white shadow-blue-500/20' : 'bg-[#CCFF00] text-black shadow-[#CCFF00]/20'} shadow-lg transition-all duration-500`}>
                      FEATURED
                    </span>
                  )}
                  {(item.tags || [item.category]).filter(tag => tag !== 'FEATURED').map(tag => (
                    <span key={tag} className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[7px] md:text-[8px] font-black tracking-widest ${colors.accent} text-white shadow-lg shadow-black/10 transition-all duration-500`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl md:text-3xl font-black tracking-tighter uppercase leading-[0.95] mb-2 md:mb-4 group-hover:tracking-tight transition-all duration-500 text-black dark:text-white">
                  {item.title.split(' ').length > 1 ? (
                    <>
                      {item.title.split(' ')[0]}<br />{item.title.split(' ').slice(1).join(' ')}
                    </>
                  ) : (
                    item.title
                  )}
                </h4>
                <p className="text-[10px] md:text-[11px] font-bold leading-relaxed opacity-40 group-hover:opacity-100 transition-opacity duration-500 text-black dark:text-white line-clamp-2 md:line-clamp-none">
                  {item.desc || 'Profesyonel eğitim içeriği ve sektörel pratikler.'}
                </p>
              </div>
              
              <div className="h-[160px] md:h-[210px] relative m-3 md:m-4 mt-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group/img border border-white/20 shadow-inner">
                <div 
                  className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 bg-cover bg-center" 
                  style={{ backgroundImage: `url('${item.image || '/images/%20-113.jpg'}')` }}
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                  <Link href={`/program/${item.id}`} className="w-full py-3 md:py-4 px-4 md:px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-between group/btn hover:bg-white transition-all shadow-2xl">
                    <span className="text-white group-hover/btn:text-black text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-colors">Programı İncele</span>
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center">
                      <MoveRight className="text-black w-3 h-3 md:w-4 md:h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function ProgramGrid() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    // Verileri yükle
    setPrograms(getPrograms());

    // Storage değişikliklerini dinle (Admin'den ekleme yapılınca güncellenmesi için)
    const handleStorage = () => setPrograms(getPrograms());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const creatorPrograms = programs.filter(p => p.category === 'CREATOR');
  const musicPrograms = programs.filter(p => p.category === 'MUSIC');
  const actingPrograms = programs.filter(p => p.category === 'ACTING');

  return (
    <section id="programs-section" className="py-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 overflow-hidden">
      <ProgramRow title="İÇERİK ÜRETİCİLİĞİ" catCode="CREATOR" items={creatorPrograms} />
      <ProgramRow title="MÜZİK" catCode="MUSIC" items={musicPrograms} />
      <ProgramRow title="OYUNCULUK" catCode="ACTING" items={actingPrograms} />
    </section>
  );
}
