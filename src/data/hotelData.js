// Aurelia Grand Resort - Comprehensive Realistic Mock Data

export const HOTEL_INFO = {
  name: "AURELIA GRAND RESORT",
  shortName: "Aurelia",
  tagline: "Where Luxury Meets the Horizon",
  stars: 5,
  rating: 4.98,
  reviewCount: 1420,
  address: "Galle Road, Colombo 4, Sri Lanka",
  destination: "French Riviera & Côte d'Azur, France",
  phone: "+33 (0)4 93 88 00 24",
  conciergePhone: "+33 (0)4 93 88 00 99",
  email: "reservations@aureliagrandresort.com",
  conciergeEmail: "concierge@aureliagrandresort.com",
  whatsapp: "+33 6 40 12 34 56",
  checkInTime: "15:00",
  checkOutTime: "12:00",
  coordinates: { lat: 43.518, lng: 6.942 },
  airportDistance: "28 km from Nice Côte d'Azur Airport (NCE) — 25 min via resort private chauffeur or 7 min via private helicopter",
  helipad: "Resort Private Helipad (ICAO: LFAG-A)",
  yearFounded: 1934,
};

export const CURRENCIES = {
  USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
  JPY: { symbol: "¥", rate: 155.0, label: "JPY (¥)" },
  AUD: { symbol: "A$", rate: 1.52, label: "AUD (A$)" },
  AED: { symbol: "AED ", rate: 3.67, label: "AED (د.إ)" },
};

export const LANGUAGES = [
  { code: "EN", name: "English", flag: "🇬🇧" },
  { code: "FR", name: "Français", flag: "🇫🇷" },
  { code: "DE", name: "Deutsch", flag: "🇩🇪" },
  { code: "ES", name: "Español", flag: "🇪🇸" },
  { code: "IT", name: "Italiano", flag: "🇮🇹" },
  { code: "JA", name: "日本語", flag: "🇯🇵" },
  { code: "AR", name: "العربية", flag: "🇦🇪" },
];

export const ROOMS = [
  {
    id: "deluxe-room",
    name: "Deluxe Azure Room",
    category: "Deluxe",
    tagline: "Sophisticated sanctuary with landscaped garden & courtyard views",
    price: 180,
    originalPrice: 220,
    rating: 4.92,
    reviewsCount: 312,
    sizeSqM: 52,
    sizeSqFt: 560,
    maxGuests: 2,
    bed: "1 King Bed or 2 Twin Beds",
    view: "Private Mediterranean Garden",
    floor: "Floors 1 - 3",
    stock: 5,
    popularBadge: "Best Value",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Immerse yourself in understated elegance. The Deluxe Azure Room features bespoke Italian oak furnishings, Egyptian cotton linens with 600-thread count, an Italian marble bathroom with soaking tub and walk-in rain shower, and a private sunlit terrace overlooking our fragrant citrus gardens.",
    features: [
      "Private furnished terrace with garden panorama",
      "Carrara marble bathroom with deep freestanding tub",
      "Diptyque Paris luxury bath amenities",
      "Subtle acoustic insulation for tranquil sleep",
      "Nespresso Vertuo & selection of artisanal Mariage Frères teas"
    ],
    amenities: [
      "High-Speed Wi-Fi 6", "55-inch Bang & Olufsen 4K Smart TV", "Custom Climate Control",
      "Subtle Ambient Mood Lighting", "Integrated Marshall Bluetooth Sound", "In-Room Gourmet Mini Bar",
      "Laptop-sized Digital Safe", "Twice-daily Housekeeping & Turndown", "Plush Terry Cloth Bathrobes & Slippers",
      "24-Hour In-Room Dining", "Dyson Supersonic Hairdryer", "Express Ironing & Laundry"
    ],
    includedServices: ["Welcome champagne upon arrival", "Complimentary high-speed Wi-Fi", "Access to infinity pools & private beach club", "Daily morning yoga session"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in. Non-refundable within 48 hours.",
    breakfastAvailable: true,
    breakfastPrice: 42,
  },
  {
    id: "ocean-view-room",
    name: "Premium Ocean View Suite",
    category: "Ocean View",
    tagline: "Panoramic sea horizon with private glass balcony & sunset vistas",
    price: 240,
    originalPrice: 295,
    rating: 4.96,
    reviewsCount: 428,
    sizeSqM: 68,
    sizeSqFt: 730,
    maxGuests: 3,
    bed: "1 California King Bed",
    view: "Unobstructed Mediterranean Ocean View",
    floor: "Floors 4 - 7",
    stock: 3,
    popularBadge: "Popular Choice",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Wake to the sparkling Azure horizon from the comfort of your California King bed. Floor-to-ceiling glass doors slide open seamlessly onto a spacious private teak terrace, complemented by an open-concept lounge, walk-in dressing room, and dual-vanity marble bath.",
    features: [
      "Expansive teak balcony with sun loungers facing the sea",
      "Freestanding stone soaking tub positioned by panoramic window",
      "Dedicated lounge seating area with bespoke upholstery",
      "Walk-in dressing room with personal garment steamer",
      "Complimentary premier wine selection upon check-in"
    ],
    amenities: [
      "High-Speed Wi-Fi 6", "65-inch OLED 4K Smart TV", "Custom Climate Control",
      "Acoustic Glass Soundproofing", "Sonos Sound System", "Curated Wine Refrigerator & Bar",
      "Biometric Safe", "Diptyque Bath Collection", "Twice-daily Housekeeping with Pillow Mist",
      "24-Hour Room Service", "Dyson Supersonic & Airwrap", "Pillow Menu (6 varieties)"
    ],
    includedServices: ["Artisanal welcome treats & champagne", "Private beach cabana reservation", "Complimentary valet parking", "Unlimited spa thermal suite access"],
    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
    breakfastAvailable: true,
    breakfastPrice: 42,
  },
  {
    id: "executive-suite",
    name: "Executive Azure Suite",
    category: "Executive Suite",
    tagline: "Sophisticated corner suite with separate salon and executive lounge access",
    price: 360,
    originalPrice: 430,
    rating: 4.98,
    reviewsCount: 219,
    sizeSqM: 95,
    sizeSqFt: 1022,
    maxGuests: 3,
    bed: "1 Master King Bed + Queen Daybed",
    view: "Dual-aspect Sea & Coastal Cliff Panorama",
    floor: "Floors 6 - 8",
    stock: 2,
    popularBadge: "Limited Availability",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "Designed for discerning travellers and executive stays, this dual-aspect corner suite features a separate lavish living room, private dining table for four, executive workspace with fast connectivity, and priority access to the Aurelia Club Lounge.",
    features: [
      "Dedicated living salon separated by artisanal pocket doors",
      "Four-person dining and conference table with ocean backdrop",
      "Private Club Lounge access with all-day champagne & canapés",
      "Expansive wraparound balcony with 180-degree coastal vista",
      "En-suite marble powder room for visiting guests"
    ],
    amenities: [
      "Complimentary High-Speed Fiber", "Two 65-inch 4K OLED TVs", "Dedicated Butler Call Button",
      "Bespoke Cocktail Trolley with Mixologist Bar", "Dressing Room with Italian Leather Wardrobes",
      "Freestanding Jacuzzi Bath & Rainforest Steam Shower", "Le Labo Santal 26 Amenities",
      "Executive Desk with Multi-port Hub", "Personalized Luggage Unpacking on Request"
    ],
    includedServices: ["Club Lounge privileges", "Full Gourmet Champagne Breakfast included", "Roundtrip Airport Chauffeur in Mercedes S-Class", "Pressing of 3 garments daily"],
    cancellationPolicy: "Free cancellation up to 72 hours before arrival.",
    breakfastAvailable: true,
    breakfastPrice: 0, // Included
  },
  {
    id: "family-suite",
    name: "Family Royal Haven Suite",
    category: "Family Suite",
    tagline: "Two interconnecting bedrooms, private children's play den, and garden terrace",
    price: 420,
    originalPrice: 510,
    rating: 4.97,
    reviewsCount: 184,
    sizeSqM: 120,
    sizeSqFt: 1290,
    maxGuests: 5,
    bed: "1 King Master + 2 Twin Beds + Cot",
    view: "Lush Riviera Gardens & Sparking Bay",
    floor: "Floors 1 - 2 (Direct Lawn Access)",
    stock: 2,
    popularBadge: "Perfect for Families",
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "The ideal sanctuary for family retreats. Features two generous interconnecting en-suite bedrooms, a family living lounge, a custom-designed children's play corner with books and games, and a private enclosed garden patio with direct access to the resort lawn.",
    features: [
      "Two connecting en-suite master bedrooms with sound barrier doors",
      "Child-safe private garden terrace with outdoor lounge set",
      "Baby & child concierge kit (Stokke cots, bottle warmers, bath toys)",
      "Complimentary access to Aurelia Little Explorers Kids Club (ages 3-12)",
      "Complimentary 3 hours babysitting service per stay"
    ],
    amenities: [
      "Ultra-Fast Wi-Fi", "Three Smart 4K TVs with Kids Streaming", "Family Pantry & Stocked Snack Drawer",
      "Microwave & Refrigerator", "Two Full Marble Bathrooms with Tubs", "Children's Robes & Slippers",
      "Monitored Baby Listening Service", "Double Vanity & Deep Soaking Tubs"
    ],
    includedServices: ["Daily family breakfast buffet", "Kids Club access & daily activities", "Ice cream voucher for each child daily", "Complimentary family beach cabana"],
    cancellationPolicy: "Free cancellation up to 72 hours prior to arrival.",
    breakfastAvailable: true,
    breakfastPrice: 0,
  },
  {
    id: "presidential-suite",
    name: "Presidential Horizon Penthouse",
    category: "Presidential Suite",
    tagline: "Top-floor penthouse with private heated plunge pool and personal butler",
    price: 850,
    originalPrice: 1050,
    rating: 5.0,
    reviewsCount: 96,
    sizeSqM: 210,
    sizeSqFt: 2260,
    maxGuests: 4,
    bed: "2 King Master Suites",
    view: "360-Degree Horizon Sea & Estérel Mountains",
    floor: "Top Floor (Penthouse Floor 9)",
    stock: 1,
    popularBadge: "Ultimate Luxury",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "The crown jewel of Aurelia Grand Resort. Spanning the entire top floor, this palace in the sky offers a private heated rooftop infinity plunge pool, grand salon with Steinway baby grand piano, private chef's pantry, dining room for eight, and dedicated 24-hour butler.",
    features: [
      "Private heated rooftop plunge pool overlooking the Mediterranean",
      "Dedicated 24-hour British Butler Guild trained butler",
      "Private in-suite cocktail bar & walk-in wine cellar (Grand Cru selections)",
      "Master bath with Swedish dry cedar sauna & chromotherapy jacuzzi",
      "Direct private keycard elevator access"
    ],
    amenities: [
      "Private Rooftop Infinity Plunge Pool", "Steinway Baby Grand Piano", "8-Person Formal Dining Salon",
      "Private Cedar Wood Finnish Sauna", "B&O Beolab 50 Acoustic Audio Throughout", "Bulgari Thé Vert Bath Essentials",
      "Custom Monogrammed Egyptian Robes", "Unlimited Laundry & Pressing Service", "VIP Fast-track Airport Escort"
    ],
    includedServices: ["24-Hour Butler & Concierge", "Helicopter Transfer from Nice Airport included", "Daily à la carte Champagne Breakfast", "Unlimited Spa Treatments", "Private Sunset Yacht Cruise included (2 hours)"],
    cancellationPolicy: "Free cancellation up to 7 days prior to arrival.",
    breakfastAvailable: true,
    breakfastPrice: 0,
  },
  {
    id: "private-villa",
    name: "Aurelia Private Overwater Villa",
    category: "Private Villa",
    tagline: "Secluded cliffside estate with private infinity pool, beach cove, and personal chef",
    price: 1200,
    originalPrice: 1450,
    rating: 5.0,
    reviewsCount: 74,
    sizeSqM: 340,
    sizeSqFt: 3660,
    maxGuests: 6,
    bed: "3 King Bedrooms with En-suite Baths",
    view: "Private Cliff Cove & Endless Open Sea",
    floor: "Secluded Seaside Reserve (Ground Level)",
    stock: 1,
    popularBadge: "Exclusive Villa",
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80"
    ],
    description: "An enclave of pure serenity and absolute privacy. Nestled on its own rocky promontory with direct stone steps to a secluded private sea cove, the villa features a 15-meter heated infinity pool, full outdoor kitchen, landscaped botanical garden, private spa treatment pavilion, and dedicated private chef.",
    features: [
      "15m private heated infinity pool cantilevered over the water",
      "Direct private access to a tranquil secluded sea cove & jetty",
      "Personal Executive Chef & dedicated butler team included",
      "Outdoor dining pavilion with wood-fired oven & gas barbecue",
      "Private standalone open-air massage & meditation pavilion"
    ],
    amenities: [
      "Private Heated Infinity Pool & Sunken Firepit", "Full Professional Kitchen & Barbecue Pavilion",
      "Three Marble Bathrooms with Indoor/Outdoor Showers", "Private Golf Cart for Resort Exploration",
      "Extensive Wine Cellar with Sommelier Selection", "Acoustic Outdoor Sound by Sonance",
      "Dedicated Chauffeur & Range Rover at disposal"
    ],
    includedServices: ["Full Private Chef & Service Team", "Private Helicopter Transfers included", "Daily Bespoke Breakfast & Afternoon Tea", "Unlimited Watersports & Private Boat Use", "Daily Spa Treatments in Private Pavilion"],
    cancellationPolicy: "Free cancellation up to 14 days prior to arrival.",
    breakfastAvailable: true,
    breakfastPrice: 0,
  }
];

export const ADDONS = [
  {
    id: "addon-breakfast",
    name: "Gourmet Champagne Breakfast Buffet",
    category: "Dining",
    price: 42,
    perPerson: true,
    description: "Artisanal bakery, fresh organic juices, caviar station, eggs à la carte, and Bollinger Champagne.",
    icon: "Coffee"
  },
  {
    id: "addon-transfer",
    name: "Private Airport Chauffeur (Mercedes S-Class)",
    category: "Transport",
    price: 150,
    perPerson: false,
    description: "Round-trip luxury transfer between Nice Côte d'Azur Airport (NCE) and Aurelia Grand Resort.",
    icon: "Car"
  },
  {
    id: "addon-romantic",
    name: "Romantic Welcome & Floral Suite Styling",
    category: "Romance",
    price: 120,
    perPerson: false,
    description: "Chilled bottle of Dom Pérignon, fresh garden roses bouquet, hand-crafted chocolates, and silk turndown.",
    icon: "Heart"
  },
  {
    id: "addon-spa",
    name: "Couples Relaxing 60-Min Massage Package",
    category: "Wellness",
    price: 280,
    perPerson: false,
    description: "Full body aromatherapy massage in the ocean-view couples sanctuary with lavender herbal bath.",
    icon: "Sparkles"
  },
  {
    id: "addon-early-checkin",
    name: "Guaranteed Early Check-in (From 11:00 AM)",
    category: "Convenience",
    price: 65,
    perPerson: false,
    description: "Unpack and relax ahead of standard check-in time with welcome refreshment service.",
    icon: "Clock"
  },
  {
    id: "addon-late-checkout",
    name: "Guaranteed Late Check-out (Until 4:00 PM)",
    category: "Convenience",
    price: 85,
    perPerson: false,
    description: "Enjoy your last day by the pool without rushing. Relax in your room until late afternoon.",
    icon: "Moon"
  }
];

export const OFFERS = [
  {
    id: "stay-3-pay-2",
    title: "Stay 3 Nights, Pay for 2",
    tagline: "Prolong your Riviera escape with a complimentary third night",
    discount: "33% Off",
    category: "Long Stay",
    validDates: "Valid for stays until 30 November 2026",
    minNights: 3,
    promoCode: "STAY3PAY2",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "Every 3rd consecutive night complimentary",
      "Daily gourmet breakfast at Horizon Restaurant",
      "Complimentary access to Aurelia Spa thermal suites",
      "Welcome bottle of chilled Provençal Rosé"
    ],
    terms: "Subject to availability. Applies to Deluxe Rooms and Suites. Blackout dates may apply."
  },
  {
    id: "romantic-escape",
    title: "The Riviera Romantic Escape",
    tagline: "Unforgettable moments curated for discerning couples",
    discount: "Curated Package",
    category: "Couples",
    validDates: "Year-Round 2026",
    minNights: 2,
    promoCode: "AURELIAROMANCE",
    badge: "Couples Favorite",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "Upgrade to Ocean View Suite (subject to availability)",
      "Sunset champagne cruise aboard the resort yacht (2 hours)",
      "Three-course candlelit dinner for two at Ember Grill",
      "60-minute couples relaxing aromatherapy massage",
      "Daily breakfast in bed upon request"
    ],
    terms: "Requires minimum 2-night stay. Advance dining and yacht reservations recommended."
  },
  {
    id: "family-holiday",
    title: "Aurelia Family Heritage Sanctuary",
    tagline: "Unrivalled luxury designed for memories across generations",
    discount: "50% Off 2nd Room",
    category: "Families",
    validDates: "School holidays & summer 2026",
    minNights: 3,
    promoCode: "FAMILYHARMONY",
    badge: "Family Value",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "50% discount on second interconnecting room for children",
      "Full daily buffet breakfast for the whole family",
      "Complimentary Little Explorers Kids Club access",
      "Complimentary 3 hours babysitting service per stay",
      "Family cooking masterclass with Chef Marco"
    ],
    terms: "Valid for bookings with children under 16 years. Valid on Family Suites and connecting rooms."
  },
  {
    id: "wellness-retreat",
    title: "Holistic Coastal Wellness Retreat",
    tagline: "Restore vitality and inner balance with our medical & thermal spa",
    discount: "Spa Credit $300",
    category: "Wellness",
    validDates: "Valid through December 2026",
    minNights: 3,
    promoCode: "VITALITY",
    badge: "Holistic Health",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "$300 wellness spa credit per room per stay",
      "Comprehensive Ayurvedic consultation & biometric wellness scan",
      "Daily morning sunrise yoga and sound bath meditation",
      "Personalized detox nutritional menu curated by clinical herbalist",
      "Unlimited access to cryotherapy, halotherapy, and hydro-circuits"
    ],
    terms: "Minimum 3 nights stay. Spa credits non-transferable and cannot be refunded for cash."
  },
  {
    id: "epicurean-journey",
    title: "The Epicurean Michelin Journey",
    tagline: "A multi-sensory culinary celebration curated by our master chefs",
    discount: "Inclusive Dining",
    category: "Dining",
    validDates: "Thursday to Sunday stays 2026",
    minNights: 2,
    promoCode: "EPICUREAN",
    badge: "Gourmet Special",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "7-course tasting menu at Horizon with Grand Cru wine pairings",
      "Private wine cellar tasting with Head Sommelier Jean-Luc",
      "Artisanal caviar & champagne tasting in Azure Lounge",
      "Daily gourmet breakfast"
    ],
    terms: "Subject to restaurant opening days. Minimum 2 nights stay."
  },
  {
    id: "early-bird",
    title: "Early Bird Advance Luxury Booking",
    tagline: "Plan your Riviera getaway 60 days ahead and save 25%",
    discount: "25% Off Rate",
    category: "Early Bird",
    validDates: "Stays booked 60+ days in advance",
    minNights: 2,
    promoCode: "EARLYBIRD25",
    badge: "Best Rate",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "25% discount off Best Available Flexible Rate",
      "Daily breakfast included",
      "Priority room location selection",
      "Complimentary late checkout until 2:00 PM (subject to availability)"
    ],
    terms: "Non-refundable rate. Must be booked at least 60 days prior to arrival date."
  }
];

export const RESTAURANTS = [
  {
    id: "horizon",
    name: "Horizon Oceanfront Dining",
    tagline: "Michelin-caliber Mediterranean seafood bathed in coastal sunsets",
    cuisine: "Modern Mediterranean & Haute Sea Gastronomy",
    chef: "Executive Chef Marco Valerio (2 Michelin Stars)",
    hours: "Lunch: 12:00 – 15:00 | Dinner: 19:00 – 23:00",
    dressCode: "Smart Elegant (Jackets recommended for gentlemen at dinner)",
    location: "Level 1, Cliffside Ocean Terrace",
    rating: 4.98,
    reviewsCount: 520,
    priceRange: "$$$$",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Perched dramatically above the waves, Horizon transforms fresh catches from local Riviera fishermen and ingredients harvested from our rooftop organic garden into breathtaking culinary art. Floor-to-ceiling glass reveals sunset over the Mediterranean as master sommeliers pair each course with legendary vintages.",
    featuredDishes: [
      { name: "Mediterranean Blue Lobster", price: 68, description: "Poached in citrus emulsion, served with fennel pollen and sea foam." },
      { name: "Turbot en Croûte de Sel", price: 58, description: "Wild Atlantic turbot baked in Guérande sea salt, seasonal white asparagus." },
      { name: "Royal Ossetra Caviar Tartlet", price: 85, description: "Smoked crème fraîche, crispy buckwheat tartlet, gold leaf." }
    ],
    menu: {
      starters: [
        { name: "Gambero Rosso di Sanremo Carpaccio", price: 42, desc: "Taggiasca olive soil, finger lime, candied lemon zest" },
        { name: "Stracciatella & Heirloom Tomatoes", price: 34, desc: "Aged 25-year balsamic vinegar, wild oregano blossom" },
        { name: "Foie Gras Poêlé", price: 46, desc: "Caramelized Provençal figs, brioche feuilletée" }
      ],
      mains: [
        { name: "Line-Caught Mediterranean Sea Bass", price: 54, desc: "Artichoke barigoule, saffron broth, sea asparagus" },
        { name: "A5 Kagoshima Wagyu Striploin", price: 110, desc: "Truffled potato mousseline, Morel mushroom reduction" },
        { name: "Roasted Rack of Sisteron Lamb", price: 52, desc: "Herb crust, ratatouille confit, rosemary jus" },
        { name: "Carnaroli Risotto with Summer Truffle", price: 44, desc: "36-month Parmigiano Reggiano, brown butter emulsion" }
      ],
      desserts: [
        { name: "Menton Lemon Soufflé", price: 26, desc: "Warm citrus center, limoncello sorbet, verbena crisp" },
        { name: "Valrhona Guanaja 70% Sphere", price: 28, desc: "Hazelnut praline core, warm gold chocolate ganache" },
        { name: "Artisanal French & Italian Affiné Cheese Trolley", price: 32, desc: "Wild honeycomb, walnut sourdough" }
      ]
    }
  },
  {
    id: "ember",
    name: "Ember Prime Grill & Rotisserie",
    tagline: "Artisanal open fire grilling, aged prime steaks, and robust vintage wines",
    cuisine: "Contemporary Steakhouse & Wood-Fired Grill",
    chef: "Head Grill Master Lucas Vance",
    hours: "Dinner: 18:30 – 23:30 (Tuesday – Sunday)",
    dressCode: "Smart Casual",
    location: "Garden Pavilion, Lower Courtyard",
    rating: 4.94,
    reviewsCount: 384,
    priceRange: "$$$$",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An intoxicating sensory journey centered around glowing embers of olive and grapevine wood. Ember specializes in 45-day dry-aged cuts, rotisserie heritage poultry, and charred garden vegetables, paired with rich Bordeaux, Super Tuscans, and Napa Valley classics.",
    featuredDishes: [
      { name: "45-Day Dry-Aged Tomahawk (1.2kg)", price: 165, description: "Charred over olive wood, smoked bone marrow butter, chimichurri." },
      { name: "Spit-Roasted Bresse Chicken", price: 48, description: "Basted in lavender honey and thyme, roasted garlic jus." },
      { name: "Wood-Fired Wild Octopus", price: 38, description: "Smoked paprika glaze, saffron aioli, crushed fingerling potatoes." }
    ],
    menu: {
      starters: [
        { name: "Wood-Fired Bone Marrow", price: 28, desc: "Parsley shallot salad, grilled country sourdough" },
        { name: "Charred Spanish Octopus", price: 34, desc: "Pimentón de la Vera, saffron potato cream" },
        { name: "Ember Caesar Salad", price: 24, desc: "Charred baby gem, white anchovies, 36-month parmesan" }
      ],
      mains: [
        { name: "Prime Black Angus Ribeye 350g", price: 62, desc: "Bearnaise sauce, truffled shoestring fries" },
        { name: "Australian Wagyu Tenderloin MBS 7+", price: 88, desc: "Roasted shallot, green peppercorn cognac sauce" },
        { name: "Wood-Grilled Wild Turbot", price: 56, desc: "Lemon caper brown butter, roasted Romanesco" }
      ],
      desserts: [
        { name: "Smoked Bourbon Pecan Tart", price: 22, desc: "Smoked vanilla bean ice cream, salted caramel" },
        { name: "Campfire S'mores Soufflé", price: 24, desc: "Toasted marshmallow, dark chocolate crust" }
      ]
    }
  },
  {
    id: "terrace",
    name: "The Terrace Botanical Garden",
    tagline: "Al fresco dining under jasmine pergolas with artisanal breakfasts & afternoon tea",
    cuisine: "Provençal Farm-to-Table & Fine Pâtisserie",
    chef: "Pastry Chef Élodie Martin",
    hours: "Breakfast: 07:00 – 11:00 | Afternoon Tea: 14:30 – 17:30",
    dressCode: "Resort Casual",
    location: "Central Courtyard & Olive Grove",
    rating: 4.96,
    reviewsCount: 460,
    priceRange: "$$$",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Shaded by centuries-old olive trees and blooming jasmine, The Terrace offers our celebrated champagne breakfast buffet each morning, transitioning in the afternoon to a world-class Royal English & French High Tea with delicate pastries and finger sandwiches.",
    featuredDishes: [
      { name: "Royal Aurelia High Tea Tier", price: 55, description: "Tier of 6 savory bites, warm Devonshire scones with clotted cream, 5 signature mignardises." },
      { name: "Truffled Eggs Benedict", price: 32, description: "Poached bio farm eggs, brioche muffin, prosciutto di Parma, summer truffle hollandaise." }
    ],
    menu: {
      starters: [
        { name: "Summer Berry Açai Bowl", price: 22, desc: "Homemade almond granola, chia seeds, lavender honey" },
        { name: "Avocado & Smoked Scottish Salmon Tartine", price: 26, desc: "Seeded artisanal sourdough, Meyer lemon oil" }
      ],
      mains: [
        { name: "Aurelia Royal Omelette", price: 28, desc: "Morel mushrooms, fontina cheese, fresh garden herbs" },
        { name: "Brioche French Toast", price: 24, desc: "Caramelized peaches, Madagascar vanilla chantilly" }
      ],
      desserts: [
        { name: "Warm Plain & Raisin Scones", price: 20, desc: "Cornish clotted cream, wild strawberry jam" },
        { name: "Selection of 4 Fine French Macarons", price: 18, desc: "Pistachio, salted caramel, rose, dark chocolate" }
      ]
    }
  },
  {
    id: "azure-lounge",
    name: "Azure Sunset Lounge & Caviar Bar",
    tagline: "Craft mixology, live bossa nova and jazz, and vintage champagne by the glass",
    cuisine: "Bespoke Cocktails & Haute Tapas",
    chef: "Head Mixologist Julien Descombes",
    hours: "Open Daily: 17:00 – 02:00",
    dressCode: "Smart Chic",
    location: "Mezzanine Level, Glass Overhang",
    rating: 4.97,
    reviewsCount: 610,
    priceRange: "$$$$",
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The glamorous social heart of Aurelia. As the Mediterranean sun dips beneath the horizon, Azure Lounge comes alive with seductive jazz melodies, rare spirits, bespoke cocktails smoked with rosemary and cedar, and chilled caviar tins served on ice pedestals.",
    featuredDishes: [
      { name: "The Aurelia Golden Elixir (Signature Cocktail)", price: 28, description: "Rare 18-year Japanese whisky, Grand Marnier Cuvée du Centenaire, 24k edible gold dust, smoked orange peel." },
      { name: "Beluga Caviar Service 30g", price: 195, description: "Warm blinis, chopped egg yolks, chives, crème fraîche." }
    ],
    menu: {
      starters: [
        { name: "Wagyu Beef Tataki", price: 32, desc: "Ponzu jelly, crispy garlic, micro coriander" },
        { name: "Truffled Arancini Bites", price: 22, desc: "Taleggio cheese heart, black winter truffle dip" }
      ],
      mains: [
        { name: "Mini Lobster Brioche Sliders (3 pcs)", price: 38, desc: "Yuzu mayonnaise, chive butter, celery salt" },
        { name: "Ibérico Bellota Ham 100% Pata Negra", price: 44, desc: "Pan con tomate, Arbequina extra virgin olive oil" }
      ],
      desserts: [
        { name: "Gold Dust Dark Truffles", price: 20, desc: "Single-origin Venezuelan chocolate, Cognac infusion" }
      ]
    }
  },
  {
    id: "pool-bar",
    name: "Solarium Infinity Pool Bar & Cabanas",
    tagline: "Sun-drenched cocktails, crisp chilled rosé, and light poolside bites",
    cuisine: "Casual Mediterranean Beachside",
    chef: "Poolside Sous Chef Antoine",
    hours: "Open Daily: 10:00 – 19:00",
    dressCode: "Swimwear with cover-up",
    location: "Infinity Pool Edge & Private Beach Deck",
    rating: 4.91,
    reviewsCount: 320,
    priceRange: "$$",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Relax on custom sunken sunbeds or inside a shaded private cabana. Solarium serves refreshing cold-pressed mocktails, crisp Magnums of Whispering Angel Rosé, wood-fired flatbreads, and fresh oysters directly to your lounger.",
    featuredDishes: [
      { name: "Wild Fin Fish Ceviche", price: 26, description: "Tiger's milk, sweet potato crisp, avocado puree, red onion." },
      { name: "Provençal Flatbread Pizza", price: 24, description: "Burrata cheese, prosciutto di San Daniele, wild rocket, fig jam." }
    ],
    menu: {
      starters: [
        { name: "Chilled Watermelon & Feta Salad", price: 18, desc: "Fresh mint, toasted pine nuts, lime reduction" },
        { name: "Crispy Calamari Fritti", price: 24, desc: "Lemon caper tartar, grilled lime wedge" }
      ],
      mains: [
        { name: "Grilled Catch of the Day Tacos", price: 28, desc: "Chipotle crema, pickled slaw, coriander" },
        { name: "Aurelia Wagyu Smash Burger", price: 29, desc: "Aged cheddar, caramelized onions, brioche bun, hand-cut fries" }
      ],
      desserts: [
        { name: "Frozen Coconut Sorbet in Shell", price: 16, desc: "Roasted pineapple carpaccio, lime zest" }
      ]
    }
  }
];

export const SPA_SERVICES = [
  {
    id: "royal-massage",
    name: "Royal Aurelia Signature Full Body Massage",
    category: "Massages",
    duration: "90 min",
    price: 240,
    rating: 4.99,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    description: "Our hallmark wellness ritual combines customized deep tissue techniques, warm volcanic basalt stones, and warm organic essential oils infused with French lavender and neroli blossom.",
    benefits: ["Relieves deep muscular tension", "Restores circulation and lymphatic flow", "Induces deep meditative tranquility", "Infuses skin with nutrient-rich organic botanical oils"]
  },
  {
    id: "couples-sanctuary",
    name: "Couples Oceanfront Aromatherapy Sanctuary",
    category: "Couples Rituals",
    duration: "120 min",
    price: 490,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80",
    description: "A private couples suite overlooking the azure bay. Includes dual full-body customized massages, a soothing rose petal hydrotherapy milk bath, Bollinger champagne, and chocolate strawberries.",
    benefits: ["Romantic bonding & rejuvenation", "Full body tension release", "Private luxury suite with steam room", "Complimentary champagne & treats"]
  },
  {
    id: "radiance-facial",
    name: "Ocean Radiance Cellular Caviar Facial",
    category: "Facial Aesthetics",
    duration: "75 min",
    price: 260,
    rating: 4.98,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    description: "A high-potency Swiss cellular therapy featuring micronized caviar extracts, hyaluronic acid infusion via non-invasive oxygen dome, and sculpting chilled jade stone contouring.",
    benefits: ["Intense instant lifting and firming", "Deep cellular hydration", "Smoothes fine lines and fatigue", "Radiant luminous glow"]
  },
  {
    id: "himalayan-stones",
    name: "Himalayan Pink Salt Stone & Sound Therapy",
    category: "Massages",
    duration: "90 min",
    price: 220,
    rating: 4.96,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
    description: "Warm crystal salt stones deliver 84 minerals to remineralize tired muscles while hand-hammered Tibetan singing bowls bathe your spirit in balancing vibrational resonance.",
    benefits: ["Detoxifies and purifies the skin", "Reduces inflammation and stress", "Chakra alignment through vibrational sound", "Balances electromagnetic field"]
  },
  {
    id: "thermal-circuit",
    name: "Nordic Thermal & Thalassotherapy Circuit",
    category: "Hydrotherapy",
    duration: "60 min",
    price: 110,
    rating: 4.94,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    description: "Cycle through our dry Finnish cedar sauna (85°C), eucalyptus steam room, ice plunge bath (10°C), indoor heated magnesium pool with hydro-jets, and halotherapy pink salt room.",
    benefits: ["Boosts immune system", "Accelerates muscle recovery", "Clears respiratory system", "Enhances cardiovascular vitality"]
  },
  {
    id: "sunrise-yoga",
    name: "Sunrise Ocean Cliff Yoga & Sound Bath",
    category: "Mind & Movement",
    duration: "75 min",
    price: 65,
    rating: 4.99,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    description: "Greet the rising Mediterranean sun on our panoramic wooden cliff pavilion. Led by master yogis, this session combines gentle Vinyasa flow with Pranayama breathwork and crystal bowl sound healing.",
    benefits: ["Morning mental clarity", "Full body flexibility & alignment", "Stress reduction & breath control", "Unrivalled coastal sunrise view"]
  }
];

export const EXPERIENCES = [
  {
    id: "sunset-yacht",
    name: "Private Riva Yacht Sunset Cruise & Champagne",
    category: "Nautical & Marine",
    duration: "3 Hours",
    price: 680,
    difficulty: "Gentle / Leisure",
    rating: 5.0,
    availability: "Daily at 17:30",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80",
    description: "Board our iconic mahogany Riva Dolceriva yacht with private captain. Glide past the golden cliffs of the Estérel, drop anchor in secluded turquoise coves for a sunset swim, and toast the twilight with vintage champagne and gourmet canapés.",
    inclusions: ["Private yacht & certified captain", "Bottle of Dom Pérignon Champagne", "Gourmet canapé platter from Horizon", "Snorkeling gear & luxury beach towels", "Roundtrip transfer to resort private pier"]
  },
  {
    id: "coral-diving",
    name: "Lérins Islands Guided Scuba Diving & Marine Sanctuary",
    category: "Adventure",
    duration: "4 Hours",
    price: 240,
    difficulty: "Moderate (PADI beginners or certified)",
    rating: 4.97,
    availability: "Tues, Thurs, Sat at 09:00",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    description: "Explore the UNESCO-recognized underwater eco-museum and marine reserve near Sainte-Marguerite Island. Discover ancient Roman amphorae replicas, sea turtle sanctuaries, and vibrant Mediterranean reefs under the guidance of our Master PADI instructor.",
    inclusions: ["All professional diving equipment", "PADI divemaster guide", "Speedboat transfer from resort dock", "Underwater photography session", "Warm herbal tea & light post-dive refreshments"]
  },
  {
    id: "cooking-masterclass",
    name: "Private Masterclass with Chef Marco Valerio",
    category: "Culinary & Wine",
    duration: "3.5 Hours",
    price: 320,
    difficulty: "All Levels",
    rating: 4.99,
    availability: "Wed & Fri at 10:30",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    description: "Step into our open kitchen academy. Pick herbs from our private organic gardens alongside 2-Michelin starred Chef Marco Valerio, master hand-rolled pasta and delicate seafood crudo, followed by a 4-course lunch paired with sommelier-selected wines.",
    inclusions: ["Guided garden harvesting", "Hands-on private culinary masterclass", "4-course lunch of prepared dishes", "Wine pairings by Head Sommelier", "Embroidered Aurelia chef apron & recipe book"]
  },
  {
    id: "helicopter-tour",
    name: "Monaco & French Riviera Coastline Helicopter Flight",
    category: "Aviation & Luxury",
    duration: "45 Min Flight (1.5 Hr Total)",
    price: 850,
    difficulty: "Leisure",
    rating: 5.0,
    availability: "Daily on request",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
    description: "Take off directly from Aurelia's private helipad in an Airbus H130 helicopter. Soar over the red porphyry cliffs of the Massif de l'Estérel, the glamorous harbors of Cannes and Antibes, and the iconic principality of Monaco before returning for champagne.",
    inclusions: ["Private helicopter charter for up to 4 guests", "Experienced captain with live commentary", "Direct departure from resort helipad", "In-flight video recording & photos", "Welcome flute of champagne upon landing"]
  },
  {
    id: "wine-tasting-cellar",
    name: "Sommelier Rare Vintage Wine & Caviar Tasting",
    category: "Culinary & Wine",
    duration: "2 Hours",
    price: 210,
    difficulty: "Leisure",
    rating: 4.96,
    availability: "Daily at 17:00",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    description: "Descend into our 1934 limestone cellar holding over 12,000 bottles. Join Head Sommelier Jean-Luc for an intimate tasting of five premier crus, including Château Margaux, Romanée-Conti, and vintage champagnes, paired with artisanal cheeses and caviar.",
    inclusions: ["5 Grand Cru and Premier Cru wines", "Tasting plate of affiné cheeses & charcuterie", "Flight of Russian & French caviars", "Sommelier cellar booklet & tasting notes"]
  },
  {
    id: "cove-dinner",
    name: "Secluded Private Cove Beachfront Candlelit Dinner",
    category: "Romance",
    duration: "3.5 Hours",
    price: 520,
    difficulty: "Leisure",
    rating: 5.0,
    availability: "Nightly on request (Weather permitting)",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80",
    description: "A private fairy-tale setting prepared exclusively for two guests on our secluded rocky beach. Surrounded by fifty flickering lanterns, a crackling firepit, gentle waves, and private butler service serving a personalized 5-course seafood feast.",
    inclusions: ["Exclusive private beach cove reservation", "5-course bespoke dinner by Executive Chef", "Wine pairing or champagne included", "Dedicated private waiter & acoustic guitar serenader", "Fairy lights, lanterns & bonfire styling"]
  }
];

export const EVENTS_VENUES = [
  {
    id: "grand-ballroom",
    name: "The Grand Ocean Ballroom",
    type: "Indoor Grand Venue",
    capacity: 450,
    banquetCapacity: 320,
    cocktailCapacity: 450,
    areaSqM: 520,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    description: "Spectacular oceanfront ballroom featuring 7-meter vaulted ceilings with crystal chandeliers, acoustic wall panels, private pre-function marble foyer, and sweeping glass walls framing the sea.",
    suitableFor: ["Weddings & Galas", "Corporate Annual Summits", "Product Launches", "Charity Banquets"]
  },
  {
    id: "cliffside-pavilion",
    name: "Azure Cliffside Wedding Pavilion",
    type: "Outdoor Oceanfront",
    capacity: 180,
    banquetCapacity: 140,
    cocktailCapacity: 180,
    areaSqM: 280,
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    description: "Suspended dramatically above the Mediterranean surf with 270-degree sunset views, this marble colonnade pavilion is the ultimate romantic setting for luxury wedding vows and cocktail celebrations.",
    suitableFor: ["Luxury Wedding Ceremonies", "Sunset Receptions", "Anniversary Milestones", "Fashion Shows"]
  },
  {
    id: "royal-palms-garden",
    name: "The Royal Palms Botanical Garden",
    type: "Outdoor Garden",
    capacity: 300,
    banquetCapacity: 220,
    cocktailCapacity: 300,
    areaSqM: 450,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    description: "Surrounded by soaring palms, fragrant orange groves, and classic Italian marble fountains. Creates an enchanted illuminated oasis under starry Riviera night skies.",
    suitableFor: ["Al Fresco Wedding Dinners", "Cocktail Parties", "Private Concerts", "Family Reunions"]
  },
  {
    id: "executive-boardroom",
    name: "The Riviera Executive Boardroom & Salon",
    type: "Indoor Executive",
    capacity: 35,
    banquetCapacity: 24,
    cocktailCapacity: 40,
    areaSqM: 85,
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
    description: "High-level diplomatic and corporate boardroom equipped with encrypted telepresence conferencing, leather executive seating, private dining salon, and private sea-facing terrace.",
    suitableFor: ["Board Meetings", "Diplomatic Summits", "Investor Presentations", "Private Dining"]
  }
];

export const GALLERY_ITEMS = [
  { id: 1, title: "Presidential Penthouse Infinity Pool", category: "Rooms", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, title: "Horizon Oceanfront Dining at Twilight", category: "Dining", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, title: "Azure Main Solarium Infinity Pool", category: "Pool", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80" },
  { id: 4, title: "Aurelia Thermal Spa & Hydro Pool", category: "Spa", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80" },
  { id: 5, title: "Sunset Riva Yacht Cruise Along Estérel", category: "Experiences", image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80" },
  { id: 6, title: "Grand Ocean Ballroom Wedding Setup", category: "Events", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80" },
  { id: 7, title: "Resort Coastal Promenade & Private Bay", category: "Property", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80" },
  { id: 8, title: "Premium Ocean View Suite Bedroom", category: "Rooms", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80" },
  { id: 9, title: "Ember Prime Wood-Fired Kitchen", category: "Dining", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" },
  { id: 10, title: "Sunrise Yoga by Cliff Edge Pavilion", category: "Spa", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80" },
  { id: 11, title: "Overwater Villa Private Sunken Deck", category: "Rooms", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80" },
  { id: 12, title: "Mediterranean Coral Diving Expedition", category: "Experiences", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80" }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Lord Julian & Lady Charlotte Davenport",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    rating: 5.0,
    date: "14 September 2026",
    stayedIn: "Presidential Horizon Penthouse",
    title: "An ethereal oasis of timeless hospitality",
    comment: "From the moment our helicopter touched down at the private helipad, the level of discretion, attention to detail, and genuine warmth was unparalleled. Chef Marco's seafood creations at Horizon are worthy of three Michelin stars, and our butler Jean-Pierre anticipated our every request before we could even ask. Aurelia sets the global gold standard for luxury.",
    categories: { cleanliness: 5.0, service: 5.0, location: 5.0, facilities: 5.0, value: 5.0 },
    verified: true
  },
  {
    id: 2,
    name: "Elena Rostova",
    country: "Switzerland",
    countryFlag: "🇨🇭",
    rating: 5.0,
    date: "28 August 2026",
    stayedIn: "Executive Azure Suite",
    title: "The most serene wellness retreat on the Riviera",
    comment: "The thermal suites and the cellular caviar facial were transformative. Waking up to the unobstructed azure sea from the bed and having fresh passionfruit pastries delivered on our terrace was pure heaven. I have already booked our stay for next spring.",
    categories: { cleanliness: 5.0, service: 5.0, location: 5.0, facilities: 5.0, value: 4.8 },
    verified: true
  },
  {
    id: 3,
    name: "Marcus & Sophia Vance",
    country: "United States",
    countryFlag: "🇺🇸",
    rating: 5.0,
    date: "04 July 2026",
    stayedIn: "Private Overwater Villa",
    title: "Unmatched romantic honeymoon destination",
    comment: "We chose the private overwater villa for our honeymoon and words cannot describe the peace and beauty. Stepping straight from our heated infinity pool into the sea cove, dining under the stars with our own chef, and cruising the coast in the Riva yacht will stay with us forever.",
    categories: { cleanliness: 5.0, service: 5.0, location: 5.0, facilities: 5.0, value: 4.9 },
    verified: true
  },
  {
    id: 4,
    name: "Dr. Kenji & Noriko Takahashi",
    country: "Japan",
    countryFlag: "🇯🇵",
    rating: 4.9,
    date: "19 June 2026",
    stayedIn: "Premium Ocean View Suite",
    title: "Architectural masterpiece with impeccable respect for guests",
    comment: "The acoustic isolation is remarkable — zero noise despite being close to the water. The bespoke Bang & Olufsen sound system and curated wine cellar made our evenings sublime. The concierge arranged seamless private transfers to Cannes and Monaco.",
    categories: { cleanliness: 5.0, service: 5.0, location: 4.9, facilities: 4.9, value: 4.8 },
    verified: true
  }
];

export const ROOM_SERVICE_MENU = [
  { id: 1, name: "Continental Luxury Breakfast", category: "Breakfast", price: 38, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=500&q=80", desc: "Fresh butter croissants, pain au chocolat, artisanal preserves, freshly squeezed orange juice, French press coffee." },
  { id: 2, name: "Truffle Scrambled Eggs & Smoked Salmon", category: "Breakfast", price: 42, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80", desc: "Free-range organic eggs, black winter truffles, Scottish smoked salmon, toasted brioche." },
  { id: 3, name: "Artisanal Burrata & Prosciutto di Parma", category: "Starters", price: 32, image: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=500&q=80", desc: "Creamy pugliese burrata, 24-month aged ham, sweet figs, aged Modena glaze." },
  { id: 4, name: "Chilled Vichyssoise with Caviar", category: "Starters", price: 36, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80", desc: "Velvety leek and potato soup, royal caviar spoon, chive oil." },
  { id: 5, name: "Aurelia Prime Wagyu Beef Burger", category: "Main Course", price: 38, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80", desc: "A5 Wagyu patty, aged Comté cheese, truffle mayo, brioche bun, triple-cooked fries." },
  { id: 6, name: "Wild Mediterranean Sea Bass Fillet", category: "Main Course", price: 48, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80", desc: "Pan-roasted with fennel bulb, crushed fingerling potatoes, saffron bouillabaisse sauce." },
  { id: 7, name: "Handmade Tagliolini with Summer Truffles", category: "Main Course", price: 40, image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=500&q=80", desc: "Fresh egg pasta, Normandy butter, shaved black truffles, 30-month Parmigiano Reggiano." },
  { id: 8, name: "Warm Valrhona Chocolate Fondant", category: "Desserts", price: 24, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80", desc: "Liquid center 72% dark chocolate, bourbon vanilla bean gelato." },
  { id: 9, name: "Tarte Tatin with Clotted Cream", category: "Desserts", price: 22, image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80", desc: "Caramelized apples, puff pastry base, Normandy crème fraîche." },
  { id: 10, name: "Bollinger Special Cuvée Brut (750ml)", category: "Drinks", price: 140, image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=500&q=80", desc: "Rich and structured Champagne, notes of baked apple, brioche, and walnuts." },
  { id: 11, name: "Chilled Provençal Whispering Angel Rosé", category: "Drinks", price: 65, image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&w=500&q=80", desc: "Crisp and refreshing, notes of peach, melon, and citrus blossom." }
];

export const FAQ_DATA = [
  {
    category: "Reservations & Booking",
    questions: [
      {
        q: "What is the Best Rate Guarantee policy at Aurelia Grand Resort?",
        a: "When you book directly on our official website, you receive our guaranteed lowest rate. If you find a lower publicly available rate for the same room and dates within 24 hours of booking, we will match that rate and offer an additional 15% discount plus a complimentary room upgrade."
      },
      {
        q: "Can I make changes to my reservation after booking?",
        a: "Yes. You can manage and modify your stay dates, add gourmet meal plans, request airport chauffeur transfers, or update guest details directly in our online 'Manage Booking' portal or by contacting our 24/7 reservations team."
      },
      {
        q: "What are your standard check-in and check-out times?",
        a: "Standard check-in begins at 15:00 (3:00 PM) and check-out is until 12:00 (12:00 PM). Guaranteed early check-in from 11:00 AM and late check-out until 16:00 PM can be arranged as an add-on or complimentary for Aurelia Privileges Platinum members."
      }
    ]
  },
  {
    category: "Cancellation & Payment",
    questions: [
      {
        q: "What is the cancellation and refund policy?",
        a: "Most flexible rates offer free cancellation up to 48 hours prior to arrival (72 hours for specialty suites, 14 days for the Private Overwater Villa). If cancelled within the complimentary window, 100% of the deposit is refunded to the original payment method within 3 business days."
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept Visa, Mastercard, American Express, JCB, UnionPay, PayPal, and Apple Pay. You can also opt for 'Pay at Hotel' upon arrival with a valid credit card guarantee."
      }
    ]
  },
  {
    category: "Arrival & Transportation",
    questions: [
      {
        q: "How far is the resort from the nearest airport?",
        a: "Aurelia Grand Resort is situated 28 km from Nice Côte d'Azur International Airport (NCE). We offer private luxury transfers via Mercedes S-Class or Maybach (approx. 25 minutes) as well as direct private helicopter transfers from Nice Airport to our on-site helipad (7 minutes flight time)."
      },
      {
        q: "Is valet parking available on-site?",
        a: "Yes, 24-hour secured underground valet parking is complimentary for all staying hotel guests, with high-speed EV charging stations (Tesla Superchargers and Type 2 connectors) available."
      }
    ]
  },
  {
    category: "Dining & Spa Facilities",
    questions: [
      {
        q: "Do I need to reserve restaurant tables and spa treatments in advance?",
        a: "While staying guests receive priority seating, we highly recommend reserving tables at Horizon Oceanfront Dining and spa appointments at least 2 weeks in advance during high season. You can easily book online via our table and spa reservation modules."
      },
      {
        q: "Are children allowed at the resort and spa?",
        a: "Yes, Aurelia Grand Resort warmly welcomes families. We have dedicated Family Suites, the Little Explorers Kids Club, children's menus, and baby gear. The main heated infinity pool is family-friendly, while our Quiet Cliffside Saltwater Pool and Thermal Spa are reserved for adults (ages 16+)."
      }
    ]
  }
];

export const HOTEL_SERVICES = [
  { id: "transfer", title: "Private Chauffeur & Helipad", desc: "Mercedes S-Class airport transfers and direct flights to Monaco & Nice via our private helipad.", icon: "Car" },
  { id: "concierge", title: "Les Clefs d'Or Concierge", desc: "24/7 dedicated concierge team for private yacht charters, museum access, and bespoke itineraries.", icon: "Compass" },
  { id: "room-service", title: "24-Hour In-Room Dining", desc: "Gourmet dishes, vintage wines, and champagne delivered to your terrace day or night.", icon: "UtensilsCrossed" },
  { id: "butler", title: "Dedicated Butler Service", desc: "Personal butler for suite guests offering wardrobe packing, in-suite dining, and tailored requests.", icon: "UserCheck" },
  { id: "wellness", title: "Thalassotherapy & Thermal Spa", desc: "1,800 m² holistic sanctuary with Finnish saunas, salt rooms, cryotherapy, and treatments.", icon: "Sparkles" },
  { id: "beach-club", title: "Private Beach Club & Cove", desc: "Reserved plush cabanas, fresh towels, paddleboards, and beachside cocktail service.", icon: "Sun" },
  { id: "kids-club", title: "Little Explorers Kids Club", desc: "Supervised marine biology workshops, treasure hunts, baking, and professional babysitting.", icon: "Smile" },
  { id: "valet", title: "Valet & EV Supercharging", desc: "Secured underground parking with valet service and complimentary Tesla Superchargers.", icon: "ShieldCheck" }
];
