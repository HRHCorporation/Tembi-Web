'use client';

import FeaturedRoomCard from "@/components/FeaturedRoomCard";
import StandardRoomCard from "@/components/StandardRoomCard";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from 'next/image';
import { AmenitiesSection } from "@/components/AmenitiesSection";
import ScrollReveal from "@/components/ScrollReveal";

interface RoomItem {
  id: number;
  badge: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  details: {
    guests: number;
    size: string;
    view: string;
  };
  detailsIcons: string;
  layoutType: string;
}

export default function Catalog() {
  const { t } = useLanguage();

  const rooms = t.house.item as unknown as RoomItem[];
  const featuredRooms = rooms.filter((room) => room.layoutType === 'featured');
  const standardRooms = rooms.filter((room) => room.layoutType === 'standard');

  return (
    <main className="bg-white">
      <div className="relative w-full">
        <div className="relative h-[700px] w-full">

          <Image
            src="/images/rooms/cover.webp" 
            alt="Room Background"
            fill
            className="object-cover"
            priority 
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center pb-20">
            <div className="text-sm text-gray-200 mb-4 font-medium">
                {t.house.hero.address[0]} &gt; {t.house.hero.address[1]}
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                {t.house.hero.title}
            </h1>
            <p className="max-w-2xl text-lg text-gray-100 mb-8 leading-relaxed">
                {t.house.hero.desc}
            </p>
            <div>
              <button className="bg-tembi hover:bg-darktembi text-white px-8 py-3 rounded transition-colors duration-300 flex items-center gap-3 font-medium">
                <div className="relative w-3 h-3"> 
                   <Image 
                      src="/images/icons/search-white.png"
                      alt="Search Icon"
                      fill
                      className="object-contain"
                   />
                </div>
                {t.house.hero.buttonText}
              </button>
            </div>
          </div>

          {/*Floating Stats Bar*/}
          <div className="absolute bottom-0 left-0 right-0 z-30 transform -translate-y-1/3">
            <div className="container mx-auto px-6">
              <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
                <div className="grid grid-cols-3 gap-8 text-center divide-x divide-gray-200">

                  <div className="flex flex-col items-center justify-center space-y-0">
                    <span className="text-2xl font-bold text-[#8B9D68]">{t.house.hero.stats[0].num}</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wide">{t.house.hero.stats[0].desc}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-0">
                    <span className="text-2xl font-bold text-[#8B9D68]">{t.house.hero.stats[1].num}</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wide">{t.house.hero.stats[1].desc}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-0">
                    <span className="text-2xl font-bold text-[#8B9D68]">{t.house.hero.stats[2].num}</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wide">{t.house.hero.stats[2].desc}</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-16 bg-white"></div> 

        <div className="container mx-auto px-16 pb-20">
          <ScrollReveal animation="fadeUp" duration={800}>
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
                    {t.house.room.title}
                </h2>
                <p className="text-gray-600">
                    {t.house.room.desc}
                </p>
            </div>
          </ScrollReveal>

          {/* Featured Rooms */}
          <div className="space-y-12 mb-20">
            {featuredRooms.map((room, idx) => (
                <ScrollReveal key={room.id} animation="fadeUp" delay={idx * 150} duration={800}>
                  <FeaturedRoomCard 
                    slug={room.slug}
                    name={room.name}
                    description={room.description}
                    imageUrl={room.imageUrl}
                    size={room.details.size}
                    guests={room.details.guests}
                    view={room.details.view}
                    detailsIcon={room.detailsIcons}
                    recommendationText={t.homepage.accommodation.rec}
                  />
                </ScrollReveal>
            ))}
          </div>
          
          {/* Standard Rooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardRooms.map((room, idx) => (
                <ScrollReveal key={room.id} animation="fadeUp" delay={idx * 150} duration={800}>
                  <StandardRoomCard 
                    slug={room.slug}
                    imageUrl={room.imageUrl}
                    badge={room.badge}
                    name={room.name}
                    description={room.description}
                    size={room.details.size}
                    guests={room.details.guests}
                    view={room.details.view}
                    detailsIcon={room.detailsIcons}
                  />
                </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      <AmenitiesSection />
    </main>
  );
}