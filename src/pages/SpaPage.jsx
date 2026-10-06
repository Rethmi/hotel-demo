import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Droplets, Clock, Star, Check, 
  ArrowRight, Heart, ShieldCheck, Sun 
} from 'lucide-react';
import { SPA_SERVICES, HOTEL_INFO } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const SpaPage = () => {
  const { formatPrice, showToast, spaAppointments, setSpaAppointments } = useHotel();
  const [selectedService, setSelectedService] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [date, setDate] = useState('2026-10-17');
  const [time, setTime] = useState('14:00');
  const [therapist, setTherapist] = useState('Senior Certified Therapist');

  const handleBookService = (service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const confirmSpaBooking = (e) => {
    e.preventDefault();
    const apptId = `SPA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppt = {
      id: apptId,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date,
      time,
      duration: selectedService.duration,
      price: selectedService.price,
      therapist,
      status: 'Confirmed'
    };

    setSpaAppointments(prev => [newAppt, ...prev]);
    setBookingModalOpen(false);
    showToast(`Appointment confirmed for ${selectedService.name} on ${date} at ${time}!`, 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Editorial Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=80"
            alt="Aurelia Thalasso Spa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
            Holistic Sanctuary
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Aurelia Thalasso & Thermal Spa
          </h1>
          <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
            "Restore harmony, vital energy, and cellular youth through sea minerals and botanical rituals."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Spa Philosophy Grid */}
        <div className="bg-white rounded-2xl border border-sand-300 p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600">
          <div className="space-y-2">
            <Droplets className="w-6 h-6 text-gold-600" />
            <h3 className="font-serif text-lg font-bold text-charcoal-900">Hydrotherapy & Thalasso</h3>
            <p>Heated Mediterranean seawater pools rich in magnesium, potassium, and trace minerals.</p>
          </div>
          <div className="space-y-2 border-y md:border-y-0 md:border-x border-sand-200 py-4 md:py-0 md:px-6">
            <Sparkles className="w-6 h-6 text-gold-600" />
            <h3 className="font-serif text-lg font-bold text-charcoal-900">Cellular Aesthetics</h3>
            <p>Swiss skincare formulations and pure caviar extracts for lifting and long-lasting radiance.</p>
          </div>
          <div className="space-y-2">
            <Sun className="w-6 h-6 text-gold-600" />
            <h3 className="font-serif text-lg font-bold text-charcoal-900">Mind & Movement</h3>
            <p>Cliffside sunrise yoga, sound bath meditation, and bespoke Ayurvedic consultations.</p>
          </div>
        </div>

        {/* Spa Services Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl font-bold text-charcoal-900">Curated Spa Treatments</h2>
            <span className="text-xs text-zinc-500">All treatments include thermal suite access</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPA_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-sand-300 hover:border-gold-500/50 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-charcoal-950/80 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-sm">
                      {service.duration}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600">
                        {service.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-sand-200 text-xs text-zinc-600">
                      <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Therapeutic Benefits:</span>
                      {service.benefits.map((ben, i) => (
                        <p key={i} className="flex items-center space-x-2 text-[11px]">
                          <Check className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                          <span>{ben}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-sand-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">Pricing</span>
                    <span className="font-serif font-bold text-charcoal-900 text-xl">
                      {formatPrice(service.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookService(service)}
                    className="px-5 py-2.5 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-all shadow-sm"
                  >
                    Book Ritual
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Spa Appointment Modal */}
      {bookingModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-gold-500/40 shadow-2xl p-6 sm:p-8 space-y-5 text-xs text-charcoal-900">
            <div className="flex items-center justify-between border-b border-sand-200 pb-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-gold-600">Book Spa Ritual</p>
                <h3 className="font-serif text-lg font-bold">{selectedService.name}</h3>
              </div>
              <button onClick={() => setBookingModalOpen(false)} className="text-zinc-400 hover:text-charcoal-900">✕</button>
            </div>

            <div className="p-3 bg-sand-100 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-semibold">{selectedService.duration} • {selectedService.category}</p>
                <p className="text-[11px] text-zinc-500">Access to thermal suites included</p>
              </div>
              <span className="font-serif font-bold text-gold-600 text-lg">{formatPrice(selectedService.price)}</span>
            </div>

            <form onSubmit={confirmSpaBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Date</label>
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
                  <label className="font-semibold text-zinc-700 block mb-1">Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs"
                  >
                    {['10:00', '11:30', '14:00', '15:30', '17:00', '18:30'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Therapist Preference</label>
                <select
                  value={therapist}
                  onChange={(e) => setTherapist(e.target.value)}
                  className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs"
                >
                  <option>Senior Certified Therapist</option>
                  <option>Female Practitioner</option>
                  <option>Male Practitioner</option>
                  <option>Master Ayurvedic Practitioner</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-gold-300 to-gold-500 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded shadow-gold-glow"
              >
                Confirm Treatment Appointment
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
