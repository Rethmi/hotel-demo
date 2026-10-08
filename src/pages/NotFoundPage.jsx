import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, BedDouble, Search } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full border border-gold-400 bg-charcoal-950 text-gold-400 font-serif font-bold text-2xl flex items-center justify-center mx-auto shadow-md">
          A
        </div>
        
        <span className="text-[11px] uppercase font-bold tracking-widest text-gold-600 block">
          404 — Horizon Undefined
        </span>
        
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-900">
          Sanctuary Not Located
        </h1>

        <p className="text-zinc-600 text-sm leading-relaxed max-w-md mx-auto">
          The horizon you are searching for appears to have drifted beyond our Mediterranean charts. Allow us to guide you back to our private haven.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="px-6 py-3 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-colors flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Sanctuary (Home)</span>
          </Link>
          <Link
            to="/rooms"
            className="px-6 py-3 bg-sand-200 hover:bg-sand-300 text-charcoal-900 font-bold uppercase tracking-wider text-xs rounded transition-colors flex items-center space-x-2"
          >
            <BedDouble className="w-4 h-4" />
            <span>Explore Rooms & Suites</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
