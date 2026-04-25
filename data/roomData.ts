export interface Room {
  id: number;
  badge: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription:string[];
  imageUrl: string;
  galleryImages: string[];
  price: number; 
  details: {
    bed: string;
    guests: number;
    size: string;
    view: string;
  };
  detailsIcons: string;
  amenities: string[];
  amenitiesIcons: string;
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string[];
  };
  houseRules: {
    smoking: boolean;
    pets: boolean;
    quietHours: string;
  };  
  rating?: number;
  layoutType: 'featured' | 'standard';
}

export const roomData: Room[] = [
  {
    id: 1,
    badge: "Premium",
    slug: "ngadirojo-house",
    name: "Ngadirojo House",
    tagline: "A Javanese Limasan with Pool and Rice Field Views",
    price: 547000,
    description: "Enjoy a meaningful Javanese stay in our suite, complete with traditional joglo architecture, a private garden terrace, and cultural concierge support.",
    longDescription:[ 
      "Ngadirojo House is a traditional Javanese limasan built in 1946 and relocated from Bawak Village, Cawas, Klaten, Central Java, to Tembi in 2007. Combining Javanese architecture with natural tranquility, it is an ideal choice for guests seeking peace and culture.",
      "With 43.2 square meters, the house includes free Wi-Fi, air conditioning, a minibar, and a private bathroom. Its highlight is the view: the front terrace overlooks a lush garden, while the back terrace opens directly to the swimming pool and expansive rice fields.",
      "The name “Ngadirojo” comes from a region in Wonogiri, Central Java, where Mr. F. W. Santopratiknya lived between 1944 and 1946. The house symbolizes the harmony of comfort, natural beauty, and family history."
    ],
    imageUrl: "/images/rooms/ngadirojo/ngadirojo1.webp",
    galleryImages: [
      "/images/rooms/ngadirojo/ngadirojo2.webp",
      "/images/rooms/ngadirojo/ngadirojo3.webp",
      "/images/rooms/ngadirojo/ngadirojo4.webp",
      "/images/rooms/ngadirojo/ngadirojo.webp",
      "/images/rooms/ngadirojo/ngadirojo5.webp",
    ],
    details: { bed: "King Size Bed", guests: 2, size: "43,2 m²", view: "Pool View" },
    detailsIcons:"/images/icons/swim-white.webp",
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Pool View", "Minibar", "Terrace"],
    amenitiesIcons:"/images/icons/swim-white.webp",
    policies: { 
        checkIn: "03:00 PM", 
        checkOut: "12:00 PM", 
        cancellation: ["Free cancellation 48h before", "50% refund 24h before", "No refund same day"] 
    },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'featured'
  },
  {
    id: 2,
    badge: "Premium",
    slug: "polaman-house",
    name: "Polaman House",
    tagline: "A Spacious Javanese Limasan with Pool and Rice Field Views",
    price: 700000,
    description: "Experience a peaceful Javanese stay in our suite, featuring traditional joglo architecture, a private garden terrace, pool view, and personalized cultural concierge service.",
    longDescription:[ 
      "Polaman House is a traditional Javanese limasan built in 1948 and relocated from Bawak Village, Cawas, Klaten, to Tembi in 2007. It combines the warmth of Javanese architecture with natural landscapes, making it perfect for an authentic and peaceful stay.",
      "With 63.13 square meters, the house provides free Wi-Fi, air conditioning, a minibar, a private bathroom, and a cozy terrace. The front terrace faces a shaded garden, while the back terrace overlooks the swimming pool and rice fields, offering a calming natural retreat.",
      "The name “Polaman” comes from an area in Sedayu, Bantul, where Mr. F. W. Santopratiknya lived between 1929 and 1931. The house embodies family history, blending cultural heritage with modern comfort.",
    ],
    imageUrl: "/images/rooms/polaman/polaman1.webp",
    galleryImages: [
      "/images/rooms/polaman/polaman2.webp",
      "/images/rooms/polaman/polaman.webp",
      "/images/rooms/polaman/polaman3.webp",
      "/images/rooms/polaman/polaman4.webp",
      "/images/rooms/polaman/polaman5.webp",
    ],
    details: { bed: "King Size Bed", guests: 2, size: "63,13 m²", view: "Pool View" },
    detailsIcons:"/images/icons/swim-white.webp",
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Pool View", "Minibar", "Terrace"],
    amenitiesIcons:"/images/icons/swim-green.webp",
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'featured'
  },

  {
    id: 3,
    badge: "Premium",
    slug: "adikarto-house",
    name: "Adikarto House",
    tagline: "The Serenity of a Classic Javanese Limasan Home",
    price: 430000,
    description: "Enjoy a meaningful Javanese stay with joglo-inspired architecture, a private garden terrace, relaxing garden view, and cultural concierge support.",
    longDescription:[ 
      "Adikarto House is a traditional Javanese limasan house that brings coolness and comfort in a natural atmosphere. Built in 1960 in Ngadirejo, Tepus, Gunung Kidul Regency, it was relocated to Tembi in 2007 as part of cultural preservation efforts.",
      "With 51.6 square meters of space, the house is equipped with free Wi-Fi, air conditioning, a minibar, a private bathroom, and a personal terrace facing the garden. The peaceful surroundings make it the perfect choice for guests seeking tranquility with a touch of tradition.",
      "The name “Adikarto” comes from an area in Kulon Progo Regency, better known as Wates, where Mr. F. W. Santopratiknya lived between 1931–1942 and 1949–1955. This house not only offers comfort but also preserves family history and cultural heritage.",
    ],
    imageUrl: "/images/rooms/adikarto/adikarto1.webp",
    galleryImages: [
      "/images/rooms/adikarto/adikarto2.webp",
      "/images/rooms/adikarto/adikarto.webp",
      "/images/rooms/adikarto/adikarto3.webp",
      "/images/rooms/adikarto/adikarto4.webp",
      "/images/rooms/adikarto/adikarto5.webp",
    ],
    details: { bed: "King Size Bed", guests: 2, size: "51,6 m²", view: "Garden View" },
    detailsIcons:"/images/icons/leaf-gray.webp",
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Garden View", "Minibar", "Terrace"],
    amenitiesIcons:"/images/icons/leaf-green.webp",
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'featured'
  },
 {
    id: 4,
    badge: "Premium",
    slug: "ganjuran-house",
    name: "Ganjuran House",
    tagline: "Harmony of Javanese Tradition and Nature",
    price: 682000,
    description: "Ganjuran House is a traditional limasan built in 1939 and relocated from Jepitu Hamlet, Tepus, Gunung Kidul, to Tembi in 2007. With its authentic Javanese architecture, it offers a serene stay deeply connected to cultural heritage.",
    longDescription:[ 
      "Ganjuran House is a traditional limasan built in 1939 and relocated from Jepitu Hamlet, Tepus, Gunung Kidul, to Tembi in 2007. With its authentic Javanese architecture, it offers a serene stay deeply connected to cultural heritage.",
      "Spanning 68.15 square meters, the house is equipped with free Wi-Fi, air conditioning, a minibar, a private bathroom, and a personal terrace overlooking the garden. The balance of modern comfort and natural atmosphere makes it ideal for relaxation or spending quality time with loved ones.",
      "The name “Ganjuran” is taken from an area in Bantul Regency, where Mr. F. W. Santopratiknya lived around 1929. Beyond comfort, the house carries historical and emotional connections to family heritage.",
    ],
    imageUrl: "/images/rooms/ganjuran/ganjuran1.webp",
    galleryImages: [
      "/images/rooms/ganjuran/ganjuran2.webp",
      "/images/rooms/ganjuran/ganjuran3.webp",
      "/images/rooms/ganjuran/ganjuran4.webp",
      "/images/rooms/ganjuran/ganjuran5.webp",
      "/images/rooms/ganjuran/ganjuran6.webp",
    ],
    details: { bed: "King Size Bed", guests: 3, size: "68,15 m²", view: "Garden View" },
    detailsIcons:"/images/icons/leaf-green.webp",
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Garden View", "Minibar", "Terrace"],
    amenitiesIcons:"/images/icons/leaf-green.webp",
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'standard'
  },
  {
    id: 5,
    badge: "Best Value",
    slug: "badegan-house",
    name: "Badegan House",
    tagline: "A Touch of Sundanese Tradition in Yogyakarta’s Nature",
    price: 430000,
    description: "Staying at Badegan House is more than just resting—it is about experiencing the warmth of a traditional Sundanese wooden house rich in meaning. Built in 1954 in Sumedang, West Java, this stilt house was relocated to Tembi in 2006.",
    longDescription:[ 
      "Staying at Badegan House is more than just resting—it is about experiencing the warmth of a traditional Sundanese wooden house rich in meaning. Built in 1954 in Sumedang, West Java, this stilt house was relocated to Tembi in 2006.",
      "Covering 46 square meters, Badegan House offers modern comforts such as free Wi-Fi, air conditioning, a minibar, and a private bathroom. Guests can also enjoy relaxing moments on the terrace overlooking a lush garden, a tranquil setting perfect for unwinding in harmony with nature.",
      "The name “Badegan” comes from a village in Bantul Regency, where Mr. F. W. Santopratiknya—the father of Mr. P. Swantoro—resided from 1958. Every corner of this house carries stories and cultural values, making it more than just a place to stay.",
    ],
    imageUrl: "/images/rooms/badegan/badegan1.webp",
    galleryImages: [
      "/images/rooms/badegan/badegan2.webp",
      "/images/rooms/badegan/badegan3.webp",
      "/images/rooms/badegan/badegan4.webp",
      "/images/rooms/badegan/badegan5.webp",
      "/images/rooms/badegan/badegan6.webp",
    ],
    details: { bed: "King Size Bed", guests: 4, size: "46 m²", view: "Garden View" },
    detailsIcons:"/images/icons/leaf-green.webp",
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Garden View", "Minibar", "Terrace"],
    amenitiesIcons:"/images/icons/leaf-green.webp",
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'standard'
  },
  {
    id: 6,
    badge: "Best Value",
    slug: "wuryantoro-house",
    name: "Wuryantoro House",
    tagline: "A Javanese Limasan Home Amidst Nature’s Calm",
    price: 430000,
    description: "Wuryantoro House is a traditional Javanese limasan home that blends heritage with modern comfort. Built in 1960 in Ngadirejo, Tepus, Gunung Kidul, it was relocated to Tembi in 2007.",
    longDescription:[ 
      "Wuryantoro House is a traditional Javanese limasan home that blends heritage with modern comfort. Built in 1960 in Ngadirejo, Tepus, Gunung Kidul, it was relocated to Tembi in 2007.",
      "With 40.5 square meters, the house features free Wi-Fi, air conditioning, a minibar, a private bathroom, and a terrace facing the garden. Its peaceful surroundings and greenery create the perfect setting for relaxation while embracing local culture.",
      "The name “Wuryantoro” comes from a region in Wonogiri, Central Java, where Mr. F. W. Santopratiknya lived between 1946 and 1948. Every element of this house reflects history and cultural roots, making it more than just accommodation.",
    ],
    imageUrl: "/images/rooms/wuryantoro/wuryantoro1.webp",
    galleryImages: [
      "/images/rooms/wuryantoro/wuryantoro2.webp",
      "/images/rooms/wuryantoro/wuryantoro3.webp",
      "/images/rooms/wuryantoro/wuryantoro4.webp",
      "/images/rooms/wuryantoro/wuryantoro5.webp",
      "/images/rooms/wuryantoro/wuryantoro6.webp",
    ],
    details: { bed: "King Size Bed", guests: 3, size: "40,5 m²", view: "Garden View" },
    detailsIcons:"/images/icons/leaf-green.webp",
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Garden View", "Minibar", "Terrace"],
    amenitiesIcons:"/images/icons/leaf-green.webp",
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'standard'
  },
  {
    id: 7,
    badge: "Premium",
    slug: "morangan-house",
    name: "Morangan House",
    tagline: "Three Levels of Comfort in Traditional Architecture",
    price: 970000,
    description: "Morangan House is a unique three-story accommodation created from three traditional Javanese houses originating from Tambak, Klaten (1936), Jepitu, Gunung Kidul (1939), and Majasto, Sukoharjo (1952). They were relocated and unified in Tembi in 2007, combining heritage with modern living.",
    longDescription:[ 
      "Morangan House is a unique three-story accommodation created from three traditional Javanese houses originating from Tambak, Klaten (1936), Jepitu, Gunung Kidul (1939), and Majasto, Sukoharjo (1952). They were relocated and unified in Tembi in 2007, combining heritage with modern living.",
      "With 70.7 square meters, Morangan House has two bedrooms, each with a private bathroom. The first floor includes a spacious living area and a bathtub for relaxation, while the rooftop offers open-air views. The house faces a garden at the front, rice fields at the back, and a swimming pool on the side—providing a refreshing atmosphere from every angle. Both front and back terraces enhance the experience of connecting with nature.",
      "The name “Morangan” comes from a village in Sleman, Yogyakarta, where Mr. F. W. Santopratiknya lived between 1942 and 1944. This house symbolizes family heritage brought to life in a modern stay with traditional soul.",
    ],
    imageUrl: "/images/rooms/morangan/morangan1.webp",
    galleryImages: [
      "/images/rooms/morangan/morangan2.webp",
      "/images/rooms/morangan/morangan3.webp",
      "/images/rooms/morangan/morangan4.webp",
      "/images/rooms/morangan/morangan5.webp",
      "/images/rooms/morangan/morangan6.webp",
    ],
    details: { bed: "King Size Bed", guests: 4, size: "70,7 m²", view: "Pool View" },
    detailsIcons:"/images/icons/swim-green.webp",
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Pool View", "Minibar", "Terrace"],
    amenitiesIcons:"/images/icons/swim-green.webp",
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'standard'
  },
  {
    id: 8,
    badge: "Premium",
    slug: "kriyan-lor-house",
    name: "Kriyan Lor House",
    tagline: "An Intimate Limasan House with Traditional Javanese Character",
    price: 430000,
    description: "Rumah Kriyan is a traditional 1940s limasan house relocated to Tembi in 2009, offering two intimate mirrored units with modern comforts, a private garden terrace, and a strong connection to Javanese history and culture.",
    longDescription:[ 
      "Kriyan house is a traditional limasan house built around the 1940s and relocated from Paliyan Village, Wonosari, Gunung Kidul, to the Tembi area in 2009. Originally one complete house, it was later adapted and divided into two symmetrical units, Kriyan Lor and Kriyan Kidul. Both units share the same layout with mirrored orientation. Each house measures 24 square meters and offers an intimate setting for couples or guests seeking a quiet and private stay.",
      "The house is equipped with modern facilities including complimentary Wi-Fi, air conditioning, a minibar, and a private bathroom. Rumah Kriyan blends traditional simplicity with present day comfort. A private terrace facing a lush garden creates a calm atmosphere for relaxation within a Javanese rural setting.",
      "The name Kriyan comes from an area in Keputran Jeron Beteng, Yogyakarta Palace. It was the residence of Mr. R. M. Koesbandarum Sasmi, the father of Mrs. R. A. Koeswardiyah Swantoro, from around 1940 to 1960. This house reflects a close family connection to Javanese history and culture.",
    ],
    imageUrl: "/images/rooms/kriyan/kriyan2.webp",
    galleryImages: [
      "/images/rooms/kriyan/kriyan1.webp",
      "/images/rooms/kriyan/kriyan3.webp",
      "/images/rooms/kriyan/kriyan4.webp",
      "/images/rooms/kriyan/kriyan5.webp",
      "/images/rooms/kriyan/kriyan6.webp",
    ],
    details: { bed: "King Size Bed", guests: 2, size: "24 m²", view: "Rice Field View" },
    detailsIcons:"/images/icons/leaf-green.webp",
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
    amenitiesIcons:"/images/icons/leaf-green.webp",
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'standard'
  },
  {
    id: 9,
    badge: "Premium",
    slug: "kriyan-kidul-house",
    name: "Kriyan Kidul House",
    tagline: "An Intimate Limasan House with Traditional Javanese Character",
    price: 430000,
    description: "Rumah Kriyan is a traditional 1940s limasan house relocated to Tembi in 2009, offering two intimate mirrored units with modern comforts, a private garden terrace, and a strong connection to Javanese history and culture.",
    longDescription:[ 
      "Kriyan house is a traditional limasan house built around the 1940s and relocated from Paliyan Village, Wonosari, Gunung Kidul, to the Tembi area in 2009. Originally one complete house, it was later adapted and divided into two symmetrical units, Kriyan Lor and Kriyan Kidul. Both units share the same layout with mirrored orientation. Each house measures 24 square meters and offers an intimate setting for couples or guests seeking a quiet and private stay.",
      "The house is equipped with modern facilities including complimentary Wi-Fi, air conditioning, a minibar, and a private bathroom. Rumah Kriyan blends traditional simplicity with present day comfort. A private terrace facing a lush garden creates a calm atmosphere for relaxation within a Javanese rural setting.",
      "The name Kriyan comes from an area in Keputran Jeron Beteng, Yogyakarta Palace. It was the residence of Mr. R. M. Koesbandarum Sasmi, the father of Mrs. R. A. Koeswardiyah Swantoro, from around 1940 to 1960. This house reflects a close family connection to Javanese history and culture.",
    ],
    imageUrl: "/images/rooms/kriyan/kriyan1.webp",
    galleryImages: [
      "/images/rooms/kriyan/kriyan2.webp",
      "/images/rooms/kriyan/kriyan3.webp",
      "/images/rooms/kriyan/kriyan4.webp",
      "/images/rooms/kriyan/kriyan5.webp",
      "/images/rooms/kriyan/kriyan6.webp",
    ],
    details: { bed: "King Size Bed", guests: 2, size: "24 m²", view: "Rice Field View" },
    detailsIcons:"/images/icons/leaf-green.webp",
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
    amenitiesIcons:"/images/icons/leaf-green.webp",
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'standard'
  },
];
