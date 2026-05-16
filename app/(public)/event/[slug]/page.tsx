'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import EventInfo from '@/components/EventInfo';
import EventGallery from '@/components/EventGallery';
import EventBookingCTA from '@/components/EventBookingCTA';

// Sample event data - in real app this would come from database/API
const eventsData = [
  {
    slug: 'javanese-wedding-ceremony',
    name: 'Javanese Wedding Ceremony',
    tagline: 'Traditional Javanese wedding ceremony in our beautiful pendopo',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
    date: '2025-06-15',
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
    date: '2025-05-20',
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
    date: '2025-05-25',
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
    date: '2025-06-01',
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
    date: '2025-06-10',
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
    date: '2025-05-30',
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
  const event = eventsData.find((e) => e.slug === slug);

  if (!event) {
    return notFound();
  }

  return (
    <main className="bg-[#F8F9FA] min-h-screen pb-20">
      {/* Hero Section */}
      <PageHero
        backgroundImage={event.imageUrl}
        title={event.name}
        description={event.tagline}
        height="md"
        overlay="gradient-dark"
        backButton={{
          show: true,
          href: '/event',
          text: 'Back to Events',
        }}
      />

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-10 py-12 space-y-8">
        {/* Event Info */}
        <EventInfo
          name={event.name}
          date={event.date}
          time={event.time}
          location={event.location}
          capacity={event.capacity}
          price={event.price}
          category={event.category}
          description={event.description}
          included={event.included}
          requirements={event.requirements}
        />

        {/* Gallery */}
        {event.galleryImages && event.galleryImages.length > 0 && (
          <EventGallery
            eventName={event.name}
            galleryImages={event.galleryImages}
          />
        )}

        {/* Booking CTA */}
        <EventBookingCTA
          eventName={event.name}
          price={event.price}
          date={event.date}
        />
      </div>
    </main>
  );
}
