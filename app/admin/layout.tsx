'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  Search,
  Bell,
  Calendar,
  MessageCircle,
  Quote,
  ShieldCheck
} from 'lucide-react';
import { getCurrentAdmin, type AdminUser } from '@/lib/data-store';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Programlar', icon: BookOpen, href: '/admin/programlar' },
  { label: 'Yorumlar', icon: Quote, href: '/admin/yorumlar' },
  { label: 'Eğitmenler', icon: Users, href: '/admin/egitmenler' },
  { label: 'Workshop', icon: Calendar, href: '/admin/workshop' },
  { label: 'Üyeler & Kayıtlar', icon: Users, href: '/admin/uyeler' },
  { label: 'Destek Talepleri', icon: MessageCircle, href: '/admin/destek' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setAdminUser(getCurrentAdmin());
    } else {
      setIsAuthenticated(false);
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_auth_user');
    router.push('/admin/login');
  };

  // Login sayfasındaysak layout'u render etme (login sayfası kendi layout'una sahip)
  if (pathname === '/admin/login') return <>{children}</>;

  // Yüklenme veya yönlendirme aşaması
  if (isAuthenticated === null) return null;
  if (isAuthenticated === false) return null;

  return (
    <div className="flex min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-[#111111] border-r border-black/5 dark:border-white/5 flex flex-col fixed h-full z-50">
        <div className="p-8">
          <Link href="/" className="relative w-40 h-8 block cursor-pointer group">
            <Image 
              src="/images/hypers_academy_logo.png"
              alt="Hypers Academy Logo"
              fill
              className="object-contain dark:invert"
            />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto no-scrollbar">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-4 mb-4">Ana Menü</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/10' 
                    : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-40 hover:opacity-100'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'opacity-100' : 'opacity-100'}`} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className={`text-[11px] font-black uppercase tracking-widest`}>{item.label}</span>
              </Link>
            );
          })}

          {/* Super Admin Özel Menüsü */}
          {adminUser?.role === 'super_admin' && (
            <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 px-4 mb-4">Sistem</p>
              <Link 
                href="/admin/ekip"
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                  pathname === '/admin/ekip'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/10' 
                    : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-40 hover:opacity-100'
                }`}
              >
                <ShieldCheck className="w-5 h-5" strokeWidth={pathname === '/admin/ekip' ? 2.5 : 1.5} />
                <span className={`text-[11px] font-black uppercase tracking-widest`}>Ekip Ayarları</span>
              </Link>
            </div>
          )}
        </nav>

        <div className="p-6 border-t border-black/5 dark:border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl w-full hover:bg-red-500/10 text-red-500 transition-all opacity-60 hover:opacity-100"
          >
            <LogOut className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-[11px] font-black uppercase tracking-widest">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 min-h-screen relative flex flex-col">
        {/* Header */}
        <header className="h-24 px-12 flex items-center justify-between border-b border-black/5 dark:border-white/5 sticky top-0 bg-[#fcfcfc]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl z-40">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder="HER ŞEYİ ARA..."
              className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-3 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#CCFF00] rounded-full border-2 border-[#fcfcfc] dark:border-[#0a0a0a]" />
            </button>
            <div className="flex items-center gap-4 border-l border-black/5 dark:border-white/5 pl-6">
              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] font-black uppercase tracking-widest">{adminUser?.name || 'Sabiha Yılmaz'}</span>
                <span className="text-[8px] font-bold opacity-40 uppercase tracking-widest">
                  {adminUser?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-black font-black text-sm">
                  {(adminUser?.name || 'SY').split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-12 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}

