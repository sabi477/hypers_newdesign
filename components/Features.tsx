'use client';

import { motion } from 'framer-motion';
import { Monitor, Zap, Award } from 'lucide-react';

const features = [
  {
    icon: Monitor,
    title: 'HER YERDEN HER ZAMAN İZLE!',
    desc: 'Tüm cihazlardan dilediğin an eğitimlere eriş, sınırları ortadan kaldır.'
  },
  {
    icon: Zap,
    title: 'EN GÜNCEL İÇERİKLER',
    desc: 'Sektörün en yeni trendleri ve algoritmalarıyla sürekli güncellenen müfredat.'
  },
  {
    icon: Award,
    title: 'HYPERS ACADEMY SERTİFİKASI',
    desc: 'Eğitimini tamamla, sektörde kapıları açan resmi sertifikanı al.'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-[#fcfcfc] dark:bg-[#0a0a0a] transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-24 lg:px-40">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 lg:gap-20">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-start gap-6 group flex-1"
            >
              {/* Minimal Icon Area */}
              <div className="relative">
                <feature.icon className="w-6 h-6 text-black dark:text-white opacity-40 group-hover:opacity-100 group-hover:text-[#CCFF00] transition-all duration-500" strokeWidth={1.5} />
                <div className="absolute -inset-2 bg-[#CCFF00]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Minimal Typography Area */}
              <div className="space-y-3">
                <h3 className="text-sm md:text-base font-black tracking-tighter uppercase text-black dark:text-white leading-none group-hover:translate-x-1 transition-transform duration-500">
                  {feature.title}
                </h3>
                <div className="w-8 h-[1px] bg-[#CCFF00] scale-x-50 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest leading-relaxed max-w-[240px]">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
