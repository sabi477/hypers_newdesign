'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';

const registrations = [
  { id: 1, user: 'Murat Kaya', email: 'murat@example.com', program: 'YouTube Masterclass', date: '24 Aralık 2023', status: 'Ödendi', amount: '390₺' },
  { id: 2, user: 'Selin Yılmaz', email: 'selin@example.com', program: 'Music Production', date: '23 Aralık 2023', status: 'Beklemede', amount: '790₺' },
  { id: 3, user: 'Caner Aras', email: 'caner@example.com', program: 'Acting Basics', date: '22 Aralık 2023', status: 'Ödendi', amount: '390₺' },
  { id: 4, user: 'Dilara Sarı', email: 'dilara@example.com', program: 'TikTok Growth', date: '21 Aralık 2023', status: 'İptal', amount: '0₺' },
  { id: 5, user: 'Berkan Bilgiç', email: 'berkan@example.com', program: 'YouTube Masterclass', date: '20 Aralık 2023', status: 'Ödendi', amount: '1.590₺' },
];

export default function AdminUsers() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Üyeler & Kayıtlar</h1>
          <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Öğrenci kayıtlarını ve üye bilgilerini takip edin.</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-[2.5rem] bg-black text-white dark:bg-white dark:text-black shadow-xl">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Toplam Gelir</span>
          <p className="text-4xl font-black tracking-tighter mt-2">124.500₺</p>
        </div>
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Aktif Üye</span>
          <p className="text-4xl font-black tracking-tighter mt-2">842</p>
        </div>
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Bekleyen İşlem</span>
          <p className="text-4xl font-black tracking-tighter mt-2">14</p>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
            <input 
              type="text" 
              placeholder="ÜYE VEYA PROGRAM ARA..."
              className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest outline-none"
            />
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
            <Filter className="w-4 h-4" /> Filtrele
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-black/20">
              <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Üye Bilgisi</th>
              <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Program</th>
              <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Tarih</th>
              <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Tutar</th>
              <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Durum</th>
              <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {registrations.map((reg) => (
              <tr key={reg.id} className="group hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                <td className="px-10 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black uppercase tracking-tight">{reg.user}</span>
                    <span className="text-[10px] font-medium opacity-40 lowercase">{reg.email}</span>
                  </div>
                </td>
                <td className="px-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-60">{reg.program}</td>
                <td className="px-10 py-6 text-[10px] font-bold opacity-60 uppercase">{reg.date}</td>
                <td className="px-10 py-6 text-sm font-black">{reg.amount}</td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2">
                    {reg.status === 'Ödendi' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    ) : reg.status === 'Beklemede' ? (
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-red-500" />
                    )}
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
                      reg.status === 'Ödendi' ? 'text-green-500' : 
                      reg.status === 'Beklemede' ? 'text-orange-500' : 'text-red-500'
                    }`}>
                      {reg.status}
                    </span>
                  </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <button className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-black/5 dark:hover:bg-white/5">
                    <MoreVertical className="w-4 h-4 opacity-40" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



