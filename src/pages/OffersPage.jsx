import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Check, Calendar, ArrowRight, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { OFFERS } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const OffersPage = () => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams, showToast } = useHotel();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Couples', 'Families', 'Wellness', 'Dining', 'Long Stay', 'Early Bird'];

  const filteredOffers = activeCategory === 'All'
    ? OFFERS
    : OFFERS.filter(o => o.category.toLowerCase() === activeCategory.toLowerCase());

  const handleBookOffer = (offer) => {
    setSearchParams(prev => ({ ...prev, promoCode: offer.promoCode }));
    showToast(`Applied package code: ${offer.promoCode}`, 'success');
    navigate('/booking');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Editorial Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=80"
            alt="Aurelia Exclusive Offers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-gold-400">
            Privileged Invitations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Curated Offers & Packages
          </h1>
          <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
            "Prolong your stay, indulge in Michelin gastronomy, or embark on a bespoke romantic retreat."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        
        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-white rounded-xl border border-sand-300 shadow-sm max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-charcoal-900 text-white shadow'
                  : 'bg-sand-100 hover:bg-sand-200 text-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl overflow-hidden border border-sand-300 hover:border-gold-500/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-charcoal-900/90 text-gold-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                    {offer.discount}
                  </div>
                  <div className="absolute top-3.5 right-3.5 bg-gold-500 text-charcoal-950 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    {offer.badge}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600 block">
                      {offer.category} Package
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {offer.tagline}
                    </p>
                  </div>

                  <div className="text-[11px] text-zinc-500 flex items-center space-x-1.5 py-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{offer.validDates}</span>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-sand-200 text-xs text-zinc-700">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Package Inclusions:</span>
                    {offer.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                        <span className="leading-snug text-[11px]">{inc}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-zinc-400 italic pt-2 border-t border-sand-100">
                    Terms: {offer.terms}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-sand-100 mt-4 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-zinc-400 text-[10px] block">Promo Code</span>
                  <span className="font-mono font-bold text-charcoal-900 bg-sand-100 px-2 py-0.5 rounded text-xs">
                    {offer.promoCode}
                  </span>
                </div>
                <button
                  onClick={() => handleBookOffer(offer)}
                  className="px-5 py-2.5 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-all flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Book Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
