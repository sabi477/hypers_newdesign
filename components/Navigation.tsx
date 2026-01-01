'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from './FloatingNav';
import HeroSection from './HeroSection';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  activeCategory?: string;
  setActiveCategory?: (category: string) => void;
}

export default function Navigation({ activeCategory: externalCategory, setActiveCategory: externalSetCategory }: NavigationProps = {}) {
  const pathname = usePathname();
  const [internalCategory, setInternalCategory] = useState('');

  useEffect(() => {
    if (pathname === '/') {
      setInternalCategory('');
    } else if (pathname === '/programlar/icerik-ureticiligi') {
      setInternalCategory('CREATOR ACADEMY');
    } else if (pathname === '/programlar/muzik') {
      setInternalCategory('MUSIC ACADEMY');
    } else if (pathname === '/programlar/oyunculuk') {
      setInternalCategory('ACTING ACADEMY');
    } else if (pathname === '/programlar/workshop') {
      setInternalCategory('WORKSHOP SERIES');
    }
  }, [pathname]);
  
  const activeCategory = externalCategory ?? internalCategory;
  const setActiveCategory = externalSetCategory ?? setInternalCategory;
  
  const academyData: { [key: string]: { title: string } } = {
    'CREATOR ACADEMY': { title: 'creator academy' },
    'MUSIC ACADEMY': { title: 'music academy' },
    'ACTING ACADEMY': { title: 'acting academy' },
    'WORKSHOP SERIES': { title: 'workshop series' },
    '': { title: '' }
  };

  // Safe access to academy data
  const currentAcademy = academyData[activeCategory] || academyData[''];

  const mainSubItems = [
    'Hakkımızda',
    'Programlar',
    'Eğitmenler',
    'Fiyatlandırma'
  ];

  const [isHovered, setIsHoveredState] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const setIsHovered = (state: boolean) => {
    if (state) {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      setIsHoveredState(true);
    } else {
      hoverTimer.current = setTimeout(() => {
        setIsHoveredState(false);
      }, 30);
    }
  };

  return (
    <>
      <Navbar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        setIsHovered={setIsHovered}
        isHovered={isHovered}
      />
      <HeroSection 
        title={currentAcademy.title} 
        subItems={mainSubItems}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        activeCategory={activeCategory}
      />
    </>
  );
}
