import React, { useState } from 'react';
import { 
  Users, Calendar, MapPin, Sparkles, Check, 
  Send, ShieldCheck, Heart, Award, ArrowRight 
} from 'lucide-react';
import { EVENTS_VENUES, HOTEL_INFO } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const EventsPage = () => {
  const { showToast } = useHotel();
  const [formData, setFormData] = useState({
    eventType: 'Luxury Wedding',
    eventDate: '2027-06-18',
    guests: '120 - 180 Guests',
    venue: 'Azure Cliffside Wedding Pavilion',
    budget: '$50,000 - $100,000',
    name: 'Julian Davenport',
    email: 'julian.davenport@davenport-estates.co.uk',
    phone: '+44 7911 123456',
    company: 'Davenport Holdings',
    notes: 'Inquiring regarding private buy-out of the cliffside pavilion and customized Michelin catering.'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Proposal request submitted to Director of Events. We will reply within 24 hours.', 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Editorial Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80"
            alt="Aurelia Events & Weddings"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-gold-400">
            Unforgettable Celebrations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Weddings & Grand Gatherings
          </h1>
          <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
            "A majestic Riviera stage for extraordinary love stories, corporate galas, and diplomatic summits."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Venues Showcase Grid */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-600">Spectacular Settings</span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900">Our Distinguishing Event Venues</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EVENTS_VENUES.map((venue) => (
              <div 
                key={venue.id}
                className="bg-white rounded-2xl overflow-hidden border border-sand-300 hover:border-gold-500/50 shadow-luxury transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={venue.image} 
                      alt={venue.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-3 left-3 bg-charcoal-950/80 text-gold-400 text-xs px-2.5 py-1 rounded backdrop-blur-sm font-semibold">
                      {venue.type}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl font-bold text-charcoal-900">{venue.name}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{venue.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-sand-200 text-xs text-zinc-700 text-center">
                      <div>
                        <span className="text-[10px] text-zinc-400 uppercase block">Max Capacity</span>
                        <b className="font-serif text-sm text-charcoal-900">{venue.capacity} Guests</b>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 uppercase block">Banquet</span>
                        <b className="font-serif text-sm text-charcoal-900">{venue.banquetCapacity} Seats</b>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 uppercase block">Floor Area</span>
                        <b className="font-serif text-sm text-charcoal-900">{venue.areaSqM} m²</b>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Ideal For:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {venue.suitableFor.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 bg-sand-100 rounded text-[11px] text-zinc-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, venue: venue.name }));
                      document.getElementById('proposal-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 bg-sand-100 hover:bg-gold-500 hover:text-charcoal-950 text-charcoal-900 font-bold uppercase tracking-wider text-xs rounded transition-colors text-center"
                  >
                    Select for Proposal Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Event Inquiry / RFP Form */}
        <div id="proposal-form" className="bg-white rounded-2xl border border-sand-300 p-8 sm:p-12 shadow-luxury max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-600">Bespoke Curation</span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900">Request a Proposal</h2>
            <p className="text-xs text-zinc-500">
              Our dedicated luxury event planning team will prepare a tailored prospectus, floor plan setups, and catering itineraries.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Event Type *</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  >
                    <option>Luxury Wedding Ceremony & Banquet</option>
                    <option>Corporate Annual Gala & Conference</option>
                    <option>Private Birthday Milestone</option>
                    <option>Diplomatic / VIP Closed Summit</option>
                    <option>Product Launch & Media Showcase</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Estimated Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Estimated Guests *</label>
                  <input
                    type="text"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Venue Preference</label>
                  <select
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  >
                    {EVENTS_VENUES.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Estimated Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  >
                    <option>$25,000 - $50,000</option>
                    <option>$50,000 - $100,000</option>
                    <option>$100,000 - $250,000</option>
                    <option>$250,000+ (Full Estate Buy-out)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Telephone / Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Event Vision & Requirements</label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Outline your timeline, desired musical setups, champagne preferences, or accommodation needs..."
                  className="w-full bg-sand-100 border border-sand-300 rounded-xl p-3 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded-xl shadow-gold-glow transition-all"
              >
                Submit Proposal Request
              </button>
            </form>
          ) : (
            <div className="p-8 bg-gold-50 border border-gold-400 rounded-xl text-center space-y-3">
              <Sparkles className="w-8 h-8 text-gold-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-charcoal-900">Proposal Request Received</h3>
              <p className="text-xs text-zinc-600 max-w-md mx-auto">
                Thank you, {formData.name}. Our Senior Director of Special Gatherings has received your dossier for {formData.venue} and will contact you directly within 24 hours.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
