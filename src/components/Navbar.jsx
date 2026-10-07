import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Globe, Bookmark, User, Calendar, 
  Menu, X, Search, ChevronDown, Check, Sparkles, 
  Phone, ShieldCheck, LogOut, Bell
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { CURRENCIES, LANGUAGES, HOTEL_INFO } from '../data/hotelData';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefDropdownOpen, setPrefDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const prefRef = useRef(null);
  const accountRef = useRef(null);

  const { 
    currency, setCurrency, 
    language, setLanguage, 
    wishlist, notifications, 
    isAuthenticated, setIsAuthenticated, user, 
    setIsSearchOpen, showToast 
  } = useHotel();

  const isHome = location.pathname === '/';

  // Smooth scroll listener for backdrop transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change or outside click
  useEffect(() => {
    setMobileMenuOpen(false);
    setPrefDropdownOpen(false);
    setAccountDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (prefRef.current && !prefRef.current.contains(e.target)) {
        setPrefDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Curated, editorial navigation links
  const navLinks = [
    { name: "Rooms & Suites", path: "/rooms" },
    { name: "Dining", path: "/dining" },
    { name: "Spa & Wellness", path: "/spa" },
    { name: "Experiences", path: "/experiences" },
    { name: "Offers", path: "/offers" },
    { name: "Events", path: "/events" },
    { name: "The Estate", path: "/about" },
  ];

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setAccountDropdownOpen(false);
    showToast('Signed out of Aurelia account', 'info');
    navigate('/signin');
  };

  const navBackgroundClass = !isHome || isScrolled
    ? "bg-[#0D0F14]/94 backdrop-blur-xl border-b border-gold-500/20 py-3.5 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.6)]"
    : "bg-gradient-to-b from-[#0B0D11]/85 via-[#0B0D11]/40 to-transparent py-5 sm:py-6 border-b border-white/[0.04]";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBackgroundClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 3-Zone Header Bar */}
          <div className="relative flex items-center justify-between h-12 sm:h-14">
            
            {/* ============================================================ */}
            {/* ZONE 1 (LEFT): Brand Seal & Heritage Wordmark               */}
            {/* ============================================================ */}
            <div className="flex items-center shrink-0 z-10">
              <Link 
                to="/" 
                className="group flex items-center space-x-3 sm:space-x-3.5 focus:outline-none"
                aria-label="Aurelia Grand Resort Home"
              >
                {/* Refined Gold Crest Seal */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold-400/40 bg-charcoal-900/80 flex items-center justify-center transition-all duration-300 group-hover:border-gold-300 group-hover:scale-105 shadow-gold-glow">
                  <span className="font-serif text-base sm:text-lg font-bold text-gold-300 tracking-wider">A</span>
                </div>

                {/* Typography Wordmark */}
                <div className="flex flex-col text-left">
                  <span className="font-serif text-[17px] sm:text-[19px] font-medium tracking-[0.24em] text-white uppercase group-hover:text-gold-200 transition-colors leading-tight">
                    Aurelia
                  </span>
                  <div className="flex items-center space-x-1.5 -mt-0.5">
                    <span className="text-[8.5px] sm:text-[9px] tracking-[0.38em] text-gold-400/90 uppercase font-sans font-medium">
                      Grand Resort
                    </span>
                    <span className="text-zinc-600 text-[8px]">•</span>
                    <span className="text-[7.5px] tracking-[0.25em] text-zinc-400 uppercase font-sans hidden sm:inline">
                      Côte d'Azur
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* ============================================================ */}
            {/* ZONE 2 (CENTER): Absolute-Centered Primary Navigation Links  */}
            {/* ============================================================ */}
            <nav className="hidden xl:flex items-center absolute left-1/2 -translate-x-1/2 space-x-6 2xl:space-x-8 text-[12px] tracking-[0.16em] uppercase font-medium">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-1.5 transition-all duration-200 ${
                      isActive 
                        ? "text-gold-400 font-semibold" 
                        : "text-zinc-300/90 hover:text-gold-200"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ============================================================ */}
            {/* ZONE 3 (RIGHT): Restrained Luxury Utilities & Primary CTA    */}
            {/* ============================================================ */}
            <div className="flex items-center justify-end space-x-2.5 sm:space-x-3 z-10 shrink-0">
              
              {/* Global Search Button */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                title="Search resort (Ctrl+K)"
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-300 hover:text-gold-300 hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Bookmark */}
              <Link 
                to="/account/wishlist"
                title="Saved Sanctuaries"
                className="relative w-8 h-8 rounded-full flex items-center justify-center text-zinc-300 hover:text-gold-300 hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Wishlist"
              >
                <Bookmark className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 text-[9px] font-bold bg-gold-500 text-charcoal-950 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Unified Preferences Trigger (Currency & Language) */}
              <div className="relative hidden md:block" ref={prefRef}>
                <button
                  onClick={() => {
                    setPrefDropdownOpen(!prefDropdownOpen);
                    setAccountDropdownOpen(false);
                  }}
                  className="flex items-center space-x-1.5 text-xs text-zinc-300 hover:text-gold-300 transition-colors px-2.5 py-1.5 rounded-full border border-white/10 hover:border-gold-500/40 bg-white/[0.03] backdrop-blur-sm"
                  title="Currency & Language"
                >
                  <Globe className="w-3.5 h-3.5 text-gold-400" />
                  <span className="font-sans font-medium tracking-wider text-[11px]">{currency} · {language}</span>
                  <ChevronDown className="w-3 h-3 text-zinc-400 opacity-70 ml-0.5" />
                </button>

                {/* Unified Preferences Popover */}
                {prefDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-64 bg-charcoal-900/98 border border-gold-500/30 rounded-xl shadow-2xl p-4 z-50 animate-fade-in text-xs text-zinc-200 divide-y divide-white/10">
                    
                    {/* Currency List */}
                    <div className="pb-3 space-y-1.5">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-gold-400">Select Currency</p>
                      <div className="grid grid-cols-2 gap-1 pt-1">
                        {Object.entries(CURRENCIES).map(([code, cur]) => (
                          <button
                            key={code}
                            onClick={() => {
                              setCurrency(code);
                              setPrefDropdownOpen(false);
                            }}
                            className={`px-2.5 py-1.5 rounded text-left flex items-center justify-between transition-colors ${
                              currency === code 
                                ? 'bg-gold-500/15 text-gold-300 font-bold' 
                                : 'hover:bg-white/5 text-zinc-300'
                            }`}
                          >
                            <span>{cur.symbol} {code}</span>
                            {currency === code && <Check className="w-3 h-3 text-gold-400" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language List */}
                    <div className="pt-3 space-y-1.5">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-gold-400">Select Language</p>
                      <div className="grid grid-cols-2 gap-1 pt-1">
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setPrefDropdownOpen(false);
                            }}
                            className={`px-2.5 py-1.5 rounded text-left flex items-center justify-between transition-colors ${
                              language === lang.code 
                                ? 'bg-gold-500/15 text-gold-300 font-bold' 
                                : 'hover:bg-white/5 text-zinc-300'
                            }`}
                          >
                            <span>{lang.flag} {lang.name}</span>
                            {language === lang.code && <Check className="w-3 h-3 text-gold-400" />}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Guest Portal / Account Access */}
              <div className="relative" ref={accountRef}>
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      setAccountDropdownOpen(!accountDropdownOpen);
                      setPrefDropdownOpen(false);
                    }}
                    className="flex items-center space-x-2 bg-charcoal-800/60 hover:bg-charcoal-800 border border-gold-500/30 pl-1.5 pr-2.5 py-1 rounded-full transition-all group focus:outline-none"
                    title="Aurelia Member Portal"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-gold-400/60"
                    />
                    <span className="text-[11px] font-medium text-gold-300 hidden sm:inline truncate max-w-[85px]">
                      {user.membershipTier}
                    </span>
                    <ChevronDown className="w-3 h-3 text-zinc-400 opacity-60" />
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="hidden sm:flex items-center space-x-1.5 text-xs text-zinc-300 hover:text-gold-300 font-medium uppercase tracking-wider px-2 py-1"
                  >
                    <User className="w-3.5 h-3.5 text-gold-400" />
                    <span>Sign In</span>
                  </Link>
                )}

                {/* Account Portal Popover */}
                {accountDropdownOpen && isAuthenticated && (
                  <div className="absolute right-0 mt-2.5 w-64 bg-charcoal-900/98 border border-gold-500/30 rounded-xl shadow-2xl p-4 z-50 animate-fade-in text-xs text-zinc-200 space-y-3">
                    <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-gold-400" />
                      <div className="truncate">
                        <p className="font-semibold text-white text-xs truncate">{user.name}</p>
                        <p className="text-[10px] text-gold-400 font-medium uppercase tracking-wider">
                          {user.membershipTier} • {user.points.toLocaleString()} pts
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to="/account"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-2 py-2 rounded hover:bg-white/5 text-zinc-300 hover:text-white transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-gold-400" />
                        <span>Member Dashboard</span>
                      </Link>
                      <Link
                        to="/manage-booking"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-2 py-2 rounded hover:bg-white/5 text-zinc-300 hover:text-white transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-gold-400" />
                        <span>Find & Manage Stay</span>
                      </Link>
                      <Link
                        to="/account/notifications"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center justify-between px-2 py-2 rounded hover:bg-white/5 text-zinc-300 hover:text-white transition-colors"
                      >
                        <div className="flex items-center space-x-2.5">
                          <Bell className="w-3.5 h-3.5 text-gold-400" />
                          <span>Notifications</span>
                        </div>
                        {unreadNotifs > 0 && (
                          <span className="text-[10px] bg-gold-500 text-charcoal-950 font-bold px-1.5 py-0.2 rounded-full">
                            {unreadNotifs}
                          </span>
                        )}
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left flex items-center space-x-2 px-2 py-1.5 text-zinc-400 hover:text-rose-400 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary "Book Now" CTA */}
              <Link
                to="/booking"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-charcoal-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 rounded-sm shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
              >
                Book Now
              </Link>

              {/* Mobile Drawer Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-1.5 text-zinc-200 hover:text-gold-400 focus:outline-none transition-colors"
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* MOBILE & TABLET DRAWER MENU (RESPONSIVE)                     */}
      {/* ============================================================ */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal-950/98 backdrop-blur-2xl xl:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto animate-fade-in">
          
          <div className="flex items-center justify-between pb-5 border-b border-gold-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-gold-400/40 bg-charcoal-900 flex items-center justify-center">
                <span className="font-serif text-lg font-bold text-gold-300">A</span>
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-white tracking-[0.2em] uppercase">Aurelia</p>
                <p className="text-[9px] tracking-[0.35em] text-gold-400 uppercase">Grand Resort</p>
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-3.5 py-6 border-b border-white/10 text-sm uppercase tracking-[0.18em] font-sans">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-1 transition-colors ${
                  location.pathname === link.path ? "text-gold-400 font-bold" : "text-zinc-200 hover:text-gold-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/gallery"
              className="py-1 text-zinc-200 hover:text-gold-300"
            >
              Resort Gallery
            </Link>
            <Link
              to="/room-service"
              className="py-1 text-zinc-200 hover:text-gold-300 flex items-center justify-between"
            >
              <span>Room Service</span>
              <span className="text-[9px] bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded uppercase tracking-wider">In-Stay</span>
            </Link>
            <Link
              to="/manage-booking"
              className="py-1 text-zinc-200 hover:text-gold-300"
            >
              Find & Manage Stay
            </Link>
          </nav>

          <div className="py-6 space-y-4 border-b border-white/10 text-xs">
            {/* Currency & Language Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-400 text-[11px] block mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-charcoal-900 border border-white/20 text-white rounded p-2 text-xs"
                >
                  {Object.entries(CURRENCIES).map(([code, cur]) => (
                    <option key={code} value={code}>{cur.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-zinc-400 text-[11px] block mb-1">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-charcoal-900 border border-white/20 text-white rounded p-2 text-xs"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Account Quick Links */}
            <div className="pt-2">
              {isAuthenticated ? (
                <Link
                  to="/account"
                  className="flex items-center space-x-3 text-gold-300 p-2 rounded-lg bg-charcoal-900 border border-gold-500/20"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-gold-400" />
                  <div>
                    <p className="font-semibold text-white text-xs">{user.name}</p>
                    <p className="text-[10px] text-gold-400 uppercase tracking-wider">{user.membershipTier} Member • {user.points.toLocaleString()} pts</p>
                  </div>
                </Link>
              ) : (
                <Link to="/signin" className="text-gold-400 font-semibold text-xs block text-center py-2 border border-gold-500/30 rounded-lg">
                  Sign in or Join Aurelia Privileges
                </Link>
              )}
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <Link
              to="/booking"
              className="w-full py-3.5 text-center text-xs uppercase tracking-widest font-bold text-charcoal-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 rounded block shadow-gold-glow"
            >
              Book Your Sanctuary
            </Link>
            <div className="flex items-center justify-center space-x-4 text-xs text-zinc-400 pt-2">
              <a href={`tel:${HOTEL_INFO.phone}`} className="flex items-center space-x-1 hover:text-white">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Concierge Desk</span>
              </a>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center space-x-1 text-gold-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Best Rate Guaranteed</span>
              </span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
