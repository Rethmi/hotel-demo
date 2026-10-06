import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const Toast = () => {
  const { toast } = useHotel();
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Sparkles className="w-5 h-5 text-gold-400 shrink-0" />,
  };

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 animate-fade-in pointer-events-none">
      <div className="bg-charcoal-900/95 backdrop-blur-md border border-gold-500/40 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center space-x-3 max-w-md pointer-events-auto">
        {icons[toast.type] || icons.info}
        <p className="text-xs sm:text-sm font-medium leading-snug">{toast.message}</p>
      </div>
    </div>
  );
};
