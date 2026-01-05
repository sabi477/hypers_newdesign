'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Calendar,
  X,
  MapPin,
  Clock
} from 'lucide-react';

const initialWorkshops = [
  { id: 1, title: 'Sosyal Medya Stratejisi', date: '15 Ocak 2024', time: '14:00', location: 'Uniq İstanbul', status: 'Gelecek' },
  { id: 2, title: 'Video Prodüksiyon Kampı', date: '22 Ocak 2024', time: '10:00', location: 'Hibrit', status: 'Gelecek' },
  { id: 3, title: 'Kamera Önü Oyunculuk', date: '10 Aralık 2023', time: '11:00', location: 'Uniq İstanbul', status: 'Tamamlandı' },
];

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Workshop Yönetimi</h1>
          <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Kısa süreli eğitimleri ve kampları planlayın.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#CCFF00]/20"
        >
          <Plus className="w-4 h-4" />
          Yeni Workshop Planla
        </button>
      </div>

      {/* Workshop List */}
      <div className="grid grid-cols-1 gap-6">
        {workshops.map((workshop, i) => (
          <motion.div
            key={workshop.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 shadow-sm group hover:shadow-xl transition-all flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-black dark:bg-white flex flex-col items-center justify-center text-white dark:text-black">
                <span className="text-[10px] font-black uppercase">{workshop.date.split(' ')[1]}</span>
                <span className="text-2xl font-black">{workshop.date.split(' ')[0]}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tighter">{workshop.title}</h3>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 opacity-40">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{workshop.time}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-40">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{workshop.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${
                      workshop.status === 'Gelecek' ? 'bg-[#CCFF00]/10 text-[#CCFF00]' : 'bg-gray-100 dark:bg-white/10 opacity-40'
                    }`}>
                      {workshop.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all text-[10px] font-black uppercase tracking-widest">
                Düzenle
              </button>
              <button className="p-3.5 rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Placeholder */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-xl bg-white dark:bg-[#111111] rounded-[3rem] p-12 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black tracking-tighter uppercase">Yeni Workshop Planla</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-30 ml-2">Başlık</label>
                  <input type="text" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-30 ml-2">Tarih</label>
                    <input type="date" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-30 ml-2">Saat</label>
                    <input type="time" className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" />
                  </div>
                </div>
                <button type="submit" className="w-full py-5 rounded-2xl bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs mt-6 shadow-xl shadow-[#CCFF00]/20">Workshop Oluştur</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


