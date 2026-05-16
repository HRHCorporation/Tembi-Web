'use client';

import { useState, useEffect } from "react";
import { useLanguage } from "@/app/(public)/context/LanguageContext";
import EventCard from "@/components/EventCard";
import ScrollReveal from "@/components/ScrollReveal";

interface Event {
  id: number;
  title_ind: string;
  title_eng: string;
  shortDesc_ind: string;
  shortDesc_eng: string;
  imageUrl: string;
  slug: string;
  date: string;
  location: string;
  capacity: number;
  price: number;
}

export default function EventPage() {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/public/events');
        const result = await response.json();

        if (result.success) {
          setEvents(result.data);
        } else {
          setError(result.message || 'Failed to fetch events');
        }
      } catch (err) {
        setError('Failed to load events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2400&auto=format&fit=crop)',
          }}
        ></div>

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-4xl">
          <ScrollReveal animation="fadeUp">
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-4">
              Cultural Activities
            </span>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={150}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
              Events & Workshops
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={300}>
            <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Immerse yourself in Javanese culture through our curated events, workshops, and celebrations
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Events Grid */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <ScrollReveal animation="fadeUp">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#8B9D68] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-4">
              Upcoming Events
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              Join Our Cultural Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From traditional ceremonies to hands-on workshops, discover the richness of Javanese heritage
            </p>
          </div>
        </ScrollReveal>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B9D68]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#8B9D68] text-white px-6 py-2 rounded-lg hover:bg-[#7a8c5e] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length > 0 ? (
              events.map((event, index) => (
                <ScrollReveal key={event.id} animation="fadeUp" delay={index * 100}>
                  <EventCard
                    event={{
                      id: event.id,
                      slug: event.slug,
                      title: language === 'id' ? event.title_ind : event.title_eng,
                      shortDesc: language === 'id' ? event.shortDesc_ind : event.shortDesc_eng,
                      imageUrl: event.imageUrl,
                      date: event.date,
                      location: event.location,
                      capacity: event.capacity,
                      category: '' // Category removed as per previous update
                    }}
                  />
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-lg">No events available at the moment</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-8 pb-20">
        <ScrollReveal animation="scaleUp">
          <div className="bg-gradient-to-r from-[#8B9D68] to-[#738354] rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-serif font-bold mb-4">
              Want to Host Your Event?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our historic venues provide the perfect setting for weddings, corporate retreats, and cultural celebrations
            </p>
            <a
              href="/venue"
              className="inline-block bg-white text-[#8B9D68] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg"
            >
              Explore Venues
            </a>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
