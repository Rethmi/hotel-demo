import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const ContactPage = () => {
  const { showToast } = useHotel();
  const [formData, setFormData] = useState({
    name: 'Lord Julian Davenport',
    email: 'julian.davenport@davenport-estates.co.uk',
    department: 'Concierge & Private Itineraries',
    message: 'Requesting private yacht charter availability for sunset on 18 October.'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Inquiry sent to the Aurelia Concierge desk. We will respond promptly.', 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
          At Your Service
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Contact & Concierge Desk
        </h1>
        <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
          "Our Les Clefs d'Or concierges and hospitality directors are available 24 hours a day."
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Direct Inquiries Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-sand-300 shadow-luxury space-y-6 text-xs">
          <div>
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">Send an Inquiry</h2>
            <p className="text-zinc-500">Expect a dedicated response from our duty manager within 2 hours.</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Select Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                >
                  <option>Concierge & Private Itineraries</option>
                  <option>Individual Room & Suite Reservations</option>
                  <option>Dining & Wine Cellar Bookings</option>
                  <option>Spa & Wellness Appointments</option>
                  <option>Executive Management & Press Inquiries</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-sand-100 border border-sand-300 rounded-xl p-3 text-xs text-charcoal-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Message to Duty Concierge</span>
              </button>
            </form>
          ) : (
            <div className="p-8 bg-gold-50 border border-gold-400 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-gold-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-charcoal-900">Message Transmitted</h3>
              <p className="text-xs text-zinc-600">
                Thank you, {formData.name}. Your inquiry has been routed to the {formData.department} team.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Departmental Directory & Instant WhatsApp */}
        <div className="lg:col-span-5 space-y-6 text-xs text-zinc-600">
          
          {/* WhatsApp Direct Action */}
          <div className="bg-charcoal-950 text-white p-6 rounded-2xl border border-gold-500/40 shadow-xl space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Direct WhatsApp Concierge</h3>
                <p className="text-[11px] text-zinc-400">Instant messaging with our front desk team</p>
              </div>
            </div>
            <p className="text-zinc-300 leading-relaxed text-[11px]">
              Available 24/7 for staying guests and prospective arrivals to inquire regarding airport chauffeurs, table bookings, or room amenities.
            </p>
            <button
              onClick={() => showToast(`Opened WhatsApp chat demo with ${HOTEL_INFO.whatsapp}`, 'info')}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs rounded transition-colors text-center block"
            >
              Open WhatsApp Chat ({HOTEL_INFO.whatsapp})
            </button>
          </div>

          {/* Department Directory */}
          <div className="bg-white p-6 rounded-2xl border border-sand-300 space-y-4">
            <h3 className="font-serif text-base font-bold text-charcoal-900 border-b border-sand-200 pb-2">
              Departmental Directory
            </h3>
            
            <div className="space-y-3">
              <div>
                <b className="text-charcoal-900 block">General Reservations</b>
                <p className="text-gold-600 font-mono">{HOTEL_INFO.phone}</p>
                <p className="text-[11px] text-zinc-500">{HOTEL_INFO.email}</p>
              </div>
              <div className="pt-2 border-t border-sand-200">
                <b className="text-charcoal-900 block">Les Clefs d'Or Concierge Desk</b>
                <p className="text-gold-600 font-mono">{HOTEL_INFO.conciergePhone}</p>
                <p className="text-[11px] text-zinc-500">{HOTEL_INFO.conciergeEmail}</p>
              </div>
              <div className="pt-2 border-t border-sand-200">
                <b className="text-charcoal-900 block">Private Helipad & Air Operations</b>
                <p className="text-gold-600 font-mono">+33 (0)4 93 88 00 88</p>
                <p className="text-[11px] text-zinc-500">helipad@aureliagrandresort.com</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
