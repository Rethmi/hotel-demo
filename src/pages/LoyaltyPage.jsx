import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Check, Sparkles, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const LoyaltyPage = () => {
  const { user } = useHotel();

  const tiers = [
    {
      name: "Silver",
      range: "0 – 5,000 Points",
      subtitle: "Entry into Privileges",
      perks: [
        "Priority online check-in & digital key",
        "Complimentary welcome bottle of Provençal Rosé",
        "5% member discount on direct flexible room rates",
        "Complimentary access to Aurelia fitness pavilion"
      ]
    },
    {
      name: "Gold",
      range: "5,000 – 15,000 Points",
      subtitle: "Elevated Distinction",
      perks: [
        "Guaranteed 14:00 late checkout",
        "Daily complimentary breakfast at Horizon or The Terrace",
        "Room upgrade to next room category (subject to availability)",
        "15% savings across all treatments at Aurelia Thalasso Spa",
        "Seasonal invitations to wine cellar masterclasses"
      ]
    },
    {
      name: "Platinum",
      range: "15,000+ Points",
      subtitle: "The Pinnacle of Hospitality",
      isCurrent: true,
      perks: [
        "Guaranteed 16:00 late checkout & 11:00 early check-in",
        "Executive Club Lounge access with Grand Cru champagne",
        "Annual $500 Aurelia Wellness & Dining credit",
        "Dedicated British Butler Guild personal butler throughout stay",
        "Complimentary helicopter transfer on bookings of 4+ nights",
        "Direct priority reservation line to General Manager"
      ]
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
          Exclusive Recognition
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Aurelia Privileges Club
        </h1>
        <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
          "A tiered loyalty program designed to reward your return with extraordinary personalized privileges."
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Current User Tier Banner */}
        <div className="bg-charcoal-900 text-white rounded-2xl border border-gold-400/40 p-8 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400 font-serif font-bold text-2xl">
              A
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">Your Active Tier</span>
              <h3 className="font-serif text-2xl font-bold">Aurelia Platinum Member</h3>
              <p className="text-xs text-zinc-400">Lord Julian Davenport • 18,450 Earned Privileges Points</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="text-right">
              <span className="text-zinc-400 text-[10px] uppercase block">Next Reward Milestone</span>
              <span className="font-bold text-gold-300">Complimentary Overwater Villa Stay</span>
            </div>
            <Link
              to="/booking"
              className="px-5 py-2.5 bg-gradient-to-r from-gold-300 to-gold-500 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded shadow-gold-glow"
            >
              Redeem Stays
            </Link>
          </div>
        </div>

        {/* Tiers Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-2xl overflow-hidden border p-8 space-y-6 flex flex-col justify-between transition-all ${
                tier.isCurrent 
                  ? 'border-gold-500 ring-2 ring-gold-400/30 shadow-luxury' 
                  : 'border-sand-300 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600">
                    Tier Level
                  </span>
                  {tier.isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-700 text-[10px] font-bold uppercase">
                      Current Tier
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif text-3xl font-bold text-charcoal-900">{tier.name}</h3>
                  <p className="text-xs text-gold-600 font-mono font-bold mt-1">{tier.range}</p>
                  <p className="text-xs text-zinc-500 mt-1">{tier.subtitle}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-sand-200 text-xs text-zinc-700">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Privilege Benefits:</span>
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-start space-x-2 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-sand-100">
                <Link
                  to="/booking"
                  className="w-full py-2.5 bg-sand-100 hover:bg-gold-500 hover:text-charcoal-950 text-charcoal-900 font-bold uppercase tracking-wider text-xs rounded transition-colors text-center block"
                >
                  Book with {tier.name} Privileges
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
