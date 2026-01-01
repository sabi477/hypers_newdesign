import type { Metadata } from 'next';
import './globals.css';
import ImageProtection from '@/components/ImageProtection';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Hypers Academy',
  description: 'Yarat. Paylaş. Yönet.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="overflow-x-hidden">
      <body className="overflow-x-hidden">
        <ScrollToTop />
        <ImageProtection />
        {children}
      </body>
    </html>
  );
}


