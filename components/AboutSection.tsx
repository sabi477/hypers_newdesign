'use client';

import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  activeCategory: string;
}

const categoryData: { [key: string]: { title: string; subtitle: string; description: string; color: string; dotColor: string; buttonColor: string; stats: { label: string; value: string }[] } } = {
  'CREATOR ACADEMY': {
    title: 'HYPERS ACADEMY NEDİR?',
    subtitle: 'İçerik Üreticileri İçin Kapsamlı Eğitim Platformu',
    description: 'Bir içerik üreticisinin sahip olması gereken tüm bilgileri göz önünde bulundurarak tasarlanan Hypers Academy\'de sektör profesyonellerinden ve influencerlardan bilgi ve ilham veren içeriklerden oluşan bir eğitim müfredatı bulunmaktadır.\n\nHypers Academy online eğitim platformu olup, internet bağlantısı olan her yerde bu eğitimlere erişim imkanı sağlar. Sadece teori değil, pratik uygulamalar ve gerçek dünya deneyimleri ile sektöre hazırlanırsınız.',
    color: 'bg-[#CCFF00]',
    dotColor: '#CCFF00',
    buttonColor: 'bg-[#CCFF00] text-black',
    stats: [
      { label: 'SİZE ÖZEL EĞİTİM', value: '82' },
      { label: 'UZMAN EĞİTMEN', value: '37' }
    ]
  },
  'MUSIC ACADEMY': {
    title: 'HYPERS MUSIC ACADEMY NEDİR?',
    subtitle: 'Müzik Endüstrisi İçin Profesyonel Gelişim',
    description: 'Müzik prodüksiyonundan mixing & mastering\'e, canlı performanstan stüdyo kayıtlarına kadar müzik endüstrisinin tüm alanlarında uzmanlaşın. Sektörün en iyilerinden öğrenin ve kendi müziğinizi dünyaya duyurun.\n\nHypers Music Academy ile profesyonel stüdyo deneyimini online platformda yaşayın.',
    color: 'bg-[#CCFF00]',
    dotColor: '#CCFF00',
    buttonColor: 'bg-[#CCFF00] text-black',
    stats: [
      { label: 'MÜZİK PROGRAMI', value: '24' },
      { label: 'PRODÜKTÖR EĞİTMEN', value: '15' }
    ]
  },
  'ACTING ACADEMY': {
    title: 'HYPERS ACTING ACADEMY NEDİR?',
    subtitle: 'Sahne ve Kamera Önü Sanatları Eğitimi',
    description: 'Kamera önü oyunculuktan sahne performansına, karakter geliştirmeden seslendirmeye kadar oyunculuk sanatının her alanında kendinizi geliştirin. Türkiye\'nin önde gelen oyuncularından teknikler ve deneyimler kazanın.\n\nKendi yeteneğinizi keşfedin ve profesyonel kariyerinize ilk adımı atın.',
    color: 'bg-[#CCFF00]',
    dotColor: '#CCFF00',
    buttonColor: 'bg-[#CCFF00] text-black',
    stats: [
      { label: 'OYUNCULUK PROGRAMI', value: '18' },
      { label: 'OYUNCU EĞİTMEN', value: '12' }
    ]
  },
  'WORKSHOP': {
    title: 'HYPERS WORKSHOP NEDİR?',
    subtitle: 'Hızlı ve Etkili Yetenek Kazanımı',
    description: 'Yoğun ve pratik odaklı workshop programlarımızla kısa sürede büyük ilerleme kaydedin. Haftalık kamplar ve özel atölyelerle sektöre hızlıca adım atın. Sektörün güncel ihtiyaçlarına göre tasarlanmış özel modüllerle kendinizi güncelleyin.',
    color: 'bg-[#CCFF00]',
    dotColor: '#CCFF00',
    buttonColor: 'bg-[#CCFF00] text-black',
    stats: [
      { label: 'WORKSHOP PROGRAMI', value: '32' },
      { label: 'UZMAN MENTOR', value: '28' }
    ]
  }
};

export default function AboutSection({ activeCategory }: AboutSectionProps) {
  const data = categoryData[activeCategory] || categoryData['CREATOR ACADEMY'];

  return (
    <section id="about-section" className="py-32 px-6 md:px-24 lg:px-40 bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto relative z-10">
        
        {/* Üst Başlık ve Subtitle */}
        <div className="mb-16">
          <motion.h1 
            key={data.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            key={data.subtitle}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-bold opacity-40 uppercase tracking-tight"
          >
            {data.subtitle}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-16 md:gap-24">
          {/* Sol Taraf: Açıklama, İstatistikler ve Özellikler */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <h2 className="text-[9px] font-black tracking-[0.4em] uppercase opacity-30 mb-8">HAKKIMIZDA / VİZYON</h2>
            
            <motion.p 
              key={`${activeCategory}-desc`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm md:text-base font-bold tracking-tight opacity-50 leading-relaxed mb-12 max-w-xl whitespace-pre-line"
            >
              {data.description}
            </motion.p>

            {/* İstatistikler */}
            <div className="flex gap-16 mb-16">
              {data.stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-5xl md:text-6xl font-black tracking-tighter">{stat.value}</span>
                  <span className="text-[9px] font-black tracking-widest uppercase opacity-40 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>

            <motion.button 
              key={`${activeCategory}-btn`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group flex items-center gap-3 ${data.buttonColor} px-10 py-5 rounded-full font-black tracking-[0.15em] uppercase text-[10px] hover:scale-105 transition-all shadow-xl shadow-black/10`}
            >
              EĞİTİMLERE GÖZ ATIN
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Sağ Taraf: Video Alanı */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-gray-100 dark:bg-[#111111] rounded-[3rem] overflow-hidden shadow-2xl group cursor-pointer border border-black/5 dark:border-white/5">
            <div className="absolute inset-0 bg-[url('/images/videokapak.png')] bg-cover bg-center opacity-90 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-24 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </div>

            <div className="absolute bottom-10 left-10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-white drop-shadow-lg">HYPERS ACADEMY SHOWREEL / 2024</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
