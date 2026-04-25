'use client';

import React from 'react';
import Image from 'next/image';
import VenueCard from '@/components//VenueCard';
import VenueGallery from '@/components/VenueGallery';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/app/context/LanguageContext';


const VenuePage = () => {
  const { t } = useLanguage();
  const featureIcons = [
    "/images/icons/build-white.png",
    "/images/icons/group-white.png",
    "/images/icons/leaf-white.png"
  ];

  const contactIcons = [
    "/images/icons/clock-white.png",
    "/images/icons/handshake-white.png",
    "/images/icons/star-white.png"
  ];

  return (
    <main className="w-full min-h-screen">
      
      {/*HERO SECTION*/}
      <section className="relative h-screen w-full overflow-hidden">
  
        {/* --- Background Image --- */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/venue/venue-hero.webp" 
            alt="Tembi Venue Background" 
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* --- Hero Content --- */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-center">
      
          {/* Main Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4">
            <span className="text-white">{t.venue.hero.title[0]}</span> <br />
            <span className="text-[#96A66D]">{t.venue.hero.title[1]}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white text-xl sm:text-2xl mb-2 font-light tracking-wide">
            {t.venue.hero.subtitle}
          </p>

          {/* Quote / Tagline (Green) */}
          <p className="text-[#96A66D] text-lg sm:text-xl mb-8 font-medium">
            {t.venue.hero.quote}
          </p>

          {/* Description */}
          <div className="max-w-3xl text-gray-200 text-base sm:text-lg leading-relaxed mb-10">
            <p>{t.venue.hero.desc}</p>
          </div>

          {/* CTA Button */}
          <div>
            <button className="flex items-center gap-3 bg-[#8F9F6A] hover:bg-[#7d8c5c] text-white px-8 py-3.5 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <div className="relative w-5 h-5">
              <Image 
                src="/images/icons/calendar-white.png"
                alt="Calendar"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-semibold tracking-wide">{t.venue.hero.buttonText}</span>
          </button>
          </div>

        </div>
      </section>

      {/*FEATURES SECTION*/}
      <section className="py-24 bg-[#F9F9F0]">
        <div className="container mx-auto px-6">
          
          <ScrollReveal animation="fadeUp" duration={800}>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif text-[#2C2420]">
                {t.venue.features.title}
              </h2>
              <p className="text-[#5C5C5C] max-w-2xl mx-auto text-lg leading-relaxed">
                {t.venue.features.desc}
              </p>
            </div>
          </ScrollReveal>

          {/* Cards Grid (Dynamic Mapping) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.venue.features.item.map((feature, idx) => (
               <ScrollReveal key={idx} animation="fadeUp" delay={idx * 150} duration={800}>
                 <FeatureCard 
                   iconSrc={featureIcons[idx]} // Ambil icon berdasarkan index
                   title={feature.title}
                   description={feature.description}
                 />
               </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/*VENUE COLLECTION GRID*/}
      <section className="py-20 bg-[#FFFDF5]">
        <div className="container mx-auto px-6">
          
          <ScrollReveal animation="fadeUp" duration={800}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-[#2C2420] mb-4">
                {t.venue.gallery.title}
              </h2>
              <p className="text-[#5C5C5C] max-w-2xl mx-auto">
                {t.venue.gallery.desc}
              </p>
            </div>
          </ScrollReveal>

          {/* Loop Data Venue dari Context (t.venue.items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {t.venue.items.map((venue, idx) => (
              <ScrollReveal key={venue.slug} animation="fadeUp" delay={idx * 150} duration={800}>
                <Link href={`/venue/${venue.slug}`} className="group block h-full">
                  <VenueCard 
                    imageSrc={venue.heroImage}
                    title={venue.title}
                    description={venue.shortDescription}
                    capacity={venue.capacity}
                    facilities={venue.facilities}
                  />
                </Link>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/*GALLERY COMPONENT*/}
      {/* Jika VenueGallery perlu diterjemahkan juga, pastikan Anda mengupdate file tersebut secara terpisah */}
      <VenueGallery />
    
      {/*CONTACT / CTA SECTION*/}
      <section className="w-full bg-[#8F9F6A] py-20 px-6 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          
          {/* --- Heading & Description --- */}
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
             {t.venue.contact.title[0]} <br className="hidden md:block" />
             {t.venue.contact.title[1]}
          </h2>
          
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10">
            {t.venue.contact.desc}
          </p>

          {/* --- Button Hubungi Tim Kami --- */}
          <div className="mb-16">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#8F9F6A] transition-colors duration-300 font-semibold"
            >
              <div className="relative w-5 h-5">
                <Image 
                  src="/images/icons/phone-white.png" 
                  alt="Phone" 
                  width={20} 
                  height={20}
                  className="object-contain"
                />
              </div>
              <span>{t.venue.contact.button}</span>
            </Link>
          </div>

          {/* --- Features Grid (3 Cards Dynamic) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {t.venue.contact.item.map((item, idx) => (
               <div key={idx} className="bg-white/10 border border-white/20 rounded-xl p-8 flex flex-col items-center hover:bg-white/20 transition-colors">
                 <div className="mb-4 relative w-10 h-10">
                   <Image 
                     src={contactIcons[idx]}
                     alt={item.title} 
                     width={40} 
                     height={40}
                     className="object-contain"
                   />
                 </div>
                 <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                 <p className="text-white/80 text-sm">
                   {item.desc}
                 </p>
               </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
};

// --- Komponen FeatureCard Diperbarui ---
interface FeatureCardProps {
  iconSrc: string;
  title: string;
  description: string;
}

const FeatureCard = ({ iconSrc, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-[#FFFDF5] p-10 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center border border-[#EBEBE0]">
      
      {/* Lingkaran Hijau Pembungkus Icon */}
      <div className="w-16 h-16 rounded-full bg-[#8FA876] flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
        
        {/* Container Gambar (Agar ukurannya proporsional di dalam lingkaran) */}
        <div className="relative w-8 h-8"> 
          <Image
            src={iconSrc}
            alt={title}
            fill
            className="object-contain" // Agar gambar tidak terpotong/gepeng
          />
        </div>

      </div>
      
      <h3 className="text-xl font-serif text-[#2C2420] mb-3 font-semibold">
        {title}
      </h3>
      <p className="text-[#6B6B6B] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default VenuePage;