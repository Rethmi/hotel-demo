import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Phone, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, showToast } = useHotel();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    setIsAuthenticated(true);
    showToast('Welcome to Aurelia Privileges! Membership registered.', 'success');
    navigate('/account');
  };

  const getPasswordStrength = () => {
    const len = formData.password.length;
    if (len === 0) return { label: 'Empty', color: 'bg-zinc-200', pct: '0%' };
    if (len < 6) return { label: 'Weak', color: 'bg-rose-500', pct: '30%' };
    if (len < 10) return { label: 'Medium', color: 'bg-amber-500', pct: '65%' };
    return { label: 'Strong', color: 'bg-emerald-500', pct: '100%' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-sand-300 p-8 sm:p-10 shadow-luxury space-y-6 text-xs text-charcoal-900">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border border-gold-400 bg-charcoal-950 text-gold-400 font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-md">
            A
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-gold-600 block">
            Complimentary Membership
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
            Join Aurelia Privileges
          </h1>
          <p className="text-zinc-500 text-xs">
            Unlock exclusive rates, room upgrade priority, and dining vouchers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-zinc-700 block mb-1">First Name *</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full p-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full p-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-zinc-700 block mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-700 block mb-1">Mobile Phone (with country code) *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+33 or +44..."
              className="w-full p-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Password *</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Confirm Password *</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full p-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Password strength indicator */}
          {formData.password && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>Strength: {strength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-sand-200 rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: strength.pct }} />
              </div>
            </div>
          )}

          <div className="pt-1">
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                className="w-4 h-4 accent-gold-500 mt-0.5"
              />
              <span className="text-zinc-600 text-[11px] leading-relaxed">
                I agree to the Aurelia Privileges Terms of Membership, Privacy Policy, and digital communications.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded transition-all shadow-gold-glow flex items-center justify-center space-x-2"
          >
            <span>Create Privileges Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-sand-200 text-center">
          <p className="text-zinc-500 text-xs">
            Already have an account?{' '}
            <Link to="/signin" className="text-gold-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
