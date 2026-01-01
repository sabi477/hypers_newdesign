'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CarouselSection() {
  const items = [
    { id: 1, title: 'CREATOR MASTERCLASS', desc: 'YouTube & Content Strategy', img: '/images/kapak.jpg', href: '/programlar/icerik-ureticiligi' },
    { id: 2, title: 'MUSIC PRODUCTION', desc: 'DAW, Mixing & Mastering', img: '/images/planner.jpg', href: '/programlar/muzik' },
    { id: 3, title: 'ACTING & PERFORMANCE', desc: 'Camera & Stage Presence', img: '/images/@estudiozoe_%20%F0%9F%8E%AC.jpg', href: '/programlar/oyunculuk' },
    { id: 4, title: 'WORKSHOP SERIES', desc: 'Weekly Intensive Camps', img: '/images/kapak2.jpg', href: '/programlar/workshop' },
  ];

  const duplicatedItems = [...items, ...items];

  return (
    <section className="h-screen w-full bg-white dark:bg-[#0a0a0a] text-black dark:text-white overflow-hidden relative border-t border-black dark:border-white/10 transition-colors duration-300">
      <div className="absolute top-10 left-10 z-10">
        <h3 className="text-[11px] font-black tracking-[0.5em] uppercase opacity-40">Showcase / Featured Programs</h3>
      </div>

      <div className="h-full flex items-center">
        <motion.div 
          className="flex h-full gpu-accelerated"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ willChange: 'transform' }}
        >
          {duplicatedItems.map((item, index) => (
            <Link 
              key={`${item.id}-${index}`}
              href={item.href}
              className="flex-shrink-0 w-[80vw] md:w-[60vw] h-full relative group border-r border-black dark:border-white/10 flex flex-col justify-end p-20 bg-[#050505] overflow-hidden cursor-pointer"
            >
              {/* Image Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-80 transition-all duration-1000 scale-105 group-hover:scale-100 grayscale-[30%] group-hover:grayscale-0"
                style={{ backgroundImage: `url('${item.img}')` }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              
              <div className="relative z-10 text-white">
                <p className="text-[12px] font-bold tracking-[0.2em] uppercase mb-4 opacity-40">0{item.id}</p>
                <h4 className="text-[6vw] font-black tracking-tighter uppercase leading-[0.85] mb-4">{item.title}</h4>
                <p className="text-xl font-medium tracking-tight opacity-60 max-w-md">{item.desc}</p>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-32 h-32 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-md">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">İncele</span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
