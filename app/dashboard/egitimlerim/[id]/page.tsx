'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PlayCircle, 
  CheckCircle2, 
  FileText, 
  Download, 
  HelpCircle, 
  Share2, 
  Bookmark,
  ChevronLeft,
  Clock,
  BarChart,
  Check,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPrograms } from '@/lib/data-store';

const initialLessons = [
  { id: 1, title: 'Hypers Academy Giriş', duration: '5:12', progress: 100 },
  { id: 2, title: 'Kişisel Marka İnşası', duration: '8:24', progress: 100 },
  { id: 3, title: 'Storytelling Teknikleri', duration: '11:02', progress: 75, active: true },
  { id: 4, title: 'Algoritma Sırları 2024', duration: '14:32', progress: 0 },
  { id: 5, title: 'Prodüksiyon İş Akışı', duration: '17:56', progress: 0 },
  { id: 6, title: 'Gelir Modelleri ve Strateji', duration: '23:12', progress: 0 },
];

export default function CoursePlayerPage() {
  const { id } = useParams();
  const [program, setProgram] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Özet');
  const [lessons, setLessons] = useState(initialLessons);

  useEffect(() => {
    const allPrograms = getPrograms();
    const found = allPrograms.find(p => p.id.toString() === id?.toString());
    if (found) {
      setProgram(found);
    }
  }, [id]);

  const getAcademyColor = () => {
    if (!program) return '#CCFF00';
    switch (program.category) {
      case 'CREATOR': return '#ff5500';
      case 'MUSIC': return '#ff80ee';
      case 'ACTING': return '#694aff';
      case 'WORKSHOP': return '#0066FF';
      default: return '#CCFF00';
    }
  };

  const academyColor = getAcademyColor();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Özet':
        return (
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Ders Özeti</h2>
              <p className="text-sm font-medium leading-relaxed opacity-60">
                Bu derste, {program?.category === 'MUSIC' ? 'müzik prodüksiyonunun' : program?.category === 'ACTING' ? 'oyunculuk sanatının' : 'içerik ekonomisinin'} temel yapı taşlarını inceledik. Dijital dünyada kendinizi nasıl konumlandıracağınızı, topluluk yönetimini ve etkileşim stratejilerini detaylıca ele aldık.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest opacity-30">Temel Kavramlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Strateji Nasıl Oluşturulur?',
                  'Sektör Kurallarını Anlamak',
                  'Sık Yapılan Hatalar ve Çözümleri',
                  'Maksimum Verim Formülleri'
                ].map((concept, i) => (
                  <div key={i} className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-6 rounded-2xl group transition-all" style={{ '--hover-bg': `${academyColor}10` } as any}>
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-black flex items-center justify-center border border-black/10 dark:border-white/10" style={{ borderColor: activeTab === 'Özet' ? `${academyColor}40` : '' }}>
                      <Check className="w-3 h-3" style={{ color: academyColor }} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-tight opacity-80">{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Dosyalar':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Eğitim Dosyaları</h2>
            {[
              { name: 'Ders Sunumu.pdf', size: '2.4 MB', type: 'PDF' },
              { name: 'Çalışma Planı.xlsx', size: '1.1 MB', type: 'EXCEL' },
              { name: 'Kaynak Listesi.docx', size: '850 KB', type: 'DOC' }
            ].map((file, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 group hover:border-black/20 dark:hover:border-white/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center">
                    <FileText className="w-6 h-6 opacity-40" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest">{file.name}</h4>
                    <p className="text-[9px] font-bold opacity-30 uppercase">{file.size} • {file.type}</p>
                  </div>
                </div>
                <button className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                  <Download className="w-5 h-5 opacity-40" />
                </button>
              </div>
            ))}
          </div>
        );
      case 'Kaynaklar':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Ek Kaynaklar & Linkler</h2>
            {[
              'İlham Verici Örnekler Portfolyosu',
              'Sektörel Trend Raporları 2024',
              'Kullanılması Gereken Araçlar Listesi',
              'Hypers Topluluk Discord Kanalı'
            ].map((resource, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 hover:scale-[1.01] transition-all cursor-pointer">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: academyColor }} />
                <span className="text-[11px] font-black uppercase tracking-widest opacity-70">{resource}</span>
                <ArrowRight className="w-4 h-4 ml-auto opacity-20" />
              </div>
            ))}
          </div>
        );
      case 'Soru & Cevap':
        return (
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Soru & Cevap</h2>
              <p className="text-sm font-medium opacity-50">Eğitmenine veya diğer öğrencilere soru sor, tartışmalara katıl.</p>
            </div>
            
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Bir soru sor..."
                className="flex-grow bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest focus:ring-1 transition-all outline-none"
                style={{ '--tw-ring-color': academyColor } as any}
              />
              <button 
                className="px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-white transition-all shadow-xl"
                style={{ backgroundColor: academyColor }}
              >
                Gönder
              </button>
            </div>

            <div className="space-y-4 pt-8">
              {[
                { user: 'Ahmet Y.', q: 'Algoritma güncellemeleri hakkında ne düşünüyorsunuz?', a: 'Çok yerinde bir soru. Detayları bir sonraki canlı yayında ele alacağız.' },
                { user: 'Selin K.', q: 'Ekipman önerisi olan var mı?', a: 'Ders notlarındaki kaynaklar kısmına göz atabilirsin, orada bir liste hazırladık.' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-black/5 dark:bg-white/5 rounded-[2rem] border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.user}</span>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-tight mb-4 opacity-80">{item.q}</p>
                  <div className="pl-4 border-l-2 border-black/10 dark:border-white/10">
                    <p className="text-[10px] font-medium opacity-50 italic">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-black/5 dark:border-white/5 pb-8">
        <div>
          <Link href="/dashboard/egitimlerim" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-all mb-4">
            <ChevronLeft className="w-4 h-4" /> Eğitimlerime Dön
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 leading-none">
            {program?.title || 'Yükleniyor...'} - <span style={{ color: academyColor }}>{program?.instructor || 'Eğitmen'}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 opacity-40">
              <BarChart className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Orta Seviye</span>
            </div>
            <div className="flex items-center gap-2 opacity-40">
              <PlayCircle className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">{program?.lessons || '12'} Ders</span>
            </div>
            <div className="flex items-center gap-2 opacity-40">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">3s 45dk</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-all">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl">
            <Share2 className="w-4 h-4" /> Paylaş
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* 2. Left Column - Video & Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Video Player Placeholder */}
          <div className="aspect-video bg-black rounded-[3rem] overflow-hidden relative group shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: academyColor }}>
                <PlayCircle className="w-10 h-10 text-black fill-current" />
              </div>
            </div>
            {/* Custom Controls UI Preview */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-4">
                <div className="h-full" style={{ width: '45%', backgroundColor: academyColor }} />
              </div>
              <div className="flex justify-between items-center text-white font-bold text-[10px]">
                <span>12:40 / 24:00</span>
                <div className="flex gap-4">
                  <span className="cursor-pointer hover:opacity-100 opacity-60 transition-opacity" style={{ color: academyColor }}>1.0x</span>
                  <span className="cursor-pointer hover:opacity-100 opacity-60 transition-opacity" style={{ color: academyColor }}>HD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-8 border-b border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar">
            {['Özet', 'Dosyalar', 'Kaynaklar', 'Soru & Cevap'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-black dark:text-white' : 'opacity-20 hover:opacity-100'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 rounded-full" style={{ backgroundColor: academyColor }} />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {renderTabContent()}
          </div>
        </div>

        {/* 3. Right Column - Progress & Playlist ... (no change in progress card color logic for consistency) */}
        <div className="space-y-8">
          {/* Study Progress Card */}
          <div className="bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl flex items-center gap-6">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-black/5 dark:text-white/5" />
                <circle cx="40" cy="40" r="36" stroke={academyColor} strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset="226 - (226 * 75) / 100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black">75%</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-tight mb-1">Eğitim İlerlemesi</h4>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest leading-relaxed">Kaldığınız yeri ve tamamladığınız dersleri buradan takip edin.</p>
            </div>
          </div>

          {/* Course Content List */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest opacity-30">Kurs İçeriği</h3>
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className={`group flex items-center gap-4 p-5 rounded-[1.5rem] border transition-all cursor-pointer ${
                    lesson.active 
                      ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-2xl' 
                      : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 shadow-sm'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-black ${
                    lesson.active 
                      ? 'bg-white/20 border-white/20' 
                      : 'bg-black/5 border-black/5'
                  }`}>
                    {lesson.id}
                  </div>
                  <div className="flex-grow">
                    <h5 className="text-[11px] font-bold uppercase tracking-tight leading-tight mb-1">{lesson.title}</h5>
                    <p className={`text-[9px] font-black opacity-40 uppercase tracking-widest ${lesson.active ? 'text-white dark:text-black' : ''}`}>{lesson.duration}</p>
                  </div>
                  <div className="relative w-8 h-8">
                    {lesson.progress === 100 ? (
                      <CheckCircle2 className="w-8 h-8 fill-current bg-white rounded-full border-none" style={{ color: academyColor }} />
                    ) : (
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="transparent" className="opacity-10" />
                        <circle cx="16" cy="16" r="14" stroke={academyColor} strokeWidth="2" fill="transparent" strokeDasharray="88" strokeDashoffset={88 - (88 * lesson.progress) / 100} />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}