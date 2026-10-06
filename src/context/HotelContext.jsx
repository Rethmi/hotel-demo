import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENCIES, ROOMS, ADDONS, OFFERS, RESTAURANTS, EXPERIENCES, SPA_SERVICES } from '../data/hotelData';

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  // Currency State
  const [currency, setCurrency] = useState('USD');

  // Language State
  const [language, setLanguage] = useState('EN');

  // Search & Booking State
  const [searchParams, setSearchParams] = useState({
    destination: "Aurelia Grand Resort, French Riviera",
    checkIn: "2026-10-15",
    checkOut: "2026-10-19",
    adults: 2,
    children: 0,
    roomsCount: 1,
    promoCode: "",
  });

  // Active Booking Flow State
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [bedPreference, setBedPreference] = useState("1 King Bed");
  const [specialRequestsText, setSpecialRequestsText] = useState("");
  const [guestDetails, setGuestDetails] = useState({
    firstName: "Lord Julian",
    lastName: "Davenport",
    email: "julian.davenport@davenport-estates.co.uk",
    phone: "+44 7911 123456",
    country: "United Kingdom",
    address: "14 Belgrave Square, London SW1X 8PS",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    method: "card", // card, paypal, pay-at-hotel
    cardholderName: "Lord Julian Davenport",
    cardNumber: "4532 •••• •••• 8842",
    expiry: "09/29",
    cvv: "392",
  });
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    name: "Lord Julian Davenport",
    email: "julian.davenport@davenport-estates.co.uk",
    membershipTier: "Platinum",
    points: 18450,
    memberSince: "2021",
    phone: "+44 7911 123456",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    vipPerks: [
      "Complimentary Room Upgrade upon availability",
      "Guaranteed 16:00 Late Check-out & 11:00 Early Check-in",
      "Executive Club Lounge Access with Grand Cru Champagne",
      "Annual $500 Aurelia Wellness & Spa Credit",
      "Dedicated 24/7 Private Concierge & Butler line"
    ]
  });

  // User Stays History
  const [bookings, setBookings] = useState([
    {
      id: "AGR-99421-2026",
      status: "Confirmed",
      room: ROOMS[1], // Premium Ocean View
      checkIn: "2026-10-15",
      checkOut: "2026-10-19",
      nights: 4,
      guests: { adults: 2, children: 0 },
      addOns: ["addon-breakfast", "addon-transfer"],
      subtotal: 960,
      taxes: 120,
      total: 1270,
      paymentMethod: "Credit Card (Visa •••• 8842)",
      createdAt: "02 Oct 2026",
      canCancelUntil: "13 Oct 2026, 15:00",
      notes: "High floor requested, quiet side of the resort wing."
    },
    {
      id: "AGR-87421-2026",
      status: "Completed",
      room: ROOMS[2], // Executive Suite
      checkIn: "2026-06-10",
      checkOut: "2026-06-15",
      nights: 5,
      guests: { adults: 2, children: 1 },
      addOns: ["addon-transfer", "addon-romantic"],
      total: 2180,
      paymentMethod: "American Express (•••• 3004)",
      createdAt: "15 May 2026",
      notes: "Celebrated wedding anniversary. Bottle of Dom Pérignon served."
    },
    {
      id: "AGR-71203-2025",
      status: "Completed",
      room: ROOMS[4], // Presidential Penthouse
      checkIn: "2025-11-04",
      checkOut: "2025-11-08",
      nights: 4,
      guests: { adults: 4, children: 0 },
      addOns: ["addon-breakfast"],
      total: 3650,
      paymentMethod: "Credit Card (Visa •••• 8842)",
      createdAt: "20 Oct 2025",
      notes: "Private yacht excursion booked."
    }
  ]);

  // Restaurant Table Reservations
  const [restaurantReservations, setRestaurantReservations] = useState([
    {
      id: "RES-4091",
      restaurantId: "horizon",
      restaurantName: "Horizon Oceanfront Dining",
      date: "2026-10-16",
      time: "20:00",
      guests: 2,
      seating: "Cliffside Window Table",
      occasion: "Romantic Anniversary",
      specialRequests: "Sommelier wine pairing recommendation requested",
      status: "Confirmed"
    },
    {
      id: "RES-3820",
      restaurantId: "azure-lounge",
      restaurantName: "Azure Sunset Lounge & Caviar Bar",
      date: "2026-10-17",
      time: "18:30",
      guests: 2,
      seating: "Outdoor Sunset Sofa",
      occasion: "Aperitivo & Jazz",
      specialRequests: "Beluga caviar tasting preparation",
      status: "Confirmed"
    }
  ]);

  // Spa Appointments
  const [spaAppointments, setSpaAppointments] = useState([
    {
      id: "SPA-1029",
      serviceId: "couples-sanctuary",
      serviceName: "Couples Oceanfront Aromatherapy Sanctuary",
      date: "2026-10-17",
      time: "14:00",
      duration: "120 min",
      price: 490,
      therapist: "Senior Therapist Hélène & Antoine",
      status: "Confirmed"
    }
  ]);

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aurelia_wishlist');
      return saved ? JSON.parse(saved) : ["ocean-view-room", "stay-3-pay-2", "sunset-yacht", "horizon"];
    } catch (e) {
      return ["ocean-view-room", "stay-3-pay-2", "sunset-yacht", "horizon"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const toggleWishlist = (itemId) => {
    setWishlist(prev => {
      const exists = prev.includes(itemId);
      if (exists) {
        showToast("Removed from your curated wishlist", "info");
        return prev.filter(id => id !== itemId);
      } else {
        showToast("Saved to your Aurelia wishlist", "success");
        return [...prev, itemId];
      }
    });
  };

  const isInWishlist = (itemId) => wishlist.includes(itemId);

  // Room Service Cart & Orders
  const [roomServiceCart, setRoomServiceCart] = useState([]);
  const [roomServiceOrders, setRoomServiceOrders] = useState([
    {
      id: "ORD-941",
      roomNumber: "Suite 702",
      items: [
        { name: "Continental Luxury Breakfast", qty: 2, price: 38 },
        { name: "Bollinger Special Cuvée Brut", qty: 1, price: 140 }
      ],
      total: 216,
      orderTime: "10:15 AM",
      estimatedDelivery: "10:45 AM",
      status: "Preparing with Executive Chef",
      instructions: "Please knock gently and leave on ocean balcony table"
    }
  ]);

  // Special Guest Requests
  const [guestRequests, setGuestRequests] = useState([
    {
      id: "REQ-301",
      category: "Room Setup",
      title: "Pillow Menu Selection (Hungarian Goose Feather)",
      status: "Completed",
      date: "04 Oct 2026",
      response: "Delivered to Suite 702 master bedroom"
    },
    {
      id: "REQ-302",
      category: "Transportation",
      title: "Chauffeur Pick-up at Nice Airport (Terminal 2)",
      status: "In Progress",
      date: "05 Oct 2026",
      response: "Driver Jean-Claude assigned. Mercedes S-Class license plate #AA-942-CD"
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "VIP Itinerary Confirmed",
      message: "Your upcoming stay starting 15 Oct is confirmed in the Premium Ocean View Suite. Chauffeur assigned.",
      time: "10 minutes ago",
      read: false,
      type: "booking"
    },
    {
      id: 2,
      title: "Complimentary Suite Upgrade Opportunity",
      message: "As an Aurelia Privileges Platinum member, you have priority eligibility for Executive Suite allocation.",
      time: "2 hours ago",
      read: false,
      type: "loyalty"
    },
    {
      id: 3,
      title: "Table Reserved at Horizon",
      message: "Your sunset table reservation for 16 Oct at 20:00 is confirmed with Chef Marco's team.",
      time: "Yesterday",
      read: true,
      type: "dining"
    }
  ]);

  // Global Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cookie Consent State
  const [cookieConsent, setCookieConsent] = useState(() => {
    try {
      return localStorage.getItem('aurelia_cookie_consent') || null;
    } catch {
      return null;
    }
  });

  // Toast System
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Helper: Format Price with Currency
  const formatPrice = (amountInUSD) => {
    const cur = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = Math.round(amountInUSD * cur.rate);
    return `${cur.symbol}${converted.toLocaleString()}`;
  };

  // Helper: Calculate Nights
  const calculateNights = () => {
    try {
      const d1 = new Date(searchParams.checkIn);
      const d2 = new Date(searchParams.checkOut);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };

  // Add Item to Room Service Cart
  const addToRoomService = (dish) => {
    setRoomServiceCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...dish, qty: 1 }];
    });
    showToast(`Added ${dish.name} to in-room dining order`, "success");
  };

  const updateRoomServiceQty = (dishId, delta) => {
    setRoomServiceCart(prev => {
      return prev.map(item => {
        if (item.id === dishId) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearRoomServiceCart = () => setRoomServiceCart([]);

  return (
    <HotelContext.Provider value={{
      // Currency & Lang
      currency,
      setCurrency,
      language,
      setLanguage,
      formatPrice,
      // Search
      searchParams,
      setSearchParams,
      calculateNights,
      // Booking Flow
      selectedRoom,
      setSelectedRoom,
      selectedAddOns,
      setSelectedAddOns,
      bedPreference,
      setBedPreference,
      specialRequestsText,
      setSpecialRequestsText,
      guestDetails,
      setGuestDetails,
      paymentDetails,
      setPaymentDetails,
      confirmedBooking,
      setConfirmedBooking,
      // User / Auth
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      bookings,
      setBookings,
      // Reservations
      restaurantReservations,
      setRestaurantReservations,
      spaAppointments,
      setSpaAppointments,
      // Wishlist
      wishlist,
      toggleWishlist,
      isInWishlist,
      // Room service
      roomServiceCart,
      addToRoomService,
      updateRoomServiceQty,
      clearRoomServiceCart,
      roomServiceOrders,
      setRoomServiceOrders,
      // Special Requests
      guestRequests,
      setGuestRequests,
      // Notifications
      notifications,
      setNotifications,
      // UI Modals & Toast
      isSearchOpen,
      setIsSearchOpen,
      cookieConsent,
      setCookieConsent,
      toast,
      showToast,
    }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotel must be used within a HotelProvider");
  }
  return context;
};
