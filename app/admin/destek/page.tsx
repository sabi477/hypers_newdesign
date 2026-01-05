'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  ChevronRight,
  User,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import { getSupportRequests, saveSupportRequest, deleteSupportRequest, type SupportRequest } from '@/lib/data-store';

export default function AdminSupportPage() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'responded' | 'closed'>('all');
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null);

  useEffect(() => {
    setRequests(getSupportRequests());
  }, []);

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      `${req.firstName} ${req.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || req.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (id: string, status: SupportRequest['status']) => {
    const updated = saveSupportRequest({ id, status });
    setRequests(updated);
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu talebi silmek istediğinize emin misiniz?')) {
      const updated = deleteSupportRequest(id);
      setRequests(updated);
      if (selectedRequest?.id === id) setSelectedRequest(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Destek Talepleri</h1>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Kullanıcılardan gelen yardım ve iletişim mesajları</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Request List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
              <input 
                type="text" 
                placeholder="TALEPLERDE ARA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
              />
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl px-4 py-3.5 text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            >
              <option value="all">TÜMÜ</option>
              <option value="pending">BEKLEYEN</option>
              <option value="responded">CEVAPLANDI</option>
              <option value="closed">KAPANDI</option>
            </select>
          </div>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2 no-scrollbar">
            <AnimatePresence mode="popLayout">
              {filteredRequests.map((req) => (
                <motion.div
                  key={req.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedRequest(req)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden ${
                    selectedRequest?.id === req.id 
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                      : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                        selectedRequest?.id === req.id ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black' : 'bg-black/5 dark:bg-white/5'
                      }`}>
                        {req.firstName[0]}{req.lastName[0]}
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black uppercase tracking-widest">{req.firstName} {req.lastName}</h3>
                        <p className={`text-[9px] font-bold opacity-40 uppercase tracking-widest`}>{req.category}</p>
                      </div>
                    </div>
                    {req.status === 'pending' ? (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    ) : (
                      <CheckCircle2 className={`w-4 h-4 ${selectedRequest?.id === req.id ? 'opacity-40' : 'text-[#CCFF00]'}`} />
                    )}
                  </div>
                  <p className={`text-[10px] font-medium line-clamp-2 mb-4 relative z-10 ${selectedRequest?.id === req.id ? 'opacity-70' : 'opacity-40'}`}>
                    {req.message}
                  </p>
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-[8px] font-bold opacity-30 uppercase tracking-[0.2em]">
                      {new Date(req.date).toLocaleDateString('tr-TR')}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedRequest?.id === req.id ? 'translate-x-1' : 'opacity-20 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredRequests.length === 0 && (
              <div className="py-20 text-center opacity-20">
                <MessageSquare className="w-12 h-12 mx-auto mb-4" strokeWidth={1} />
                <p className="text-xs font-bold uppercase tracking-widest">Talep bulunamadı</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Request Detail */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedRequest ? (
              <motion.div
                key={selectedRequest.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[3rem] p-12 sticky top-32 shadow-2xl shadow-black/[0.02]"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[2rem] bg-[#CCFF00] flex items-center justify-center font-black text-2xl text-black shadow-xl shadow-[#CCFF00]/20">
                      {selectedRequest.firstName[0]}{selectedRequest.lastName[0]}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black tracking-tighter uppercase mb-1">{selectedRequest.firstName} {selectedRequest.lastName}</h2>
                      <div className="flex items-center gap-4 opacity-40">
                        <span className="text-[10px] font-black uppercase tracking-widest">{selectedRequest.category}</span>
                        <div className="w-1 h-1 rounded-full bg-current" />
                        <span className="text-[10px] font-black uppercase tracking-widest">ID: {selectedRequest.id.slice(-6)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDelete(selectedRequest.id)}
                      className="p-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#CCFF00] group-hover:text-black transition-all">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-0.5">E-POSTA</p>
                        <p className="text-xs font-black tracking-tight">{selectedRequest.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#CCFF00] group-hover:text-black transition-all">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-0.5">TELEFON</p>
                        <p className="text-xs font-black tracking-tight">{selectedRequest.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#CCFF00] group-hover:text-black transition-all">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-0.5">TARİH</p>
                        <p className="text-xs font-black tracking-tight">
                          {new Date(selectedRequest.date).toLocaleString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#CCFF00] group-hover:text-black transition-all">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest mb-0.5">DURUM</p>
                        <p className="text-xs font-black tracking-tight uppercase">{selectedRequest.status}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-12">
                  <p className="text-[10px] font-black opacity-30 uppercase tracking-widest px-2">Kullanıcı Mesajı</p>
                  <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-black/20 text-sm font-medium leading-relaxed italic opacity-80 border border-black/5">
                    "{selectedRequest.message}"
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => handleStatusChange(selectedRequest.id, 'responded')}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
                      selectedRequest.status === 'responded' 
                        ? 'bg-[#CCFF00] text-black' 
                        : 'bg-black text-white dark:bg-white dark:text-black hover:opacity-80'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    CEVAPLANDI İŞARETLE
                  </button>
                  <button 
                    onClick={() => handleStatusChange(selectedRequest.id, 'closed')}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
                      selectedRequest.status === 'closed' 
                        ? 'bg-gray-200 dark:bg-white/10' 
                        : 'border border-black/10 dark:border-white/10 hover:bg-black/5'
                    }`}
                  >
                    KAPAT
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-[600px] flex flex-col items-center justify-center text-center opacity-20 border-2 border-dashed border-black/10 dark:border-white/10 rounded-[4rem]">
                <MessageSquare className="w-20 h-20 mb-6" strokeWidth={0.5} />
                <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">Detayları Görüntüle</h3>
                <p className="text-xs font-bold uppercase tracking-widest max-w-[280px]">Sol listeden bir destek talebi seçerek mesaj detaylarını inceleyebilirsiniz.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}



