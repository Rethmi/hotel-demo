import React from 'react';
import { Bell, CheckCircle2, Clock, Trash2, Calendar, Coffee, Sparkles } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const NotificationsPage = () => {
  const { notifications, setNotifications, showToast } = useHotel();

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const clearAll = () => {
    setNotifications([]);
    showToast('Notification center cleared', 'info');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-gold-400">
          Concierge Updates
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
          Notifications Center
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
          Stay alerts, flight arrival notes, restaurant reservations, and bespoke invitations.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-6 text-xs">
        
        <div className="flex items-center justify-between">
          <span className="text-zinc-500 font-semibold">{notifications.length} Total Messages</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={markAllRead}
              className="text-gold-600 hover:text-gold-700 font-bold underline"
            >
              Mark all as read
            </button>
            <span>•</span>
            <button
              onClick={clearAll}
              className="text-zinc-500 hover:text-rose-600 underline"
            >
              Clear all
            </button>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-sand-300 p-12 text-center text-zinc-500 space-y-2">
            <Bell className="w-8 h-8 text-gold-500/50 mx-auto" />
            <p className="font-serif text-lg font-bold text-charcoal-900">No Notifications</p>
            <p className="text-xs">You are completely up to date with your stay itinerary.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  !item.read 
                    ? 'bg-white border-gold-400/60 shadow-sm' 
                    : 'bg-sand-50/60 border-sand-200 opacity-75'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    !item.read ? 'bg-gold-500/20 text-gold-600' : 'bg-sand-200 text-zinc-500'
                  }`}>
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-serif font-bold text-charcoal-900 text-sm">{item.title}</h4>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-gold-500" />
                      )}
                    </div>
                    <p className="text-zinc-600 leading-relaxed text-xs">{item.message}</p>
                    <span className="text-[10px] text-zinc-400 block pt-1">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
