import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Check, ArrowRight, ArrowLeft, Calendar, Users, ShieldCheck, 
  Bed, Sparkles, CreditCard, Lock, Download, Mail, QrCode, 
  Clock, Coffee, Car, Heart, Plus, Minus, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { ROOMS, ADDONS, HOTEL_INFO } from '../data/hotelData';

export const BookingFlowPage = () => {
  const navigate = useNavigate();
  const [searchParamsUrl] = useSearchParams();
  const { 
    formatPrice, searchParams, setSearchParams, 
    selectedRoom, setSelectedRoom, selectedAddOns, setSelectedAddOns,
    bedPreference, setBedPreference, specialRequestsText, setSpecialRequestsText,
    guestDetails, setGuestDetails, paymentDetails, setPaymentDetails,
    confirmedBooking, setConfirmedBooking, calculateNights, setBookings, showToast
  } = useHotel();

  // Current Step: 1 = Search & Results, 2 = Customize, 3 = Guest Info, 4 = Payment, 5 = Confirmation
  const [currentStep, setCurrentStep] = useState(1);
  const [activeFilterCategory, setActiveFilterCategory] = useState('All');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0); // in percentage

  // Initialize selected room if passed from previous navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const nights = calculateNights();

  // Calculate pricing
  const roomPricePerNight = selectedRoom ? selectedRoom.price : 0;
  const baseTotal = roomPricePerNight * nights;

  // Enhancements total
  const addonsTotal = selectedAddOns.reduce((sum, addId) => {
    const item = ADDONS.find(a => a.id === addId);
    return sum + (item ? item.price * (item.perPerson ? searchParams.adults : 1) : 0);
  }, 0);

  const discountAmount = Math.round((baseTotal * promoDiscount) / 100);
  const taxesAndFees = Math.round((baseTotal + addonsTotal - discountAmount) * 0.10); // 10% VAT & city tourism fee
  const grandTotal = Math.max(0, baseTotal + addonsTotal - discountAmount + taxesAndFees);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (appliedPromo.toUpperCase() === 'STAY3PAY2') {
      setPromoDiscount(33);
      showToast('Offer applied: 33% complimentary night discount!', 'success');
    } else if (appliedPromo.toUpperCase() === 'VIP2026' || appliedPromo.toUpperCase() === 'EARLYBIRD25') {
      setPromoDiscount(25);
      showToast('Promo code applied: 25% exclusive discount!', 'success');
    } else {
      showToast('Invalid or expired promo code', 'error');
    }
  };

  const handleToggleAddon = (addonId) => {
    if (selectedAddOns.includes(addonId)) {
      setSelectedAddOns(selectedAddOns.filter(id => id !== addonId));
    } else {
      setSelectedAddOns([...selectedAddOns, addonId]);
    }
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    const reference = `AGR-${Math.floor(10000 + Math.random() * 90000)}-2026`;
    const newBooking = {
      id: reference,
      status: "Confirmed",
      room: selectedRoom,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      nights,
      guests: { adults: searchParams.adults, children: searchParams.children },
      addOns: selectedAddOns,
      subtotal: baseTotal,
      discount: discountAmount,
      taxes: taxesAndFees,
      total: grandTotal,
      paymentMethod: paymentDetails.method === 'card' 
        ? `Card ending in ${paymentDetails.cardNumber.slice(-4) || '8842'}`
        : paymentDetails.method === 'paypal' ? 'PayPal Instant Guarantee' : 'Pay Upon Check-in',
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      canCancelUntil: "48 hours prior to arrival",
      guest: guestDetails,
      specialRequests: specialRequestsText
    };

    setConfirmedBooking(newBooking);
    setBookings(prev => [newBooking, ...prev]);
    setCurrentStep(5);
    showToast(`Booking ${reference} confirmed! Confirmation sent to ${guestDetails.email}`, 'success');
  };

  const steps = [
    { num: 1, label: "Select Sanctuary" },
    { num: 2, label: "Customization" },
    { num: 3, label: "Guest Details" },
    { num: 4, label: "Payment & Review" },
    { num: 5, label: "Confirmation" }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Stepper Header Bar */}
      <div className="bg-charcoal-950 text-white py-8 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-400">
                Official Reservation Engine
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Reserve Your Stay at Aurelia Grand Resort
              </h1>
            </div>
            <div className="flex items-center space-x-3 text-xs text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit SSL Encrypted & Best Rate Guaranteed</span>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="pt-6 flex items-center justify-between overflow-x-auto text-xs">
            {steps.map((st, i) => {
              const isPast = currentStep > st.num;
              const isCurrent = currentStep === st.num;
              return (
                <div key={st.num} className="flex items-center space-x-2 shrink-0">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    isPast 
                      ? 'bg-gold-500 text-charcoal-950' 
                      : isCurrent 
                        ? 'border-2 border-gold-400 bg-charcoal-900 text-gold-300' 
                        : 'border border-white/20 text-zinc-500'
                  }`}>
                    {isPast ? <Check className="w-3.5 h-3.5" /> : st.num}
                  </div>
                  <span className={`font-medium ${isCurrent ? 'text-gold-300 font-bold' : isPast ? 'text-zinc-200' : 'text-zinc-500'}`}>
                    {st.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="w-8 sm:w-16 h-[1px] bg-white/20 mx-2 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* ========================================================== */}
        {/* STEP 1: AVAILABILITY RESULTS & ROOM SELECTION              */}
        {/* ========================================================== */}
        {currentStep === 1 && (
          <div className="space-y-8">
            
            {/* Search Criteria Mini Toolbar */}
            <div className="bg-white p-5 rounded-xl border border-sand-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-4 text-zinc-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gold-600" />
                  <span><b>Dates:</b> {searchParams.checkIn} to {searchParams.checkOut} ({nights} Nights)</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gold-600" />
                  <span><b>Guests:</b> {searchParams.adults} Adults, {searchParams.children} Children</span>
                </div>
              </div>

              {/* Promo code mini form */}
              <form onSubmit={handleApplyPromo} className="flex items-center space-x-2 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={appliedPromo}
                  onChange={(e) => setAppliedPromo(e.target.value)}
                  className="px-3 py-1.5 bg-sand-100 border border-sand-300 rounded text-xs uppercase focus:outline-none focus:border-gold-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-charcoal-900 text-white rounded font-bold uppercase tracking-wider text-[11px]"
                >
                  Apply
                </button>
              </form>
            </div>

            {/* Room Availability Cards */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900">Available Sanctuaries ({ROOMS.length})</h2>
                <span className="text-xs text-zinc-500">All prices include high-speed Wi-Fi & wellness access</span>
              </div>

              <div className="space-y-6">
                {ROOMS.map((room) => {
                  const isSelected = selectedRoom?.id === room.id;
                  const roomTotal = room.price * nights;

                  return (
                    <div 
                      key={room.id}
                      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md flex flex-col lg:flex-row ${
                        isSelected ? 'border-gold-500 ring-2 ring-gold-400/30' : 'border-sand-300'
                      }`}
                    >
                      {/* Left: Image Carousel / Mosaic */}
                      <div className="lg:w-2/5 relative min-h-[240px] bg-charcoal-900">
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {room.popularBadge && (
                            <span className="px-2.5 py-1 rounded bg-gold-500 text-charcoal-950 text-[10px] font-bold uppercase">
                              {room.popularBadge}
                            </span>
                          )}
                          <span className="px-2.5 py-1 rounded bg-black/60 text-white text-[10px] font-mono">
                            {room.sizeSqM} m² / {room.sizeSqFt} ft²
                          </span>
                        </div>
                      </div>

                      {/* Right: Info, Amenities, Price & Select */}
                      <div className="p-6 lg:w-3/5 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-baseline justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
                              {room.category}
                            </span>
                            <span className="text-xs text-emerald-700 font-medium">Free Cancellation</span>
                          </div>
                          <h3 className="font-serif text-2xl font-bold text-charcoal-900">{room.name}</h3>
                          <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{room.description}</p>

                          <div className="flex flex-wrap gap-3 py-2 text-xs text-zinc-600 border-y border-sand-200">
                            <span><b>Bed:</b> {room.bed}</span>
                            <span>•</span>
                            <span><b>View:</b> {room.view}</span>
                            <span>•</span>
                            <span><b>Guests:</b> Up to {room.maxGuests}</span>
                          </div>

                          <div className="space-y-1 text-xs text-zinc-600">
                            {room.features.slice(0, 2).map((feat, i) => (
                              <p key={i} className="flex items-center space-x-1.5">
                                <Check className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                                <span>{feat}</span>
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Price & Selection Bar */}
                        <div className="pt-4 border-t border-sand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-baseline space-x-1">
                              <span className="font-serif text-3xl font-bold text-charcoal-900">{formatPrice(room.price)}</span>
                              <span className="text-xs text-zinc-500">/ night</span>
                            </div>
                            <span className="text-xs text-zinc-500">
                              Total for {nights} {nights === 1 ? 'Night' : 'Nights'}: <b>{formatPrice(roomTotal)}</b>
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedRoom(room);
                              setCurrentStep(2);
                            }}
                            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded shadow-gold-glow flex items-center justify-center space-x-2 transition-all"
                          >
                            <span>Select Sanctuary</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* STEP 2: ROOM CUSTOMIZATION & ENHANCEMENTS                  */}
        {/* ========================================================== */}
        {currentStep === 2 && selectedRoom && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-8 space-y-8">
              
              <div className="bg-white p-6 rounded-2xl border border-sand-300 space-y-4">
                <h2 className="font-serif text-2xl font-bold text-charcoal-900">Bedding & Arrival Preferences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">Bed Arrangement</label>
                    <select
                      value={bedPreference}
                      onChange={(e) => setBedPreference(e.target.value)}
                      className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900"
                    >
                      <option value="1 King Bed">1 King Bed (Preferred)</option>
                      <option value="2 Twin Beds">2 Separate Twin Beds</option>
                      <option value="1 King + Feather Featherbedding">1 King with Hypoallergenic Down Topper</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">Estimated Arrival Hour</label>
                    <select className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900">
                      <option>15:00 - Standard Check-in</option>
                      <option>16:00 - 18:00 (Late Afternoon)</option>
                      <option>18:00 - 21:00 (Evening)</option>
                      <option>After 21:00 (Night Arrival)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Add-ons Selector */}
              <div className="bg-white p-6 rounded-2xl border border-sand-300 space-y-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal-900">Enhance Your Sanctuary</h2>
                  <p className="text-xs text-zinc-500">Select premier dining, airport transfer, or wellness services to enrich your stay.</p>
                </div>

                <div className="space-y-3">
                  {ADDONS.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => handleToggleAddon(addon.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected ? 'bg-gold-50 border-gold-500 shadow-sm' : 'bg-white border-sand-300 hover:border-gold-400'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="w-4 h-4 accent-gold-500"
                          />
                          <div>
                            <p className="font-semibold text-charcoal-900 text-xs sm:text-sm">{addon.name}</p>
                            <p className="text-zinc-500 text-[11px] leading-relaxed">{addon.description}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <span className="font-serif font-bold text-charcoal-900 text-sm">
                            +{formatPrice(addon.price)}
                          </span>
                          {addon.perPerson && <span className="text-[10px] text-zinc-400 block">/ guest</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div className="bg-white p-6 rounded-2xl border border-sand-300 space-y-3">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">Special Guest Inquiries</h3>
                <p className="text-xs text-zinc-500">Dietary requirements, anniversary surprises, quiet room preferences, or pillow requests.</p>
                <textarea
                  rows={3}
                  value={specialRequestsText}
                  onChange={(e) => setSpecialRequestsText(e.target.value)}
                  placeholder="e.g. Please arrange for gluten-free breakfast and a bouquet of white peonies in the suite..."
                  className="w-full bg-sand-100 border border-sand-300 rounded-xl p-3 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:text-charcoal-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Room Selection</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded transition-all shadow-md flex items-center space-x-2"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4">
              <BookingSummarySidebar 
                room={selectedRoom} 
                nights={nights} 
                baseTotal={baseTotal} 
                addonsTotal={addonsTotal} 
                discountAmount={discountAmount}
                taxesAndFees={taxesAndFees}
                grandTotal={grandTotal}
                formatPrice={formatPrice}
              />
            </div>

          </div>
        )}

        {/* ========================================================== */}
        {/* STEP 3: GUEST INFORMATION                                  */}
        {/* ========================================================== */}
        {currentStep === 3 && selectedRoom && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sand-300 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal-900">Lead Guest Information</h2>
                  <p className="text-xs text-zinc-500">Your reservation voucher and door access codes will be sent to this email address.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={guestDetails.firstName}
                      onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                      className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={guestDetails.lastName}
                      onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                      className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={guestDetails.email}
                      onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                      className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-zinc-700 block mb-1">Mobile Phone (with country code) *</label>
                    <input
                      type="tel"
                      required
                      value={guestDetails.phone}
                      onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                      className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-zinc-700 block mb-1">Country of Residence *</label>
                    <input
                      type="text"
                      value={guestDetails.country}
                      onChange={(e) => setGuestDetails({ ...guestDetails, country: e.target.value })}
                      className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-zinc-700 block mb-1">Postal Address</label>
                    <input
                      type="text"
                      value={guestDetails.address}
                      onChange={(e) => setGuestDetails({ ...guestDetails, address: e.target.value })}
                      className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:text-charcoal-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Customization</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-8 py-3 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded transition-all shadow-md flex items-center space-x-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            <div className="lg:col-span-4">
              <BookingSummarySidebar 
                room={selectedRoom} 
                nights={nights} 
                baseTotal={baseTotal} 
                addonsTotal={addonsTotal} 
                discountAmount={discountAmount}
                taxesAndFees={taxesAndFees}
                grandTotal={grandTotal}
                formatPrice={formatPrice}
              />
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STEP 4: PAYMENT & SECURE CHECKOUT                          */}
        {/* ========================================================== */}
        {currentStep === 4 && selectedRoom && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sand-300 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal-900">Payment Guarantee Method</h2>
                  <p className="text-xs text-zinc-500">Select how you prefer to guarantee your reservation. No funds are debited prior to cancellation deadline.</p>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal Checkout', icon: ShieldCheck },
                    { id: 'hotel', label: 'Pay at Hotel', icon: Lock },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPaymentDetails({ ...paymentDetails, method: opt.id })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center space-y-1.5 transition-all ${
                        paymentDetails.method === opt.id 
                          ? 'border-gold-500 bg-gold-50 text-charcoal-900 shadow-sm' 
                          : 'border-sand-300 bg-sand-50 text-zinc-600 hover:bg-sand-100'
                      }`}
                    >
                      <opt.icon className="w-4 h-4 text-gold-600" />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>

                {/* Card Fields Form if card selected */}
                {paymentDetails.method === 'card' && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-zinc-700 block mb-1">Cardholder Name *</label>
                        <input
                          type="text"
                          value={paymentDetails.cardholderName}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardholderName: e.target.value })}
                          className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-zinc-700 block mb-1">Card Number *</label>
                        <input
                          type="text"
                          value={paymentDetails.cardNumber}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                          className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-zinc-700 block mb-1">Expiry Date *</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentDetails.expiry}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                          className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-zinc-700 block mb-1">Security Code (CVV) *</label>
                        <input
                          type="text"
                          placeholder="3 digits"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                          className="w-full bg-sand-100 border border-sand-300 rounded p-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentDetails.method === 'paypal' && (
                  <div className="p-4 bg-sand-100 rounded-xl border border-sand-300 text-xs text-zinc-600">
                    <p>You will be authenticated via PayPal Instant Guarantee upon confirming your booking.</p>
                  </div>
                )}

                {paymentDetails.method === 'hotel' && (
                  <div className="p-4 bg-sand-100 rounded-xl border border-sand-300 text-xs text-zinc-600">
                    <p>Your card details will be held securely as a guarantee. You may settle all room charges, restaurant bills, and spa services at check-out.</p>
                  </div>
                )}

                {/* Consent & Terms */}
                <div className="p-4 bg-sand-100 rounded-xl border border-sand-300 space-y-2 text-xs text-zinc-600">
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-gold-500 mt-0.5" />
                    <span>I agree to Aurelia Grand Resort Terms of Hospitality, Best Rate Guarantee conditions, and cancellation policies.</span>
                  </div>
                </div>
              </div>

              {/* Navigation & Submit CTA */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center space-x-2 px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:text-charcoal-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Guest Details</span>
                </button>
                <button
                  onClick={handleCompleteBooking}
                  className="px-10 py-4 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 text-charcoal-950 font-bold uppercase tracking-widest text-xs rounded shadow-gold-glow flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Complete Booking ({formatPrice(grandTotal)})</span>
                </button>
              </div>

            </div>

            <div className="lg:col-span-4">
              <BookingSummarySidebar 
                room={selectedRoom} 
                nights={nights} 
                baseTotal={baseTotal} 
                addonsTotal={addonsTotal} 
                discountAmount={discountAmount}
                taxesAndFees={taxesAndFees}
                grandTotal={grandTotal}
                formatPrice={formatPrice}
              />
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* STEP 5: BOOKING CONFIRMATION SUCCESS STATE                 */}
        {/* ========================================================== */}
        {currentStep === 5 && confirmedBooking && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            
            {/* Success Hero Card */}
            <div className="bg-charcoal-950 text-white rounded-2xl p-8 sm:p-10 border border-gold-500/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Booking Officially Confirmed</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                    We Await Your Arrival, {confirmedBooking.guest.firstName}
                  </h2>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    A confirmation voucher with check-in instructions has been dispatched to <b>{confirmedBooking.guest.email}</b>.
                  </p>
                </div>

                {/* Reference ID Pill */}
                <div className="bg-charcoal-900 border border-gold-400/40 p-4 rounded-xl text-center shrink-0">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block">Booking Reference</span>
                  <span className="font-mono text-xl font-bold text-gold-400 tracking-wider">{confirmedBooking.id}</span>
                </div>
              </div>

              {/* Booking Folio Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-xs">
                <div className="space-y-1">
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Sanctuary Reserved</span>
                  <p className="font-serif font-bold text-white text-base">{confirmedBooking.room.name}</p>
                  <p className="text-zinc-400">{confirmedBooking.room.view} • {confirmedBooking.room.bed}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Dates of Stay</span>
                  <p className="font-serif font-bold text-white text-base">{confirmedBooking.checkIn} — {confirmedBooking.checkOut}</p>
                  <p className="text-zinc-400">{confirmedBooking.nights} Nights • {confirmedBooking.guests.adults} Guests</p>
                </div>
                <div className="space-y-1">
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Payment Settlement</span>
                  <p className="font-serif font-bold text-gold-400 text-base">{formatPrice(confirmedBooking.total)}</p>
                  <p className="text-zinc-400">{confirmedBooking.paymentMethod}</p>
                </div>
              </div>

              {/* QR Code & Direct Actions Row */}
              <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
                    <QrCode className="w-9 h-9 text-charcoal-950" />
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    <p className="font-semibold text-white">Digital Key & Folio QR</p>
                    <p>Present at front desk for priority express check-in</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-white/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Voucher</span>
                  </button>
                  <button
                    onClick={() => showToast(`Voucher resent to ${confirmedBooking.guest.email}`, 'success')}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-white/20"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Resend Email</span>
                  </button>
                  <button
                    onClick={() => navigate('/manage-booking')}
                    className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Manage Reservation
                  </button>
                </div>
              </div>

            </div>

            {/* Next Steps Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sand-300 space-y-4 text-xs">
              <h3 className="font-serif text-lg font-bold text-charcoal-900">Pre-Arrival Itinerary Services</h3>
              <p className="text-zinc-600">Enhance your arrival with table reservations at Horizon, private Riva yacht charters, or spa treatments.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <button
                  onClick={() => navigate('/restaurant-reservation')}
                  className="p-4 bg-sand-100 hover:bg-sand-200 rounded-xl text-left transition-colors space-y-1"
                >
                  <Coffee className="w-4 h-4 text-gold-600" />
                  <p className="font-semibold text-charcoal-900">Reserve Fine Dining Table</p>
                  <p className="text-[11px] text-zinc-500">Secure sunset seating at Horizon</p>
                </button>
                <button
                  onClick={() => navigate('/spa')}
                  className="p-4 bg-sand-100 hover:bg-sand-200 rounded-xl text-left transition-colors space-y-1"
                >
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <p className="font-semibold text-charcoal-900">Book Spa Ritual</p>
                  <p className="text-[11px] text-zinc-500">Restore vitality upon arrival</p>
                </button>
                <button
                  onClick={() => navigate('/room-service')}
                  className="p-4 bg-sand-100 hover:bg-sand-200 rounded-xl text-left transition-colors space-y-1"
                >
                  <Heart className="w-4 h-4 text-gold-600" />
                  <p className="font-semibold text-charcoal-900">In-Room Dining Menu</p>
                  <p className="text-[11px] text-zinc-500">Browse 24-hour room service</p>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

// Reusable Summary Sidebar Component for Step 2, 3, 4
const BookingSummarySidebar = ({ room, nights, baseTotal, addonsTotal, discountAmount, taxesAndFees, grandTotal, formatPrice }) => {
  return (
    <div className="bg-white border border-sand-300 rounded-2xl p-6 shadow-luxury space-y-5 sticky top-28 text-xs">
      <div className="border-b border-sand-200 pb-4 space-y-3">
        <img src={room.images[0]} alt={room.name} className="w-full h-36 object-cover rounded-xl" />
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600">{room.category}</span>
          <h4 className="font-serif text-lg font-bold text-charcoal-900">{room.name}</h4>
          <p className="text-zinc-500 text-[11px]">{room.view} • {room.bed}</p>
        </div>
      </div>

      <div className="space-y-2 text-zinc-600">
        <div className="flex justify-between">
          <span>{formatPrice(room.price)} × {nights} Nights</span>
          <span className="font-medium text-charcoal-900">{formatPrice(baseTotal)}</span>
        </div>
        {addonsTotal > 0 && (
          <div className="flex justify-between text-gold-700">
            <span>Enhancement Services</span>
            <span className="font-medium">+{formatPrice(addonsTotal)}</span>
          </div>
        )}
        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-700 font-medium">
            <span>Promotional Privilege</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between text-zinc-500">
          <span>Resort City Tax & VAT (10%)</span>
          <span>{formatPrice(taxesAndFees)}</span>
        </div>
      </div>

      <div className="border-t border-sand-300 pt-4 flex justify-between items-baseline">
        <span className="font-serif font-bold text-base text-charcoal-900">Total Price</span>
        <span className="font-serif text-2xl font-bold text-gold-600">{formatPrice(grandTotal)}</span>
      </div>

      <div className="pt-2 text-[11px] text-zinc-500 space-y-1">
        <p className="flex items-center space-x-1.5 text-emerald-700">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Best Rate Guarantee Protection</span>
        </p>
        <p>Free cancellation up to 48 hours prior to arrival</p>
      </div>
    </div>
  );
};
