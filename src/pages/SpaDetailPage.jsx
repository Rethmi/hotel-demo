import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, Clock, Check, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { SPA_SERVICES } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const SpaDetailPage = () => {
  const { id } = useParams();
  const { formatPrice, setSpaAppointments, showToast } = useHotel();
  const service = SPA_SERVICES.find(s => s.id === id) || SPA_SERVICES[0];

  const [date, setDate] = useState('2026-10-17');
  const [time, setTime] = useState('14:00');
  const [therapist, setTherapist] = useState('Senior Certified Practitioner');

  const handleBook = (e) => {
    e.preventDefault();
    const apptId = `SPA-${Math.floor(1000 + Math.random() * 9000)}`;
    setSpaAppointments(prev => [
      {
        id: apptId,
        serviceId: service.id,
        serviceName: service.name,
        date,
        time,
        duration: service.duration,
        price: service.price,
        therapist,
        status: 'Confirmed'
      },
      ...prev
    ]);
    showToast(`Appointment confirmed for ${service.name} on ${date} at ${time}!`, 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-2 text-xs text-zinc-500">
        <Link to="/" className="hover:text-charcoal-900">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/spa" className="hover:text-charcoal-900">Spa & Wellness</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-charcoal-900 font-semibold">{service.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="rounded-2xl overflow-hidden shadow-luxury aspect-[16/9] bg-charcoal-950">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          </div>

          <div className="bg-white p-8 rounded-2xl border border-sand-300 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-600">{service.category}</span>
              <h1 className="font-serif text-3xl font-bold text-charcoal-900">{service.name}</h1>
              <p className="text-zinc-600 text-sm leading-relaxed">{service.description}</p>
            </div>

            <div className="pt-4 border-t border-sand-200 space-y-2">
              <h3 className="font-serif text-lg font-bold text-charcoal-900">Treatment Benefits:</h3>
              {service.benefits.map((b, i) => (
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
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Ritual Price</span>
                <span className="font-serif text-3xl font-bold text-charcoal-900">{formatPrice(service.price)}</span>
              </div>
              <span className="font-mono text-zinc-500 text-xs">{service.duration}</span>
            </div>

            <form onSubmit={handleBook} className="space-y-3">
              <div>
                <label className="font-semibold block mb-1">Appointment Date</label>
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
                <label className="font-semibold block mb-1">Preferred Time</label>
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

              <div>
                <label className="font-semibold block mb-1">Therapist Preference</label>
                <select
                  value={therapist}
                  onChange={(e) => setTherapist(e.target.value)}
                  className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs"
                >
                  <option>Senior Certified Practitioner</option>
                  <option>Female Practitioner</option>
                  <option>Male Practitioner</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-gold-300 to-gold-500 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-gold-glow"
              >
                Book Appointment
              </button>
            </form>

            <p className="text-[11px] text-zinc-500 text-center">
              Includes full day access to thermal saunas and salt vitality pool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
