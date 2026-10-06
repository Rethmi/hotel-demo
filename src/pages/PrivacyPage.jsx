import React from 'react';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const PrivacyPage = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      <div className="relative bg-charcoal-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
          Digital Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
          Privacy Policy & Data Security
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
          How Aurelia Grand Resort safeguards your personal information and reservation confidentiality.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8 text-xs text-zinc-700 leading-relaxed bg-white p-8 sm:p-12 rounded-2xl border border-sand-300 shadow-sm">
        <div className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-charcoal-900">1. Commitment to Guest Discretion</h2>
          <p>
            At Aurelia Grand Resort, guest privacy is an intrinsic dimension of 5-star hospitality. We comply rigorously with European General Data Protection Regulation (GDPR) and international privacy frameworks.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-sand-200">
          <h2 className="font-serif text-xl font-bold text-charcoal-900">2. Collection of Information</h2>
          <p>
            Information collected during reservations includes guest identity, contact phone/email, payment guarantee tokenization, dietary allergies, and personalized stay preferences.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-sand-200">
          <h2 className="font-serif text-xl font-bold text-charcoal-900">3. Payment Security & Encryption</h2>
          <p>
            All payment transactions are encrypted using TLS 1.3 with 256-bit encryption and processed in Level 1 PCI-DSS certified environments. Credit card security numbers are never stored in plain text.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-sand-200">
          <h2 className="font-serif text-xl font-bold text-charcoal-900">4. Data Officer Contact</h2>
          <p>
            Requests regarding personal data deletion or export may be addressed to our Data Protection Officer at: <b className="text-charcoal-900">{HOTEL_INFO.email}</b>.
          </p>
        </div>
      </div>
    </div>
  );
};
