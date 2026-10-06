import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Calendar, Bookmark, Bell, Award, ShieldCheck, 
  Settings, LogOut, Check, ArrowRight, Clock, MapPin, 
  Coffee, Sparkles, QrCode, Download, Edit 
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { ROOMS } from '../data/hotelData';

export const AccountPage = () => {
  const navigate = useNavigate();
  const { 
    user, setUser, isAuthenticated, setIsAuthenticated, 
    bookings, setBookings, restaurantReservations, 
    spaAppointments, wishlist, notifications, formatPrice, showToast 
  } = useHotel();

  const [activeTab, setActiveTab] = useState('overview'); // overview | bookings | dining | spa | loyalty | profile

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed');
  const pastBookings = bookings.filter(b => b.status === 'Completed' || b.status.includes('Cancelled'));

  const handleSignOut = () => {
    setIsAuthenticated(false);
    showToast('Signed out of Aurelia account', 'info');
    navigate('/signin');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Profile Bar */}
      <div className="bg-charcoal-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-gold-500/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gold-400 shadow-xl"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl font-bold">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40 text-[10px] font-bold uppercase tracking-wider">
                  {user.membershipTier} Member
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">{user.email} • Member since {user.memberSince}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs">
            <div className="bg-charcoal-900 border border-gold-500/30 px-4 py-2.5 rounded-xl text-center">
              <span className="text-zinc-400 text-[10px] uppercase block font-bold">Privilege Points</span>
              <span className="font-serif text-lg font-bold text-gold-400">{user.points.toLocaleString()}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-1.5 px-3.5 py-2 text-zinc-300 hover:text-white border border-white/20 hover:border-gold-400 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Navigation Tabs */}
        <div className="lg:col-span-3 space-y-2 text-xs">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: User },
            { id: 'bookings', label: `My Stays (${bookings.length})`, icon: Calendar },
            { id: 'dining', label: `Table Reservations (${restaurantReservations.length})`, icon: Coffee },
            { id: 'spa', label: `Spa Rituals (${spaAppointments.length})`, icon: Sparkles },
            { id: 'loyalty', label: 'Aurelia Privileges', icon: Award },
            { id: 'profile', label: 'Guest Profile & Preferences', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold flex items-center space-x-3 transition-all ${
                activeTab === tab.id
                  ? 'bg-charcoal-900 text-gold-300 shadow-md'
                  : 'bg-white hover:bg-sand-100 text-zinc-700 border border-sand-300'
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          ))}

          <div className="pt-4">
            <Link
              to="/booking"
              className="w-full py-3 bg-gradient-to-r from-gold-300 to-gold-500 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-gold-glow block text-center"
            >
              Book Another Sanctuary
            </Link>
          </div>
        </div>

        {/* Right Content Panels */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Upcoming Reservation Hero Card */}
              {upcomingBookings.length > 0 && (
                <div className="bg-white rounded-2xl border border-gold-500/40 p-6 sm:p-8 shadow-luxury space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-200 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600 block">Upcoming Stay</span>
                      <h3 className="font-serif text-2xl font-bold text-charcoal-900">{upcomingBookings[0].room.name}</h3>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold uppercase">
                      Status: {upcomingBookings[0].status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-600">
                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase block">Dates of Stay</span>
                      <b className="font-medium text-charcoal-900 text-sm">{upcomingBookings[0].checkIn} — {upcomingBookings[0].checkOut}</b>
                      <p className="text-[11px] text-zinc-500">{upcomingBookings[0].nights} Nights</p>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase block">Booking ID</span>
                      <b className="font-mono text-charcoal-900 text-sm">{upcomingBookings[0].id}</b>
                      <p className="text-[11px] text-zinc-500">Total: {formatPrice(upcomingBookings[0].total)}</p>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-[10px] uppercase block">Pre-Arrival Services</span>
                      <p className="text-[11px] text-gold-700 font-medium">Chauffeur & Champagne Breakfast assigned</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      to="/manage-booking"
                      className="px-4 py-2 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-colors"
                    >
                      Modify or Manage Stay
                    </Link>
                    <Link
                      to="/room-service"
                      className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-charcoal-900 font-semibold text-xs rounded border border-sand-300 transition-colors"
                    >
                      In-Room Dining
                    </Link>
                  </div>
                </div>
              )}

              {/* Quick Summary Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-5 rounded-xl border border-sand-300 shadow-sm space-y-1">
                  <span className="text-zinc-400 font-medium">Total Stays Completed</span>
                  <p className="font-serif text-3xl font-bold text-charcoal-900">{bookings.length}</p>
                  <p className="text-[11px] text-zinc-500">Across Côte d'Azur sanctuaries</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-sand-300 shadow-sm space-y-1">
                  <span className="text-zinc-400 font-medium">Saved in Wishlist</span>
                  <p className="font-serif text-3xl font-bold text-charcoal-900">{wishlist.length}</p>
                  <Link to="/account/wishlist" className="text-[11px] text-gold-600 underline">View saved sanctuaries</Link>
                </div>
                <div className="bg-white p-5 rounded-xl border border-sand-300 shadow-sm space-y-1">
                  <span className="text-zinc-400 font-medium">Next Tier Target</span>
                  <p className="font-serif text-3xl font-bold text-charcoal-900">Overwater Villa</p>
                  <p className="text-[11px] text-emerald-700 font-medium">1,550 points remaining</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MY BOOKINGS / STAYS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-charcoal-900">Your Booking History</h2>
              
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white p-6 rounded-2xl border border-sand-300 shadow-sm space-y-4 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-200 pb-3">
                      <div>
                        <span className="font-mono font-bold text-gold-600">{booking.id}</span>
                        <h4 className="font-serif text-xl font-bold text-charcoal-900 mt-0.5">{booking.room.name}</h4>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                        booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800' : 'bg-sand-100 text-zinc-600'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-zinc-600">
                      <div>
                        <span className="text-zinc-400 text-[10px] uppercase block">Check-in</span>
                        <b className="text-charcoal-900">{booking.checkIn}</b>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[10px] uppercase block">Check-out</span>
                        <b className="text-charcoal-900">{booking.checkOut}</b>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[10px] uppercase block">Guests</span>
                        <b className="text-charcoal-900">{booking.guests.adults} Adults</b>
                      </div>
                      <div>
                        <span className="text-zinc-400 text-[10px] uppercase block">Total</span>
                        <b className="text-gold-600 font-bold">{formatPrice(booking.total)}</b>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <p className="text-[11px] text-zinc-400 italic">{booking.notes}</p>
                      <button
                        onClick={() => showToast(`Invoice downloaded for booking ${booking.id}`, 'success')}
                        className="text-xs font-semibold text-charcoal-900 hover:text-gold-600 underline"
                      >
                        Download PDF Folio
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RESTAURANT RESERVATIONS */}
          {activeTab === 'dining' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900">Fine Dining Table Bookings</h2>
                <Link
                  to="/restaurant-reservation"
                  className="px-4 py-2 bg-charcoal-900 text-white rounded text-xs font-bold uppercase tracking-wider"
                >
                  Reserve New Table
                </Link>
              </div>

              <div className="space-y-4">
                {restaurantReservations.map((res) => (
                  <div key={res.id} className="bg-white p-6 rounded-2xl border border-sand-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-mono text-gold-600 text-[11px] font-bold">{res.id}</span>
                      <h4 className="font-serif text-lg font-bold text-charcoal-900">{res.restaurantName}</h4>
                      <p className="text-zinc-600">{res.date} at {res.time} • {res.guests} Guests • {res.seating}</p>
                      {res.specialRequests && <p className="text-zinc-400 italic text-[11px]">{res.specialRequests}</p>}
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded font-bold uppercase text-[10px]">
                      {res.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SPA APPOINTMENTS */}
          {activeTab === 'spa' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900">Spa & Wellness Rituals</h2>
                <Link
                  to="/spa"
                  className="px-4 py-2 bg-charcoal-900 text-white rounded text-xs font-bold uppercase tracking-wider"
                >
                  Book Treatment
                </Link>
              </div>

              <div className="space-y-4">
                {spaAppointments.map((spa) => (
                  <div key={spa.id} className="bg-white p-6 rounded-2xl border border-sand-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-mono text-gold-600 text-[11px] font-bold">{spa.id}</span>
                      <h4 className="font-serif text-lg font-bold text-charcoal-900">{spa.serviceName}</h4>
                      <p className="text-zinc-600">{spa.date} at {spa.time} ({spa.duration}) • Practitioner: {spa.therapist}</p>
                      <p className="text-gold-600 font-bold">{formatPrice(spa.price)}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded font-bold uppercase text-[10px]">
                      {spa.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LOYALTY TIER & REWARDS */}
          {activeTab === 'loyalty' && (
            <div className="space-y-6">
              <div className="bg-charcoal-950 text-white p-8 rounded-2xl border border-gold-400/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block">Current Status</span>
                    <h3 className="font-serif text-3xl font-bold">Aurelia {user.membershipTier} Member</h3>
                  </div>
                  <span className="font-serif text-2xl font-bold text-gold-400">{user.points.toLocaleString()} Points</span>
                </div>
                
                {/* Tier progress bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Platinum Tier (15,000 pts)</span>
                    <span>Diamond Heritage Tier (20,000 pts)</span>
                  </div>
                  <div className="w-full h-2 bg-charcoal-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider block">Your VIP Perks:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                    {user.vipPerks.map((p, i) => (
                      <p key={i} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>{p}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE & PREFERENCES */}
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-2xl border border-sand-300 space-y-6 text-xs">
              <h2 className="font-serif text-2xl font-bold text-charcoal-900">Personal Hospitality Profile</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Mobile Telephone</label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Preferred Newspaper / Language</label>
                  <select className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900">
                    <option>Financial Times (English)</option>
                    <option>Le Figaro (French)</option>
                    <option>Frankfurter Allgemeine (German)</option>
                    <option>The Wall Street Journal (English)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => showToast('Guest profile and hospitality preferences updated', 'success')}
                className="px-6 py-2.5 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-colors"
              >
                Save Preferences
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
