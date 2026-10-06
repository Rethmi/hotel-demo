import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, Maximize2, Bed, Eye, Bookmark, 
  ArrowRight, Check, Star, Sparkles, ShieldCheck 
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const RoomCard = ({ room, onSelect, compact = false }) => {
  const navigate = useNavigate();
  const { formatPrice, isInWishlist, toggleWishlist, setSelectedRoom } = useHotel();
  const wishlisted = isInWishlist(room.id);

  const handleBookNow = (e) => {
    e.stopPropagation();
    setSelectedRoom(room);
    if (onSelect) {
      onSelect(room);
    } else {
      navigate('/booking');
    }
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-sand-300 hover:border-gold-500/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-900">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 items-center">
          {room.popularBadge && (
            <span className="px-2.5 py-1 rounded bg-gold-500/90 backdrop-blur-sm text-charcoal-950 text-[10px] font-bold uppercase tracking-wider">
              {room.popularBadge}
            </span>
          )}
          {room.stock <= 2 && (
            <span className="px-2.5 py-1 rounded bg-rose-600/90 text-white text-[10px] font-bold uppercase tracking-wider">
              Only {room.stock} left
            </span>
          )}
        </div>

        {/* Wishlist Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(room.id);
          }}
          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors backdrop-blur-md ${
            wishlisted 
              ? 'bg-gold-500 text-charcoal-950 shadow-md' 
              : 'bg-black/40 text-white hover:bg-black/70'
          }`}
          title={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          aria-label="Wishlist"
        >
          <Bookmark className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Overlay Info (View + Rating) */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <span className="truncate text-zinc-200 text-[11px] font-medium flex items-center space-x-1">
            <Eye className="w-3.5 h-3.5 text-gold-400 inline mr-1" />
            <span>{room.view}</span>
          </span>
          <div className="flex items-center space-x-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm text-[11px]">
            <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
            <span className="font-bold text-white">{room.rating}</span>
            <span className="text-zinc-400">({room.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          
          {/* Category & Title */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block mb-1">
              {room.category}
            </span>
            <Link 
              to={`/rooms/${room.id}`}
              className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors line-clamp-1"
            >
              {room.name}
            </Link>
            <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
              {room.tagline || room.description}
            </p>
          </div>

          {/* Room Specs Pills */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-sand-200 text-[11px] text-zinc-600">
            <div className="flex items-center space-x-1.5 truncate">
              <Maximize2 className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span>{room.sizeSqM} m² / {room.sizeSqFt} ft²</span>
            </div>
            <div className="flex items-center space-x-1.5 truncate">
              <Users className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span>Up to {room.maxGuests} Guests</span>
            </div>
            <div className="flex items-center space-x-1.5 truncate">
              <Bed className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span className="truncate">{room.bed.split(' or ')[0]}</span>
            </div>
          </div>

          {/* Selected Feature Highlights */}
          <div className="space-y-1 text-xs text-zinc-600">
            {room.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 truncate text-[11px]">
                <Check className="w-3 h-3 text-gold-500 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

          {/* Cancellation policy banner */}
          <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Free cancellation up to 48h prior</span>
          </div>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="pt-5 mt-4 border-t border-sand-200 flex items-end justify-between">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[11px] text-zinc-400">From</span>
              {room.originalPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  {formatPrice(room.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-2xl font-bold text-charcoal-900">
                {formatPrice(room.price)}
              </span>
              <span className="text-[11px] text-zinc-500">/ night</span>
            </div>
            <span className="text-[10px] text-zinc-400 block">Excl. taxes & fees</span>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to={`/rooms/${room.id}`}
              className="px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-charcoal-950 hover:bg-sand-100 rounded border border-sand-300 transition-colors"
            >
              Details
            </Link>
            <button
              onClick={handleBookNow}
              className="px-4 py-2 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 flex items-center space-x-1 shadow-sm"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
