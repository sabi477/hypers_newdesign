'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  User,
  Quote,
  Image as ImageIcon,
  AtSign
} from 'lucide-react';
import { getTestimonials, saveTestimonial, deleteTestimonial, type Testimonial } from '@/lib/data-store';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    text: '',
    img: ''
  });

  useEffect(() => {
    setTestimonials(getTestimonials());
  }, []);

  const handleOpenModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        handle: testimonial.handle,
        text: testimonial.text,
        img: testimonial.img
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: '',
        handle: '',
        text: '',
        img: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveTestimonial({
      ...formData,
      id: editingTestimonial?.id
    });
    setTestimonials(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string | number) => {
    if (confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      const updated = deleteTestimonial(id);
      setTestimonials(updated);
    }
  };

  const filtered = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Yorum Yönetimi</h1>
          <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Influencer ve öğrenci yorumlarını yönetin.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#CCFF00]/20"
        >
          <Plus className="w-4 h-4" />
          Yeni Yorum Ekle
        </button>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
        <input 
          type="text" 
          placeholder="İSİM, KULLANICI ADI VEYA YORUM ARA..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-2xl pl-12 pr-4 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#CCFF00] transition-all outline-none"
        />
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 p-8 rounded-[2.5rem] group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black/5 dark:border-white/10">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">{t.name}</h3>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{t.handle}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(t)}
                    className="p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(t.id)}
                    className="p-3 rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm font-medium leading-relaxed italic opacity-60">"{t.text}"</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#111111] rounded-[3rem] p-12 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black tracking-tighter uppercase">
                  {editingTestimonial ? 'Yorumu Düzenle' : 'Yeni Yorum Ekle'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:opacity-60 transition-opacity">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-30 ml-2">İsim Soyisim</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" 
                        placeholder="AD SOYAD..." 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-30 ml-2">Kullanıcı Adı</label>
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                      <input 
                        type="text" 
                        required
                        value={formData.handle}
                        onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                        className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" 
                        placeholder="@KULLANICIADI" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-30 ml-2">Profil Fotoğrafı URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                    <input 
                      type="text" 
                      required
                      value={formData.img}
                      onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" 
                      placeholder="GÖRSEL URL VEYA DOSYA YOLU..." 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-30 ml-2">Yorum Metni</label>
                  <div className="relative">
                    <Quote className="absolute left-4 top-6 w-4 h-4 opacity-30" />
                    <textarea 
                      required
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-4 text-xs font-bold min-h-[120px] outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" 
                      placeholder="YORUM BURAYA..." 
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full py-5 rounded-2xl bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs shadow-xl shadow-[#CCFF00]/20 hover:scale-[1.02] transition-all">
                    {editingTestimonial ? 'Değişiklikleri Kaydet' : 'Yorumu Kaydet'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}



