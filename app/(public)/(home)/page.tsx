"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import HouseCard from "@/app/(public)/(home)/components/HouseCard";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import HeroImage from "./components/HeroImage";
import Introduction from "./components/Introduction";
import Accomodation from "./components/Accomodation";

export default function HomePage() {
  const { t } = useLanguage();

  const heritageFeatures = [
    {
      title: t.homepage.living.title.item1,
      desc: t.homepage.living.desc.item1,
      icon: "/images/icons/museum-green.png",
    },
    {
      title: t.homepage.living.title.item2,
      desc: t.homepage.living.desc.item2,
      icon: "/images/icons/leaf-green.png",
    },
    {
      title: t.homepage.living.title.item3,
      desc: t.homepage.living.desc.item3,
      icon: "/images/icons/diamond-green.png",
    },
  ];
  const foodPoints = [
    { text: t.homepage.food.item.item1, icon: "/images/icons/leaf-green.png" },
    { text: t.homepage.food.item.item2, icon: "/images/icons/food-green.png" },
    { text: t.homepage.food.item.item3, icon: "/images/icons/glass-green.png" },
  ];
  const eventPackages = [
    {
      title: t.homepage.venue.firstCard.title,
      description: t.homepage.venue.firstCard.desc,
      image: "/images/homepage/content2.webp",
      buttonText: t.homepage.venue.firstCard.button,
      features: [
        {
          text: t.homepage.venue.firstCard.item1,
          icon: "/images/icons/group-green.png",
        },
        {
          text: t.homepage.venue.firstCard.item2,
          icon: "/images/icons/leaf-green.png",
        },
        {
          text: t.homepage.venue.firstCard.item3,
          icon: "/images/icons/music-green.png",
        },
      ],
    },
    {
      title: t.homepage.venue.secondCard.title,
      description: t.homepage.venue.secondCard.desc,
      image: "/images/homepage/content3.webp",
      buttonText: t.homepage.venue.secondCard.button,
      features: [
        {
          text: t.homepage.venue.secondCard.item1,
          icon: "/images/icons/group-green.png",
        },
        {
          text: t.homepage.venue.secondCard.item2,
          icon: "/images/icons/wifi-green.png",
        },
        {
          text: t.homepage.venue.secondCard.item3,
          icon: "/images/icons/cup-green.png",
        },
      ],
    },
  ];
  const collections = [
    {
      title: t.homepage.collection.cardTitle.item1,
      desc: t.homepage.collection.cardDesc.item1,
      image: "/images/collection/cundrik/GPT0541.png",
    },
    {
      title: t.homepage.collection.cardTitle.item2,
      desc: t.homepage.collection.cardDesc.item2,
      image: "/images/collection/cundrik/GPT0540.png",
    },
    {
      title: t.homepage.collection.cardTitle.item3,
      desc: t.homepage.collection.cardDesc.item3,
      image: "/images/collection/keris/K.A 001.png",
    },
    {
      title: t.homepage.collection.cardTitle.item4,
      desc: t.homepage.collection.cardDesc.item4,
      image: "/images/collection/keris/K.A 002.png",
    },
  ];

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      <main>
        <HeroImage />
        <Introduction />
        <Accomodation />
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <ScrollReveal animation="fadeUp" duration={800}>
              <div className="text-center max-w-4xl mx-auto mb-32">
                <h2 className="text-4xl md:text-8xl font-serif font-bold text-gray-900 mb-24 md:leading-[0.9] drop-shadow-2xl">
                  {t.homepage.living.head[0]} <br /> {t.homepage.living.head[1]}
                </h2>
                <div className="grid md:grid-cols-3 gap-12">
                  {heritageFeatures.map((feature, idx) => (
                    <ScrollReveal
                      key={idx}
                      animation="fadeUp"
                      delay={idx * 150}
                      duration={700}
                    >
                      <div className="flex flex-col items-center text-center group">
                        <div className="relative w-10 h-10 mb-4">
                          <Image
                            src={feature.icon}
                            alt={feature.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-500 text-sm max-w-xs">
                          {feature.desc}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-16 items-center mx-auto max-w-7xl px-4">
              <ScrollReveal animation="slideLeft" duration={800}>
                <div className="">
                  <h2 className="text-4xl md:text-7xl font-serif font-bold text-gray-900 mb-10 leading-tight md:leading-[0.8] md:drop-shadow-lg">
                    {t.homepage.food.head[0]} <br /> {t.homepage.food.head[1]}
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed pr-16 text-lg">
                    {t.homepage.food.desc}
                  </p>
                  <div className="space-y-7 mb-10">
                    {foodPoints.map((point, idx) => (
                      <ScrollReveal
                        key={idx}
                        animation="fadeUp"
                        delay={idx * 100}
                        duration={600}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-4 h-4 shrink-0">
                            <Image
                              src={point.icon}
                              alt="icon"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-gray-600 text-sm font-medium">
                            {point.text}
                          </span>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                  <Link
                    href="/catering"
                    className="bg-tembi hover:bg-darktembi text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md"
                  >
                    {t.homepage.food.button}
                  </Link>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="slideRight" duration={800}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 relative h-96 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/foods/food1.webp"
                      alt="Restaurant Interior"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/foods/food2.webp"
                      alt="Signature Dish"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/images/foods/food3.webp"
                      alt="Dessert"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        <section className="py-24 bg-white border-t border-gray-50">
          <div className="container mx-auto px-6">
            <ScrollReveal animation="fadeUp" duration={800}>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h4 className="text-xs font-bold tracking-[0.2em] text-[#8B9B6D] uppercase mb-3">
                  {t.homepage.venue.head}
                </h4>
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
                  {t.homepage.venue.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t.homepage.venue.desc}
                </p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-10">
              {eventPackages.map((evt, index) => (
                <ScrollReveal
                  key={index}
                  animation="fadeUp"
                  delay={index * 200}
                  duration={800}
                >
                  <div className="bg-white border border-gray-100 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="relative h-72 w-full overflow-hidden">
                      <Image
                        src={evt.image}
                        alt={evt.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8 md:p-10 flex flex-col grow">
                      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                        {evt.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8 grow">
                        {evt.description}
                      </p>
                      <div className="space-y-4 mb-8">
                        {evt.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="relative w-4 h-4 shrink-0 opacity-60">
                              <Image
                                src={feature.icon}
                                alt="icon"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="text-sm text-gray-600 font-medium">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <Link
                          href="/venue"
                          className="bg-tembi hover:bg-darktembi text-white text-sm font-medium py-3 px-8 rounded-sm transition-colors w-full md:w-auto"
                        >
                          {evt.buttonText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        <section className="py-20 bg-white border-t border-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <ScrollReveal animation="fadeUp" duration={800}>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                  {t.homepage.collection.title}
                </h2>
                <p className="text-gray-500 leading-relaxed text-lg">
                  {t.homepage.collection.desc}
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {collections.map((item, index) => (
                  <ScrollReveal
                    key={index}
                    animation="fadeUp"
                    delay={index * 150}
                    duration={700}
                  >
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden flex flex-col">
                      <div className="relative w-full aspect-4/3 bg-slate-50 p-6 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                          />
                        </div>
                      </div>
                      <div className="p-5 grow border-t border-gray-50">
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <div className="flex flex-col gap-6 h-full min-h-125">
                <ScrollReveal animation="slideRight" duration={800}>
                  <div className="relative w-full h-3/5 min-h-75 rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src="/images/homepage/content4.webp"
                      alt="Main Hall"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </ScrollReveal>
                <div className="grid grid-cols-2 gap-6 h-2/5 min-h-50">
                  <ScrollReveal
                    animation="slideLeft"
                    duration={800}
                    delay={100}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm">
                      <Image
                        src="/images/homepage/content5.webp"
                        alt="Instruments"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal
                    animation="slideRight"
                    duration={800}
                    delay={100}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm">
                      <Image
                        src="/images/homepage/content6.webp"
                        alt="Artifact Display"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
            <ScrollReveal animation="fadeUp" duration={800}>
              <div className="flex justify-center mt-12">
                <Link
                  href="/collections"
                  className="bg-tembi hover:bg-darktembi text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 shadow-md"
                >
                  {t.homepage.collection.button}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <ScrollReveal animation="fadeUp" duration={800}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
                  {t.homepage.location.title}
                </h2>
                <p className="text-[#5C5C5C]">{t.homepage.location.subtitle}</p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <ScrollReveal animation="slideLeft" duration={800}>
                  <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative w-6 h-6 shrink-0">
                        <Image
                          src="/images/icons/gps-green.png"
                          alt="Address"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#2C2420]">
                        {t.homepage.location.cardTitle.item1}
                      </h3>
                    </div>
                    <p className="text-[#5C5C5C] leading-relaxed pl-9">
                      {" "}
                      {t.homepage.location.cardDesc.item1}
                    </p>
                  </div>
                </ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ScrollReveal
                    animation="slideLeft"
                    duration={800}
                    delay={100}
                  >
                    <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-6 h-6 shrink-0">
                          <Image
                            src="/images/icons/plane-green.png"
                            alt="Airport"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                          {t.homepage.location.cardTitle.item2}
                        </h3>
                      </div>
                      <p className="text-[#5C5C5C] text-sm leading-relaxed">
                        {t.homepage.location.cardDesc.item2}
                      </p>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal
                    animation="slideRight"
                    duration={800}
                    delay={100}
                  >
                    <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-6 h-6 shrink-0">
                          <Image
                            src="/images/icons/city-green.png"
                            alt="City"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[#2C2420]">
                          {t.homepage.location.cardTitle.item3}
                        </h3>
                      </div>
                      <p className="text-[#5C5C5C] text-sm leading-relaxed">
                        {t.homepage.location.cardDesc.item3}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
                <ScrollReveal animation="slideLeft" duration={800} delay={200}>
                  <div className="bg-[#F9F9F0] p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative w-6 h-6 shrink-0">
                        <Image
                          src="/images/icons/car-green.png"
                          alt="Transport"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#2C2420]">
                        {t.homepage.location.transport.title}
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="relative w-5 h-5 shrink-0 mt-0.5">
                          <Image
                            src="/images/icons/taxi-green.png"
                            alt="Taxi"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[#5C5C5C]">
                          {t.homepage.location.transport.item1}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="relative w-5 h-5 shrink-0 mt-0.5">
                          <Image
                            src="/images/icons/bus-green.png"
                            alt="Bus"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[#5C5C5C]">
                          {t.homepage.location.transport.item2}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="relative w-5 h-5 shrink-0 mt-0.5">
                          <Image
                            src="/images/icons/parking-green.png"
                            alt="Parking"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[#5C5C5C]">
                          {t.homepage.location.transport.item3}
                        </span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
              <ScrollReveal animation="slideRight" duration={800}>
                <div className="relative h-125 lg:h-full min-h-125 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
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
                  <div className="absolute top-0 left-0 w-full h-12 pointer-events-none bg-linear-to-b from-black/10 to-transparent" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
