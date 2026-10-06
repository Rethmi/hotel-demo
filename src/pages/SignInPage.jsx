import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, showToast } = useHotel();
  const [email, setEmail] = useState('julian.davenport@davenport-estates.co.uk');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    showToast('Signed in successfully as Lord Julian Davenport (Platinum Member)', 'success');
    navigate('/account');
  };

  const handleDemoGuestLogin = () => {
    setIsAuthenticated(true);
    showToast('Signed in with Demo Guest Profile', 'info');
    navigate('/account');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-sand-300 p-8 sm:p-10 shadow-luxury space-y-6 text-xs text-charcoal-900">
        
        {/* Crest & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border border-gold-400 bg-charcoal-950 text-gold-400 font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-md">
            A
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold-600 block">
            Aurelia Privileges
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
            Sign In to Your Account
          </h1>
          <p className="text-zinc-500 text-xs">
            Access your bookings, loyalty points, and personalized stay preferences.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold text-zinc-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-zinc-700">Password</label>
              <Link to="/forgot-password" className="text-gold-600 hover:underline text-[11px]">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-gold-500"
              />
              <span className="text-zinc-600 text-[11px]">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Switcher */}
        <div className="pt-2 border-t border-sand-200 text-center space-y-3">
          <button
            type="button"
            onClick={handleDemoGuestLogin}
            className="w-full py-2 bg-sand-100 hover:bg-sand-200 text-charcoal-900 rounded font-semibold text-xs border border-sand-300 transition-colors"
          >
            Quick 1-Click Demo Login (Lord Julian Davenport)
          </button>

          <p className="text-zinc-500 text-xs">
            Not an Aurelia member yet?{' '}
            <Link to="/signup" className="text-gold-600 font-bold hover:underline">
              Join Aurelia Privileges
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
