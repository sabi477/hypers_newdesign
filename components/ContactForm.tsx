'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { saveSupportRequest } from '@/lib/data-store';

const steps = [
  { field: 'firstName', placeholder: 'Adınız', question: 'Adınız nedir?', validation: 'name' },
  { field: 'lastName', placeholder: 'Soyadınız', question: 'Soyadınız nedir?', validation: 'name' },
  { field: 'email', placeholder: 'E-posta', question: 'E-posta adresiniz nedir?', validation: 'email' },
  { field: 'phone', placeholder: 'Telefon', question: 'Telefon numaranız nedir?', validation: 'phone' },
  { field: 'category', placeholder: 'Kategori Seçiniz', question: 'Hangi alana ilgi duyuyorsunuz?', type: 'select', options: ['İÇERİK ÜRETİCİLİĞİ', 'MÜZİK', 'OYUNCULUK', 'WORKSHOP'] },
  { field: 'message', placeholder: 'Mesajınız', question: 'Bize ne iletmek istersiniz?', type: 'textarea' },
];

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [currentValue, setCurrentValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const step = steps[currentStep];

  const validate = (val: string) => {
    if (!val.trim()) return false;
    if (step.validation === 'name') return /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]{2,}$/.test(val.trim());
    if (step.validation === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    if (step.validation === 'phone') return /^[0-9\s+]{10,}$/.test(val.trim());
    return val.trim().length >= 2;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let val = e.target.value;
    
    // Anlık karakter kısıtlaması
    if (step.validation === 'name') {
      val = val.replace(/[0-9]/g, ''); // Sayıları anında sil
    }
    if (step.validation === 'phone') {
      val = val.replace(/[^0-9\s+]/g, ''); // Sadece sayı, boşluk ve + karakterine izin ver
    }
    
    setCurrentValue(val);
  };

  const handleNext = () => {
    if (!validate(currentValue)) return;

    const newData = { ...formData, [step.field]: currentValue.trim() };
    setFormData(newData);

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setCurrentValue(newData[steps[currentStep + 1].field] || '');
    } else {
      saveSupportRequest(newData);
      setIsSubmitted(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (validate(currentValue)) {
        handleNext();
      }
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="h-[400px] flex flex-col items-center justify-center text-center"
      >
        <div className="w-20 h-20 rounded-full bg-[#CCFF00] flex items-center justify-center mb-6 shadow-2xl shadow-[#CCFF00]/40">
          <MoveRight className="w-8 h-8 text-black" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">MESAJINIZ ALINDI</h2>
        <p className="opacity-40 font-bold uppercase tracking-widest text-[10px]">En kısa sürede size ulaşacağız.</p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 px-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#CCFF00] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#CCFF00]/20">
            <span className="text-black font-black text-xl">H</span>
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight uppercase text-black dark:text-white">HYPERS ACADEMY</h3>
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] text-black dark:text-white">ONLİNE</p>
          </div>
        </div>

        <Link href="mailto:info@hypers.co" className="group">
          <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30 text-right mb-1 text-black dark:text-white">EMAL BİZE ULAŞIN</p>
          <div className="flex items-center gap-3 border-b-2 border-black dark:border-white pb-1">
            <span className="text-2xl font-bold tracking-tighter text-black dark:text-white">info@hypers.co</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-black dark:text-white" />
          </div>
        </Link>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col gap-6 mb-12 px-4">
        <AnimatePresence mode="popLayout">
          {/* Question Bubble */}
          <motion.div 
            key={`q-${currentStep}`}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className="flex flex-col items-start gap-2 max-w-[80%]"
          >
            <div className="bg-black text-white dark:bg-white dark:text-black px-6 py-3.5 rounded-[1.5rem] rounded-bl-none shadow-lg relative group">
              <h4 className="text-sm md:text-base font-bold tracking-tight leading-tight">{step.question}</h4>
              {/* Tail */}
              <div className="absolute -bottom-1.5 -left-1 w-3 h-3 bg-black dark:bg-white transform rotate-45 rounded-sm -z-10" />
            </div>
          </motion.div>

          {/* Input/Answer Bubble */}
          <motion.div 
            key={`a-${currentStep}`}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className="flex flex-col items-end gap-2 self-end w-full max-w-[80%]"
          >
            <div className={`w-full bg-gray-100 dark:bg-white/5 px-6 py-3.5 rounded-[1.5rem] rounded-br-none shadow-inner border transition-all duration-300 relative ${currentValue && !validate(currentValue) ? 'border-red-500/50' : 'border-transparent focus-within:border-black/10 dark:focus-within:border-white/10'}`}>
              {step.type === 'select' ? (
                <select
                  value={currentValue}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none text-sm font-bold appearance-none cursor-pointer text-black dark:text-white"
                >
                  <option value="" disabled className="dark:bg-[#0a0a0a]">{step.placeholder}</option>
                  {step.options?.map(opt => (
                    <option key={opt} value={opt} className="text-black dark:bg-[#0a0a0a] dark:text-white">{opt}</option>
                  ))}
                </select>
              ) : step.type === 'textarea' ? (
                <textarea
                  value={currentValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={step.placeholder}
                  className="w-full bg-transparent outline-none text-sm font-bold resize-none placeholder:opacity-20 text-black dark:text-white min-h-[40px]"
                />
              ) : (
                <div className="w-full relative">
                  <input
                    type={step.validation === 'email' ? 'email' : 'text'}
                    value={currentValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={step.placeholder}
                    className="w-full bg-transparent outline-none text-sm font-bold placeholder:opacity-20 text-black dark:text-white"
                  />
                  {currentValue && !validate(currentValue) && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="absolute -bottom-8 right-0 text-[8px] font-black text-red-500 uppercase tracking-widest text-right"
                    >
                      Geçersiz format
                    </motion.p>
                  )}
                </div>
              )}
              {/* Tail */}
              <div className="absolute -bottom-1.5 -right-1 w-3 h-3 bg-gray-100 dark:bg-white/5 transform rotate-45 rounded-sm -z-10" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((_, idx) => (
          <div 
            key={idx}
            className={`transition-all duration-500 ${
              idx === currentStep 
                ? 'w-8 h-1 bg-black dark:bg-white rounded-full' 
                : 'w-1 h-1 bg-black/10 dark:bg-white/10 rounded-full'
            }`}
          />
        ))}
      </div>

      {/* Submit Button */}
      <div className="px-4">
        <button
          onClick={handleNext}
          disabled={!validate(currentValue)}
          className={`w-full py-4 rounded-[1.2rem] flex items-center justify-center gap-4 transition-all duration-500 group relative overflow-hidden ${
            validate(currentValue)
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-xl hover:scale-[1.01]'
              : 'bg-gray-100 dark:bg-white/5 text-black/20 dark:text-white/20 cursor-not-allowed'
          }`}
        >
          <span className="text-[9px] font-black uppercase tracking-[0.3em] relative z-10">
            {currentStep === steps.length - 1 ? 'MESAJI GÖNDER' : 'SONRAKİ ADIM'}
          </span>
          <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform relative z-10" />
        </button>
      </div>
    </div>
  );
}
