import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Compass, Clock, Check, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { EXPERIENCES } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const ExperienceDetailPage = () => {
  const { id } = useParams();
  const { formatPrice, showToast } = useHotel();
  const exp = EXPERIENCES.find(e => e.id === id) || EXPERIENCES[0];

  const [date, setDate] = useState('2026-10-18');
  const [guests, setGuests] = useState(2);

  const handleBook = (e) => {
    e.preventDefault();
    showToast(`Confirmed booking for ${exp.name} (${guests} guests) on ${date}!`, 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-2 text-xs text-zinc-500">
        <Link to="/" className="hover:text-charcoal-900">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/experiences" className="hover:text-charcoal-900">Experiences</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-charcoal-900 font-semibold">{exp.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="rounded-2xl overflow-hidden shadow-luxury aspect-[16/9] bg-charcoal-950">
            <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
          </div>

          <div className="bg-white p-8 rounded-2xl border border-sand-300 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-600">{exp.category}</span>
              <h1 className="font-serif text-3xl font-bold text-charcoal-900">{exp.name}</h1>
              <p className="text-zinc-600 text-sm leading-relaxed">{exp.description}</p>
            </div>

            <div className="pt-4 border-t border-sand-200 space-y-2">
              <h3 className="font-serif text-lg font-bold text-charcoal-900">Curated Inclusions:</h3>
              {exp.inclusions.map((b, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs text-zinc-700">
                  <Check className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gold-500/40 shadow-luxury space-y-5 sticky top-28 text-xs text-charcoal-900">
            <div className="border-b border-sand-200 pb-3 flex justify-between items-baseline">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Experience Rate</span>
                <span className="font-serif text-3xl font-bold text-charcoal-900">{formatPrice(exp.price)}</span>
              </div>
              <span className="font-mono text-zinc-500 text-xs">{exp.duration}</span>
            </div>

            <form onSubmit={handleBook} className="space-y-3">
              <div>
                <label className="font-semibold block mb-1">Scheduled Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Number of Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                  className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs"
                >
                  {[1, 2, 3, 4, 6].map(n => <option key={n} value={n}>{n} Guests</option>)}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-gold-300 to-gold-500 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-gold-glow"
              >
                Book Experience
              </button>
            </form>

            <p className="text-[11px] text-zinc-500 text-center">
              Available schedule: {exp.availability}. Private yacht captain and refreshments included.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
