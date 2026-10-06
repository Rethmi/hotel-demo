import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Star, ShieldCheck, Sparkles, Compass, 
  Utensils, Droplets, Award, Calendar, Heart, Eye, 
  MapPin, Check, ChevronRight, Play, Users, Coffee, BedDouble 
} from 'lucide-react';
import { BookingBar } from '../components/BookingBar';
import { RoomCard } from '../components/RoomCard';
import { useHotel } from '../context/HotelContext';
import { 
  HOTEL_INFO, ROOMS, OFFERS, RESTAURANTS, 
  SPA_SERVICES, EXPERIENCES, REVIEWS, HOTEL_SERVICES, GALLERY_ITEMS 
} from '../data/hotelData';

export const HomePage = () => {
  const navigate = useNavigate();
  const { formatPrice } = useHotel();
  const [activeRoomCategory, setActiveRoomCategory] = useState('All');
  const [activeOfferCategory, setActiveOfferCategory] = useState('All');

  const filteredRooms = activeRoomCategory === 'All' 
    ? ROOMS.slice(0, 4) 
    : ROOMS.filter(r => r.category.toLowerCase().includes(activeRoomCategory.toLowerCase()) || activeRoomCategory === 'Suites' && r.category.includes('Suite'));

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-charcoal-900 selection:bg-gold-500 selection:text-white">
      
      {/* ================================================== */}
      {/* SECTION 1 — LUXURY HERO                           */}
      {/* ================================================== */}
      <section className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-950 pt-20 pb-28">
        
        {/* Background Image with Cinematic Ken Burns & Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85"
            alt="Aurelia Grand Resort Oceanfront"
            className="w-full h-full object-cover scale-105 animate-float duration-1000 object-center opacity-85"
          />
          {/* Multi-layer luxury shading for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-charcoal-950/45 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,17,21,0.6)_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6 pt-12">
          
          {/* Top Brand Crest / Rating Pill */}
          <div className="inline-flex items-center space-x-2 bg-charcoal-900/70 border border-gold-400/40 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg animate-fade-in">
            <div className="flex text-gold-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-300 font-semibold font-sans">
              French Riviera's Premier 5-Star Haven
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-md">
            A Stay Beyond <br />
            <span className="font-cormorant italic font-normal text-gold-300 text-5xl sm:text-7xl md:text-8xl">
              Ordinary
            </span>
          </h1>

          {/* Tagline / Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-zinc-200 font-light leading-relaxed">
            Discover refined comfort, Michelin-caliber gastronomy, and unforgettable Mediterranean memories at Aurelia Grand Resort.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/booking"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded-sm shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Check Availability
            </Link>
            <Link
              to="/rooms"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-gold-400 font-semibold uppercase tracking-widest text-xs rounded-sm backdrop-blur-md transition-all duration-300"
            >
              Explore Rooms & Suites
            </Link>
          </div>

          {/* Micro Perks Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-zinc-300/90 font-medium">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Best Rate Guaranteed</span>
            </span>
            <span className="text-zinc-500">•</span>
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Complimentary Champagne Arrival</span>
            </span>
            <span className="text-zinc-500">•</span>
            <span className="flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-gold-400" />
              <span>Private Helipad Transfers</span>
            </span>
          </div>

        </div>

        {/* Bottom subtle scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-400 text-[10px] tracking-widest uppercase flex flex-col items-center space-y-1">
          <span>Scroll to Discover</span>
          <div className="w-[1px] h-6 bg-gold-400/60 animate-pulse" />
        </div>

      </section>

      {/* ================================================== */}
      {/* SECTION 2 — FLOATING BOOKING ENGINE                */}
      {/* ================================================== */}
      <section className="relative z-20 -mt-16 sm:-mt-20 px-4 sm:px-6 lg:px-8">
        <BookingBar />
      </section>

      {/* ================================================== */}
      {/* SECTION 3 — WELCOME / HOTEL INTRODUCTION           */}
      {/* ================================================== */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 block">
                Welcome to Aurelia Grand Resort
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 leading-tight">
                Where Timeless Splendor Meets the Horizon
              </h2>
            </div>
            
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Nestled along the storied cliffs of the French Riviera where red porphyry rock descends into sapphire waters, Aurelia Grand Resort has epitomized grand European hospitality since 1934.
            </p>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Every detail—from hand-carved Carrara marble bathrooms and private sun-drenched terraces to our three-star Michelin masterclasses and private Riva yachts—is tailored for travellers who demand discretion, peerless comfort, and transformative serenity.
            </p>

            {/* Key Hotel Highlights Numbers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-sand-300">
              <div>
                <p className="font-serif text-3xl font-bold text-charcoal-900">48</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Suites & Villas</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-charcoal-900">5</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Fine Restaurants</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-charcoal-900">1,800</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">m² Thermal Spa</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-charcoal-900">1934</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Heritage Legacy</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-charcoal-900 hover:text-gold-600 transition-colors group"
              >
                <span>Read Our Heritage Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Dual Editorial Photo Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
                alt="Aurelia Grand Resort Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating Overlapping Card */}
            <div className="absolute -bottom-8 -left-8 sm:-left-12 bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-xl border border-sand-300 max-w-xs hidden sm:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-600 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-serif font-bold text-sm text-charcoal-900">Forbes 5-Star</p>
                  <p className="text-[11px] text-zinc-500">World’s Most Luxurious Resort Award 2026</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 4 — FEATURED ROOMS & SUITES                */}
      {/* ================================================== */}
      <section className="py-24 bg-sand-100/60 border-y border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 block">
                Accommodations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900">
                Designed for Effortless Comfort
              </h2>
              <p className="text-zinc-600 text-sm max-w-xl">
                Every room at Aurelia is an architectural sanctuary blending Mediterranean light, rich natural textures, and bespoke acoustic tranquility.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Deluxe', 'Ocean View', 'Suites'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveRoomCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
                    activeRoomCategory === cat
                      ? 'bg-charcoal-900 text-white shadow-md'
                      : 'bg-white text-zinc-600 hover:bg-sand-200 border border-sand-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <div className="text-center pt-6">
            <Link
              to="/rooms"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 text-xs font-bold uppercase tracking-widest rounded transition-all shadow-md"
            >
              <span>View All 6 Rooms & Suites</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 5 — EXCLUSIVE OFFERS & PACKAGES            */}
      {/* ================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 block">
            Special Privileges
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Exclusive Packages & Offers
          </h2>
          <p className="text-zinc-600 text-sm">
            Curated stays designed to elevate your time on the Côte d'Azur with complimentary nights, dining credits, and private excursions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OFFERS.slice(0, 3).map((offer) => (
            <div 
              key={offer.id} 
              className="bg-white rounded-xl overflow-hidden border border-sand-300 hover:border-gold-500/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3.5 left-3.5 bg-charcoal-900/90 text-gold-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  {offer.discount}
                </div>
                <div className="absolute top-3.5 right-3.5 bg-gold-500 text-charcoal-950 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  {offer.badge}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600">
                    {offer.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {offer.tagline}
                  </p>
                  
                  <div className="pt-3 border-t border-sand-200 space-y-1.5 text-xs text-zinc-600">
                    {offer.inclusions.slice(0, 3).map((inc, i) => (
                      <p key={i} className="flex items-center space-x-2 truncate">
                        <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
                  <div className="text-[11px] text-zinc-500">
                    <span>Code: </span>
                    <span className="font-mono font-bold text-charcoal-900">{offer.promoCode}</span>
                  </div>
                  <Link
                    to={`/offers`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 hover:text-gold-600"
                  >
                    <span>View Offer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/offers"
            className="text-xs uppercase tracking-widest font-bold text-gold-600 hover:text-gold-700 underline"
          >
            Discover All Curated Packages & Seasonal Privileges →
          </Link>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 6 — DINING EXPERIENCE                      */}
      {/* ================================================== */}
      <section className="py-24 bg-charcoal-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400 block">
                Haute Gastronomy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                An Epicurean Odyssey by the Waves
              </h2>
              <p className="text-zinc-400 text-sm max-w-xl">
                Led by 2-Michelin Starred Executive Chef Marco Valerio, our five culinary venues celebrate Riviera traditions, open-fire grilling, and vintage champagnes.
              </p>
            </div>

            <Link
              to="/dining"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-gold-500/40 hover:border-gold-400 text-gold-300 hover:text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors"
            >
              <span>Explore All Menus</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Restaurant Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESTAURANTS.slice(0, 3).map((restaurant) => (
              <div 
                key={restaurant.id}
                className="bg-charcoal-900 border border-white/10 hover:border-gold-500/50 rounded-xl overflow-hidden transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={restaurant.images[0]}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                      <span className="text-gold-400 font-semibold">{restaurant.cuisine}</span>
                      <span className="text-zinc-300">{restaurant.priceRange}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {restaurant.description}
                    </p>
                    <p className="text-[11px] text-zinc-500 pt-2 border-t border-white/10">
                      <b>Hours:</b> {restaurant.hours}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                  <Link
                    to={`/dining/${restaurant.id}`}
                    className="text-xs text-zinc-300 hover:text-white underline"
                  >
                    View Menu
                  </Link>
                  <Link
                    to="/restaurant-reservation"
                    className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-colors"
                  >
                    Reserve Table
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 7 — SPA & WELLNESS                         */}
      {/* ================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 block">
              Sanctuary of Serenity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 leading-tight">
              Aurelia Thalassotherapy & Thermal Spa
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Spanning 1,800 square meters of marble, cedarwood, and coastal hydrotherapy pools, our holistic spa harnesses the restorative healing power of Mediterranean seawater and rare botanicals.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600 shrink-0 mt-0.5">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-900 text-sm">Thermal Hydrotherapy Circuit</h4>
                  <p className="text-xs text-zinc-500">Finnish sauna, herbal eucalyptus steam room, and vitality plunge pools.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-900 text-sm">Cellular Caviar Aesthetics</h4>
                  <p className="text-xs text-zinc-500">Bespoke Swiss anti-aging facials and therapeutic pink salt massages.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <Link
                to="/spa"
                className="px-6 py-3 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-all"
              >
                Explore Treatments
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SPA_SERVICES.slice(0, 4).map((spa) => (
              <div 
                key={spa.id}
                className="bg-white rounded-xl overflow-hidden border border-sand-300 p-4 hover:border-gold-500/50 shadow-sm transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                    <img src={spa.image} alt={spa.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      {spa.duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-600">{spa.category}</span>
                    <h4 className="font-serif font-bold text-charcoal-900 text-sm mt-0.5 group-hover:text-gold-600 transition-colors line-clamp-1">{spa.name}</h4>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{spa.description}</p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-sand-200 flex items-center justify-between">
                  <span className="font-serif font-bold text-charcoal-900 text-base">{formatPrice(spa.price)}</span>
                  <Link
                    to={`/spa/${spa.id}`}
                    className="text-xs font-bold text-gold-600 hover:text-gold-700 uppercase tracking-wider flex items-center space-x-1"
                  >
                    <span>Book</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 8 — CURATED EXPERIENCES                    */}
      {/* ================================================== */}
      <section className="py-24 bg-sand-100/60 border-t border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 block">
              Bespoke Adventures
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900">
              Unrivalled Coastal Experiences
            </h2>
            <p className="text-zinc-600 text-sm">
              From private mahogany Riva yacht charters along the Estérel cliffs to helicopter flights over Monaco, craft unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPERIENCES.slice(0, 3).map((exp) => (
              <div 
                key={exp.id}
                className="bg-white rounded-xl overflow-hidden border border-sand-300 hover:border-gold-500/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-charcoal-900/90 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-sm">
                    {exp.duration}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600">{exp.category}</span>
                    <h3 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors">
                      {exp.name}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">From</span>
                      <span className="font-serif font-bold text-charcoal-900 text-lg">{formatPrice(exp.price)}</span>
                    </div>
                    <Link
                      to={`/experiences/${exp.id}`}
                      className="px-4 py-2 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-colors"
                    >
                      Book Experience
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link to="/experiences" className="text-xs uppercase tracking-widest font-bold text-gold-600 hover:text-gold-700 underline">
              View All 6 Curated Island & Marine Experiences →
            </Link>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 9 — HOTEL FACILITIES                       */}
      {/* ================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 block">
            World-Class Amenities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Every Privilege at Your Fingertips
          </h2>
          <p className="text-zinc-600 text-sm">
            Everything you need for effortless living, from private helicopter arrivals to round-the-clock British Butler Guild service.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {HOTEL_SERVICES.map((serv) => (
            <div 
              key={serv.id}
              className="p-6 bg-white rounded-xl border border-sand-300 hover:border-gold-500/50 shadow-sm hover:shadow-md transition-all space-y-3 text-center sm:text-left"
            >
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600 mx-auto sm:mx-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-charcoal-900 text-sm">{serv.title}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">{serv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 10 — GUEST REVIEWS & REPUTATION            */}
      {/* ================================================== */}
      <section className="py-24 bg-charcoal-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400 block">
              Distinguished Guest Opinions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Praised by Discerning Travellers
            </h2>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <div className="flex text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-serif text-xl font-bold text-white">4.98 / 5.0</span>
              <span className="text-xs text-zinc-400">({HOTEL_INFO.reviewCount} Verified Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS.slice(0, 3).map((rev) => (
              <div 
                key={rev.id}
                className="bg-charcoal-900 border border-white/10 p-6 rounded-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-gold-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-zinc-500">{rev.date}</span>
                  </div>
                  <h4 className="font-serif font-bold text-white text-base">"{rev.title}"</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">{rev.name}</p>
                    <p className="text-[11px] text-gold-400">{rev.countryFlag} {rev.country} • Stayed in {rev.stayedIn}</p>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Guest" />
                </div>
              </div>
            ))}
          </div>

          {/* Rating Breakdown Badges */}
          <div className="p-6 bg-charcoal-900/60 rounded-xl border border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            <div>
              <p className="font-serif text-lg font-bold text-gold-400">5.0 / 5.0</p>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Cleanliness</p>
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-gold-400">4.9 / 5.0</p>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Service</p>
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-gold-400">5.0 / 5.0</p>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Location</p>
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-gold-400">4.9 / 5.0</p>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Facilities</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-serif text-lg font-bold text-gold-400">4.8 / 5.0</p>
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Value</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 11 — EDITORIAL GALLERY PREVIEW             */}
      {/* ================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 block">
              Visual Narrative
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              Moments of Aurelia
            </h2>
            <p className="text-zinc-600 text-sm max-w-lg">
              Explore the light, architecture, and tranquil atmosphere across our 40-acre Mediterranean estate.
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-charcoal-900 hover:text-gold-600"
          >
            <span>Open Full Gallery Lightbox</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_ITEMS.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="relative aspect-square rounded-xl overflow-hidden group shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-semibold">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 12 — LOYALTY / AURELIA PRIVILEGES          */}
      {/* ================================================== */}
      <section className="py-20 bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950 text-white border-y border-gold-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400 block">
                Loyalty Invitation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Aurelia Privileges Club
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-xl">
                Unlock elevated privileges with each stay. From guaranteed late 16:00 check-outs, suite upgrades, and sommelier cellar tastings to annual wellness credits.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-zinc-400 text-[10px] uppercase font-bold">Tier 1</p>
                  <p className="font-serif font-bold text-gold-400 text-sm mt-0.5">Silver</p>
                  <p className="text-[11px] text-zinc-300 mt-1">Priority bookings & welcome gift</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-zinc-400 text-[10px] uppercase font-bold">Tier 2</p>
                  <p className="font-serif font-bold text-gold-400 text-sm mt-0.5">Gold</p>
                  <p className="text-[11px] text-zinc-300 mt-1">Free breakfast & room upgrades</p>
                </div>
                <div className="p-3 bg-gold-500/10 rounded-lg border border-gold-400/40">
                  <p className="text-gold-400 text-[10px] uppercase font-bold">VIP</p>
                  <p className="font-serif font-bold text-gold-300 text-sm mt-0.5">Platinum</p>
                  <p className="text-[11px] text-zinc-300 mt-1">Helipad escort & private butler</p>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-4">
                <Link
                  to="/account/loyalty"
                  className="px-6 py-3 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded shadow-gold-glow"
                >
                  Explore Membership Benefits
                </Link>
                <Link
                  to="/signup"
                  className="text-xs text-zinc-300 hover:text-white underline font-medium"
                >
                  Join Aurelia Privileges (Complimentary)
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-charcoal-800/80 p-8 rounded-2xl border border-gold-400/30 shadow-2xl space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full border border-gold-400/60 bg-charcoal-900 flex items-center justify-center text-gold-400 font-serif font-bold text-xl">
                  A
                </div>
                <div>
                  <p className="font-serif font-bold text-lg text-white">Lord Julian Davenport</p>
                  <p className="text-xs text-gold-400">Platinum Member • 18,450 Aurelia Points</p>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed border-t border-white/10 pt-4">
                "The dedicated butler and helipad transfers make my monthly stays effortless. Aurelia Privileges represents true international luxury."
              </p>
              <div className="pt-2 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Next Tier Reward: Complimentary Overwater Villa Stay</span>
                <span className="text-gold-400 font-bold">92% Progress</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 13 — LOCATION & ARRIVAL                   */}
      {/* ================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600 block">
              Riviera Promontory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              The Crown of the Côte d'Azur
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Situated in an exclusive private bay between Cannes and Saint-Tropez, Aurelia Grand Resort commands an unrivaled cliffside peninsula overlooking the sapphire Mediterranean.
            </p>

            <div className="space-y-3 pt-2 text-xs text-zinc-600">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900">Address:</b> {HOTEL_INFO.address}
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Compass className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900">Nice Côte d'Azur Airport (NCE):</b> {HOTEL_INFO.airportDistance}
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900">Private Helipad:</b> {HOTEL_INFO.helipad}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/location"
                className="px-6 py-3 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-colors inline-block"
              >
                View Directions & Transfers
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-xl border border-sand-300 relative aspect-[16/10] bg-charcoal-900">
            <img
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
              alt="Riviera Coastline Map Location"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <p className="font-serif font-bold text-lg">Baie des Étoiles Sanctuary</p>
                <p className="text-xs text-zinc-300">Protected marine reserve and secluded private beach</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 14 — NEWSLETTER / THE AURELIA JOURNAL       */}
      {/* Handled directly above Footer or in Footer          */}
      {/* ================================================== */}

    </div>
  );
};
