'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Users, Clock, MapPin, MoveRight, Check } from 'lucide-react';

const workshops = [
  {
    id: 1,
    title: 'Kurumlar için Etkili Sosyal Medya Kullanımı Eğitimi',
    status: 'Bu eğitim gerçekleşmiştir',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-blue-900 to-teal-600',
    description: 'Kurumların dijital dünyada etkili bir şekilde var olabilmesi için sosyal medya stratejileri, içerik planlaması ve marka yönetimi konularında kapsamlı bir eğitim programı.',
    longDescription: 'Bu workshop, kurumların sosyal medya hesaplarını profesyonel bir şekilde yönetmeleri için gerekli tüm bilgileri içermektedir. İçerik stratejisi oluşturma, hedef kitle analizi, etkileşim artırma teknikleri ve kriz yönetimi gibi konular detaylı olarak ele alınmaktadır. Eğitim, teorik bilgilerin yanı sıra pratik uygulamalar ve gerçek vaka çalışmaları ile desteklenmektedir.',
    duration: '2 Gün',
    participants: '25 Kişi',
    location: 'Hypers Academy, İstanbul',
    date: '15-16 Mart 2024',
    instructor: 'Tolga Akış',
    topics: [
      'Sosyal Medya Stratejisi Oluşturma',
      'İçerik Planlaması ve Takvimi',
      'Marka Dili ve Tonu Belirleme',
      'Etkileşim Artırma Teknikleri',
      'Kriz Yönetimi ve İtibar Yönetimi',
      'Analitik ve Raporlama'
    ],
    benefits: [
      'Sertifikalı eğitim belgesi',
      'Eğitim materyalleri ve kaynaklar',
      'Networking fırsatları',
      'Özel workshop içeriklerine erişim'
    ]
  },
  {
    id: 2,
    title: 'Performans Pazarlaması Eğitimi',
    status: 'Bu eğitim gerçekleşmiştir',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-purple-900 to-pink-600',
    description: 'Dijital pazarlamada ROI odaklı stratejiler, reklam kampanyası yönetimi ve performans ölçümleme teknikleri üzerine yoğun bir eğitim programı.',
    longDescription: 'Performans pazarlaması, dijital dünyada markaların en çok ihtiyaç duyduğu alanlardan biridir. Bu workshop, Google Ads, Meta Ads ve diğer platformlarda etkili kampanya yönetimi, bütçe optimizasyonu ve conversion artırma tekniklerini kapsamaktadır.',
    duration: '1 Gün',
    participants: '20 Kişi',
    location: 'Hypers Academy, İstanbul',
    date: '22 Mart 2024',
    instructor: 'Çiçek Çizmeci',
    topics: [
      'Kampanya Stratejisi Geliştirme',
      'Hedef Kitle Segmentasyonu',
      'Bütçe Optimizasyonu',
      'A/B Testing ve Optimizasyon',
      'Conversion Tracking',
      'ROI Hesaplama ve Raporlama'
    ],
    benefits: [
      'Sertifikalı eğitim belgesi',
      'Eğitim materyalleri ve kaynaklar',
      'Networking fırsatları',
      'Özel workshop içeriklerine erişim'
    ]
  },
  {
    id: 3,
    title: 'İçerik Stratejisi ve Yaratıcılık Workshop',
    status: 'Yakında',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-indigo-900 to-blue-600',
    description: 'Yaratıcı içerik üretimi, storytelling teknikleri ve marka hikayesi oluşturma konularında pratik odaklı bir workshop programı.',
    longDescription: 'Bu workshop, içerik üreticilerinin yaratıcı düşünme becerilerini geliştirmeleri ve etkileyici hikayeler anlatabilmeleri için tasarlanmıştır. Storytelling teknikleri, görsel tasarım prensipleri ve içerik formatları detaylı olarak ele alınacaktır.',
    duration: '2 Gün',
    participants: '30 Kişi',
    location: 'Hypers Academy, İstanbul',
    date: '5-6 Nisan 2024',
    instructor: 'Berkan Bilgiç',
    topics: [
      'Storytelling ve Hikaye Anlatımı',
      'Görsel İçerik Tasarımı',
      'Video İçerik Üretimi',
      'Marka Hikayesi Oluşturma',
      'İçerik Takvimi ve Planlama',
      'Yaratıcı Süreç Yönetimi'
    ],
    benefits: [
      'Sertifikalı eğitim belgesi',
      'Eğitim materyalleri ve kaynaklar',
      'Networking fırsatları',
      'Özel workshop içeriklerine erişim'
    ]
  },
  {
    id: 4,
    title: 'Video Prodüksiyon ve Kurgu Atölyesi',
    status: 'Yakında',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-orange-900 to-red-600',
    description: 'Profesyonel video prodüksiyon teknikleri, kamera kullanımı, ışıklandırma ve post-prodüksiyon süreçleri üzerine kapsamlı bir atölye çalışması.',
    longDescription: 'Video içeriği, dijital dünyanın en güçlü iletişim araçlarından biridir. Bu atölye, katılımcılara profesyonel video prodüksiyonunun tüm aşamalarını öğretmeyi hedeflemektedir. Çekim tekniklerinden kurgu süreçlerine kadar her adım pratik uygulamalarla desteklenecektir.',
    duration: '3 Gün',
    participants: '15 Kişi',
    location: 'Hypers Academy, İstanbul',
    date: '12-14 Nisan 2024',
    instructor: 'Caner Aras',
    topics: [
      'Kamera Teknikleri ve Açılar',
      'Işıklandırma ve Kompozisyon',
      'Ses Kaydı ve Mikrofon Kullanımı',
      'Post-Prodüksiyon ve Kurgu',
      'Renk Düzenleme ve Grading',
      'Final Export ve Optimizasyon'
    ],
    benefits: [
      'Sertifikalı eğitim belgesi',
      'Eğitim materyalleri ve kaynaklar',
      'Networking fırsatları',
      'Özel workshop içeriklerine erişim',
      'Stüdyo kullanım hakkı'
    ]
  },
];

export default function WorkshopDetail() {
  const { id } = useParams();
  const workshop = workshops.find(w => w.id === Number(id)) || workshops[0];

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] transition-colors duration-300 pt-32 px-12 md:px-24 lg:px-40 pb-32 text-black dark:text-white">
      <Navigation />

      {/* Geri Dön Butonu */}
      <Link href="/workshop" className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-all mb-16 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Workshop'lara Dön</span>
      </Link>

      {/* Üst Kısım: Hero Görsel ve Başlık */}
      <div className="mb-20">
        <div className={`relative w-full h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden bg-gradient-to-b ${workshop.gradient} mb-12`}>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30" 
            style={{ backgroundImage: `url('${workshop.image}')` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-16">
            <div className="relative z-10">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-[10px] font-black tracking-widest uppercase text-white mb-6">
                {workshop.status}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white mb-4">
                {workshop.title}
              </h1>
              <p className="text-lg md:text-xl font-medium opacity-80 text-white max-w-2xl">
                {workshop.description}
              </p>
            </div>
          </div>
        </div>

        {/* Workshop Bilgileri - Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5">
            <Calendar className="w-5 h-5 opacity-40" />
            <div>
              <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-1">Tarih</p>
              <p className="text-sm font-black tracking-tight">{workshop.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5">
            <Clock className="w-5 h-5 opacity-40" />
            <div>
              <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-1">Süre</p>
              <p className="text-sm font-black tracking-tight">{workshop.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5">
            <Users className="w-5 h-5 opacity-40" />
            <div>
              <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-1">Katılımcı</p>
              <p className="text-sm font-black tracking-tight">{workshop.participants}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5">
            <MapPin className="w-5 h-5 opacity-40" />
            <div>
              <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-1">Lokasyon</p>
              <p className="text-sm font-black tracking-tight">{workshop.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orta Kısım: Açıklama ve İçerik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        {/* Sol: Detaylı Açıklama */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black tracking-tighter uppercase mb-6">Workshop Hakkında</h2>
          <p className="text-lg font-medium opacity-70 leading-relaxed mb-8">
            {workshop.longDescription}
          </p>

          {/* Eğitmen Bilgisi */}
          <div className="p-6 bg-white dark:bg-[#111111] rounded-2xl border border-black/5 dark:border-white/5">
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mb-2">Eğitmen</p>
            <p className="text-xl font-black tracking-tight">{workshop.instructor}</p>
          </div>
        </div>

        {/* Sağ: İçerik ve Faydalar */}
        <div className="space-y-8">
          {/* İşlenecek Konular */}
          <div>
            <h3 className="text-xl font-black tracking-tighter uppercase mb-6">İşlenecek Konular</h3>
            <div className="space-y-3">
              {workshop.topics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-white dark:bg-[#111111] rounded-xl border border-black/5 dark:border-white/5"
                >
                  <div className="w-5 h-5 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white dark:text-black" />
                  </div>
                  <p className="text-sm font-medium opacity-70 leading-relaxed">{topic}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Kazanımlar */}
          <div>
            <h3 className="text-xl font-black tracking-tighter uppercase mb-6">Kazanımlar</h3>
            <div className="space-y-3">
              {workshop.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (workshop.topics.length + index) * 0.05 }}
                  className="flex items-center gap-3 p-4 bg-[#CCFF00]/10 dark:bg-[#CCFF00]/5 rounded-xl border border-[#CCFF00]/20"
                >
                  <MoveRight className="w-4 h-4 text-[#CCFF00] flex-shrink-0" />
                  <p className="text-sm font-bold opacity-80">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alt Kısım: CTA */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-12 bg-white dark:bg-[#111111] rounded-[2.5rem] border border-black/5 dark:border-white/5">
        <div>
          <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">Workshop'a Katılmak İster misiniz?</h3>
          <p className="text-sm opacity-50">Detaylı bilgi ve kayıt için bizimle iletişime geçin.</p>
        </div>
        <Link
          href="/register"
          className="group flex items-center gap-3 bg-[#CCFF00] text-black px-8 py-4 rounded-full font-black tracking-widest uppercase text-xs hover:scale-105 transition-all shadow-lg shadow-[#CCFF00]/20"
        >
          Kayıt Ol
          <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <Footer />
    </main>
  );
}

