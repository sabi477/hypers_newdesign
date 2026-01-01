'use client';

import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight, Mail, MapPin, MoveRight } from 'lucide-react';
import Link from 'next/link';
import ContactForm from './ContactForm';

export default function Footer() {
  const instagrams = [
    { handle: '@hypersacademy', link: '#' },
    { handle: '@hypersagency', link: '#' },
    { handle: '@hypersmusic', link: '#' },
  ];

  return (
    <footer className="bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-32 pb-12 px-6 md:px-16 lg:px-20 border-t border-black/5 dark:border-white/5 transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-full mx-auto">
        
        {/* Üst Kısım: Sol taraf - Başlık, Buton, Email | Sağ taraf - Contact Form */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-32">
          {/* Sol Taraf */}
          <div className="max-w-4xl w-full lg:w-auto">
            <h2 className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30 mb-6">İletişim / Contact</h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-10">
              Birlikte <br /> Yaratalım.
            </h1>
            
            {/* Glassmorphism Kayıt Ol Butonu */}
            <Link 
              href="/register"
              className="group flex flex-col gap-2 w-fit"
            >
              <div className="flex items-center gap-6 bg-[#CCFF00] text-black px-10 py-5 rounded-[2rem] font-black tracking-[0.2em] uppercase text-xs hover:scale-105 transition-all shadow-2xl shadow-[#CCFF00]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10">Şimdi Kayıt Ol</span>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:translate-x-2 transition-all relative z-10">
                  <MoveRight className="text-[#CCFF00] w-4 h-4" />
                </div>
              </div>
              <span className="text-[9px] font-bold opacity-30 tracking-[0.3em] uppercase ml-4 group-hover:opacity-60 transition-opacity">Geleceğini Bugün İnşa Et</span>
            </Link>
          </div>
          
          {/* Sağ Taraf - Contact Form (Daha Büyük) */}
          <div className="w-full lg:w-[600px] lg:flex-shrink-0">
            <ContactForm />
          </div>
        </div>

        {/* Orta Kısım: Instagram ve Bilgiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 border-t border-black/10 dark:border-white/10 pt-16 mb-32">
          
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">Sosyal Medya</span>
            <div className="flex flex-col gap-4">
              {instagrams.map((ig) => (
                <Link 
                  key={ig.handle} 
                  href={ig.link} 
                  className="flex items-center gap-3 group w-fit"
                >
                  <Instagram className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <span className="text-lg font-bold tracking-tight hover:underline decoration-2 underline-offset-4">
                    {ig.handle}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">Lokasyon</span>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 opacity-40" />
              <p className="text-base font-medium leading-snug opacity-60">
                Maslak, Ayazağa Cd. No:4,<br />
                Uniq İstanbul, 34396<br />
                Sarıyer / İstanbul
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:ml-auto">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">Akademi</span>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Eğitimler', href: '/programlar/icerik-ureticiligi' },
                { label: 'Eğitmenler', href: '/egitmenler' },
                { label: 'Topluluk', href: '#' },
                { label: 'Destek', href: '/destek' },
                { label: 'Fiyatlandırma', href: '/fiyatlandirma' }
              ].map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className="text-[11px] font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* En Alt: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-20">
          <p className="text-[8px] font-bold tracking-[0.4em] uppercase">
            © 2024 Hypers Creator Academy. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[8px] font-bold tracking-[0.4em] uppercase hover:opacity-100">Privacy Policy</Link>
            <Link href="#" className="text-[8px] font-bold tracking-[0.4em] uppercase hover:opacity-100">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
