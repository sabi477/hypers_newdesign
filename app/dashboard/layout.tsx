'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlayCircle, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Search,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser } from '@/lib/data-store';

const menuItems = [
  { label: 'Genel Bakış', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Eğitimlerim', icon: PlayCircle, href: '/dashboard/egitimlerim' },
  { label: 'Workshoplar', icon: Calendar, href: '/dashboard/workshoplar' },
  { label: 'Topluluk', icon: MessageSquare, href: '/dashboard/topluluk' },
  { label: 'Ayarlar', icon: Settings, href: '/dashboard/ayarlar' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState({ firstName: '', lastName: '', initials: '' });

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        initials: (user.firstName[0] || '') + (user.lastName[0] || '')
      });
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user_auth');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#080808] text-black dark:text-white flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="relative bg-white dark:bg-[#060606] border-r border-black/5 dark:border-white/5 flex flex-col z-50 transition-colors duration-300"
      >
        {/* Logo Section */}
        <div className="p-8 mb-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center flex-shrink-0 transition-transform">
              <span className="text-white dark:text-black font-bold text-base">H</span>
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xs tracking-tight uppercase"
              >
                Hypers
              </motion.span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative ${
                  isActive 
                    ? 'bg-black/5 dark:bg-white/5 text-black dark:text-white font-bold' 
                    : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02] opacity-40 hover:opacity-100'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-[#CCFF00]' : 'group-hover:scale-110'} transition-all`} />
                {isSidebarOpen && (
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                )}
                {isActive && isSidebarOpen && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute right-4 w-1 h-1 rounded-full bg-[#CCFF00]" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 mt-auto border-t border-black/5 dark:border-white/5 space-y-2">
          <div className="flex items-center gap-4 px-4 py-3 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl mb-4 border border-black/5 dark:border-white/5">
            <div className="w-7 h-7 rounded-lg bg-black dark:bg-white flex items-center justify-center font-bold text-white dark:text-black text-[10px] uppercase">
              {userData.initials || '??'}
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col overflow-hidden text-left">
                <span className="text-[10px] font-bold uppercase truncate leading-none mb-1">{userData.firstName} {userData.lastName}</span>
                <span className="text-[8px] font-medium opacity-30 uppercase tracking-widest truncate">Öğrenci</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/5 transition-all opacity-40 hover:opacity-100"
          >
            <LogOut className="w-4 h-4" />
            {isSidebarOpen && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-left">Çıkış Yap</span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 px-12 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-white/50 dark:bg-black/50 backdrop-blur-xl z-40 transition-colors duration-300">
          <div className="relative w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-20 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="text" 
              placeholder="Ara..."
              className="w-full bg-black/[0.03] dark:bg-white/[0.03] border-none rounded-xl pl-11 pr-4 py-2.5 text-[10px] font-medium uppercase tracking-widest focus:ring-1 focus:ring-[#CCFF00]/50 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group">
              <Bell className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#CCFF00] border-2 border-white dark:border-[#0a0a0a]" />
            </button>
            <div className="h-6 w-[1px] bg-black/10 dark:bg-white/10 mx-1" />
            <button className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5 group-hover:border-[#CCFF00]/50 transition-all">
                <User className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-grow overflow-y-auto no-scrollbar bg-[#fcfcfc] dark:bg-[#080808] p-12 transition-colors duration-300">
          {children}
        </div>
      </main>
    </div>
  );
}

