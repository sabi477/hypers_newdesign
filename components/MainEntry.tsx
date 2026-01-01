'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'CREATOR', color: 'text-tomato-500' },
  { name: 'MUSIC', color: 'text-cloudy-sky-500' },
  { name: 'ACTING', color: 'text-slate-blue-500' }
];

export default function MainEntry() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % categories.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="h-screen w-full relative overflow-hidden bg-white dark:bg-[#0a0a0a] text-black dark:text-white flex flex-col items-center justify-center transition-colors duration-300">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/images/videokapak.png"
          className="w-full h-full object-cover"
        >
          <source src="/images/Untitled design-5.mp4" type="video/mp4" />
        </video>
        {/* Dark Filter Overlay */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </div>

      {/* Background Subtle Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] dark:opacity-[0.1] select-none pointer-events-none overflow-hidden z-1 px-4">
        <span className="text-[25vw] font-black uppercase tracking-tighter leading-none text-white text-center">HYPERS</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-24 flex flex-col items-center text-center text-white">
        {/* Badge Style Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="flex items-center gap-1.5 opacity-60">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white">Always Further</span>
          </div>
        </motion.div>

        {/* Dynamic Title Section - Ortalı Düzen */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[100px] font-black tracking-tighter uppercase leading-[0.85] text-white"
          >
            HYPERS <br />
            <div className="relative inline-block h-[1.1em] overflow-hidden align-top px-4 -mx-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={categories[index].name}
                  initial={{ y: "100%", opacity: 0, skewY: 10 }}
                  animate={{ y: "0%", opacity: 1, skewY: 0 }}
                  exit={{ y: "-100%", opacity: 0, skewY: -10 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`${categories[index].color} italic block pb-2`}
                >
                  {categories[index].name}
                </motion.span>
              </AnimatePresence>
            </div>
            <br />
            ACADEMY&apos;E HOŞGELDİN
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase mt-12 text-white"
          >
            Yeni Nesil Sanat & Medya Akademisi
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 group cursor-pointer"
      >
        <span className="text-[8px] font-black tracking-[0.4em] uppercase opacity-20 group-hover:opacity-60 transition-opacity text-black dark:text-white">Explore</span>
      </motion.button>

      {/* Bottom White Gradient Transition - Even more subtle and shorter */}
      <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-white via-white/40 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/40 dark:to-transparent z-10 pointer-events-none" />
    </section>
  );
}
