import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';

export const TermsPage = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      <div className="relative bg-charcoal-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-gold-400">
          Hospitality Charter
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
          Terms of Hospitality & Stay Conditions
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
          General terms governing reservations, check-in, deposits, and estate conduct at Aurelia Grand Resort.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8 text-xs text-zinc-700 leading-relaxed bg-white p-8 sm:p-12 rounded-2xl border border-sand-300 shadow-sm">
        <div className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-charcoal-900">1. Reservation & Guarantee Policy</h2>
          <p>
            All room reservations must be guaranteed with a valid credit card. The primary booker must be at least 18 years of age and present a corresponding government-issued photo ID upon check-in.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-sand-200">
          <h2 className="font-serif text-xl font-bold text-charcoal-900">2. Cancellation Timelines & Refunds</h2>
          <p>
            Standard flexible reservations permit cancellation without penalty up to 48 hours prior to arrival (15:00 local time). Cancellations received within 48 hours will be subject to a 1-night room charge plus applicable taxes. Specialty suites and multi-bedroom villas require 72 hours and 14 days notice respectively.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-sand-200">
          <h2 className="font-serif text-xl font-bold text-charcoal-900">3. Arrival & Departure</h2>
          <p>
            Check-in time commences at 15:00. Check-out time is until 12:00. Early check-in and late departures are accommodated subject to availability or pre-arranged privilege packages.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-sand-200">
          <h2 className="font-serif text-xl font-bold text-charcoal-900">4. Tranquility & Estate Conduct</h2>
          <p>
            To preserve the serene ambiance of the estate, all guests are requested to observe respectful quietude across common gardens, quiet pools, and residential corridors after 23:00.
          </p>
        </div>
      </div>
    </div>
  );
};
