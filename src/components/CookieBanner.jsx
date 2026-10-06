import React, { useState } from 'react';
import { Shield, Settings, Check, X, Lock } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const CookieBanner = () => {
  const { cookieConsent, setCookieConsent, showToast } = useHotel();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: true,
    personalization: true,
    marketing: false,
  });

  if (cookieConsent) return null;

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('aurelia_cookie_consent', 'all');
    } catch {}
    setCookieConsent('all');
    showToast('Cookie preferences updated. Thank you.', 'info');
  };

  const handleRejectNonEssential = () => {
    try {
      localStorage.setItem('aurelia_cookie_consent', 'essential');
    } catch {}
    setCookieConsent('essential');
    showToast('Non-essential cookies declined.', 'info');
  };

  const handleSaveCustom = () => {
    try {
      localStorage.setItem('aurelia_cookie_consent', JSON.stringify(preferences));
    } catch {}
    setCookieConsent(JSON.stringify(preferences));
    setShowPreferences(false);
    showToast('Custom privacy preferences saved.', 'success');
  };

  return (
    <>
      {/* Bottom Sticky Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 bg-charcoal-950/95 backdrop-blur-xl border-t border-gold-500/30 text-white shadow-2xl animate-fade-in">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5 max-w-3xl">
            <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="w-4 h-4 text-gold-400" />
            </div>
            <div className="space-y-1">
              <p className="font-serif text-sm font-semibold tracking-wider text-gold-300">
                Privacy & Bespoke Digital Hospitality
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Aurelia Grand Resort uses cookies and secure technologies to personalize your booking experience, remember currency and language preferences, and deliver curated luxury offerings.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end lg:self-center">
            <button
              onClick={() => setShowPreferences(true)}
              className="px-3.5 py-2 text-xs text-zinc-300 hover:text-white border border-white/20 hover:border-gold-400 rounded transition-colors flex items-center space-x-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Preferences</span>
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="px-3.5 py-2 text-xs text-zinc-300 hover:text-white bg-charcoal-800 hover:bg-charcoal-700 border border-white/10 rounded transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-charcoal-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 rounded shadow-gold-glow transition-all"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-charcoal-900 border border-gold-500/40 rounded-2xl shadow-2xl p-6 text-white space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-gold-400" />
                <h3 className="font-serif text-lg font-bold">Privacy Preferences</h3>
              </div>
              <button onClick={() => setShowPreferences(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Tailor the categories of data collected during your journey across Aurelia Grand Resort platforms.
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 bg-charcoal-800/80 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Strictly Necessary Cookies</p>
                  <p className="text-zinc-400 text-[11px]">Required for secure booking transactions and site navigation.</p>
                </div>
                <span className="text-[10px] uppercase font-bold text-gold-400 px-2 py-0.5 bg-gold-500/10 rounded">
                  Always Active
                </span>
              </div>

              <div className="p-3 bg-charcoal-800/80 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Analytics & Performance</p>
                  <p className="text-zinc-400 text-[11px]">Helps us analyze booking trends and site performance.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 accent-gold-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-charcoal-800/80 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Personalization & Hospitality</p>
                  <p className="text-zinc-400 text-[11px]">Remembers room choices, dietary preferences, and saved wishlists.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.personalization}
                  onChange={(e) => setPreferences({ ...preferences, personalization: e.target.checked })}
                  className="w-4 h-4 accent-gold-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-charcoal-800/80 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Curated Invitations & Marketing</p>
                  <p className="text-zinc-400 text-[11px]">Provides bespoke seasonal offers and festival invites.</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 accent-gold-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end space-x-3">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-xs text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-5 py-2 text-xs font-bold text-charcoal-950 bg-gold-400 hover:bg-gold-300 rounded shadow-gold-glow"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
