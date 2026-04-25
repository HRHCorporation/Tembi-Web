'use client';

import React from 'react';
import Image from 'next/image';

const VenueGallery = () => {
  // Data dummy gambar (Bisa ditambah hingga 8 atau 12 item agar barisnya penuh)
  const galleryItems = [
    { id: 1, src: "/images/venue/venue-hero.webp", alt: "Pendopo Utama" },
    { id: 2, src: "/images/venue/amphiteater/amphiteater1.webp", alt: "Wedding Setup" },
    { id: 3, src: "/images/venue/bulus/bulus1.webp", alt: "Garden View" },
    { id: 4, src: "/images/venue/madyosuro/madyosuro1.webp", alt: "Amphitheater" },
    { id: 5, src: "/images/venue/mrican/mrican1.webp", alt: "Bale Santai" },
    { id: 6, src: "/images/venue/pendopo/pendopo1.webp", alt: "Meeting Room" },
    { id: 7, src: "/images/venue/sagan/sagan1.webp", alt: "Swimming Pool" },
    { id: 8, src: "/images/venue/pendopo/pendopo2.webp", alt: "Restaurant Area" },
  ];

  return (
    <section className="w-full bg-[#FDFDF7] py-20 px-6 sm:px-8">
      <div className="mx-auto max-w-[1400px]"> {/* Container diperlebar agar 4 kolom muat lega */}
        
        {/* --- Header Section --- */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#4A3B32] mb-4">
            Galeri Venue
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
            Lihat keindahan dan keanggunan venue kami lewat galeri foto yang sudah 
            kami pilih khusus untuk anda
          </p>
        </div>

        {/* --- Gallery Grid (4 Kolom) --- */}
        {/* Perubahan: lg:grid-cols-4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VenueGallery;