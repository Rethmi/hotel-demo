import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, MapPin, Award, Utensils, ArrowRight, 
  ChevronRight, Star, Check, Calendar, Phone 
} from 'lucide-react';
import { RESTAURANTS, HOTEL_INFO } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { formatPrice } = useHotel();
  const [activeMenuTab, setActiveMenuTab] = useState('starters');

  const restaurant = RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-2 text-xs text-zinc-500">
        <Link to="/" className="hover:text-charcoal-900">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/dining" className="hover:text-charcoal-900">Dining</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-charcoal-900 font-semibold">{restaurant.name}</span>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-charcoal-950 text-white min-h-[460px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={restaurant.images[0]}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-400 bg-black/40 px-3 py-1 rounded inline-block backdrop-blur-sm">
              {restaurant.cuisine}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              {restaurant.name}
            </h1>
            <p className="font-serif italic text-gold-200 text-base max-w-xl">
              "{restaurant.tagline}"
            </p>
          </div>

          <Link
            to={`/restaurant-reservation?restaurant=${restaurant.id}`}
            className="px-8 py-3.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded shadow-gold-glow transition-all shrink-0 text-center"
          >
            Reserve Your Table
          </Link>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Story, Menus, Gallery */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* About Section */}
          <div className="bg-white p-8 rounded-2xl border border-sand-300 space-y-4 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">The Culinary Philosophy</h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {restaurant.description}
            </p>
            <div className="p-4 bg-sand-100 rounded-xl border border-sand-200 text-xs text-charcoal-900 flex items-center space-x-3">
              <Award className="w-5 h-5 text-gold-600 shrink-0" />
              <div>
                <b className="block">{restaurant.chef}</b>
                <span className="text-zinc-500">Dedicated to sustainability, seasonal Riviera sourcing, and refined European traditions.</span>
              </div>
            </div>
          </div>

          {/* Interactive Menu Tabs */}
          <div className="bg-white p-8 rounded-2xl border border-sand-300 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal-900">À La Carte Offerings</h2>
                <p className="text-xs text-zinc-500">Subject to daily morning catches and garden harvests.</p>
              </div>

              {/* Tabs */}
              <div className="flex space-x-2">
                {['starters', 'mains', 'desserts'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveMenuTab(tab)}
                    className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all ${
                      activeMenuTab === tab
                        ? 'bg-charcoal-900 text-white shadow'
                        : 'bg-sand-100 text-zinc-600 hover:bg-sand-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items List */}
            <div className="divide-y divide-sand-200">
              {restaurant.menu[activeMenuTab]?.map((dish, i) => (
                <div key={i} className="py-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-charcoal-900 text-base">{dish.name}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">{dish.desc}</p>
                  </div>
                  <span className="font-serif font-bold text-gold-600 text-base shrink-0">
                    {formatPrice(dish.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Dishes Visual Showcase */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">Featured Creations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {restaurant.featuredDishes.map((feat, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-sand-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-gold-600">Signature</span>
                    <span className="font-serif font-bold text-charcoal-900">{formatPrice(feat.price)}</span>
                  </div>
                  <h4 className="font-serif font-bold text-charcoal-900 text-sm">{feat.name}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Restaurant Practicalities & Booking CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-sand-300 shadow-luxury space-y-6 sticky top-28 text-xs">
            
            <h3 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-200 pb-3">
              Dining Details
            </h3>

            <div className="space-y-4 text-zinc-600">
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900 block">Service Hours</b>
                  <p>{restaurant.hours}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900 block">Location</b>
                  <p>{restaurant.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Utensils className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900 block">Dress Code</b>
                  <p>{restaurant.dressCode}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900 block">Reservations Concierge</b>
                  <p>{HOTEL_INFO.conciergePhone}</p>
                </div>
              </div>
            </div>

            <Link
              to={`/restaurant-reservation?restaurant=${restaurant.id}`}
              className="w-full py-3.5 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded transition-all block text-center shadow-md"
            >
              Reserve Table Online
            </Link>

            <p className="text-[11px] text-zinc-500 text-center">
              Staying guests enjoy priority cliffside window seat reservations.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};
