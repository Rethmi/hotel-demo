import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Award, Utensils, ArrowRight, Star } from 'lucide-react';
import { RESTAURANTS } from '../data/hotelData';

export const DiningPage = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Editorial Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
            alt="Aurelia Haute Dining"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
            Culinary Artistry
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Dining & Lounges
          </h1>
          <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
            "Five extraordinary culinary stages celebrating Mediterranean seafood, open-flame grilling, and vintage champagnes."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Intro Highlight */}
        <div className="bg-white rounded-2xl border border-sand-300 p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-zinc-600">
          <div className="space-y-1">
            <span className="font-serif text-2xl font-bold text-charcoal-900 block">2 Michelin Stars</span>
            <p>Led by Executive Chef Marco Valerio at Horizon</p>
          </div>
          <div className="space-y-1 border-y md:border-y-0 md:border-x border-sand-200 py-3 md:py-0">
            <span className="font-serif text-2xl font-bold text-charcoal-900 block">12,000+ Bottles</span>
            <p>Historic 1934 limestone wine cellar curated by Head Sommelier Jean-Luc</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-2xl font-bold text-charcoal-900 block">Farm-to-Table</span>
            <p>Organic herbs & heirloom citrus harvested from our rooftop estate gardens</p>
          </div>
        </div>

        {/* List of Restaurants */}
        <div className="space-y-12">
          {RESTAURANTS.map((restaurant, idx) => (
            <div
              key={restaurant.id}
              className={`bg-white rounded-2xl border border-sand-300 overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Box */}
              <div className="lg:col-span-5 relative min-h-[300px] overflow-hidden group">
                <img
                  src={restaurant.images[0]}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-charcoal-950/80 text-gold-400 px-3 py-1 rounded text-xs font-semibold backdrop-blur-sm">
                  {restaurant.cuisine}
                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600">
                      {restaurant.location}
                    </span>
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                      <span className="font-bold text-charcoal-900">{restaurant.rating}</span>
                      <span className="text-zinc-400">({restaurant.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                    {restaurant.name}
                  </h3>
                  <p className="font-serif italic text-sm text-gold-700">
                    "{restaurant.tagline}"
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {restaurant.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-sand-200 text-xs text-zinc-600">
                    <div className="flex items-start space-x-2">
                      <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                      <div>
                        <b>Opening Hours:</b>
                        <p className="text-[11px] text-zinc-500">{restaurant.hours}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Utensils className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                      <div>
                        <b>Dress Code:</b>
                        <p className="text-[11px] text-zinc-500">{restaurant.dressCode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Featured Dishes Pills */}
                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-2">Signature Offerings:</span>
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      {restaurant.featuredDishes.map((dish, dIdx) => (
                        <span key={dIdx} className="px-2.5 py-1 bg-sand-100 rounded text-charcoal-900 font-medium border border-sand-200">
                          {dish.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-sand-200 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to={`/dining/${restaurant.id}`}
                    className="text-xs font-bold uppercase tracking-wider text-charcoal-900 hover:text-gold-600 flex items-center space-x-1"
                  >
                    <span>View À La Carte & Wine Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to={`/restaurant-reservation?restaurant=${restaurant.id}`}
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded shadow-gold-glow transition-all"
                  >
                    Reserve Table
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
