import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight, BedDouble, Utensils, Compass, Sparkles } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { ROOMS, OFFERS, RESTAURANTS, EXPERIENCES } from '../data/hotelData';

export const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, formatPrice, setSelectedRoom } = useHotel();

  // Map wishlist IDs to actual data objects
  const savedRooms = ROOMS.filter(r => wishlist.includes(r.id));
  const savedOffers = OFFERS.filter(o => wishlist.includes(o.id));
  const savedDining = RESTAURANTS.filter(d => wishlist.includes(d.id));
  const savedExp = EXPERIENCES.filter(e => wishlist.includes(e.id));

  const totalSaved = savedRooms.length + savedOffers.length + savedDining.length + savedExp.length;

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
          Personal Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
          Your Curated Wishlist
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
          Sanctuaries, culinary experiences, and packages saved for your upcoming Riviera journey.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {totalSaved === 0 ? (
          <div className="bg-white rounded-2xl border border-sand-300 p-16 text-center space-y-4 max-w-xl mx-auto">
            <Bookmark className="w-12 h-12 text-gold-500 mx-auto opacity-60" />
            <h3 className="font-serif text-2xl font-bold text-charcoal-900">Your Wishlist is Empty</h3>
            <p className="text-xs text-zinc-500">
              Save your favored suites, dining tables, and yacht excursions by clicking the bookmark icon across the resort platform.
            </p>
            <div className="pt-2">
              <Link
                to="/rooms"
                className="px-6 py-3 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-colors inline-block"
              >
                Explore Rooms & Suites
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Rooms Section */}
            {savedRooms.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900 flex items-center space-x-2">
                  <BedDouble className="w-5 h-5 text-gold-600" />
                  <span>Saved Suites & Sanctuaries ({savedRooms.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedRooms.map((room) => (
                    <div key={room.id} className="bg-white rounded-2xl overflow-hidden border border-sand-300 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-[16/10]">
                          <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                          <button
                            onClick={() => toggleWishlist(room.id)}
                            className="absolute top-3 right-3 p-2 bg-charcoal-950/80 hover:bg-rose-600 text-white rounded-full transition-colors"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="p-5 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-gold-600">{room.category}</span>
                          <h4 className="font-serif font-bold text-charcoal-900 text-lg">{room.name}</h4>
                          <p className="text-xs text-zinc-500">{room.view} • {room.sizeSqM} m²</p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-sand-100 flex items-center justify-between">
                        <span className="font-serif font-bold text-charcoal-900 text-lg">{formatPrice(room.price)} <span className="text-xs font-normal text-zinc-400">/ night</span></span>
                        <button
                          onClick={() => {
                            setSelectedRoom(room);
                            navigate('/booking');
                          }}
                          className="px-4 py-2 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 rounded text-xs font-bold uppercase tracking-wider"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dining Section */}
            {savedDining.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900 flex items-center space-x-2">
                  <Utensils className="w-5 h-5 text-gold-600" />
                  <span>Saved Dining & Lounges ({savedDining.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedDining.map((rest) => (
                    <div key={rest.id} className="bg-white rounded-2xl overflow-hidden border border-sand-300 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-[16/10]">
                          <img src={rest.images[0]} alt={rest.name} className="w-full h-full object-cover" />
                          <button
                            onClick={() => toggleWishlist(rest.id)}
                            className="absolute top-3 right-3 p-2 bg-charcoal-950/80 hover:bg-rose-600 text-white rounded-full transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="p-5 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-gold-600">{rest.cuisine}</span>
                          <h4 className="font-serif font-bold text-charcoal-900 text-lg">{rest.name}</h4>
                          <p className="text-xs text-zinc-500">{rest.location}</p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-sand-100 flex items-center justify-between">
                        <Link to={`/dining/${rest.id}`} className="text-xs text-zinc-600 hover:text-charcoal-900 underline">View Menu</Link>
                        <Link
                          to={`/restaurant-reservation?restaurant=${rest.id}`}
                          className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-wider"
                        >
                          Reserve Table
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experiences Section */}
            {savedExp.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900 flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-gold-600" />
                  <span>Saved Curated Experiences ({savedExp.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedExp.map((exp) => (
                    <div key={exp.id} className="bg-white rounded-2xl overflow-hidden border border-sand-300 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-[16/10]">
                          <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
                          <button
                            onClick={() => toggleWishlist(exp.id)}
                            className="absolute top-3 right-3 p-2 bg-charcoal-950/80 hover:bg-rose-600 text-white rounded-full transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="p-5 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-gold-600">{exp.category}</span>
                          <h4 className="font-serif font-bold text-charcoal-900 text-lg">{exp.name}</h4>
                          <p className="text-xs text-zinc-500">{exp.duration}</p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-sand-100 flex items-center justify-between">
                        <span className="font-serif font-bold text-charcoal-900 text-lg">{formatPrice(exp.price)}</span>
                        <Link
                          to={`/experiences`}
                          className="px-4 py-2 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 rounded text-xs font-bold uppercase tracking-wider"
                        >
                          Book Activity
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
