'use client';

import React from 'react';
import Image from 'next/image';
import MenuCard from '@/components/MenuCard';
import BuffetPricing, { PackageItem } from '@/components/BuffetPricing';
import BuffetFeatures from '@/components/BuffetFeatures';
import BuffetBooking from '@/components/BuffetBooking';
import { useLanguage } from '@/app/context/LanguageContext';



export default function BuffetPage() {
  const { t } = useLanguage();

  const packages: PackageItem[] = [
    {
      ...t.catering.rice.card1,
      theme: 'standard', // Theme tetap hardcoded karena berkaitan dengan styling CSS/Logic warna
      isPopular: false,
    },
    {
      ...t.catering.rice.card2,
      theme: 'premium',
      isPopular: true,
    },
    {
      ...t.catering.rice.card3,
      theme: 'exclusive',
      isPopular: false,
    }
  ];

  const menuList = [
    t.catering.riceMenu.menuCard1,
    t.catering.riceMenu.menuCard2,
    t.catering.riceMenu.menuCard3,
    t.catering.riceMenu.menuCard4,
  ];
  return (
    <main className="min-h-screen w-full bg-white">
      
      {/*HERO SECTION*/}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/foods/buffet-bg.webp"
            alt="Buffet Catering Background"
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl">
            
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#96A66D] px-4 py-1.5 text-sm font-medium text-white shadow-sm">
              <div className="relative h-4 w-4">
                <Image 
                  src="/images/icons/food-white.png" 
                  alt="Service Icon"
                  fill
                  className="object-contain brightness-0 invert" 
                />
              </div>
              <span>{t.catering.hero.label}</span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-5xl font-bold text-white md:text-7xl drop-shadow-sm mb-6 leading-tight">
              {t.catering.hero.titleRice}
            </h1>

            {/* Description */}
            <p className="mb-8 text-lg text-white/90 md:text-xl leading-relaxed max-w-2xl">
              {t.catering.hero.descRice}
            </p>

            {/* Info Pills */}
            <div className="mb-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-full bg-white/20 px-5 py-2.5 text-white backdrop-blur-md border border-white/10 transition hover:bg-white/30">
                <div className="relative h-5 w-5">
                  <Image src="/images/icons/group-green.png" alt="Pax Icon" fill className="object-contain" />
                </div>
                <span className="font-medium">{t.catering.hero.pax}</span>
              </div>

              <div className="flex items-center gap-3 rounded-full bg-white/20 px-5 py-2.5 text-white backdrop-blur-md border border-white/10 transition hover:bg-white/30">
                <div className="relative h-5 w-5">
                  <Image src="/images/icons/clock-green.png" alt="Time Icon" fill className="object-contain" />
                </div>
                <span className="font-medium">{t.catering.hero.hour}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group flex items-center gap-3 rounded-full bg-[#96A66D] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#849260] hover:shadow-lg hover:-translate-y-0.5">
              {t.catering.hero.buttonText}
              <div className="relative h-4 w-4 transition-transform group-hover:translate-y-1">
                <Image src="/images/icons/down-arrow-white.png" alt="Arrow" fill className="object-contain brightness-0 invert" />
              </div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
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
      {/*HERITAGE SECTION (Content)*/}
      <section id="our-story" className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left: Text */}
          <div>
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-[#96A66D]">
              {t.catering.intro.label}
            </span>
            <h2 className="mb-6 font-serif text-4xl font-bold leading-tight text-[#4A3B32] lg:text-5xl">
              {t.catering.intro.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              {t.catering.intro.desc}
            </p>

            <div className="flex gap-16">
              <div>
                <h3 className="font-serif text-4xl font-bold text-[#96A66D]">{t.catering.intro.stats1.num}</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">{t.catering.intro.stats1.desc}</p>
              </div>
              <div>
                <h3 className="font-serif text-4xl font-bold text-[#96A66D]">{t.catering.intro.stats2.num}</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">{t.catering.intro.stats2.desc}</p>
              </div>
            </div>
          </div>

          {/* Right: Gallery Grid */}
          <div className="relative">
            {/* Dekorasi Bulatan */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#E8E6D9]/50" />
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[#E8E6D9]/50" />

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-md lg:h-56">
                <Image 
                  src="/images/foods/buffetcontent1.webp" alt="Chef" fill 
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative mt-8 h-48 w-full overflow-hidden rounded-xl shadow-md lg:h-56">
                <Image 
                  src="/images/foods/buffetcontent2.webp" alt="Interior" fill 
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-md lg:h-56">
                <Image 
                  src="/images/foods/buffetcontent3.webp" alt="Spices" fill 
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative mt-8 h-48 w-full overflow-hidden rounded-xl shadow-md lg:h-56">
                <Image 
                  src="/images/foods/buffetcontent4.webp" alt="Dining" fill 
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* MENU SECTION (Cards)*/}
      <section className="bg-[#F9F8F3] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-[#96A66D]">
              {t.catering.riceMenu.label}
            </span>
            <h2 className="mb-6 font-serif text-4xl font-bold text-[#4A3B32] lg:text-5xl">
              {t.catering.riceMenu.title}
            </h2>
            <p className="text-lg text-gray-600">
              {t.catering.riceMenu.desc}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {menuList.map((menu, index) => (
              <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] flex flex-col">
                <MenuCard 
                  className="h-full"
                  icon={menu.icon} 
                  title={menu.title} 
                  subtitle={menu.subtitle}
                  items={menu.items}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <BuffetPricing 
        whatsappNumber="62812345678"
        packages={packages}
       />
       <BuffetFeatures />
       <BuffetBooking />
    </main>
  );
}