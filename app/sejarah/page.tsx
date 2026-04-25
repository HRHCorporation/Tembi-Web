'use client';
import React from 'react';
import Image from 'next/image';
import SpacesSection from '@/components/SpacesSection';
import { useLanguage } from '@/app/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function SejarahPage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen w-full bg-[#FDFBF7]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/sejarah/history-hero.webp"
            alt="Tembi Historical Home Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        </div>

        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-screen-xl mx-auto">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
              {t.history.hero.title[0]} <br />
              {t.history.hero.title[1]}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl border-l-2 border-transparent pl-1">
              {t.history.hero.subtitle}
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <a href="#our-story" className="animate-bounce cursor-pointer p-2 block">
             <Image
                src="/images/icons/arrow-down-white.png"
                alt="Scroll Down"
                width={16}
                height={16}
                className="brightness-0 invert drop-shadow-md"
             />
          </a>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- KOLOM KIRI: TEKS --- */}
          <ScrollReveal animation="slideLeft" duration={800}>
            <div className="order-2 lg:order-1">
              <span className="block text-sm font-bold tracking-widest text-[#9CA389] uppercase mb-4">
                {t.history.intro.head}
              </span>
              
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4A3B2A] mb-8 leading-tight">
                {t.history.intro.title[0]} <br />
                {t.history.intro.title[1]} <br />
                {t.history.intro.title[2]}
              </h2>

              <div className="text-gray-600 space-y-6 text-lg leading-relaxed font-light mb-10 text-justify">
              <p>
                {t.history.intro.subtitle[0]}
              </p>
              <p>
                {t.history.intro.subtitle[1]}
              </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
              <div>
                <h3 className="text-3xl font-serif font-bold text-[#9CA389]">25+</h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">{t.history.intro.item[0]}</p>
              </div>
              <div>
                <h3 className="text-3xl font-serif font-bold text-[#9CA389]">100+</h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">{t.history.intro.item[1]}</p>
              </div>
              <div>
                <h3 className="text-3xl font-serif font-bold text-[#9CA389]">5k+</h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">{t.history.intro.item[2]}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* --- KOLOM KANAN: GAMBAR & DEKORASI --- */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#Fdf5e6] rounded-full -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#Eef0eb] rounded-[2rem] -z-10" />

            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl">
               <Image 
                 src="/images/sejarah/history1.webp"
                 alt="Tembi Interior Javanese Style"
                 fill
                 className="object-cover hover:scale-105 transition-transform duration-700"
               />
            </div>
          </div>

        </div>
      </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/*KOLOM KIRI: FOTO 1*/}
          <div className="lg:col-span-3 order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[280px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/sejarah/sejarah2.webp" 
                  alt="Pollycarpus Swantoro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
          </div>

          {/*KOLOM TENGAH: TEKS*/}
          <div className="lg:col-span-6 order-1 lg:order-2 text-center lg:px-4">
            <ScrollReveal animation="fadeUp" duration={800} delay={200}>

              <span className="block text-sm font-bold tracking-widest text-[#9CA389] uppercase mb-4">
                {t.history.founder.head}
              </span>

              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4A3B2A] mb-8 leading-tight">
                {t.history.founder.title[0]} <br />
                {t.history.founder.title[1]}
              </h2>

              <div className="text-gray-600 space-y-6 text-lg leading-relaxed font-light text-justify">
                <p>
                  {t.history.founder.desc1[0]} <strong>{t.history.founder.desc1[1]}</strong> {t.history.founder.desc1[2]}
                </p>
                <p>
                  {t.history.founder.desc2[0]} <strong>{t.history.founder.desc2[1]}</strong> {t.history.founder.desc2[2]}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/*KOLOM KANAN: FOTO 2*/}
          <div className="lg:col-span-3 order-3 lg:order-3 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/sejarah/sejarah3.webp"
                  alt="Norbertus Nuranto"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
          </div>
        </div>
      </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-[#F8F6F1]">
      <div className="max-w-screen-xl mx-auto">
        
        {/*HEADER*/}
        <ScrollReveal animation="fadeUp" duration={800}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-sm font-bold tracking-widest text-[#9CA389] uppercase mb-4">
              {t.history.living.head}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4A3B2A] mb-6">
              {t.history.living.title}
            </h2>
            <p className="text-gray-600 text-lg font-light leading-relaxed">
              {t.history.living.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/*CARDS GRID*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <ScrollReveal animation="scaleUp" duration={700} delay={100}>
            <CultureCard 
              title="Batik Artistry"
              imageSrc="/images/sejarah/sejarah4.webp"
              desc="Learn the ancient art of batik-making from master craftsmen. Create your own masterpiece while understanding the symbolic meanings behind traditional patterns."
              iconSrc="/images/icons/brush-green.png" 
            />
          </ScrollReveal>
          <ScrollReveal animation="scaleUp" duration={700} delay={200}>
            <CultureCard 
              title="Classical Dance"
              imageSrc="/images/sejarah/sejarah5.webp"
              desc="Experience the grace and philosophy of Javanese classical dance. Our instructors share not just movements, but the spiritual essence of this ancient art form."
              iconSrc="/images/icons/music-green.png"
            />
          </ScrollReveal>
          <ScrollReveal animation="scaleUp" duration={700} delay={300}>
            <CultureCard 
              title="Gamelan & Macapat"
              imageSrc="/images/sejarah/sejarah6.webp"
              desc="Immerse yourself in the harmonious sounds of gamelan and the poetic beauty of macapat singing. These sessions connect you to the soul of Javanese expression."
              iconSrc="/images/icons/drum-green.png"
            />
          </ScrollReveal>
        </div>

        {/* --- PHILOSOPHY BOX --- */}
        <ScrollReveal animation="fadeUp" duration={800}>
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#4A3B2A] mb-6">
                {t.history.living.title2}
              </h3>
              <div className="text-gray-600 space-y-5 font-light leading-relaxed mb-8 text-justify">
                <p>
                  {t.history.living.desc[0]}
                </p>
                <p>
                  {t.history.living.desc[1]}
                </p>
              </div>

              {/* Stats Box */}
              <div className="flex gap-4">
                <div className="bg-[#F8F6F1] rounded-xl p-4 w-52 text-center">
                  <span className="block text-2xl font-serif font-bold text-[#9CA389]">15+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{t.history.living.item[0]}</span>
                </div>
                <div className="bg-[#F8F6F1] rounded-xl p-4 w-52 text-center">
                  <span className="block text-2xl font-serif font-bold text-[#9CA389]">200+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{t.history.living.item[1]}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden">
                <Image 
                  src="/images/sejarah/sejarah7.webp"
                  alt="Cultural Activities Group"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Icon Hati Floating */}
              <div className="absolute -bottom-4 -right-4 bg-[#9CA389] p-4 rounded-xl shadow-lg flex items-center justify-center">
                 <div className="relative w-6 h-6">
                   <Image 
                      src="/images/icons/heart-white.png"
                      alt="Love Culture"
                      fill
                      // Gunakan filter jika icon aslinya hitam, hapus jika sudah putih
                      className="object-contain brightness-0 invert" 
                   />
                 </div>
              </div>
            </div>

            </div>
          </div>

        </ScrollReveal>

      </div>
      </section>

      <SpacesSection />

      <section className="relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/sejarah/sejarahcover2.webp"
          alt="Tembi Atmosphere"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-tembi mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto text-center">
        
        <h2 className="text-3xl md:text-7xl font-serif font-bold text-white mb-6 md:leading-[0.8] drop-shadow-lg">
          {t.history.contact.title[0]} <br className="hidden md:block" />
          {t.history.contact.title[1]}
        </h2>

        <p className="text-gray-200 text-lg font-light max-w-3xl mx-auto mb-16 leading-relaxed">
          {t.history.contact.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <ContactCard 
            title={t.history.contact.itemTitle[0]}
            desc={t.history.contact.itemDesc[0]}
            iconSrc="/images/icons/phone-white.png"
          />
          <ContactCard 
            title={t.history.contact.itemTitle[1]}
            desc={t.history.contact.itemDesc[1]}
            iconSrc="/images/icons/mail-white.png"
          />
          <ContactCard 
            title={t.history.contact.itemTitle[2]}
            desc={t.history.contact.itemDesc[2]}
            iconSrc="/images/icons/location-white.png"
          />
        </div>

      </div>
      </section>
    </main>
  );
}

interface CultureCardProps {
  title: string;
  desc: string;
  imageSrc: string;
  iconSrc: string;
}

const CultureCard: React.FC<CultureCardProps> = ({ title, desc, imageSrc, iconSrc }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
    {/* Gambar Atas */}
    <div className="relative w-full h-56">
      <Image 
        src={imageSrc} 
        alt={title} 
        fill 
        className="object-cover"
      />
    </div>
    {/* Konten Bawah */}
    <div className="p-8 flex-1 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-6 h-6">
           <Image 
             src={iconSrc}
             alt={`${title} Icon`}
             fill
             className="object-contain"
           />
        </div>
        <h3 className="text-xl font-serif font-bold text-[#4A3B2A]">{title}</h3>
      </div>
      <p className="text-gray-600 font-light leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  </div>
);

interface ContactCardProps {
  title: string;
  desc: string;
  iconSrc: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ title, desc, iconSrc }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-start text-left hover:bg-white/20 transition-all duration-300">
    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
      <div className="relative w-6 h-6">
        <Image 
          src={iconSrc} 
          alt={title} 
          fill 
          className="object-contain brightness-0 invert" 
        />
      </div>
    </div>
    
    <h3 className="text-xl font-serif font-bold text-white mb-3">
      {title}
    </h3>
    <p className="text-sm text-gray-200 font-light leading-relaxed">
      {desc}
    </p>
  </div>
);