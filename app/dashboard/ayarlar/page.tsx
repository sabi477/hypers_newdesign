'use client';

import { Settings, User, Bell, Shield, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/data-store';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Ayarlar</h1>
        <p className="text-sm opacity-40 font-medium">Hesap tercihlerini ve profil bilgilerini yönet.</p>
      </div>

      <div className="space-y-12">
        {/* Profil Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 opacity-20" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-30">Profil Bilgileri</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-4">Ad Soyad</label>
              <div className="w-full px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl text-sm font-medium">
                {user.firstName} {user.lastName}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-4">E-Posta</label>
              <div className="w-full px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl text-sm font-medium">
                {user.email}
              </div>
            </div>
          </div>
        </section>

        {/* Bildirimler Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 opacity-20" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-30">Bildirim Tercihleri</h3>
          </div>
          
          <div className="space-y-4">
            {[
              'E-posta bildirimleri al',
              'Yeni ders duyuruları',
              'Workshop hatırlatıcıları'
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl">
                <span className="text-sm font-medium">{item}</span>
                <div className="w-10 h-6 bg-[#CCFF00] rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Güvenlik Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 opacity-20" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-30">Güvenlik</h3>
          </div>
          
          <button className="px-8 py-4 border border-black/10 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5 transition-all">
            Şifre Değiştir
          </button>
        </section>
      </div>
    </div>
  );
}



