import React from 'react';
import { Award, ShieldCheck, Heart, Leaf, Clock, MapPin, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const AboutPage = () => {
  const milestones = [
    { year: "1934", title: "The Foundation", desc: "Constructed as a neoclassical cliffside retreat for European nobility seeking winter Mediterranean solace." },
    { year: "1956", title: "The Golden Cinema Age", desc: "Became the favored Côte d'Azur sanctuary for international film icons, playwrights, and heads of state." },
    { year: "1988", title: "Marine Sanctuary Establishment", desc: "Pioneered the Baie des Étoiles protected underwater reserve in collaboration with Monaco Oceanographic Institute." },
    { year: "2018", title: "The Architectural Renaissance", desc: "Comprehensive modernization by renowned Italian architects, integrating sea-water geothermal cooling and smart suites." },
    { year: "2026", title: "Global Gold Standard", desc: "Awarded Three Michelin Keys and Forbes Five-Star rating for unprecedented personalized hospitality." }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-24 px-4 sm:px-6 lg:px-8 text-center space-y-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80"
            alt="Aurelia Estate History"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-gold-400">
            Heritage & Legacy Since 1934
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            The Story of Aurelia
          </h1>
          <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
            "A sanctuary conceived to celebrate the poetry of Mediterranean light and timeless human connection."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        
        {/* Editorial Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold tracking-wider text-gold-600 block">
              Our Hospitality Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 leading-tight">
              Intuitive Discretion & Genuine Warmth
            </h2>
            <p className="text-zinc-600 text-sm leading-relaxed">
              At Aurelia Grand Resort, luxury is never theatrical—it is measured by stillness, space, and anticipation. Our dedicated team of 240 hospitality professionals is trained by the prestigious British Butler Guild and French Conciergerie institutes to understand your rhythm before you even express it.
            </p>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Whether arranging a private helicopter transfer to Monte-Carlo or preparing a restorative herbal infusion upon your return from sunset sailing, we preserve the rare art of bespoke European hospitality.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <img
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
              alt="Aurelia Estate Interior"
              className="rounded-2xl shadow-luxury border-4 border-white object-cover aspect-[4/5]"
            />
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-sand-300 shadow-sm space-y-3">
            <Award className="w-8 h-8 text-gold-600" />
            <h3 className="font-serif text-xl font-bold text-charcoal-900">Uncompromising Standards</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Every room appointment, from 600-thread count Egyptian cotton to Bang & Olufsen acoustics and Diptyque Paris bath care, is chosen without compromise.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-sand-300 shadow-sm space-y-3">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <h3 className="font-serif text-xl font-bold text-charcoal-900">Environmental Stewardship</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Certified ISO 14001: 100% renewable geothermal seawater cooling, zero single-use plastics, and on-site organic composting that nourishes our herb gardens.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-sand-300 shadow-sm space-y-3">
            <Heart className="w-8 h-8 text-rose-600" />
            <h3 className="font-serif text-xl font-bold text-charcoal-900">Artisan Heritage</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We champion regional artisans—from local fishermen delivering line-caught sea bass daily to master olive oil presses in the Grasse foothills.
            </p>
          </div>
        </div>

        {/* History Timeline */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-gold-600">The Archival Journey</span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900">Nearly a Century of Splendor</h2>
          </div>

          <div className="relative border-l border-gold-400/50 ml-4 md:ml-32 space-y-12 py-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-12 group">
                {/* Gold bullet */}
                <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-charcoal-950 border-2 border-gold-400 group-hover:bg-gold-500 transition-colors" />
                
                <span className="font-serif text-2xl font-bold text-gold-600 block">{m.year}</span>
                <h4 className="font-serif text-xl font-bold text-charcoal-900 mt-1">{m.title}</h4>
                <p className="text-xs text-zinc-600 mt-1 max-w-xl leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
