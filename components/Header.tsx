// app/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import Link from 'next/link';

export default function Header() { 
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.house, href: '/rooms' },
    { name: t.nav.foods, href: '/catering' },
    { name: t.nav.venue, href: '/venue' },
    { name: t.nav.history, href: '/sejarah' },
    { name: t.nav.collections, href: '/collections' },
    { name: t.nav.checkBooking, href: '/check-booking' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-white text-black h-16 shadow-sm">
        <div className="container mx-auto px-6 py-2 h-[64px]" /> 
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white text-black shadow-sm">
        {/* PERUBAHAN 1: py-4 diubah menjadi py-2 agar atas bawah lebih rapat */}
        <div className="container mx-auto px-6 py-2 grid grid-cols-3 items-center">
          
          {/* Kiri: Hamburger Menu */}
          <div className="justify-self-start flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2">
              <Menu size={24} />
            </button>
          </div>

          {/* Tengah: Logo */}
          <Link href="/" className="mx-auto"> 
            <div className="text-center bg-[url(/images/logo-tembi.png)] bg-contain bg-center bg-no-repeat h-12 w-48 cursor-pointer">
              <h1 className="text-xl font-bold font-serif opacity-0">Tembi</h1>
            </div>
          </Link>

          {/* Kanan: Language Switcher & Button */}
          <div className="justify-self-end flex items-center gap-4">
            <Link 
              href="/booking" 
              className="hidden md:inline-block bg-tembi hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-md transition-colors"
            >
              {t.nav.book}
            </Link>
            
            <button 
                onClick={toggleLanguage} 
                className="flex items-center gap-2 text-sm font-medium hover:text-tembi transition-colors"
            >
                <Globe size={18} />
                <span className={language === 'en' ? 'font-bold' : 'font-normal'}>EN</span>
                <span className="text-gray-300">|</span>
                <span className={language === 'id' ? 'font-bold' : 'font-normal'}>ID</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Sidebar & WhatsApp button tetap sama */}
      <div onClick={() => setSidebarOpen(false)} className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white text-slate-800 z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-2"><X size={24} /></button>
        </div>
        <nav className="p-6">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-lg text-slate-800 hover:text-tembi transition-colors"
                onClick={() => setSidebarOpen(false)}
                >
                {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <Link
          href="https://wa.me/6282225142729?text=Halo,%20saya%20tertarik%20untuk%20bertanya%20mengenai%20Tembi%20Historical%20Home"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-8 h-8"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
      </Link>
    </>
  );
};
