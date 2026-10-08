import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Users, Maximize2, Bed, Eye, Bookmark, ShieldCheck, 
  Check, Star, Coffee, Wifi, Tv, Wind, Lock, Bath, 
  Sparkles, Calendar, ChevronRight, X, ArrowLeft, ArrowRight 
} from 'lucide-react';
import { ROOMS, ADDONS, REVIEWS } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';
import { RoomCard } from '../components/RoomCard';

export const RoomDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    formatPrice, isInWishlist, toggleWishlist, 
    searchParams, setSearchParams, setSelectedRoom, calculateNights 
  } = useHotel();

  // Find room by id or slug
  const room = ROOMS.find(r => r.id === id) || ROOMS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);

  const wishlisted = isInWishlist(room.id);
  const nights = calculateNights();
  const baseTotal = room.price * nights;

  const toggleAddon = (addonId) => {
    setSelectedAddonIds(prev => 
      prev.includes(addonId) ? prev.filter(i => i !== addonId) : [...prev, addonId]
    );
  };

  const addonsTotal = selectedAddonIds.reduce((sum, addId) => {
    const item = ADDONS.find(a => a.id === addId);
    return sum + (item ? item.price * (item.perPerson ? searchParams.adults : 1) : 0);
  }, 0);

  const grandTotal = baseTotal + addonsTotal;

  const handleProceedToBooking = () => {
    setSelectedRoom(room);
    navigate('/booking');
  };

  const similarRooms = ROOMS.filter(r => r.id !== room.id).slice(0, 3);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Breadcrumbs & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center space-x-2">
          <Link to="/" className="hover:text-charcoal-900">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/rooms" className="hover:text-charcoal-900">Rooms & Suites</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-charcoal-900 font-semibold truncate">{room.name}</span>
        </div>

        <button
          onClick={() => toggleWishlist(room.id)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs transition-colors ${
            wishlisted 
              ? 'bg-gold-500 text-charcoal-950 border-gold-500 font-bold' 
              : 'bg-white border-sand-300 text-zinc-700 hover:border-gold-500'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
          <span>{wishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
        </button>
      </div>

      {/* Main Hero Image Gallery (Mosaic / Editorial Showcase) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 aspect-[16/9] sm:aspect-[21/9] max-h-[580px] rounded-2xl overflow-hidden shadow-luxury">
          
          {/* Main Large Image */}
          <div 
            onClick={() => setLightboxOpen(true)}
            className="lg:col-span-8 relative cursor-pointer group overflow-hidden bg-charcoal-950"
          >
            <img
              src={room.images[activeImageIndex]}
              alt={room.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <button className="absolute bottom-4 left-4 bg-charcoal-950/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded flex items-center space-x-2 border border-white/20">
              <Eye className="w-3.5 h-3.5 text-gold-400" />
              <span>Click to Expand Lightbox ({room.images.length} Photos)</span>
            </button>
          </div>

          {/* Thumbnail Stack */}
          <div className="hidden lg:grid lg:col-span-4 grid-rows-3 gap-3">
            {room.images.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx + 1)}
                className={`relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                  activeImageIndex === idx + 1 ? 'border-gold-500' : 'border-transparent hover:opacity-90'
                }`}
              >
                <img src={img} alt={`${room.name} view ${idx + 2}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/98 backdrop-blur-xl flex flex-col justify-between p-6 animate-fade-in">
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div>
              <p className="font-serif text-lg font-bold">{room.name}</p>
              <p className="text-xs text-zinc-400">Photo {activeImageIndex + 1} of {room.images.length}</p>
            </div>
            <button onClick={() => setLightboxOpen(false)} className="p-2 text-zinc-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative my-4">
            <button
              onClick={() => setActiveImageIndex((activeImageIndex - 1 + room.images.length) % room.images.length)}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <img
              src={room.images[activeImageIndex]}
              alt={room.name}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setActiveImageIndex((activeImageIndex + 1) % room.images.length)}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center space-x-3 overflow-x-auto py-2">
            {room.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setActiveImageIndex(i)}
                className={`w-16 h-12 object-cover rounded cursor-pointer border-2 ${activeImageIndex === i ? 'border-gold-400 scale-105' : 'border-transparent opacity-60'}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content & Sticky Booking Card Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Room Details, Amenities, Policies, Reviews */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Header Title & Specs */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600 bg-gold-500/10 px-3 py-1 rounded">
                {room.category}
              </span>
              <div className="flex items-center space-x-1.5 text-xs text-zinc-600 bg-white px-3 py-1 rounded-full border border-sand-300">
                <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                <span className="font-bold text-charcoal-900">{room.rating}</span>
                <span>({room.reviewsCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 leading-tight">
              {room.name}
            </h1>
            <p className="text-zinc-600 text-base leading-relaxed">
              {room.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-xl border border-sand-300 shadow-sm text-xs text-zinc-700">
              <div className="space-y-1">
                <span className="text-zinc-400 uppercase tracking-wider block text-[10px]">Room Size</span>
                <p className="font-serif font-bold text-charcoal-900 text-sm">{room.sizeSqM} m² / {room.sizeSqFt} ft²</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-400 uppercase tracking-wider block text-[10px]">Occupancy</span>
                <p className="font-serif font-bold text-charcoal-900 text-sm">Up to {room.maxGuests} Guests</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-400 uppercase tracking-wider block text-[10px]">Bed Type</span>
                <p className="font-serif font-bold text-charcoal-900 text-sm truncate">{room.bed}</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-400 uppercase tracking-wider block text-[10px]">View</span>
                <p className="font-serif font-bold text-charcoal-900 text-sm truncate">{room.view}</p>
              </div>
            </div>
          </div>

          {/* Bespoke Architectural Features */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">Suite Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {room.features.map((feat, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-sand-300 flex items-start space-x-3 text-xs text-zinc-700">
                  <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comprehensive Categorized Amenities */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">Amenities & Appointments</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {room.amenities.map((amenity, i) => (
                <div key={i} className="p-3 bg-white rounded-lg border border-sand-200 flex items-center space-x-2 text-xs text-zinc-700">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complimentary Privileges Included */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">What's Included with Your Stay</h2>
            <div className="p-6 bg-gold-500/10 border border-gold-400/40 rounded-xl space-y-3 text-xs text-charcoal-900">
              {room.includedServices.map((inc, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Check className="w-4 h-4 text-gold-600 shrink-0" />
                  <span className="font-medium text-sm">{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Add-ons & Enhancement Options */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">Enhance Your Stay</h2>
            <p className="text-xs text-zinc-500">Select bespoke services to be prepared in your suite prior to arrival.</p>
            <div className="space-y-3">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);
                return (
                  <div 
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-gold-50 border-gold-500 shadow-sm' 
                        : 'bg-white border-sand-300 hover:border-gold-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by div
                        className="w-4 h-4 accent-gold-500"
                      />
                      <div>
                        <p className="font-semibold text-charcoal-900 text-xs sm:text-sm">{addon.name}</p>
                        <p className="text-zinc-500 text-[11px] leading-relaxed">{addon.description}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="font-serif font-bold text-charcoal-900 text-sm">
                        +{formatPrice(addon.price)}
                      </span>
                      {addon.perPerson && <span className="text-[10px] text-zinc-400 block">/ guest</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Policies & Cancellation */}
          <div className="space-y-4 pt-4 border-t border-sand-300">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">Hotel Policies & Cancellation</h2>
            <div className="space-y-3 text-xs text-zinc-600 bg-white p-6 rounded-xl border border-sand-300">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900">Cancellation Guarantee:</b>
                  <p className="mt-0.5">{room.cancellationPolicy}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 pt-2 border-t border-sand-200">
                <Calendar className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900">Check-in / Check-out Times:</b>
                  <p className="mt-0.5">Check-in from 15:00. Check-out until 12:00. Priority early check-in and late checkout available upon request.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Reviews for this Room */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">Guest Reflections</h2>
            <div className="space-y-4">
              {REVIEWS.slice(0, 2).map((rev) => (
                <div key={rev.id} className="p-6 bg-white rounded-xl border border-sand-300 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex text-gold-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-zinc-400">{rev.date}</span>
                  </div>
                  <h4 className="font-serif font-bold text-charcoal-900 text-sm">"{rev.title}"</h4>
                  <p className="text-xs text-zinc-600 italic">"{rev.comment}"</p>
                  <p className="text-[11px] font-semibold text-zinc-500">{rev.name} ({rev.country})</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Booking Engine Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white border border-gold-500/40 rounded-2xl p-6 sm:p-7 shadow-luxury space-y-6">
            
            {/* Price Header */}
            <div className="flex items-baseline justify-between border-b border-sand-200 pb-4">
              <div>
                <span className="text-xs text-zinc-400">Nightly rate from</span>
                <div className="flex items-baseline space-x-1">
                  <span className="font-serif text-3xl font-bold text-charcoal-900">{formatPrice(room.price)}</span>
                  <span className="text-xs text-zinc-500">/ night</span>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase rounded">
                  Best Rate Guaranteed
                </span>
              </div>
            </div>

            {/* Date Pickers Form */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-sand-100 rounded-lg border border-sand-300">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Check-in</label>
                  <input
                    type="date"
                    value={searchParams.checkIn}
                    onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                    className="w-full bg-transparent font-medium text-charcoal-900 focus:outline-none"
                  />
                </div>
                <div className="p-2.5 bg-sand-100 rounded-lg border border-sand-300">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">Check-out</label>
                  <input
                    type="date"
                    value={searchParams.checkOut}
                    onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                    className="w-full bg-transparent font-medium text-charcoal-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-sand-100 rounded-lg border border-sand-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">Guests</span>
                  <span className="font-medium text-charcoal-900">{searchParams.adults} Adults, {searchParams.children} Children</span>
                </div>
                <Users className="w-4 h-4 text-gold-600" />
              </div>
            </div>

            {/* Price Breakdown Calculation */}
            <div className="space-y-2 pt-2 border-t border-sand-200 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>{formatPrice(room.price)} × {nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                <span className="font-medium text-charcoal-900">{formatPrice(baseTotal)}</span>
              </div>
              {addonsTotal > 0 && (
                <div className="flex justify-between text-gold-700">
                  <span>Selected Enhancements ({selectedAddonIds.length})</span>
                  <span className="font-medium">+{formatPrice(addonsTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-500 text-[11px]">
                <span>Taxes & Service Fees (Included)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-sand-300 text-sm font-bold text-charcoal-900">
                <span className="font-serif text-base">Grand Total</span>
                <span className="font-serif text-2xl text-gold-600">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Book Now Primary Action CTA */}
            <button
              onClick={handleProceedToBooking}
              className="w-full py-3.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Reserve This Sanctuary
            </button>

            <div className="text-center space-y-1 text-[11px] text-zinc-500">
              <p className="flex items-center justify-center space-x-1 text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>No charges until check-in or cancellation window</span>
              </p>
              <p>Instant booking confirmation sent to your email</p>
            </div>

          </div>
        </div>

      </div>

      {/* Similar Rooms Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-sand-300 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-gold-600">Alternative Sanctuaries</span>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900">You May Also Appreciate</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {similarRooms.map((simRoom) => (
            <RoomCard key={simRoom.id} room={simRoom} />
          ))}
        </div>
      </div>

    </div>
  );
};
