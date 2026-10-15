import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Globe, Bookmark, User, Calendar,
  Menu, X, Search, ChevronDown, Check,
  Phone, ShieldCheck, LogOut, Bell
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { CURRENCIES, LANGUAGES, HOTEL_INFO } from '../data/hotelData';

// Desktop shows the six core destinations; the drawer adds the secondary pages.
const PRIMARY_LINKS = [
  { name: 'Rooms & Suites', path: '/rooms' },
  { name: 'Dining', path: '/dining' },
  { name: 'Spa & Wellness', path: '/spa' },
  { name: 'Experiences', path: '/experiences' },
  { name: 'Offers', path: '/offers' },
  { name: 'The Estate', path: '/about' },
];

const SECONDARY_LINKS = [
  { name: 'Events & Galas', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Manage a booking', path: '/manage-booking' },
];

const iconButton =
  'relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-300 transition-colors ' +
  'hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70';

const menuItem =
  'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-zinc-300 transition-colors ' +
  'hover:bg-white/[0.06] hover:text-white';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefOpen, setPrefOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

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
  const isSolid = !isHome || isScrolled || mobileMenuOpen;
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  // Background transition on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setPrefOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  // Outside click + Escape
  useEffect(() => {
    const onMouseDown = (e) => {
      if (prefRef.current && !prefRef.current.contains(e.target)) setPrefOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setPrefOpen(false);
        setAccountOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Lock page scroll behind the drawer
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setAccountOpen(false);
    showToast('Signed out of Aurelia account', 'info');
    navigate('/signin');
  };

  const headerSurface = isSolid
    ? 'bg-charcoal-950/95 backdrop-blur-lg border-b border-white/10 shadow-[0_1px_0_rgba(0,0,0,0.4)]'
    : 'bg-gradient-to-b from-black/70 to-transparent border-b border-transparent';

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerSurface}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between gap-6 transition-[height] duration-300 ${
              isScrolled ? 'h-16' : 'h-[72px]'
            }`}
          >
            {/* Brand */}
            <Link
              to="/"
              aria-label="Aurelia Grand Resort, home"
              className="group flex shrink-0 items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/50 transition-colors group-hover:border-gold-300">
                <span className="font-serif text-lg text-gold-300">A</span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[22px] tracking-wide text-white">Aurelia</span>
                <span className="mt-1 text-[11px] tracking-[0.18em] text-gold-400">Grand Resort</span>
              </span>
            </Link>

            {/* Primary navigation */}
            <nav aria-label="Primary" className="hidden flex-1 justify-center xl:flex">
              <ul className="flex items-center gap-8">
                {PRIMARY_LINKS.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        aria-current={active ? 'page' : undefined}
                        className={`relative block whitespace-nowrap py-2 text-[14.5px] font-medium transition-colors ${
                          active ? 'text-white' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {link.name}
                        <span
                          className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-gold-400 transition-transform duration-200 ${
                            active ? 'scale-x-100' : 'scale-x-0'
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Utilities */}
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className={iconButton}
                aria-label="Search the resort"
                title="Search (Ctrl+K)"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>

              <Link to="/account/wishlist" className={iconButton} aria-label="Saved suites" title="Saved suites">
                <Bookmark className="h-[18px] w-[18px]" />
                {wishlist.length > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold-400 px-1 text-[10px] font-semibold leading-none text-charcoal-950">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Currency & language */}
              <div className="relative hidden xl:block" ref={prefRef}>
                <button
                  type="button"
                  onClick={() => { setPrefOpen((v) => !v); setAccountOpen(false); }}
                  aria-expanded={prefOpen}
                  aria-haspopup="true"
                  className="flex h-9 items-center gap-2 rounded-full px-3 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                >
                  <Globe className="h-4 w-4 text-gold-400" />
                  <span>{language} / {currency}</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${prefOpen ? 'rotate-180' : ''}`} />
                </button>

                {prefOpen && (
                  <div className="absolute right-0 mt-3 w-72 animate-fade-in rounded-lg border border-white/10 bg-charcoal-900 p-4 shadow-2xl">
                    <p className="mb-2 text-xs font-medium text-zinc-500">Currency</p>
                    <div className="grid grid-cols-2 gap-1">
                      {Object.entries(CURRENCIES).map(([code, cur]) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => { setCurrency(code); setPrefOpen(false); }}
                          className={`flex items-center justify-between rounded-md px-2.5 py-2 text-left text-[13px] transition-colors ${
                            currency === code
                              ? 'bg-gold-400/10 text-gold-300'
                              : 'text-zinc-300 hover:bg-white/[0.06]'
                          }`}
                        >
                          <span>{cur.symbol} {code}</span>
                          {currency === code && <Check className="h-3.5 w-3.5" />}
                        </button>
                      ))}
                    </div>

                    <div className="my-4 h-px bg-white/10" />

                    <p className="mb-2 text-xs font-medium text-zinc-500">Language</p>
                    <div className="grid grid-cols-2 gap-1">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => { setLanguage(lang.code); setPrefOpen(false); }}
                          className={`flex items-center justify-between rounded-md px-2.5 py-2 text-left text-[13px] transition-colors ${
                            language === lang.code
                              ? 'bg-gold-400/10 text-gold-300'
                              : 'text-zinc-300 hover:bg-white/[0.06]'
                          }`}
                        >
                          <span>{lang.flag} {lang.name}</span>
                          {language === lang.code && <Check className="h-3.5 w-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <span className="mx-2 hidden h-5 w-px bg-white/15 xl:block" aria-hidden="true" />

              {/* Account */}
              <div className="relative hidden xl:block" ref={accountRef}>
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => { setAccountOpen((v) => !v); setPrefOpen(false); }}
                    aria-expanded={accountOpen}
                    aria-haspopup="true"
                    className="flex h-9 items-center gap-2 rounded-full pl-1 pr-2.5 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                  >
                    <span className="relative">
                      <img
                        src={user.avatar}
                        alt=""
                        className="h-7 w-7 rounded-full border border-gold-400/60 object-cover"
                      />
                      {unreadNotifs > 0 && (
                        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-charcoal-950 bg-gold-400" />
                      )}
                    </span>
                    <span className="text-[13px] font-medium text-zinc-200">{user.membershipTier}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${accountOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="flex h-9 items-center gap-2 rounded-full px-3 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70"
                  >
                    <User className="h-4 w-4 text-gold-400" />
                    Sign in
                  </Link>
                )}

                {accountOpen && isAuthenticated && (
                  <div className="absolute right-0 mt-3 w-64 animate-fade-in rounded-lg border border-white/10 bg-charcoal-900 p-2 shadow-2xl">
                    <div className="flex items-center gap-3 px-3 py-3">
                      <img src={user.avatar} alt="" className="h-10 w-10 rounded-full border border-gold-400/60 object-cover" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gold-400">
                          {user.membershipTier} · {user.points.toLocaleString()} points
                        </p>
                      </div>
                    </div>
                    <div className="my-1 h-px bg-white/10" />
                    <Link to="/account" className={menuItem}>
                      <User className="h-4 w-4 text-gold-400" />
                      Member dashboard
                    </Link>
                    <Link to="/manage-booking" className={menuItem}>
                      <Calendar className="h-4 w-4 text-gold-400" />
                      Manage a booking
                    </Link>
                    <Link to="/account/notifications" className={`${menuItem} justify-between`}>
                      <span className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-gold-400" />
                        Notifications
                      </span>
                      {unreadNotifs > 0 && (
                        <span className="rounded-full bg-gold-400 px-1.5 text-[11px] font-semibold leading-5 text-charcoal-950">
                          {unreadNotifs}
                        </span>
                      )}
                    </Link>
                    <div className="my-1 h-px bg-white/10" />
                    <button type="button" onClick={handleSignOut} className={`${menuItem} hover:text-rose-400`}>
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>

              <Link
                to="/booking"
                className="ml-2 hidden h-10 shrink-0 items-center whitespace-nowrap rounded-sm bg-gold-400 px-6 text-sm font-semibold text-charcoal-950 transition-colors hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950 sm:inline-flex"
              >
                Book now
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className={`${iconButton} ml-1 xl:hidden`}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / tablet drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex animate-fade-in flex-col bg-charcoal-950 pt-[72px] xl:hidden">
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <nav aria-label="Mobile">
              <ul className="divide-y divide-white/10 border-b border-white/10">
                {PRIMARY_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      aria-current={isActive(link.path) ? 'page' : undefined}
                      className={`flex items-center justify-between py-4 font-serif text-xl transition-colors ${
                        isActive(link.path) ? 'text-gold-300' : 'text-white hover:text-gold-300'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-1 py-4">
                {SECONDARY_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block py-2 text-sm transition-colors ${
                        isActive(link.path) ? 'text-gold-300' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="grid grid-cols-2 gap-3 border-t border-white/10 py-5">
              <label className="block text-xs text-zinc-500">
                Currency
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-white/15 bg-charcoal-900 px-3 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                >
                  {Object.entries(CURRENCIES).map(([code, cur]) => (
                    <option key={code} value={code}>{cur.label}</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs text-zinc-500">
                Language
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-white/15 bg-charcoal-900 px-3 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                  ))}
                </select>
              </label>
            </div>

            {isAuthenticated ? (
              <div className="rounded-lg border border-white/10 bg-charcoal-900 p-3">
                <Link to="/account" className="flex items-center gap-3">
                  <img src={user.avatar} alt="" className="h-10 w-10 rounded-full border border-gold-400/60 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gold-400">
                      {user.membershipTier} · {user.points.toLocaleString()} points
                    </p>
                  </div>
                </Link>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                  <Link to="/account/notifications" className="flex items-center gap-2 text-zinc-300 hover:text-white">
                    <Bell className="h-4 w-4 text-gold-400" />
                    Notifications{unreadNotifs > 0 ? ` (${unreadNotifs})` : ''}
                  </Link>
                  <button type="button" onClick={handleSignOut} className="text-zinc-400 hover:text-rose-400">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/signin"
                className="block rounded-md border border-gold-400/40 py-3 text-center text-sm font-medium text-gold-300 transition-colors hover:bg-gold-400/10"
              >
                Sign in or join Aurelia Privileges
              </Link>
            )}
          </div>

          <div className="border-t border-white/10 bg-charcoal-950 px-6 pb-6 pt-4">
            <Link
              to="/booking"
              className="block rounded-sm bg-gold-400 py-3.5 text-center text-sm font-semibold text-charcoal-950 transition-colors hover:bg-gold-300"
            >
              Book now
            </Link>
            <div className="mt-4 flex items-center justify-center gap-5 text-xs text-zinc-400">
              <a href={`tel:${HOTEL_INFO.phone}`} className="flex items-center gap-1.5 hover:text-white">
                <Phone className="h-3.5 w-3.5 text-gold-400" />
                Call the concierge
              </a>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
                Best rate guaranteed
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};