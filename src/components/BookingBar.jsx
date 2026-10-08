import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Users, Tag, Search, ShieldCheck, 
  ChevronDown, Plus, Minus, Sparkles, BedDouble 
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const BookingBar = ({ compact = false, className = "" }) => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useHotel();
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/booking');
  };

  const updateGuests = (field, delta) => {
    setSearchParams(prev => {
      const current = prev[field];
      const updated = Math.max(field === 'adults' || field === 'roomsCount' ? 1 : 0, current + delta);
      return { ...prev, [field]: updated };
    });
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      <div className="bg-[#111319]/95 backdrop-blur-xl border border-white/10 rounded-xl p-5 sm:p-6 shadow-2xl">
        
        {/* Top Guarantee Headline */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.08] text-xs text-zinc-300">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-sans font-medium tracking-[0.14em] uppercase text-gold-300">
              Direct Reservation Sanctuary
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400 hidden sm:inline text-[11px]">
              Best Rate Guarantee & Complimentary Arrival Privileges
            </span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] text-zinc-400">
            <span className="text-zinc-300 font-medium">Flexible Cancellation</span>
            <span className="text-zinc-600">•</span>
            <span>Instant Confirmation</span>
          </div>
        </div>

        {/* Search Form Fields Grid */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end">
          
          {/* Field 1: Check-in Date */}
          <div className="lg:col-span-3 space-y-1.5">
            <label className="text-[11px] font-semibold text-zinc-300 tracking-wider uppercase flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>Check-in Date</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={searchParams.checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                className="w-full bg-charcoal-800/90 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 transition-colors cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Field 2: Check-out Date */}
          <div className="lg:col-span-3 space-y-1.5">
            <label className="text-[11px] font-semibold text-zinc-300 tracking-wider uppercase flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>Check-out Date</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={searchParams.checkOut}
                min={searchParams.checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                className="w-full bg-charcoal-800/90 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 transition-colors cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Field 3: Guests & Rooms Selector Popover */}
          <div className="lg:col-span-3 space-y-1.5 relative">
            <label className="text-[11px] font-semibold text-zinc-300 tracking-wider uppercase flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-gold-400" />
              <span>Guests & Rooms</span>
            </label>
            <button
              type="button"
              onClick={() => setGuestsOpen(!guestsOpen)}
              className="w-full bg-charcoal-800/90 border border-white/15 hover:border-gold-400/50 rounded-lg px-3.5 py-2.5 text-sm text-white flex items-center justify-between text-left transition-colors"
            >
              <span className="truncate">
                {searchParams.adults} {searchParams.adults === 1 ? 'Adult' : 'Adults'}
                {searchParams.children > 0 ? `, ${searchParams.children} Ch.` : ''} • {searchParams.roomsCount} {searchParams.roomsCount === 1 ? 'Room' : 'Rooms'}
              </span>
              <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 ml-1" />
            </button>

            {/* Guests Dropdown Popover */}
            {guestsOpen && (
              <div className="absolute top-full left-0 right-0 sm:w-72 mt-2 bg-charcoal-900 border border-gold-500/40 rounded-xl shadow-2xl p-4 z-50 text-xs space-y-4 animate-fade-in">
                
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Adults</p>
                    <p className="text-[11px] text-zinc-400">Ages 13 and above</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('adults', -1)}
                      disabled={searchParams.adults <= 1}
                      className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:border-gold-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-white w-4 text-center">{searchParams.adults}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('adults', 1)}
                      disabled={searchParams.adults >= 8}
                      className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:border-gold-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Children</p>
                    <p className="text-[11px] text-zinc-400">Ages 0 to 12</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('children', -1)}
                      disabled={searchParams.children <= 0}
                      className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:border-gold-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-white w-4 text-center">{searchParams.children}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('children', 1)}
                      disabled={searchParams.children >= 6}
                      className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:border-gold-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div>
                    <p className="font-semibold text-white">Number of Rooms</p>
                    <p className="text-[11px] text-zinc-400">Suites or Villas</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('roomsCount', -1)}
                      disabled={searchParams.roomsCount <= 1}
                      className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:border-gold-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-white w-4 text-center">{searchParams.roomsCount}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('roomsCount', 1)}
                      disabled={searchParams.roomsCount >= 4}
                      className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:border-gold-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setGuestsOpen(false)}
                  className="w-full py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold uppercase tracking-wider rounded text-[11px]"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Field 4: Search CTA Button */}
          <div className="lg:col-span-3">
            <button
              type="submit"
              className="w-full h-[42px] bg-gold-400 hover:bg-gold-300 text-charcoal-950 font-semibold uppercase tracking-[0.14em] text-xs rounded-lg transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Check Availability</span>
            </button>
          </div>

        </form>

        {/* Promo code toggle */}
        <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            {!promoOpen ? (
              <button
                type="button"
                onClick={() => setPromoOpen(true)}
                className="text-gold-400 hover:text-gold-300 underline font-medium flex items-center space-x-1"
              >
                <Tag className="w-3 h-3" />
                <span>Have a Promo Code or Special Offer?</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="e.g. STAY3PAY2, VIP2026"
                  value={searchParams.promoCode}
                  onChange={(e) => setSearchParams({ ...searchParams, promoCode: e.target.value.toUpperCase() })}
                  className="bg-charcoal-800 border border-gold-400/50 rounded px-2.5 py-1 text-white text-xs uppercase focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setPromoOpen(false)}
                  className="text-zinc-400 hover:text-white text-[11px]"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="text-zinc-400 text-[11px] flex items-center space-x-2">
            <span>Special rates available for Aurelia Privileges Members</span>
          </div>
        </div>

      </div>
    </div>
  );
};
