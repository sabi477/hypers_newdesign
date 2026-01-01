'use client';

export interface Program {
  id: string | number;
  title: string;
  category: string;
  instructor: string;
  lessons: number;
  status: string;
  desc?: string;
  tags?: string[];
  color?: string;
  accent?: string;
  image?: string;
  isFeatured?: boolean;
}

const initialPrograms: Program[] = [
  { 
    id: 1, 
    title: 'YouTube Masterclass', 
    category: 'CREATOR', 
    instructor: 'Tolga Akış', 
    lessons: 12, 
    status: 'Aktif',
    desc: 'Profesyonel içerik üretimi ve kanal yönetimi stratejileri.',
    tags: ['FEATURED', 'CREATOR'],
    color: 'bg-tomato-500 text-white',
    accent: 'bg-tomato-900 text-white',
    image: '/images/planner.jpg',
    isFeatured: true
  },
  { 
    id: 2, 
    title: 'Music Production', 
    category: 'MUSIC', 
    instructor: 'Ertan Güneş', 
    lessons: 15, 
    status: 'Aktif',
    desc: 'Sıfırdan profesyonel müzik üretimi ve teknik detaylar.',
    tags: ['FEATURED', 'MUSIC'],
    color: 'bg-cloudy-sky-500 text-white',
    accent: 'bg-cloudy-sky-900 text-white',
    image: '/images/foto criativa marketing.jpg',
    isFeatured: true
  },
  { 
    id: 3, 
    title: 'Acting Basics', 
    category: 'ACTING', 
    instructor: 'Tulu Erden', 
    lessons: 10, 
    status: 'Aktif',
    desc: 'Temel oyunculuk teknikleri ve sahne performansı.',
    tags: ['ACTING'],
    color: 'bg-slate-blue-500 text-white',
    accent: 'bg-slate-blue-900 text-white',
    image: '/images/@estudiozoe_%20%F0%9F%8E%AC.jpg'
  },
  { 
    id: 4, 
    title: 'TikTok Growth', 
    category: 'CREATOR', 
    instructor: 'Çiçek Çizmeci', 
    lessons: 8, 
    status: 'Aktif',
    desc: 'Kısa video içeriklerinde büyüme ve etkileşim formülleri.',
    tags: ['CREATOR'],
    color: 'bg-tomato-500 text-white',
    accent: 'bg-tomato-900 text-white',
    image: '/images/%20-113.jpg'
  },
  { 
    id: 5, 
    title: 'Mixing & Mastering', 
    category: 'MUSIC', 
    instructor: 'Ertan Güneş', 
    lessons: 20, 
    status: 'Aktif',
    desc: 'Profesyonel ses düzenleme ve mastering teknikleri.',
    tags: ['MUSIC'],
    color: 'bg-cloudy-sky-500 text-white',
    accent: 'bg-cloudy-sky-900 text-white'
  },
  { 
    id: 6, 
    title: 'Kamera Önü Oyunculuk', 
    category: 'ACTING', 
    instructor: 'Merve Dizdar', 
    lessons: 12, 
    status: 'Aktif',
    desc: 'Dizi ve sinema sektörü için profesyonel oyunculuk teknikleri.',
    tags: ['ACTING'],
    color: 'bg-slate-blue-500 text-white',
    accent: 'bg-slate-blue-900 text-white'
  },
  { 
    id: 7, 
    title: 'Podcast Üretimi', 
    category: 'CREATOR', 
    instructor: 'Nilay Örnek', 
    lessons: 10, 
    status: 'Aktif',
    desc: 'Kendi podcast serinizi başlatmak için her şey.',
    tags: ['CREATOR'],
    color: 'bg-tomato-500 text-white',
    accent: 'bg-tomato-900 text-white'
  },
  { 
    id: 8, 
    title: 'Dijital Markalama', 
    category: 'CREATOR', 
    instructor: 'Aura Digital', 
    lessons: 14, 
    status: 'Aktif',
    desc: 'Kişisel markanızı dijital dünyada nasıl konumlandırırsınız?',
    tags: ['CREATOR'],
    color: 'bg-tomato-500 text-white',
    accent: 'bg-tomato-900 text-white'
  },
  { 
    id: 9, 
    title: 'Vokal Teknikleri', 
    category: 'MUSIC', 
    instructor: 'Gaye Su Akyol', 
    lessons: 8, 
    status: 'Aktif',
    desc: 'Profesyonel vokal performansı için ses eğitimi.',
    tags: ['MUSIC'],
    color: 'bg-cloudy-sky-500 text-white',
    accent: 'bg-cloudy-sky-900 text-white'
  },
  { 
    id: 10, 
    title: 'Senaryo Yazımı', 
    category: 'ACTING', 
    instructor: 'Berker Güven', 
    lessons: 16, 
    status: 'Aktif',
    desc: 'Karakter analizi ve hikaye anlatıcılığı teknikleri.',
    tags: ['ACTING'],
    color: 'bg-slate-blue-500 text-white',
    accent: 'bg-slate-blue-900 text-white'
  },
  { 
    id: 11, 
    title: 'Instagram Fotoğrafçılığı', 
    category: 'CREATOR', 
    instructor: 'Mustafa Seven', 
    lessons: 6, 
    status: 'Aktif',
    desc: 'Mobil fotoğrafçılık ve estetik içerik üretimi.',
    tags: ['CREATOR'],
    color: 'bg-tomato-500 text-white',
    accent: 'bg-tomato-900 text-white'
  },
  { 
    id: 12, 
    title: 'Ableton Live Eğitimi', 
    category: 'MUSIC', 
    instructor: 'Ahmet Faik Dökmeci', 
    lessons: 22, 
    status: 'Aktif',
    desc: 'Dünyanın en popüler DAW yazılımında uzmanlaşın.',
    tags: ['MUSIC'],
    color: 'bg-cloudy-sky-500 text-white',
    accent: 'bg-cloudy-sky-900 text-white'
  },
  { 
    id: 13, 
    title: 'Tiyatro Tarihi', 
    category: 'ACTING', 
    instructor: 'Haluk Bilginer', 
    lessons: 12, 
    status: 'Aktif',
    desc: 'Antik Yunan\'dan günümüze dünya tiyatro mirası.',
    tags: ['ACTING'],
    color: 'bg-slate-blue-500 text-white',
    accent: 'bg-slate-blue-900 text-white'
  },
  { 
    id: 14, 
    title: 'Dublaj ve Seslendirme', 
    category: 'ACTING', 
    instructor: 'Sungun Babacan', 
    lessons: 8, 
    status: 'Aktif',
    desc: 'Sesinizi bir enstrüman gibi kullanma ve karakter canlandırma.',
    tags: ['ACTING'],
    color: 'bg-slate-blue-500 text-white',
    accent: 'bg-slate-blue-900 text-white'
  },
  { 
    id: 17, 
    title: 'Başarı Hikayesi: Merve Dizdar', 
    category: 'ACTING', 
    instructor: 'Merve Dizdar', 
    lessons: 4, 
    status: 'Aktif',
    desc: 'Cannes Film Festivali yolculuğu ve oyunculuk serüveni.',
    tags: ['ACTING', 'SUCCESS'],
    color: 'bg-slate-blue-500 text-white',
    accent: 'bg-slate-blue-900 text-white',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop'
  },
  { 
    id: 18, 
    title: 'Global Projelerde Başarı', 
    category: 'ACTING', 
    instructor: 'Hypers Acting', 
    lessons: 6, 
    status: 'Aktif',
    desc: 'Uluslararası platformlarda oyuncu olarak yer alma stratejileri.',
    tags: ['ACTING', 'SUCCESS'],
    color: 'bg-slate-blue-500 text-white',
    accent: 'bg-slate-blue-900 text-white'
  },
  { 
    id: 15, 
    title: 'Sosyal Medya Yönetimi', 
    category: 'WORKSHOP', 
    instructor: 'Hypers Social Team', 
    lessons: 4, 
    status: 'Aktif', 
    desc: 'Markalar için etkili sosyal medya stratejileri.', 
    tags: ['WORKSHOP'], 
    color: 'bg-blue-500 text-white', 
    accent: 'bg-blue-900 text-white' 
  }, 
  { 
    id: 16, 
    title: 'Yaratıcı Yazarlık', 
    category: 'WORKSHOP', 
    instructor: 'Hypers Creative', 
    lessons: 2, 
    status: 'Aktif', 
    desc: 'Fikir geliştirme ve yaratıcı yazım atölyesi.', 
    tags: ['WORKSHOP'], 
    color: 'bg-blue-500 text-white', 
    accent: 'bg-blue-900 text-white' 
  }
];

export const getPrograms = (): Program[] => {
  if (typeof window === 'undefined') return initialPrograms;
  const stored = localStorage.getItem('hypers_programs');
  if (stored) {
    try {
      let storedPrograms = JSON.parse(stored) as Program[];
      let updated = false;

      // Hem yeni programları ekle hem de mevcutların eksik alanlarını (image, isFeatured vb.) güncelle
      const finalPrograms = initialPrograms.map(initial => {
        const stored = storedPrograms.find(p => p.id.toString() === initial.id.toString());
        if (stored) {
          // Eğer stored versiyonda image veya isFeatured yoksa initial'dan al
          if (!stored.image && initial.image) { stored.image = initial.image; updated = true; }
          if (stored.isFeatured === undefined && initial.isFeatured) { stored.isFeatured = initial.isFeatured; updated = true; }
          return stored;
        }
        updated = true;
        return initial;
      });

      // storedPrograms'da olup initial'da olmayanları da koru (Admin'den eklenenler)
      storedPrograms.forEach(p => {
        if (!finalPrograms.some(fp => fp.id.toString() === p.id.toString())) {
          finalPrograms.push(p);
        }
      });
      
      if (updated) {
        localStorage.setItem('hypers_programs', JSON.stringify(finalPrograms));
      }
      
      return finalPrograms;
    } catch (e) {
      return initialPrograms;
    }
  }
  localStorage.setItem('hypers_programs', JSON.stringify(initialPrograms));
  return initialPrograms;
};

export const saveProgram = (program: Partial<Program>) => {
  const programs = getPrograms();
  
  const categoryColors: { [key: string]: { color: string, accent: string } } = {
    'CREATOR': { color: 'bg-tomato-500 text-white', accent: 'bg-tomato-900 text-white' },
    'MUSIC': { color: 'bg-cloudy-sky-500 text-white', accent: 'bg-cloudy-sky-900 text-white' },
    'ACTING': { color: 'bg-slate-blue-500 text-white', accent: 'bg-slate-blue-900 text-white' },
    'WORKSHOP': { color: 'bg-blue-500 text-white', accent: 'bg-blue-900 text-white' }
  };

  const selectedCat = (program.category || 'CREATOR') as keyof typeof categoryColors;
  const colors = categoryColors[selectedCat] || categoryColors['CREATOR'];

  const newProgram: Program = {
    id: program.id || Date.now(),
    title: program.title || 'Yeni Program',
    category: program.category || 'CREATOR',
    instructor: program.instructor || 'Eğitmen Belirtilmedi',
    lessons: program.lessons || 10,
    status: program.status || 'Aktif',
    desc: program.desc || 'Profesyonel eğitim içeriği ve sektörel pratikler.',
    tags: [program.category || 'CREATOR'],
    color: colors.color,
    accent: colors.accent,
    isFeatured: program.isFeatured || false,
    ...program
  };

  const index = programs.findIndex(p => p.id === newProgram.id);
  if (index > -1) {
    programs[index] = newProgram;
  } else {
    programs.push(newProgram);
  }

  localStorage.setItem('hypers_programs', JSON.stringify(programs));
  return programs;
};

export const deleteProgram = (id: string | number) => {
  const programs = getPrograms().filter(p => p.id !== id);
  localStorage.setItem('hypers_programs', JSON.stringify(programs));
  return programs;
};

export interface SupportRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  date: string;
  status: 'pending' | 'responded' | 'closed';
}

export const getSupportRequests = (): SupportRequest[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('hypers_support_requests');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const saveSupportRequest = (request: Partial<SupportRequest>) => {
  const requests = getSupportRequests();
  const newRequest: SupportRequest = {
    id: request.id || Date.now().toString(),
    firstName: request.firstName || '',
    lastName: request.lastName || '',
    email: request.email || '',
    phone: request.phone || '',
    category: request.category || '',
    message: request.message || '',
    date: request.date || new Date().toISOString(),
    status: request.status || 'pending'
  };
  
  const index = requests.findIndex(r => r.id === newRequest.id);
  if (index > -1) {
    requests[index] = newRequest;
  } else {
    requests.push(newRequest);
  }
  
  localStorage.setItem('hypers_support_requests', JSON.stringify(requests));
  return requests;
};

export const deleteSupportRequest = (id: string) => {
  const requests = getSupportRequests().filter(r => r.id !== id);
  localStorage.setItem('hypers_support_requests', JSON.stringify(requests));
  return requests;
};

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  createdAt: string;
}

const initialAdmins: AdminUser[] = [
  {
    id: '1',
    name: 'Sabiha Yılmaz',
    email: 'info@hypers.co',
    role: 'super_admin',
    createdAt: new Date().toISOString()
  }
];

export const getAdmins = (): AdminUser[] => {
  if (typeof window === 'undefined') return initialAdmins;
  const stored = localStorage.getItem('hypers_admins');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return initialAdmins;
    }
  }
  localStorage.setItem('hypers_admins', JSON.stringify(initialAdmins));
  return initialAdmins;
};

export const saveAdmin = (admin: Partial<AdminUser>) => {
  const admins = getAdmins();
  const newAdmin: AdminUser = {
    id: admin.id || Date.now().toString(),
    name: admin.name || '',
    email: admin.email || '',
    role: admin.role || 'admin',
    createdAt: admin.createdAt || new Date().toISOString()
  };

  const index = admins.findIndex(a => a.id === newAdmin.id);
  if (index > -1) {
    admins[index] = newAdmin;
  } else {
    admins.push(newAdmin);
  }

  localStorage.setItem('hypers_admins', JSON.stringify(admins));
  return admins;
};

export const deleteAdmin = (id: string) => {
  const admins = getAdmins().filter(a => a.id !== id);
  localStorage.setItem('hypers_admins', JSON.stringify(admins));
  return admins;
};

export const getCurrentAdmin = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;
  const auth = localStorage.getItem('admin_auth_user');
  if (auth) {
    try {
      return JSON.parse(auth);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export interface Testimonial {
  id: string | number;
  name: string;
  handle: string;
  text: string;
  img: string;
}

const initialTestimonials: Testimonial[] = [
  { id: 1, name: 'Gizem A.', handle: '@gizemakdag', text: "Kendi markamı yaratma sürecimde Hypers ekibinin vizyonu ve stratejik desteği paha biçilemezdi.", img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop' },
  { id: 2, name: 'Emre U.', handle: '@emreuzunboy', text: "İçerik üreticiliğinin bir 'iş'ten çok daha fazlası olduğunu burada öğrendim. Tam bir okul.", img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop' },
  { id: 3, name: 'Rümeysa Y.', handle: '@rumeysayagci', text: "Hypers bünyesinde olmak, doğru insanlarla doğru projelerde buluşmak demek. Community gücü harika.", img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop' },
  { id: 4, name: 'Dilara S.', handle: '@dilarasari', text: "Yeni nesil sanat ve medyanın kalbi burada atıyor. Her gün yeni bir başarı hikayesi yazıyoruz.", img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop' },
  { id: 5, name: 'Anna Deniz Ş.', handle: '@annadeniz', text: "Eğitimlerin kalitesi ve sektör profesyonelleriyle iç içe olmak inanılmaz bir avantaj sağlıyor.", img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop' },
  { id: 6, name: 'İrem T.', handle: '@iremturkoglu', text: "Yaratıcılığın sınırlarını zorladığımız, Türkiye'nin en vizyoner creator ekosistemi.", img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop' },
  { id: 7, name: 'Batu K.', handle: '@batukarabacak', text: "Oyunculuk ve içerik üretimi arasındaki köprüyü Hypers Academy ile kurdum. Muazzam bir yolculuk.", img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop' },
  { id: 8, name: 'Kaan E.', handle: '@kaaneser', text: "Global standartlarda içerik üretimi için doğru network ve bilgi kaynağı burada.", img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
];

export const getTestimonials = (): Testimonial[] => {
  if (typeof window === 'undefined') return initialTestimonials;
  const stored = localStorage.getItem('hypers_testimonials_v3');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return initialTestimonials;
    }
  }
  localStorage.setItem('hypers_testimonials_v3', JSON.stringify(initialTestimonials));
  return initialTestimonials;
};

export const saveTestimonial = (testimonial: Partial<Testimonial>) => {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    id: testimonial.id || Date.now().toString(),
    name: testimonial.name || '',
    handle: testimonial.handle || '',
    text: testimonial.text || '',
    img: testimonial.img || 'https://i.pravatar.cc/150'
  };

  const index = testimonials.findIndex(t => t.id.toString() === newTestimonial.id.toString());
  if (index > -1) {
    testimonials[index] = newTestimonial;
  } else {
    testimonials.push(newTestimonial);
  }

  localStorage.setItem('hypers_testimonials_v3', JSON.stringify(testimonials));
  return testimonials;
};

export const deleteTestimonial = (id: string | number) => {
  const testimonials = getTestimonials().filter(t => t.id.toString() !== id.toString());
  localStorage.setItem('hypers_testimonials_v3', JSON.stringify(testimonials));
  return testimonials;
};

// --- USER AUTHENTICATION ---

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  category: string;
  createdAt: string;
}

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('hypers_users');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const registerUser = (userData: Partial<User>) => {
  const users = getUsers();
  
  // E-posta kontrolü
  if (users.find(u => u.email === userData.email)) {
    throw new Error('BU E-POSTA ADRESİ ZATEN KAYITLI.');
  }

  const newUser: User = {
    id: Date.now().toString(),
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    password: userData.password || '', // Gerçek uygulamada hash'lenmelidir!
    category: userData.category || 'CREATOR',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('hypers_users', JSON.stringify(users));
  return newUser;
};

export const loginUser = (email: string, password?: string) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('E-POSTA VEYA ŞİFRE HATALI.');
  }

  // Oturum bilgilerini sakla (Şifreyi saklamıyoruz)
  const { password: _, ...userSession } = user;
  localStorage.setItem('user_auth', JSON.stringify(userSession));
  window.dispatchEvent(new Event('user_auth_updated'));
  return userSession;
};

export const getCurrentUser = (): Omit<User, 'password'> | null => {
  if (typeof window === 'undefined') return null;
  const auth = localStorage.getItem('user_auth');
  if (auth) {
    try {
      return JSON.parse(auth);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const logoutUser = () => {
  localStorage.removeItem('user_auth');
  window.dispatchEvent(new Event('user_auth_updated'));
};

// --- CART MANAGEMENT ---

export interface CartItem {
  name: string;
  price: string;
  academy: string;
}

export const addToCart = (item: CartItem) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('hypers_cart', JSON.stringify(item));
  // Dispatch event for other components to update (like Nav badge)
  window.dispatchEvent(new Event('cart_updated'));
};

export const getCart = (): CartItem | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('hypers_cart');
  return stored ? JSON.parse(stored) : null;
};

export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('hypers_cart');
  window.dispatchEvent(new Event('cart_updated'));
};

