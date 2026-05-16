'use client';

import { useLanguage } from "@/app/(public)/context/LanguageContext";
import EventCard from "@/components/EventCard";
import ScrollReveal from "@/components/ScrollReveal";

// Sample event data - in real app this would come from database/API
const events = [
  {
    id: 1,
    slug: 'javanese-wedding-ceremony',
    title: 'Javanese Wedding Ceremony',
    shortDesc: 'Traditional Javanese wedding ceremony in our beautiful pendopo with gamelan music',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
    date: '2025-06-15',
    location: 'Main Pendopo',
    capacity: 150,
    category: 'Wedding'
  },
  {
    id: 2,
    slug: 'gamelan-music-workshop',
    title: 'Gamelan Music Workshop',
    shortDesc: 'Learn the art of traditional Javanese gamelan music from master musicians',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2000&auto=format&fit=crop',
    date: '2025-05-20',
    location: 'Cultural Hall',
    capacity: 30,
    category: 'Workshop'
  },
  {
    id: 3,
    slug: 'batik-making-class',
    title: 'Batik Making Class',
    shortDesc: 'Discover the ancient art of batik and create your own masterpiece',
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000&auto=format&fit=crop',
    date: '2025-05-25',
    location: 'Art Studio',
    capacity: 20,
    category: 'Workshop'
  },
  {
    id: 4,
    slug: 'javanese-culinary-night',
    title: 'Javanese Culinary Night',
    shortDesc: 'Experience authentic Javanese cuisine in a traditional dinner setting',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop',
    date: '2025-06-01',
    location: 'Garden Pavilion',
    capacity: 80,
    category: 'Culinary'
  },
  {
    id: 5,
    slug: 'yoga-meditation-retreat',
    title: 'Yoga & Meditation Retreat',
    shortDesc: 'Find inner peace with yoga and meditation in nature',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop',
    date: '2025-06-10',
    location: 'Garden Area',
    capacity: 25,
    category: 'Wellness'
  },
  {
    id: 6,
    slug: 'heritage-photography-tour',
    title: 'Heritage Photography Tour',
    shortDesc: 'Capture the beauty of traditional Javanese architecture',
    imageUrl: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=2000&auto=format&fit=crop',
    date: '2025-05-30',
    location: 'All Venues',
    capacity: 15,
    category: 'Tour'
  }
];

export default function EventPage() {
  const { t } = useLanguage();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <ScrollReveal key={event.id} animation="fadeUp" delay={index * 100}>
              <EventCard event={event} />
            </ScrollReveal>
          ))}
        </div>
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
