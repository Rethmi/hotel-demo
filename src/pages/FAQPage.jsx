import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Mail, ShieldCheck } from 'lucide-react';
import { FAQ_DATA, HOTEL_INFO } from '../data/hotelData';
import { Link } from 'react-router-dom';

export const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleAccordion = (catIndex, qIndex) => {
    const key = `${catIndex}-${qIndex}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
          Hospitality Guidance
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
          "Clear answers regarding reservations, check-in, policies, and private airport transfers."
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {FAQ_DATA.map((section, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900 border-b border-sand-300 pb-2">
              {section.category}
            </h2>

            <div className="space-y-3">
              {section.questions.map((item, qIdx) => {
                const isOpen = !!openItems[`${catIdx}-${qIdx}`];
                return (
                  <div
                    key={qIdx}
                    className="bg-white rounded-xl border border-sand-300 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => toggleAccordion(catIdx, qIdx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-charcoal-900 text-base hover:text-gold-600 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown className={`w-4 h-4 text-gold-600 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 text-xs text-zinc-600 leading-relaxed border-t border-sand-100 mt-1 animate-fade-in">
                        <p className="pt-3">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still Have Questions Box */}
        <div className="bg-white rounded-2xl border border-gold-500/40 p-8 text-center space-y-4 shadow-sm">
          <HelpCircle className="w-10 h-10 text-gold-600 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-charcoal-900">Have an Unanswered Question?</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Our 24-hour guest concierge team is standing by to assist with custom itineraries, private helipad operations, and dietary preferences.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="px-5 py-2.5 bg-charcoal-900 text-white rounded font-bold uppercase tracking-wider text-xs hover:bg-gold-500 hover:text-charcoal-950 transition-colors flex items-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>Call Concierge ({HOTEL_INFO.phone})</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-sand-200 text-charcoal-900 rounded font-bold uppercase tracking-wider text-xs hover:bg-sand-300 transition-colors"
            >
              Send Online Inquiry
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
