// data/venueData.ts

export interface Venue {
  slug: string; // ID unik untuk URL (contoh: 'pendopo-yudonegaran')
  title: string;
  heroDescription: string[]; // Deskripsi singkat di halaman utama
  shortDescription: string; // Deskripsi untuk Card
  longDescription: string[]; // Deskripsi panjang (array paragraph) untuk Detail Page
  heroImage: string; // Gambar besar di header
  galleryImages: string[]; // [GambarKecil1, GambarKecil2, GambarLebarBawah]
  eventGalleryImages: string[];
  basePrice: number;
  basePriceString: string; // "Rp 1.800.000"
  priceDetail: string; // "(2 hours)"
  extraPriceString: string; // "Rp 875.000/hour"
  capacity: string; // "Up to 150 guests"
  facilities: string[];
  bestFor: string; // "Weddings, Gatherings"
}

export const venueData: Venue[] = [
  {
    slug: "pendopo-yudonegaran",
    title: "Pendopo Yudonegaran",
    heroDescription: [
        "The Pendopo Yudonegaran is the heart of Tembi Historical Home, a magnificent Javanese pavilion crafted entirely from solid teak wood, representing the beauty and wisdom of traditional architecture.", 
        "With its open design, grand pillars, and high ceiling, this venue embodies  both elegance and warmth, making it an ideal setting for memorable gatherings.",
    ],
    shortDescription: "Our flagship venue featuring traditional Javanese architecture with soaring ceilings and elegant wooden columns.",
    longDescription: [
      "The Pendopo Yudonegaran is a grand traditional Javanese pavilion made of teak wood, offering an open and serene atmosphere for your events. Perfect for weddings, corporate gatherings, or cultural performances, this venue blends classic architecture with modern comfort.",
      "With its soaring wooden pillars and traditional joglo roof, this space creates an authentic Javanese ambiance while providing all the amenities needed for contemporary events. The natural ventilation and open design make it ideal for both intimate gatherings and larger celebrations."
    ],
    heroImage: "/images/venue/pendopo/pendopo1.png", // Pastikan gambar ini ada
    galleryImages: [
      "/images/venue/pendopo/pendopo2.png", 
      "/images/venue/pendopo/pendopo3.png", 
      "/images/venue/pendopo/pendopo1.png"
    ],
    eventGalleryImages: [
      "/images/venue/pendopo/pendopo4.png",
      "/images/venue/pendopo/pendopo5.png",
      "/images/venue/pendopo/pendopo6.png",
      "/images/venue/pendopo/pendopo7.png",
      "/images/venue/pendopo/pendopo1.png",
      "/images/venue/pendopo/pendopo2.png",
    ],
    basePrice: 1800000,
    basePriceString: "Rp 1.800.000",
    priceDetail: "(2 hours)",
    extraPriceString: "Rp 875.000",
    capacity: "Up to 150 guests",
    facilities: ["80 Chairs", "Sound System", "Toilet", "Parking", "Cleaning"],
    bestFor: "Weddings, Gatherings"
  },
  {
    slug: "amphiteater-notoprajan",
    title: "Amphiteater Notoprajan",
    heroDescription: [
        "The Amphitheater Notoprajan offers an open-air setting surrounded by lush greenery, perfect for performances, gatherings, and creative showcases. Its semi-circular design creates a natural stage ambiance that enhances the audience’s connection to every event.", 
    ],
    shortDescription: "Natural amphiteater setting perfect for performances, presentations, and outdoor celebrations.",
    longDescription: [
      "The Amphitheater Notoprajan offers an open-air setting surrounded by lush greenery. perfect for performances, gatherings, and creative showcases. Its semi-circular design creates a natural stage ambiance that enhances the audience’s connection to every event.",
      "With its soaring wooden pillars and traditional joglo roof, this space creates an authentic Javanese ambiance while providing all the amenities needed for contemporary events. The natural ventilation and open design make it ideal for both intimate gatherings and larger celebrations."
    ],
    heroImage: "/images/venue/amphiteater/amphiteater1.png",
    galleryImages: ["/images/venue/amphiteater/amphiteater2.png", "/images/venue/amphiteater/amphiteater3.png", "/images/venue/amphiteater/amphiteater4.png"],
    eventGalleryImages: [
      "/images/venue/amphiteater/amphiteater5.png",
      "/images/venue/amphiteater/amphiteater6.png",
      "/images/venue/amphiteater/amphiteater7.png",
      "/images/venue/amphiteater/amphiteater8.png",
      "/images/venue/amphiteater/amphiteater9.png",
      "/images/venue/amphiteater/amphiteater10.png",
    ],
    basePrice: 1500000,
    basePriceString: "Rp 1.500.000",
    priceDetail: "(2 hours)",
    extraPriceString: "Rp 700.000",
    capacity: "Up to 100 guests",
    facilities: ["50 Chairs", "Sound System", "Toilet", "Parking", "Cleaning"],
    bestFor: "Weddings, Gatherings"
  },
  {
    slug: "bale-madyosuro",
    title: "Bale Madyosuro",
    heroDescription: [
        "Bale Madyosuro features a classic Javanese interior with elegant wood carvings and patterned tiles, offering a warm yet formal atmosphere for meetings, workshops, or intimate gatherings.", 
    ],
    shortDescription: "Charming traditional pavilion ideal for medium-sized gatherings with authentic Javanese ambiance.",
    longDescription: [
      "Bale Madyosuro features a classic Javanese interior with elegant wood carvings and patterned tiles, offering a warm yet formal atmosphere for meetings, workshops, or intimate gatherings. This venue blends tradition and modern  unctionality, creating a sophisticated ambiance for any event.",
      "With its soaring wooden pillars and traditional joglo roof, this space creates an authentic Javanese ambiance while providing all the amenities needed for contemporary events. The natural ventilation and open design make it ideal for both intimate gatherings and larger celebrations."
    ],
    heroImage: "/images/venue/madyosuro/madyosuro1.png",
    galleryImages: ["/images/venue/madyosuro/madyosuro2.png", "/images/venue/madyosuro/madyosuro3.png", "/images/venue/madyosuro/madyosuro4.png"],
    eventGalleryImages: [
      "/images/venue/madyosuro/madyosuro5.png",
      "/images/venue/madyosuro/madyosuro6.png",
      "/images/venue/madyosuro/madyosuro7.png",
      "/images/venue/madyosuro/madyosuro8.png",
      "/images/venue/madyosuro/madyosuro9.png",
      "/images/venue/madyosuro/madyosuro10.png",
    ],
    basePrice: 750000,
    basePriceString: "Rp 750.000",
    priceDetail: "(2 hours)",
    extraPriceString: "Rp 350.000",
    capacity: "Up to 80 guests",
    facilities: ["50 Chairs", "Sound System", "Toilet", "Parking", "Cleaning"],
    bestFor: "Weddings, Gatherings"
  },
  {
    slug: "bale-mrican",
    title: "Bale Mrican",
    heroDescription: [
        "Bale Mrican provides a cozy indoor space with a calm and comfortable atmosphere, suitable for meetings, workshops, or small private events. The minimalist interior and open layout allow flexible arrangements for both casual and formal setups.", 
    ],
    shortDescription: "Intimate pavilion perfect for smaller gatherings, workshops, and personal celebrations.",
    longDescription: [
      "Bale Mrican provides a cozy indoor space with a calm and comfortable atmosphere, suitable for meetings, workshops, or small private events. The minimalist interior and open layout allow flexible arrangements for both casual and formal setups.",
      "With its soaring wooden pillars and traditional joglo roof, this space creates an authentic Javanese ambiance while providing all the amenities needed for contemporary events. The natural ventilation and open design make it ideal for both intimate gatherings and larger celebrations."
    ],
    heroImage: "/images/venue/mrican/mrican1.png",
    galleryImages: ["/images/venue/mrican/mrican2.png", "/images/venue/mrican/mrican3.png", "/images/venue/mrican/mrican4.png"],
    eventGalleryImages: [
      "/images/venue/mrican/mrican5.png",
      "/images/venue/mrican/mrican6.png",
      "/images/venue/mrican/mrican7.png",
      "/images/venue/mrican/mrican8.png",
      "/images/venue/mrican/mrican9.png",
      "/images/venue/mrican/mrican10.png",
    ],
    basePrice: 600000,
    basePriceString: "Rp 600.000",
    priceDetail: "(2 hours)",
    extraPriceString: "Rp 250.000",
    capacity: "Up to 50 guests",
    facilities: ["25 Chairs", "Sound System", "Toilet", "Parking", "Cleaning"],
    bestFor: "Weddings, Gatherings"
  },
  {
    slug: "bale-sagan",
    title: "Bale Sagan",
    heroDescription: [
        "Bale Sagan is an intimate open hall ideal for small gatherings, group discussions, or art workshops. With its simple yet authentic Javanese design, this space provides a tranquil setting surrounded by natural light and fresh air.", 
    ],
    shortDescription: "Our most intimate venue, perfect for private meetings, small family gatherings, and exclusive events.",
    longDescription: [
      "Bale Sagan is an intimate open hall ideal for small gatherings, group discussions, or art workshops. With its simple yet authentic Javanese design, this space provides a tranquil setting surrounded by natural light and fresh air.",
      "With its soaring wooden pillars and traditional joglo roof, this space creates an authentic Javanese ambiance while providing all the amenities needed for contemporary events. The natural ventilation and open design make it ideal for both intimate gatherings and larger celebrations."
    ],
    heroImage: "/images/venue/sagan/sagan1.png",
    galleryImages: ["/images/venue/sagan/sagan2.png", "/images/venue/sagan/sagan3.png", "/images/venue/sagan/sagan4.png"],
    eventGalleryImages: [
      "/images/venue/sagan/sagan5.png",
      "/images/venue/sagan/sagan6.png",
      "/images/venue/sagan/sagan7.png",
      "/images/venue/sagan/sagan8.png",
      "/images/venue/sagan/sagan9.png",
      "/images/venue/sagan/sagan10.png",
    ],
    basePrice: 350000,
    basePriceString: "Rp 350.000",
    priceDetail: "(2 hours)",
    extraPriceString: "Rp 150.000",
    capacity: "Up to 20 guests",
    facilities: ["15 Chairs", "Sound System", "Toilet", "Parking", "Cleaning"],
    bestFor: "Weddings, Gatherings"
  },
  {
    slug: "taman-bulus",
    title: "Taman Bulus (Outdoor Area)",
    heroDescription: [
        "Taman Bulus offers a lush outdoor garden venue surrounded by traditional architecture — a perfect backdrop for outdoor weddings, private gatherings, and creative events. The serene landscape brings together nature and culture in one beautiful setting.", 
    ],
    shortDescription: "Stunning outdoor garden venue combining Bale Inap & Sentolo areas, perfect for nature-loving celebrations.",
    longDescription: [
      "Taman Bulus offers a lush outdoor garden venue surrounded by traditional architecture a perfect backdrop for outdoor weddings, private gatherings, and creative events. The serene landscape brings together nature and culture in one beautiful setting.",
      "With its soaring wooden pillars and traditional joglo roof, this space creates an authentic Javanese ambiance while providing all the amenities needed for contemporary events. The natural ventilation and open design make it ideal for both intimate gatherings and larger celebrations."
    ],
    heroImage: "/images/venue/bulus/bulus1.png",
    galleryImages: ["/images/venue/bulus/bulus2.png", "/images/venue/bulus/bulus3.png", "/images/venue/bulus/bulus4.png"],
    eventGalleryImages: [
      "/images/venue/bulus/bulus5.png",
      "/images/venue/bulus/bulus6.png",
      "/images/venue/bulus/bulus7.png",
      "/images/venue/bulus/bulus8.png",
      "/images/venue/bulus/bulus9.png",
      "/images/venue/bulus/bulus10.png",
    ],
    basePrice: 1200000,
    basePriceString: "Rp 1.200.000",
    priceDetail: "(2 hours)",
    extraPriceString: "Rp 550.000",
    capacity: "Up to 50 guests",
    facilities: ["25 Chairs", "Sound System", "Toilet", "Parking", "Cleaning"],
    bestFor: "Weddings, Gatherings"
  },
];