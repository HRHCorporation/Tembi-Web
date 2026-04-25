import React from 'react';
import Image from 'next/image';

interface FeatureItem {
  title: string;
  desc: string;
  iconSrc: string; 
}

interface SpaceItem {
  title: string;
  desc: string;
  imageSrc: string;
}

const SpacesSection: React.FC = () => {
  
  const features: FeatureItem[] = [
    {
      title: "Lodging",
      desc: "Traditional rooms with modern amenities",
      iconSrc: "/images/icons/bed-white.png",
    },
    {
      title: "Restaurant",
      desc: "Authentic Javanese cuisine",
      iconSrc: "/images/icons/food-white.png",
    },
    {
      title: "Gallery",
      desc: "Cultural art exhibitions",
      iconSrc: "/images/icons/gallery-white.png",
    },
    {
      title: "Amphitheater",
      desc: "Performance and dance studio",
      iconSrc: "/images/icons/mask-white.png",
    },
    {
      title: "Library",
      desc: "Cultural literature collection",
      iconSrc: "/images/icons/book-white.png",
    },
    {
      title: "Meeting Room",
      desc: "Business and cultural events",
      iconSrc: "/images/icons/handshake-white.png",
    },
    {
      title: "Swimming Pool",
      desc: "Relaxation and wellness",
      iconSrc: "/images/icons/pool-white.png",
    },
    {
      title: "Wedding Venue",
      desc: "Traditional ceremony spaces",
      iconSrc: "/images/icons/ring-white.png",
    },
  ];

  const mainSpaces: SpaceItem[] = [
    {
      title: "Heritage Accommodation",
      desc: "Experience authentic Javanese hospitality in rooms decorated with traditional crafts and modern comfort.",
      imageSrc: "/images/sejarah/sejarah8.webp",
    },
    {
      title: "Cultural Venues",
      desc: "Our amphitheater and studios host regular performances, workshops, and cultural celebrations.",
      imageSrc: "/images/sejarah/sejarah9.webp",
    },
    {
      title: "Special Events",
      desc: "Create memorable moments with traditional Javanese ceremonies and modern event facilities.",
      imageSrc: "/images/sejarah/sejarah10.webp",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-screen-xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-sm font-bold tracking-widest text-[#9CA389] uppercase mb-4">
            Our Spaces
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4A3B2A] mb-6">
            Where Culture Meets Comfort
          </h2>
          <p className="text-gray-600 text-lg font-light leading-relaxed">
            Every space at Tembi is thoughtfully designed to honor our heritage while offering comfort and practicality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="bg-[#F8F6F1] rounded-2xl p-8 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-tembi rounded-full flex items-center justify-center mb-6 shadow-sm">
                <div className="relative w-8 h-8">
                  <Image 
                    src={item.iconSrc} 
                    alt={item.title} 
                    fill 
                    className="object-contain brightness-0 invert" 
                  />
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#4A3B2A] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainSpaces.map((space, index) => (
            <div 
              key={index} 
              className="group bg-[#F8F6F1] rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image 
                  src={space.imageSrc} 
                  alt={space.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-[#4A3B2A] mb-4">
                  {space.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed text-sm">
                  {space.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SpacesSection;