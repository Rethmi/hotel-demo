import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, SlidersHorizontal, ArrowUpDown, Grid, List, 
  RotateCcw, Sparkles, Check, Users, ShieldCheck, BedDouble 
} from 'lucide-react';
import { ROOMS } from '../data/hotelData';
import { RoomCard } from '../components/RoomCard';
import { useHotel } from '../context/HotelContext';

export const RoomsPage = () => {
  const { formatPrice } = useHotel();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedView, setSelectedView] = useState('All');
  const [guestCount, setGuestCount] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState('recommended');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  const categories = ['All', 'Deluxe', 'Ocean View', 'Executive Suite', 'Family Suite', 'Presidential Suite', 'Private Villa'];
  const views = ['All', 'Garden', 'Ocean', 'Sea & Coastal Cliff', 'Endless Open Sea'];

  const filteredRooms = useMemo(() => {
    return ROOMS.filter(room => {
      // Category filter
      if (selectedCategory !== 'All' && !room.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false;
      }
      // View filter
      if (selectedView !== 'All' && !room.view.toLowerCase().includes(selectedView.toLowerCase())) {
        return false;
      }
      // Guests filter
      if (guestCount !== 'All' && room.maxGuests < parseInt(guestCount, 10)) {
        return false;
      }
      // Price filter
      if (room.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [selectedCategory, selectedView, guestCount, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedView('All');
    setGuestCount('All');
    setMaxPrice(1500);
    setSortBy('recommended');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Editorial Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=80"
            alt="Aurelia Rooms & Suites"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
            Accommodations & Sanctuaries
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Rooms & Suites
          </h1>
          <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
            "Designed for effortless comfort, Mediterranean light, and acoustic tranquility."
          </p>
          <div className="pt-2 flex items-center justify-center space-x-6 text-xs text-zinc-400">
            <span>6 Architectural Categories</span>
            <span>•</span>
            <span>All Rates Include Luxury Amenities</span>
            <span>•</span>
            <span>Best Rate Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        
        {/* Filter & Sorting Controls Bar */}
        <div className="bg-white border border-sand-300 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Quick Category Badges */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-charcoal-900 text-white shadow'
                    : 'bg-sand-100 hover:bg-sand-200 text-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Controls (Price, Sort, View) */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
            
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-zinc-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-sand-100 border border-sand-300 rounded px-2.5 py-1.5 text-xs text-zinc-800 focus:outline-none focus:border-gold-500"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Guest Rating (5.0)</option>
              </select>
            </div>

            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-sand-100 hover:bg-sand-200 text-zinc-800 rounded border border-sand-300 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-600" />
              <span>All Filters</span>
            </button>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-sand-300 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-charcoal-900 text-white' : 'bg-white text-zinc-600'}`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 ${viewMode === 'list' ? 'bg-charcoal-900 text-white' : 'bg-white text-zinc-600'}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* Expandable Advanced Filters Panel */}
        {isFilterDrawerOpen && (
          <div className="bg-white border border-gold-500/30 rounded-xl p-6 shadow-md animate-fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            
            {/* Filter: Max Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-charcoal-900">Max Nightly Rate</label>
                <span className="font-bold text-gold-600">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="180"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>{formatPrice(180)}</span>
                <span>{formatPrice(1500)}</span>
              </div>
            </div>

            {/* Filter: View Type */}
            <div className="space-y-2">
              <label className="font-semibold text-charcoal-900">View Panorama</label>
              <select
                value={selectedView}
                onChange={(e) => setSelectedView(e.target.value)}
                className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs text-zinc-800"
              >
                {views.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* Filter: Minimum Guests */}
            <div className="space-y-2">
              <label className="font-semibold text-charcoal-900">Minimum Guests</label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs text-zinc-800"
              >
                <option value="All">Any Number of Guests</option>
                <option value="2">2+ Guests</option>
                <option value="3">3+ Guests</option>
                <option value="4">4+ Guests</option>
                <option value="6">6+ Guests (Villas)</option>
              </select>
            </div>

            {/* Reset Action */}
            <div className="flex items-end justify-between">
              <button
                onClick={resetFilters}
                className="flex items-center space-x-1.5 text-zinc-500 hover:text-charcoal-900 underline text-xs pb-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="px-4 py-2 bg-charcoal-900 text-white rounded font-bold uppercase tracking-wider text-xs"
              >
                Apply
              </button>
            </div>

          </div>
        )}

        {/* Results Counter Banner */}
        <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-sand-200 pb-3">
          <p>Showing <b className="text-charcoal-900">{filteredRooms.length}</b> of {ROOMS.length} luxury accommodations</p>
          <div className="flex items-center space-x-2 text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-medium">Free cancellation up to 48 hours before check-in</span>
          </div>
        </div>

        {/* Rooms Listing Display */}
        {filteredRooms.length === 0 ? (
          <div className="bg-white rounded-xl border border-sand-300 p-12 text-center space-y-4">
            <BedDouble className="w-12 h-12 text-gold-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-charcoal-900">No Accommodations Match Your Exact Filters</h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Please adjust your maximum price, guest capacity, or panorama preferences to explore available suites.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-charcoal-900 text-white rounded font-bold uppercase tracking-wider text-xs hover:bg-gold-500 hover:text-charcoal-950 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }>
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}

        {/* Bottom Booking Guarantee Banner */}
        <div className="bg-white rounded-xl border border-gold-500/30 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">Need Personalized Suite Assistance?</h3>
            <p className="text-xs text-zinc-500">
              Our 24/7 dedicated reservation concierge is available to curate interconnecting suites, private helicopter arrivals, or custom styling.
            </p>
          </div>
          <div className="flex items-center space-x-4 shrink-0">
            <Link
              to="/contact"
              className="px-6 py-3 bg-sand-200 hover:bg-sand-300 text-charcoal-900 font-bold uppercase tracking-wider text-xs rounded transition-colors"
            >
              Contact Concierge
            </Link>
            <Link
              to="/booking"
              className="px-6 py-3 bg-gradient-to-r from-gold-300 to-gold-500 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded shadow-gold-glow transition-all"
            >
              Book Direct Now
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
