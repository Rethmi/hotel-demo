import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Clock, Star, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { EXPERIENCES, HOTEL_INFO } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const ExperiencesPage = () => {
  const { formatPrice, showToast } = useHotel();
  const [selectedExp, setSelectedExp] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [expDate, setExpDate] = useState('2026-10-18');
  const [guestsCount, setGuestsCount] = useState(2);

  const handleBookExp = (exp) => {
    setSelectedExp(exp);
    setBookingModalOpen(true);
  };

  const confirmExpBooking = (e) => {
    e.preventDefault();
    setBookingModalOpen(false);
    showToast(`Experience reserved: ${selectedExp.name} for ${guestsCount} guests on ${expDate}!`, 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Editorial Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=2000&q=80"
            alt="Aurelia Curated Experiences"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
            Riviera Expeditions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Curated Island & Coastal Experiences
          </h1>
          <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
            "Private yacht charters, marine sanctuary diving, Michelin cooking masterclasses, and nocturnal wine tastings."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl overflow-hidden border border-sand-300 hover:border-gold-500/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-charcoal-950/80 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-sm">
                    {exp.duration}
                  </div>
                  <div className="absolute top-3 right-3 bg-gold-500 text-charcoal-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {exp.difficulty}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600">
                      {exp.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors">
                      {exp.name}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-sand-200 text-xs text-zinc-600">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Inclusions:</span>
                    {exp.inclusions.slice(0, 3).map((inc, i) => (
                      <p key={i} className="flex items-center space-x-2 text-[11px] truncate">
                        <Check className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </p>
                    ))}
                  </div>

                  <p className="text-[11px] text-zinc-500 pt-1">
                    <b>Schedule:</b> {exp.availability}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-sand-100 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 block">From</span>
                  <span className="font-serif font-bold text-charcoal-900 text-xl">
                    {formatPrice(exp.price)}
                  </span>
                </div>

                <button
                  onClick={() => handleBookExp(exp)}
                  className="px-5 py-2.5 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-all shadow-sm"
                >
                  Book Activity
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Booking Modal */}
      {bookingModalOpen && selectedExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-gold-500/40 shadow-2xl p-6 sm:p-8 space-y-5 text-xs text-charcoal-900">
            <div className="flex items-center justify-between border-b border-sand-200 pb-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-gold-600">Reserve Experience</p>
                <h3 className="font-serif text-lg font-bold">{selectedExp.name}</h3>
              </div>
              <button onClick={() => setBookingModalOpen(false)} className="text-zinc-400 hover:text-charcoal-900">✕</button>
            </div>

            <div className="p-3 bg-sand-100 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-semibold">{selectedExp.duration} • {selectedExp.category}</p>
                <p className="text-[11px] text-zinc-500">Scheduled: {selectedExp.availability}</p>
              </div>
              <span className="font-serif font-bold text-gold-600 text-lg">{formatPrice(selectedExp.price)}</span>
            </div>

            <form onSubmit={confirmExpBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={expDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setExpDate(e.target.value)}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Guests</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs"
                  >
                    {[1, 2, 3, 4, 6].map(n => <option key={n} value={n}>{n} Guests</option>)}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-gold-300 to-gold-500 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded shadow-gold-glow"
              >
                Confirm Experience Reservation
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
