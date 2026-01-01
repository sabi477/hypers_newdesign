'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  title: string;
  subItems: string[];
  isHovered: boolean;
  setIsHovered: (state: boolean) => void;
  activeCategory: string;
}

export default function HeroSection({ title, subItems, isHovered, setIsHovered, activeCategory }: HeroProps) {
  if (!activeCategory || !title) return null;

  // Kategori kodlarını aktif kategoriye göre eşleştiriyoruz
  const categoryMap: { [key: string]: string } = {
    'CREATOR ACADEMY': 'CREATOR',
    'MUSIC ACADEMY': 'MUSIC',
    'ACTING ACADEMY': 'ACTING',
    'WORKSHOP SERIES': 'WORKSHOP',
  };
  
  const categoryCode = categoryMap[activeCategory] || 'CREATOR';

  // Kategoriye göre "Hakkımızda" başlıkları
  const aboutTitles: { [key: string]: string } = {
    'CREATOR ACADEMY': 'Hypers Creator Academy Nedir?',
    'MUSIC ACADEMY': 'Hypers Music Academy Nedir?',
    'ACTING ACADEMY': 'Hypers Acting Academy Nedir?',
    'WORKSHOP SERIES': 'Hypers Workshop Nedir?',
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsHovered(false); // Menüyü kapat
    }
  };

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.section
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed top-20 left-0 w-full h-auto bg-white dark:bg-[#0a0a0a] z-[90] flex flex-col px-12 md:px-24 lg:px-40 pt-12 pb-16 shadow-2xl transition-colors duration-300 border-b border-black/5 dark:border-white/5"
        >
          <div className="max-w-[1800px] mx-auto w-full flex flex-col h-full text-black dark:text-white">
            <div className="mb-10">
              <h1 className="text-[80px] md:text-[110px] font-bold leading-[0.85] tracking-tighter lowercase">
                <span className="block">hypers</span>
                <span className="block italic">{title}</span>
              </h1>
            </div>

            <div className="w-full h-[1.5px] bg-black dark:bg-white mb-10" />

            {activeCategory === 'WORKSHOP SERIES' ? (
              <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-20">
                <div className="text-[14px] font-medium space-y-1 opacity-60">
                  <p>Yoğun ve pratik odaklı eğitim programları</p>
                  <p>Haftalık kamplar ve özel atölyeler</p>
                </div>

                <Link href="/programlar/workshop" className="w-full md:w-[500px]">
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group flex items-center justify-between py-4 border-b border-black dark:border-white/10 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all px-2"
                  >
                    <div className="flex items-center gap-6">
                      <MoveRight className="w-6 h-6 stroke-black dark:stroke-white opacity-100 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={1.5} />
                      <span className="text-2xl font-medium tracking-tight">Workshop Programlarını İncele</span>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-20">
                <div className="text-[14px] font-medium space-y-1 opacity-60">
                  <p>Kategoriler: Tüm Programlar</p>
                  <p>Sıralama: Popüler</p>
                </div>

                <div className="flex flex-col w-full md:w-[500px]">
                  {subItems.map((item, index) => (
                    item === 'Hakkımızda' ? (
                      <Link
                        key={item}
                        href={`/hakkimizda?kategori=${categoryCode}`}
                        className="w-full"
                      >
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.01, duration: 0.2, ease: "easeOut" }}
                          className="group flex items-center justify-between py-4 border-b border-black dark:border-white/10 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all px-2"
                        >
                          <div className="flex items-center gap-6">
                            <MoveRight className="w-6 h-6 stroke-black dark:stroke-white opacity-100 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={1.5} />
                            <span className="text-2xl font-medium tracking-tight">{aboutTitles[activeCategory] || 'Hakkımızda'}</span>
                          </div>
                        </motion.div>
                      </Link>
                    ) : (
                      <Link 
                        key={item}
                        href={
                          item === 'Eğitmenler' ? `/egitmenler?academy=${categoryCode}` : 
                          item === 'Fiyatlandırma' ? `/fiyatlandirma?academy=${categoryCode}` : 
                          item === 'Programlar' ? (
                            categoryCode === 'CREATOR' ? '/programlar/icerik-ureticiligi' :
                            categoryCode === 'MUSIC' ? '/programlar/muzik' :
                            categoryCode === 'ACTING' ? '/programlar/oyunculuk' :
                            categoryCode === 'WORKSHOP' ? '/programlar/workshop' : '/programlar'
                          ) :
                          item === 'Destek' ? '/destek' : '#'
                        }
                        className="w-full"
                      >
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.01, duration: 0.2, ease: "easeOut" }}
                          className="group flex items-center justify-between py-4 border-b border-black dark:border-white/10 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all px-2"
                        >
                          <div className="flex items-center gap-6">
                            <MoveRight className="w-6 h-6 stroke-black dark:stroke-white opacity-100 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={1.5} />
                            <span className="text-2xl font-medium tracking-tight">{item}</span>
                          </div>
                        </motion.div>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
