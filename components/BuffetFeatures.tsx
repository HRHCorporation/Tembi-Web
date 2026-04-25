'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';

const BuffetFeatures = () => {
  const { t } = useLanguage();

  const iconPaths = [
    "/images/icons/truck-white.png",   // 1. Delivery
    "/images/icons/group-white.png",   // 2. Staff
    "/images/icons/leaf-white.png",    // 3. Ingredients
    "/images/icons/clock-white.png",   // 4. Timing
    "/images/icons/curly-white.png",   // 5. Quality
    "/images/icons/food-white.png"     // 6. Equipment
  ];

  const features = t.catering.service.features.map((feature, index) => ({
    title: feature.title,
    desc: feature.desc,
    iconSrc: iconPaths[index] || "/images/icons/circle-white.png"
  }));

  return (
    <section className="w-full bg-[#F9F8F3] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/*HEADER SECTION*/}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-[#96A66D]">
            {t.catering.service.label}
          </span>
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#4A3B32] lg:text-5xl">
            {t.catering.service.title}
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            {t.catering.service.subtitle}
          </p>
        </div>

        {/*FEATURES GRID*/}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              {/* Icon Circle */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#8B9D61]">
                <div className="relative h-10 w-10">
                  <Image 
                    src={feature.iconSrc} 
                    alt={feature.title} 
                    fill 
                    sizes="40px"
                    className="object-contain brightness-0 invert" 
                  />
                </div>
              </div>
              
              {/* Text */}
              <h3 className="mb-4 font-serif text-xl font-bold text-[#4A3B32]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuffetFeatures;