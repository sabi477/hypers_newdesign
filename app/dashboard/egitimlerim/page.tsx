'use client';

import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function MyProgramsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Eğitimlerim</h1>
        <p className="text-sm opacity-40 font-medium">Satın aldığın tüm eğitimlere buradan ulaşabilirsin.</p>
      </div>

      <div className="p-20 rounded-[3rem] border-2 border-dashed border-black/5 dark:border-white/5 flex flex-col items-center text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
          <BookOpen className="w-8 h-8 opacity-20" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold opacity-40">Henüz bir eğitimin yok</h2>
          <p className="text-xs font-bold opacity-20 uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">
            Yeni nesil sanat ve medya dünyasına ilk adımını atmak için akademi programlarımıza göz atabilirsin.
          </p>
        </div>
        <Link 
          href="/programlar/icerik-ureticiligi"
          className="px-10 py-5 bg-[#CCFF00] text-black rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-[#CCFF00]/20"
        >
          Programları Keşfet
        </Link>
      </div>
    </div>
  );
}


