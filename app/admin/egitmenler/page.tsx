'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Filter,
  X,
  User,
  Star,
  Mail
} from 'lucide-react';
import Image from 'next/image';

const initialInstructors = [
  { id: 1, name: 'Tolga Akış', role: 'Kurucu & Eğitmen', academy: 'İÇERİK ÜRETİCİLİĞİ', rating: 4.9, email: 'tolga@hypers.co' },
  { id: 2, name: 'Ertan Güneş', role: 'Prodüktör', academy: 'MÜZİK', rating: 4.8, email: 'ertan@hypers.co' },
  { id: 3, name: 'Tulu Erden', role: 'Oyuncu', academy: 'OYUNCULUK', rating: 4.7, email: 'tulu@hypers.co' },
  { id: 4, name: 'Çiçek Çizmeci', role: 'Stratejist', academy: 'İÇERİK ÜRETİCİLİĞİ', rating: 4.9, email: 'cicek@hypers.co' },
  { id: 5, name: 'Merve Dizdar', role: 'Oyuncu', academy: 'OYUNCULUK', rating: 5.0, email: 'merve@hypers.co' },
];

export default function AdminInstructors() {
  const [instructors, setInstructors] = useState(initialInstructors);
  const [searchTerm, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Eğitmen Yönetimi</h1>
          <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Akademi eğitmen kadrosunu yönetin.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#CCFF00]/20"
        >
          <Plus className="w-4 h-4" />
          Yeni Eğitmen Ekle
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
          <input 
            type="text" 
            placeholder="EĞİTMEN ADI VEYA AKADEMİ ARA..."
            value={searchTerm}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-2xl pl-12 pr-4 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#CCFF00] transition-all outline-none"
          />
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {instructors.map((instructor, i) => (
          <motion.div
            key={instructor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-8 rounded-[3rem] bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 shadow-sm group hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-black/40 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight leading-none mb-1">{instructor.name}</h3>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{instructor.role}</p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button className="p-2 rounded-lg bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/5">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-30">Akademi</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{instructor.academy}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/5">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-30">Email</span>
                <span className="text-[10px] font-bold opacity-60 lowercase">{instructor.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/5">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-30">Puan</span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-[#CCFF00] text-[#CCFF00]" />
                  <span className="text-[10px] font-black">{instructor.rating}</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-8 py-4 rounded-2xl bg-black/5 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
              Profili Görüntüle
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal - Eğitmen Ekle */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-xl bg-white dark:bg-[#111111] rounded-[3rem] p-12 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black tracking-tighter uppercase">Eğitmen Ekle</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-30 ml-2">Ad Soyad</label>
                  <input type="text" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-30 ml-2">Rol / Uzmanlık</label>
                  <input type="text" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-30 ml-2">Akademi Birimi</label>
                  <select className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all appearance-none cursor-pointer">
                    <option>İÇERİK ÜRETİCİLİĞİ</option>
                    <option>MÜZİK</option>
                    <option>OYUNCULUK</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-5 rounded-2xl bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs mt-6">Eğitmeni Kaydet</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


