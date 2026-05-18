'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import MenuItemCard from '@/components/MenuItemCard';
import PackageCard from '@/components/PackageCard';
import ScrollReveal from '@/components/ScrollReveal';


export default function FoodPage() {
  const { t } = useLanguage();
  const buffetMenu = t.foods.menus.buffet.item;
  const snackMenu = t.foods.menus.snack.item;
  const riceBoxMenu = t.foods.menus.rice.item;
  return (
    <main className="w-full min-h-screen bg-white">
      
      {/*HERO SECTION*/}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image 
              src="/images/foods/foodcover.webp"
              alt="Javanese Cuisine Spread" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24">
          <div className="max-w-3xl flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-3 border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-8">
              <Image 
                src="/images/icons/food-white.png" 
                alt="Utensils"
                width={16}
                height={16}
                className="w-4 h-4 object-contain" 
              />
              <span className="text-sm font-medium tracking-wide text-white">{t.foods.hero.label}</span>
            </div>

            <h1 className="font-serif text-6xl font-bold text-white mb-6 leading-none drop-shadow-lg">
              {t.foods.hero.title[0]} <br /> {t.foods.hero.title[1]}
            </h1>

            <p className="font-serif italic text-lg text-gray-200 mb-6 tracking-wide">
              {t.foods.hero.subtitle}
            </p>

            <p className="text-base text-gray-300 leading-relaxed max-w-xl">
              {t.foods.hero.desc}
            </p>
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
        </div>
      </section>

      {/*CONTENT*/}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
    
          <ScrollReveal animation="slideLeft" duration={800}>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Image 
                  src="/images/icons/leaf-black.png"
                  alt="Leaf Icon"
                  width={24}
                  height={24}
                  className="w-5 h-5 object-contain"
                />
                <span className="text-sm font-semibold uppercase tracking-widest text-gray-800">
                  {t.foods.intro.label}
                </span>
              </div>

              <h2 className="font-serif text-4xl  font-bold text-gray-900 leading-[1.15] mb-8">
                {t.foods.intro.title[0]} <br className="hidden lg:block" />
                <span className="text-[#8F9E75]">{t.foods.intro.title[1]}</span>
              </h2>

              <p className="text-base text-gray-600 leading-relaxed mb-10">
                {t.foods.intro.desc}
              </p>

              <div className="space-y-8">
                <FeatureItem 
                  title={t.foods.intro.itemTitle[0]} 
                  desc={t.foods.intro.itemDesc[0]}
                />
                <FeatureItem 
                  title={t.foods.intro.itemTitle[1]} 
                  desc={t.foods.intro.itemDesc[1]}
                />
                <FeatureItem 
                  title={t.foods.intro.itemTitle[2]} 
                  desc={t.foods.intro.itemDesc[2]}
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slideRight" duration={800}>
            <div className="relative w-full aspect-square lg:aspect-[4/3]">
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden">
                <Image 
                  src="/images/foods/foods1.webp"
                  alt="Traditional Javanese Kitchenware" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/*PACKAGES*/}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto">

          <ScrollReveal animation="fadeUp" duration={800}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              {/* Label */}
              <div className="inline-flex items-center gap-2 mb-4">
                <Image 
                  src="/images/icons/package-black.png"
                  alt="icon"
                  width={16} height={16}
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {t.foods.packages.label}
                </span>
              </div>
        
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t.foods.packages.title[0]} <span className="text-[#8F9E75]">{t.foods.packages.title[1]}</span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                {t.foods.packages.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

            {/*Buffet*/}
            <ScrollReveal animation="fadeUp" delay={0} duration={800}>
              <PackageCard 
                image="/images/foods/foods5.webp"
                badge={t.foods.packages.card1.badge}
                title={t.foods.packages.card1.title}
                subtitle={t.foods.packages.card1.subtitle}
                desc={t.foods.packages.card1.desc}
                features={t.foods.packages.card1.features}
                
                linkUrl={t.foods.packages.card1.linkUrl}
                buttonText={t.foods.packages.card1.buttonText}
              />
            </ScrollReveal>

            {/*Snack Box*/}
            <ScrollReveal animation="fadeUp" delay={150} duration={800}>
              <PackageCard 
                image="/images/foods/foods6.webp"
                badge={t.foods.packages.card2.badge}
                title={t.foods.packages.card2.title}
                subtitle={t.foods.packages.card2.subtitle}
                desc={t.foods.packages.card2.desc}
                features={t.foods.packages.card2.features}
                
                linkUrl={t.foods.packages.card2.linkUrl}
                buttonText={t.foods.packages.card2.buttonText}
              />
            </ScrollReveal>

            {/*Rice Box*/}
            <ScrollReveal animation="fadeUp" delay={300} duration={800}>
              <PackageCard 
                image="/images/foods/foods7.webp"
                badge={t.foods.packages.card3.badge}
                title={t.foods.packages.card3.title}
                subtitle={t.foods.packages.card3.subtitle}
                desc={t.foods.packages.card3.desc}
                features={t.foods.packages.card3.features}
                
                linkUrl={t.foods.packages.card3.linkUrl}
                buttonText={t.foods.packages.card3.buttonText}
              />
            </ScrollReveal>
          </div>

          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
              <InfoItem 
                icon="/images/icons/group-black.png"
                title={t.foods.packages.footerTitle[0]}
                desc={t.foods.packages.footerDesc[0]}
              />
              <InfoItem 
                icon="/images/icons/clock-black.png"
                title={t.foods.packages.footerTitle[1]}
                desc={t.foods.packages.footerDesc[1]}
              />
            </div>
          </div>
        </div>
      </section>

      {/*SAMPLE MENUS*/}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-white">
        <div className="max-w-7xl mx-auto">
    
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <Image 
                src="/images/icons/food-black.png" 
                alt="icon" 
                width={14} height={14} 
                className="w-3.5 h-3.5" 
              />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                {t.foods.menus.label}
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.foods.menus.title[0]} <span className="text-[#8F9E75]">{t.foods.menus.title[0]}</span>
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {t.foods.menus.desc}
            </p>
          </div>

          {/*BUFFET*/}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">{t.foods.menus.buffet.title}</h3>
              <p className="text-gray-500 text-sm">{t.foods.menus.buffet.desc}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {buffetMenu.map((item, idx) => (
                <MenuItemCard key={idx} {...item} />
              ))}
            </div>
          </div>

          {/*SNACK BOX*/}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">{t.foods.menus.snack.title}</h3>
              <p className="text-gray-500 text-sm">{t.foods.menus.snack.desc}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {snackMenu.map((item, idx) => (
                <MenuItemCard key={idx} {...item} />
              ))}
            </div>
          </div>

          {/*RICE BOX*/}
          <div>
            <div className="text-center mb-10">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">{t.foods.menus.rice.title}</h3>
              <p className="text-gray-500 text-sm">{t.foods.menus.rice.desc}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {riceBoxMenu.map((item, idx) => (
                <MenuItemCard key={idx} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*HERITAGE*/}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      
            <div className="relative pl-4 sm:pl-0">
              <div className="relative w-full aspect-[4/5] lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-lg">
                <Image 
                  src="/images/foods/foods8.webp"
                  alt="Generations cooking" 
                  fill
                  className="object-cover"
                />
              </div>

              <div className="hidden md:block absolute bottom-10 -left-10 w-80 bg-white p-6 rounded-2xl shadow-2xl shadow-gray-200/50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#8F9E75] flex items-center justify-center flex-shrink-0">
                    <Image src="/images/icons/heart-white.png" alt="heart" width={20} height={20} className="brightness-0 invert" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-gray-900">{t.foods.gen.card.title}</h4>
                    <p className="text-xs text-gray-500">{t.foods.gen.card.subtitle}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-4"></div>

                <p className="text-sm text-gray-600 italic leading-relaxed">
                  {t.foods.gen.card.desc}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <Image src="/images/icons/star-black.png" alt="star" width={16} height={16} className="w-4 h-4 opacity-80" />
                <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  {t.foods.gen.label}
                </span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t.foods.gen.title[0]} <br />
                <span className="text-[#8F9E75]">{t.foods.gen.title[1]}</span>
              </h2>

              <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                {t.foods.gen.desc}
              </p>

              <div className="space-y-8">
                <HeritageItem 
                  icon="/images/icons/book-black.png"
                  title={t.foods.gen.itemTitle[0]}
                  desc={t.foods.gen.itemDesc[0]}
                />
                <HeritageItem 
                  icon="/images/icons/plant-black.png"
                  title={t.foods.gen.itemTitle[1]}
                  desc={t.foods.gen.itemDesc[1]}
                />
                <HeritageItem 
                  icon="/images/icons/hand-black.png"
                  title={t.foods.gen.itemTitle[2]}
                  desc={t.foods.gen.itemDesc[2]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/*CELEBRATE*/}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-white">
        <div className="max-w-7xl mx-auto">
    
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Image 
                src="/images/icons/calendar-black.png"
                alt="icon" 
                width={16} height={16} 
                className="w-4 h-4 opacity-80" 
              />
              <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                {t.foods.celebrate.label}
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.foods.celebrate.title[0]} <span className="text-[#8F9E75]">{t.foods.celebrate.title[1]}</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              {t.foods.celebrate.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-24">
            <OccasionItem 
              image="/images/foods/foods9.webp"
              title={t.foods.celebrate.card1.title}
              subtitle={t.foods.celebrate.card1.subtitle}
              features={t.foods.celebrate.card1.features}
            />

            <OccasionItem 
              image="/images/foods/foods10.webp"
              title={t.foods.celebrate.card2.title}
              subtitle={t.foods.celebrate.card2.subtitle}
              features={t.foods.celebrate.card2.features}
            />

            <OccasionItem 
              image="/images/foods/foods11.webp"
              title={t.foods.celebrate.card3.title}
              subtitle={t.foods.celebrate.card3.subtitle}
              features={t.foods.celebrate.card3.features}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-16">
            <StatItem 
              icon="/images/icons/star-white.png"
              number={t.foods.celebrate.stat1.number}
              label={t.foods.celebrate.stat1.label}
            />
            <StatItem 
              icon="/images/icons/group-white.png"
              number={t.foods.celebrate.stat2.number}
              label={t.foods.celebrate.stat2.label}
            />
            <StatItem 
              icon="/images/icons/heart-white.png"
              number={t.foods.celebrate.stat3.number}
              label={t.foods.celebrate.stat3.label}
            />
            <StatItem 
              icon="/images/icons/calendar-white.png"
              number={t.foods.celebrate.stat4.number}
              label={t.foods.celebrate.stat4.label}
            />
          </div>
        </div>
      </section>

      {/*HELP & CONTACT*/}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.foods.contact.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t.foods.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#F8F9F5] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
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

              <Link 
                href="https://wa.me/6282225142729"
                className="bg-[#8F9E75] text-white text-sm font-bold py-3 px-8 rounded-lg hover:bg-[#7A8B60] transition-colors shadow-sm"
              >
                {t.foods.contact.card2.desc}
              </Link>
            </div>

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

              <a href="mailto:catering@tembihistoricalhome.com" className="text-[#8F9E75] font-bold text-lg mb-2 hover:underline break-all">
                {t.foods.contact.card3.phone}
              </a>
              <p className="text-gray-400 text-xs font-medium">{t.foods.contact.card3.desc}</p>
            </div>
          </div>
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

interface InfoItemProps {
  icon: string;
  title: string;
  desc: string;
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 mt-1">
        <div className="w-6 h-6 flex items-center justify-center overflow-hidden relative">
           <Image 
             src="/images/icons/check-green.png" 
             alt="Check"
             fill
             className="object-contain" 
           />
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 text-base">{title}</h4>
        <p className="text-gray-500 text-sm mt-1">{desc}</p>
      </div>
    </div>
  );
}

function InfoItem({ icon, title, desc }: InfoItemProps) {
  return (
    <div className="flex flex-col items-center px-4 pt-4 md:pt-0">
      <div className="mb-4">
         <Image src={icon} alt={title} width={32} height={32} className="w-8 h-8 opacity-80" />
      </div>
      <h4 className="font-serif text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-500 max-w-xs mx-auto">{desc}</p>
    </div>
  );
}

// --- COMPONENT HELPER ---

interface HeritageItemProps {
  icon: string;
  title: string;
  desc: string;
}

function HeritageItem({ icon, title, desc }: HeritageItemProps) {
  return (
    <div className="flex gap-5 items-start">
      <div className="flex-shrink-0 mt-1">
        <Image 
          src={icon} 
          alt={title} 
          width={20} 
          height={20} 
          className="w-5 h-5 object-contain opacity-90" 
        />
      </div>
      <div>
        <h4 className="font-serif text-xl font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

interface OccasionItemProps {
  image: string;
  title: string;
  subtitle: string;
  features: string[];
}

function OccasionItem({ image, title, subtitle, features }: OccasionItemProps) {
  return (
    <div className="group">
      <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 shadow-md">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <h3 className="font-serif text-2xl font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-300 text-sm font-medium">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-3 px-2">
        {features.map((feat, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-4 h-4 flex items-center justify-center overflow-hidden relative">
              <Image src="/images/icons/check-black.png" alt="check" fill className="" />
            </div>
            <span className="text-gray-600 text-sm">{feat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- INTERFACE & HELPER FOR STATS ---
interface StatItemProps {
  icon: string;
  number: string;
  label: string;
}

function StatItem({ icon, number, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Green Circle Icon */}
      <div className="w-16 h-16 rounded-full bg-[#8F9E75] flex items-center justify-center mb-4 shadow-lg shadow-[#8F9E75]/30">
        <Image 
          src={icon} 
          alt={label} 
          width={28} height={28} 
          className="object-contain"
        />
      </div>
      {/* Number */}
      <div className="font-serif text-3xl font-bold text-gray-900 mb-1">{number}</div>
      {/* Label */}
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  );
}