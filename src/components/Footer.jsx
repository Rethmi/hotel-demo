import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, ShieldCheck, Heart, Mail, Phone, MapPin, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useHotel();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to The Aurelia Journal. Privileged invitations sent.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-charcoal-950 text-zinc-300 border-t border-gold-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle gold ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Brand Statement */}
        <div className="pb-14 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center space-x-3">
              <span className="font-serif text-2xl font-bold tracking-wider text-white uppercase">Aurelia</span>
              <span className="text-xs tracking-widest text-gold-400 uppercase font-sans font-medium">Grand Resort</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl text-zinc-100 font-light italic">
              "Where Luxury Meets the Horizon"
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-lg leading-relaxed">
              Subscribe to The Aurelia Journal for private seasonal previews, sommelier notes, and bespoke invitations to our coastal sanctuary.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-11 pr-4 py-3 bg-charcoal-900 border border-gold-500/30 rounded-sm text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gold-400 hover:bg-gold-300 text-charcoal-950 font-semibold uppercase tracking-wider text-xs rounded-sm transition-colors flex items-center justify-center space-x-2 shrink-0 shadow-sm"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-gold-400 text-xs flex items-center space-x-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>You are now subscribed to the Aurelia Journal.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 4 Multi-Column Sitemap */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Column 1: Stay */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-gold-400 uppercase">Stay</h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><Link to="/rooms" className="hover:text-gold-300 transition-colors">Deluxe Azure Rooms</Link></li>
              <li><Link to="/rooms" className="hover:text-gold-300 transition-colors">Ocean View Suites</Link></li>
              <li><Link to="/rooms" className="hover:text-gold-300 transition-colors">Executive Suites</Link></li>
              <li><Link to="/rooms" className="hover:text-gold-300 transition-colors">Presidential Horizon Penthouse</Link></li>
              <li><Link to="/rooms" className="hover:text-gold-300 transition-colors">Private Overwater Villas</Link></li>
              <li><Link to="/offers" className="hover:text-gold-300 transition-colors">Seasonal Packages & Offers</Link></li>
              <li><Link to="/booking" className="hover:text-gold-300 text-gold-400 font-medium transition-colors">Best Rate Guarantee</Link></li>
            </ul>
          </div>

          {/* Column 2: Experience */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-gold-400 uppercase">Experience</h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><Link to="/dining" className="hover:text-gold-300 transition-colors">Horizon Oceanfront Dining</Link></li>
              <li><Link to="/dining" className="hover:text-gold-300 transition-colors">Ember Prime Wood-Fired Grill</Link></li>
              <li><Link to="/dining" className="hover:text-gold-300 transition-colors">The Terrace Botanical Tea</Link></li>
              <li><Link to="/dining" className="hover:text-gold-300 transition-colors">Azure Sunset & Caviar Lounge</Link></li>
              <li><Link to="/spa" className="hover:text-gold-300 transition-colors">Aurelia Thalasso Spa</Link></li>
              <li><Link to="/experiences" className="hover:text-gold-300 transition-colors">Private Riva Yacht Charter</Link></li>
              <li><Link to="/experiences" className="hover:text-gold-300 transition-colors">Coral Reef Marine Sanctuary</Link></li>
            </ul>
          </div>

          {/* Column 3: Resort & Gatherings */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-gold-400 uppercase">Resort</h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><Link to="/about" className="hover:text-gold-300 transition-colors">Our 1934 Heritage Story</Link></li>
              <li><Link to="/gallery" className="hover:text-gold-300 transition-colors">Architectural Gallery</Link></li>
              <li><Link to="/events" className="hover:text-gold-300 transition-colors">Riviera Weddings</Link></li>
              <li><Link to="/events" className="hover:text-gold-300 transition-colors">Diplomatic Summits</Link></li>
              <li><Link to="/account/loyalty" className="hover:text-gold-300 transition-colors">Aurelia Privileges Club</Link></li>
              <li><Link to="/location" className="hover:text-gold-300 transition-colors">Helipad & Valet Arrival</Link></li>
            </ul>
          </div>

          {/* Column 4: Guest Support */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-gold-400 uppercase">Support</h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><Link to="/manage-booking" className="hover:text-gold-300 transition-colors">Find & Manage Reservation</Link></li>
              <li><Link to="/faq" className="hover:text-gold-300 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/room-service" className="hover:text-gold-300 transition-colors">In-Room Dining Portal</Link></li>
              <li><Link to="/contact" className="hover:text-gold-300 transition-colors">Concierge Desk</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-300 transition-colors">Privacy Policy & Cookies</Link></li>
              <li><Link to="/terms" className="hover:text-gold-300 transition-colors">Terms of Hospitality</Link></li>
            </ul>
          </div>

          {/* Column 5: Direct Contact & Awards */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-gold-400 uppercase">Contact</h4>
            <div className="space-y-2.5 text-zinc-400">
              <p className="flex items-start space-x-2.5 text-xs leading-relaxed">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-normal">{HOTEL_INFO.address}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-gold-300">{HOTEL_INFO.phone}</a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-gold-300">{HOTEL_INFO.email}</a>
              </p>
            </div>

            {/* Awards Accreditation Badges */}
            <div className="pt-3 border-t border-white/10 space-y-1.5">
              <div className="flex items-center space-x-2 text-[11px] text-zinc-300">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Forbes Travel Guide 5-Star (2024–2026)</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-zinc-300">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Conde Nast Gold List World Best Resort</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Socials, Accreditations */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex items-center space-x-4">
            <span>© {new Date().getFullYear()} Aurelia Grand Resort. All rights reserved.</span>
            <span>•</span>
            <span className="text-gold-400/80">Certified ISO 14001 Sustainable Luxury</span>
          </div>

          <div className="flex items-center space-x-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold-400 transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold-400 transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold-400 transition-colors" aria-label="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
