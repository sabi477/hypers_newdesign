'use client';

import { useState } from 'react';
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
  Check
} from 'lucide-react';
import Link from 'next/link';

const lessons = [
  { id: 1, title: 'Introduction to Hypers', duration: '5:12', progress: 100 },
  { id: 2, title: 'How to Build a Personal Brand', duration: '8:24', progress: 100 },
  { id: 3, title: 'Storytelling & Engagement', duration: '11:02', progress: 75, active: true },
  { id: 4, title: 'Algorithm Secrets 2024', duration: '14:32', progress: 0 },
  { id: 5, title: 'Production Workflow', duration: '17:56', progress: 0 },
  { id: 6, title: 'Monetization Strategies', duration: '23:12', progress: 0 },
];

export default function CoursePlayerPage() {
  const [activeTab, setActiveTab] = useState('Summary');

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-black/5 dark:border-white/5 pb-8">
        <div>
          <Link href="/dashboard/egitimlerim" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-all mb-4">
            <ChevronLeft className="w-4 h-4" /> Eğitime Geri Dön
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 leading-none">
            YouTube Masterclass - <span className="text-[#CCFF00]">Tolga Akış</span>
          </h1>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 opacity-40">
              <BarChart className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Beginner</span>
            </div>
            <div className="flex items-center gap-2 opacity-40">
              <PlayCircle className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">12 Lessons</span>
            </div>
            <div className="flex items-center gap-2 opacity-40">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">3h 45min</span>
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
              <div className="w-20 h-20 rounded-full bg-[#CCFF00] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <PlayCircle className="w-10 h-10 text-black fill-current" />
              </div>
            </div>
            {/* Custom Controls UI Preview */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-4">
                <div className="w-[45%] h-full bg-[#CCFF00]" />
              </div>
              <div className="flex justify-between items-center text-white font-bold text-[10px]">
                <span>12:40 / 24:00</span>
                <div className="flex gap-4">
                  <span className="cursor-pointer hover:text-[#CCFF00]">1.0x</span>
                  <span className="cursor-pointer hover:text-[#CCFF00]">HD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-8 border-b border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar">
            {['Summary', 'Files', 'Resources', 'Q&A'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-black dark:text-white' : 'opacity-20 hover:opacity-100'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#CCFF00] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Lesson Recap</h2>
              <p className="text-sm font-medium leading-relaxed opacity-60">
                In this lesson, we explored the fundamental building blocks of creator economy. We learned that components are independent and reusable bits of code. They serve the same purpose as JavaScript functions but work in isolation and return HTML.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest opacity-30">Key Concepts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'How to create and export a functional component',
                  'Understanding algorithm rules',
                  'Common errors creators face',
                  'Engagement maximization'
                ].map((concept, i) => (
                  <div key={i} className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-6 rounded-2xl group hover:bg-[#CCFF00]/5 transition-all">
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-black flex items-center justify-center border border-black/10 dark:border-white/10 group-hover:border-[#CCFF00]">
                      <Check className="w-3 h-3 text-[#CCFF00]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-tight opacity-80">{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Right Column - Progress & Playlist */}
        <div className="space-y-8">
          {/* Study Progress Card */}
          <div className="bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl flex items-center gap-6">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-black/5 dark:text-white/5" />
                <circle cx="40" cy="40" r="36" stroke="#CCFF00" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset="226 - (226 * 75) / 100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black">75%</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-tight mb-1">Study Progress</h4>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest leading-relaxed">Track your learning milestones and where you left off.</p>
            </div>
          </div>

          {/* Course Content List */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest opacity-30">Course Content</h3>
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
                      <CheckCircle2 className="w-8 h-8 text-[#CCFF00] fill-current bg-white rounded-full border-none" />
                    ) : (
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="transparent" className="opacity-10" />
                        <circle cx="16" cy="16" r="14" stroke="#CCFF00" strokeWidth="2" fill="transparent" strokeDasharray="88" strokeDashoffset={88 - (88 * lesson.progress) / 100} />
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

