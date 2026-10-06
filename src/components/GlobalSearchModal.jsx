import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, X, BedDouble, Utensils, Sparkles, Compass, 
  Tag, ArrowRight, Star, Clock 
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { ROOMS, RESTAURANTS, SPA_SERVICES, EXPERIENCES, OFFERS } from '../data/hotelData';

export const GlobalSearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, formatPrice } = useHotel();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Keyboard shortcut listener: Cmd/Ctrl + K to open search, Esc to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingRooms = ROOMS.filter(r => 
    !q || r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
  );

  const matchingDining = RESTAURANTS.filter(d => 
    !q || d.name.toLowerCase().includes(q) || d.cuisine.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
  );

  const matchingSpa = SPA_SERVICES.filter(s => 
    !q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
  );

  const matchingExp = EXPERIENCES.filter(e => 
    !q || e.name.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
  );

  const matchingOffers = OFFERS.filter(o => 
    !q || o.title.toLowerCase().includes(q) || o.category.toLowerCase().includes(q) || o.promoCode.toLowerCase().includes(q)
  );

  const totalResults = matchingRooms.length + matchingDining.length + matchingSpa.length + matchingExp.length + matchingOffers.length;

  const handleSelect = (path) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-charcoal-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-3xl bg-charcoal-900 border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center space-x-3 bg-charcoal-800/80">
          <Search className="w-5 h-5 text-gold-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search suites, dining, spa treatments, private yachts, offers..."
            className="w-full bg-transparent text-white placeholder-zinc-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white border border-white/15 rounded uppercase tracking-wider"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Pills if query is empty */}
        {!query && (
          <div className="p-4 bg-charcoal-950/50 border-b border-white/5 flex flex-wrap gap-2 text-xs">
            <span className="text-zinc-500 self-center text-[11px] mr-1">Popular searches:</span>
            {['Ocean View Suite', 'Horizon Dining', 'Riva Yacht Cruise', 'Couples Spa', 'Stay 3 Pay 2'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-gold-500/20 text-zinc-300 hover:text-gold-300 border border-white/10 text-xs transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Search Results Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs divide-y divide-white/5">
          
          {totalResults === 0 && (
            <div className="text-center py-12 text-zinc-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-gold-400/50 mb-2" />
              <p className="text-sm font-semibold text-white">No results found for "{query}"</p>
              <p className="text-xs text-zinc-500">Try searching for "Suites", "Dining", "Spa", or "Yacht".</p>
            </div>
          )}

          {/* Rooms Section */}
          {matchingRooms.length > 0 && (
            <div className="pt-2 first:pt-0 space-y-3">
              <h3 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider flex items-center space-x-2">
                <BedDouble className="w-4 h-4" />
                <span>Rooms & Suites ({matchingRooms.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => handleSelect(`/rooms/${room.id}`)}
                    className="p-3 rounded-lg bg-charcoal-800/60 hover:bg-charcoal-700/80 border border-white/10 hover:border-gold-500/40 cursor-pointer transition-all flex space-x-3 items-center group"
                  >
                    <img src={room.images[0]} alt={room.name} className="w-14 h-14 rounded-md object-cover shrink-0" />
                    <div className="flex-1 truncate">
                      <p className="text-white font-medium group-hover:text-gold-300 truncate">{room.name}</p>
                      <p className="text-zinc-400 text-[11px] truncate">{room.view} • {room.sizeSqM} m²</p>
                      <p className="text-gold-400 font-serif font-bold mt-0.5">{formatPrice(room.price)} / night</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-gold-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dining Section */}
          {matchingDining.length > 0 && (
            <div className="pt-4 space-y-3">
              <h3 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider flex items-center space-x-2">
                <Utensils className="w-4 h-4" />
                <span>Dining & Lounges ({matchingDining.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingDining.map((rest) => (
                  <div
                    key={rest.id}
                    onClick={() => handleSelect(`/dining/${rest.id}`)}
                    className="p-3 rounded-lg bg-charcoal-800/60 hover:bg-charcoal-700/80 border border-white/10 hover:border-gold-500/40 cursor-pointer transition-all flex space-x-3 items-center group"
                  >
                    <img src={rest.images[0]} alt={rest.name} className="w-14 h-14 rounded-md object-cover shrink-0" />
                    <div className="flex-1 truncate">
                      <p className="text-white font-medium group-hover:text-gold-300 truncate">{rest.name}</p>
                      <p className="text-zinc-400 text-[11px] truncate">{rest.cuisine}</p>
                      <p className="text-gold-400 text-[11px] mt-0.5">{rest.location}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-gold-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spa Section */}
          {matchingSpa.length > 0 && (
            <div className="pt-4 space-y-3">
              <h3 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Spa & Wellness Treatments ({matchingSpa.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingSpa.map((spa) => (
                  <div
                    key={spa.id}
                    onClick={() => handleSelect(`/spa/${spa.id}`)}
                    className="p-3 rounded-lg bg-charcoal-800/60 hover:bg-charcoal-700/80 border border-white/10 hover:border-gold-500/40 cursor-pointer transition-all flex space-x-3 items-center group"
                  >
                    <img src={spa.image} alt={spa.name} className="w-14 h-14 rounded-md object-cover shrink-0" />
                    <div className="flex-1 truncate">
                      <p className="text-white font-medium group-hover:text-gold-300 truncate">{spa.name}</p>
                      <p className="text-zinc-400 text-[11px]">{spa.duration} • {spa.category}</p>
                      <p className="text-gold-400 font-serif font-bold mt-0.5">{formatPrice(spa.price)}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-gold-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experiences Section */}
          {matchingExp.length > 0 && (
            <div className="pt-4 space-y-3">
              <h3 className="font-serif text-sm font-bold text-gold-400 uppercase tracking-wider flex items-center space-x-2">
                <Compass className="w-4 h-4" />
                <span>Curated Experiences ({matchingExp.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingExp.map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => handleSelect(`/experiences/${exp.id}`)}
                    className="p-3 rounded-lg bg-charcoal-800/60 hover:bg-charcoal-700/80 border border-white/10 hover:border-gold-500/40 cursor-pointer transition-all flex space-x-3 items-center group"
                  >
                    <img src={exp.image} alt={exp.name} className="w-14 h-14 rounded-md object-cover shrink-0" />
                    <div className="flex-1 truncate">
                      <p className="text-white font-medium group-hover:text-gold-300 truncate">{exp.name}</p>
                      <p className="text-zinc-400 text-[11px]">{exp.duration} • {exp.category}</p>
                      <p className="text-gold-400 font-serif font-bold mt-0.5">{formatPrice(exp.price)}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-gold-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-charcoal-950 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
          <span>Use <b>↑</b> <b>↓</b> keys to navigate, <b>Enter</b> to select</span>
          <span className="text-gold-400 font-medium">Aurelia Grand Resort Concierge Search</span>
        </div>

      </div>
    </div>
  );
};
