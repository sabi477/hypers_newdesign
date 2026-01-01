'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PlayCircle, 
  ArrowUpRight, 
  ChevronRight, 
  Flame, 
  Award, 
  Clock,
  ExternalLink,
  BookOpen,
  Calendar,
  Zap,
  Layout
} from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/data-store';

export default function DashboardPage() {
  const [userName, setUserName] = useState('Öğrenci');
  const [ongoingPrograms, setOngoingPrograms] = useState<any[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUserName(user.firstName);
    }
    // Yeni kullanıcıda kurslar boş gelmeli
    setOngoingPrograms([]); 
  }, []);

  const upcomingEvents = [
    { id: 1, type: 'LIVE', title: 'Q&A: İçerik Stratejileri', time: 'Bugün, 20:00', date: '26 ARALIK' },
    { id: 2, type: 'WORKSHOP', title: 'Kamera Önü Performans', time: 'Cumartesi, 14:00', date: '28 ARALIK' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Hoş geldin, <span className="opacity-40">{userName}</span>
          </h1>
          <p className="text-sm text-black/50 dark:text-white/40 font-medium">
            Bugün öğrenmeye devam etmek için harika bir gün.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-4 py-2.5 rounded-2xl border border-black/5 dark:border-white/5">
            <Flame className="w-4 h-4 text-[#CCFF00]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">0 Gün</span>
          </div>
          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-4 py-2.5 rounded-2xl border border-black/5 dark:border-white/5">
            <Zap className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">0 XP</span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Learning Progress */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 opacity-20" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-30">Eğitimlerim</h3>
            </div>
            {ongoingPrograms.length > 0 && (
              <Link href="/dashboard/egitimlerim" className="text-[10px] font-bold opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1">
                TÜMÜ <ChevronRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          {ongoingPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ongoingPrograms.map((prog) => (
                <motion.div 
                  key={prog.id}
                  whileHover={{ y: -2 }}
                  className="group bg-white dark:bg-[#0c0c0c] p-8 rounded-[2rem] border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-20 px-2 py-1 rounded bg-black/5 dark:bg-white/5">
                        {prog.category}
                      </span>
                      <div className="text-right">
                        <p className="text-xl font-bold tracking-tight">%{prog.progress}</p>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold mb-1 group-hover:text-[#CCFF00] transition-colors">{prog.title}</h4>
                    <p className="text-[10px] font-medium opacity-40 uppercase tracking-widest mb-8">{prog.instructor}</p>

                    <div className="mt-auto space-y-6">
                      <div className="w-full h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${prog.progress}%` }}
                          className="h-full bg-black dark:bg-white"
                        />
                      </div>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">
                        DEVAM ET <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-16 rounded-[2rem] border-2 border-dashed border-black/5 dark:border-white/5 flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                <Layout className="w-6 h-6 opacity-20" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold opacity-40">Henüz bir eğitimin yok</h4>
                <p className="text-[10px] font-bold opacity-20 uppercase tracking-widest">Yeni dünyaları keşfetmeye başlamak için akademiye göz at.</p>
              </div>
              <Link 
                href="/programlar/icerik-ureticiligi"
                className="px-8 py-4 bg-[#CCFF00] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#CCFF00]/10"
              >
                Eğitimleri İncele
              </Link>
            </div>
          )}

          {/* Simple Discovery Banner */}
          <div className="p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold">Haftanın Yeni İçeriği</h3>
              <p className="text-sm opacity-40">AI ile İçerik Üretimi: Geleceği Şimdiden Yakala</p>
            </div>
            <Link href="/programlar/icerik-ureticiligi" className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
              İncele
            </Link>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-12">
          {/* Upcoming */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-20" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-30">Takvim</h3>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-4 items-start group">
                  <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center flex-shrink-0 border border-black/5 dark:border-white/5">
                    <span className="text-xs font-bold leading-none">{event.date.split(' ')[0]}</span>
                    <span className="text-[8px] font-bold opacity-30 uppercase">{event.date.split(' ')[1].substring(0, 3)}</span>
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-[11px] font-bold uppercase leading-tight group-hover:text-[#CCFF00] transition-colors">{event.title}</h5>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-medium opacity-30 uppercase tracking-widest">{event.time}</span>
                      <span className={`w-1 h-1 rounded-full ${event.type === 'LIVE' ? 'bg-red-500' : 'bg-[#CCFF00]'}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="p-8 rounded-[2rem] bg-[#CCFF00] text-black space-y-6">
            <div className="space-y-2">
              <h4 className="text-lg font-bold leading-tight">Yardım Merkezi</h4>
              <p className="text-[10px] font-medium opacity-60 leading-relaxed uppercase tracking-widest">Haftalık ilerlemeni planlamak için bir mentor ile görüş.</p>
            </div>
            <button className="w-full py-4 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
              Randevu Al <ExternalLink className="w-3 h-3" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}


