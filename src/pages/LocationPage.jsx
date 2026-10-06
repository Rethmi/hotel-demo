import React from 'react';
import { MapPin, Compass, Phone, Mail, Navigation, Car, Sparkles, Clock } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const LocationPage = () => {
  const attractions = [
    { name: "Cannes Croisette & Palais des Festivals", distance: "14 km (18 min drive)", desc: "Luxury designer shopping, yacht marina, and world-renowned film festival boulevard." },
    { name: "Grasse Perfume Capitals & Rose Fields", distance: "22 km (25 min drive)", desc: "Historic perfume ateliers of Fragonard and Molinard surrounded by jasmine hills." },
    { name: "Principality of Monaco & Monte-Carlo", distance: "52 km (45 min drive / 12 min helicopter)", desc: "Monte-Carlo Casino, Grand Prix circuit, and Prince's Palace." },
    { name: "Massif de l'Estérel Red Rock Cliffs", distance: "4 km (Direct resort hiking access)", desc: "Dramatic Mediterranean volcanic hiking trails and secluded crystal calanques." },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
          Riviera Destination
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Location & Arrival
        </h1>
        <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
          "Secluded in the Baie des Étoiles, perfectly positioned along the glamorous Côte d'Azur."
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Map & Coordinates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Map Visual Mockup */}
          <div className="lg:col-span-8 bg-charcoal-900 rounded-2xl overflow-hidden shadow-luxury border border-sand-300 relative aspect-[16/10]">
            <img
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80"
              alt="Aurelia Coastline Map"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Map Pin Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center shadow-2xl animate-bounce">
                <MapPin className="w-6 h-6 fill-current" />
              </div>
              <div className="bg-charcoal-950/90 text-white border border-gold-400/40 px-4 py-1.5 rounded-lg text-xs font-serif font-bold mt-2 shadow-xl backdrop-blur-md">
                Aurelia Grand Resort (Baie des Étoiles)
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-charcoal-950/85 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white">
              <div className="flex items-center space-x-2">
                <Navigation className="w-4 h-4 text-gold-400" />
                <span>GPS: 43.5180° N, 6.9420° E (Mandelieu-la-Napoule / Theoule-sur-Mer)</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold uppercase tracking-wider text-[11px] rounded transition-colors"
              >
                Get Google Directions
              </a>
            </div>
          </div>

          {/* Quick Contact & Chauffeur Box */}
          <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-sand-300 shadow-sm space-y-6 text-xs text-zinc-600">
            <h3 className="font-serif text-xl font-bold text-charcoal-900 border-b border-sand-200 pb-3">
              Resort Address & Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900 block">Address</b>
                  <p>{HOTEL_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900 block">Reservations & Front Desk</b>
                  <p>{HOTEL_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900 block">Email</b>
                  <p>{HOTEL_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Sparkles className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <b className="text-charcoal-900 block">WhatsApp Concierge</b>
                  <p>{HOTEL_INFO.whatsapp}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sand-200 space-y-2">
              <b className="text-charcoal-900 block">Arrival Transfer Options:</b>
              <p className="text-[11px] leading-relaxed">
                • Private Mercedes S-Class Chauffeur: Included for Executive Suites & Penthouses.<br />
                • Resort Helipad (LFAG-A): 7-minute flight from Nice Airport.<br />
                • Valet Parking: Complimentary for all staying guests with EV Superchargers.
              </p>
            </div>
          </div>

        </div>

        {/* Nearby Attractions */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-600">Discover the Region</span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900">Nearby Côte d'Azur Attractions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {attractions.map((att, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-sand-300 shadow-sm space-y-2 text-xs">
                <Compass className="w-5 h-5 text-gold-600" />
                <h4 className="font-serif font-bold text-charcoal-900 text-sm">{att.name}</h4>
                <p className="font-semibold text-gold-600 text-[11px]">{att.distance}</p>
                <p className="text-zinc-500 leading-relaxed text-[11px]">{att.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
