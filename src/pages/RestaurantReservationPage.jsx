import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, Clock, Users, Utensils, CheckCircle2, 
  MapPin, Sparkles, ChevronRight, ArrowLeft 
} from 'lucide-react';
import { RESTAURANTS, HOTEL_INFO } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const RestaurantReservationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { restaurantReservations, setRestaurantReservations, showToast } = useHotel();

  const initialRestaurantId = searchParams.get('restaurant') || 'horizon';

  const [formData, setFormData] = useState({
    restaurantId: initialRestaurantId,
    date: '2026-10-16',
    time: '20:00',
    guests: 2,
    seating: 'Cliffside Window Table',
    occasion: 'Romantic Anniversary',
    specialRequests: '',
    guestName: 'Lord Julian Davenport',
    guestEmail: 'julian.davenport@davenport-estates.co.uk',
    guestPhone: '+44 7911 123456',
  });

  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const timeSlots = [
    '12:30', '13:00', '13:30', '14:00',
    '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const occasions = [
    'Romantic Anniversary', 'Birthday Celebration', 'Intimate Proposal', 
    'Corporate Dinner', 'Family Gathering', 'Casual Haute Gastronomy'
  ];

  const seatingOptions = [
    'Cliffside Window Table (Priority)', 'Outdoor Ocean Terrace', 
    'Intimate Botanical Pergola', "Chef's Counter Front Row"
  ];

  const selectedRest = RESTAURANTS.find(r => r.id === formData.restaurantId) || RESTAURANTS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const resId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRes = {
      id: resId,
      restaurantId: selectedRest.id,
      restaurantName: selectedRest.name,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      seating: formData.seating,
      occasion: formData.occasion,
      specialRequests: formData.specialRequests,
      status: 'Confirmed'
    };

    setRestaurantReservations(prev => [newRes, ...prev]);
    setConfirmedReservation(newRes);
    showToast(`Table confirmed at ${selectedRest.name} for ${formData.date} at ${formData.time}!`, 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-gold-400">
            Fine Dining Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
            Table Reservations
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
            Reserve your cliffside table or private salon across our five distinguished restaurants.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {!confirmedReservation ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-sand-300 p-6 sm:p-10 shadow-luxury space-y-8 text-xs">
            
            {/* Step 1: Restaurant Selector */}
            <div className="space-y-3">
              <label className="font-serif text-lg font-bold text-charcoal-900 block">
                1. Select Restaurant & Atmosphere
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {RESTAURANTS.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setFormData({ ...formData, restaurantId: r.id })}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      formData.restaurantId === r.id 
                        ? 'border-gold-500 bg-gold-50 ring-2 ring-gold-400/20' 
                        : 'border-sand-300 hover:border-gold-400'
                    }`}
                  >
                    <div>
                      <p className="font-serif font-bold text-charcoal-900 text-sm">{r.name}</p>
                      <p className="text-[11px] text-gold-600 mt-0.5">{r.cuisine}</p>
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-2">{r.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Date, Time & Party Size */}
            <div className="space-y-4 pt-6 border-t border-sand-200">
              <label className="font-serif text-lg font-bold text-charcoal-900 block">
                2. Date, Time & Number of Guests
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Date of Dining</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Party Size</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Occasion</label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                  >
                    {occasions.map(occ => <option key={occ} value={occ}>{occ}</option>)}
                  </select>
                </div>
              </div>

              {/* Time Slots Selector */}
              <div className="pt-2">
                <label className="font-semibold text-zinc-700 block mb-2">Available Seating Times</label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, time: slot })}
                      className={`px-3.5 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
                        formData.time === slot
                          ? 'bg-charcoal-900 text-white shadow'
                          : 'bg-sand-100 hover:bg-sand-200 text-zinc-800 border border-sand-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Seating Preference & Special Notes */}
            <div className="space-y-4 pt-6 border-t border-sand-200">
              <label className="font-serif text-lg font-bold text-charcoal-900 block">
                3. Seating Preference & Dietary Notes
              </label>

              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Preferred Location in Restaurant</label>
                <select
                  value={formData.seating}
                  onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                  className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                >
                  {seatingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Special Dietary Needs or Requests</label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="e.g. Shellfish allergies, celebration cake requested, sommelier wine pairing..."
                  className="w-full bg-sand-100 border border-sand-300 rounded-xl p-3 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            {/* Step 4: Contact Details */}
            <div className="space-y-4 pt-6 border-t border-sand-200">
              <label className="font-serif text-lg font-bold text-charcoal-900 block">
                4. Reservation Contact Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Guest Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.guestEmail}
                    onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.guestPhone}
                    onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded-xl shadow-gold-glow transition-all"
            >
              Confirm Table Reservation
            </button>

          </form>
        ) : (
          /* Confirmation Success Card */
          <div className="bg-charcoal-950 text-white rounded-2xl p-8 sm:p-10 border border-gold-500/40 shadow-2xl space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-serif text-xl font-bold">Table Reservation Confirmed</span>
            </div>

            <div className="p-6 bg-charcoal-900 rounded-xl border border-white/10 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-zinc-400">Reservation Reference</span>
                <span className="font-mono text-gold-400 font-bold text-sm">{confirmedReservation.id}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Restaurant</span>
                  <p className="font-bold text-white text-sm">{confirmedReservation.restaurantName}</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Date & Time</span>
                  <p className="font-bold text-white text-sm">{confirmedReservation.date} at {confirmedReservation.time}</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Party Size</span>
                  <p className="font-bold text-white text-sm">{confirmedReservation.guests} Guests</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Seating Area</span>
                  <p className="font-bold text-white text-sm truncate">{confirmedReservation.seating}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={() => showToast('Reservation added to Apple/Google calendar demo', 'success')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold"
              >
                Add to Calendar
              </button>
              <Link
                to="/account"
                className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-wider"
              >
                View in Account Dashboard
              </Link>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
