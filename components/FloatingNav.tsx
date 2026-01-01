'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Sun, Moon, Menu, X, ArrowRight, User as UserIcon, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getCart, getCurrentUser } from '@/lib/data-store';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  setIsHovered: (state: boolean) => void;
  isHovered: boolean;
}

export default function Navbar({ activeCategory, setActiveCategory, setIsHovered, isHovered }: NavbarProps) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartHasItem, setCartHasItem] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    setMounted(true);

    const checkCart = () => {
      setCartHasItem(!!getCart());
    };
    
    const checkAuth = () => {
      const user = getCurrentUser();
      setCurrentUser(user);
    };

    checkCart();
    checkAuth();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('cart_updated', checkCart);
    window.addEventListener('user_auth_updated', checkAuth);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cart_updated', checkCart);
      window.removeEventListener('user_auth_updated', checkAuth);
    };
  }, [pathname]); // Pathname değiştiğinde (sayfa geçişlerinde) auth durumunu tekrar kontrol et

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme, mounted]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // SSR sırasında yanlış ikonun görünmesini engellemek için
  const ThemeIcon = !mounted ? Moon : (theme === 'light' ? Moon : Sun);

  const navLinks = [
    { label: 'CREATOR ACADEMY', href: '/programlar/icerik-ureticiligi' },
    { label: 'MUSIC ACADEMY', href: '/programlar/muzik' },
    { label: 'ACTING ACADEMY', href: '/programlar/oyunculuk' },
    { label: 'WORKSHOP SERIES', href: '/programlar/workshop' },
  ];

  const subLinks = [
    { label: 'Hakkımızda', type: 'hakkimizda' },
    { label: 'Programlar', type: 'programlar' },
    { label: 'Eğitmenler', type: 'egitmenler' },
    { label: 'Fiyatlandırma', type: 'fiyatlandirma' },
  ];

  const getSubLinkHref = (type: string, category: string) => {
    const catCode = category.split(' ')[0].toLowerCase();
    if (type === 'programlar') {
      if (category === 'CREATOR ACADEMY') return '/programlar/icerik-ureticiligi';
      if (category === 'MUSIC ACADEMY') return '/programlar/muzik';
      if (category === 'ACTING ACADEMY') return '/programlar/oyunculuk';
      if (category === 'WORKSHOP SERIES') return '/programlar/workshop';
    }
    if (type === 'hakkimizda') return `/hakkimizda?kategori=${catCode}`;
    if (type === 'egitmenler') return `/egitmenler?academy=${catCode}`;
    if (type === 'fiyatlandirma') return `/fiyatlandirma?academy=${catCode}`;
    return '#';
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 w-full h-20 z-[110] flex items-center transition-all duration-500 bg-white dark:bg-[#0a0a0a] border-b border-black/10 dark:border-white/10 shadow-sm"
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-[1800px] mx-auto px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-black dark:text-white"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <Link 
              href="/"
              className="relative w-40 md:w-48 h-8 cursor-pointer group" 
              onClick={() => setIsHovered(false)}
            >
              <Image 
                src="/images/hypers_academy_logo.png"
                alt="Hypers Academy Logo"
                fill
                className="object-contain dark:invert transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 h-full">
            {navLinks.map((link) => {
              const isPageActive = pathname === link.href;
              const isHoverActive = isHovered && activeCategory === link.label;
              
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => {
                    setActiveCategory(link.label);
                    setIsHovered(true);
                  }}
                  className={`text-xs font-bold tracking-widest transition-all duration-200 py-8 border-b-2 ${
                    isPageActive || isHoverActive
                      ? 'text-black dark:text-white border-black dark:border-white' 
                      : 'text-black dark:text-white border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Sağ Aksiyonlar */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-4 mr-2">
              {mounted && (
                currentUser ? (
                  <Link 
                    href="/dashboard"
                    className="px-6 py-2 text-xs font-black tracking-[0.15em] rounded-full transition-all duration-500 uppercase bg-[#CCFF00] text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center gap-2 group"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    Profilim
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/login"
                      className="px-5 py-2 text-xs font-bold tracking-widest transition-all duration-300 uppercase text-black dark:text-white border border-black/10 dark:border-white/20 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      Giriş Yap
                    </Link>
                    <Link 
                      href="/register"
                      className="px-6 py-2 text-xs font-black tracking-[0.15em] rounded-full transition-all duration-500 uppercase bg-[#CCFF00] text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center gap-2 group"
                    >
                      Kayıt Ol
                      <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse group-hover:scale-125 transition-transform" />
                    </Link>
                  </>
                )
              )}
            </div>
            
            <Link href="/sepet" className="p-2 transition-all duration-300 text-black dark:text-white hover:opacity-60 relative">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartHasItem && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#CCFF00] rounded-full border border-white dark:border-[#0a0a0a]" />
              )}
            </Link>
            
            <button 
              onClick={toggleTheme}
              className="flex items-center px-3 py-1.5 border rounded-full transition-all duration-300 border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ThemeIcon 
                className={`w-4 h-4 transition-colors duration-300 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`} 
                strokeWidth={1.5} 
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120]"
            />
            
            {/* Menu */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-[85%] max-w-sm h-full bg-white dark:bg-[#0a0a0a] z-[130] flex flex-col p-8 pt-24 shadow-2xl overflow-y-auto no-scrollbar"
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-8 p-2 text-black dark:text-white"
              >
                <X className="w-8 h-8" strokeWidth={1.5} />
              </button>

              <div className="flex flex-col gap-8 mb-12">
                <h2 className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30">MENÜ</h2>
                <div className="flex flex-col gap-10">
                  {navLinks.map((link) => {
                    const isExpanded = activeCategory === link.label;
                    return (
                      <div key={link.label} className="flex flex-col gap-4">
                        <button
                          onClick={() => setActiveCategory(isExpanded ? '' : link.label)}
                          className={`flex items-center justify-between w-full transition-all ${
                            isExpanded ? 'text-black dark:text-white' : 'opacity-40 text-black dark:text-white'
                          }`}
                        >
                          <div className="text-3xl font-black tracking-tighter uppercase text-left leading-none">
                            {link.label.split(' ')[0]}
                            <br />
                            <span className="opacity-30 italic lowercase">{link.label.split(' ')[1] || ''}</span>
                          </div>
                          <div className={`p-2 rounded-full border border-black/5 dark:border-white/5 transition-all duration-300 ${isExpanded ? 'bg-[#CCFF00] border-[#CCFF00] text-black rotate-180' : ''}`}>
                            {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden flex flex-col gap-4 pl-2 border-l-2 border-[#CCFF00]"
                            >
                              {link.label === 'WORKSHOP SERIES' ? (
                                <Link
                                  href="/programlar/workshop"
                                  className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
                                >
                                  Workshop Programlarını İncele
                                </Link>
                              ) : (
                                subLinks.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={getSubLinkHref(sub.type, link.label)}
                                    className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
                                  >
                                    {sub.label}
                                  </Link>
                                ))
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-4 border-t border-black/5 dark:border-white/5 pt-12">
                {currentUser ? (
                  <Link 
                    href="/dashboard"
                    className="w-full py-4 text-center text-[10px] font-black tracking-[0.2em] uppercase bg-[#CCFF00] rounded-2xl text-black flex items-center justify-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" />
                    Profilim
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/login"
                      className="w-full py-4 text-center text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 dark:border-white/10 rounded-2xl text-black dark:text-white"
                    >
                      Giriş Yap
                    </Link>
                    <Link 
                      href="/register"
                      className="w-full py-4 text-center text-[10px] font-black tracking-[0.2em] uppercase bg-[#CCFF00] rounded-2xl text-black"
                    >
                      Kayıt Ol
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
