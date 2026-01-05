'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Users, Clock, MapPin, MoveRight, Check } from 'lucide-react';
import { getCurrentUser } from '@/lib/data-store';

const workshops = [
  {
    id: 101,
    title: 'Kurumlar için Etkili Sosyal Medya Kullanımı Eğitimi',
    status: 'Bu eğitim gerçekleşmiştir',
    image: '/images/loreal.jpg',
    gradient: 'from-blue-900 to-teal-600',
    description: 'L’Oréal Dermatolojik Güzellik Divizyonu için, 35 eczacıdan oluşan Medfluencer ekibine yönelik dijital görünürlüklerini artırmaya yönelik kapsamlı bir program.',
    longDescription: 'L’Oréal Dermatolojik Güzellik Divizyonu için, 35 eczacıdan oluşan Medfluencer ekibine yönelik dijital görünürlüklerini artırmaya yönelik kapsamlı bir program gerçekleştirilmiştir. Katılımcılara, dijital içerik üretim süreçlerinde alanında uzman isimlerden algoritma tabanlı eğitimler ve dijital strateji oturumları ile profesyonel destek sağlanmıştır. Katılım sağlayan Medfluencer’lar, ürettikleri içerikler üzerinden geri bildirim alarak dijital stratejilerini daha etkin bir şekilde uygulayabilecek bilgi ve beceri kazanmışlardır.',
    duration: '5 Gün',
    participants: '35 Kişi',
    location: 'L\'Oréal HQ / Online',
    date: 'Ocak 2024',
    instructor: 'L’ORÉAL DERMATOLOJİK GÜZELLİK',
    topics: [
      'Dijital Dünyada Marka Olmak',
      'Marka Olmanın ve İtibarı Yönetebilmenin Yolları',
      'Dijital Eczane Olmanın Reçetesi',
      'Güncel Instagram Algoritması',
      'Etkili Reels Kullanımı',
      'Tiktok\'da Başarılı İçerik Stratejileri'
    ],
    benefits: [
      'Resmi Sertifika',
      'Algoritma Tabanlı Eğitim',
      'Dijital Strateji Oturumları',
      'Profesyonel Geri Bildirim'
    ]
  },
  {
    id: 102,
    title: 'Performans Pazarlaması Eğitimi',
    status: 'Bu eğitim gerçekleşmiştir',
    image: '/images/anadolu-efes.jpg',
    gradient: 'from-blue-800 to-blue-500',
    description: '4 farklı ülkeden 70\'ten fazla Efes Global çalışanına özel olarak tasarlanan İngilizce eğitim programı.',
    longDescription: '4 farklı ülkeden 70\'ten fazla Efes Global çalışanına özel olarak tasarlanan eğitim programımızda, \'Yeni Medya-İçerik Üreticiliği\' ve \'Performans Analizi\' başlıklarında İngilizce olarak kapsamlı eğitimler gerçekleştirilmiştir. Katılımcılar, dijital medya ve içerik üretimi alanındaki en güncel trendleri ve analiz tekniklerini öğrenerek, küresel ölçekte etkili stratejiler geliştirebilecek bilgi ve deneyim elde etmişlerdir.',
    duration: '3 Gün',
    participants: '70+ Kişi',
    location: 'Efes Global / Hybrid',
    date: 'Şubat 2024',
    instructor: 'ANADOLU EFES',
    topics: [
      'Instagram Algorithm',
      'Effective Content On TikTok',
      'Youtube Performance Analysis and Channel Optimization',
      'Performance & Brand Analysis',
      'Facebook Insights Reporting and Meta Suite'
    ],
    benefits: [
      'Global Sertifika',
      'İngilizce Eğitim İçeriği',
      'Performans Analiz Teknikleri',
      'Stratejik Gelişim'
    ]
  },
  {
    id: 8,
    title: 'Workshop Weekly',
    status: 'Yakında',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-blue-700 to-blue-400',
    description: 'Haftalık yoğun ve pratik odaklı eğitim programı.',
    longDescription: 'Haftalık bazda düzenlenen bu yoğun workshop programı, katılımcıların kısa sürede spesifik alanlarda uzmanlaşmasını hedefler. Her hafta farklı bir tema ile pratik uygulamalar yapılır.',
    duration: '1 Hafta',
    participants: '15 Kişi',
    location: 'Hypers Academy',
    date: 'Her Pazartesi',
    instructor: 'Pınar Musaoğlu',
    topics: [
      'Haftalık Hedef Belirleme',
      'Yoğun Pratik Uygulamalar',
      'Grup Çalışmaları',
      'Mentorluk Seansları'
    ],
    benefits: [
      'Yoğunlaştırılmış Öğrenme',
      'Hızlı Yetkinlik Kazanımı',
      'Sertifika'
    ]
  },
  {
    id: 17,
    title: 'Intensive Bootcamp',
    status: 'Yakında',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop',
    gradient: 'from-blue-600 to-blue-300',
    description: 'Kariyerinizi bir üst seviyeye taşıyacak yoğun bootcamp programı.',
    longDescription: 'İş dünyasının talep ettiği becerileri kazandırmak üzere tasarlanmış, sonuç odaklı ve yoğunlaştırılmış bir eğitim maratonu. Gerçek projeler üzerinde çalışarak deneyim kazanın.',
    duration: '2 Hafta',
    participants: '12 Kişi',
    location: 'Hypers Academy',
    date: '15 Mayıs 2024',
    instructor: 'Pınar Musaoğlu',
    topics: [
      'Proje Bazlı Öğrenme',
      'Sektörel Standartlar',
      'Kariyer Planlama',
      'Portfolyo Oluşturma'
    ],
    benefits: [
      'Kariyer Mentorluğu',
      'Network Erişimi',
      'Başarı Sertifikası'
    ]
  }
];

export default function WorkshopDetail() {
  const { id } = useParams();
  const workshop = workshops.find(w => w.id === Number(id)) || workshops[0];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getCurrentUser());
  }, []);

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] transition-colors duration-300 pt-32 px-12 md:px-24 lg:px-40 pb-32 text-black dark:text-white">
      <Navigation />

      {/* Geri Dön Butonu */}
      <Link href="/programlar/workshop" className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-all mb-16 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black tracking-widest uppercase">Workshop'lara Dön</span>
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
          <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">
            {isLoggedIn ? "Eğitiminize Hemen Başlayın" : "Workshop'a Katılmak İster misiniz?"}
          </h3>
          <p className="text-sm opacity-50">
            {isLoggedIn ? "Tüm içeriklere dashboard üzerinden erişebilirsiniz." : "Detaylı bilgi ve kayıt için bizimle iletişime geçin."}
          </p>
        </div>
        <Link
          href={isLoggedIn ? `/dashboard/egitimlerim/${id}` : "/register"}
          className="group flex items-center gap-3 bg-[#CCFF00] text-black px-8 py-4 rounded-full font-black tracking-widest uppercase text-xs hover:scale-105 transition-all shadow-lg shadow-[#CCFF00]/20"
        >
          {isLoggedIn ? "Eğitime Başla" : "Kayıt Ol"}
          <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <Footer />
    </main>
  );
}

