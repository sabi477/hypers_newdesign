'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ChevronRight, ChevronDown, Send } from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  {
    title: 'Hypers Academy Hakkında',
    questions: [
      {
        q: 'Hypers Academy nedir?',
        a: 'Hypers Academy, Hypers New Media tarafından içerik üreticilerine ve içerik üreticisi olmak isteyenlere yönelik hazırlanan online eğitim platformudur. Sektör profesyonelleri ve influencerlardan oluşan eğitim müfredatı ile dijital dünyada başarılı olmanız için gerekli tüm bilgileri sunar.'
      },
      {
        q: 'Neden Hypers Academy eğitimlerine katılmalıyım?',
        a: 'Hypers Academy, sektörün en deneyimli isimlerinden oluşan eğitmen kadrosu, pratik odaklı müfredatı ve güncel içerikleri ile size gerçek dünya deneyimi sunar. Sadece teori değil, uygulanabilir stratejiler ve teknikler öğrenirsiniz.'
      },
      {
        q: 'Eğitimlerinizi tek tek satın alabilir miyim?',
        a: 'Evet, bazı eğitimlerimiz tek tek satın alınabilir. Ancak paket üyeliklerimiz daha avantajlı fiyatlar ve ekstra özellikler sunmaktadır. Detaylı bilgi için fiyatlandırma sayfamızı inceleyebilirsiniz.'
      },
      {
        q: 'Eğitimlere katılmak için belirli bir yaş sınırı var mı?',
        a: 'Eğitimlerimiz 18 yaş ve üzeri katılımcılar için tasarlanmıştır. 18 yaş altı katılımcılar için veli izni gereklidir.'
      },
      {
        q: 'Eğitimler online mı yoksa yüz yüze mi?',
        a: 'Eğitimlerimiz online platform üzerinden sunulmaktadır. İnternet bağlantısı olan her yerden eğitimlere erişebilirsiniz. Ayrıca belirli dönemlerde yüz yüze workshop programları da düzenlenmektedir.'
      }
    ]
  },
  {
    title: 'Hesap',
    questions: [
      {
        q: 'Nasıl hesap oluşturabilirim?',
        a: 'Ana sayfadaki "Kayıt Ol" butonuna tıklayarak veya kayıt sayfasına giderek kolayca hesap oluşturabilirsiniz. E-posta adresiniz ve şifrenizle kayıt işlemini tamamlayabilirsiniz.'
      },
      {
        q: 'Profilimi nasıl düzenleyebilirim?',
        a: 'Giriş yaptıktan sonra hesap ayarları bölümünden profil bilgilerinizi, fotoğrafınızı ve tercihlerinizi güncelleyebilirsiniz.'
      },
      {
        q: 'Hesap şifremi nasıl değişebilirim?',
        a: 'Hesap ayarları bölümünden "Şifre Değiştir" seçeneğine tıklayarak mevcut şifrenizi yeni bir şifre ile değiştirebilirsiniz.'
      },
      {
        q: 'Şifremi unuttum. Nasıl yenileyebilirim?',
        a: 'Giriş sayfasındaki "Şifremi Unuttum" linkine tıklayarak e-posta adresinize şifre sıfırlama bağlantısı gönderebilirsiniz.'
      },
      {
        q: 'Fatura bilgilerime nasıl ulaşabilirim?',
        a: 'Hesap ayarları bölümünden "Faturalarım" sekmesine giderek tüm fatura bilgilerinize ve indirilebilir faturalarınıza ulaşabilirsiniz.'
      },
      {
        q: 'Hesabınıza kart ekleme ve kartları silme işlemleri nasıl yapılır?',
        a: 'Hesap ayarları bölümünden "Ödeme Yöntemleri" sekmesine giderek yeni kart ekleyebilir veya mevcut kartlarınızı silebilirsiniz.'
      },
      {
        q: 'Dil seçimlerini değiştirmek için bir özellik var mı?',
        a: 'Şu anda platform Türkçe dilinde hizmet vermektedir. Gelecekte farklı dil seçenekleri eklenecektir.'
      },
      {
        q: 'İletişim izinlerime nerden girebilirim?',
        a: 'Hesap ayarları bölümünden "Bildirimler ve İletişim" sekmesine giderek e-posta ve SMS bildirim tercihlerinizi yönetebilirsiniz.'
      },
      {
        q: 'Hesabımı nasıl silebilirim?',
        a: 'Hesap ayarları bölümünden "Hesabı Sil" seçeneğine giderek hesabınızı kalıcı olarak silebilirsiniz. Bu işlem geri alınamaz.'
      }
    ]
  },
  {
    title: 'Dersler Hakkında',
    questions: [
      {
        q: 'Eğitimler yüz yüze mi yoksa online mı işleniyor?',
        a: 'Eğitimlerimiz online platform üzerinden sunulmaktadır. İstediğiniz zaman, istediğiniz yerden eğitimlere erişebilirsiniz.'
      },
      {
        q: 'Eğitim videolarını indirebilir miyim?',
        a: 'Eğitim videoları platform üzerinden izlenebilir ancak telif hakları nedeniyle indirme özelliği bulunmamaktadır.'
      },
      {
        q: 'Eğitimle ilgili sorularım için nasıl iletişime geçebilirim?',
        a: 'Eğitim sayfalarındaki yorum bölümünden veya destek sayfamızdaki iletişim formunu kullanarak sorularınızı iletebilirsiniz.'
      },
      {
        q: 'Eğitimi ne kadar sürede tamamlamam gerekiyor?',
        a: 'Eğitimlerin tamamlanma süresi eğitimin içeriğine göre değişmektedir. Her eğitim için önerilen süre eğitim sayfasında belirtilmiştir. Üyelik paketiniz süresince eğitimlere erişebilirsiniz.'
      },
      {
        q: 'Eğitim videolarını kaldığım yerden izleyebilir miyim?',
        a: 'Evet, platform otomatik olarak kaldığınız yeri kaydeder ve bir sonraki girişinizde kaldığınız yerden devam edebilirsiniz.'
      },
      {
        q: 'Üyelik paketim bitiş tarihinden sonra yenilenecek mi?',
        a: 'Üyelik paketiniz otomatik olarak yenilenmez. Paket süreniz dolmadan önce yenileme yaparak eğitimlere erişiminizi sürdürebilirsiniz.'
      },
      {
        q: 'Eğitimleri kim veriyor?',
        a: 'Eğitimlerimiz sektörün önde gelen profesyonelleri, influencerlar ve uzman eğitmenler tarafından verilmektedir. Eğitmenler sayfasından detaylı bilgi alabilirsiniz.'
      },
      {
        q: 'Eğitmenler ile ilgili bilgileri nereden bulabilirim?',
        a: 'Ana menüden "Eğitmenler" bölümüne giderek tüm eğitmenlerimizin profillerini, deneyimlerini ve verdikleri eğitimleri inceleyebilirsiniz.'
      }
    ]
  },
  {
    title: 'Ödeme',
    questions: [
      {
        q: 'Satın alma işlemini iptal edebilir miyim?',
        a: 'Satın alma işleminizi iptal etmek için destek ekibimizle iletişime geçebilirsiniz. İptal koşulları paket türüne göre değişiklik göstermektedir.'
      },
      {
        q: 'Ödeme geçmişimi nasıl görüntüleyebilirim?',
        a: 'Hesap ayarları bölümünden "Ödeme Geçmişi" sekmesine giderek tüm ödeme işlemlerinizi görüntüleyebilir ve faturalarınızı indirebilirsiniz.'
      },
      {
        q: 'Ödeme ile ilgili sorularım var, ne yapmam gerek?',
        a: 'Ödeme ile ilgili sorularınız için destek sayfamızdaki iletişim formunu kullanarak veya info@hypers.co adresine e-posta göndererek bizimle iletişime geçebilirsiniz.'
      }
    ]
  },
  {
    title: 'İletişim',
    questions: [
      {
        q: 'Hangi tarayıcılar destekleniyor?',
        a: 'Platform Chrome, Firefox, Safari ve Edge tarayıcılarının güncel sürümlerinde en iyi şekilde çalışmaktadır. En iyi deneyim için tarayıcınızı güncel tutmanızı öneririz.'
      }
    ]
  }
];

export default function SupportPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Form gönderme işlemi burada yapılacak
    alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-black dark:text-white pt-32 px-12 md:px-24 lg:px-40 pb-20 transition-colors duration-300">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-12 opacity-30 text-[9px] font-bold tracking-widest uppercase">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Anasayfa</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black dark:text-white">Destek</span>
      </div>

      {/* Sayfa Başlığı */}
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">Destek</h1>
        <p className="text-sm opacity-40 max-w-md uppercase tracking-widest font-bold text-[10px]">Sorularınız için buradayız.</p>
      </div>

      {/* Sorunu Bize İlet Formu */}
      <div className="mb-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black tracking-tighter uppercase mb-8">Sorunu Bize İlet</h2>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#111111] p-10 md:p-16 rounded-[3rem] border border-black/5 dark:border-white/5 shadow-xl"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black tracking-widest uppercase opacity-30 px-2">Ad Soyad</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ADINIZ VE SOYADINIZ"
                    required
                    className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-xl px-4 py-4 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black tracking-widest uppercase opacity-30 px-2">E-Posta</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="E-POSTA ADRESİNİZ"
                    required
                    className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-xl px-4 py-4 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black tracking-widest uppercase opacity-30 px-2">Konu</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="KONU BAŞLIĞI"
                  required
                  className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-xl px-4 py-4 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black tracking-widest uppercase opacity-30 px-2">Mesajınız</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="MESAJINIZI BURAYA YAZIN..."
                  required
                  rows={6}
                  className="w-full bg-gray-50 dark:bg-black/20 border-none rounded-xl px-4 py-4 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="group w-full bg-[#CCFF00] text-black py-5 rounded-2xl font-black tracking-[0.2em] uppercase text-xs hover:scale-[1.02] transition-all shadow-xl shadow-[#CCFF00]/10 flex items-center justify-center gap-4 mt-4"
              >
                Gönder
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Sık Sorulan Sorular */}
      <div className="mb-32">
        <h2 className="text-3xl font-black tracking-tighter uppercase mb-12">Sık Sorulan Sorular</h2>
        
        <div className="space-y-4">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white dark:bg-[#111111] rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden"
            >
              {/* Kategori Başlığı */}
              <button
                onClick={() => setOpenCategory(openCategory === category.title ? null : category.title)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <h3 className="text-xl font-black tracking-tighter uppercase">{category.title}</h3>
                {openCategory === category.title ? (
                  <ChevronDown className="w-5 h-5 rotate-180 transition-transform" />
                ) : (
                  <ChevronDown className="w-5 h-5 transition-transform" />
                )}
              </button>

              {/* Sorular */}
              {openCategory === category.title && (
                <div className="border-t border-black/5 dark:border-white/5">
                  {category.questions.map((faq, questionIndex) => (
                    <div key={questionIndex} className="border-b border-black/5 dark:border-white/5 last:border-b-0">
                      <button
                        onClick={() => setOpenQuestion(openQuestion === `${category.title}-${questionIndex}` ? null : `${category.title}-${questionIndex}`)}
                        className="w-full flex items-start justify-between p-6 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors gap-4"
                      >
                        <span className="text-base font-bold tracking-tight flex-1">{faq.q}</span>
                        {openQuestion === `${category.title}-${questionIndex}` ? (
                          <ChevronDown className="w-4 h-4 rotate-180 transition-transform flex-shrink-0 mt-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 transition-transform flex-shrink-0 mt-1" />
                        )}
                      </button>
                      {openQuestion === `${category.title}-${questionIndex}` && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-sm font-medium opacity-70 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

