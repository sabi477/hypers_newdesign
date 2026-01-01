'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MoveRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const workshops = [
  {
    id: 1,
    title: 'CREATIVE MARKETING WORKSHOP',
    status: 'Bu eğitim gerçekleşmiştir',
    image: '/images/foto%20criativa%20marketing.jpg',
    gradient: 'from-blue-900 to-blue-600',
    number: '01'
  },
  {
    id: 2,
    title: 'PLANNER & STRATEGY SESSIONS',
    status: 'Bu eğitim gerçekleşmiştir',
    image: '/images/planner.jpg',
    gradient: 'from-blue-800 to-blue-500',
    number: '02'
  },
  {
    id: 3,
    title: 'ACTING & PERFORMANCE',
    status: 'Yakında',
    image: '/images/@estudiozoe_%20%F0%9F%8E%AC.jpg',
    gradient: 'from-blue-700 to-blue-400',
    number: '03'
  },
  {
    id: 4,
    title: 'WORKSHOP SERIES',
    status: 'Yakında',
    image: '/images/%20-114.jpg',
    gradient: 'from-blue-600 to-blue-300',
    number: '04'
  },
];

export default function WorkshopPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-black dark:text-white pt-32 px-12 md:px-24 lg:px-40 pb-20 transition-colors duration-300">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black dark:text-white">Workshop</span>
      </div>

      {/* Sayfa Başlığı */}
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 text-black dark:text-white">Workshop</h1>
        <p className="text-sm opacity-40 max-w-md text-black dark:text-white uppercase tracking-widest font-bold text-[10px]">Yoğun ve pratik odaklı eğitim programları.</p>
      </div>

      {/* Workshop Grid - 2 Satır, Her Satırda 2 Box Birleşik */}
      <div className="space-y-12 mb-32">
        {/* İlk Satır - Birleşik Box */}
        <div className="flex flex-col md:flex-row gap-0 relative">
          {workshops.slice(0, 2).map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group flex-1 relative ${index === 0 ? 'z-10' : 'z-0'}`}
            >
              {index === 0 ? (
                // Görsel Kart (Sol)
                <Link href={`/workshop/${workshop.id}`}>
                  <div className={`relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden bg-gradient-to-b ${workshop.gradient} cursor-pointer group-hover:scale-[1.02] transition-all duration-500 rounded-[3rem] md:rounded-r-none shadow-2xl`}>
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" 
                      style={{ backgroundImage: `url('${workshop.image}')` }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="absolute top-12 left-12">
                        <p className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">{workshop.number}</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter uppercase">
                          {workshop.title.split(' ').slice(0, 2).join(' ')}
                        </h3>
                        <p className="text-white/80 text-sm font-bold uppercase tracking-widest">
                          {workshop.title.split(' ').slice(2).join(' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                // Metin Kart (Sağ)
                <div className="flex flex-col justify-between h-full p-12 rounded-[3rem] md:rounded-l-none bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/40 dark:border-white/10 border-l-0 hover:border-blue-500/50 transition-all duration-500 aspect-[16/9] md:aspect-auto group/text relative overflow-hidden shadow-2xl">
                  {/* Glossy Overlay Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none opacity-50" />
                  
                  <div className="relative z-10">
                    <p className="text-[10px] font-black opacity-30 mb-4 tracking-[0.3em]">{workshop.number}</p>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-6 leading-[0.85] text-black dark:text-white group-hover/text:tracking-tight transition-all">
                      {workshop.title}
                    </h3>
                    <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest mb-10 text-black dark:text-white group-hover/text:opacity-100 transition-opacity">
                      {workshop.status}
                    </p>
                  </div>
                  <Link 
                    href={`/workshop/${workshop.id}`}
                    className="relative z-10 group/btn flex items-center gap-4 bg-white/20 backdrop-blur-xl border border-white/30 text-black dark:text-white px-10 py-5 rounded-full font-black tracking-widest uppercase text-[10px] hover:bg-blue-500 hover:text-white transition-all w-fit shadow-2xl"
                  >
                    Detayını Gör
                    <MoveRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* İkinci Satır - Birleşik Box */}
        <div className="flex flex-col md:flex-row gap-0 relative">
          {workshops.slice(2, 4).map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 2) * 0.1 }}
              className={`group flex-1 relative ${index === 0 ? 'z-10' : 'z-0'}`}
            >
              {index === 0 ? (
                // Metin Kart (Sol)
                <div className="flex flex-col justify-between h-full p-12 rounded-[3rem] md:rounded-r-none bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/40 dark:border-white/10 border-r-0 hover:border-blue-500/50 transition-all duration-500 aspect-[16/9] md:aspect-auto group/text relative overflow-hidden shadow-2xl">
                  {/* Glossy Overlay Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none opacity-50" />
                  
                  <div className="relative z-10">
                    <p className="text-[10px] font-black opacity-30 mb-4 tracking-[0.3em]">{workshop.number}</p>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-6 leading-[0.85] text-black dark:text-white group-hover/text:tracking-tight transition-all">
                      {workshop.title}
                    </h3>
                    <p className="text-[11px] font-bold opacity-40 uppercase tracking-widest mb-10 text-black dark:text-white group-hover/text:opacity-100 transition-opacity">
                      {workshop.status}
                    </p>
                  </div>
                  <Link 
                    href={`/workshop/${workshop.id}`}
                    className="relative z-10 group/btn flex items-center gap-4 bg-white/20 backdrop-blur-xl border border-white/30 text-black dark:text-white px-10 py-5 rounded-full font-black tracking-widest uppercase text-[10px] hover:bg-blue-500 hover:text-white transition-all w-fit shadow-2xl"
                  >
                    Detayını Gör
                    <MoveRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ) : (
                // Görsel Kart (Sağ)
                <Link href={`/workshop/${workshop.id}`}>
                  <div className={`relative aspect-[16/9] md:aspect-auto md:h-full overflow-hidden bg-gradient-to-b ${workshop.gradient} cursor-pointer group-hover:scale-[1.02] transition-all duration-500 rounded-[3rem] md:rounded-l-none shadow-2xl`}>
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" 
                      style={{ backgroundImage: `url('${workshop.image}')` }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <div className="absolute top-12 left-12">
                        <p className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">{workshop.number}</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter uppercase">
                          {workshop.title.split(' ').slice(0, 2).join(' ')}
                        </h3>
                        <p className="text-white/80 text-sm font-bold uppercase tracking-widest">
                          {workshop.title.split(' ').slice(2).join(' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

