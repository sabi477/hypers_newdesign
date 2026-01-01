'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getTestimonials, type Testimonial } from '@/lib/data-store';

const TestimonialBubble = ({ t }: { t: Testimonial }) => (
  <div className="flex-shrink-0 flex items-center gap-5 bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 px-8 py-5 rounded-[2.5rem] shadow-sm hover:border-black dark:hover:border-white transition-all cursor-default group relative overflow-hidden">
    <div className="w-12 h-12 rounded-full overflow-hidden border border-black/10 dark:border-white/10 flex-shrink-0">
      <img src={t.img} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
    </div>
    <div className="flex flex-col max-w-[280px] md:max-w-[450px]">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[11px] font-black uppercase tracking-tight text-black dark:text-white">{t.name}</span>
        <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">{t.handle}</span>
      </div>
      <p className="text-xs md:text-sm font-medium tracking-tight leading-relaxed text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors italic">
        "{t.text}"
      </p>
    </div>
  </div>
);

export default function Testimonials() {
  const [data, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setTestimonials(getTestimonials());
    
    const handleStorage = () => setTestimonials(getTestimonials());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (data.length === 0) return null;

  const row1 = [...data.slice(0, Math.ceil(data.length / 2)), ...data.slice(0, Math.ceil(data.length / 2))];
  const row2 = [...data.slice(Math.ceil(data.length / 2)), ...data.slice(Math.ceil(data.length / 2))];

  return (
    <section className="py-32 bg-[#fcfcfc] dark:bg-[#0a0a0a] overflow-hidden border-t border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="px-12 md:px-24 lg:px-40 mb-16">
        <h2 className="text-[10px] font-black tracking-[0.4em] uppercase opacity-30">Topluluk Sesi / Live Feedback</h2>
      </div>

      <div className="space-y-8 flex flex-col">
        {/* Row 1 - Kayma sola doğru */}
        <div className="flex">
          <motion.div 
            className="flex gap-6 px-6 gpu-accelerated"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30 + data.length, ease: "linear", repeat: Infinity }}
            style={{ willChange: 'transform' }}
          >
            {row1.map((t, i) => (
              <TestimonialBubble key={`row1-${t.id}-${i}`} t={t} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Kayma sağa doğru */}
        <div className="flex">
          <motion.div 
            className="flex gap-6 px-6 gpu-accelerated"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 35 + data.length, ease: "linear", repeat: Infinity }}
            style={{ willChange: 'transform' }}
          >
            {row2.map((t, i) => (
              <TestimonialBubble key={`row2-${t.id}-${i}`} t={t} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <p className="text-[10px] font-bold opacity-20 uppercase tracking-[0.5em]">Join the 5000+ creator community</p>
      </div>
    </section>
  );
}
