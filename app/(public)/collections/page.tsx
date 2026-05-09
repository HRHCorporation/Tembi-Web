'use client';

import React from 'react';
import Image from 'next/image';
import CollectionCard from '@/components/CollectionCard';
import { useLanguage } from '@/app/context/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function CollectionsPage() {
  const { t } = useLanguage();
  const statsData = t.collection.stats.item;
  const collectionsData = t.collection.items;
  return (
    <main className="w-full">
      
      {/*HERO SECTION*/}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/collection/koleksicover.webp" 
            alt="Tembi Historical Background" 
            fill
            priority
            quality={90}
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/60 sm:bg-gradient-to-r sm:from-black/80 sm:to-black/40" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-center">
          
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-100 px-4 py-1.5 rounded-full w-fit mb-6">
            <div className="relative flex items-center justify-center">
               <Image 
                 src="/images/icons/museum-white.png"
                 alt="Heritage Icon"
                 width={18} 
                 height={18}
                 className="w-[18px] h-[18px] object-contain"
               />
            </div>
            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase">
              {t.collection.hero.badge}
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
            {t.collection.hero.title[0]} <br />
            {t.collection.hero.title[1]}
          </h1>

          <div className="max-w-2xl text-gray-200 text-base sm:text-lg leading-relaxed space-y-4 mb-10">
            <p>
              {t.collection.hero.desc[0]}
            </p>
            <p className="hidden sm:block text-gray-300/90">
              {t.collection.hero.desc[1]}
            </p>
          </div>

          <div>
            <button className="group flex items-center gap-3 bg-[#8F9F6A] hover:bg-[#7d8c5c] text-white px-6 py-3.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <div className="relative w-5 h-5 group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src="/images/icons/view-white.png"
                  alt="Explore Icon"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-semibold tracking-wide">{t.collection.hero.buttonText}</span>
            </button>
          </div>

        </div>
      </section>

      {/*STATS SECTION*/}
      <section className="w-full bg-white py-16 sm:py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-wrap justify-center gap-16 lg:gap-48">
            
            {statsData.map((stat) => (
              <ScrollReveal key={stat.id} animation="fadeUp" delay={stat.id * 150} duration={800}>
                <div className="flex flex-col items-center text-center group">
                  
                  <div className="mb-6 w-20 h-20 rounded-full bg-[#F4F5F0] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <div className="relative w-8 h-8">
                      <Image 
                        src={stat.iconUrl}
                        alt={stat.alt}
                        width={32}
                        height={32}
                        className="object-contain w-full h-full opacity-60"
                      />
                    </div>
                  </div>

                  <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#433422] mb-2">
                    {stat.value}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-gray-500 tracking-wide font-medium">
                    {stat.label}
                  </p>
                  
                </div>
              </ScrollReveal>
            ))}

          </div>
        </div>
      </section>

      <div className="w-full bg-[#FAFAFA] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {collectionsData.map((category, index) => (
            <div key={index} className="mb-20 last:mb-0">
              
              <ScrollReveal animation="fadeUp" duration={800}>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#433422] mb-4">
                    {category.title}
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, itemIdx) => (
                  <ScrollReveal key={item.id} animation="fadeUp" delay={itemIdx * 100} duration={700}>
                    <CollectionCard item={item} />
                  </ScrollReveal>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
}