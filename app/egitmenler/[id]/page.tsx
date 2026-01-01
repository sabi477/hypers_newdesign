'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowLeft, Instagram, Twitter, Linkedin, MoveRight } from 'lucide-react';

const instructors = [
  { 
    id: 1, 
    name: 'Tolga Akış', 
    role: 'HYPERS ACADEMY KURUCUSU VE EĞİTMENİ', 
    bio: 'Medya ve içerik dünyasında 15 yıllık deneyim. Hypers Academy ile geleceğin yeteneklerini sektöre hazırlıyor.', 
    longBio: 'Tolga Akış, reklamcılık ve içerik üretimi alanında Türkiye\'nin en önemli isimlerinden biridir. Kariyeri boyunca yüzlerce markaya danışmanlık yapmış ve Hypers çatısı altında dijital dünyanın dinamiklerini yeniden şekillendirmiştir.',
    courses: [
      { id: 101, title: 'İçerik Stratejisi 101', lessons: 12, duration: '4s' },
      { id: 102, title: 'Kreatif Yönetmenlik', lessons: 8, duration: '3s' },
      { id: 103, title: 'Yeni Medya Ekonomisi', lessons: 15, duration: '5s' }
    ]
  },
];

export default function InstructorDetail() {
  const { id } = useParams();

  // Örnek veri (id'ye göre çekilecek)
  const instructor = instructors.find(i => i.id === Number(id)) || instructors[0];

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] transition-colors duration-300 pt-32 px-12 md:px-24 lg:px-40 pb-32 text-black dark:text-white">
      <Navigation />

      {/* Geri Dön Butonu */}
      <Link href="/egitmenler" className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-all mb-16 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Eğitmenlere Dön</span>
      </Link>

      {/* Üst Kısım: Küçük Resim ve Temel Bilgiler */}
      <div className="flex flex-col md:flex-row gap-16 items-center md:items-start border-b border-black/5 dark:border-white/5 pb-20 mb-20">
        <div className="w-[280px] h-[350px] flex-shrink-0 bg-gray-100 dark:bg-[#111111] rounded-2xl overflow-hidden shadow-xl grayscale contrast-110">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
        </div>

        <div className="flex flex-col">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 mb-3">{instructor.role}</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8">{instructor.name}</h1>
          <p className="text-xl md:text-2xl font-medium tracking-tight opacity-70 leading-snug max-w-2xl">
            {instructor.bio}
          </p>
          
          <div className="flex gap-4 mt-8">
            <Link href="#" className="p-2.5 border border-black/10 dark:border-white/10 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
              <Instagram className="w-4 h-4" />
            </Link>
            <Link href="#" className="p-2.5 border border-black/10 dark:border-white/10 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
              <Twitter className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Alt Kısım: Verdiği Eğitimler */}
      <div>
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Verdiği Eğitimler</h2>
          <span className="text-[10px] font-bold opacity-30 tracking-widest uppercase">{instructor.courses.length} Program</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructor.courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              className="group p-8 border border-black/10 dark:border-white/10 rounded-2xl bg-white dark:bg-[#111111] hover:border-black dark:hover:border-white transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center">
                  <MoveRight className="text-white dark:text-black w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold opacity-30 uppercase">{course.lessons} Ders / {course.duration}</span>
              </div>
              
              <h3 className="text-2xl font-black tracking-tighter uppercase leading-none group-hover:underline">
                {course.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
