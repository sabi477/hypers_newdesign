'use client';

import { MessageSquare } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Topluluk</h1>
        <p className="text-sm opacity-40 font-medium">Diğer öğrencilerle tanış, tartış ve birlikte geliş.</p>
      </div>

      <div className="p-20 rounded-[3rem] border-2 border-dashed border-black/5 dark:border-white/5 flex flex-col items-center text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
          <MessageSquare className="w-8 h-8 opacity-20" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold opacity-40">Yakında Yayında</h2>
          <p className="text-xs font-bold opacity-20 uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">
            Hypers Academy topluluk platformu çok yakında tüm öğrencilerimizin erişimine açılacak.
          </p>
        </div>
        <div className="px-8 py-3 bg-black/5 dark:bg-white/5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] opacity-40">
          Hazırlanıyor
        </div>
      </div>
    </div>
  );
}



