'use client';

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { useEventContext } from "@/app/context/EventContext";
import EventCard from "@/components/EventCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function EventPage() {
  const { language } = useLanguage();
  const { events, eventsLoading, eventsError } = useEventContext();
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  // Filter events by date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date_event);
    eventDate.setHours(0, 0, 0, 0);

    if (filter === 'upcoming') {
      return eventDate >= today;
    } else {
      return eventDate < today;
    }
  });

  return (
    <main className="w-full min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2400&auto=format&fit=crop"
            alt="Events & Workshops"
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
                src="/images/icons/calendar-white.png"
                alt="Events"
                width={16}
                height={16}
                className="w-4 h-4 object-contain brightness-0 invert"
              />
              <span className="text-sm font-medium tracking-wide text-white">Events & Workshops</span>
            </div>

            <h1 className="font-serif text-6xl font-bold text-white mb-6 leading-none drop-shadow-lg">
              Cultural <br /> Journey
            </h1>

            <p className="font-serif italic text-lg text-gray-200 mb-6 tracking-wide">
              Experience Javanese Heritage & Traditions
            </p>

            <p className="text-base text-gray-300 leading-relaxed max-w-xl">
              Immerse yourself in Javanese culture through our curated events, workshops, and celebrations
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <a href="#event-content" className="animate-bounce cursor-pointer p-2 block">
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

      {/* Events Grid */}
      <section id="event-content" className="py-24 px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto bg-white">
        <ScrollReveal animation="fadeUp" duration={800}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Image
                src="/images/icons/calendar-black.png"
                alt="icon"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Cultural Events
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our <span className="text-[#8F9E75]">Cultural Journey</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              From traditional ceremonies to hands-on workshops, discover the richness of Javanese heritage
            </p>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  filter === 'upcoming'
                    ? 'bg-[#8F9E75] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  filter === 'past'
                    ? 'bg-[#8F9E75] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Loading State */}
        {eventsLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B9D68]"></div>
          </div>
        ) : eventsError ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{eventsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#8B9D68] text-white px-6 py-2 rounded-lg hover:bg-[#7a8c5e] transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <ScrollReveal key={event.id} animation="fadeUp" delay={index * 100} duration={800}>
                  <EventCard
                    event={{
                      id: event.id,
                      slug: event.slug,
                      title: language === 'id' ? event.title_ind : event.title_eng,
                      shortDesc: language === 'id' ? event.about_ind : event.about_eng,
                      imageUrl: event.thumbnail,
                      date: event.date_event,
                      location: event.hosted_by,
                      capacity: 0,
                      category: '' // Category removed as per previous update
                    }}
                  />
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-lg">
                  {filter === 'upcoming' ? 'No upcoming events at the moment' : 'No past events found'}
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="scaleUp" duration={800}>
            <div className="bg-gradient-to-r from-[#8F9E75] to-[#7A8B60] rounded-2xl p-12 text-center text-white">
              <h3 className="text-3xl font-serif font-bold mb-4">
                Want to Host Your Event?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Our historic venues provide the perfect setting for weddings, corporate retreats, and cultural celebrations
              </p>
              <a
                href="https://wa.me/6282138445566?text=Hi,%20I%20would%20like%20to%20inquire%20about%20venue%20booking%20for%20an%20event"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#8F9E75] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Explore Venues
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
