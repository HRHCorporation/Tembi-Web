'use client';

import React from 'react';
import Image from 'next/image';
import { Check, MessageCircle } from 'lucide-react'; 
// Note: Check mark tetap pakai Lucide agar ringan, tapi icon utama pakai Image local.

// 1. Update Interface: Ganti 'icon' menjadi 'iconSrc' (string)
export interface PackageItem {
  name: string;
  minPax: string;
  description: string;
  theme: 'standard' | 'premium' | 'exclusive';
  isPopular?: boolean;
  items: string[];
  iconSrc: string;
}

interface BuffetPricingProps {
  title?: string;
  subtitle?: string;
  description?: string;
  whatsappNumber: string;
  packages: PackageItem[];
}

const BuffetPricing = ({
  title = "Buffet Package Options",
  subtitle = "Choose Your Package",
  description = "Select the perfect package for your event.",
  whatsappNumber,
  packages
}: BuffetPricingProps) => {

  const handleBooking = (packageName: string) => {
    const message = `Halo, saya tertarik dengan paket *${packageName}* dari website. Mohon infonya.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-[#96A66D]">
            {subtitle}
          </span>
          <h2 className="mb-6 font-serif text-4xl font-bold text-[#4A3B32] lg:text-5xl">
            {title}
          </h2>
          <p className="text-lg text-gray-600">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, index) => {
            
            const isExclusive = pkg.theme === 'exclusive';
            const isPremium = pkg.theme === 'premium';
            
            let cardClasses = "relative flex flex-col rounded-3xl p-8 transition-all hover:shadow-xl ";
            if (isExclusive) {
              cardClasses += "bg-gradient-to-b from-[#5C4D42] to-[#7A8055] text-white shadow-lg lg:scale-105 z-10";
            } else if (isPremium) {
              cardClasses += "bg-white border-2 border-[#96A66D] text-gray-900 shadow-md";
            } else {
              cardClasses += "bg-[#F9F8F3] text-gray-900 border border-transparent";
            }

            return (
              <div key={index} className={cardClasses}>
                
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#8B9D61] px-4 py-1 text-xs font-bold text-white shadow-sm">
                    MOST POPULAR
                  </div>
                )}

                <div className={`absolute -right-0 -top-0 h-24 w-24 overflow-hidden rounded-tr-3xl`}>
                   <div className={`absolute -right-12 -top-12 h-24 w-24 rounded-full ${isExclusive ? 'bg-white/10' : 'bg-[#96A66D]/10'}`}></div>
                </div>

                {/*BAGIAN ICON*/}
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full mx-auto ${isExclusive ? 'bg-white/20' : 'bg-[#96A66D]'}`}>
                  <div className="relative h-8 w-8">
                    <Image 
                      src={pkg.iconSrc} 
                      alt={pkg.name}
                      fill
                      sizes="32px"
                      className="object-contain brightness-0 invert" 
                    />
                  </div>
                </div>

                {/* Content Text */}
                <div className="text-center">
                  <h3 className={`font-serif text-2xl font-bold ${isExclusive ? 'text-white' : 'text-[#4A3B32]'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`mt-2 text-sm ${isExclusive ? 'text-white/80' : 'text-gray-500'}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className={`mt-6 rounded-lg py-2 text-center text-sm font-medium ${isExclusive ? 'bg-white/20 text-white' : 'bg-white text-gray-600 shadow-sm'}`}>
                  Minimum Guests <span className="ml-2 font-bold">{pkg.minPax}</span>
                </div>

                <div className="mt-8 mb-8 flex-1">
                  <p className={`mb-4 font-serif font-bold ${isExclusive ? 'text-white' : 'text-[#4A3B32]'}`}>
                    Package Includes:
                  </p>
                  <ul className="space-y-4">
                    {pkg.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check 
                          className={`mt-0.5 h-5 w-5 shrink-0 ${isExclusive ? 'text-[#C9D6A8]' : 'text-[#96A66D]'}`} 
                          strokeWidth={2.5} 
                        />
                        <span className={`text-sm leading-relaxed ${isExclusive ? 'text-white/90' : 'text-gray-600'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => handleBooking(pkg.name)}
                  className={`mt-auto w-full rounded-full py-3.5 text-sm font-bold transition-all hover:scale-105 active:scale-95 ${
                    isExclusive 
                      ? 'bg-white text-[#5C4D42] hover:bg-gray-100' 
                      : 'bg-[#8B9D61] text-white hover:bg-[#768652] shadow-lg hover:shadow-xl'
                  }`}
                >
                  Book This Package
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Quote Button */}
        <div className="mt-20 text-center">
          <p className="mb-6 text-gray-600">
             Butuh paket custom? Hubungi kami langsung.
          </p>
          <button 
            onClick={() => handleBooking("Custom Quote")}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#8B9D61] bg-transparent px-8 py-3 text-sm font-bold text-[#8B9D61] transition-colors hover:bg-[#8B9D61] hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Request Custom Quote
          </button>
        </div>

      </div>
    </section>
  );
};

export default BuffetPricing;