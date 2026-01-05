'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MoveRight, Home } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-black dark:text-white flex flex-col pt-32 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#CCFF00]/10 dark:bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <Navigation />
      
      <div className="flex-grow flex flex-col items-center justify-center px-6 relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-[120px] md:text-[180px] font-black tracking-tighter leading-none mb-4 opacity-5">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
              SAYFA <br /> BULUNAMADI.
            </h2>
            <p className="text-sm md:text-lg font-medium opacity-50 mb-12 max-w-md mx-auto">
              Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/"
                className="group bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full font-black tracking-widest uppercase text-[10px] flex items-center gap-4 hover:scale-105 transition-all shadow-2xl"
              >
                <Home className="w-4 h-4" />
                Anasayfaya Dön
              </Link>
              <Link 
                href="/programlar/icerik-ureticiligi"
                className="group border border-black/10 dark:border-white/10 px-10 py-5 rounded-full font-black tracking-widest uppercase text-[10px] flex items-center gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                Programları Keşfet
                <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}



