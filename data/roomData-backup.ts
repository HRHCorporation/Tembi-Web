export interface Room {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  galleryImages: string[];
  price: number; 
  details: {
    bed: string;
    guests: number;
    size: string;
  };
  amenities: string[];
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
    slug: "ngadirojo-house",
    name: "Ngadirojo",
    tagline: "Traditional Javanese architecture with modern luxury",
    price: 1800000,
    description: "Experience the pinnacle of Javanese luxury in our Nandini suite, offering expansive garden views and a private terrace.",
    longDescription: "Ngadirojo House was built in 1920 and relocated from Boyolali Village, Klaten, Central Java, to Tembi in 2020. Combining Javanese architecture with natural tranquility, it is an ideal choice for guests seeking peace and culture. The building's front section, known as the 'Pendopo', is an open-air space with a view of the southern horizon.",
    imageUrl: "",
    galleryImages: [
      "",
      "",
      "",
      "",
    ],
    details: { bed: "1 King Bed", guests: 2, size: "45 m²" },
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
    policies: { 
        checkIn: "03:00 PM", 
        checkOut: "12:00 PM", 
        cancellation: ["Free cancellation 48h before", "50% refund 24h before", "No refund same day"] 
    },
    houseRules: { smoking: false, pets: false, quietHours: "10 PM" },
    rating: 4.9, 
    layoutType: 'featured'
  },
  {
    id: 2,
    slug: "polaman-suite",
    name: "Polaman",
    tagline: "Classic pyramid roof design with cultural charm",
    price: 1425000,
    description: "A blend of classic elegance and modern comfort, the Polaman suite features handcrafted furniture and serene, personalized natural surroundings.",
    longDescription: "The Polaman Suite offers a unique stay experience, combining traditional aesthetics with all the modern comforts you need for a memorable visit.",
    imageUrl: "",
    galleryImages: [],
    details: { bed: "1 King Bed", guests: 2, size: "40 m²" },
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: false, quietHours: "10 PM" },
    rating: 4.8, 
    layoutType: 'featured'
  },
  {
    id: 3,
    slug: "polaman-suite2",
    name: "Polaman",
    tagline: "Classic pyramid roof design with cultural charm",
    price: 1425000,
    description: "A blend of classic elegance and modern comfort, the Polaman suite features handcrafted furniture and serene, personalized natural surroundings.",
    longDescription: "The Polaman Suite offers a unique stay experience, combining traditional aesthetics with all the modern comforts you need for a memorable visit.",
    imageUrl: "",
    galleryImages: [],
    details: { bed: "1 King Bed", guests: 2, size: "40 m²" },
    amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
    houseRules: { smoking: false, pets: false, quietHours: "10 PM" },
    rating: 4.8, 
    layoutType: 'featured'
  },
  {
    id: 4,
    slug: "adikarto-villa",
    name: "Adikarto",
    tagline: "Intimate traditional space with authentic details",
    price: 1200000,
    description: "An intimate and cozy space designed for couples or solo travelers looking for an authentic Javanese atmosphere.",
    longDescription: "Adikarto Villa provides a peaceful retreat with its traditional decor and serene environment, perfect for relaxation and cultural immersion.",
    imageUrl: "",
    galleryImages: [],
    details: { bed: "1 Queen Bed", guests: 2, size: "35 m²" },
    amenities: ["Free WiFi", "Air Conditioning"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["50% refund 24h before"] },
    houseRules: { smoking: true, pets: false, quietHours: "11 PM" },
    rating: 4.7, 
    layoutType: 'standard'
  },
  {
    id: 5,
    slug: "adikarto-villa5",
    name: "Adikarto",
    tagline: "Intimate traditional space with authentic details",
    price: 1200000,
    description: "An intimate and cozy space designed for couples or solo travelers looking for an authentic Javanese atmosphere.",
    longDescription: "Adikarto Villa provides a peaceful retreat with its traditional decor and serene environment, perfect for relaxation and cultural immersion.",
    imageUrl: "",
    galleryImages: [],
    details: { bed: "1 Queen Bed", guests: 2, size: "35 m²" },
    amenities: ["Free WiFi", "Air Conditioning"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["50% refund 24h before"] },
    houseRules: { smoking: true, pets: false, quietHours: "11 PM" },
    rating: 4.7, 
    layoutType: 'standard'
  },{
    id: 6,
    slug: "adikarto-villa6",
    name: "Adikarto",
    tagline: "Intimate traditional space with authentic details",
    price: 1200000,
    description: "An intimate and cozy space designed for couples or solo travelers looking for an authentic Javanese atmosphere.",
    longDescription: "Adikarto Villa provides a peaceful retreat with its traditional decor and serene environment, perfect for relaxation and cultural immersion.",
    imageUrl: "",
    galleryImages: [],
    details: { bed: "1 Queen Bed", guests: 2, size: "35 m²" },
    amenities: ["Free WiFi", "Air Conditioning"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["50% refund 24h before"] },
    houseRules: { smoking: true, pets: false, quietHours: "11 PM" },
    rating: 4.7, 
    layoutType: 'standard'
  },{
    id: 7,
    slug: "adikarto-villa7",
    name: "Adikarto",
    tagline: "Intimate traditional space with authentic details",
    price: 1200000,
    description: "An intimate and cozy space designed for couples or solo travelers looking for an authentic Javanese atmosphere.",
    longDescription: "Adikarto Villa provides a peaceful retreat with its traditional decor and serene environment, perfect for relaxation and cultural immersion.",
    imageUrl: "",
    galleryImages: [],
    details: { bed: "1 Queen Bed", guests: 2, size: "35 m²" },
    amenities: ["Free WiFi", "Air Conditioning"],
    policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["50% refund 24h before"] },
    houseRules: { smoking: true, pets: false, quietHours: "11 PM" },
    rating: 4.7, 
    layoutType: 'standard'
  },
];
