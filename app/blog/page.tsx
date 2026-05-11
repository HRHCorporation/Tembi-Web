'use client';

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { BlogCard } from '@/components/BlogCard';

export default function BlogPage() {
  const { t } = useLanguage();

  const blogPosts = [
    {
      id: "1",
      slug: "tips-memilih-venue-pernikahan",
      title: "Tips Memilih Venue Pernikahan",
      excerpt: "Pelajari cara memilih tempat terbaik untuk acara spesial Anda agar momen sakral menjadi tak terlupakan...",
      category: "Tips",
      date: "01 Mei 2026",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "2",
      slug: "arsitektur-rumah-budaya-tembi",
      title: "Mengenal Arsitektur Rumah Budaya Tembi",
      excerpt: "Jelajahi keunikan desain tradisional Jawa yang tetap terjaga dan penuh filosofi di setiap sudutnya...",
      category: "Budaya",
      date: "28 April 2026",
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "3",
      slug: "kuliner-tradisional-wajib-dicoba",
      title: "Kuliner Tradisional yang Wajib Dicoba",
      excerpt: "Sajian autentik dari dapur Tembi yang membawa Anda bernostalgia dengan cita rasa masa lalu...",
      category: "Kuliner",
      date: "15 April 2026",
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    /* Background Krem ala Venue Rental */
    <div className="min-h-screen bg-[#fdfcf7] pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section dengan Gaya Heritage */}
        <header className="mb-20 text-center relative">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#8da077]/40"></div>
            <span className="text-[#8da077] font-bold text-[10px] tracking-[0.4em] uppercase">Tembi Stories</span>
            <div className="h-[1px] w-12 bg-[#8da077]/40"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-serif text-[#2d3436] mb-8 tracking-tight">
            Blog Tembi
          </h1>
          
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg font-light italic">
            Temukan inspirasi seputar budaya Jawa, keindahan arsitektur, dan tips spesial untuk momen berharga Anda.
          </p>
        </header>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              readMoreText={t.nav.readMore || "BACA SELENGKAPNYA"}  
            />
          ))}
        </div>
      </div>
    </div>
  );
}