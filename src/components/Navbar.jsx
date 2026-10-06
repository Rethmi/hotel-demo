import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Compass, Globe, DollarSign, Bookmark, Bell, User, Calendar, 
  Menu, X, Search, ChevronDown, Check, Sparkles, Phone, ShieldCheck 
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { CURRENCIES, LANGUAGES, HOTEL_INFO } from '../data/hotelData';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currency, setCurrency, 
    language, setLanguage, 
    wishlist, notifications, setNotifications, 
    isAuthenticated, user, 
    setIsSearchOpen 
  } = useHotel();

  const isHome = location.pathname === '/';

  // Listen to scroll to toggle transparent vs blurred dark navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCurrencyDropdownOpen(false);
    setLangDropdownOpen(false);
    setNotifDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms & Suites", path: "/rooms" },
    { name: "Offers", path: "/offers" },
    { name: "Dining", path: "/dining" },
    { name: "Spa & Wellness", path: "/spa" },
    { name: "Experiences", path: "/experiences" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
  ];

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const markAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const navBackgroundClass = !isHome || isScrolled
    ? "bg-[#0F1115]/95 backdrop-blur-md border-b border-gold-500/20 shadow-2xl py-3.5"
    : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackgroundClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Brand Wordmark & Crest */}
            <Link to="/" className="group flex items-center space-x-3.5 focus:outline-none">
              <div className="w-10 h-10 rounded-full border border-gold-400/40 bg-charcoal-900/60 flex items-center justify-center transition-transform group-hover:scale-105 shadow-gold-glow">
                <span className="font-serif text-lg font-bold text-gold-400 tracking-wider">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.22em] text-white uppercase group-hover:text-gold-300 transition-colors">
                  Aurelia
                </span>
                <span className="text-[9px] tracking-[0.35em] text-gold-400/90 uppercase font-sans font-medium -mt-1">
                  Grand Resort
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-6 text-[13px] tracking-wider uppercase font-medium">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-1 transition-colors duration-200 ${
                      isActive 
                        ? "text-gold-400 font-semibold" 
                        : "text-zinc-200 hover:text-gold-300"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Tools */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              {/* Global Search Trigger */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                title="Search resort"
                className="p-2 text-zinc-300 hover:text-gold-400 transition-colors hover:bg-white/5 rounded-full"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Link */}
              <Link 
                to="/account/wishlist"
                title="Curated Wishlist"
                className="relative p-2 text-zinc-300 hover:text-gold-400 transition-colors hover:bg-white/5 rounded-full"
              >
                <Bookmark className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-gold-500 text-charcoal-950 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Currency Selector Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => {
                    setCurrencyDropdownOpen(!currencyDropdownOpen);
                    setLangDropdownOpen(false);
                    setNotifDropdownOpen(false);
                  }}
                  className="flex items-center space-x-1 text-xs text-zinc-300 hover:text-gold-400 transition-colors px-2 py-1.5 rounded border border-white/10 hover:border-gold-500/40 bg-white/5"
                >
                  <DollarSign className="w-3.5 h-3.5 text-gold-400" />
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
                </button>
                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-charcoal-900 border border-gold-500/30 rounded-lg shadow-2xl py-1 z-50 animate-fade-in text-xs">
                    {Object.entries(CURRENCIES).map(([code, cur]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrency(code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-white/10 ${
                          currency === code ? "text-gold-400 font-bold bg-gold-500/10" : "text-zinc-200"
                        }`}
                      >
                        <span>{cur.label}</span>
                        {currency === code && <Check className="w-3 h-3 text-gold-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Selector Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => {
                    setLangDropdownOpen(!langDropdownOpen);
                    setCurrencyDropdownOpen(false);
                    setNotifDropdownOpen(false);
                  }}
                  className="flex items-center space-x-1 text-xs text-zinc-300 hover:text-gold-400 transition-colors px-2 py-1.5 rounded border border-white/10 hover:border-gold-500/40 bg-white/5"
                >
                  <Globe className="w-3.5 h-3.5 text-gold-400" />
                  <span>{language}</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
                </button>
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-charcoal-900 border border-gold-500/30 rounded-lg shadow-2xl py-1 z-50 animate-fade-in text-xs">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-white/10 ${
                          language === lang.code ? "text-gold-400 font-bold bg-gold-500/10" : "text-zinc-200"
                        }`}
                      >
                        <span>{lang.flag} {lang.name}</span>
                        {language === lang.code && <Check className="w-3 h-3 text-gold-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifications Popover */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifDropdownOpen(!notifDropdownOpen);
                    setCurrencyDropdownOpen(false);
                    setLangDropdownOpen(false);
                  }}
                  className="relative p-2 text-zinc-300 hover:text-gold-400 transition-colors hover:bg-white/5 rounded-full"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifs > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                  )}
                </button>
                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-charcoal-900 border border-gold-500/30 rounded-xl shadow-2xl p-4 z-50 animate-fade-in text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-sm font-semibold text-white">Notifications</span>
                        <span className="bg-gold-500/20 text-gold-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          {unreadNotifs} New
                        </span>
                      </div>
                      {unreadNotifs > 0 && (
                        <button
                          onClick={markAllNotifsRead}
                          className="text-[11px] text-gold-400 hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="divide-y divide-white/5 max-h-72 overflow-y-auto my-2">
                      {notifications.map(item => (
                        <div key={item.id} className={`py-2.5 px-2 rounded transition-colors ${!item.read ? 'bg-white/5' : 'opacity-70'}`}>
                          <div className="flex items-start justify-between">
                            <p className="font-semibold text-zinc-200">{item.title}</p>
                            <span className="text-[10px] text-zinc-500">{item.time}</span>
                          </div>
                          <p className="text-zinc-400 mt-1 text-[11px] leading-relaxed">{item.message}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/account/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="block text-center pt-2 border-t border-white/10 text-gold-400 hover:underline text-[11px] font-medium"
                    >
                      View all notification records →
                    </Link>
                  </div>
                )}
              </div>

              {/* Manage Stay Shortcut */}
              <Link
                to="/manage-booking"
                className="hidden lg:flex items-center space-x-1 text-xs text-zinc-300 hover:text-gold-300 font-medium tracking-wide uppercase px-2 py-1"
              >
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>My Booking</span>
              </Link>

              {/* Customer Account / Sign In */}
              {isAuthenticated ? (
                <Link
                  to="/account"
                  className="flex items-center space-x-2 bg-charcoal-800/80 hover:bg-charcoal-700 border border-gold-500/30 px-2.5 py-1.5 rounded-full transition-all group"
                  title="Aurelia Member Dashboard"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-gold-400/60"
                  />
                  <span className="text-xs font-medium text-gold-300 hidden md:inline truncate max-w-[100px]">
                    {user.membershipTier}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="flex items-center space-x-1 text-xs text-zinc-200 hover:text-gold-400 font-medium uppercase tracking-wide px-2 py-1"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Primary Book Now CTA */}
              <Link
                to="/booking"
                className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs uppercase tracking-widest font-semibold text-charcoal-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 rounded-sm shadow-gold-glow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Book Now
              </Link>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-zinc-200 hover:text-gold-400 focus:outline-none"
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal-950/98 backdrop-blur-xl xl:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-between pb-6 border-b border-gold-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-gold-400/40 bg-charcoal-900 flex items-center justify-center">
                <span className="font-serif text-lg font-bold text-gold-400">A</span>
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-white tracking-widest uppercase">Aurelia</p>
                <p className="text-[10px] tracking-widest text-gold-400 uppercase">Grand Resort</p>
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 py-6 border-b border-white/10 text-base uppercase tracking-wider font-serif">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-1.5 transition-colors ${
                  location.pathname === link.path ? "text-gold-400 font-bold" : "text-zinc-200 hover:text-gold-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/room-service"
              className="py-1.5 text-zinc-200 hover:text-gold-300 flex items-center justify-between"
            >
              <span>Room Service Dining</span>
              <span className="text-[10px] bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded">In-Stay</span>
            </Link>
            <Link
              to="/manage-booking"
              className="py-1.5 text-zinc-200 hover:text-gold-300"
            >
              Find & Manage Stay
            </Link>
          </nav>

          <div className="py-6 space-y-4 border-b border-white/10 text-sm">
            {/* Currency & Language Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-400 text-xs block mb-1">Currency</label>
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
                <label className="text-zinc-400 text-xs block mb-1">Language</label>
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
            <div className="pt-2 flex items-center justify-between">
              {isAuthenticated ? (
                <Link
                  to="/account"
                  className="flex items-center space-x-3 text-gold-300"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-gold-400" />
                  <div>
                    <p className="font-semibold text-white text-xs">{user.name}</p>
                    <p className="text-[11px] text-gold-400">{user.membershipTier} Member • {user.points.toLocaleString()} pts</p>
                  </div>
                </Link>
              ) : (
                <Link to="/signin" className="text-gold-400 font-semibold text-sm">
                  Sign in or Join Aurelia Privileges
                </Link>
              )}
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <Link
              to="/booking"
              className="w-full py-3 text-center text-xs uppercase tracking-widest font-bold text-charcoal-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 rounded block shadow-gold-glow"
            >
              Book Your Sanctuary
            </Link>
            <div className="flex items-center justify-center space-x-4 text-xs text-zinc-400 pt-2">
              <a href={`tel:${HOTEL_INFO.phone}`} className="flex items-center space-x-1 hover:text-white">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Direct Concierge</span>
              </a>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center space-x-1 text-gold-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Best Rate Guarantee</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
