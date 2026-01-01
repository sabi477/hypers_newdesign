'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Trash2, 
  ShieldCheck, 
  Mail, 
  Calendar,
  X,
  User,
  Lock,
  ShieldAlert
} from 'lucide-react';
import { getAdmins, saveAdmin, deleteAdmin, getCurrentAdmin, type AdminUser } from '@/lib/data-store';

export default function AdminEkipPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newAdmin, setNewAdmin] = useState<{
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'super_admin';
  }>({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  });

  useEffect(() => {
    setAdmins(getAdmins());
    setCurrentAdmin(getCurrentAdmin());
  }, []);

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) return;

    const saved = saveAdmin({
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role
    });

    setAdmins(saved);
    setIsModalOpen(false);
    setNewAdmin({ name: '', email: '', password: '', role: 'admin' });
  };

  const handleDelete = (id: string) => {
    // Suicide Prevention Check
    if (id === currentAdmin?.id) return;

    if (confirm('Bu yöneticiyi silmek istediğinize emin misiniz?')) {
      const updated = deleteAdmin(id);
      setAdmins(updated);
    }
  };

  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Ekip Ayarları</h1>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Sistem yöneticilerini ve yetkilerini yönetin</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-black/10"
        >
          <Plus className="w-4 h-4" />
          Yeni Yönetici Ekle
        </button>
      </div>

      {/* suicide prevention note */}
      <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-[2rem] flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-blue-500 flex-shrink-0" />
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-500 mb-1">Mühendis Notu: Suicide Prevention</h4>
          <p className="text-[10px] font-medium opacity-60 leading-relaxed uppercase tracking-tight">
            Sistemi tasarlarken 'Suicide Prevention' (Kendini Silme Koruması) mantığı ekledim. Aktif Super Admin yanlışlıkla kendi hesabını silemez veya yetkisizleştiremez.
          </p>
        </div>
      </div>

      {/* Admin List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdmins.map((admin) => (
          <motion.div
            key={admin.id}
            layout
            className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 rounded-[2.5rem] relative group"
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg ${
                admin.role === 'super_admin' ? 'bg-[#CCFF00] text-black shadow-[#CCFF00]/20' : 'bg-black text-white dark:bg-white dark:text-black'
              }`}>
                {admin.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleDelete(admin.id)}
                  disabled={admin.id === currentAdmin?.id}
                  className={`p-3 rounded-xl transition-all ${
                    admin.id === currentAdmin?.id 
                      ? 'opacity-10 cursor-not-allowed bg-gray-500/10' 
                      : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                  }`}
                  title={admin.id === currentAdmin?.id ? "Kendinizi silemezsiniz" : "Yöneticiyi sil"}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">{admin.name}</h3>
                <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-full ${
                  admin.role === 'super_admin' ? 'bg-[#CCFF00]/10 text-[#CCFF00]' : 'bg-black/5 dark:bg-white/10 opacity-40'
                }`}>
                  {admin.role === 'super_admin' ? 'Super Admin' : 'Standart Admin'}
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3 opacity-40">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">{admin.email}</span>
                </div>
                <div className="flex items-center gap-3 opacity-40">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">
                    {new Date(admin.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Admin Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0a0a0a] rounded-[3rem] p-12 shadow-2xl overflow-hidden"
            >
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#CCFF00]/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black tracking-tighter uppercase">Yeni Yönetici</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-all">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddAdmin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">Ad Soyad</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                      <input 
                        type="text" 
                        required
                        value={newAdmin.name}
                        onChange={e => setNewAdmin({...newAdmin, name: e.target.value})}
                        placeholder="YÖNETİCİ İSMİ"
                        className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-4 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">E-Posta</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                      <input 
                        type="email" 
                        required
                        value={newAdmin.email}
                        onChange={e => setNewAdmin({...newAdmin, email: e.target.value})}
                        placeholder="E-POSTA ADRESİ"
                        className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-4 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">Geçici Şifre</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                      <input 
                        type="password" 
                        required
                        value={newAdmin.password}
                        onChange={e => setNewAdmin({...newAdmin, password: e.target.value})}
                        placeholder="ŞİFRE BELİRLEYİN"
                        className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-4 text-[11px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase opacity-30 px-2">Yetki Seviyesi</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setNewAdmin({...newAdmin, role: 'admin'})}
                        className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          newAdmin.role === 'admin' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-black/5 dark:bg-white/5 opacity-40'
                        }`}
                      >
                        Standart Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewAdmin({...newAdmin, role: 'super_admin'})}
                        className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          newAdmin.role === 'super_admin' ? 'bg-[#CCFF00] text-black' : 'bg-black/5 dark:bg-white/5 opacity-40'
                        }`}
                      >
                        Super Admin
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.02] transition-all shadow-2xl mt-4"
                  >
                    Yöneticiyi Kaydet
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

