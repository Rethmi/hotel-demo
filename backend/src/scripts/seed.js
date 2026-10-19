import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import RestaurantReservation from '../models/RestaurantReservation.js';
import SpaAppointment from '../models/SpaAppointment.js';
import RoomServiceOrder from '../models/RoomServiceOrder.js';
import GuestRequest from '../models/GuestRequest.js';
import Notification from '../models/Notification.js';
import {
  Restaurant,
  SpaService,
  Offer,
  Experience,
  Addon,
  MenuItem,
  Review,
  Wishlist,
} from '../models/HotelContent.js';

import {
  ROOMS,
  RESTAURANTS,
  SPA_SERVICES,
  OFFERS,
  EXPERIENCES,
  ADDONS,
  ROOM_SERVICE_MENU,
  REVIEWS,
} from '../../../src/data/hotelData.js';

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('[Seed] Connected to database. Preparing to seed...');

    // Clear existing collections
    await User.deleteMany();
    await Room.deleteMany();
    await Booking.deleteMany();
    await RestaurantReservation.deleteMany();
    await SpaAppointment.deleteMany();
    await RoomServiceOrder.deleteMany();
    await GuestRequest.deleteMany();
    await Notification.deleteMany();
    await Restaurant.deleteMany();
    await SpaService.deleteMany();
    await Offer.deleteMany();
    await Experience.deleteMany();
    await Addon.deleteMany();
    await MenuItem.deleteMany();
    await Review.deleteMany();
    await Wishlist.deleteMany();

    console.log('[Seed] Cleared existing data.');

    // 1. Seed Demo VIP User
    const demoUser = await User.create({
      name: 'Lord Julian Davenport',
      email: 'julian.davenport@davenport-estates.co.uk',
      password: 'password123',
      phone: '+44 7911 123456',
      membershipTier: 'Platinum',
      points: 18450,
      memberSince: '2021',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      vipPerks: [
        'Complimentary Room Upgrade upon availability',
        'Guaranteed 16:00 Late Check-out & 11:00 Early Check-in',
        'Executive Club Lounge Access with Grand Cru Champagne',
        'Annual $500 Aurelia Wellness & Spa Credit',
        'Dedicated 24/7 Private Concierge & Butler line',
      ],
      address: {
        street: '14 Belgrave Square',
        city: 'London',
        postalCode: 'SW1X 8PS',
        country: 'United Kingdom',
      },
      role: 'guest',
    });

    // Also seed an Admin User
    await User.create({
      name: 'Aurelia General Manager',
      email: 'admin@aureliagrandresort.com',
      password: 'AdminPassword2026!',
      phone: '+33 4 93 88 00 24',
      membershipTier: 'Diamond',
      points: 50000,
      role: 'admin',
    });

    console.log('[Seed] Created Demo User & Admin Account.');

    // 2. Seed Rooms
    const formattedRooms = ROOMS.map((r) => ({
      roomId: r.id,
      name: r.name,
      category: r.category,
      tagline: r.tagline,
      price: r.price,
      originalPrice: r.originalPrice || null,
      rating: r.rating || 4.9,
      reviewsCount: r.reviewsCount || 0,
      sizeSqM: r.sizeSqM,
      sizeSqFt: r.sizeSqFt,
      maxGuests: r.maxGuests,
      bed: r.bed,
      view: r.view,
      floor: r.floor,
      stock: r.stock,
      popularBadge: r.popularBadge || '',
      images: r.images,
      description: r.description,
      features: r.features || [],
      amenities: r.amenities || [],
      includedServices: r.includedServices || [],
      cancellationPolicy: r.cancellationPolicy,
      breakfastAvailable: r.breakfastAvailable,
      breakfastPrice: r.breakfastPrice || 42,
    }));
    await Room.insertMany(formattedRooms);
    console.log(`[Seed] Seeded ${formattedRooms.length} luxury rooms.`);

    // 3. Seed Restaurants
    const formattedRestaurants = RESTAURANTS.map((rest) => ({
      restaurantId: rest.id,
      name: rest.name,
      cuisine: rest.cuisine,
      tagline: rest.tagline,
      chef: rest.chef,
      michelinStars: rest.michelinStars || 0,
      rating: rest.rating || 4.9,
      reviewsCount: rest.reviewsCount || 0,
      dressCode: rest.dressCode,
      hours: rest.hours,
      priceLevel: rest.priceLevel,
      images: rest.images || [],
      description: rest.description,
      features: rest.features || [],
      signatureDishes: rest.signatureDishes || [],
    }));
    await Restaurant.insertMany(formattedRestaurants);
    console.log(`[Seed] Seeded ${formattedRestaurants.length} fine dining venues.`);

    // 4. Seed Spa Services
    const formattedSpa = SPA_SERVICES.map((s) => ({
      serviceId: s.id,
      name: s.name,
      category: s.category,
      duration: s.duration,
      price: s.price,
      rating: s.rating || 5,
      description: s.description,
      benefits: s.benefits || [],
      image: s.image,
    }));
    await SpaService.insertMany(formattedSpa);
    console.log(`[Seed] Seeded ${formattedSpa.length} spa rituals.`);

    // 5. Seed Offers
    const formattedOffers = OFFERS.map((o) => ({
      offerId: o.id,
      title: o.title,
      tagline: o.tagline,
      discount: o.discount,
      category: o.category,
      validDates: o.validDates,
      minNights: o.minNights,
      promoCode: o.promoCode,
      badge: o.badge,
      image: o.image,
      inclusions: o.inclusions || [],
      terms: o.terms,
    }));
    await Offer.insertMany(formattedOffers);
    console.log(`[Seed] Seeded ${formattedOffers.length} exclusive packages.`);

    // 6. Seed Experiences
    const formattedExperiences = EXPERIENCES.map((exp) => ({
      experienceId: exp.id,
      name: exp.name,
      category: exp.category,
      duration: exp.duration,
      price: exp.price,
      difficulty: exp.difficulty,
      rating: exp.rating || 5,
      availability: exp.availability,
      description: exp.description,
      inclusions: exp.inclusions || [],
      image: exp.image,
    }));
    await Experience.insertMany(formattedExperiences);
    console.log(`[Seed] Seeded ${formattedExperiences.length} curated experiences.`);

    // 7. Seed Addons
    const formattedAddons = ADDONS.map((a) => ({
      addonId: a.id,
      name: a.name,
      category: a.category,
      price: a.price,
      perPerson: a.perPerson || false,
      description: a.description,
      icon: a.icon || '',
    }));
    await Addon.insertMany(formattedAddons);
    console.log(`[Seed] Seeded ${formattedAddons.length} bespoke add-ons.`);

    // 8. Seed Room Service Menu
    const formattedMenu = ROOM_SERVICE_MENU.map((m) => ({
      itemId: m.id,
      name: m.name,
      category: m.category,
      price: m.price,
      description: m.desc || m.description || '',
      desc: m.desc || m.description || '',
      image: m.image,
    }));
    await MenuItem.insertMany(formattedMenu);
    console.log(`[Seed] Seeded ${formattedMenu.length} in-room dining dishes.`);

    // 9. Seed Reviews
    await Review.insertMany(
      REVIEWS.map((rev) => ({
        name: rev.name,
        author: rev.name,
        country: rev.country,
        countryFlag: rev.countryFlag,
        rating: rev.rating,
        title: rev.title,
        comment: rev.comment,
        stayedIn: rev.stayedIn,
        categories: rev.categories,
        date: rev.date,
        verified: rev.verified !== undefined ? rev.verified : true,
      }))
    );
    console.log(`[Seed] Seeded ${REVIEWS.length} guest reviews.`);

    // 10. Seed Bookings History for Demo User
    const sampleBookings = [
      {
        bookingReference: 'AGR-99421-2026',
        user: demoUser._id,
        roomId: 'ocean-view-room',
        room: {
          id: ROOMS[1].id,
          name: ROOMS[1].name,
          category: ROOMS[1].category,
          price: ROOMS[1].price,
          images: ROOMS[1].images,
          bed: ROOMS[1].bed,
          view: ROOMS[1].view,
          sizeSqM: ROOMS[1].sizeSqM,
        },
        checkIn: '2026-10-15',
        checkOut: '2026-10-19',
        nights: 4,
        guests: { adults: 2, children: 0 },
        addOns: ['addon-breakfast', 'addon-transfer'],
        subtotal: 960,
        taxes: 120,
        total: 1270,
        paymentMethod: 'Credit Card (Visa •••• 8842)',
        paymentStatus: 'Guaranteed',
        status: 'Confirmed',
        guest: {
          firstName: 'Lord Julian',
          lastName: 'Davenport',
          email: 'julian.davenport@davenport-estates.co.uk',
          phone: '+44 7911 123456',
          country: 'United Kingdom',
          address: '14 Belgrave Square, London SW1X 8PS',
        },
        specialRequests: 'High floor requested, quiet side of the resort wing.',
        notes: 'Chauffeur assigned from Nice Airport.',
        canCancelUntil: '13 Oct 2026, 15:00',
      },
      {
        bookingReference: 'AGR-87421-2026',
        user: demoUser._id,
        roomId: 'executive-suite',
        room: {
          id: ROOMS[2].id,
          name: ROOMS[2].name,
          category: ROOMS[2].category,
          price: ROOMS[2].price,
          images: ROOMS[2].images,
          bed: ROOMS[2].bed,
          view: ROOMS[2].view,
          sizeSqM: ROOMS[2].sizeSqM,
        },
        checkIn: '2026-06-10',
        checkOut: '2026-06-15',
        nights: 5,
        guests: { adults: 2, children: 1 },
        addOns: ['addon-transfer', 'addon-romantic'],
        subtotal: 1800,
        taxes: 200,
        total: 2180,
        paymentMethod: 'American Express (•••• 3004)',
        paymentStatus: 'Paid',
        status: 'Completed',
        guest: {
          firstName: 'Lord Julian',
          lastName: 'Davenport',
          email: 'julian.davenport@davenport-estates.co.uk',
          phone: '+44 7911 123456',
          country: 'United Kingdom',
        },
        notes: 'Celebrated wedding anniversary. Bottle of Dom Pérignon served.',
      },
      {
        bookingReference: 'AGR-71203-2025',
        user: demoUser._id,
        roomId: 'penthouse',
        room: {
          id: ROOMS[4].id,
          name: ROOMS[4].name,
          category: ROOMS[4].category,
          price: ROOMS[4].price,
          images: ROOMS[4].images,
          bed: ROOMS[4].bed,
          view: ROOMS[4].view,
          sizeSqM: ROOMS[4].sizeSqM,
        },
        checkIn: '2025-11-04',
        checkOut: '2025-11-08',
        nights: 4,
        guests: { adults: 4, children: 0 },
        addOns: ['addon-breakfast'],
        subtotal: 3200,
        taxes: 350,
        total: 3650,
        paymentMethod: 'Credit Card (Visa •••• 8842)',
        paymentStatus: 'Paid',
        status: 'Completed',
        guest: {
          firstName: 'Lord Julian',
          lastName: 'Davenport',
          email: 'julian.davenport@davenport-estates.co.uk',
          phone: '+44 7911 123456',
          country: 'United Kingdom',
        },
        notes: 'Private yacht excursion booked.',
      },
    ];
    await Booking.insertMany(sampleBookings);
    console.log(`[Seed] Seeded ${sampleBookings.length} bookings.`);

    // 11. Seed Restaurant Reservations
    await RestaurantReservation.insertMany([
      {
        reservationId: 'RES-4091',
        user: demoUser._id,
        restaurantId: 'horizon',
        restaurantName: 'Horizon Oceanfront Dining',
        date: '2026-10-16',
        time: '20:00',
        guests: 2,
        seating: 'Cliffside Window Table',
        occasion: 'Romantic Anniversary',
        specialRequests: 'Sommelier wine pairing recommendation requested',
        guestName: 'Lord Julian Davenport',
        guestEmail: 'julian.davenport@davenport-estates.co.uk',
        status: 'Confirmed',
      },
      {
        reservationId: 'RES-3820',
        user: demoUser._id,
        restaurantId: 'azure-lounge',
        restaurantName: 'Azure Sunset Lounge & Caviar Bar',
        date: '2026-10-17',
        time: '18:30',
        guests: 2,
        seating: 'Outdoor Sunset Sofa',
        occasion: 'Aperitivo & Jazz',
        specialRequests: 'Beluga caviar tasting preparation',
        guestName: 'Lord Julian Davenport',
        guestEmail: 'julian.davenport@davenport-estates.co.uk',
        status: 'Confirmed',
      },
    ]);
    console.log('[Seed] Seeded restaurant table reservations.');

    // 12. Seed Spa Appointments
    await SpaAppointment.insertMany([
      {
        appointmentId: 'SPA-1029',
        user: demoUser._id,
        serviceId: 'couples-sanctuary',
        serviceName: 'Couples Oceanfront Aromatherapy Sanctuary',
        date: '2026-10-17',
        time: '14:00',
        duration: '120 min',
        price: 490,
        therapist: 'Senior Therapist Hélène & Antoine',
        guestName: 'Lord Julian Davenport',
        guestEmail: 'julian.davenport@davenport-estates.co.uk',
        status: 'Confirmed',
      },
    ]);
    console.log('[Seed] Seeded spa appointments.');

    // 13. Seed Room Service Orders
    await RoomServiceOrder.insertMany([
      {
        orderId: 'ORD-941',
        user: demoUser._id,
        roomNumber: 'Suite 702',
        items: [
          { name: 'Continental Luxury Breakfast', qty: 2, price: 38 },
          { name: 'Bollinger Special Cuvée Brut', qty: 1, price: 140 },
        ],
        total: 216,
        orderTime: '10:15 AM',
        estimatedDelivery: '10:45 AM',
        status: 'Preparing with Executive Chef',
        instructions: 'Please knock gently and leave on ocean balcony table',
      },
    ]);
    console.log('[Seed] Seeded room service orders.');

    // 14. Seed Guest Concierge Requests
    await GuestRequest.insertMany([
      {
        requestId: 'REQ-301',
        user: demoUser._id,
        category: 'Room Setup',
        title: 'Pillow Menu Selection (Hungarian Goose Feather)',
        status: 'Completed',
        date: '04 Oct 2026',
        response: 'Delivered to Suite 702 master bedroom',
      },
      {
        requestId: 'REQ-302',
        user: demoUser._id,
        category: 'Transportation',
        title: 'Chauffeur Pick-up at Nice Airport (Terminal 2)',
        status: 'In Progress',
        date: '05 Oct 2026',
        response: 'Driver Jean-Claude assigned. Mercedes S-Class license plate #AA-942-CD',
      },
    ]);
    console.log('[Seed] Seeded guest concierge requests.');

    // 15. Seed Notifications
    await Notification.insertMany([
      {
        user: demoUser._id,
        title: 'VIP Itinerary Confirmed',
        message: 'Your upcoming stay starting 15 Oct is confirmed in the Premium Ocean View Suite. Chauffeur assigned.',
        time: '10 minutes ago',
        read: false,
        type: 'booking',
      },
      {
        user: demoUser._id,
        title: 'Complimentary Suite Upgrade Opportunity',
        message: 'As an Aurelia Privileges Platinum member, you have priority eligibility for Executive Suite allocation.',
        time: '2 hours ago',
        read: false,
        type: 'loyalty',
      },
      {
        user: demoUser._id,
        title: 'Table Reserved at Horizon',
        message: "Your sunset table reservation for 16 Oct at 20:00 is confirmed with Chef Marco's team.",
        time: 'Yesterday',
        read: true,
        type: 'dining',
      },
    ]);
    console.log('[Seed] Seeded notifications.');

    // 16. Seed Wishlist
    await Wishlist.create({
      user: demoUser._id,
      items: ['ocean-view-room', 'stay-3-pay-2', 'sunset-yacht', 'horizon'],
    });
    console.log('[Seed] Seeded guest curated wishlist.');

    console.log('\n======================================================');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('======================================================\n');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Database Seeding Failed:', error);
    process.exit(1);
  }
};

seedDatabase();
