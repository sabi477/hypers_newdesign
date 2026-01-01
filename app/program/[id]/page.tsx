'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Clock, Users, BookOpen, Check, MoveRight } from 'lucide-react';
import { getPrograms, type Program as ProgramType } from '@/lib/data-store';

// Tip tanımlaması
interface ExtendedProgram extends ProgramType {
  instructorRole?: string;
  duration?: string;
  level?: string;
  curriculum?: string[];
  requirements?: string[];
  outcomes?: string[];
}

export default function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState<ExtendedProgram | null>(null);

  useEffect(() => {
    const allPrograms = getPrograms();
    // ID hem string hem number gelebilir
    const found = allPrograms.find(p => p?.id?.toString() === id?.toString());
    
    if (found) {
      setProgram({
        ...found,
        instructorRole: 'EĞİTMEN',
        duration: '8 Hafta',
        level: 'Orta Seviye',
        curriculum: [
          'Temel Kavramlar ve Stratejiler',
          'Platform Algoritmaları ve Analiz',
          'İçerik Üretimi ve Prodüksiyon',
          'Topluluk Yönetimi ve Etkileşim',
          'Gelir Modelleri ve İş Birlikleri',
          'Final Projesi ve Sunum'
        ],
        requirements: [
          'Temel seviyede teknoloji kullanımı',
          'Haftalık 4 saat katılım',
          'Öğrenme ve uygulama isteği'
        ],
        outcomes: [
          'Sektörel yetkinlik kazanımı',
          'Kendi projeni başlatma imkanı',
          'Hypers topluluğuna erişim',
          'Profesyonel sertifika'
        ]
      });
    }
  }, [id]);

  const categoryNames: { [key: string]: string } = {
    'CREATOR': 'İçerik Üreticiliği',
    'MUSIC': 'Müzik',
    'ACTING': 'Oyunculuk',
    'WORKSHOP': 'Workshop'
  };

  const categoryColors: { [key: string]: string } = {
    'CREATOR': 'bg-tomato-500 text-white',
    'MUSIC': 'bg-cloudy-sky-500 text-white',
    'ACTING': 'bg-slate-blue-500 text-white',
    'WORKSHOP': 'bg-bright-gold-500 text-black'
  };

  const accentColors: { [key: string]: string } = {
    'CREATOR': 'text-tomato-500',
    'MUSIC': 'text-cloudy-sky-500',
    'ACTING': 'text-slate-blue-500',
    'WORKSHOP': 'text-bright-gold-500'
  };

  const borderColors: { [key: string]: string } = {
    'CREATOR': 'border-tomato-500/20',
    'MUSIC': 'border-cloudy-sky-500/20',
    'ACTING': 'border-slate-blue-500/20',
    'WORKSHOP': 'border-bright-gold-500/20'
  };

  const bgColors: { [key: string]: string } = {
    'CREATOR': 'bg-tomato-500/10',
    'MUSIC': 'bg-cloudy-sky-500/10',
    'ACTING': 'bg-slate-blue-500/10',
    'WORKSHOP': 'bg-bright-gold-500/10'
  };

  if (!program) return null;

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-black dark:text-white pt-32 px-12 md:px-24 lg:px-40 pb-20 transition-colors duration-300">
      <Navigation />

      {/* Geri Dön Butonu */}
      <Link 
        href={
          program.category === 'CREATOR' ? '/programlar/icerik-ureticiligi' :
          program.category === 'MUSIC' ? '/programlar/muzik' :
          program.category === 'ACTING' ? '/programlar/oyunculuk' :
          program.category === 'WORKSHOP' ? '/programlar/workshop' : '/'
        } 
        className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-all mb-16 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Programlara Dön</span>
      </Link>

      {/* Hero Section */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className={`px-4 py-2 rounded-full text-[9px] font-black tracking-widest uppercase ${categoryColors[program.category] || 'bg-black text-white'}`}>
            {program.category}
          </span>
          <span className="text-sm opacity-40 font-bold uppercase tracking-widest">{categoryNames[program.category] || program.category}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
          {program.title}
        </h1>
        <p className="text-xl md:text-2xl font-medium opacity-60 mb-12 max-w-3xl">
          {program.desc || 'Profesyonel seviyeye ulaşmanız için gerekli tüm bilgileri kapsayan kapsamlı bir eğitim programı.'}
        </p>

        {/* Program Bilgileri ... (no change here) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5">
            <Clock className="w-5 h-5 opacity-40" />
            <div>
              <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-1">Süre</p>
              <p className="text-sm font-black tracking-tight">{program.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5">
            <BookOpen className="w-5 h-5 opacity-40" />
            <div>
              <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-1">Ders</p>
              <p className="text-sm font-black tracking-tight">{program.lessons} Ders</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5">
            <Users className="w-5 h-5 opacity-40" />
            <div>
              <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-1">Seviye</p>
              <p className="text-sm font-black tracking-tight">{program.level}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5">
            <div className="w-5 h-5 opacity-40 flex items-center justify-center">
              <span className="text-xs font-black">👤</span>
            </div>
            <div>
              <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-1">Eğitmen</p>
              <p className="text-sm font-black tracking-tight">{program.instructor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik Bölümü */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        {/* Sol: Kurs İçeriği */}
        <div className="lg:col-span-2 space-y-12">
          {/* Kurs İçeriği */}
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-8">Kurs İçeriği</h2>
            <div className="space-y-4">
              {program.curriculum?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-6 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${categoryColors[program.category] || 'bg-black text-white'}`}>
                    <span className="text-xs font-black">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black tracking-tight mb-2">{item}</h3>
                    <p className="text-sm opacity-50">Detaylı anlatım ve pratik uygulamalar</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gereksinimler */}
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-8">Gereksinimler</h2>
            <div className="space-y-3">
              {program.requirements?.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-4 bg-white dark:bg-[#111111] rounded-xl border border-black/5 dark:border-white/5"
                >
                  <Check className={`w-5 h-5 flex-shrink-0 ${accentColors[program.category] || 'text-neon-lime'}`} />
                  <span className="text-sm font-medium opacity-70">{req}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Kazanımlar */}
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-8">Kazanımlar</h2>
            <div className="space-y-3">
              {program.outcomes?.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${bgColors[program.category] || 'bg-neon-lime/10'} ${borderColors[program.category] || 'border-neon-lime/20'}`}
                >
                  <MoveRight className={`w-5 h-5 flex-shrink-0 ${accentColors[program.category] || 'text-neon-lime'}`} />
                  <span className="text-sm font-bold opacity-80">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ: Eğitmen ve CTA */}
        <div className="space-y-8">
          {/* Eğitmen Kartı */}
          <div className="p-8 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5">
            <h3 className="text-xl font-black tracking-tighter uppercase mb-6">Eğitmen</h3>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-[#1a1a1a] mb-4 overflow-hidden">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center grayscale" />
              </div>
              <h4 className="text-xl font-black tracking-tight mb-2">{program.instructor}</h4>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-6">{program.instructorRole}</p>
              <Link
                href={`/egitmenler/1`}
                className={`group flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity`}
              >
                Profili Görüntüle
                <MoveRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform`} />
              </Link>
            </div>
          </div>

          {/* CTA Butonu */}
          <Link
            href="/register"
            className={`group w-full flex flex-col items-center justify-center gap-2 px-8 py-6 rounded-[2rem] font-black tracking-[0.2em] uppercase text-sm hover:scale-[1.02] transition-all shadow-2xl relative overflow-hidden ${
                         program.category === 'WORKSHOP' ? 'bg-bright-gold-500 text-black shadow-bright-gold-500/30' : 
                         program.category === 'CREATOR' ? 'bg-tomato-500 text-white shadow-tomato-500/30' :
                         program.category === 'MUSIC' ? 'bg-cloudy-sky-500 text-white shadow-cloudy-sky-500/30' :
                         program.category === 'ACTING' ? 'bg-slate-blue-500 text-white shadow-slate-blue-500/30' :
                         'bg-[#CCFF00] text-black shadow-[#CCFF00]/30'}`}
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="flex items-center gap-3 relative z-10">
              Hemen Kayıt Ol
              <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </div>
            <span className="text-[9px] opacity-50 font-bold tracking-widest relative z-10">Sınırlı Kontenjan</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

