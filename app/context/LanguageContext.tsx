// app/context/LanguageContext.tsx
'use client';

// import { sub } from 'date-fns';
// import { title } from 'node:process';
import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Definisikan Tipe Data
type Language = 'en' | 'id';

// 2. Kamus Kata (Dictionary)
const translations = {
  en: {
    nav: {
      home: 'Tembi',
      house: 'House',
      foods: 'Foods',
      venue: 'Venue',
      history: 'History',
      collections: 'Collections',
      book: 'Book Now',
      checkBooking: 'Check Booking',
    },
    homepage:{
      hero: {
        title: 
        [
          'Where Historical',
          'Culture Is Divine'
        ],
        explore: 'Explore Our House',
        gallery: 'View Gallery',
      },
      intro: {
        title: 'Experience Javanese Historical Culture',
        p1: 'A place that brings calm and comfort so your mind feels lighter. The sound of nature welcomes you as soon as you step in. Fresh air helps your body relax. A well arranged space protects your rest so nothing interrupts your peace.',
        p2: 'Morning comes with a warm breakfast so the day feels kinder. Sitting on the terrace or taking a slow walk in the garden is enough to ease your heart. Energy returns slowly. A quiet peace appears on its own. Rest here is more than sleep, You have space to recover.',
        stats: { founded: 'Founded', artifacts: 'Artifacts', house: 'House' }
      },
      accommodation: {
        label: 'Accommodation',
        title: 'Historical Home',
        desc: 'Each house is a sanctuary of cultural heritage, thoughtfully designed to immerse you in the timeless elegance of Javanese architecture.',
        btn: 'Book Now',
        rec: 'Recommendation',
        facilities: { bed: 'King Bed', view: 'Rice Field View' }
      },
      houses: [
        {
          name: 'Ngadirojo',
          desc: 'Ngadirojo House is a traditional Javanese limasan built in 1946 and relocated from Bawak Village, Cawas, Klaten. Combining Javanese architecture with natural tranquility.',
          image: '/images/rooms/ngadirojo/ngadirojo.webp',
        },
        {
          name: 'Polaman',
          desc: 'Polaman House is a traditional Javanese limasan built in 1948. It combines the warmth of Javanese architecture with natural landscapes.',
          image: '/images/rooms/polaman/polaman.webp',
        },
        {
          name: 'Adikarto',
          desc: 'Adikarto House is a traditional Javanese limasan house that brings coolness and comfort in a natural atmosphere. Built in 1960.',
          image: '/images/rooms/adikarto/adikarto.webp',
        },
      ],
      pavillion: {
          title: ['All Pavilions', 'Include'],
          icon: ["/images/icons/wifi-green.png", "/images/icons/cup-green.png", "/images/icons/music-green.png"],
          desc: ['Wi-Fi', 'Special Welcome Drink', 'Traditional Course' ],
          button: 'View All House'
      },
      living:{
        head: ['Living', 'Experience'],
        title: {item1: 'Historical Culture', item2: 'Natural Harmony', item3: 'Meaningful Moments'},
        desc: {item1: 'Authentic Javanese architecture and traditions', item2: 'Surrounded by lush tropical gardens and rice fields', item3: 'Rest that feels valuable and memorable'},
      },
      food:{
        head: ['Food &', 'Drink'],
        desc: "Enjoy a culinary experience that highlights the richness of Indonesian flavors. Traditional recipes are preserved and refined with modern techniques so each dish feels familiar yet exciting. The calm atmosphere adds comfort to every meal. Culture becomes part of the dining moment through flavors that feel warm and full of character.",
        item: {item1: 'Fresh ingredients from local organic farms', item2: 'Traditional recipes with modern presentation', item3: 'Friendly service that makes you feel at home'},
        button: 'View Packages'
      },
      venue:{
        head: 'EVENT & CELEBRATION',
        title: 'Sacred Spaces for Special Moments',
        desc: 'Create unforgettable memories in our culturally rich venues, where traditional Javanese architecture provides the perfect backdrop for weddings, corporate retreats, and cultural celebrations.',
        firstCard: 
        {
          title: 'Wedding Ceremony',
          desc: 'Celebrate your special moment in our quiet pendopo, surrounded by fresh greenery and a peaceful atmosphere. Our team will help take care of the details so your ceremony feels personal and meaningful.',
          item1: 'Capacity: Up to 150 guests',
          item2: 'Garden ceremony options',
          item3: 'Traditional gamelan accompaniment',
          button: 'Plan Your Wedding'
        },
        secondCard:
        {
          title: 'Corporate Retreat',
          desc: 'Spark new ideas and strengthen teamwork in a calm and inspiring setting.Our meeting spaces combine traditional charm with modern facilities, creating a comfortable place for focused work and meaningful collaboration.',
          item1: 'Multiple room configurations',
          item2: 'High-speed internet & AV equipment',
          item3: 'Traditional refreshment service',
          button: 'Book Corporate Event'
        },
      },
      collection:{
        title: 'Historical Collection',
        desc: 'Discover our carefully curated collection of Javanese cultural artifacts that tell the story of Indonesias rich heritage and artistic traditions',
        cardTitle: {item1: 'Cundrik Collection', item2: 'Cundrik Collection', item3: 'Keris Collection', item4: 'Keris Collection'},
        cardDesc: 
        {
          item1: 'A small cundrik once carried as a personal weapon.', 
          item2: 'A longer cundrik forged with sanak patterns. ', 
          item3: 'A keris from the Surakarta tradition with a straight blade.', 
          item4: 'A keris with five curves and a strong pamor pattern along the blade. '
        },
        button: 'Explore Full Collection'
      },
      location:{
        title: 'Location & Access',
        subtitle: 'Easy to reach from Yogyakarta city center and airport',
        cardTitle: {item1: 'Address', item2: 'From Airport', item3: 'From City Center'},
        cardDesc:{
          item1: 'Jl. Parangtritis KM 8.4, Timbulharjo, Sewon, Bantul, Yogyakarta 55186, Indonesia',
          item2: '25 minutes drive from Yogyakarta International Airport',
          item3: '15 minutes drive from Malioboro Street and city center'
        },
        transport: 
        {
          title: "Transportation Options",
          item1: "Taxi and ride-sharing services available",
          item2: "Public bus route 1A stops nearby",
          item3: "Free on-site parking for 50+ vehicles"
        }
      }
    },
    history:{
      hero:{
        title: ['Our Story:', 'Tembi History Home'],
        subtitle: 'A place where heritage lives and traditions continue — preserving Javanese culture with heart and harmony.',
      },
      intro:{
        head: 'HERITAGE & CULTURE',
        title: [
          'Where Javanese Soul', 
          'Meets Modern', 
          'Comfort',
        ],
        subtitle: [
          'Founded on May 20, 2000, Tembi Historical Home was originally known as Tembi Rumah Budaya, a sanctuary dedicated to preserving the richness of Javanese philosophy, art, and traditions. It began as a humble cultural space designed for education, expression, and documentation of Javanese culture, becoming a living archive where heritage meets daily life.',
          'Over time, Tembi evolved beyond a cultural institution into a boutique heritage hospitality destination. Since 2008, it has offered accommodations, dining experiences, and event venues, from intimate gatherings to grand weddings, while maintaining its essence as a center for cultural preservation.'
        ],
        item: [
          'Years of Heritage',
          'Cultural Programs',
          'Visitor Welcomed'
        ]
      },
      founder:{
        head: 'Our Founder',
        title: [
          'The Visionary Behind',
          'Our Cultural Mission'
        ],
        desc1: [
          'Tembi Historical Home was founded by the late',
          'Pollycarpus Swantoro,', 
          'an esteemed cultural figure and journalist in Indonesia. Inspired by his childhood memories and love for his hometown, Yogyakarta, he envisioned a place where people could reconnect with their cultural roots amidst the waves of modernization.',
        ],
        desc2:[
          'His legacy is now carried forward by his eldest son,',
          'Norbertus Nuranto.',
          'who continues to nurture Tembi as a space of inclusive and inspiring culture, where everyone, from local communities to international visitors, can experience the timeless beauty of Javanese heritage.'
        ],
      },
      living:{
        head: 'LIVING CULTURE',
        title: 'A Home of Living Culture',
        subtitle: 'Tembi is more than a place to stay. It is an experience of Javanese life through its traditions, arts, and philosophy. From classical Javanese dance classes to batik-making and macapat sessions, we continue to nurture cultural expression and learning.',
        title2: 'Cultural Philosophy',
        desc: [
          'Our cultural programs are built on the Javanese philosophy of Hamemayu Hayuning Bawana - to beautify and preserve the world.',
          'We believe culture is not a collection piece but a living, breathing entity that grows through sharing and practice.'
        ],
        item: [
          'Cultural Activities',
          'Monthly Participants'
        ]
      },
      contact:{
        title: [
          'Where Historical',
          'Culture Is Divine'
        ],
        subtitle: 'Join us in preserving and experiencing Javanese historical culture, where every visit becomes a way to connect with tradition',
        itemTitle: [
          'Direct Booking',
          'Cultural Inquiries',
          'Visit Us'
        ],
        itemDesc:[
          'Call us directly for personalized cultural experiences and special packages.',
          'Learn more about our workshops, events, and heritage programs.',
          'Located in the heart of Yogyakartas cultural district.'
        ]
      }
    },
    foods:{
      hero:{
        label: 'Authentic Javanese Cuisine',
        title: ['Food & Drink', 'Packages'],
        subtitle: 'Authentic Javanese taste for every occasion',
        desc: 'Enjoy the warmth of Javanese hospitality through our food. From classic buffet spreads to snack and meal boxes, every dish is prepared with cultural care and local flavor, bringing you the authentic taste of Central Javas culinary heritage.'
      },
      intro:{
        label: 'Cultural Heritage',
        title: ['Preserving Tradition Through', 'Authentic Flavors'],
        desc: 'At Tembi Historical Home, we believe that food is the heart of cultural preservation. Our catering services bring together generations of Javanese culinary wisdom, using traditional recipes passed down through families and prepared with locally-sourced ingredients.',
        itemTitle:[
          'Traditional Recipes',
          'Local Ingredients',
          'Cultural Presentation'
        ],
        itemDesc: [
          'Authentic Javanese dishes prepared using time-honored methods',
          'Fresh, locally-sourced ingredients from Yogyakarta region',
          'Served on traditional banana leaves and wooden plates'
        ],
      },
      packages:{
        label: 'Catering Packages',
        title: ['Choose Your Perfect', 'Package'],
        subtitle: 'Each package is carefully curated to deliver an authentic Javanese dining experience, perfect for various occasions and group sizes.',
        card1:{
          badge: '≥35 pax',
          title: 'Buffet Package',
          subtitle: 'Perfect for Large Gatherings',
          desc: 'Ideal for gatherings, meetings, and cultural events. A complete spread featuring rice, soup, main dishes.',
          features: [
            'Complete meal spread',
            'Traditional serving style',
            'Multiple dish options',
            'Dessert & beverages included'
          ],
          linkUrl: '/catering/buffet',
          buttonText: 'View Buffet Menu'
        },
        card2:{
          badge: '≥35 pax',
          title: 'Snack Box Package',
          subtitle: 'Delightful Traditional Treats',
          desc: 'A delightful assortment of traditional snacks and sweets perfect for light events, meetings, or afternoon tea.',
          features: [
            'Traditional snacks variety',
            'Individual packaging',
            'Sweet & savory options',
            'Traditional tea included'
          ],
          linkUrl: '/catering/snack-box',
          buttonText: 'View Snack Box Menu'
        },
        card3:{
          badge: '≥35 pax',
          title: 'Rice Box Package',
          subtitle: 'Complete Individual Meals',
          desc: 'A complete individual meal packed with authentic Javanese dishes. Perfect for business meetings or seminars.',
          features: [
          'Complete balanced meal',
            'Individual box packaging',
            'Traditional main dishes',
            'Authentic sambal included'
          ],
          linkUrl: '/catering/rice-box',
          buttonText: 'View Rice Box Menu'
        },
        footerTitle: [
          'Minimum 35 Guests',
          '24-Hour Notice'
        ],
        footerDesc: [
          'All packages available for groups of 35 people or more',
          'Please place orders at least 24 hours in advance'
        ]
      },
      menus:{
        label: 'Sample Menus',
        title: ['Taste the', 'Authentic Flavors'],
        desc: 'Experience the rich culinary heritage of Java through our carefully selected traditional dishes, each prepared with love and authentic recipes.',
        buffet: {
          title: 'Buffet Package Highlight',
          desc: 'A complete spread of traditional Javanese dishes',
          item:[
            { image: '/images/foods/nasi-liwet.webp', title: 'Nasi Liwet', desc: 'Aromatic coconut rice cooked in banana leaves with traditional spices' },
            { image: '/images/foods/ayam-kremes.webp', title: 'Ayam Goreng Kremes', desc: 'Crispy fried chicken with traditional peanut coating' },
            { image: '/images/foods/sayur-asem.webp', title: 'Sayur Asem', desc: 'Traditional tamarind soup with mixed vegetables' },
            { image: '/images/foods/sambal.webp', title: 'Sambal Bajak', desc: 'Spicy traditional chili paste with peanuts and spices' },
            { image: '/images/foods/es-dawet.webp', title: 'Es Dawet', desc: 'Refreshing coconut milk drink with rice flour jelly' },
          ],
        },
        snack: {
          title: 'Snack Box Delights',
          desc: 'Traditional sweets and savory treats',
          item:[
            { image: '/images/foods/klepon.webp', title: 'Klepon', desc: 'Green rice balls filled with palm sugar and rolled in coconut' },
            { image: '/images/foods/kue-lumpur.webp', title: 'Kue Lumpur', desc: 'Soft traditional cake with coconut milk and raisins' },
            { image: '/images/foods/pastel.webp', title: 'Pastel', desc: 'Crispy fried pastry with seasoned vegetable and meat filling' },
            { image: '/images/foods/teh.webp', title: 'Teh Hangat', desc: 'Warm traditional herbal tea with aromatic spices' },
          ],
        },
        rice: {
          title: 'Rice Box Complete Meal',
          desc: 'Balanced individual portions of authentic dishes',
          item: [
            { image: '/images/foods/nasi-putih.webp', title: 'Nasi Putih', desc: 'Perfectly steamed jasmine rice as the foundation' },
            { image: '/images/foods/ayam-kalasan.webp', title: 'Ayam Kalasan', desc: 'Traditional grilled chicken with sweet soy sauce marinade' },
            { image: '/images/foods/tempe.webp', title: 'Tempe Bacem', desc: 'Braised tempeh with palm sugar and traditional spices' },
            { image: '/images/foods/urap.webp', title: 'Urap', desc: 'Mixed vegetable salad with seasoned grated coconut' },
            { image: '/images/foods/sambal-fresh.webp', title: 'Sambal', desc: 'Fresh homemade chili paste with authentic spice blend' },
          ]
        }
      },
      gen: {
        card: {
          title: '3 Generations',
          subtitle: 'Of culinary tradition',
          desc: 'Every dish tells a story of our ancestors and their love for authentic flavors.'
        },
        label: 'Our Heritage',
        title: [
          'Three Generations of',
          'Culinary Excellence'
        ],
        desc: 'Our recipes have been carefully preserved and passed down through three generations of the Tembi family. Each dish represents not just a meal, but a piece of Javanese cultural heritage that were proud to share with every guest.',
        itemTitle: [
          'Traditional Recipes',
          'Farm-to-Table Philosophy',
          'Handcrafted with Love'
        ],
        itemDesc: [
          'Authentic recipes dating back to the early 1900s, carefully documented and preserved by our family matriarchs.',
          'We source ingredients from local farmers and our own heritage garden, ensuring freshness and supporting the community.',
          'Every dish is prepared by hand using traditional methods, ensuring authentic taste and cultural integrity.'
        ]
      },
      celebrate: {
        label: 'Perfect Occasions',
        title: ['Celebrate Every', 'Moment'],
        desc: 'From intimate gatherings to grand celebrations, our catering packages are designed to make every occasion memorable with authentic Javanese hospitality.',
        card1: {
          title: 'Corporate Events',
          subtitle: 'Professional meetings with cultural flair',
          features: [
            'Business meetings & seminars',
            'Corporate retreats',
            'Team building events'
          ]
        },
        card2: {
          title: 'Cultural Celebrations',
          subtitle: 'Weddings and traditional ceremonies',
          features: [
            'Traditional weddings',
            'Cultural festivals',
            'Religious ceremonies'
          ]
        },
        card3: {
          title: 'Family Gatherings',
          subtitle: 'Intimate celebrations with loved ones',
          features: [
            'Birthday celebrations',
            'Family reunions',
            'Holiday gatherings'
          ]
        },
        stat1: {
          number: '100+',
          label: 'Events Catered'
        },
        stat2: {
          number: '1,000+',
          label: 'Guests Served'
        },
        stat3: {
          number: '98%',
          label: 'Satisfaction Rate'
        },
        stat4: {
          number: '15+',
          label: 'Years Experience'
        },
      },
      contact: {
        title: 'Need Help or Have Questions?',
        subtitle: 'Our team is here to help you plan the perfect catering experience for your special event.',
        card1: {
          title: 'Call Us',
          subtitle: 'Speak directly with our catering specialists',
          phone: '+62 274 368 000',
          desc: 'Daily 8:00 AM - 8:00 PM'
        },
        card2: {
          title: 'WhatsApp',
          subtitle: 'Quick response for urgent inquiries',
          phone: '+62 822 2514 2729',
          desc: 'Chat Now'
        },
        card3: {
          title: 'Email Us',
          subtitle: 'Detailed inquiries and custom requests',
          phone: 'catering@tembihistoricalhome.com',
          desc: 'Response within 24 hours'
        },
        footer: {
          title: 'Special Requests & Custom Packages',
          desc: 'Planning a unique event or need a custom menu? Our culinary team can create bespoke catering solutions tailored to your specific requirements, dietary needs, and cultural preferences.',
          button: 'Request Custom Quote'
        }
      }
    },
    catering:{
      hero: {
        label: 'Premium Catering Service',
        titleBuffet: 'Buffet Catering Packages',
        descBuffet: 'Authentic Javanese dishes for gatherings and celebrations, carefully crafted with traditional recipes passed down through generations.',
        titleSnack: 'Snack Box Packages',
        descSnack: 'Delightful Javanese treats for every moment. Celebrate the flavors of tradition through our handcrafted snack boxes freshly made each morning using time-honored recipes passed through generations. Perfect for meetings, gatherings, or cultural events.',
        titleRice: 'Rice Box Packages',
        descRice: 'Authentic Javanese meals packed with warmth and care. Experience the comforting flavors of home-cooked Javanese dishes, thoughtfully prepared and beautifully packed for your events. Perfect for meetings, community gatherings, or family celebrations.',
        pax: 'Minimum 35 Pax',
        hour: '4-6 Hours Service',
        buttonText: 'View Packages'
      },
      intro: {
        label: 'Our Heritage',
        title: 'A Culinary Journey Through Javanese Tradition',
        desc: 'For over three decades, Tembi Historical Home has been preserving the authentic flavors of Javanese cuisine. Our buffet catering service brings the warmth of traditional hospitality to your special occasions.',
        stats1: {
          num: '25+',
          desc: 'Years of Experience'
        },
        stats2: {
          num: '100+',
          desc: 'Events Catered'
        },
      },
      buffetMenu: {
        label: 'Our Menu',
        title: 'Authentic Javanese Flavors',
        desc: 'Each buffet package is carefully crafted with a perfect balance of Javanese flavors — from savory mains that warm the soul to refreshing drinks and sweet desserts that complete the experience.',
        menuCard1: {
          icon: "/images/icons/circle-white.png",
          title: "Soup",
          subtitle: "Pilih Kuah & Sayur",
          items: [
            'Sup Sayur Bening', 'Sup Bakso Sosis', 'Sup Rolade',
            'Sup Ayam Jagung', 'Sup Timlo', 'Jangan Lodeh',
            'Jangan Asem', 'Jangan Bobor Gandol', 'Oblok Godhong Telo',
            'Gulai Nangka Muda'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.png",
          title: "Main Course",
          subtitle: "Tumis & Lauk",
          items: [
            'Tumis Tempe Kacang Panjang', 'Tumis Tahu Tomat Ijo', 
            'Oseng Tempe Lombok Ijo', 'Oseng Janggel Sosis', 
            'Oseng Terong Balado', 'Oseng Labu Siam', "Ca' Buncis Tahu", 
            "Ca' Kembang Kol Bakso", "Ca' Brokoli Jamur Kuping", 'Sapo Tahu'
          ]
        },
        menuCard3: {
          icon: "/images/icons/ice-cream-white.png",
          title: "Desserts",
          subtitle: "Traditional Sweets",
          items: [
            'Es Dawet Tradisional', 'Klepon Gula Jawa', 
            'Onde-onde Wijen', 'Lupis Ketan'
          ]
        },
        menuCard4: {
          icon: "/images/icons/drink-white.png",
          title: "Beverages",
          subtitle: "Refreshing Drinks",
          items: [
            'Es Degan', 'Es Teh Manis', 'Es Jeruk', 'Es Setup',
            'Es Dawet', 'Es Serut Melon', 'Es Buah', 'Es Cincau',
            'Es Cocktail', 'Es Infuse Water'
          ]
        },
        menuCard5: {
          icon: "/images/icons/circle-white.png",
          title: "Chicken",
          subtitle: "Pilihan Ayam",
          items: [
            'Ayam Goreng Kalasan', 'Ayam Goreng Kremes', 'Ayam Lada Hitam',
            'Ayam Daun Temuru', 'Ayam Fillet Goreng', 'Ayam Saus Mentega',
            'Ayam Semur', "Ayam Ca' Jamur", 'Ayam Cabe Ijo', 'Chicken Katsu'
          ]
        },
        menuCard6: {
          icon: "/images/icons/chicken-white.png",
          title: "Egg",
          subtitle: "Pilihan Telur",
          items: [
            'Telur Semur', 'Telur Balado', 'Telur Dadar Padang',
            'Telur Asin', 'Telur Rebus', 'Telur Crispy',
            'Telur Ceplok Bumbu Bali', 'Telur Goreng Cabe Ijo',
            'Gulai Telur', 'Fuyung Hai'
          ]
        },
        menuCard7: {
          icon: "/images/icons/circle-white.png",
          title: "Fish",
          subtitle: "Pilihan Ikan",
          items: [
            'Lele Goreng Kremes', 'Mangut Lele', 'Nila Sambal Matah',
            'Nila Goreng/Bakar', 'Kembung Cabe Ijo', 'Kembung Balado',
            'Ikan Fillet Asam Manis', 'Ikan Fillet Sambal Matah',
            'Ikan Fillet Dabu-Dabu', 'Ikan Katsu'
          ]
        },
        menuCard8: {
          icon: "/images/icons/chicken-white.png",
          title: "Side Dish",
          subtitle: "Pilihan Menu Pendamping",
          items: [
            'Mendoan', 'Tahu/Tempe Goreng', 'Tahu/Tempe Bacem',
            'Perkedel Tahu', 'Tahu Susu', 'Tahu Crispy',
            'Bakwan Sayur', 'Bakwan Jagung', 'Perkedel Kentang',
            'Jamur Crispy'
          ]
        }
      },
      snackMenu: {
        label: 'Our Menu',
        title: 'Authentic Javanese Snack',
        desc: 'Each box is thoughtfully curated to combine sweet, savory, and crunchy textures offering a true taste of Indonesian tradition.',
        menuCard1: {
          icon: "/images/icons/circle-white.png", // Icon tanda seru (!)
          title: "Sweet Snacks",
          subtitle: "", // Dikosongkan karena tidak ada subtitle di gambar
          items: [
            'Klepon',
            'Kue Lapis',
            'Dadar Gulung',
            'Lemper',
            'Putu Ayu',
            'Bolu Kukus',
            'Risoles Coklat'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.png", // Icon ayam
          title: "Savory Snacks",
          subtitle: "",
          items: [
            'Pastel',
            'Lumpia',
            'Risoles Mayo',
            'Arem-Arem Ayam',
            'Martabak Mini',
            'Sosis Solo',
            'Kroket Kentang'
          ]
        },
        menuCard3: {
        icon: "/images/icons/ice-cream-white.png", // Icon es krim
        title: "Crunchy Snacks",
        subtitle: "",
        items: [
          'Emping Jagung',
          'Keripik Singkong',
          'Kacang Bawang',
          'Keripik Tempe'
          ]
        }
      },
      riceMenu: {
        label: 'Our Menu',
        title: 'Authentic Javanese Flavors',
        desc: 'Each Nasi Box offers a complete meal designed to nourish and satisfy.',
        menuCard1: {
          icon: "/images/icons/circle-white.png", // Icon tanda seru lingkaran
          title: "Main Dishes",
          subtitle: "", // Kosong karena tidak ada subtitle di gambar
          items: [
            'Steamed rice',
            'Kalasan fried chicken',
            'Crispy chicken',
            'Spicy egg',
            'Braised chicken'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.png", // Icon paha ayam
          title: "Side Dishes",
          subtitle: "",
          items: [
            'Stir-fried tempeh with long beans',
            'Eggplant balado',
            'Mixed vegetables with grated coconut',
            'Tofu sauté',
            'Sambal Terasi'
          ]
        },
        menuCard3: {
          icon: "/images/icons/ice-cream-white.png", // Icon es krim
          title: "Add-Ons",
          subtitle: "",
          items: [
            'Tofu',
            'Tempe',
            'Potato Fritters',
            'Fried Fish'
          ]
        },
        menuCard4: {
          icon: "/images/icons/drink-white.png", // Icon gelas
          title: "Extras",
          subtitle: "",
          items: [
            'Fresh fruit',
            'Crackers',
            'Bottled water'
          ]
        }
      },
      buffet: {
        label: 'Choose Your Package',
        title: 'Buffet Package Options',
        subtitle: 'Select the perfect package for your event, each designed to provide an authentic Javanese dining experience with varying levels of service and menu options.',
        badge: 'MOST POPULAR',
        footer: 'Need a custom package? Contact us directly.',
        buttonText: 'Request Custom Quote',
        card1: {
          name: "Buffet Standard",
          minPax: "35 Pax",
          description: "Perfect for corporate events",
          theme: "standard",
          iconSrc: "/images/icons/food-white.png", 
          items: [
            "1 Traditional Soup (Sup Ayam Jagung or Lodeh)",
            "2 Main Dishes (Ayam Goreng Kalasan + Telur Balado)",
            "2 Side Dishes (Tumis Tempe + Oseng Terong)",
            "1 Traditional Dessert (Es Dawet)",
            "2 Beverages (Es Teh + Es Jeruk)",
            "Basic table setup & serving equipment"
          ]
        },
        card2: {
          name: "Buffet Premium",
          minPax: "50 Pax",
          description: "Ideal for weddings & celebrations",
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.png", 
          items: [
            "2 Traditional Soups (Choice of 3 options)",
            "3 Premium Main Dishes including Ayam Lada Hitam",
            "3 Side Dishes with Kembung Cabe Ijo",
            "2 Traditional Desserts + Fruit platter",
            "3 Beverages including Wedang Jahe",
            "Enhanced table setup with traditional decorations",
            "Professional serving staff included"
          ]
        },
        card3: {
          name: "Buffet Exclusive",
          minPax: "100 Pax",
          description: "Ultimate traditional experience",
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.png", 
          items: [
            "Full traditional buffet setup with banana leaves",
            "3 Traditional Soups in clay serving pots",
            "5 Premium Main Dishes + Gulai Telur special",
            "4 Traditional Side Dishes",
            "Complete dessert station with 4 varieties",
            "Traditional beverage station with live preparation",
            "Full decorative service with gamelan music",
            "Dedicated event coordinator & serving team"
          ]
        },
      },
      snack: {
        label: 'Choose Your Package', //
        title: 'Snack Box Options', //
        subtitle: 'Select the perfect package for your event, each designed to provide an authentic Javanese dining experience with varying levels of service and menu options.', //
        badge: 'MOST POPULAR', //
        footer: 'Need a custom package? We can create a personalized buffet experience for your special event.', //
        buttonText: 'Request Custom Quote', //
        card1: {
          name: "Snack Box A", //
          minPax: "35 Pax", //
          description: "Ideal for short meetings or small gatherings.", //
          theme: "standard",
          iconSrc: "/images/icons/food-white.png", 
          items: [
            "2 snacks", //
            "1 crunchy item (kletikan)", //
            "1 cup of mineral water" //
          ]
        },
        card2: {
          name: "Snack Box B", //
          minPax: "35 Pax", //
          description: "Balanced variety for seminars or workshops.", //
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.png", 
          items: [
            "3 snacks", //
            "1 crunchy item (kletikan)", //
            "1 cup of mineral water" //
          ]
        },
        card3: {
          name: "Snack Box C", //
          minPax: "35 Pax", //
          description: "Premium assortment for formal or special occasions.", //
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.png", 
          items: [
            "3 snacks", //
            "1 crunchy item (kletikan)", //
            "1 cup of mineral water" //
          ]
        },
      },
      rice: {
        label: 'Choose Your Package', //
        title: 'Rice Box Options', //
        subtitle: 'Select the perfect package for your event, each designed to provide an authentic Javanese dining experience with varying levels of service and menu options.', //
        badge: 'MOST POPULAR', //
        footer: 'Need a custom package? We can create a personalized buffet experience for your special event.', //
        buttonText: 'Request Custom Quote', //
        card1: {
          name: "Rice Box A", //
          minPax: "35 Pax", //
          description: "Perfect for small meetings or casual events.", //
          theme: "standard",
          iconSrc: "/images/icons/food-white.png", 
          items: [
            "Steamed rice", //
            "One stir-fried dish", //
            "Chicken or egg", //
            "Fresh fruit", //
            "Sambal and crackers" //
          ]
        },
        card2: {
          name: "Rice Box B", //
          minPax: "35 Pax", //
          description: "Ideal for office gatherings or group meals.", //
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.png", 
          items: [
            "Steamed rice", //
            "One stir-fried dish", //
            "Chicken or egg", //
            "Side Dish", //
            "Fresh fruit", //
            "Sambal and crackers" //
          ]
        },
        card3: {
          name: "Rice Box C", //
          minPax: "35 Pax", //
          description: "A complete and premium choice for formal or large-scale events.", //
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.png", 
          items: [
            "Steamed rice", //
            "One stir-fried dish", //
            "Chicken or egg", //
            "Side Dish", //
            "One additional snack", //
            "Fresh fruit", //
            "Sambal and crackers" //
          ]
        }
      },
      service: {
        label: 'Why Choose Us',
        title: 'Complete Catering Service',
        subtitle: 'From menu planning to cleanup, we handle every detail so you can focus on enjoying your event with your guests.',
        features:[
          {
            title: "Free Delivery & Setup",
            desc: "Complete delivery, setup, and breakdown service included with every package. Our team arrives 2 hours before your event.",
            iconSrc: "/images/icons/truck-white.png" // Ganti dengan path icon lokal Anda
          },
          {
            title: "Professional Staff",
            desc: "Experienced serving staff in traditional attire to maintain the authentic atmosphere throughout your event.",
            iconSrc: "/images/icons/group-white.png"
          },
          {
            title: "Fresh Ingredients",
            desc: "All dishes prepared fresh on the day of your event using locally sourced, organic ingredients from our trusted suppliers.",
            iconSrc: "/images/icons/leaf-white.png"
          },
          {
            title: "Flexible Timing",
            desc: "Available for breakfast, lunch, or dinner events. Extended service hours available for special occasions.",
            iconSrc: "/images/icons/clock-white.png"
          },
          {
            title: "Quality Guaranteed",
            desc: "100% satisfaction guarantee. If you're not completely satisfied, we'll work to make it right or provide a full refund.",
            iconSrc: "/images/icons/curly-white.png"
          },
          {
            title: "Complete Equipment",
            desc: "All serving equipment, plates, utensils, and traditional serving ware included. Eco-friendly options available.",
            iconSrc: "/images/icons/food-white.png"
          }
        ]
      },
      booking: {
        label: 'How It Works',
        title: 'Simple Booking Process',
        steps: [
          {
            num: "1",
            title: "Choose Package",
            desc: "Select your preferred buffet package or request a custom quote for your specific needs."
          },
          {
            num: "2",
            title: "Book & Confirm",
            desc: "Contact us with your event details. We'll confirm availability and finalize your booking."
          },
          {
            num: "3",
            title: "Menu Planning",
            desc: "Our team will work with you to customize the menu and discuss any special requirements."
          },
          {
            num: "4",
            title: "Enjoy Your Event",
            desc: "Sit back and enjoy your event while we handle all the food service and cleanup."
          }
        ]
      },
      contact:{
        title: 'Book Your Event Today',
        desc: 'Ready to bring authentic Javanese flavors to your next event? Our booking calendar fills up quickly, especially during peak seasons. Contact us today to secure your preferred date.',
        item: [
          { title: 'Call us directly', desc: '+62 274 368 000' },
          { title: 'WhatsApp', desc: '+62 822 2514 2729' },
          { title: 'Email Us', desc: 'catering@tembihistoricalhome.com' }
        ],
        whatsapp: 'WhatsApp Now',
        call: 'Call Now'
      }
    },
    collection: {
      hero: {
        badge: 'Cultural Heritage Collection',
        title: ['Tembi Historical', 'Collections',],
        desc: [
          "Preserving Indonesia's cultural heritage through timeless artifacts. Discover the rich tapestry of Javanese culture through our carefully curated collection of traditional items.",
          "Tembi Historical Home is home to a rich collection of traditional Javanese artifacts, tools, and crafts that tell the story of Indonesia's cultural journey. Each item reflects the craftsmanship, philosophy, and artistry of the local people across generations."
        ],
        buttonText: 'Explore Collections'
      },
      stats: {
        item:[
          {
            id: 1,
            iconUrl: '/images/icons/diamond-green.png', 
            alt: 'Artifacts Icon',
            value: '250+',
            label: 'Collection',
          },
          {
            id: 2,
            iconUrl: '/images/icons/calendar-green.png', 
            alt: 'Origins Icon',
            value: '18th',
            label: 'Century Origins',
          },
          {
            id: 3,
            iconUrl: '/images/icons/group-green.png', 
            alt: 'Visitors Icon',
            value: '5K',
            label: 'Annual Visitors',
          },
        ]
      },
      items: [
        {
          title: "Cundrik Collection",
          items: [
            {
              id: 1,
              imageUrl: "/images/collection/cundrik/GPT0541.png", // Pastikan gambar ada
              category: "Cundrik",
              title: "GPT0541",
              description: "A small Javanese cundrik carried as a personal talisman. It represents alertness and protection, shaped with the fine coastal character of Cirebon craftsmanship."
            },
            {
              id: 2,
              imageUrl: "/images/collection/cundrik/GPT0540.png",
              category: "Cundrik",
              title: "GPT0540",
              description: "A longer cundrik forged with sanak patterns. Its flowing lines reflect Majapahit era techniques and symbolize resilience and personal strength."
            },
            {
              id: 3,
              imageUrl: "/images/collection/cundrik/GPT0539.png",
              category: "Cundrik",
              title: "GPT0539",
              description: "A slender cundrik used in household traditions and ceremonies. Its light form and Segaluh forging style highlight practicality and cultural identity."
            },
            {
              id: 4,
              imageUrl: "/images/collection/cundrik/GPT0538.png", // Pastikan gambar ada
              category: "Cundrik",
              title: "GPT0538",
              description: ""
            },
            {
              id: 5,
              imageUrl: "/images/collection/cundrik/GPT0537.png",
              category: "Cundrik",
              title: "GPT0537",
              description: ""
            },
            {
              id: 6,
              imageUrl: "/images/collection/cundrik/GPT0536.png",
              category: "Cundrik",
              title: "GPT0536",
              description: ""
            },
            {
              id: 7,
              imageUrl: "/images/collection/cundrik/GPT0535.png", // Pastikan gambar ada
              category: "Cundrik",
              title: "GPT0535",
              description: ""
            },
            {
              id: 8,
              imageUrl: "/images/collection/cundrik/GPT0534.png",
              category: "Cundrik",
              title: "GPT0534",
              description: ""
            },
            {
              id: 9,
              imageUrl: "/images/collection/cundrik/GPT0533.png",
              category: "Cundrik",
              title: "GPT0533",
              description: ""
            }
          ]
        },
        {
          title: "Sword Collection",
          items: [
            {
              id: 10,
              imageUrl: "/images/collection/sword/GPT0548.png",
              category: "Sword",
              title: "GPT0548",
              description: "A traditional single-edged blade with a hooked profile and a carved wooden handle. The form resembles regional utility and ceremonial weapons found in parts of Java."
            },
            {
              id: 11,
              imageUrl: "/images/collection/sword/GPT0576.png",
              category: "Sword",
              title: "GPT0576",
              description: "A slender Javanese sword with a longer blade and visible forging patterns. It reflects Majapahit metalwork and represents firmness."
            },
            {
              id: 12,
              imageUrl: "/images/collection/sword/GPT0575.png",
              category: "Sword",
              title: "GPT0575",
              description: "A light Javanese sword with a narrow blade and a simple wooden hilt. It follows the segaluh forging style and symbolizes cultural identity."
            },
            {
              id: 13,
              imageUrl: "/images/collection/sword/GPT0571.png", // Pastikan gambar ada
              category: "Sword",
              title: "GPT0571",
              description: ""
            },
            {
              id: 14,
              imageUrl: "/images/collection/sword/GPT0574.png",
              category: "Sword",
              title: "GPT0574",
              description: ""
            },
            {
              id: 15,
              imageUrl: "/images/collection/sword/GPT0568.png",
              category: "Sword",
              title: "GPT0568",
              description: ""
            },
            {
              id: 16,
              imageUrl: "/images/collection/sword/GPT0571.png", // Pastikan gambar ada
              category: "Sword",
              title: "GPT0571",
              description: ""
            },
            {
              id: 17,
              imageUrl: "/images/collection/sword/GPT0570.png",
              category: "Sword",
              title: "GPT0570",
              description: ""
            },
            {
              id: 18,
              imageUrl: "/images/collection/sword/GPT0568.png",
              category: "Sword",
              title: "GPT0568",
              description: ""
            }
          ]
        },
        {
          title: "Sken Collection",
          items: [
            {
              id: 19,
              imageUrl: "/images/collection/sken/GPT0518.png",
              category: "Sken",
              title: "GPT0518",
              description: "A small traditional Javanese dagger with a wooden handle and sheath. The Cekel Bahuluk symbolizes protection and practicality, often carried as a personal tool during the Majapahit era."
            },
            {
              id: 20,
              imageUrl: "/images/collection/sken/GPT0521.png",
              category: "Sken",
              title: "GPT0521",
              description: "A long, leaf-shaped traditional blade with a wooden hilt and sheath. The Kujang Malang represents courage and authority, used in both ceremonial and martial contexts during the Mataram Amangkurat period."
            },
            {
              id: 21,
              imageUrl: "/images/collection/sken/GPT0516.png",
              category: "Sken",
              title: "GPT0516",
              description: "A ceremonial dagger with a broad, leaf shaped blade and finely carved wooden handle and sheath. The Godong Suruh, meaning “betel leaf,” symbolizes sincerity, purity, and harmony in Javanese culture."
            },
            {
              id: 22,
              imageUrl: "/images/collection/sken/GPT0517.png", 
              category: "Sken",
              title: "GPT0517",
              description: "" 
            },
            {
              id: 23,
              imageUrl: "/images/collection/sken/GPT0519.png",
              category: "Sken",
              title: "GPT0519",
              description: "" 
            },
            {
              id: 24,
              imageUrl: "/images/collection/sken/GPT0520.png",
              category: "Sken",
              title: "GPT0520",
              description: "" 
            }
          ]
        },
        {
          title: "Spear Collection",
          items: [
            {
              id: 25,
              imageUrl: "/images/collection/spear/GPT407.png",
              category: "Spear",
              title: "GPT407",
              description: "A traditional Javanese dagger with a long, narrow blade and a simple wooden hilt and sheath. The minimalist design reflects the utilitarian craftsmanship of Javanese blacksmiths, emphasizing balance and functionality rather than ornamentation."
            },
            {
              id: 26,
              imageUrl: "/images/collection/spear/GPT408.png",
              category: "Spear",
              title: "GPT408",
              description: "A traditional dagger featuring a distinctive patterned (pamor) blade and a dark wooden handle. The pamor markings are created through layered forging, symbolizing spiritual harmony and inner strength in Javanese culture."
            },
            {
              id: 27,
              imageUrl: "/images/collection/spear/GPT409.png",
              category: "Spear",
              title: "GPT409",
              description: "A short Javanese blade with a plain wooden sheath and handle, measuring 25.5 cm in blade length and 49 cm overall."
            },
            {
              id: 28,
              imageUrl: "/images/collection/spear/GPT410.png",
              category: "Spear",
              title: "GPT410",
              description: "" 
            },
            {
              id: 29,
              imageUrl: "/images/collection/spear/GPT412.png",
              category: "Spear",
              title: "GPT412",
              description: "" 
            },
            {
              id: 30,
              imageUrl: "/images/collection/spear/GPT416.png",
              category: "Spear",
              title: "GPT416",
              description: "" 
            },
            {
              id: 31,
              imageUrl: "/images/collection/spear/GPT507.png",
              category: "Spear",
              title: "GPT507",
              description: "" 
            },
            {
              id: 32,
              imageUrl: "/images/collection/spear/GPT411.png",
              category: "Spear",
              title: "GPT411",
              description: "" 
            },
            {
              id: 33,
              imageUrl: "/images/collection/spear/GPT413.png",
              category: "Spear",
              title: "GPT413",
              description: "" 
            }
          ]
        },
        {
          title: "Wayang Collection",
          items: [
            {
              id: 34,
              imageUrl: "/images/collection/wayang/drona.png",
              category: "Wayang",
              title: "Drona",
              description: "A Javanese shadow puppet representing an elder adviser figure. The calm posture and patterned costume reflect wisdom, discipline, and high social status."
            },
            {
              id: 35,
              imageUrl: "/images/collection/wayang/gareng.png",
              category: "Wayang",
              title: "Gareng",
              description: "A comedic Javanese shadow puppet known for expressive gestures and humorous roles. The rounded body and playful stance show his role as a loyal companion who brings lightness to the story."
            },
            {
              id: 36,
              imageUrl: "/images/collection/wayang/citraksa.png",
              category: "Wayang",
              title: "Citraksa",
              description: "A traditional Javanese shadow puppet showing a noble warrior figure. The detailed carving and bright colors highlight strength, authority, and refined movement."
            },
            {
              id: 37,
              imageUrl: "/images/collection/wayang/bima.png",
              category: "Wayang",
              title: "Bima",
              description: "" 
            },
            {
              id: 38,
              imageUrl: "/images/collection/wayang/aswatama.png",
              category: "Wayang",
              title: "Aswatama",
              description: "" 
            },
            {
              id: 39,
              imageUrl: "/images/collection/wayang/bagong.png",
              category: "Wayang",
              title: "Bagong",
              description: "" 
            },
            {
              id: 40,
              imageUrl: "/images/collection/wayang/abilawa.png",
              category: "Wayang",
              title: "Abilawa",
              description: "" 
            },
            {
              id: 41,
              imageUrl: "/images/collection/wayang/arimbi.png",
              category: "Wayang",
              title: "Arimbi",
              description: "" 
            },
            {
              id: 42,
              imageUrl: "/images/collection/wayang/nakula.png",
              category: "Wayang",
              title: "Nakula",
              description: "" 
            }
          ]
        },
        {
          title: "Keris Collection",
          items: [
            {
              id: 43,
              imageUrl: "/images/collection/keris/K.A 001.png",
              category: "Keris",
              title: "K.A 001",
              description: "A Javanese shadow puppet representing an elder adviser figure. The calm posture and patterned costume reflect wisdom, discipline, and high social status."
            },
            {
              id: 44,
              imageUrl: "/images/collection/keris/K.A 002.png",
              category: "Keris",
              title: "K.A 002",
              description: "A keris with five curves and a strong pamor pattern along the blade. The Surakarta style hilt and decorated metal scabbard reflect the cultural role of this weapon in ceremonies and heritage."
            },
            {
              id: 45,
              imageUrl: "/images/collection/keris/K.A 003.png",
              category: "Keris",
              title: "K.A 003",
              description: "A traditional Javanese keris with a curved pamor pattern and a wooden hilt. The scabbard uses a metal covering that indicates later preservation work. This piece represents a personal heirloom used for protection and identity."
            },
            {
              id: 46,
              imageUrl: "/images/collection/keris/K.A 004.png",
              category: "Keris",
              title: "K.A 004",
              description: "" 
            },
            {
              id: 47,
              imageUrl: "/images/collection/keris/K.A 005.png",
              category: "Keris",
              title: "K.A 005",
              description: "" 
            },
            {
              id: 48,
              imageUrl: "/images/collection/keris/K.A 006.png",
              category: "Keris",
              title: "K.A 006",
              description: "" 
            },
            {
              id: 49,
              imageUrl: "/images/collection/keris/K.A 007.png",
              category: "Keris",
              title: "K.A 007",
              description: "" 
            },
            {
              id: 50,
              imageUrl: "/images/collection/keris/K.A 008.png",
              category: "Keris",
              title: "K.A 008",
              description: "" 
            },
            {
              id: 51,
              imageUrl: "/images/collection/keris/K.A 009.png",
              category: "Keris",
              title: "K.A 009",
              description: "" 
            }
          ]
        },
        {
          title: "Other Collection",
          items: [
            {
              id: 52,
              imageUrl: "/images/collection/lainnya/Command Staff.png",
              category: "Other",
              title: "Command Staff",
              description: "A carved wooden staff featuring a pointed end and decorative top section. Objects of this form are often associated with leadership roles or ceremonial use. The material and finish suggest a relatively recent production."
            },
            {
              id: 53,
              imageUrl: "/images/collection/lainnya/VOC Flintlock Pistol.png",
              category: "Other",
              title: "VOC Flintlock Pistol",
              description: "A single-shot flintlock pistol associated with the VOC period in the Indonesian archipelago (17th–19th century). Flintlock pistols were commonly carried by military personnel and officers as short-range weapons and status symbols. "
            },
            {
              id: 54,
              imageUrl: "/images/collection/lainnya/Triple-Bladed Weapon.png",
              category: "Other",
              title: "Triple-Bladed Weapon",
              description: "A three-pronged blade consisting of a central spear-like point flanked by two curved projections. The weapon is fitted with a wooden handle and sheath. Its form suggests use in close-quarter combat or ceremonial contexts, depending on historical setting and tradition."
            },
          ]
        }
      ]
    },
    venue:{
      hero: {
        title: ['Venue Rental at', 'Tembi Historical Home'],
        subtitle: 'Elegant spaces for unforgettable moments',
        quote: 'Easy booking, smooth event, warm atmosphere',
        desc: 'Tembi Historical Home offers a collection of traditional Javanese venues designed for various events — from intimate gatherings to grand celebrations. Enjoy a calm atmosphere, complete facilities, and the authentic warmth of Javanese culture.',
        buttonText: 'Book Now'
      },
      features: {
        title: 'Choose Your Perfect Venue',
        desc: 'From traditional Pendopo to intimate garden spaces, each venue at Tembi Historical Home offers unique charm and complete facilities for your special occasion.',
        item: [
          {
            title: 'Traditional Architecture',
            description: 'Authentic Javanese design with modern amenities'
          },
          {
            title: 'Flexible Capacity',
            description: 'From intimate 20-person to grand 150-person events'
          },
          {
            title: 'Natural Setting',
            description: 'Beautiful gardens and open-air venues'
          }
        ]
      },
      gallery: {
        title: 'Venue Gallery',
        desc: 'Discover the perfect space for your event from our curated selection of traditional and elegant venues.'
      },
      contact: {
        title: [
          'Ready to host your event at',
          'Tembi Rumah Budaya?'
        ],
        desc: 'We\'ll help you choose the perfect venue for your special occasion. Our experienced team is ready to assist you in ensuring your event runs smoothly and is full of memories in a charming traditional space.',
        button: 'Contact Our Team',
        item: [
          { title: 'quick response', desc: 'Fast response within 2 hours' },
          { title: 'Personal Service', desc: 'Personal assistance from the event coordinator' },
          { title: 'Guaranteed Quality', desc: '100 percent guaranteed service quality' }
        ]
      },
      items: [
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
          heroImage: "/images/venue/pendopo/pendopo1.webp", // Pastikan gambar ini ada
          galleryImages: [
            "/images/venue/pendopo/pendopo2.webp", 
            "/images/venue/pendopo/pendopo3.webp", 
            "/images/venue/pendopo/pendopo1.webp"
          ],
          eventGalleryImages: [
            "/images/venue/pendopo/pendopo4.webp",
            "/images/venue/pendopo/pendopo5.webp",
            "/images/venue/pendopo/pendopo6.webp",
            "/images/venue/pendopo/pendopo7.webp",
            "/images/venue/pendopo/pendopo1.webp",
            "/images/venue/pendopo/pendopo2.webp",
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
          heroImage: "/images/venue/amphiteater/amphiteater1.webp",
          galleryImages: ["/images/venue/amphiteater/amphiteater2.webp", "/images/venue/amphiteater/amphiteater3.webp", "/images/venue/amphiteater/amphiteater4.webp"],
          eventGalleryImages: [
            "/images/venue/amphiteater/amphiteater5.webp",
            "/images/venue/amphiteater/amphiteater6.webp",
            "/images/venue/amphiteater/amphiteater7.webp",
            "/images/venue/amphiteater/amphiteater8.webp",
            "/images/venue/amphiteater/amphiteater9.webp",
            "/images/venue/amphiteater/amphiteater10.webp",
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
          heroImage: "/images/venue/madyosuro/madyosuro1.webp",
          galleryImages: ["/images/venue/madyosuro/madyosuro2.webp", "/images/venue/madyosuro/madyosuro3.webp", "/images/venue/madyosuro/madyosuro4.webp"],
          eventGalleryImages: [
            "/images/venue/madyosuro/madyosuro5.webp",
            "/images/venue/madyosuro/madyosuro6.webp",
            "/images/venue/madyosuro/madyosuro7.webp",
            "/images/venue/madyosuro/madyosuro8.webp",
            "/images/venue/madyosuro/madyosuro9.webp",
            "/images/venue/madyosuro/madyosuro10.webp",
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
          heroImage: "/images/venue/mrican/mrican1.webp",
          galleryImages: ["/images/venue/mrican/mrican2.webp", "/images/venue/mrican/mrican3.webp", "/images/venue/mrican/mrican4.webp"],
          eventGalleryImages: [
            "/images/venue/mrican/mrican5.webp",
            "/images/venue/mrican/mrican6.webp",
            "/images/venue/mrican/mrican7.webp",
            "/images/venue/mrican/mrican8.webp",
            "/images/venue/mrican/mrican9.webp",
            "/images/venue/mrican/mrican10.webp",
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
          heroImage: "/images/venue/sagan/sagan1.webp",
          galleryImages: ["/images/venue/sagan/sagan2.webp", "/images/venue/sagan/sagan3.webp", "/images/venue/sagan/sagan4.webp"],
          eventGalleryImages: [
            "/images/venue/sagan/sagan5.webp",
            "/images/venue/sagan/sagan6.webp",
            "/images/venue/sagan/sagan7.webp",
            "/images/venue/sagan/sagan8.webp",
            "/images/venue/sagan/sagan9.webp",
            "/images/venue/sagan/sagan10.webp",
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
          heroImage: "/images/venue/bulus/bulus1.webp",
          galleryImages: ["/images/venue/bulus/bulus2.webp", "/images/venue/bulus/bulus3.webp", "/images/venue/bulus/bulus4.webp"],
          eventGalleryImages: [
            "/images/venue/bulus/bulus5.webp",
            "/images/venue/bulus/bulus6.webp",
            "/images/venue/bulus/bulus7.webp",
            "/images/venue/bulus/bulus8.webp",
            "/images/venue/bulus/bulus9.webp",
            "/images/venue/bulus/bulus10.webp",
          ],
          basePrice: 1200000,
          basePriceString: "Rp 1.200.000",
          priceDetail: "(2 hours)",
          extraPriceString: "Rp 550.000",
          capacity: "Up to 50 guests",
          facilities: ["25 Chairs", "Sound System", "Toilet", "Parking", "Cleaning"],
          bestFor: "Weddings, Gatherings"
        },
      ]
    },
    detailVenue:{
      intro: {
        title: 'About This Venue',
        cardTitle: 'Key Information',
        item1: 'Capacity',
        item2: 'Best For',
      },
      features: {
        title: 'Facilities Included',
        subtitle: 'Everything you need for a memorable event',
        item: [
          {
            title: 'Venue Space',
            desc: 'Traditional Javanese pavilion with authentic teak wood architecture'
          },
          {
            title: 'Free Chairs',
            desc: 'Complimentary seating for up to 80 guests included'
          },
          {
            title: 'Sound System',
            desc: 'Portable sound system for speeches and announcements'
          },
          {
            title: 'Toilet Facilities',
            desc: 'Clean and well-maintained restroom facilities'
          },
          {
            title: 'Cleaning Service',
            desc: 'Professional cleaning before and after your event'
          },
          {
            title: 'Parking Space',
            desc: 'Ample parking space for guest\'s vehicles'
          }
        ],
        addons: {
          title: 'Optional Add-ons',
          item: [
            'Projector & Screen',
            'Enhanced Sound System',
            'Catering Services',
            'Decoration Setup'
          ]
        }
      },
      gallery: {
        title: 'Event Gallery',
        subtitle: 'See how beautiful events come to life at'
      },
      service: {
        title: 'Additional Services & Equipment',
        subtitle: 'Enhance your event with our premium add-on services',
        table: {
          col1: 'Service',
          col2: 'Description',
          item: [
            {
              name: "Sound System Non-Portable",
              description: "Professional grade fixed sound system with multiple microphones",
            },
            {
              name: "Wedding Sound Package",
              description: "Complete audio setup for wedding ceremonies and receptions",
            },
            {
              name: "Projector + Screen",
              description: "HD projector with large screen for presentations",
            },
            {
              name: "Additional Chair",
              description: "Extra seating beyond the included 80 chairs",
            },
            {
              name: "Lighting Enhancement",
              description: "Professional lighting setup for evening events",
            },
            {
              name: "Photography Package",
              description: "Professional event photography services",
            }
          ],
          note: {
            title: 'Important Notes:',
            item: [
              'Catering and decoration services available upon request',
              'Food from outside vendors may incur an additional charge',
              'All prices are subject to change and do not include tax',
              'Booking confirmation required 48 hours in advance'
            ]
          }
        }
      }
    },
    house: {
      hero: {
        back: 'Back to Collection',
        address: [
          'Home', 'Rooms & Accommodation'
        ],
        title: 'Rooms & Accommodation',
        desc: 'Immerse yourself in the rich cultural heritage of Java while enjoying modern comfort and traditional hospitality. Each room tells a story of Indonesian craftsmanship and timeless elegance.',
        buttonText: 'Explore Rooms',
        stats: [
          {num: '9', desc: 'Room Categories'},
          {num: '98%', desc: 'Guest Satisfaction'},
          {num: '24/7', desc: 'Cultural Experience'}
        ]
      },
      room: {
        title: 'Our Accommodation Collection',
        desc: 'Discover our carefully curated selection of rooms and suites, each designed to offer a unique blend of traditional Indonesian culture and modern luxury amenities.'
      },
      amenities: {
        title: 'Amenities & Services',
        desc: 'Every room provides comfort and convenience, enriched by authentic Indonesian cultural atmosphere and heartfelt hospitality.',
        item: [
          {
            title: "Room Comfort",
            icon: "/images/icons/bed-green.png",
            items: [
              "Air conditioning",
              "Traditional furnishing",
              "Living Room",
              "Traditional bedding",
              "Private bathroom",
              "Complimentary toiletries",
            ],
          },
          {
            title: "Technology",
            icon: "/images/icons/wifi-green.png",
            items: [
              "Free Wifi",
              "Charging Ports",
            ],
          },
          {
            title: "Cultural Services",
            icon: "/images/icons/paint-green.png",
            items: [
              "Traditional Activities",
              "Seasonal Traditional Performance",
              "Art Gallery",
              "Private Collection",
              "Private Tour Tembi",
              "Several Music Instrument",
              "Several Traditional Course",
            ],
          },
          {
            title: "Dining & Wellness",
            icon: "/images/icons/food-green.png",
            items: [
              "Traditional Cuisine",
              "Room Service",
              "Traditional Massage",
              "Traditional Javanese Dance",
            ],
          },
        ]
      },
      additional: {
        title: 'Additional House Amenities',
        item: [
          { name: "Swimming Pool", icon: "/images/icons/swim-green.png" },
          { name: "Spa & Wellness", icon: "/images/icons/flower-green.png"},
          { name: "Garden Tours", icon: "/images/icons/tree-green.png" },
        ]
      },
      featuredCard: {
        features: {
          wifi: "Free WiFi",
          guest: ['Up to ', 'guests']
        },
        buttonText: 'View Details'
      },
      standardCard: {
        features: {
          wifi: "Free WiFi",
          guest: 'guests'
        },
        buttonText: 'View Details'
      },
      item: [
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
          detailsIcons:"/images/icons/swim-white.png",
          amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Pool View", "Minibar", "Terrace"],
          amenitiesIcons:"/images/icons/swim-white.png",
          policies: { checkIn: "03:00 PM",  checkOut: "12:00 PM", 
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
          detailsIcons:"/images/icons/swim-white.png",
          amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Pool View", "Minibar", "Terrace"],
          amenitiesIcons:"/images/icons/swim-green.png",
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
          detailsIcons:"/images/icons/leaf-gray.png",
          amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Garden View", "Minibar", "Terrace"],
          amenitiesIcons:"/images/icons/leaf-green.png",
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
          detailsIcons:"/images/icons/leaf-green.png",
          amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Garden View", "Minibar", "Terrace"],
          amenitiesIcons:"/images/icons/leaf-green.png",
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
          detailsIcons:"/images/icons/leaf-green.png",
          amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Garden View", "Minibar", "Terrace"],
          amenitiesIcons:"/images/icons/leaf-green.png",
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
          detailsIcons:"/images/icons/leaf-green.png",
          amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Garden View", "Minibar", "Terrace"],
          amenitiesIcons:"/images/icons/leaf-green.png",
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
          detailsIcons:"/images/icons/swim-green.png",
          amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Pool View", "Minibar", "Terrace"],
          amenitiesIcons:"/images/icons/swim-green.png",
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
          detailsIcons:"/images/icons/leaf-green.png",
          amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
          amenitiesIcons:"/images/icons/leaf-green.png",
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
          detailsIcons:"/images/icons/leaf-green.png",
          amenities: ["Free WiFi", "Air Conditioning", "Private Bathroom", "Rice Field View", "Minibar", "Terrace"],
          amenitiesIcons:"/images/icons/leaf-green.png",
          policies: { checkIn: "03:00 PM", checkOut: "12:00 PM", cancellation: ["Free cancellation 48h before"] },
          houseRules: { smoking: false, pets: true, quietHours: "10 PM" },
          rating: 4.9, 
          layoutType: 'standard'
        },
      ]
    },
    houseDetail:{
      back: 'Back to Collection',
      guest: 'Guests',
      night: 'per night',
      facilities: 'Cultural Amenities & Facilities',
      gallery: 'Room Gallery',
      viewall: 'View All Photos',
      booking: 'Booking Now',
      policy: {
        title: 'Room Policies & Information',
        id: 'Valid ID required',
        cancelPolicy: 'Cancellation Policy',
        cancel: 'Free cancellation 48h before',
        refund: '50% refund 24h before',
        sameday: 'No refund same day',
      },
      houseRules: {
        title: 'House Rules',
        smokingtrue: 'Smoking allowed',
        smokingfalse: 'No smoking',
        petstrue: 'Pets Allowed',
        petsfalse: 'No pets allowed',
        quiet: 'Quiet hours 10 PM',
      }
    }
  },
  id: {
    nav: {
      home: 'Tembi',
      house: 'Rumah',
      foods: 'Makanan',
      venue: 'Venue',
      history: 'Sejarah',
      collections: 'Koleksi',
      book: 'Pesan Sekarang',
      checkBooking: 'Cek Booking',
    },
    homepage:{
      hero: {
        title:
        [
          'Tempat Budaya Sejarah',
          'Menjadi Sakral'
        ],
        subtitle: 'Warisan budaya yang hadir dengan kenyamanan modern',
        explore: 'Lihat Pilihan Kamar',
        gallery: 'Lihat Galeri',
      },
      intro: {
        title: 'Rasakan budaya sejarah Jawa',
        p1: 'Sebuah tempat yang memberikan ketenangan dan kenyamanan sehingga dapat membuat pikiran menjadi lebih ringan. Suara alam menenangkan sejak melangkah masuk lalu udara segar ikut membantu tubuh lebih rileks. Ruang yang tertata rapi membuat waktu istirahat terasa utuh karena tidak ada yang mengganggu.',
        p2: 'Pagi datang dengan sarapan hangat sehingga hari terasa lebih bersahabat. Setelah itu duduk sebentar di teras atau berjalan pelan di taman sudah cukup untuk membuat hati lebih tenang. Perlahan energi kembali dan rasa damai muncul tanpa perlu dicari. Di sini istirahat bukan hanya tidur. Ada ruang untuk merasa pulih.',
        stats: { founded: 'Didirikan', artifacts: 'Artefak', house: 'Rumah' }
      },
      accommodation: {
        label: 'Akomodasi',
        title: 'Rumah Yang Menyimpan Sejarah',
        desc: 'Setiap rumah menjadi tempat nyaman yang menjaga cerita budaya tetap terasa. Desainnya mengalir natural sehingga keanggunan masa lalu dan kenyamanan hari ini saling melengkapi. Ruang hangat dan detail terjaga membuat waktu menginap terasa tenang dan berarti.',
        btn: 'Pesan',
        rec: 'Rekomendasi',
        facilities: { bed: 'King Bed', view: 'Pemandangan Sawah' }
      },
      houses: [
        {
            name: 'Ngadirojo',
            desc: 'Rumah Ngadirojo adalah limasan tradisional Jawa yang dibangun tahun 1946 dan dipindahkan dari Desa Bawak, Klaten. Menggabungkan arsitektur Jawa dengan ketenangan alam.',
            image: '/images/rooms/ngadirojo/ngadirojo.webp',
        },
        {
            name: 'Polaman',
            desc: 'Rumah Polaman adalah limasan tradisional Jawa yang dibangun tahun 1948. Menggabungkan kehangatan arsitektur Jawa dengan pemandangan alam.',
            image: '/images/rooms/polaman/polaman.webp',
        },
        {
            name: 'Adikarto',
            desc: 'Rumah Adikarto adalah rumah limasan tradisional Jawa yang membawa kesejukan dan kenyamanan dalam suasana alami. Dibangun pada tahun 1960.',
            image: '/images/rooms/adikarto/adikarto.webp',
        },
      ],
      pavillion: {
        title: ['Fasilitas Di Setiap', 'Rumah'],
        icon: ["/images/icons/wifi-green.png", "/images/icons/cup-green.png", "/images/icons/music-green.png"],
        desc: ['Wi-Fi', 'Minuman Sambutan Khusus', 'Hidangan Tradisional'],
        button: 'Lihat Semua Rumah'
      },
      living:{
        head: ['Pengalaman Tinggal', 'Bernuansa Budaya'],
        title: {item1: 'Warisan Budaya', item2: 'Harmoni Alam', item3: 'Momen Bermakna'},
        desc: {item1: 'Arsitektur dan tradisi yang tetap hidup', item2: 'Dikelilingi taman tropis dan hamparan sawah', item3: 'Waktu beristirahat yang terasa lebih berharga'},
      },
      food:{
        head: ['Makanan &', 'Minuman'],
        desc: "Nikmati perjalanan rasa yang menonjolkan kekayaan masakan Indonesia. Resep turun temurun tetap dipertahankan lalu diolah dengan cara yang lebih segar sehingga hidangan terasa akrab dan tetap menarik. Suasana yang tenang membuat waktu makan terasa nyaman. Setiap sajian memberi kesempatan untuk merasakan budaya dari cita rasa yang hangat dan penuh karakter.",
        item: {item1: 'Bahan segar dari pertanian organik lokal', item2: 'Resep tradisional dengan tampilan modern', item3: 'Pelayanan ramah yang terasa seperti di rumah'},
        button: 'Lihat Paket'
      },
      venue:{
        head: 'ACARA & PERAYAAN',
        title: 'Tempat Sakral Untuk Momen Spesial',
        desc: 'Buat kenangan berharga di ruang penuh budaya. Arsitektur Jawa yang khas memberi latar sempurna untuk pernikahan, acara perusahaan, dan perayaan budaya.',
        firstCard: 
        {
          title: 'Upacara Pernikahan',
          desc: 'Rayakan momen spesial Anda di pendopo yang tenang, dikelilingi taman yang hijau dan suasana yang damai. Tim kami akan membantu mengatur setiap detail agar acara terasa pribadi dan penuh makna.',
          item1: 'Kapasitas hingga 150 tamu',
          item2: 'Pilihan upacara di taman',
          item3: 'Pilihan iringan gamelan',
          button: 'Rencanakan Pernikahan Anda'
        },
        secondCard:
        {
          title: 'Acara Perusahaan',
          desc: 'Tingkatkan kreativitas dan kebersamaan tim di lingkungan yang tenang dan menyegarkan.Ruang pertemuan kami memadukan desain tradisional dan fasilitas modern, menjadi tempat yang nyaman untuk sesi yang produktif dan hubungan yang lebih solid.',
          item1: 'Beragam pilihan tata ruang',
          item2: 'Internet cepat dan peralatan presentasi',
          item3: 'Pilihan hidangan tradisional',
          button: 'Pesan Acara Perusahaan'
        },
      },
      collection:{
        title: 'Koleksi Bersejarah',
        desc: 'Jelajahi koleksi artefak budaya yang dipilih dengan hati-hati, menampilkan kisah, karya, dan warisan seni dari masa ke masa. Setiap benda mengajak Anda untuk berhenti sejenak, melihat lebih dekat, dan merasakan hubungan dengan sejarah.',
        cardTitle: {item1: 'Koleksi Cundrik', item2: 'Koleksi Cundrik', item3: 'Koleksi Keris', item4: 'Koleksi Keris'},
        cardDesc: 
        {
          item1: 'Sebuah cundrik kecil yang dahulu dibawa sebagai Senjata pribadi.', 
          item2: 'Cundrik berukuran panjang dengan pola sanak.', 
          item3: 'Keris tradisi Surakarta dengan bilah lurus', 
          item4: 'Keris berluk lima dengan pola pamor tegas di sepanjang bilah'
        },
        button: 'Lihat Koleksi Lengkap'
      },
      location:{
        title: 'Akses & Lokasi',
        subtitle: 'Dekat dari pusat Kota Yogyakarta dan bandara',
        cardTitle: {item1: 'Alamat', item2: 'Jarak Dari Bandara', item3: 'Dekat Dari Pusat Kota'},
        cardDesc:{
          item1: 'Jl. Parangtritis No.Km 8.4, Tembi, Timbulharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55186',
          item2: '25 menit dari Bandara Internasional Yogyakarta.',
          item3: '15 menit dari Malioboro dan pusat kota.'
        },
        transport: 
        {
          title: "Pilihan Transportasi",
          item1: "Layanan taksi dan berbagi tumpangan tersedia.",
          item2: "Bus umum jalur 1A berhenti di dekat sini.",
          item3: "Parkir gratis di lokasi untuk 50+ kendaraan."
        }
      }
    },
    history:{
      hero:{
        title: ['Cerita Kami:', 'Tembi Rumah Budaya'],
        subtitle: 'Tempat di mana warisan budaya tetap hidup dan tradisi terus berlanjut. Tembi Historical Home menjaga kebudayaan Jawa dengan ketulusan dan keharmonisan sehingga setiap tamu bisa merasakannya secara nyata.',
      },
      intro:{
        head: 'Warisan & Budaya',
        title: [
          'Tempat di mana Jiwa',
          'Budaya Jawa Bertemu',
          'Kenyamanan Masa Kini'
        ],
        subtitle: [
          'Tembi Historical Home berdiri pada 20 Mei 2000 dengan nama Tembi Rumah Budaya. Tujuannya menjaga filosofi, seni, dan tradisi Jawa tetap hidup. Tempat ini menjadi ruang edukasi dan ekspresi. Warisan budaya terdokumentasi dengan baik agar bisa terus dinikmati oleh generasi berikutnya.',
          'Perjalanan Tembi berkembang dari institusi budaya menjadi destinasi hospitality berbasis warisan Jawa. Sejak 2008, Tembi menghadirkan pengalaman menginap, bersantap, dan venue untuk berbagai acara. Dari pertemuan kecil hingga perayaan besar. Semua tetap berpegang pada misi pelestarian budaya.'
        ],
        item: [
          'Tahun menjaga warisan',
          'Program budaya',
          'Tamu yang datang'
        ]
      },
      founder:{
        head: 'Pendiri Kami',
        title: [
          'Sosok di Balik Misi',
          'Pelestarian Budaya'
        ],
        desc1: [
          'Tembi Historical Home didirikan oleh almarhum',
          'Pollycarpus Swantoro,', 
          'seorang tokoh budaya dan jurnalis terkemuka di Indonesia. Ia terinspirasi oleh kenangan masa kecil dan kecintaannya pada Yogyakarta. Ia membayangkan sebuah tempat yang memungkinkan setiap orang kembali merasakan akar budaya di tengah perkembangan zaman.',
        ],
        desc2:[
          'Warisan gagasannya kini diteruskan oleh putra sulungnya,',
          'Norbertus Nuranto.',
          'Ia menjaga Tembi tetap menjadi ruang budaya yang inklusif dan menginspirasi. Semua orang dapat merasakan keindahan warisan Jawa yang terus hidup, baik dari komunitas lokal maupun pengunjung mancanegara.'
        ],
      },
      living:{
        head: 'Budaya yang Hidup',
        title: 'Rumah dengan Budaya yang Hidup',
        subtitle: 'Tembi bukan hanya tempat menginap. Kamu merasakan kehidupan Jawa lewat tradisi, seni, dan filosofi. Kamu bisa ikut kelas tari Jawa klasik, membatik, dan macapat. Kami menjaga ruang belajar dan ekspresi budaya agar terus tumbuh.',
        title2: 'Filosofi Budaya',
        desc: [
          'Program budaya kami berlandaskan filosofi Jawa Hamemayu Hayuning Bawana. Artinya menjaga dan memperindah dunia. Setiap aktivitas. Setiap pelajaran. Setiap momen yang dibagikan berkontribusi pada tujuan ini.',
          'Kami percaya budaya itu hidup. Budaya berkembang melalui praktik dan berbagi. Kamu tidak hanya melihat budaya Jawa. Kamu ikut menjadi bagian dari kelanjutannya.'
        ],
        item: [
          'Kegiatan Budaya',
          'Peserta Setiap Bulan'
        ]
      },
      contact:{
        title: [
          'Where Historical',
          'Culture Is Divine'
        ],
        subtitle: 'Bergabunglah menjaga dan menikmati warisan Jawa. Setiap kunjungan membantu tradisi tetap terus ada untuk generasi berikutnya.',
        itemTitle: [
          'Pemesanan Langsung',
          'Informasi Budaya',
          'Kunjungi Kami'
        ],
        itemDesc:[
          'Hubungi langsung untuk pengalaman budaya yang dipersonalisasi dan pilihan paket khusus.',
          'Cari informasi tentang workshop, acara, dan program pelestarian budaya.',
          'Kami berada di pusat kawasan budaya Yogyakarta. Datang dan rasakan sendiri kehangatan Tembi.'
        ]
      }
    },
    foods:{
      hero:{
        label: 'Hidangan tradisional Jawa',
        title: ['Paket Makanan', '& Minuman'],
        subtitle: 'Rasa Jawa yang autentik untuk setiap acara.',
        desc: 'Rasakan keramahan Jawa lewat setiap hidangan. Mulai dari buffet klasik hingga snack dan nasi box. Setiap sajian dibuat penuh perhatian dan cita rasa lokal yang kaya. Kelezatan kuliner Jawa Tengah hadir untuk melengkapi setiap momen.'
      },
      intro:{
        label: 'Warisan Budaya',
        title: ['Menjaga Tradisi', 'Lewat Rasa Asli'],
        desc: 'Di Tembi Historical Home, makanan menjadi bagian penting dari pelestarian budaya. Layanan katering menggabungkan pengalaman kuliner Jawa dari generasi ke generasi. Resep tradisional tetap digunakan. Bahan segar didapat dari wilayah Yogyakarta. Setiap sajian menghadirkan cita rasa yang bermakna.',
        itemTitle:[
          'Resep Tradisional',
          'Bahan Lokal',
          'Penyajian Budaya'
        ],
        itemDesc: [
          'Hidangan Jawa disiapkan dengan cara yang diwariskan turun temurun.',
          'Sayuran dan bahan segar dari lingkungan sekitar.',
          'Disajikan dengan daun pisang atau peralatan kayu yang menghadirkan nuansa Jawa.'
        ],
      },
      packages:{
        label: 'Paket Catering',
        title: ['Pilih Paket Sesuai', 'Kebutuhan'],
        subtitle: 'Setiap paket dirancang dengan cermat. Pengalaman bersantap rasa Jawa yang hangat untuk berbagai acara dan jumlah tamu.',
        card1:{
          badge: '≥35 pax',
          title: 'Paket Buffet',
          subtitle: 'Pilihan untuk Acara Besar',
          desc: 'Cocok untuk pertemuan, acara budaya, dan makan bersama dalam jumlah banyak. Sajian lengkap berisi nasi, sup, lauk utama, pendamping, dan minuman tradisional.',
          features: [
            'Hidangan lengkap',
            'Gaya penyajian tradisional',
            'Pilihan menu beragam',
            'Dessert dan minuman sudah termasuk'
          ],
          linkUrl: '/catering/buffet',
          buttonText: 'Lihat Menu Buffet'
        },
        card2:{
          badge: '≥35 pax',
          title: 'Paket Snack Box ',
          subtitle: 'Pilihan untuk Acara Santai',
          desc: 'Camilan dan kudapan tradisional yang pas untuk pertemuan ringan atau acara sore hari dengan cita rasa Jawa yang khas.',
          features: [
            'Varian camilan tradisional',
            'Kemasan per kotak',
            'Pilihan manis dan gurih',
            'Teh tradisional sudah termasuk'
          ],
          linkUrl: '/catering/snack-box',
          buttonText: 'Lihat Menu Snack Box'
        },
        card3:{
          badge: '≥35 pax',
          title: 'Paket Nasi Box',
          subtitle: 'Menu Lengkap Per Orang',
          desc: 'Makanan lengkap dalam satu kotak berisi hidangan Jawa autentik. Cocok untuk rapat bisnis, seminar, atau acara yang membutuhkan penyajian individual.',
          features: [
          'Menu lengkap seimbang',
          'Kemasan per kotak',
          'Lauk utama tradisional',
          'Sambal khas sudah termasuk'
          ],
          linkUrl: '/catering/rice-box',
          buttonText: 'Lihat Menu Nasi Box'
        },
        footerTitle: [
          'Minimal 35 Orang',
          'Pemberitahuan 24 Jam'
        ],
        footerDesc: [
          'Paket tersedia untuk pemesanan minimal 35 orang',
          'Pemesanan dilakukan minimal 24 jam sebelum acara'
        ]
      },
      menus:{
        label: 'Menu Sampel',
        title: ['Rasakan Cita', 'Rasa Autentik'],
        desc: 'Warisan kuliner Jawa hadir melalui hidangan yang dipilih dengan cermat. Semua disiapkan dengan resep turun temurun dan penuh rasa.',
        buffet: {
          title: 'Sorotan Menu Buffet',
          desc: 'Menu lengkap hidangan tradisional Jawa',
          item:[
            { image: '/images/foods/nasi-liwet.webp', title: 'Nasi Liwet', desc: 'Nasi gurih harum dimasak dalam daun pisang dengan bumbu rempah' },
            { image: '/images/foods/ayam-kremes.webp', title: 'Ayam Goreng Kremes', desc: 'Ayam goreng renyah dengan balutan kacang tradisional' },
            { image: '/images/foods/sayur-asem.webp', title: 'Sayur Asem', desc: 'Sayur asem segar berisi berbagai sayuran' },
            { image: '/images/foods/sambal.webp', title: 'Sambal Bajak', desc: 'Sambal kacang pedas bercita rasa khas' },
            { image: '/images/foods/es-dawet.webp', title: 'Es Dawet', desc: 'Minuman segar santan dengan isian cendol' },
          ],
        },
        snack: {
          title: 'Sorotan Snack Box',
          desc: 'Kudapan manis dan gurih tradisional',
          item:[
            { image: '/images/foods/klepon.webp', title: 'Klepon', desc: 'Ketan hijau berisi gula aren dan taburan kelapa' },
            { image: '/images/foods/kue-lumpur.webp', title: 'Kue Lumpur', desc: 'Kue lembut dengan santan dan kismis' },
            { image: '/images/foods/pastel.webp', title: 'Pastel', desc: 'Gorengan renyah berisi sayuran dan daging berbumbu' },
            { image: '/images/foods/teh.webp', title: 'Teh Hangat', desc: 'Teh herbal hangat dengan rempah aromatik' },
          ],
        },
        rice: {
          title: 'Sorotan Rice Box',
          desc: 'Menu lengkap per porsi bergaya tradisional',
          item: [
            { image: '/images/foods/nasi-putih.webp', title: 'Nasi Putih', desc: 'Nasi putih pulen sebagai dasar hidangan' },
            { image: '/images/foods/ayam-kalasan.webp', title: 'Ayam Kalasan', desc: 'Ayam bakar manis gurih dengan bumbu kecap' },
            { image: '/images/foods/tempe.webp', title: 'Tempe Bacem', desc: 'Tempe bacem dengan gula jawa dan rempah' },
            { image: '/images/foods/urap.webp', title: 'Urap', desc: 'Urap sayur dengan kelapa berbumbu' },
            { image: '/images/foods/sambal-fresh.webp', title: 'Sambal', desc: 'Sambal buatan rumahan dengan racikan rempah yang hidup' },
          ]
        }
      },
      gen: {
        card: {
          title: '3 Generasi',
          subtitle: 'Warisan tradisi kuliner',
          desc: '"Setiap sajian membawa cerita keluarga dan kecintaan pada rasa yang asli."'
        },
        label: 'Warisan Kami',
        title: [
          'Tiga Generasi Dalam ',
          'Satu Rasa'
        ],
        desc: 'Resep keluarga diwariskan dari generasi ke generasi. Setiap hidanganmembawa nilai budaya Jawa yang tetap hidup sampai hari ini.',
        itemTitle: [
          'Resep Tradisional',
          'Dari Kebun ke Meja',
          'Dibuat dengan Hati'
        ],
        itemDesc: [
          'Racikan autentik sejak awal 1900an. Dijaga oleh para ibu dalam keluarga.',
          'Bahan segar dari petani lokal dan kebun warisan. Mendukung komunitas sekitar.',
          'Semua hidangan disiapkan dengan cara tradisional. Rasa terjaga. Makna tetap ada.'
        ]
      },
      celebrate: {
        label: 'Kesempatan yang Tepat',
        title: ['Rayakan Setiap', 'Momen'],
        desc: 'Untuk acara kecil sampai perayaan besar, layanan katering kami hadir agar setiap momen terasa berkesan dengan keramahan Jawa yang autentik.',
        card1: {
          title: 'Acara Perusahaan',
          subtitle: 'Pertemuan bisnis dengan sentuhan budaya',
          features: [
            'Meeting dan seminar',
            'Retreat perusahaan',
            'Acara pengembangan tim'
          ]
        },
        card2: {
          title: 'Perayaan Budaya',
          subtitle: 'Upacara tradisional dan momen bermakna',
          features: [
            'Pernikahan adat',
            'Festival budaya',
            'Acara keagamaan'
          ]
        },
        card3: {
          title: 'Pertemuan Keluarga',
          subtitle: 'Selebrasi hangat bersama orang terdekat',
          features: [
            'Ulang tahun',
            'Reuni keluarga',
            'Acara liburan'
          ]
        },
        stat1: {
          number: '100+',
          label: 'Acara Telah Ditangani'
        },
        stat2: {
          number: '1,000+',
          label: 'Tamu Telah Dilayani'
        },
        stat3: {
          number: '98%',
          label: 'Tingkat Kepuasan'
        },
        stat4: {
          number: '15+',
          label: 'Tahun Pengalaman'
        },
      },
      contact: {
        title: 'Butuh Bantuan?',
        subtitle: 'Tim kami siap membantu merencanakan katering yang sesuai untuk acara spesial Anda.',
        card1: {
          title: 'Hubungi Kami',
          subtitle: 'Konsultasi langsung dengan tim katering',
          phone: '+62 274 368 000',
          desc: 'Setiap Hari 8:00 AM - 8:00 PM'
        },
        card2: {
          title: 'WhatsApp',
          subtitle: 'Respons cepat untuk kebutuhan mendesak',
          phone: '+62 822 2514 2729',
          desc: 'Chat Now'
        },
        card3: {
          title: 'Email Kami',
          subtitle: 'Permintaan detail dan penyesuaian paket',
          phone: 'catering@tembihistoricalhome.com',
          desc: 'Balasan maksimal 24 jam'
        },
        footer: {
          title: 'Permintaan Khusus & Paket Kustom',
          desc: 'Jika Anda merencanakan acara dengan konsep tertentu atau membutuhkan menu khusus, tim dapur kami dapat menyesuaikan hidangan sesuai kebutuhan dan preferensi budaya maupun diet Anda.',
          button: 'Ajukan Penawaran Kustom'
        }
      }
    },
    catering:{
      hero: {
        label: 'Layanan Katering Premium',
        titleBuffet: 'Paket Catering Buffet',
        descBuffet: 'Hidangan Jawa autentik untuk acara kumpul dan perayaan. Semua menu disiapkan dengan resep turun-temurun yang menjaga rasa tradisi tetap hidup.',
        titleSnack: 'Paket Snack Box',
        descSnack: 'Kudapan Jawa untuk setiap momen. Rasakan cita rasa tradisi lewat snack box buatan tangan. Dibuat segar setiap pagi dengan resep turun temurun. Cocok untuk rapat, kumpul keluarga, atau acara budaya.',
        titleRice: 'Paket Nasi Box',
        descRice: 'Authentic Javanese meals packed with warmth and care. Experience the comforting flavors of home-cooked Javanese dishes, thoughtfully prepared and beautifully packed for your events. Perfect for meetings, community gatherings, or family celebrations.',
        pax: 'Minimum 35 Pax',
        hour: '4-6 Jam Servis',
        buttonText: 'Lihat Paket'
      },
      intro: {
        label: 'Warisan Kami',
        title: 'Perjalanan Rasa dalam Tradisi Jawa',
        desc: 'Selama lebih dari tiga dekade, Tembi Rumah Budaya menjaga keaslian cita rasa Jawa. Buffet kami membawa kehangatan keramahan tradisional ke setiap acara penting Anda.',
        stats1: {
          num: '25+',
          desc: 'Tahun Pengalaman'
        },
        stats2: {
          num: '100+',
          desc: 'Acara Telah Ditangani'
        },
      },
      buffetMenu: {
        label: 'Menu Kami',
        title: 'Rasa Jawa yang Autentik',
        desc: 'Setiap paket buffet menghadirkan keseimbangan rasa. Hidangan utama yang menghangatkan. Minuman segar dan dessert yang melengkapi momen.',
        menuCard1: {
          icon: "/images/icons/circle-white.png",
          title: "Soup",
          subtitle: "Pilih Kuah & Sayur",
          items: [
            'Sup Sayur Bening', 'Sup Bakso Sosis', 'Sup Rolade',
            'Sup Ayam Jagung', 'Sup Timlo', 'Jangan Lodeh',
            'Jangan Asem', 'Jangan Bobor Gandol', 'Oblok Godhong Telo',
            'Gulai Nangka Muda'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.png",
          title: "Main Course",
          subtitle: "Tumis & Lauk",
          items: [
            'Tumis Tempe Kacang Panjang', 'Tumis Tahu Tomat Ijo', 
            'Oseng Tempe Lombok Ijo', 'Oseng Janggel Sosis', 
            'Oseng Terong Balado', 'Oseng Labu Siam', "Ca' Buncis Tahu", 
            "Ca' Kembang Kol Bakso", "Ca' Brokoli Jamur Kuping", 'Sapo Tahu'
          ]
        },
        menuCard3: {
          icon: "/images/icons/ice-cream-white.png",
          title: "Desserts",
          subtitle: "Traditional Sweets",
          items: [
            'Es Dawet Tradisional', 'Klepon Gula Jawa', 
            'Onde-onde Wijen', 'Lupis Ketan'
          ]
        },
        menuCard4: {
          icon: "/images/icons/drink-white.png",
          title: "Beverages",
          subtitle: "Refreshing Drinks",
          items: [
            'Es Degan', 'Es Teh Manis', 'Es Jeruk', 'Es Setup',
            'Es Dawet', 'Es Serut Melon', 'Es Buah', 'Es Cincau',
            'Es Cocktail', 'Es Infuse Water'
          ]
        },
        menuCard5: {
          icon: "/images/icons/circle-white.png",
          title: "Chicken",
          subtitle: "Pilihan Ayam",
          items: [
            'Ayam Goreng Kalasan', 'Ayam Goreng Kremes', 'Ayam Lada Hitam',
            'Ayam Daun Temuru', 'Ayam Fillet Goreng', 'Ayam Saus Mentega',
            'Ayam Semur', "Ayam Ca' Jamur", 'Ayam Cabe Ijo', 'Chicken Katsu'
          ]
        },
        menuCard6: {
          icon: "/images/icons/chicken-white.png",
          title: "Egg",
          subtitle: "Pilihan Telur",
          items: [
            'Telur Semur', 'Telur Balado', 'Telur Dadar Padang',
            'Telur Asin', 'Telur Rebus', 'Telur Crispy',
            'Telur Ceplok Bumbu Bali', 'Telur Goreng Cabe Ijo',
            'Gulai Telur', 'Fuyung Hai'
          ]
        },
        menuCard7: {
          icon: "/images/icons/circle-white.png",
          title: "Fish",
          subtitle: "Pilihan Ikan",
          items: [
            'Lele Goreng Kremes', 'Mangut Lele', 'Nila Sambal Matah',
            'Nila Goreng/Bakar', 'Kembung Cabe Ijo', 'Kembung Balado',
            'Ikan Fillet Asam Manis', 'Ikan Fillet Sambal Matah',
            'Ikan Fillet Dabu-Dabu', 'Ikan Katsu'
          ]
        },
        menuCard8: {
          icon: "/images/icons/chicken-white.png",
          title: "Side Dish",
          subtitle: "Pilihan Menu Pendamping",
          items: [
            'Mendoan', 'Tahu/Tempe Goreng', 'Tahu/Tempe Bacem',
            'Perkedel Tahu', 'Tahu Susu', 'Tahu Crispy',
            'Bakwan Sayur', 'Bakwan Jagung', 'Perkedel Kentang',
            'Jamur Crispy'
          ]
        }
      },
      snackMenu: {
        label: 'Menu Kami', //
        title: 'Rasa Jawa yang Autentik', //
        desc: 'Setiap paket snack bos menghadirkan keseimbangan rasa. Hidangan utama yang menghangatkan. Minuman segar dan dessert yang melengkapi momen.', //
        menuCard1: {
          icon: "/images/icons/circle-white.png", // Icon tanda seru (!)
          title: "Sweet Snacks",
          subtitle: "", // Dikosongkan karena tidak ada subtitle di gambar
          items: [
            'Klepon',
            'Kue Lapis',
            'Dadar Gulung',
            'Lemper',
            'Putu Ayu',
            'Bolu Kukus',
            'Risoles Coklat'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.png", // Icon ayam
          title: "Savory Snacks",
          subtitle: "",
          items: [
            'Pastel',
            'Lumpia',
            'Risoles Mayo',
            'Arem-Arem Ayam',
            'Martabak Mini',
            'Sosis Solo',
            'Kroket Kentang'
          ]
        },
        menuCard3: {
        icon: "/images/icons/ice-cream-white.png", // Icon es krim
        title: "Crunchy Snacks",
        subtitle: "",
        items: [
          'Emping Jagung',
          'Keripik Singkong',
          'Kacang Bawang',
          'Keripik Tempe'
          ]
        }
      },
      riceMenu: {
        label: 'Menu Kami', //
        title: 'Rasa Jawa yang Autentik', //
        desc: 'Setiap paket Nasi Box menghadirkan keseimbangan rasa. Hidangan utama yang menghangatkan. Minuman segar dan dessert yang melengkapi momen.', //
        menuCard1: {
          icon: "/images/icons/circle-white.png", // Icon tanda seru lingkaran
          title: "Main Dishes",
          subtitle: "", // Kosong karena tidak ada subtitle di gambar
          items: [
            'Steamed rice',
            'Kalasan fried chicken',
            'Crispy chicken',
            'Spicy egg',
            'Braised chicken'
          ]
        },
        menuCard2: {
          icon: "/images/icons/chicken-white.png", // Icon paha ayam
          title: "Side Dishes",
          subtitle: "",
          items: [
            'Stir-fried tempeh with long beans',
            'Eggplant balado',
            'Mixed vegetables with grated coconut',
            'Tofu sauté',
            'Sambal Terasi'
          ]
        },
        menuCard3: {
          icon: "/images/icons/ice-cream-white.png", // Icon es krim
          title: "Add-Ons",
          subtitle: "",
          items: [
            'Tofu',
            'Tempe',
            'Potato Fritters',
            'Fried Fish'
          ]
        },
        menuCard4: {
          icon: "/images/icons/drink-white.png", // Icon gelas
          title: "Extras",
          subtitle: "",
          items: [
            'Fresh fruit',
            'Crackers',
            'Bottled water'
          ]
        }
      },
      buffet: {
        label: 'Pilih Paket Anda',
        title: 'Pilihan Paket Buffet',
        subtitle: 'Pilih paket terbaik untuk acara Anda. Semua paket menghadirkan pengalaman makan khas Jawa dengan pilihan menu dan layanan yang sesuai kebutuhan Anda.',
        badge: 'MOST POPULAR',
        footer: 'Butuh paket khusus? Kami dapat menyesuaikan menu sesuai acara Anda.',
        buttonText: 'Ajukan Penawaran Kustom',
        card1: {
          name: "Buffet Standard",
          minPax: "35 Pax",
          description: "Sesuai untuk acara perusahaan",
          theme: "standard",
          iconSrc: "/images/icons/food-white.png", 
          items: [
            "Nasi Putih",
            "1 Pilihan Kuah",
            "1 Pilihan Tumisan",
            "1 Pilihan Ayam Atau Telur",
            "Buah Potong",
            "Sambal",
            "Kerupuk",
            "Air Putih"
          ]
        },
        card2: {
          name: "Buffet Premium",
          minPax: "50 Pax", // Sesuai gambar English version
          description: "Ideal untuk pernikahan dan perayaan",
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.png", 
          items: [
            "Nasi Putih",
            "1 Pilihan Kuah",
            "1 Pilihan Tumisan",
            "1 Pilihan Ayam Atau Telur",
            "1 Pilihan Ikan",
            "1 Pilihan Lauk Pendamping",
            "Buah Potong",
            "Sambal",
            "Kerupuk",
            "Air Putih"
          ]
        },
        card3: {
          name: "Buffet Exclusive",
          minPax: "100 Pax", // Sesuai gambar English version
          description: "Pengalaman tradisional yang menyeluruh",
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.png", 
          items: [
            "Nasi Putih",
            "1 Pilihan Kuah",
            "1 Pilihan Tumisan",
            "1 Pilihan Ayam Atau Telur",
            "1 Pilihan Ikan",
            "1 Pilihan Lauk Pendamping",
            "1 Pilihan Es",
            "Buah Potong",
            "Sambal",
            "Kerupuk",
            "Air Putih"
          ]
        }
      },
      snack: {
        label: 'Pilih Paket Anda', //
        title: 'Pilihan Paket Snack Box', //
        subtitle: 'Pilih paket terbaik untuk acara Anda. Semua paket menghadirkan pengalaman makan khas Jawa dengan pilihan menu dan layanan yang sesuai kebutuhan Anda.', //
        badge: 'MOST POPULAR', //
        footer: 'Butuh paket khusus? Kami dapat menyesuaikan menu sesuai acara Anda.', //
        buttonText: 'Ajukan Penawaran Kustom', //
        card1: {
          name: "Snack Box A", //
          minPax: "35 Pax", //
          description: "Ideal untuk rapat singkat atau kumpul kecil.", //
          theme: "standard",
          iconSrc: "/images/icons/food-white.png",
          items: [
            "2 Snacks", //
            "1 Camilan Kering (kletikan)", //
            "1 Cup Air Mineral" //
          ]
        },
        card2: {
          name: "Snack Box B", //
          minPax: "35 Pax", //
          description: "Pilihan seimbang untuk seminar atau workshop.", //
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.png",
          items: [
            "3 snacks", //
            "1 Camilan Kering (kletikan)", //
            "1 Cup Air Mineral" //
          ]
        },
        card3: {
          name: "Snack Box C", //
          minPax: "35 Pax", //
          description: "Pilihan premium untuk acara formal atau acara spesial.", //
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.png",
          items: [
            "3 snacks", //
            "1 Camilan Kering (kletikan)", //
            "1 Cup Air Mineral" //
          ]
        }
      },
      rice: {
        label: 'Pilih Paket Anda', //
        title: 'Pilihan Paket Nasi Box', //
        subtitle: 'Pilih paket terbaik untuk acara Anda. Semua paket menghadirkan pengalaman makan khas Jawa dengan pilihan menu dan layanan yang sesuai kebutuhan Anda.', //
        badge: 'MOST POPULAR', //
        footer: 'Butuh paket khusus? Kami dapat menyesuaikan menu sesuai acara Anda.', //
        buttonText: 'Ajukan Penawaran Kustom', //
        card1: {
          name: "Nasi Box A", //
          minPax: "35 Pax", //
          description: "Cocok untuk rapat kecil atau acara santai.", //
          theme: "standard",
          iconSrc: "/images/icons/food-white.png",
          items: [
            "Nasi Putih", //
            "Pilihan Tumisan", //
            "Pilihan Ayam/Telur", //
            "Buah Potong", //
            "Sambal Dan Kerupuk" //
          ]
        },
        card2: {
          name: "Nasi Box B", //
          minPax: "35 Pax", //
          description: "Pas untuk kumpul kantor atau makan bersama tim.", //
          theme: "premium",
          isPopular: true,
          iconSrc: "/images/icons/crown-white.png",
          items: [
            "Nasi Putih", //
            "Pilihan Tumisan", //
            "Pilihan Ayam/Telur", //
            "Pilihan Lauk Pendamping", //
            "Buah Potong", //
            "Sambal Dan Kerupuk" //
          ]
        },
        card3: {
          name: "Nasi Box C", //
          minPax: "35 Pax", //
          description: "Pilihan lengkap dan premium untuk acara formal atau skala besar.", //
          theme: "exclusive",
          iconSrc: "/images/icons/diamond-white.png",
          items: [
            "Nasi Putih", //
            "Pilihan Tumisan", //
            "Pilihan Ayam/Telur", //
            "Pilihan Lauk Pendamping", //
            "Pilihan Snack", //
            "Buah Potong", //
            "Sambal Dan Kerupuk", //
            "Air Mineral Gelas" //
          ]
        }
      },
      service: {
        label: 'Alasan Memilih Kami', //
        title: 'Layanan Katering Lengkap', //
        subtitle: 'Kami menangani semua detail. Anda cukup menikmati acara bersama tamu.', //
        features: [
          {
            title: "Gratis Antar dan Penataan", //
            desc: "Kami menyiapkan pengantaran, penataan, dan pengemasan setelah acara. Tim kami datang 2 jam sebelum acara dimulai.", //
            iconSrc: "/images/icons/truck-white.png"
          },
          {
            title: "Staf Profesional", //
            desc: "Staf berpengalaman dengan busana tradisional yang menjaga suasana tetap autentik selama acara Anda.", //
            iconSrc: "/images/icons/group-white.png"
          },
          {
            title: "Bahan Segar", //
            desc: "Semua hidangan dibuat segar pada hari acara dengan bahan lokal dan organik dari pemasok terpercaya.", //
            iconSrc: "/images/icons/leaf-white.png"
          },
          {
            title: "Waktu Fleksibel", //
            desc: "Tersedia untuk acara pagi, siang, atau malam. Durasi layanan bisa diperpanjang sesuai kebutuhan acara khusus.", //
            iconSrc: "/images/icons/clock-white.png"
          },
          {
            title: "Kualitas Terjamin", //
            desc: "Kami menjamin kepuasan Anda. Jika Anda kurang puas, kami akan memperbaikinya atau memberi pengembalian penuh.", //
            iconSrc: "/images/icons/curly-white.png"
          },
          {
            title: "Peralatan Lengkap", //
            desc: "Peralatan saji lengkap termasuk piring, alat makan, dan perlengkapan saji tradisional. Tersedia opsi ramah lingkungan.", //
            iconSrc: "/images/icons/food-white.png"
          }
        ]
      },
      booking: {
        label: 'Cara Pemesanan', //
        title: 'Proses Pemesanan Mudah', //
        subtitle: 'Anda bisa mulai memesan katering buffet Jawa dengan cepat. Ikuti langkah sederhana ini untuk mengamankan tanggal dan menyesuaikan menu sesuai kebutuhan Anda.', //
        steps: [
          {
            num: "1",
            title: "Pilih Paket", //
            desc: "Pilih paket yang sesuai. Kami juga bisa bantu sesuaikan menu." //
          },
          {
            num: "2",
            title: "Booking & Konfirmasi", //
            desc: "Sampaikan detail acara. Kami cek ketersediaan lalu konfirmasi pesanan." //
          },
          {
            num: "3",
            title: "Rencana Menu", //
            desc: "Diskusikan kebutuhan khusus dan menu yang Anda inginkan." //
          },
          {
            num: "4",
            title: "Nikmati Acara", //
            desc: "Semua proses makanan dan layanan kami urus. Anda fokus menikmati acara." //
          }
        ]
      },
      contact:{
        title: 'Pesan Acara Anda Hari Ini', //
        desc: 'Anda bisa hadirkan cita rasa Jawa ke acara Anda berikutnya. Jadwal pemesanan cepat penuh di musim ramai. Hubungi kami untuk mengamankan tanggal pilihan Anda.', //
        item: [
          { title: 'Respon Cepat', desc: '+62 274 368 000' }, //
          { title: 'WhatsApp', desc: '+62 822 2514 2729' }, //
          { title: 'Email Us', desc: 'catering@tembihistoricalhome.com' } //
        ],
        whatsapp: 'WhatsApp Sekarang', //
        call: 'Telepon Sekarang' //
      }
    },
    collection: {
      hero: {
        badge: 'Koleksi Warisan Budaya',
        title: ['Koleksi Sejarah', 'Tembi',],
        desc: [
          "Pelestarian warisan budaya Indonesia melalui artefak bernilai sejarah. Kamu bisa menemukan kekayaan budaya Jawa lewat koleksi yang tersusun dengan cermat.",
          "Tembi Historical Home menyimpan beragam benda tradisional Jawa. Mulai dari alat sehari hari hingga karya kerajinan yang menggambarkan perjalanan budaya Indonesia.Setiap benda menghadirkan filosofi dan keterampilan masyarakat setempat yang diwariskan lintas generasi."
        ],
        buttonText: 'Lihat Koleksi'
      },
      stats: {
        item:[
          {
            id: 1,
            iconUrl: '/images/icons/diamond-green.png', 
            alt: 'Artifacts Icon',
            value: '250+',
            label: 'Koleksi',
          },
          {
            id: 2,
            iconUrl: '/images/icons/calendar-green.png', 
            alt: 'Origins Icon',
            value: '18th',
            label: 'Asal-Usul Abad',
          },
          {
            id: 3,
            iconUrl: '/images/icons/group-green.png', 
            alt: 'Visitors Icon',
            value: '5K',
            label: 'Pengunjung Tahunan',
          },
        ]
      },
      items: [
        {
          title: "Koleksi Cundrik",
          items: [
            {
              id: 1,
              imageUrl: "/images/collection/cundrik/GPT0541.png", // Pastikan gambar ada
              category: "Cundrik",
              title: "GPT0541",
              description: "Cundrik kecil yang dahulu dibawa sebagai jimat pribadi. Melambangkan kewaspadaan dan perlindungan, dengan bentuk yang mencerminkan karakter tegas dari kerajinan pesisir Cirebon."
            },
            {
              id: 2,
              imageUrl: "/images/collection/cundrik/GPT0540.png",
              category: "Cundrik",
              title: "GPT0540",
              description: "Cundrik berukuran panjang dengan pola sanak. Lekukannya menampilkan teknik masa Majapahit dan melambangkan keteguhan serta kekuatan pribadi."
            },
            {
              id: 3,
              imageUrl: "/images/collection/cundrik/GPT0539.png",
              category: "Cundrik",
              title: "GPT0539",
              description: "Cundrik ramping yang digunakan dalam tradisi rumah tangga dan upacara. Bentuknya yang ringan dan gaya tempa Segaluh menonjolkan fungsi praktis serta identitas budaya."
            },
            {
              id: 4,
              imageUrl: "/images/collection/cundrik/GPT0538.png", // Pastikan gambar ada
              category: "Cundrik",
              title: "GPT0538",
              description: ""
            },
            {
              id: 5,
              imageUrl: "/images/collection/cundrik/GPT0537.png",
              category: "Cundrik",
              title: "GPT0537",
              description: ""
            },
            {
              id: 6,
              imageUrl: "/images/collection/cundrik/GPT0536.png",
              category: "Cundrik",
              title: "GPT0536",
              description: ""
            },
            {
              id: 7,
              imageUrl: "/images/collection/cundrik/GPT0535.png", // Pastikan gambar ada
              category: "Cundrik",
              title: "GPT0535",
              description: ""
            },
            {
              id: 8,
              imageUrl: "/images/collection/cundrik/GPT0534.png",
              category: "Cundrik",
              title: "GPT0534",
              description: ""
            },
            {
              id: 9,
              imageUrl: "/images/collection/cundrik/GPT0533.png",
              category: "Cundrik",
              title: "GPT0533",
              description: ""
            }
          ]
        },
        {
          title: "Koleksi Pedang",
          items: [
            {
              id: 10,
              imageUrl: "/images/collection/sword/GPT0548.png",
              category: "Pedang",
              title: "GPT0548",
              description: "Sebilah senjata tradisional bermata satu dengan profil melengkung dan gagang kayu berukir. Bentuknya menyerupai senjata utilitas dan upacara yang ditemukan di beberapa wilayah di Jawa."
            },
            {
              id: 11,
              imageUrl: "/images/collection/sword/GPT0576.png",
              category: "Pedang",
              title: "GPT0576",
              description: "Pedang ramping dengan bilah panjang dan pola tempa yang terlihat jelas. Mencerminkan teknik logam masa Majapahit serta melambangkan keteguhan dan disiplin diri."
            },
            {
              id: 12,
              imageUrl: "/images/collection/sword/GPT0575.png",
              category: "Pedang",
              title: "GPT0575",
              description: "Pedang ringan dengan bilah sempit dan gagang kayu sederhana. Mengikuti gaya tempa Segaluh, pedang ini melambangkan identitas budaya dan perlindungan pribadi."
            },
            {
              id: 13,
              imageUrl: "/images/collection/sword/GPT0549.png", // Pastikan gambar ada
              category: "Pedang",
              title: "GPT0549",
              description: ""
            },
            {
              id: 14,
              imageUrl: "/images/collection/sword/GPT0574.png",
              category: "Pedang",
              title: "GPT0574",
              description: ""
            },
            {
              id: 15,
              imageUrl: "/images/collection/sword/GPT0550.png",
              category: "Pedang",
              title: "GPT0550",
              description: ""
            },
            {
              id: 16,
              imageUrl: "/images/collection/sword/GPT0571.png", // Pastikan gambar ada
              category: "Pedang",
              title: "GPT0571",
              description: ""
            },
            {
              id: 17,
              imageUrl: "/images/collection/sword/GPT0570.png",
              category: "Pedang",
              title: "GPT0570",
              description: ""
            },
            {
              id: 18,
              imageUrl: "/images/collection/sword/GPT0568.png",
              category: "Pedang",
              title: "GPT0568",
              description: ""
            }
          ]
        },
        {
          title: "Koleksi Sken",
          items: [
            {
              id: 19,
              imageUrl: "/images/collection/sken/GPT0518.png",
              category: "Sken",
              title: "GPT0518",
              description: "Belati kecil tradisional dengan gagang dan sarung kayu. Desain Cekel Bahuluk melambangkan perlindungan dan fungsi praktis, dan dahulu sering dibawa sebagai alat pribadi pada masa Majapahit."
            },
            {
              id: 20,
              imageUrl: "/images/collection/sken/GPT0521.png",
              category: "Sken",
              title: "GPT0521",
              description: "Bilah tradisional panjang berbentuk daun dengan gagang dan sarung kayu. Desain Kujang Malang melambangkan keberanian dan kewibawaan, dan digunakan dalam konteks upacara maupun pertahanan pada masa Mataram Amangkurat."
            },
            {
              id: 21,
              imageUrl: "/images/collection/sken/GPT0516.png",
              category: "Sken",
              title: "GPT0516",
              description: "Belati upacara dengan bilah lebar berbentuk daun serta gagang dan sarung kayu ukir halus. Godong Suruh, yang berarti “daun sirih,” melambangkan ketulusan, kesucian, dan harmoni."
            },
            {
              id: 22,
              imageUrl: "/images/collection/sken/GPT0517.png", 
              category: "Sken",
              title: "GPT0517",
              description: "" 
            },
            {
              id: 23,
              imageUrl: "/images/collection/sken/GPT0519.png",
              category: "Sken",
              title: "GPT0519",
              description: "" 
            },
            {
              id: 24,
              imageUrl: "/images/collection/sken/GPT0520.png",
              category: "Sken",
              title: "GPT0520",
              description: "" 
            }
          ]
        },
        {
          title: "Koleksi Tombak",
          items: [
            {
              id: 25,
              imageUrl: "/images/collection/spear/GPT407.png",
              category: "Tombak",
              title: "GPT407",
              description: "Belati tradisional dengan bilah panjang dan ramping serta gagang dan sarung kayu sederhana. Desainnya yang minimalis mencerminkan kerajinan fungsional yang menekankan keseimbangan dan kegunaan daripada hiasan."
            },
            {
              id: 26,
              imageUrl: "/images/collection/spear/GPT408.png",
              category: "Tombak",
              title: "GPT408",
              description: "Belati tradisional dengan bilah bermotif pamor dan gagang kayu berwarna gelap. Motif pamor terbentuk melalui teknik tempa berlapis dan melambangkan kekuatan batin serta keseimbangan."
            },
            {
              id: 27,
              imageUrl: "/images/collection/spear/GPT409.png",
              category: "Tombak",
              title: "GPT409",
              description: "Bilah pendek dengan gagang dan sarung kayu polos. Memiliki panjang bilah 25,5 cm dan panjang keseluruhan 49 cm, mencerminkan fungsi praktis untuk penggunaan sehari-hari."
            },
            {
              id: 28,
              imageUrl: "/images/collection/spear/GPT410.png",
              category: "Tombak",
              title: "GPT410",
              description: "" 
            },
            {
              id: 29,
              imageUrl: "/images/collection/spear/GPT412.png",
              category: "Tombak",
              title: "GPT412",
              description: "" 
            },
            {
              id: 30,
              imageUrl: "/images/collection/spear/GPT416.png",
              category: "Tombak",
              title: "GPT416",
              description: "" 
            },
            {
              id: 31,
              imageUrl: "/images/collection/spear/GPT507.png",
              category: "Tombak",
              title: "GPT507",
              description: "" 
            },
            {
              id: 32,
              imageUrl: "/images/collection/spear/GPT411.png",
              category: "Tombak",
              title: "GPT411",
              description: "" 
            },
            {
              id: 33,
              imageUrl: "/images/collection/spear/GPT413.png",
              category: "Tombak",
              title: "GPT413",
              description: "" 
            }
          ]
        },
        {
          title: "Koleksi Wayang",
          items: [
            {
              id: 34,
              imageUrl: "/images/collection/wayang/drona.png",
              category: "Wayang",
              title: "Drona",
              description: "Wayang yang menggambarkan sosok penasihat tua. Postur yang tenang dan kostum penuh detail mencerminkan kebijaksanaan, disiplin, dan kedudukanyang terhormat."
            },
            {
              id: 35,
              imageUrl: "/images/collection/wayang/gareng.png",
              category: "Wayang",
              title: "Gareng",
              description: "Wayang berperan komedi dengan gerak ekspresif dan karakter humoris. Bentuk tubuh yang membulat dan sikap yang ceria menunjukkan perannya sebagai sahabat setia yang membawa keceriaan dalam cerita."
            },
            {
              id: 36,
              imageUrl: "/images/collection/wayang/citraksa.png",
              category: "Wayang",
              title: "Citraksa",
              description: "Wayang yang menggambarkan sosok pejuang bangsawan. Pahatan detail dan warna cerah menonjolkan kekuatan, otoritas, dan gerakan yang halus."
            },
            {
              id: 37,
              imageUrl: "/images/collection/wayang/bima.png",
              category: "Wayang",
              title: "Bima",
              description: "" 
            },
            {
              id: 38,
              imageUrl: "/images/collection/wayang/aswatama.png",
              category: "Wayang",
              title: "Aswatama",
              description: "" 
            },
            {
              id: 39,
              imageUrl: "/images/collection/wayang/bagong.png",
              category: "Wayang",
              title: "Bagong",
              description: "" 
            },
            {
              id: 40,
              imageUrl: "/images/collection/wayang/abilawa.png",
              category: "Wayang",
              title: "Abilawa",
              description: "" 
            },
            {
              id: 41,
              imageUrl: "/images/collection/wayang/arimbi.png",
              category: "Wayang",
              title: "Arimbi",
              description: "" 
            },
            {
              id: 42,
              imageUrl: "/images/collection/wayang/nakula.png",
              category: "Wayang",
              title: "Nakula",
              description: "" 
            }
          ]
        },
        {
          title: "Koleksi Keris",
          items: [
            {
              id: 43,
              imageUrl: "/images/collection/keris/K.A 001.png",
              category: "Keris",
              title: "K.A 001",
              description: "Sebilah keris dari tradisi Surakarta dengan bilah lurus. Pamornya menampilkan susunan berlapis yang jelas, menunjukkan teknik tempa yang teliti. Hulu kayu dan warangka logam berukir mencerminkan keterampilan yang lekat dengan lingkungan bangsawan."
            },
            {
              id: 44,
              imageUrl: "/images/collection/keris/K.A 002.png",
              category: "Keris",
              title: "K.A 002",
              description: "Sebilah keris dengan lima lekukan dan pamor kuat di sepanjang bilah. Hulu bergaya Surakarta serta warangka logam berhias menunjukkan peran budaya keris dalam upacara dan warisan tradisi."
            },
            {
              id: 45,
              imageUrl: "/images/collection/keris/K.A 003.png",
              category: "Keris",
              title: "K.A 003",
              description: "Sebuah keris Jawa tradisional dengan pamor berlekuk dan hulu kayu. Warangka berlapis logam menandakan proses pelestarian pada masa berikutnya. Benda ini merepresentasikan pusaka pribadi yang digunakan sebagai simbol perlindungan dan jati diri."
            },
            {
              id: 46,
              imageUrl: "/images/collection/keris/K.A 004.png",
              category: "Keris",
              title: "K.A 004",
              description: "" 
            },
            {
              id: 47,
              imageUrl: "/images/collection/keris/K.A 005.png",
              category: "Keris",
              title: "K.A 005",
              description: "" 
            },
            {
              id: 48,
              imageUrl: "/images/collection/keris/K.A 006.png",
              category: "Keris",
              title: "K.A 006",
              description: "" 
            },
            {
              id: 49,
              imageUrl: "/images/collection/keris/K.A 007.png",
              category: "Keris",
              title: "K.A 007",
              description: "" 
            },
            {
              id: 50,
              imageUrl: "/images/collection/keris/K.A 008.png",
              category: "Keris",
              title: "K.A 008",
              description: "" 
            },
            {
              id: 51,
              imageUrl: "/images/collection/keris/K.A 009.png",
              category: "Keris",
              title: "K.A 009",
              description: "" 
            }
          ]
        },
        {
          title: "Koleksi Lainnya",
          items: [
            {
              id: 52,
              imageUrl: "/images/collection/lainnya/Command Staff.png",
              category: "Lainnya",
              title: "Command Staff",
              description: "Tongkat kayu berukir ini memiliki ujung runcing dan bagian atas yang dihias. Bentuknya sering dikaitkan dengan peran kepemimpinan atau penggunaan dalam upacara. Bahan dan hasil pengerjaannya menunjukkan bahwa benda ini dibuat pada periode yang relatif lebih baru."
            },
            {
              id: 53,
              imageUrl: "/images/collection/lainnya/VOC Flintlock Pistol.png",
              category: "Lainnya",
              title: "VOC Flintlock Pistol",
              description: "Pistol flintlock tembakan tunggal ini berasal dari masa VOC di wilayah Nusantara pada abad ke-17 hingga ke-19. Senjata ini umum digunakan oleh personel militer dan perwira sebagai senjata jarak dekat sekaligus penanda status."
            },
            {
              id: 54,
              imageUrl: "/images/collection/lainnya/Triple-Bladed Weapon.png",
              category: "Lainnya",
              title: "Triple-Bladed Weapon",
              description: "Senjata bermata tiga ini memiliki ujung tengah menyerupai tombak dengan dua sisi melengkung di kanan dan kiri. Dilengkapi dengan gagang dan sarung kayu. Bentuknya menunjukkan fungsi untuk pertarungan jarak dekat atau penggunaan upacara, tergantung pada konteks sejarah dan tradisi."
            },
          ]
        }
      ]
    },
    venue:{
      hero: {
        title: ['Venue Rental Di', 'Tembi Historical Home'],
        subtitle: 'Ruang elegan untuk momen berkesan',
        quote: 'Booking mudah, acara lancar, suasana hangat',
        desc: 'Tembi Rumah Budaya menyediakan pilihan venue bergaya Jawa untuk berbagai acara. Mulai dari pertemuan kecil sampai perayaan besar. cKamu menikmati suasana tenang, fasilitas lengkap, dan kehangatan budaya Jawa.',
        buttonText: 'Pesan Sekarang'
      },
      features: {
        title: 'Pilih Venue yang Tepat untuk Acara Anda',
        desc: 'Dari Pendopo tradisional sampai taman yang intim. Setiap venue di Tembi Rumah Budaya punya karakter unik dengan fasilitas lengkap untuk acara spesial Kamu.',
        item: [
          {
            title: 'Arsitektur Tradisional',
            description: 'Desain Jawa autentik dengan fasilitas modern'
          },
          {
            title: 'Kapasitas Fleksibel',
            description: 'Mulai dari 20 orang sampai 150 orang'
          },
          {
            title: 'Nuansa Alam',
            description: 'Taman indah dan area terbuka yang nyaman'
          }
        ]
      },
      gallery: {
        title: 'Galeri Venue',
        desc: 'Pilih ruang terbaik untuk acara Kamu dari pilihan venue bergaya Jawa yang nyaman dan lengkap di Tembi Rumah Budaya'
      },
      contact: {
        title: [
          'Siap mengadakan acara anda di',
          'Tembi Rumah Budaya?'
        ],
        desc: 'Kami bantu anda memilih venue terbaik untuk momen spesial Kamu. Tim berpengalaman kami siap mendampingi agar acara Kamu berjalan lancar dan penuh kenangan di ruang tradisional yang memikat.',
        button: 'Hubingi Tim Kami',
        item: [
          { title: 'Respons Cepat', desc: 'Respons cepat dalam 2 jam' },
          { title: 'Layanan Pribadi', desc: 'Pendampingan personal dari event coordinator' },
          { title: 'Kualitas Terjamin', desc: 'Kualitas layanan terjamin 100 persen' }
        ]
      },
      items: [
        {
          slug: "pendopo-yudonegaran",
          title: "Pendopo Yudonegaran",
          heroDescription: [
            "Pendopo Yudonegaran adalah pusat Tembi rumah budaya. Paviliun Jawa megah yang dibuat sepenuhnya dari kayu jati. Venue ini menghadirkan keindahan dan nilai arsitektur tradisional.",
            "Desain terbuka, pilar besar, dan langit-langit tinggi memberi kesan elegan dan hangat. Pilihan tepat untuk berbagai acara yang ingin meninggalkan kesan mendalam.",
          ],
          shortDescription: "Pendopo utama dengan arsitektur Jawa klasik. Langit tinggi dan pilar kayu yang kokoh menciptakan suasana megah dan hangat.",
          longDescription: [
            "Pendopo Yudonegaran adalah paviliun tradisional Jawa yang megah berbahan kayu jati. Suasananya terbuka dan menenangkan untuk berbagai jenis acara. Cocok untuk pernikahan, acara perusahaan, atau pertunjukan budaya. Venue ini menghadirkan perpaduan arsitektur klasik dengan kenyamanan modern.",
            "Tiang kayu yang tinggi dan atap joglo menciptakan nuansa Jawa yang kuat. Desain terbuka dan sirkulasi udara alami menjadikannya sesuai untuk acara kecil atau perayaan besar."
          ],
          heroImage: "/images/venue/pendopo/pendopo1.webp",
          galleryImages: ["/images/venue/pendopo/pendopo2.webp", "/images/venue/pendopo/pendopo3.webp", "/images/venue/pendopo/pendopo1.webp"],
          eventGalleryImages: ["/images/venue/pendopo/pendopo4.webp", "/images/venue/pendopo/pendopo5.webp", "/images/venue/pendopo/pendopo6.webp", "/images/venue/pendopo/pendopo7.webp", "/images/venue/pendopo/pendopo1.webp", "/images/venue/pendopo/pendopo2.webp"],
          basePrice: 1800000,
          basePriceString: "Rp 1.800.000",
          priceDetail: "(2 jam)",
          extraPriceString: "Rp 875.000/jam",
          capacity: "Hingga 150 tamu",
          facilities: ["80 Kursi", "Sound System", "Toilet", "Area Parkir", "Kebersihan"],
          bestFor: "Pernikahan, Pertemuan"
        },
        {
          slug: "amphiteater-notoprajan",
          title: "Amphiteater Notoprajan",
          heroDescription: [
            "Amphitheater Notoprajan menghadirkan ruang terbuka yang dikelilingi taman hijau. Cocok untuk pertunjukan, pertemuan komunitas, dan acara kreatif. Desain setengah lingkaran memberi suasana panggung alami yang membuat penonton lebih terhubung dengan setiap momen acara.", 
          ],
          shortDescription: "Area ampiteater alami. Cocok untuk pertunjukan, presentasi, dan perayaan outdoor.",
          longDescription: [
            "Amphitheater Notoprajan menghadirkan suasana ruang terbuka yang dikelilingi taman hijau. Cocok untuk pertunjukan, acara komunitas, dan kegiatan kreatif. Desain setengah lingkaran memberi pengalaman panggung alami yang membuat penonton lebih terhubung dengan setiap momen acara.",
            "Pilar kayu dan arsitektur tradisional menciptakan nuansa Jawa yang kuat. Ruang terbuka dan sirkulasi udara yang baik membuat venue ini ideal untuk acara kecil maupun perayaan skala lebih besar."
          ],
          heroImage: "/images/venue/amphiteater/amphiteater1.webp",
          galleryImages: ["/images/venue/amphiteater/amphiteater2.webp", "/images/venue/amphiteater/amphiteater3.webp", "/images/venue/amphiteater/amphiteater4.webp"],
          eventGalleryImages: ["/images/venue/amphiteater/amphiteater5.webp", "/images/venue/amphiteater/amphiteater6.webp", "/images/venue/amphiteater/amphiteater7.webp", "/images/venue/amphiteater/amphiteater8.webp", "/images/venue/amphiteater/amphiteater9.webp", "/images/venue/amphiteater/amphiteater10.webp"],
          basePrice: 1500000,
          basePriceString: "Rp 1.500.000",
          priceDetail: "(2 jam)",
          extraPriceString: "Rp 700.000/jam",
          capacity: "Hingga 100 tamu",
          facilities: ["50 Kursi", "Sound System", "Toilet", "Area Parkir", "Kebersihan"],
          bestFor: "Pernikahan, Pertemuan"
        },
        {
          slug: "bale-madyosuro",
          title: "Bale Madyosuro",
          heroDescription: [
            "Bale Madyosuro menghadirkan interior Jawa klasik dengan ukiran kayu dan lantai bermotif. Suasananya hangat dan tetap formal. Cocok untuk rapat, workshop, atau acara dengan jumlah tamu menengah.", 
          ],
          shortDescription: "Paviliun tradisional yang nyaman. Cocok untuk acara berkapasitas menengah dengan suasana Jawa yang autentik.",
          longDescription: [
            "Bale Madyosuro menyuguhkan interior Jawa klasik dengan ukiran kayu dan lantai bermotif. Suasananya hangat dan tetap formal untuk rapat, workshop, atau acara yang lebih intim. Venue ini memadukan tradisi dan fungsi modern sehingga menghadirkan nuansa elegan untuk setiap momen spesial anda.",
            "Pilar kayu yang tinggi dan atap joglo tradisional menghadirkan suasana Jawa yang autentik dengan fasilitas lengkap untuk kebutuhan acara masa kini. Sirkulasi udara alami dan desain yang terbuka membuatnya cocok untuk acara kecil maupun perayaan dalam jumlah lebih besar."
          ],
          heroImage: "/images/venue/madyosuro/madyosuro1.webp",
          galleryImages: ["/images/venue/madyosuro/madyosuro2.webp", "/images/venue/madyosuro/madyosuro3.webp", "/images/venue/madyosuro/madyosuro4.webp"],
          eventGalleryImages: ["/images/venue/madyosuro/madyosuro5.webp", "/images/venue/madyosuro/madyosuro6.webp", "/images/venue/madyosuro/madyosuro7.webp", "/images/venue/madyosuro/madyosuro8.webp", "/images/venue/madyosuro/madyosuro9.webp", "/images/venue/madyosuro/madyosuro10.webp"],
          basePrice: 750000,
          basePriceString: "Rp 750.000",
          priceDetail: "(2 jam)",
          extraPriceString: "Rp 350.000/jam",
          capacity: "Hingga 80 tamu",
          facilities: ["50 Kursi", "Sound System", "Toilet", "Area Parkir", "Kebersihan"],
          bestFor: "Pernikahan, Pertemuan"
        },
        {
          slug: "bale-mrican",
          title: "Bale Mrican",
          heroDescription: [
            "Bale Mrican menghadirkan ruang indoor yang nyaman dan tenang.  Cocok untuk meeting, workshop, atau acara privat berskala kecil. Interior minimalis dan tata ruang yang terbuka memberi fleksibilitas untuk penataan acara casual maupun formal.", 
          ],
          shortDescription: "Paviliun yang nyaman untuk acara berkapasitas kecil. Cocok untuk workshop dan perayaan personal.",
          longDescription: [
            "Bale Mrican menyediakan ruang indoor yang nyaman dan tenang. Cocok untuk meeting, workshop, atau acara privat berskala kecil. Interior minimalis dan layout terbuka membuat penataan ruang lebih fleksibel untuk acara casual maupun formal.",
            "Ruang ini menghadirkan suasana Jawa yang autentik dengan pilar kayu menjulang dan atap joglo khas. Sirkulasi udara alami dan desain terbuka membuatnya nyaman untuk acara kecil maupun perayaan yang lebih besar."
          ],
          heroImage: "/images/venue/mrican/mrican1.webp",
          galleryImages: ["/images/venue/mrican/mrican2.webp", "/images/venue/mrican/mrican3.webp", "/images/venue/mrican/mrican4.webp"],
          eventGalleryImages: ["/images/venue/mrican/mrican5.webp", "/images/venue/mrican/mrican6.webp", "/images/venue/mrican/mrican7.webp", "/images/venue/mrican/mrican8.webp", "/images/venue/mrican/mrican9.webp", "/images/venue/mrican/mrican10.webp"],
          basePrice: 600000,
          basePriceString: "Rp 600.000",
          priceDetail: "(2 jam)",
          extraPriceString: "Rp 250.000/jam",
          capacity: "Hingga 50 tamu",
          facilities: ["25 Kursi", "Sound System", "Toilet", "Area Parkir", "Kebersihan"],
          bestFor: "Pernikahan, Pertemuan"
        },
        {
          slug: "bale-sagan",
          title: "Bale Sagan",
          heroDescription: [
            "Bale Sagan merupakan pendapa kecil yang cocok untuk acara dengan peserta terbatas. Kamu bisa memakainya untuk diskusi kelompok, workshop seni, atau pertemuan santai. Desain Jawa yang sederhana menghadirkan suasana tenang dengan cahaya alami dan udara segar.", 
          ],
          shortDescription: "Venue paling privat untuk rapat kecil, kumpul keluarga, dan acara eksklusif anda.",
          longDescription: [
            "Bale Sagan adalah pendapa kecil yang nyaman untuk acara dengan peserta terbatas. Kamu bisa menggunakannya untuk diskusi kelompok, workshop seni, atau pertemuan santai. Desain Jawa yang sederhana memberi suasana tenang dengan cahaya alami dan udara segar.",
            "Pilar kayu yang menjulang dan atap joglo menjaga nuansa tradisional tetap terasa. Sirkulasi udara alami dan area terbuka membuat tempat ini nyaman untuk berbagai jenis acara, baik yang bersifat intim maupun lebih besar."
          ],
          heroImage: "/images/venue/sagan/sagan1.webp",
          galleryImages: ["/images/venue/sagan/sagan2.webp", "/images/venue/sagan/sagan3.webp", "/images/venue/sagan/sagan4.webp"],
          eventGalleryImages: ["/images/venue/sagan/sagan5.webp", "/images/venue/sagan/sagan6.webp", "/images/venue/sagan/sagan7.webp", "/images/venue/sagan/sagan8.webp", "/images/venue/sagan/sagan9.webp", "/images/venue/sagan/sagan10.webp"],
          basePrice: 350000,
          basePriceString: "Rp 350.000",
          priceDetail: "(2 jam)",
          extraPriceString: "Rp 150.000/jam",
          capacity: "Hingga 20 tamu",
          facilities: ["15 Kursi", "Sound System", "Toilet", "Area Parkir", "Kebersihan"],
          bestFor: "Pernikahan, Pertemuan"
        },
        {
          slug: "taman-bulus",
          title: "Taman Bulus (Outdoor Area)",
          heroDescription: [
            "Taman Bulus menghadirkan taman luar ruang yang hijau dan dikelilingi arsitektur tradisional. Tempat ini cocok untuk pernikahan outdoor, acara keluarga, dan kegiatan kreatif. Lanskap yang tenang memadukan alam dan budaya dalam satu suasana yang indah.", 
          ],
          shortDescription: "Area taman luar yang menyatukan Bale Inap dan Sentolo. Cocok untuk acara dengan suasana alam yang menyegarkan.",
          longDescription: [
            "Taman Bulus menghadirkan taman luar ruang yang hijau dan dikelilingi bangunan tradisional. Cocok untuk pernikahan outdoor, acara keluarga, dan kegiatan kreatif. Lanskap yang tenang memadukan suasana alam dan budaya dalam satu lokasi.",
            "Ruang terbuka dengan sirkulasi udara alami memberi kenyamanan untuk berbagai acara. Desainnya fleksibel untuk perayaan kecil maupun acara berskala lebih besar. Semua fasilitas tersedia agar Kamu bisa fokus menikmati momen bersama tamu."
          ],
          heroImage: "/images/venue/bulus/bulus1.webp",
          galleryImages: ["/images/venue/bulus/bulus2.webp", "/images/venue/bulus/bulus3.webp", "/images/venue/bulus/bulus4.webp"],
          eventGalleryImages: ["/images/venue/bulus/bulus5.webp", "/images/venue/bulus/bulus6.webp", "/images/venue/bulus/bulus7.webp", "/images/venue/bulus/bulus8.webp", "/images/venue/bulus/bulus9.webp", "/images/venue/bulus/bulus10.webp"],
          basePrice: 1200000,
          basePriceString: "Rp 1.200.000",
          priceDetail: "(2 jam)",
          extraPriceString: "Rp 550.000/jam",
          capacity: "Hingga 50 tamu",
          facilities: ["25 Kursi", "Sound System", "Toilet", "Area Parkir", "Kebersihan"],
          bestFor: "Pernikahan, Pertemuan"
        },
      ]
    },
    detailVenue:{
      intro: {
        title: 'Informasi Venue',
        cardTitle: 'Informasi Utama',
        item1: 'Kapasitas',
        item2: 'Cocok Untuk',
      },
      features: {
        title: 'Fasilitas Termasuk',
        subtitle: 'Semua kebutuhan acara sudah tersedia',
        item: [
          {
            title: 'Ruang Acara',
            desc: 'Bangunan tradisional bergaya Jawa dengan kayu jati asli'
          },
          {
            title: 'Kursi Gratis',
            desc: 'Kursi untuk hingga 50 tamu sudah termasuk'
          },
          {
            title: 'Sound System',
            desc: 'Peralatan suara portabel untuk pidato dan pengumuman'
          },
          {
            title: 'Fasilitas Toilet',
            desc: 'Kamar mandi bersih dan terawat'
          },
          {
            title: 'Layanan Kebersihan',
            desc: 'Tim kebersihan sebelum dan setelah acara'
          },
          {
            title: 'Area Parkir',
            desc: 'Tempat parkir luas untuk tamu'
          }
        ],
        addons: {
          title: 'Layanan Tambahan Opsional',
          item: [
            'Proyektor & layar',
            'Peningkatan sistem suara',
            'Layanan catering',
            'Dekorasi acara'
          ]
        }
      },
      gallery: {
        title: 'Galeri Acara',
        subtitle: 'Lihat berbagai momen indah yang berlangsung'
      },
      service: {
        title: 'Layanan dan Perlengkapan Tambahan',
        subtitle: 'Tingkatkan kenyamanan acara Kamu dengan pilihan layanan premium',
        table: {
          col1: 'Layanan',
          col2: 'Deskripsi',
          item: [
            {
              name: "Sound System Non-Portable",
              description: "Sistem audio berkualitas profesional lengkap dengan beberapa mikrofon",
            },
            {
              name: "Paket Sound Pernikahan",
              description: "Perlengkapan audio lengkap untuk akad dan resepsi",
            },
            {
              name: "Proyektor dan Layar",
              description: "Proyektor HD dengan layar besar untuk presentasi",
            },
            {
              name: "Kursi Tambahan",
              description: "Penambahan kursi di luar 80 kursi yang sudah tersedia",
            },
            {
              name: "Pencahayaan Tambahan",
              description: "Penataan lighting profesional untuk acara malam",
            },
            {
              name: "Paket Fotografi",
              description: "Layanan dokumentasi oleh fotografer profesional",
            }
          ],
          note: {
            title: 'Catatan Penting:',
            item: [
              'Catering dan dekorasi tersedia sesuai permintaan',
              'Makanan dari vendor luar dapat dikenakan biaya tambahan',
              'Harga dapat berubah dan belum termasuk pajak',
              'Konfirmasi pemesanan minimal 48 jam sebelum acara'
            ]
          }
        }
      }
    },
    house: {
      hero: {
        back: 'Kembali ke Koleksi',
        address: [
          'Beranda', 'Kamar & Akomodasi'
        ],
        title: 'Kamar & Akomodasi',
        desc: 'Rasakan kekayaan warisan budaya Jawa sambil menikmati kenyamanan modern dan keramahan tradisional. Setiap kamar menyimpan kisah tentang keahlian tangan Indonesia dan keanggunan yang tak lekang oleh waktu.',
        buttonText: 'Jelajahi Kamar',
        stats: [
          {num: '9', desc: 'Kategori Kamar'},
          {num: '98%', desc: 'Kepuasan Tamu'},
          {num: '24/7', desc: 'Pengalaman Budaya'}
        ]
      },
      room: {
        title: 'Koleksi Akomodasi Kami',
        desc: 'Temukan pilihan kamar dan suite kami yang dipilih dengan cermat, masing-masing dirancang untuk menghadirkan perpaduan unik antara budaya Indonesia dan fasilitas mewah modern.'
      },
      amenities: {
        title: 'Fasilitas & Layanan',
        desc: 'Setiap kamar menghadirkan kenyamanan dan kemudahan, diperkaya suasana budaya Indonesia yang autentik serta pelayanan hangat yang tulus.',
        item: [
          {
            title: "Kenyamanan Kamar",
            icon: "/images/icons/bed-green.png",
            items: [
              "Air conditioning",
              "Furnitur tradisional",
              "Ruang Tamu",
              "Tempat Tidur Tradisional",
              "Kamar mandi pribadi",
              "Perlengkapan mandi gratis",
            ],
          },
          {
            title: "Teknologi",
            icon: "/images/icons/wifi-green.png",
            items: [
              "WiFi Gratis",
              "Port pengisian daya",
            ],
          },
          {
            title: "Aktivitas Budaya",
            icon: "/images/icons/paint-green.png",
            items: [
              "Aktivitas Tradisional",
              "Pertunjukan Tradisional Musiman",
              "Galeri Seni",
              "Koleksi Pribadi",
              "Tur Pribadi Tembi",
              "Beragam Alat Musik",
              "Beragam Kelas Tradisional",
            ],
          },
          {
            title: "Kuliner & Kebugaran",
            icon: "/images/icons/food-green.png",
            items: [
              "Kuliner Tradisional",
              "Layanan Kamar",
              "Pijat Tradisional",
              "Tari Jawa Tradisional",
            ],
          },
        ]
      },
      additional: {
        title: 'Fasilitas Tambahan Rumah',
        item: [
          { name: "Kolam Renang", icon: "/images/icons/swim-green.png" },
          { name: "Spa & Kesehatan", icon: "/images/icons/flower-green.png"},
          { name: "Tur Taman", icon: "/images/icons/tree-green.png" },
        ]
      },
      featuredCard: {
        features: {
          wifi: "WiFi Gratis",
          guest: ['Hingga ', 'tamu']
        },
        buttonText: 'Lihat Detail'
      },
      standardCard: {
        features: {
          wifi: "WiFi Gratis",
          guest: 'tamu'
        },
        buttonText: 'Lihat Detail'
      },
      item: [
        {
          id: 1,
          badge: "Premium",
          slug: "ngadirojo-house",
          name: "Rumah Ngadirojo",
          tagline: "Rumah Limasan Jawa dengan pemandangan kolam renang dan sawah.",
          price: 547000,
          description: "Nikmati pengalaman menginap bernuansa Jawa yang bermakna di suite kami. Arsitektur joglo tradisional berpadu dengan teras taman pribadi dan layanan cultural concierge yang mendukung pengalaman budaya.",
          longDescription:[ 
            "Ngadirojo House adalah rumah limasan Jawa tradisional yang dibangun tahun 1946 dan dipindahkan dari Desa Bawak, Cawas, Klaten, Jawa Tengah, ke Tembi pada 2007. Rumah ini menggabungkan arsitektur Jawa dan suasana alami yang tenang. Tempat ini cocok untuk tamu yang mencari ketenangan dan budaya.",
            "Dengan luas 43,2 meter persegi, rumah ini memiliki WiFi gratis, AC, minibar, dan kamar mandi pribadi. Bagian yang menonjol ada pada pemandangannya. Teras depan menghadap taman hijau. Teras belakang langsung terhubung dengan kolam renang dan hamparan sawah luas.",
            "Nama Ngadirojo berasal dari sebuah daerah di Wonogiri, Jawa Tengah, tempat Bapak F. W. Santopratiknya tinggal antara tahun 1944 sampai 1946. Rumah ini melambangkan keharmonisan antara kenyamanan, keindahan alam, dan sejarah keluarga."
          ],
          imageUrl: "/images/rooms/ngadirojo/ngadirojo1.webp",
          galleryImages: [
            "/images/rooms/ngadirojo/ngadirojo2.webp",
            "/images/rooms/ngadirojo/ngadirojo3.webp",
            "/images/rooms/ngadirojo/ngadirojo4.webp",
            "/images/rooms/ngadirojo/ngadirojo.webp",
            "/images/rooms/ngadirojo/ngadirojo5.webp",
          ],
          details: { bed: "King Size Bed", guests: 2, size: "43,2 m²", view: "Pemandangan Kolam" },
          detailsIcons:"/images/icons/swim-white.png",
          amenities: ["WiFi Gratis", "Air Conditioning", "Kamar Mandi Pribadi", "Pemandangan Kolam", "Bar Mini", "Teras"],
          amenitiesIcons:"/images/icons/swim-white.png",
          policies: { checkIn: "15:00 WIB",  checkOut: "12:00 PM", 
          cancellation: ["Pembatalan Gratis Hingga 48 Jam Sebelumnya", "50% refund 24h before", "No refund same day"] 
          },
          houseRules: { smoking: false, pets: true, quietHours: "10 Malam" },
          rating: 4.9, 
          layoutType: 'featured'
        },
        {
          id: 2,
          badge: "Premium",
          slug: "polaman-house",
          name: "Rumah Polaman",
          tagline: "Rumah Limasan Jawa yang luas dengan pemandangan kolam renang dan sawah",
          price: 700000,
          description: "Rasakan ketenangan menginap bernuansa Jawa di suite dengan arsitektur joglo tradisional. Tersedia teras taman pribadi, pemandangan kolam, dan layanan cultural concierge yang personal.",
          longDescription:[ 
            "Polaman House adalah rumah limasan Jawa tradisional yang dibangun tahun 1948 dan dipindahkan dari Desa Bawak, Cawas, Klaten, ke Tembi pada 2007. Rumah ini memadukan kehangatan arsitektur Jawa dengan lanskap alami. Tempat ini cocok untuk pengalaman menginap yang autentik dan tenang.",
            "Dengan luas 63,13 meter persegi, rumah ini memiliki WiFi gratis, AC, minibar, kamar mandi pribadi, dan teras yang nyaman. Teras depan menghadap taman rindang. Teras belakang menghadap kolam renang dan sawah, memberi suasana alami yang menenangkan.",
            "Nama Polaman berasal dari sebuah daerah di Sedayu, Bantul, tempat Bapak F. W. Santopratiknya tinggal antara tahun 1929 sampai 1931. Rumah ini mencerminkan sejarah keluarga yang memadukan warisan budaya dan kenyamanan modern.",
          ],
          imageUrl: "/images/rooms/polaman/polaman1.webp",
          galleryImages: [
            "/images/rooms/polaman/polaman2.webp",
            "/images/rooms/polaman/polaman.webp",
            "/images/rooms/polaman/polaman3.webp",
            "/images/rooms/polaman/polaman4.webp",
            "/images/rooms/polaman/polaman5.webp",
          ],
          details: { bed: "King Size Bed", guests: 2, size: "63,13 m²", view: "Pemandangan Kolam" },
          detailsIcons:"/images/icons/swim-white.png",
          amenities: ["WiFi Gratis", "Air Conditioning", "Kamar Mandi Pribadi", "Pemandangan Kolam", "Bar Mini", "Teras"],
          amenitiesIcons:"/images/icons/swim-green.png",
          policies: { checkIn: "15:00 WIB", checkOut: "12:00 WIB", cancellation: ["Pembatalan Gratis Hingga 48 Jam Sebelumnya"] },
          houseRules: { smoking: false, pets: true, quietHours: "10 Malam" },
          rating: 4.9, 
          layoutType: 'featured'
        },
        {
          id: 3,
          badge: "Premium",
          slug: "adikarto-house",
          name: "Rumah Adikarto",
          tagline: "Ketenangan Rumah Limasan Jawa Klasik",
          price: 430000,
          description: "Nikmati suasana menginap yang tenang dengan sentuhan joglo. Suite ini dilengkapi teras taman pribadi, pemandangan taman yang menenangkan, serta dukungan cultural concierge.",
          longDescription:[ 
            "Adikarto House adalah rumah limasan Jawa tradisional yang menghadirkan kesejukan dan kenyamanan dalam suasana alami. Rumah ini dibangun tahun 1960 di Ngadirejo, Tepus, Gunung Kidul, lalu dipindahkan ke Tembi pada 2007 sebagai bagian dari upaya pelestarian budaya.",
            "Dengan luas 51,6 meter persegi, rumah ini dilengkapi WiFi gratis, AC, minibar, kamar mandi pribadi, dan teras pribadi yang menghadap taman. Suasana yang tenang membuat rumah ini cocok untuk tamu yang mencari ketenangan dengan sentuhan tradisi.",
            "Nama Adikarto berasal dari sebuah daerah di Kabupaten Kulon Progo, yang lebih dikenal sebagai Wates, tempat Bapak F. W. Santopratiknya tinggal antara tahun 1931–1942 dan 1949–1955. Rumah ini tidak hanya menawarkan kenyamanan, tetapi juga menjaga sejarah keluarga dan warisan budaya.",
          ],
          imageUrl: "/images/rooms/adikarto/adikarto1.webp",
          galleryImages: [
            "/images/rooms/adikarto/adikarto2.webp",
            "/images/rooms/adikarto/adikarto.webp",
            "/images/rooms/adikarto/adikarto3.webp",
            "/images/rooms/adikarto/adikarto4.webp",
            "/images/rooms/adikarto/adikarto5.webp",
          ],
          details: { bed: "King Size Bed", guests: 2, size: "51,6 m²", view: "Pemandangan Taman" },
          detailsIcons:"/images/icons/leaf-gray.png",
          amenities: ["WiFi Gratis", "Air Conditioning", "Kamar Mandi Pribadi", "Pemandangan Taman", "Bar Mini", "Teras"],
          amenitiesIcons:"/images/icons/leaf-green.png",
          policies: { checkIn: "15:00 WIB", checkOut: "12:00 WIB", cancellation: ["Pembatalan Gratis Hingga 48 Jam Sebelumnya"] },
          houseRules: { smoking: false, pets: true, quietHours: "10 Malam" },
          rating: 4.9, 
          layoutType: 'featured'
        },
        {
          id: 4,
          badge: "Premium",
          slug: "ganjuran-house",
          name: "Rumah Ganjuran",
          tagline: "Harmoni Tradisi Jawa dan Alam",
          price: 682000,
          description: "Suite luas dengan arsitektur Jawa tradisional dan pemandangan taman yang memukau. Dilengkapi furnitur jati autentik, fasilitas kamar mandi, serta fasilitas budaya premium untuk pengalaman warisan yang mendalam.",
          longDescription:[ 
            "Ganjuran House adalah rumah limasan tradisional yang dibangun tahun 1939 dan dipindahkan dari Dusun Jepitu, Tepus, Gunung Kidul, ke Tembi pada 2007. Dengan arsitektur Jawa yang autentik, rumah ini menawarkan pengalaman menginap yang tenang dan dekat dengan warisan budaya.",
            "Dengan luas 68,15 meter persegi, rumah ini dilengkapi WiFi gratis, AC, minibar, kamar mandi pribadi, dan teras pribadi yang menghadap taman. Perpaduan kenyamanan modern dan suasana alami membuat tempat ini cocok untuk relaksasi atau menghabiskan waktu bersama orang terdekat.",
            "Nama Ganjuran diambil dari sebuah daerah di Kabupaten Bantul, tempat Bapak F. W. Santopratiknya tinggal sekitar tahun 1929. Rumah ini tidak hanya menawarkan kenyamanan, tetapi juga membawa hubungan sejarah dan kedekatan emosional dengan warisan keluarga.",
          ],
          imageUrl: "/images/rooms/ganjuran/ganjuran1.webp",
          galleryImages: [
            "/images/rooms/ganjuran/ganjuran2.webp",
            "/images/rooms/ganjuran/ganjuran3.webp",
            "/images/rooms/ganjuran/ganjuran4.webp",
            "/images/rooms/ganjuran/ganjuran5.webp",
            "/images/rooms/ganjuran/ganjuran6.webp",
          ],
          details: { bed: "King Size Bed", guests: 3, size: "68,15 m²", view: "Pemandangan Taman" },
          detailsIcons:"/images/icons/leaf-green.png",
          amenities: ["WiFi Gratis", "Air Conditioning", "Kamar Mandi Pribadi", "Pemandangan Taman", "Bar Mini", "Teras"],
          amenitiesIcons:"/images/icons/leaf-green.png",
          policies: { checkIn: "15:00 WIB", checkOut: "12:00 WIB", cancellation: ["Pembatalan Gratis Hingga 48 Jam Sebelumnya"] },
          houseRules: { smoking: false, pets: true, quietHours: "10 Malam" },
          rating: 4.9, 
          layoutType: 'standard'
        },
        {
          id: 5,
          badge: "Best Value",
          slug: "badegan-house",
          name: "Rumah Badegan",
          tagline: "Sentuhan Tradisi Sunda Di Alam Yogyakarta",
          price: 430000,
          description: "Kamar yang nyaman dan ramah keluarga, Sempurna bagi keluarga yang ingin merasakan pengalaman budaya secara mendalam dengan tetap menikmati kenyamanan dan kemudahan modern.",
          longDescription:[ 
            "Menginap di Badegan House bukan sekadar beristirahat. Kamu merasakan kehangatan rumah kayu tradisional Sunda yang penuh makna. Rumah panggung ini dibangun tahun 1954 di Sumedang, Jawa Barat, lalu dipindahkan ke Tembi pada 2006.",
            "Dengan luas 46 meter persegi, Badegan House menyediakan kenyamanan modern seperti WiFi gratis, AC, minibar, dan kamar mandi pribadi. Tamu bisa menikmati waktu santai di teras yang menghadap taman hijau. Suasananya tenang dan cocok untuk melepas penat sambil menyatu dengan alam.",
            "Nama Badegan berasal dari sebuah desa di Kabupaten Bantul, tempat Bapak F. W. Santopratiknya, ayah dari Bapak P. Swantoro, tinggal mulai tahun 1958. Setiap sudut rumah ini menyimpan cerita dan nilai budaya sehingga rumah ini terasa lebih dari sekadar tempat menginap.",
          ],
          imageUrl: "/images/rooms/badegan/badegan1.webp",
          galleryImages: [
            "/images/rooms/badegan/badegan2.webp",
            "/images/rooms/badegan/badegan3.webp",
            "/images/rooms/badegan/badegan4.webp",
            "/images/rooms/badegan/badegan5.webp",
            "/images/rooms/badegan/badegan6.webp",
          ],
          details: { bed: "King Size Bed", guests: 4, size: "46 m²", view: "Pemandangan Taman" },
          detailsIcons:"/images/icons/leaf-green.png",
          amenities: ["WiFi Gratis", "Air Conditioning", "Kamar Mandi Pribadi", "Pemandangan Taman", "Bar Mini", "Teras"],
          amenitiesIcons:"/images/icons/leaf-green.png",
          policies: { checkIn: "15:00 WIB", checkOut: "12:00 WIB", cancellation: ["Pembatalan Gratis Hingga 48 Jam Sebelumnya"] },
          houseRules: { smoking: false, pets: true, quietHours: "10 Malam" },
          rating: 4.9, 
          layoutType: 'standard'
        },
        {
          id: 6,
          badge: "Best Value",
          slug: "wuryantoro-house",
          name: "Rumah Wuryantoro",
          tagline: "Rumah Limasan Jawa di tengah ketenangan alam",
          price: 430000,
          description: "Akomodasi yang sederhana namun elegan dengan sentuhan budaya autentik dan elemen desain tradisional Indonesia. Ideal bagi pengalaman budaya asli dengan nilai yang luar biasa.",
          longDescription:[ 
            "Wuryantoro House adalah rumah limasan Jawa tradisional yang memadukan warisan budaya dan kenyamanan modern. Rumah ini dibangun tahun 1960 di Ngadirejo, Tepus, Gunung Kidul, lalu dipindahkan ke Tembi pada 2007.",
            "Dengan luas 40,5 meter persegi, rumah ini memiliki WiFi gratis, AC, minibar, kamar mandi pribadi, dan teras yang menghadap taman. Lingkungan yang tenang dan hijau membuat tempat ini cocok untuk relaksasi sambil menikmati budaya lokal.",
            "Nama Wuryantoro berasal dari sebuah daerah di Wonogiri, Jawa Tengah, tempat Bapak F. W. Santopratiknya tinggal antara tahun 1946 dan 1948. Setiap elemen rumah ini mencerminkan sejarah dan akar budaya sehingga menjadikannya lebih dari sekadar tempat menginap.",
          ],
          imageUrl: "/images/rooms/wuryantoro/wuryantoro1.webp",
          galleryImages: [
            "/images/rooms/wuryantoro/wuryantoro2.webp",
            "/images/rooms/wuryantoro/wuryantoro3.webp",
            "/images/rooms/wuryantoro/wuryantoro4.webp",
            "/images/rooms/wuryantoro/wuryantoro5.webp",
            "/images/rooms/wuryantoro/wuryantoro6.webp",
          ],
          details: { bed: "King Size Bed", guests: 3, size: "40,5 m²", view: "Pemandangan Taman" },
          detailsIcons:"/images/icons/leaf-green.png",
          amenities: ["WiFi Gratis", "Air Conditioning", "Kamar Mandi Pribadi", "Pemandangan Taman", "Bar Mini", "Teras"],
          amenitiesIcons:"/images/icons/leaf-green.png",
          policies: { checkIn: "15:00 WIB", checkOut: "12:00 WIB", cancellation: ["Pembatalan Gratis Hingga 48 Jam Sebelumnya"] },
          houseRules: { smoking: false, pets: true, quietHours: "10 Malam" },
          rating: 4.9, 
          layoutType: 'standard'
        },
        {
          id: 7,
          badge: "Premium",
          slug: "morangan-house",
          name: "Rumah Morangan",
          tagline: "Tiga Tingkat Kenyamanan dalam Arsitektur Tradisional",
          price: 970000,
          description: "Pondok berdiri sendiri yang menawan, terletak di tengah taman tropis kami yang rimbun. Sempurna untuk para pecinta alam yang mencari ketenangan dengan keramahan khas Indonesia.",
          longDescription:[ 
            "Morangan House adalah akomodasi tiga lantai yang unik, disusun dari tiga rumah tradisional Jawa yang berasal dari Tambak, Klaten (1936), Jepitu, Gunung Kidul (1939), dan Majasto, Sukoharjo (1952). Ketiganya dipindahkan dan disatukan di Tembi pada 2007, memadukan warisan budaya dan modern.",
            "Dengan luas 70,7 meter persegi, Morangan House memiliki dua kamar tidur. Masing-masing kamar memiliki kamar mandi pribadi. Lantai pertama berisi area duduk yang luas dan bathtub untuk relaksasi. Area rooftop memberi pemandangan ruang terbuka. Bagian depan rumah menghadap taman. Bagian belakang menghadap sawah. Sisi samping menghadap kolam renang.",
            "Nama Morangan berasal dari sebuah desa di Sleman, Yogyakarta, tempat Bapak F. W. Santopratiknya tinggal antara tahun 1942 dan 1944. Rumah ini melambangkan warisan keluarga yang dihadirkan kembali dalam pengalaman menginap modern dengan jiwa tradisional.",
          ],
          imageUrl: "/images/rooms/morangan/morangan1.webp",
          galleryImages: [
            "/images/rooms/morangan/morangan2.webp",
            "/images/rooms/morangan/morangan3.webp",
            "/images/rooms/morangan/morangan4.webp",
            "/images/rooms/morangan/morangan5.webp",
            "/images/rooms/morangan/morangan6.webp",
          ],
          details: { bed: "King Size Bed", guests: 4, size: "70,7 m²", view: "Pemandangan Kolam" },
          detailsIcons:"/images/icons/swim-green.png",
          amenities: ["WiFi Gratis", "Air Conditioning", "Kamar Mandi Pribadi", "Pemandangan Kolam", "Bar Mini", "Teras"],
          amenitiesIcons:"/images/icons/swim-green.png",
          policies: { checkIn: "15:00 WIB", checkOut: "12:00 WIB", cancellation: ["Pembatalan Gratis Hingga 48 Jam Sebelumnya"] },
          houseRules: { smoking: false, pets: true, quietHours: "10 Malam" },
          rating: 4.9, 
          layoutType: 'standard'
        },
        {
          id: 8,
          badge: "Premium",
          slug: "kriyan-lor-house",
          name: "Rumah Kriyan Lor",
          tagline: "Rumah Limasan Intim Bernuansa Tradisional Jawa",
          price: 430000,
          description: "Rumah Kriyan adalah rumah limasan tradisional tahun 1940 yang direlokasi ke Tembi pada 2009, menghadirkan dua unit cermin yang intim dengan kenyamanan modern, teras taman pribadi.",
          longDescription:[ 
            "Rumah Kriyan adalah rumah limasan tradisional yang dibangun pada sekitar tahun 1940 dan direlokasi dari Desa Paliyan, Wonosari, Gunung Kidul, ke kawasan Tembi pada tahun 2009. Awalnya merupakan satu rumah utuh, kemudian dimodifikasi dan dibagi menjadi dua bagian simetris—Kriyan Lor dan Kriyan Kidul—sehingga menghadirkan dua unit kamar dengan tata ruang yang sama namun berorientasi mirror. Setiap rumah memiliki luas 24 m², dirancang intim dan nyaman untuk pasangan ataupun tamu yang mencari suasana tenang dan privat.",
            "Dilengkapi fasilitas modern seperti Wi-Fi gratis, AC, minibar, dan kamar mandi pribadi, Rumah Kriyan memadukan kesederhanaan tradisional dengan kenyamanan masa kini. Teras pribadi menghadap taman hijau yang sejuk, menciptakan suasana damai untuk bersantai di tengah nuansa pedesaan Jawa.",
            "Nama “Kriyan” berasal dari sebuah daerah di Keputran Jeron Beteng, Kraton Yogyakarta—tempat tinggal Bapak R. M. Koesbandarum Sasmi, ayahanda Ibu R. A. Koeswardiyah Swantoro, pada sekitar tahun 1940 hingga 1960. Rumah ini menjadi simbol kedekatan keluarga dengan sejarah dan budaya Jawa.",
          ],
          imageUrl: "/images/rooms/kriyan/kriyan2.webp",
          galleryImages: [
            "/images/rooms/kriyan/kriyan1.webp",
            "/images/rooms/kriyan/kriyan3.webp",
            "/images/rooms/kriyan/kriyan4.webp",
            "/images/rooms/kriyan/kriyan5.webp",
            "/images/rooms/kriyan/kriyan6.webp",
          ],
          details: { bed: "King Size Bed", guests: 2, size: "24 m²", view: "Pemandangan Sawah" },
          detailsIcons:"/images/icons/leaf-green.png",
          amenities: ["WiFi Gratis", "Air Conditioning", "Kamar Mandi Pribadi", "Pemandangan Sawah", "Bar Mini", "Teras"],
          amenitiesIcons:"/images/icons/leaf-green.png",
          policies: { checkIn: "15:00 WIB", checkOut: "12:00 WIB", cancellation: ["Pembatalan Gratis Hingga 48 Jam Sebelumnya"] },
          houseRules: { smoking: false, pets: true, quietHours: "10 Malam" },
          rating: 4.9, 
          layoutType: 'standard'
        },
        {
          id: 9,
          badge: "Premium",
          slug: "kriyan-kidul-house",
          name: "Rumah Kriyan Kidul",
          tagline: "Rumah Limasan Intim Bernuansa Tradisional Jawa",
          price: 430000,
          description: "Rumah Kriyan adalah rumah limasan tradisional tahun 1940 yang direlokasi ke Tembi pada 2009, menghadirkan dua unit cermin yang intim dengan kenyamanan modern, teras taman pribadi.",
          longDescription:[ 
            "Rumah Kriyan adalah rumah limasan tradisional yang dibangun pada sekitar tahun 1940 dan direlokasi dari Desa Paliyan, Wonosari, Gunung Kidul, ke kawasan Tembi pada tahun 2009. Awalnya merupakan satu rumah utuh, kemudian dimodifikasi dan dibagi menjadi dua bagian simetris—Kriyan Lor dan Kriyan Kidul—sehingga menghadirkan dua unit kamar dengan tata ruang yang sama namun berorientasi mirror. Setiap rumah memiliki luas 24 m², dirancang intim dan nyaman untuk pasangan ataupun tamu yang mencari suasana tenang dan privat.",
            "Dilengkapi fasilitas modern seperti Wi-Fi gratis, AC, minibar, dan kamar mandi pribadi, Rumah Kriyan memadukan kesederhanaan tradisional dengan kenyamanan masa kini. Teras pribadi menghadap taman hijau yang sejuk, menciptakan suasana damai untuk bersantai di tengah nuansa pedesaan Jawa.",
            "Nama “Kriyan” berasal dari sebuah daerah di Keputran Jeron Beteng, Kraton Yogyakarta—tempat tinggal Bapak R. M. Koesbandarum Sasmi, ayahanda Ibu R. A. Koeswardiyah Swantoro, pada sekitar tahun 1940 hingga 1960. Rumah ini menjadi simbol kedekatan keluarga dengan sejarah dan budaya Jawa.",
          ],
          imageUrl: "/images/rooms/kriyan/kriyan1.webp",
          galleryImages: [
            "/images/rooms/kriyan/kriyan2.webp",
            "/images/rooms/kriyan/kriyan3.webp",
            "/images/rooms/kriyan/kriyan4.webp",
            "/images/rooms/kriyan/kriyan5.webp",
            "/images/rooms/kriyan/kriyan6.webp",
          ],
          details: { bed: "King Size Bed", guests: 2, size: "24 m²", view: "Pemandangan Sawah" },
          detailsIcons:"/images/icons/leaf-green.png",
          amenities: ["WiFi Gratis", "Air Conditioning", "Kamar Mandi Pribadi", "Pemandangan Sawah", "Bar Mini", "Teras"],
          amenitiesIcons:"/images/icons/leaf-green.png",
          policies: { checkIn: "15:00 WIB", checkOut: "12:00 WIB", cancellation: ["Pembatalan Gratis Hingga 48 Jam Sebelumnya"] },
          houseRules: { smoking: false, pets: true, quietHours: "10 Malam" },
          rating: 4.9, 
          layoutType: 'standard'
        },
      ]
    },
    houseDetail:{
      back: 'Kembali ke Koleksi',
      guest: 'Tamu',
      night: 'per malam',
      facilities: 'Fasilitas dan Sarana',
      gallery: 'Galeri Ruangan',
      viewall: 'Lihat semua foto',
      booking: 'Pesan Sekarang',
      policy: {
        title: 'Kebijakan & Informasi Kamar',
        id: 'Identitas yang sah',
        cancelPolicy: 'Kebijakan Pembatalan',
        cancel: 'Pembatalan gratis 48 jam sebelumnya',
        refund: 'Pengembalian dana 50% 24 jam sebelumnya',
        sameday: 'Tidak ada pengembalian dana di hari yang sama.',
      },
      houseRules: {
        title: 'Peraturan Rumah',
        smokingtrue: 'Merokok diperbolehkan',
        smokingfalse: 'Merokok tidak diperbolehkan',
        petstrue: 'Hewan peliharaan diperbolehkan',
        petsfalse: 'Hewan peliharaan tidak diperbolehkan',
        quiet: 'Jam tenang pukul 10 malam',
      }
    }
  },
};

// 3. Buat Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 4. Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 5. Custom Hook untuk mempermudah penggunaan
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
