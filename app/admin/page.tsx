'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Toplam Öğrenci', value: '1,284', icon: Users, change: '+12%', color: 'text-blue-500' },
  { label: 'Aktif Programlar', value: '42', icon: BookOpen, change: '+2', color: 'text-[#CCFF00]' },
  { label: 'Bu Ayki Kayıt', value: '156', icon: TrendingUp, change: '+24%', color: 'text-green-500' },
  { label: 'Bekleyen Workshop', value: '8', icon: Calendar, change: '0', color: 'text-orange-500' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Dashboard</h1>
          <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Akademideki son duruma göz atın.</p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/admin/programlar"
            className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-all shadow-xl shadow-black/10 dark:shadow-white/10"
          >
            <Plus className="w-4 h-4" />
            Yeni Program
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl bg-black/5 dark:bg-white/5 transition-colors group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full bg-green-500/10 text-green-500`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
        {/* Recent Registrations */}
        <div className="p-10 rounded-[3rem] bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black tracking-tighter uppercase">Son Kayıtlar</h2>
            <Link href="/admin/uyeler" className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Tümünü Gör</Link>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 last:border-0 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-black/40 flex items-center justify-center font-black text-xs">
                    MK
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-tight">Murat Kaya</h4>
                    <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest text-black dark:text-white">YouTube Masterclass — 2 saat önce</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </div>
            ))}
          </div>
        </div>

        {/* System Health / Status */}
        <div className="space-y-8">
          <div className="p-10 rounded-[3rem] bg-black text-white dark:bg-white dark:text-black shadow-2xl">
            <h2 className="text-xl font-black tracking-tighter uppercase mb-6">Sistem Özeti</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Sunucu Durumu</span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Aktif Kullanıcılar</span>
                <span className="text-[10px] font-black uppercase tracking-widest">42 Kişi</span>
              </div>
              <div className="pt-6 border-t border-white/10 dark:border-black/10">
                <button className="w-full py-4 rounded-2xl bg-white/10 dark:bg-black/10 text-white dark:text-black font-black tracking-widest uppercase text-[9px] hover:bg-white/20 dark:hover:bg-black/20 transition-all">
                  Sistem Ayarlarına Git
                </button>
              </div>
            </div>
          </div>

          <div className="p-10 rounded-[3rem] bg-[#CCFF00] text-black shadow-xl">
            <h2 className="text-xl font-black tracking-tighter uppercase mb-2">Hızlı Destek</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-8 leading-relaxed">Hypers teknoloji ekibiyle doğrudan iletişime geçin.</p>
            <button className="w-full py-4 rounded-2xl bg-black text-white font-black tracking-widest uppercase text-[9px] hover:opacity-80 transition-all">
              Destek Talebi Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

