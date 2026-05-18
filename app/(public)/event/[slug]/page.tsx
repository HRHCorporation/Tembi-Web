'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar, MapPin, Users, Clock, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface EventDetail {
  id: number;
  name_ind: string;
  name_eng: string;
  tagline_ind: string;
  tagline_eng: string;
  shortDesc_ind: string;
  shortDesc_eng: string;
  description_ind: string[];
  description_eng: string[];
  imageUrl: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  included_ind: string[];
  included_eng: string[];
  requirements_ind: string[];
  requirements_eng: string[];
  galleryImages: string[];
}

// Fallback static data for development
const fallbackEventsData = [
  {
    slug: 'javanese-wedding-ceremony',
    name: 'Javanese Wedding Ceremony',
    tagline: 'Traditional Javanese wedding ceremony in our beautiful pendopo',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
    date: '2026-07-15',
    time: '09:00 - 17:00',
    location: 'Main Pendopo',
    capacity: 150,
    price: 25000000,
    category: 'Wedding',
    description: [
      'Experience the timeless beauty of a traditional Javanese wedding ceremony at Tembi Cultural House. Our historic pendopo provides the perfect backdrop for your special day, combining authentic cultural elements with modern comforts.',
      'The ceremony includes traditional gamelan music, professional wedding coordinators, and full venue decoration in classic Javanese style. Our experienced team will guide you through every step of the traditional rituals.',
      'The spacious pendopo can accommodate up to 150 guests, with additional garden areas available for cocktail receptions. We offer customizable packages to suit your vision and budget.'
    ],
    included: [
      'Venue rental (full day)',
      'Traditional gamelan ensemble',
      'Wedding coordinator',
      'Javanese decoration',
      'Catering for 150 guests',
      'Photo & video documentation',
      'Bridal preparation room',
      'Guest parking'
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2000&auto=format&fit=crop'
    ],
    requirements: [
      'Booking must be made at least 3 months in advance',
      'Down payment of 50% required upon booking',
      'Final guest count must be confirmed 2 weeks before event',
      'Event must conclude by 22:00'
    ]
  },
  {
    slug: 'gamelan-music-workshop',
    name: 'Gamelan Music Workshop',
    tagline: 'Learn traditional Javanese gamelan from master musicians',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2000&auto=format&fit=crop',
    date: '2026-06-20',
    time: '14:00 - 17:00',
    location: 'Cultural Hall',
    capacity: 30,
    price: 250000,
    category: 'Workshop',
    description: [
      'Discover the enchanting world of gamelan music in this immersive 3-hour workshop led by master musicians. Learn about the history, cultural significance, and playing techniques of this ancient Indonesian art form.',
      'This hands-on workshop is suitable for all levels, from complete beginners to those with some musical experience. You will learn to play basic melodies on various gamelan instruments including the saron, bonang, and kendang.',
      'The workshop includes a traditional Javanese snack break and concludes with a group performance where participants play together as an ensemble.'
    ],
    included: [
      'Expert instruction',
      'All instruments provided',
      'Traditional snacks & drinks',
      'Workshop certificate',
      'Take-home learning materials',
      'Photo opportunities in traditional attire'
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000&auto=format&fit=crop'
    ],
    requirements: [
      'No prior musical experience required',
      'Minimum age: 12 years old',
      'Comfortable clothing recommended',
      'Arrive 15 minutes before workshop starts'
    ]
  },
  {
    slug: 'batik-making-class',
    name: 'Batik Making Class',
    tagline: 'Create your own batik masterpiece',
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000&auto=format&fit=crop',
    date: '2026-06-25',
    time: '10:00 - 15:00',
    location: 'Art Studio',
    capacity: 20,
    price: 350000,
    category: 'Workshop',
    description: [
      'Immerse yourself in the ancient art of batik making in this full-day workshop. Learn the traditional wax-resist dyeing technique that has been passed down through generations of Javanese artisans.',
      'Under the guidance of experienced batik masters, you will design and create your own piece of batik fabric to take home. The workshop covers the complete process from design conception to final washing and finishing.',
      'All materials and tools are provided, including quality cotton fabric, traditional canting tools, wax, and natural dyes. Lunch featuring authentic Javanese cuisine is included.'
    ],
    included: [
      'Expert batik master instruction',
      'All materials & tools',
      'Quality cotton fabric (1 meter)',
      'Traditional Javanese lunch',
      'Beverage throughout the day',
      'Take-home batik creation',
      'Workshop apron provided'
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2000&auto=format&fit=crop'
    ],
    requirements: [
      'Suitable for ages 15 and above',
      'Wear old clothes (dye may stain)',
      'Closed-toe shoes required',
      'Maximum 20 participants per session'
    ]
  },
  {
    slug: 'javanese-culinary-night',
    name: 'Javanese Culinary Night',
    tagline: 'Experience authentic Javanese cuisine in a traditional setting',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop',
    date: '2026-07-01',
    time: '18:00 - 22:00',
    location: 'Garden Pavilion',
    capacity: 80,
    price: 450000,
    category: 'Culinary',
    description: [
      'Indulge in an authentic Javanese culinary journey featuring traditional dishes prepared using centuries-old recipes and cooking methods. This unique dining experience combines exquisite flavors with cultural storytelling.',
      'The evening begins with a welcome drink and traditional snacks, followed by a multi-course dinner featuring signature Javanese dishes. Each course is paired with explanations of the cultural significance and ingredients used.',
      'Enjoy your meal in the romantic setting of our garden pavilion, accompanied by soft gamelan music. This intimate dining experience is perfect for food enthusiasts and those seeking to deepen their understanding of Javanese culture.'
    ],
    included: [
      'Welcome drink & traditional snacks',
      '7-course Javanese dinner',
      'Cultural storytelling with each course',
      'Traditional music performance',
      'Recipe booklet to take home',
      'Complimentary herbal tea',
      'Professional photographer'
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2000&auto=format&fit=crop'
    ],
    requirements: [
      'Advance booking required (minimum 3 days)',
      'Inform us of any dietary restrictions',
      'Smart casual dress code',
      'Children under 12 must be accompanied by adults'
    ]
  },
  {
    slug: 'yoga-meditation-retreat',
    name: 'Yoga & Meditation Retreat',
    tagline: 'Find inner peace with yoga and meditation in nature',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop',
    date: '2026-07-10',
    time: '06:00 - 12:00',
    location: 'Garden Area',
    capacity: 25,
    price: 300000,
    category: 'Wellness',
    description: [
      'Start your day with rejuvenating yoga and meditation sessions in the serene surroundings of our traditional Javanese garden. This retreat offers a perfect blend of physical practice and mental relaxation.',
      'The morning begins with a guided meditation at sunrise, followed by a 90-minute yoga session suitable for all levels. Experience the healing power of nature as you practice among tropical plants and historic pavilions.',
      'The retreat concludes with a healthy breakfast featuring organic ingredients and herbal teas. Take home practical techniques for incorporating mindfulness into your daily life.'
    ],
    included: [
      'Sunrise meditation session',
      '90-minute yoga class',
      'Professional yoga instructor',
      'Yoga mat & props provided',
      'Healthy organic breakfast',
      'Herbal tea & fresh juices',
      'Wellness guidebook'
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=2000&auto=format&fit=crop'
    ],
    requirements: [
      'Suitable for all fitness levels',
      'Wear comfortable athletic clothing',
      'Bring water bottle',
      'Arrive 15 minutes early'
    ]
  },
  {
    slug: 'heritage-photography-tour',
    name: 'Heritage Photography Tour',
    tagline: 'Capture the beauty of traditional Javanese architecture',
    imageUrl: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=2000&auto=format&fit=crop',
    date: '2026-06-30',
    time: '08:00 - 12:00',
    location: 'All Venues',
    capacity: 15,
    price: 400000,
    category: 'Tour',
    description: [
      'Explore and photograph the stunning traditional Javanese architecture of Tembi Cultural House with guidance from a professional photographer. This tour is designed for photography enthusiasts of all skill levels.',
      'Learn composition techniques, lighting tips, and how to capture the essence of traditional architecture. Visit hidden corners and photogenic spots throughout the property that showcase the best of Javanese design.',
      'The tour includes hands-on instruction, photo critique sessions, and insights into the cultural significance of architectural elements. Perfect for building your portfolio or simply capturing beautiful memories.'
    ],
    included: [
      'Professional photography guide',
      'Access to all venues & buildings',
      'Photography tips & techniques',
      'Cultural architecture insights',
      'Light refreshments',
      'Digital photo booklet',
      'Best shot printed & framed'
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2000&auto=format&fit=crop'
    ],
    requirements: [
      'Bring your own camera (DSLR, mirrorless, or smartphone)',
      'Comfortable walking shoes required',
      'Basic photography knowledge helpful but not required',
      'Maximum 15 participants for personalized attention'
    ]
  }
];

export default function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { language } = useLanguage();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEventDetail() {
      try {
        const response = await fetch(`/api/public/events/${slug}`);
        const result = await response.json();

        if (result.success) {
          setEvent(result.data);
        } else {
          // Try fallback to static data
          const fallbackEvent = fallbackEventsData.find((e) => e.slug === slug);
          if (fallbackEvent) {
            // Convert fallback format to API format
            setEvent({
              id: 0,
              name_ind: fallbackEvent.name,
              name_eng: fallbackEvent.name,
              tagline_ind: fallbackEvent.tagline,
              tagline_eng: fallbackEvent.tagline,
              shortDesc_ind: '',
              shortDesc_eng: '',
              description_ind: fallbackEvent.description,
              description_eng: fallbackEvent.description,
              imageUrl: fallbackEvent.imageUrl,
              slug: fallbackEvent.slug,
              date: fallbackEvent.date,
              time: fallbackEvent.time,
              location: fallbackEvent.location,
              capacity: fallbackEvent.capacity,
              price: fallbackEvent.price,
              included_ind: fallbackEvent.included,
              included_eng: fallbackEvent.included,
              requirements_ind: fallbackEvent.requirements,
              requirements_eng: fallbackEvent.requirements,
              galleryImages: fallbackEvent.galleryImages
            });
          } else {
            setError(result.message || 'Event not found');
          }
        }
      } catch (err) {
        // Try fallback to static data on error
        const fallbackEvent = fallbackEventsData.find((e) => e.slug === slug);
        if (fallbackEvent) {
          setEvent({
            id: 0,
            name_ind: fallbackEvent.name,
            name_eng: fallbackEvent.name,
            tagline_ind: fallbackEvent.tagline,
            tagline_eng: fallbackEvent.tagline,
            shortDesc_ind: '',
            shortDesc_eng: '',
            description_ind: fallbackEvent.description,
            description_eng: fallbackEvent.description,
            imageUrl: fallbackEvent.imageUrl,
            slug: fallbackEvent.slug,
            date: fallbackEvent.date,
            time: fallbackEvent.time,
            location: fallbackEvent.location,
            capacity: fallbackEvent.capacity,
            price: fallbackEvent.price,
            included_ind: fallbackEvent.included,
            included_eng: fallbackEvent.included,
            requirements_ind: fallbackEvent.requirements,
            requirements_eng: fallbackEvent.requirements,
            galleryImages: fallbackEvent.galleryImages
          });
        } else {
          setError('Failed to load event');
        }
        console.error('Error fetching event detail:', err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchRelatedEvents() {
      try {
        const response = await fetch('/api/public/events');
        const result = await response.json();

        if (result.success) {
          // Filter out current event and get only upcoming events
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const filtered = result.data
            .filter((e: any) => {
              const eventDate = new Date(e.date);
              eventDate.setHours(0, 0, 0, 0);
              return e.slug !== slug && eventDate >= today;
            })
            .slice(0, 4); // Max 4 events

          setRelatedEvents(filtered);
        }
      } catch (err) {
        console.error('Error fetching related events:', err);
      }
    }

    fetchEventDetail();
    fetchRelatedEvents();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdfcf7] flex flex-col items-center justify-center p-6 text-[#2d3436]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8da077]"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#fdfcf7] flex flex-col items-center justify-center p-6 text-[#2d3436]">
        <h1 className="text-xl font-serif mb-4 text-[#8da077]">
          {language === 'id' ? 'Event Tidak Ditemukan' : 'Event Not Found'}
        </h1>
        <Link href="/event" className="font-bold flex items-center gap-2 text-[#8da077] hover:opacity-70 transition-opacity">
          <ArrowLeft size={18} /> {language === 'id' ? 'Kembali ke Event' : 'Back to Events'}
        </Link>
      </div>
    );
  }

  const eventName = language === 'id' ? event.name_ind : event.name_eng;
  const eventTagline = language === 'id' ? event.tagline_ind : event.tagline_eng;
  const eventDescription = language === 'id' ? event.description_ind : event.description_eng;
  const eventIncluded = language === 'id' ? event.included_ind : event.included_eng;
  const eventRequirements = language === 'id' ? event.requirements_ind : event.requirements_eng;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#fdfcf7] text-[#2d3436] pb-20 font-sans">

      {/* Navigation Header */}
      <div className="container mx-auto px-6 pt-32 mb-10">
        <Link href="/event" className="inline-flex items-center gap-2 text-[#8da077] hover:opacity-70 transition-opacity mb-6">
          <div className="w-7 h-7 rounded-full border border-[#8da077] flex items-center justify-center">
            <ChevronLeft size={14} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            {language === 'id' ? 'Event' : 'Events'}
          </span>
        </Link>

        <div className="max-w-4xl text-left">
          <div className="flex items-center gap-3 mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>{formatDate(event.date)}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-4 tracking-tight text-[#2d3436]">
            {eventName}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {eventTagline}
          </p>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-5xl mx-auto w-full h-[35vh] md:h-[50vh] rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50">
          <img
            src={event.imageUrl}
            alt={eventName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">

          {/* Event Details Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-gray-100 mb-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#8da077]">
                <Calendar size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  {language === 'id' ? 'Tanggal' : 'Date'}
                </span>
              </div>
              <span className="text-sm font-medium text-[#2d3436]">{formatDate(event.date)}</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#8da077]">
                <Clock size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  {language === 'id' ? 'Waktu' : 'Time'}
                </span>
              </div>
              <span className="text-sm font-medium text-[#2d3436]">{event.time}</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#8da077]">
                <MapPin size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  {language === 'id' ? 'Lokasi' : 'Location'}
                </span>
              </div>
              <span className="text-sm font-medium text-[#2d3436]">{event.location}</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#8da077]">
                <Users size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  {language === 'id' ? 'Kapasitas' : 'Capacity'}
                </span>
              </div>
              <span className="text-sm font-medium text-[#2d3436]">{event.capacity} {language === 'id' ? 'orang' : 'people'}</span>
            </div>
          </div>

          {/* Description */}
          <article className="prose prose-stone max-w-none mb-16">
            <h2 className="text-2xl font-serif font-bold mb-6 text-[#2d3436]">
              {language === 'id' ? 'Tentang Event' : 'About This Event'}
            </h2>
            {eventDescription.map((paragraph, index) => (
              <p
                key={index}
                className="text-[#4a4a4a] leading-loose text-lg font-normal mb-8 tracking-wide text-justify md:text-left"
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* What's Included */}
          {eventIncluded && eventIncluded.length > 0 && (
            <div className="mb-16 bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-serif font-bold mb-6 text-[#2d3436] flex items-center gap-2">
                <Check size={20} className="text-[#8da077]" />
                {language === 'id' ? 'Yang Termasuk' : "What's Included"}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {eventIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#4a4a4a]">
                    <Check size={16} className="text-[#8da077] mt-1 shrink-0" />
                    <span className="text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {eventRequirements && eventRequirements.length > 0 && (
            <div className="mb-16 bg-amber-50 rounded-2xl p-8 border border-amber-100">
              <h3 className="text-xl font-serif font-bold mb-6 text-[#2d3436] flex items-center gap-2">
                <AlertCircle size={20} className="text-amber-600" />
                {language === 'id' ? 'Persyaratan & Informasi' : 'Requirements & Information'}
              </h3>
              <ul className="space-y-3">
                {eventRequirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#4a4a4a]">
                    <AlertCircle size={16} className="text-amber-600 mt-1 shrink-0" />
                    <span className="text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {event.galleryImages && event.galleryImages.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-serif font-bold mb-6 text-[#2d3436]">
                {language === 'id' ? 'Galeri' : 'Gallery'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.galleryImages.map((image, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-md">
                    <img
                      src={image}
                      alt={`${eventName} - ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking CTA */}
          <div className="mb-16 bg-[#8da077] text-white rounded-2xl p-8 text-center">
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-90">
                {language === 'id' ? 'Harga Per Orang' : 'Price Per Person'}
              </p>
              <p className="text-4xl font-bold font-serif">{formatPrice(event.price)}</p>
            </div>
            <Link
              href={`/booking?event=${event.slug}&date=${event.date}`}
              className="inline-block bg-white text-[#8da077] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors"
            >
              {language === 'id' ? 'Pesan Sekarang' : 'Book Now'}
            </Link>
            <p className="mt-4 text-sm opacity-90">
              {language === 'id'
                ? 'Booking diperlukan untuk mengikuti event ini'
                : 'Booking required to attend this event'}
            </p>
          </div>

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div className="pt-16 border-t border-gray-200">
              <h2 className="text-2xl font-serif font-bold mb-10 text-[#2d3436]">
                {language === 'id' ? 'Event Lainnya' : 'Other Events'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {relatedEvents.map((relatedEvent) => (
                  <Link key={relatedEvent.id} href={`/event/${relatedEvent.slug}`} className="group">
                    <div className="flex flex-col gap-5">
                      <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-md">
                        <img
                          src={relatedEvent.imageUrl}
                          alt={language === 'id' ? relatedEvent.name_ind : relatedEvent.name_eng}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <Calendar size={12} className="text-[#8da077]" />
                          <span>{formatDate(relatedEvent.date)}</span>
                        </div>
                        <h4 className="font-serif font-bold text-xl group-hover:text-[#8da077] transition-colors leading-snug text-[#2d3436]">
                          {language === 'id' ? relatedEvent.name_ind : relatedEvent.name_eng}
                        </h4>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {language === 'id' ? relatedEvent.tagline_ind : relatedEvent.tagline_eng}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
