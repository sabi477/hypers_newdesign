'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Filter,
  MoreVertical,
  ChevronRight,
  X
} from 'lucide-react';
import { getPrograms, saveProgram, deleteProgram, type Program } from '@/lib/data-store';

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchTerm, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: 'CREATOR',
    instructor: '',
    lessons: 10,
    status: 'Aktif',
    isFeatured: false,
    image: ''
  });

  useEffect(() => {
    setPrograms(getPrograms());
  }, []);

  const handleOpenModal = (program?: Program) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        title: program.title,
        category: program.category,
        instructor: program.instructor,
        lessons: program.lessons,
        status: program.status,
        isFeatured: program.isFeatured || false,
        image: program.image || ''
      });
    } else {
      setEditingProgram(null);
      setFormData({
        title: '',
        category: 'CREATOR',
        instructor: '',
        lessons: 10,
        status: 'Aktif',
        isFeatured: false,
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPrograms = saveProgram({
      ...formData,
      id: editingProgram?.id
    });
    setPrograms(updatedPrograms);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string | number) => {
    if (confirm('Bu programı silmek istediğinize emin misiniz?')) {
      const updatedPrograms = deleteProgram(id);
      setPrograms(updatedPrograms);
    }
  };

  const filteredPrograms = programs.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Program Yönetimi</h1>
          <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Eğitim programlarını ekleyin veya düzenleyin.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#CCFF00]/20"
        >
          <Plus className="w-4 h-4" />
          Yeni Program Ekle
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
          <input 
            type="text" 
            placeholder="PROGRAM ADI VEYA EĞİTMEN ARA..."
            value={searchTerm}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-2xl pl-12 pr-4 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#CCFF00] transition-all outline-none"
          />
        </div>
        <button className="p-4 rounded-2xl bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 opacity-40 hover:opacity-100 transition-all">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Programs List - Table Style */}
      <div className="bg-white dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/5 dark:border-white/5">
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Program</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Kategori</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Eğitmen</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Ders Sayısı</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Durum</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-30">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {filteredPrograms.map((program) => (
              <motion.tr 
                key={program.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-10 py-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black uppercase tracking-tight">{program.title}</span>
                      {program.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full bg-[#CCFF00] text-black text-[7px] font-black uppercase tracking-widest">Featured</span>
                      )}
                    </div>
                    <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">ID: {program.id}</span>
                  </div>
                </td>
                <td className="px-10 py-6 text-[10px] font-black uppercase tracking-widest opacity-60">{program.category}</td>
                <td className="px-10 py-6 text-sm font-bold opacity-60 uppercase tracking-tight">{program.instructor}</td>
                <td className="px-10 py-6 text-sm font-bold opacity-60">{program.lessons} Ders</td>
                <td className="px-10 py-6">
                  <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${
                    program.status === 'Aktif' ? 'bg-[#CCFF00]/10 text-[#CCFF00]' : 
                    program.status === 'Taslak' ? 'bg-orange-500/10 text-orange-500' : 
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {program.status}
                  </span>
                </td>
                <td className="px-10 py-6">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenModal(program)}
                      className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(program.id)}
                      className="p-2.5 rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
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
                  {editingProgram ? 'Programı Düzenle' : 'Yeni Program Ekle'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:opacity-60 transition-opacity">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-30 ml-2">Program Adı</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" 
                      placeholder="AD..." 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-30 ml-2">Kategori</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all appearance-none cursor-pointer"
                    >
                      <option value="CREATOR">İÇERİK ÜRETİCİLİĞİ</option>
                      <option value="MUSIC">MÜZİK</option>
                      <option value="ACTING">OYUNCULUK</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-30 ml-2">Eğitmen</label>
                    <input 
                      type="text" 
                      required
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" 
                      placeholder="EĞİTMEN ADI..." 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-30 ml-2">Ders Sayısı</label>
                    <input 
                      type="number" 
                      required
                      value={formData.lessons}
                      onChange={(e) => setFormData({ ...formData, lessons: parseInt(e.target.value) })}
                      className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-30 ml-2">Durum</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all appearance-none cursor-pointer"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Taslak">Taslak</option>
                      <option value="Kapalı">Kapalı</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase opacity-30 ml-2">Öne Çıkar (Featured)</label>
                    <div 
                      onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
                      className={`w-full py-4 rounded-2xl cursor-pointer transition-all flex items-center justify-center gap-3 border-2 ${
                        formData.isFeatured 
                          ? 'bg-[#CCFF00]/10 border-[#CCFF00] text-black dark:text-white' 
                          : 'bg-black/5 dark:bg-white/5 border-transparent opacity-40'
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">{formData.isFeatured ? 'ÖNE ÇIKARILDI' : 'ÖNE ÇIKAR'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-30 ml-2">Görsel URL</label>
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xs font-bold uppercase outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all" 
                    placeholder="/images/dosyaadi.jpg VEYA URL..." 
                  />
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full py-5 rounded-2xl bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs shadow-xl shadow-[#CCFF00]/20 hover:scale-[1.02] transition-all">
                    {editingProgram ? 'Değişiklikleri Kaydet' : 'Programı Kaydet'}
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

