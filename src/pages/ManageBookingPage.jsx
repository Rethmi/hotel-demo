import React, { useState } from 'react';
import { 
  Search, Calendar, ShieldCheck, ArrowRight, CheckCircle2, 
  AlertTriangle, Plus, Trash2, Clock, MapPin, Coffee, Car 
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { ADDONS } from '../data/hotelData';

export const ManageBookingPage = () => {
  const { bookings, setBookings, formatPrice, showToast } = useHotel();
  const [reference, setReference] = useState('AGR-99421-2026');
  const [email, setEmail] = useState('julian.davenport@davenport-estates.co.uk');
  const [activeBooking, setActiveBooking] = useState(bookings[0] || null);
  const [searched, setSearched] = useState(true);

  // Modification state
  const [editingDates, setEditingDates] = useState(false);
  const [newCheckIn, setNewCheckIn] = useState(activeBooking?.checkIn || '2026-10-15');
  const [newCheckOut, setNewCheckOut] = useState(activeBooking?.checkOut || '2026-10-19');

  const handleSearch = (e) => {
    e.preventDefault();
    const found = bookings.find(b => b.id.toUpperCase() === reference.trim().toUpperCase());
    if (found) {
      setActiveBooking(found);
      setSearched(true);
      showToast('Reservation found', 'success');
    } else {
      showToast('No booking found with this reference and email', 'error');
    }
  };

  const handleSaveDates = () => {
    if (!activeBooking) return;
    setBookings(prev => prev.map(b => b.id === activeBooking.id ? { ...b, checkIn: newCheckIn, checkOut: newCheckOut } : b));
    setActiveBooking({ ...activeBooking, checkIn: newCheckIn, checkOut: newCheckOut });
    setEditingDates(false);
    showToast('Reservation dates updated successfully', 'success');
  };

  const handleCancelBooking = () => {
    if (!activeBooking) return;
    const confirm = window.confirm("Are you sure you wish to cancel this reservation? Full refund will be credited.");
    if (!confirm) return;

    setBookings(prev => prev.map(b => b.id === activeBooking.id ? { ...b, status: 'Cancelled (Full Refund Processed)' } : b));
    setActiveBooking({ ...activeBooking, status: 'Cancelled (Full Refund Processed)' });
    showToast('Reservation cancelled. Refund has been initiated.', 'info');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-gold-400">
          Guest Self-Service
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
          Manage Your Reservation
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
          Modify your stay dates, request airport chauffeur transfers, or update special requirements.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* Search Booking Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sand-300 shadow-sm space-y-4 text-xs">
          <h3 className="font-serif text-lg font-bold text-charcoal-900">Find Your Reservation</h3>
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Booking Reference ID</label>
              <input
                type="text"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. AGR-99421-2026"
                className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 font-mono uppercase focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Guest Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email used at booking"
                className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-colors flex items-center justify-center space-x-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Lookup Booking</span>
            </button>
          </form>
        </div>

        {/* Booking Details & Modification Controls */}
        {activeBooking && (
          <div className="bg-white rounded-2xl border border-sand-300 p-6 sm:p-10 shadow-luxury space-y-8 text-xs text-charcoal-900 animate-fade-in">
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 pb-5">
              <div>
                <span className="font-mono text-gold-600 font-bold text-sm">{activeBooking.id}</span>
                <h2 className="font-serif text-2xl font-bold text-charcoal-900 mt-0.5">{activeBooking.room.name}</h2>
                <p className="text-zinc-500">{activeBooking.room.view} • {activeBooking.room.bed}</p>
              </div>
              <span className={`px-3 py-1 rounded-full font-bold uppercase text-[10px] ${
                activeBooking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-rose-50 text-rose-800'
              }`}>
                {activeBooking.status}
              </span>
            </div>

            {/* Dates & Modification */}
            <div className="p-5 bg-sand-100 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-charcoal-900 flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-gold-600" />
                  <span>Stay Dates</span>
                </span>
                {!editingDates && activeBooking.status === 'Confirmed' && (
                  <button
                    onClick={() => setEditingDates(true)}
                    className="text-gold-600 hover:text-gold-700 font-bold underline"
                  >
                    Change Dates
                  </button>
                )}
              </div>

              {!editingDates ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase block">Check-in</span>
                    <b className="text-sm font-medium">{activeBooking.checkIn}</b>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase block">Check-out</span>
                    <b className="text-sm font-medium">{activeBooking.checkOut}</b>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase block">Duration</span>
                    <b className="text-sm font-medium">{activeBooking.nights} Nights</b>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">New Check-in</label>
                    <input
                      type="date"
                      value={newCheckIn}
                      onChange={(e) => setNewCheckIn(e.target.value)}
                      className="w-full bg-white border border-sand-300 rounded p-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">New Check-out</label>
                    <input
                      type="date"
                      value={newCheckOut}
                      onChange={(e) => setNewCheckOut(e.target.value)}
                      className="w-full bg-white border border-sand-300 rounded p-2 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => setEditingDates(false)}
                      className="px-3 py-1.5 text-zinc-600 hover:text-charcoal-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveDates}
                      className="px-4 py-1.5 bg-charcoal-900 text-white font-bold rounded text-xs"
                    >
                      Save Updated Dates
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cancellation Policy Banner */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start space-x-3 text-emerald-800">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <b>Complimentary Cancellation Terms:</b>
                <p className="text-[11px] mt-0.5">
                  You are eligible to cancel this stay free of charge up to 48 hours prior to arrival ({activeBooking.canCancelUntil}).
                </p>
              </div>
            </div>

            {/* Cancel Action */}
            {activeBooking.status === 'Confirmed' && (
              <div className="pt-4 border-t border-sand-200 flex justify-end">
                <button
                  onClick={handleCancelBooking}
                  className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Cancel Reservation</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
