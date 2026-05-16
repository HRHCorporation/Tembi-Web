'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { useLanguage } from "@/app/(public)/context/LanguageContext";
import RoomHero from '@/components/RoomHero';
import RoomInfo from '@/components/RoomInfo';
import RoomGallery from '@/components/RoomGallery';
import RoomPolicies from '@/components/RoomPolicies';
import RoomBookingCTA from '@/components/RoomBookingCTA';

export default function RoomDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { t } = useLanguage();
  const { slug } = use(params);

  const room = t.house.item.find((v) => v.slug === slug);

  if (!room) {
    return notFound();
  }

  return (
    <main className="bg-[#F8F9FA] min-h-screen pb-20">

      {/* SECTION 1: HERO */}
      <RoomHero
        imageUrl={room.imageUrl}
        name={room.name}
        tagline={room.tagline}
        backText={t.houseDetail.back}
      />

      {/* CONTENT CONTAINER */}
      <div className="container mx-auto px-4 md:px-10 py-12 space-y-8">

        {/* SECTION 2: INFO UTAMA */}
        <RoomInfo
          name={room.name}
          bed={room.details.bed}
          guests={room.details.guests}
          size={room.details.size}
          price={room.price}
          longDescription={room.longDescription}
          amenities={room.amenities}
          guestText={t.houseDetail.guest}
          nightText={t.houseDetail.night}
          facilitiesText={t.houseDetail.facilities}
        />

        {/* SECTION 3: GALLERY */}
        <RoomGallery
          roomName={room.name}
          galleryImages={room.galleryImages || []}
          galleryTitle={t.houseDetail.gallery}
          viewAllText={t.houseDetail.viewall}
        />

        {/* SECTION 4: ROOM POLICIES & INFORMATION */}
        <RoomPolicies
          checkIn={room.policies.checkIn}
          checkOut={room.policies.checkOut}
          smoking={room.houseRules.smoking}
          pets={room.houseRules.pets}
          policyTexts={t.houseDetail.policy}
          houseRulesTexts={t.houseDetail.houseRules}
        />

        {/* SECTION 5: BOOKING ACTION */}
        <RoomBookingCTA
          roomName={room.name}
          price={room.price}
          nightText={t.houseDetail.night}
          bookingText={t.houseDetail.booking}
        />

      </div>
    </main>
  );
}
