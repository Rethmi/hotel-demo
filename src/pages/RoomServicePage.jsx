import React, { useState } from 'react';
import { 
  ShoppingBag, Plus, Minus, Trash2, Clock, 
  MapPin, CheckCircle2, ChevronRight, UtensilsCrossed 
} from 'lucide-react';
import { ROOM_SERVICE_MENU } from '../data/hotelData';
import { useHotel } from '../context/HotelContext';

export const RoomServicePage = () => {
  const { 
    formatPrice, roomServiceCart, addToRoomService, 
    updateRoomServiceQty, clearRoomServiceCart, 
    roomServiceOrders, setRoomServiceOrders, showToast 
  } = useHotel();

  const [activeCategory, setActiveCategory] = useState('All');
  const [roomNumber, setRoomNumber] = useState('Suite 702');
  const [deliveryTime, setDeliveryTime] = useState('As soon as possible (approx. 30 mins)');
  const [instructions, setInstructions] = useState('Please knock gently and leave tray on terrace table.');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const categories = ['All', 'Breakfast', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

  const filteredMenu = activeCategory === 'All'
    ? ROOM_SERVICE_MENU
    : ROOM_SERVICE_MENU.filter(m => m.category.toLowerCase() === activeCategory.toLowerCase());

  const cartTotal = roomServiceCart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (roomServiceCart.length === 0) {
      showToast('Your order tray is empty', 'error');
      return;
    }

    const orderId = `ORD-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder = {
      id: orderId,
      roomNumber,
      items: [...roomServiceCart],
      total: cartTotal,
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedDelivery: '30-40 mins',
      status: 'Preparing in Kitchen with Executive Chef',
      instructions
    };

    setRoomServiceOrders(prev => [newOrder, ...prev]);
    clearRoomServiceCart();
    setCartDrawerOpen(false);
    showToast(`Order #${orderId} received for ${roomNumber}. Bon appétit!`, 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
          In-Stay Hospitality
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
          24-Hour In-Room Dining
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
          Delivered in fine porcelain to your ocean terrace day and night.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* Floating Cart Button */}
        <div className="flex items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-charcoal-900 text-white shadow'
                    : 'bg-white hover:bg-sand-200 text-zinc-700 border border-sand-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCartDrawerOpen(true)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-charcoal-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-charcoal-950 transition-colors shadow-md shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-gold-400" />
            <span>Order Tray ({roomServiceCart.reduce((s, i) => s + i.qty, 0)})</span>
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-2xl overflow-hidden border border-sand-300 hover:border-gold-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <img src={dish.image} alt={dish.name} className="w-full h-44 object-cover" />
                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-gold-600 block">{dish.category}</span>
                  <h4 className="font-serif font-bold text-charcoal-900 text-base">{dish.name}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{dish.desc}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-sand-100 mt-2 flex items-center justify-between">
                <span className="font-serif font-bold text-charcoal-900 text-lg">
                  {formatPrice(dish.price)}
                </span>
                <button
                  onClick={() => addToRoomService(dish)}
                  className="px-4 py-2 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Add to Tray
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Active Orders Status Display */}
        {roomServiceOrders.length > 0 && (
          <div className="bg-white rounded-2xl border border-gold-400/40 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal-900 flex items-center space-x-2">
              <UtensilsCrossed className="w-5 h-5 text-gold-600" />
              <span>Active In-Room Dining Orders</span>
            </h3>

            <div className="space-y-4">
              {roomServiceOrders.map((ord) => (
                <div key={ord.id} className="p-4 bg-sand-100 rounded-xl space-y-2 text-xs text-charcoal-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-gold-600">{ord.id}</span>
                      <span className="font-bold ml-2">{ord.roomNumber}</span>
                    </div>
                    <span className="px-2.5 py-0.5 bg-gold-500 text-charcoal-950 rounded-full font-bold uppercase text-[10px]">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-zinc-500">
                    Items: {ord.items.map(i => `${i.name} (x${i.qty})`).join(', ')} • Total: {formatPrice(ord.total)}
                  </p>
                  <p className="text-[11px] text-zinc-400">Ordered at {ord.orderTime} • Estimated delivery: {ord.estimatedDelivery}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Cart Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-md bg-white h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-xs text-charcoal-900 space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-sand-200 pb-3">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-gold-600" />
                  <h3 className="font-serif text-lg font-bold">In-Room Dining Tray</h3>
                </div>
                <button onClick={() => setCartDrawerOpen(false)} className="text-zinc-400 hover:text-charcoal-900 font-bold text-sm">✕</button>
              </div>

              {roomServiceCart.length === 0 ? (
                <p className="text-zinc-500 py-10 text-center">Your tray is currently empty.</p>
              ) : (
                <div className="space-y-3 divide-y divide-sand-200">
                  {roomServiceCart.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-[11px] text-zinc-500">{formatPrice(item.price)} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateRoomServiceQty(item.id, -1)}
                          className="w-6 h-6 rounded bg-sand-200 flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-bold w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateRoomServiceQty(item.id, 1)}
                          className="w-6 h-6 rounded bg-sand-200 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {roomServiceCart.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-sand-200">
                  <div>
                    <label className="font-semibold block mb-1">Delivering to Room</label>
                    <input
                      type="text"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Delivery Window</label>
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs"
                    >
                      <option>As soon as possible (approx. 30 mins)</option>
                      <option>In 1 hour</option>
                      <option>Tomorrow Morning (08:00 AM)</option>
                      <option>Tomorrow Morning (09:30 AM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Special Dietary / Service Note</label>
                    <textarea
                      rows={2}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full bg-sand-100 border border-sand-300 rounded p-2 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {roomServiceCart.length > 0 && (
              <div className="pt-4 border-t border-sand-200 space-y-4">
                <div className="flex justify-between items-baseline font-bold text-sm">
                  <span className="font-serif text-base">Tray Subtotal</span>
                  <span className="font-serif text-xl text-gold-600">{formatPrice(cartTotal)}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded-xl shadow-gold-glow"
                >
                  Confirm & Charge to Room
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
