import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HotelProvider } from './context/HotelContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CookieBanner } from './components/CookieBanner';
import { Toast } from './components/Toast';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { OffersPage } from './pages/OffersPage';
import { DiningPage } from './pages/DiningPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { RestaurantReservationPage } from './pages/RestaurantReservationPage';
import { SpaPage } from './pages/SpaPage';
import { SpaDetailPage } from './pages/SpaDetailPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { LocationPage } from './pages/LocationPage';
import { ContactPage } from './pages/ContactPage';
import { BookingFlowPage } from './pages/BookingFlowPage';
import { ManageBookingPage } from './pages/ManageBookingPage';
import { RoomServicePage } from './pages/RoomServicePage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { LoyaltyPage } from './pages/LoyaltyPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <HotelProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-charcoal-900 font-sans selection:bg-gold-500 selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Core Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/rooms/:id" element={<RoomDetailPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/dining" element={<DiningPage />} />
              <Route path="/dining/:id" element={<RestaurantDetailPage />} />
              <Route path="/restaurant-reservation" element={<RestaurantReservationPage />} />
              <Route path="/spa" element={<SpaPage />} />
              <Route path="/spa/:id" element={<SpaDetailPage />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Booking Engine & Self-Service */}
              <Route path="/booking" element={<BookingFlowPage />} />
              <Route path="/booking/availability" element={<BookingFlowPage />} />
              <Route path="/booking/guest-details" element={<BookingFlowPage />} />
              <Route path="/booking/payment" element={<BookingFlowPage />} />
              <Route path="/booking/confirmation" element={<BookingFlowPage />} />
              <Route path="/manage-booking" element={<ManageBookingPage />} />
              <Route path="/room-service" element={<RoomServicePage />} />

              {/* Guest Account & Member Portal */}
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/bookings" element={<AccountPage />} />
              <Route path="/account/bookings/:id" element={<AccountPage />} />
              <Route path="/account/wishlist" element={<WishlistPage />} />
              <Route path="/account/loyalty" element={<LoyaltyPage />} />
              <Route path="/account/notifications" element={<NotificationsPage />} />
              <Route path="/account/profile" element={<AccountPage />} />

              {/* Authentication */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Information & Legal */}
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* 404 Error State */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />

          {/* Global Interactive Overlays */}
          <GlobalSearchModal />
          <CookieBanner />
          <Toast />
        </div>
      </Router>
    </HotelProvider>
  );
}

export default App;
