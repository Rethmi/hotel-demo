import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { showToast } = useHotel();
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter code & new pass, 3 = success
  const [email, setEmail] = useState('julian.davenport@davenport-estates.co.uk');
  const [code, setCode] = useState('849201');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    setStep(2);
    showToast(`Verification code dispatched to ${email}`, 'info');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    setStep(3);
    showToast('Password updated successfully. You may now sign in.', 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-sand-300 p-8 sm:p-10 shadow-luxury space-y-6 text-xs text-charcoal-900">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border border-gold-400 bg-charcoal-950 text-gold-400 font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-md">
            A
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-gold-600 block">
            Account Security
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
            Reset Password
          </h1>
        </div>

        {/* Step 1: Request Code */}
        {step === 1 && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <p className="text-zinc-500 text-xs">
              Enter your registered email address to receive an instant authentication passcode.
            </p>
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

            <button
              type="submit"
              className="w-full py-3 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Transmit Verification Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Verification Code & New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-zinc-500 text-xs">
              Enter the 6-digit passcode sent to <b>{email}</b> and your new password.
            </p>

            <div>
              <label className="font-semibold text-zinc-700 block mb-1">6-Digit Code</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 font-mono tracking-widest text-center"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-zinc-700 block mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full p-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2.5 bg-sand-100 border border-sand-300 rounded text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-gold-300 to-gold-500 text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded shadow-gold-glow flex items-center justify-center space-x-2"
            >
              <span>Update Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 3: Success State */}
        {step === 3 && (
          <div className="space-y-4 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-charcoal-900">Password Reset Complete</h3>
            <p className="text-xs text-zinc-600">
              Your credentials have been securely updated. You may now sign in to your Aurelia account.
            </p>
            <Link
              to="/signin"
              className="w-full py-3 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-wider text-xs rounded transition-all block shadow-md"
            >
              Return to Sign In
            </Link>
          </div>
        )}

        <div className="pt-2 border-t border-sand-200 text-center">
          <Link to="/signin" className="text-zinc-500 hover:text-charcoal-900 text-xs">
            Back to Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};
