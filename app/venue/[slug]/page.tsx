'use client';

import React, { use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import ScrollReveal from "@/components/ScrollReveal";

export default function VenueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useLanguage();

  const { slug } = use(params);

  const venue = t.venue.items.find((v) => v.slug === slug);

  if (!venue) {
    notFound();
  }

  const facilityIcons = [
    "/images/icons/build-green.png",   // 1. Venue Space
    "/images/icons/chair-green.png",   // 2. Free Chairs
    "/images/icons/volume-green.png",  // 3. Sound System
    "/images/icons/gender-green.png",  // 4. Toilet
    "/images/icons/brush-green.png",   // 5. Cleaning
    "/images/icons/parking-green.png", // 6. Parking
  ];

  const addonIcons = [
    "/images/icons/video-green.png", // Projector
    "/images/icons/mic-green.png",   // Sound
    "/images/icons/food-green.png",  // Catering
    "/images/icons/paint-green.png", // Decoration
  ];

  return (
    <main className="min-h-screen bg-white pb-20">

      {/*HERO SECTION*/}
      <section className="relative h-screen w-full">
        <Image
          src={venue.heroImage}
          alt={venue.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-16 left-0 w-full p-6 md:p-12 text-white">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-6xl font-serif mb-4">{venue.title}</h1>

              {/* Hero Description */}
              <div className="max-w-3xl mb-8">
                {venue.heroDescription.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className="text-gray-200 text-lg md:text-xl leading-relaxed mb-2 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Quick Stats (Capacity) */}
              <div className="flex flex-wrap gap-6 text-sm md:text-base font-medium text-[#A4AC86]">
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5">
                      <Image src="/images/icons/group-green.png" alt="Capacity" fill className="object-contain" />
                  </div>
                  <span>{venue.capacity}</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/*CONTENT SECTION*/}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* GALERI FOTO (Kiri) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image src={venue.galleryImages[0] || venue.heroImage} alt="Detail 1" fill className="object-cover hover:scale-105 transition duration-500" />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image src={venue.galleryImages[1] || venue.heroImage} alt="Detail 2" fill className="object-cover hover:scale-105 transition duration-500" />
              </div>
              <div className="relative h-64 col-span-2 rounded-xl overflow-hidden">
                <Image src={venue.galleryImages[2] || venue.heroImage} alt="Wide Detail" fill className="object-cover hover:scale-105 transition duration-500" />
              </div>
            </div>
          </div>

          {/* DESKRIPSI & INFO (Kanan) */}
          <div className="lg:col-span-7 space-y-10">
            
            <div>
              {/* Judul: "About This Venue" / "Tentang Venue Ini" */}
              <h2 className="text-3xl font-serif text-[#2C2420] mb-6">
                {t.detailVenue.intro.title}
              </h2>
              <div className="text-[#5C5C5C] space-y-4 leading-relaxed">
                {venue.longDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* --- KEY INFORMATION BOX --- */}
            <div className="bg-[#F9F9F0] p-8 rounded-xl border border-[#EBEBE0]">
              <h3 className="text-xl font-serif text-[#2C2420] mb-6 font-semibold">
                {t.detailVenue.intro.cardTitle}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                
                {/* 1. Capacity */}
                <div className="flex gap-4">
                  <div className="mt-1 relative w-6 h-6 flex-shrink-0">
                    <Image src="/images/icons/group-green.png" alt="Capacity Icon" fill className="object-contain" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2C2420] text-sm">
                      {t.detailVenue.intro.item1}
                    </p>
                    <p className="text-[#5C5C5C] text-sm">{venue.capacity}</p>
                  </div>
                </div>

                {/* 2. Best For */}
                <div className="flex gap-4">
                  <div className="mt-1 relative w-6 h-6 flex-shrink-0">
                    <Image src="/images/icons/heart-green.png" alt="Heart Icon" fill className="object-contain" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2C2420] text-sm">
                      {t.detailVenue.intro.item2}
                    </p>
                    <p className="text-[#5C5C5C] text-sm">{venue.bestFor}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/*FACILITIES SECTION*/}
      <section className="py-20 bg-[#F9F9F0]"> 
        <div className="container mx-auto px-6">
          
          {/* Header Facilities */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
              {t.detailVenue.features.title}
            </h2>
            <p className="text-[#5C5C5C]">
              {t.detailVenue.features.subtitle}
            </p>
          </div>

          {/* Grid Facilities (Mapped from Context) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {t.detailVenue.features.item.map((item, idx) => (
               <FacilityCard 
                 key={idx}
                 iconSrc={facilityIcons[idx] || "/images/icons/check-green.png"} // Fallback icon
                 title={item.title}
                 description={item.desc}
               />
            ))}
          </div>

          {/* Optional Add-ons Section */}
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-[#EBEBE0]">
            <h3 className="text-2xl font-serif text-[#2C2420] mb-8 font-semibold">
              {t.detailVenue.features.addons.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.detailVenue.features.addons.item.map((addon, idx) => (
                <AddOnItem 
                  key={idx}
                  iconSrc={addonIcons[idx] || "/images/icons/check-green.png"}
                  label={addon} 
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/*GALLERY SECTION*/}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
              {t.detailVenue.gallery.title}
            </h2>
            <p className="text-[#5C5C5C]">
              {t.detailVenue.gallery.subtitle} {venue.title}
            </p>
          </div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venue.eventGalleryImages?.map((imageSrc, index) => (
              <div 
                key={index} 
                className="relative h-64 md:h-72 rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <Image
                  src={imageSrc}
                  alt={`Event at ${venue.title} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/*ADDITIONAL SERVICES TABLE*/}
      <section className="py-20 bg-[#F9F9F0]">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
              {t.detailVenue.service.title}
            </h2>
            <p className="text-[#5C5C5C]">
              {t.detailVenue.service.subtitle}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#EBEBE0] overflow-hidden max-w-5xl mx-auto">
            
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-white font-serif text-[#2C2420] font-bold">
              <div className="col-span-4">{t.detailVenue.service.table.col1}</div>
              <div className="col-span-5">{t.detailVenue.service.table.col2}</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {t.detailVenue.service.table.item.map((item, index) => (
                <div key={index} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="col-span-1 md:col-span-4">
                    <span className="font-semibold text-[#2C2420] block">{item.name}</span>
                  </div>
                  <div className="col-span-1 md:col-span-5">
                    <span className="text-sm text-[#5C5C5C]">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Notes */}
            <div className="bg-[#F9F9F0] p-6 md:p-8 border-t border-[#EBEBE0]">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#8FA876] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-[#5C5C5C] font-bold mb-2 text-sm">
                    {t.detailVenue.service.table.note.title}
                  </h4>
                  <ul className="text-sm text-[#5C5C5C] space-y-1 list-disc list-inside marker:text-[#8FA876]">
                    {t.detailVenue.service.table.note.item.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Location & Access Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          
          {/* Header */}
          <ScrollReveal animation="fadeUp" duration={800}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
                {t.homepage.location.title}
              </h2>
              <p className="text-[#5C5C5C]">
                {t.homepage.location.subtitle}
              </p>
            </div>
          </ScrollReveal>
              
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* --- LEFT COLUMN: INFO WITH LOCAL ICONS --- */}
            <div className="space-y-6">
              
              {/* 1. Address Block */}
              <ScrollReveal animation="slideLeft" duration={800}>
                <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    {/* Icon Address */}
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image src="/images/icons/gps-green.png" alt="Address" fill className="object-contain" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#2C2420]">{t.homepage.location.cardTitle.item1}</h3>
                  </div>
                  <p className="text-[#5C5C5C] leading-relaxed pl-9"> {/* pl-9 agar rata dengan teks judul */}
                    {t.homepage.location.cardDesc.item1}
                  </p>
                </div>
              </ScrollReveal>
              
              {/* Grid for Airport & City Center */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 2. From Airport */}
                <ScrollReveal animation="slideLeft" duration={800} delay={100}>
                  <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      {/* Icon Airport */}
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <Image src="/images/icons/plane-green.png" alt="Airport" fill className="object-contain" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-[#2C2420]">{t.homepage.location.cardTitle.item2}</h3>
                    </div>
                    <p className="text-[#5C5C5C] text-sm leading-relaxed">
                      {t.homepage.location.cardDesc.item2}
                    </p>
                  </div>
                </ScrollReveal>
              
                {/* 3. From City Center */}
                <ScrollReveal animation="slideRight" duration={800} delay={100}>
                  <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      {/* Icon City */}
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <Image src="/images/icons/city-green.png" alt="City" fill className="object-contain" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-[#2C2420]">{t.homepage.location.cardTitle.item3}</h3>
                    </div>
                    <p className="text-[#5C5C5C] text-sm leading-relaxed">
                      {t.homepage.location.cardDesc.item3}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
              
              {/* 4. Transportation Options Block */}
              <ScrollReveal animation="slideLeft" duration={800} delay={200}>
                <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    {/* Header Icon Car */}
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image src="/images/icons/car-green.png" alt="Transport" fill className="object-contain" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#2C2420]">{t.homepage.location.transport.title}</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {/* List Item 1: Taxi */}
                    <li className="flex items-start gap-3">
                      <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                        <Image src="/images/icons/taxi-green.png" alt="Taxi" fill className="object-contain" />
                      </div>
                      <span className="text-[#5C5C5C]">{t.homepage.location.transport.item1}</span>
                    </li>
        
                    {/* List Item 2: Bus */}
                    <li className="flex items-start gap-3">
                      <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                        <Image src="/images/icons/bus-green.png" alt="Bus" fill className="object-contain" />
                      </div>
                      <span className="text-[#5C5C5C]">{t.homepage.location.transport.item2}</span>
                    </li>
        
                    {/* List Item 3: Parking */}
                    <li className="flex items-start gap-3">
                      <div className="relative w-5 h-5 flex-shrink-0 mt-0.5">
                        <Image src="/images/icons/parking-green.png" alt="Parking" fill className="object-contain" />
                      </div>
                      <span className="text-[#5C5C5C]">{t.homepage.location.transport.item3}</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
              
            </div>
              
              
            {/* --- RIGHT COLUMN: DYNAMIC IMAGE --- */}
            <ScrollReveal animation="slideRight" duration={800}>
              <div className="relative h-[500px] lg:h-full min-h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2385536997226!2d110.35363067455535!3d-7.870087878251126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a560cf1551d0b%3A0x1db36094db031949!2sTembi%20-%20Historical%20Home!5e0!3m2!1sid!2sid!4v1764903906866!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
        
                {/* Optional: Overlay agar map tidak 'menelan' scroll mouse saat user hanya ingin scroll halaman */}
                <div className="absolute top-0 left-0 w-full h-12 pointer-events-none bg-gradient-to-b from-black/10 to-transparent" />
              </div>
            </ScrollReveal>
              
          </div>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-white">
        <div className="max-w-7xl mx-auto">
          {/* 1. Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.foods.contact.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t.foods.contact.subtitle}
            </p>
          </div>
      
          {/* 2. Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1: Call Us */}
            <div className="bg-[#F8F9F5] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
              {/* Icon Wrapper */}
              <div className="w-16 h-16 bg-[#8F9E75] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#8F9E75]/20">
                <Image 
                  src="/images/icons/phone-white.png" 
                  alt="phone" 
                  width={24} height={24} 
                  className="brightness-0 invert" 
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">{t.foods.contact.card1.title}</h3>
              <p className="text-gray-500 mb-4 text-sm">{t.foods.contact.card1.subtitle}</p>
      
              <p className="text-gray-900 font-bold text-lg mb-2">{t.foods.contact.card1.phone}</p>
              <p className="text-gray-400 text-xs font-medium">{t.foods.contact.card1.desc}</p>
            </div>
      
            {/* Card 2: WhatsApp */}
            <div className="bg-[#F8F9F5] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#8F9E75] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#8F9E75]/20">
                 <Image 
                  src="/images/icons/whatsapp-white.png" 
                  alt="wa" 
                  width={28} height={28} 
                  className="brightness-0 invert" 
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">{t.foods.contact.card2.title}</h3>
              <p className="text-gray-500 mb-4 text-sm">{t.foods.contact.card2.subtitle}</p>
      
              <p className="text-gray-900 font-bold text-lg mb-6">{t.foods.contact.card2.phone}</p>
      
              {/* Chat Now Button */}
              <Link 
                href="https://wa.me/6282225142729"
                className="bg-[#8F9E75] text-white text-sm font-bold py-3 px-8 rounded-lg hover:bg-[#7A8B60] transition-colors shadow-sm"
              >
                {t.foods.contact.card2.desc}
              </Link>
            </div>
      
            {/* Card 3: Email Us */}
            <div className="bg-[#F8F9F5] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#8F9E75] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#8F9E75]/20">
                 <Image 
                  src="/images/icons/mail-white.png" 
                  alt="email" 
                  width={24} height={24} 
                  className="brightness-0 invert" 
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">{t.foods.contact.card3.title}</h3>
              <p className="text-gray-500 mb-4 text-sm">{t.foods.contact.card3.subtitle}</p>
      
              {/* Email Link */}
              <a href="mailto:catering@tembihistoricalhome.com" className="text-[#8F9E75] font-bold text-lg mb-2 hover:underline break-all">
                {t.foods.contact.card3.phone}
              </a>
              <p className="text-gray-400 text-xs font-medium">{t.foods.contact.card3.desc}</p>
            </div>
          </div>
          {/* 3. Special Requests Bottom Banner */}
          <div className="bg-[#F8F9F5] rounded-3xl p-12 text-center w-full">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {t.foods.contact.footer.title}
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              {t.foods.contact.footer.desc}
            </p>
            <Link 
                href="https://wa.me/6282225142729"
                className="bg-[#8F9E75] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#7A8B60] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
            >
              {t.foods.contact.footer.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const FacilityCard = ({ iconSrc, title, description }: { iconSrc: string, title: string, description: string }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center border border-[#EBEBE0]">
      <div className="w-16 h-16 rounded-full bg-[#F4F6E6] flex items-center justify-center mb-6">
        <div className="relative w-8 h-8">
          <Image src={iconSrc} alt={title} fill className="object-contain" />
        </div>
      </div>
      
      <h3 className="text-lg font-serif text-[#2C2420] font-bold mb-3">
        {title}
      </h3>
      <p className="text-[#5C5C5C] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const AddOnItem = ({ iconSrc, label }: { iconSrc: string, label: string }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-6 h-6 flex-shrink-0">
        <Image src={iconSrc} alt={label} fill className="object-contain" />
      </div>
      <span className="text-[#5C5C5C] font-medium text-sm md:text-base">
        {label}
      </span>
    </div>
  );
};