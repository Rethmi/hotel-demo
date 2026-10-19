# Aurelia Grand Resort — Enterprise Backend API

A production-grade, RESTful backend engine built for **Aurelia Grand Resort** using **Node.js**, **Express.js**, and **MongoDB** with **Mongoose ODM**.

---

## 🏛️ Architecture & Tech Stack

- **Runtime**: Node.js (v20+ / ES Modules)
- **Web Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Stateless JWT (JSON Web Tokens) with `bcryptjs` password hashing
- **Security & Utilities**: CORS, Morgan HTTP logger, centralized error handling middleware
- **Seed Engine**: Automated database population with realistic luxury resort datasets

---

## 📁 Directory Structure

```text
backend/
├── .env                  # Environment secrets & database connection
├── .env.example          # Template environment file
├── package.json          # Backend dependencies & npm scripts
├── README.md             # Complete API & system documentation
└── src/
    ├── config/
    │   └── db.js         # Mongoose connection configuration
    ├── controllers/
    │   ├── authController.js                 # Authentication & profile management
    │   ├── bookingController.js              # Room reservations & modification
    │   ├── contactController.js              # Guest & concierge inquiries
    │   ├── contentController.js              # Dining, spa, offers, addons, reviews, wishlist
    │   ├── guestRequestController.js         # Butler & concierge service requests
    │   ├── notificationController.js         # Guest push notifications
    │   ├── restaurantReservationController.js# Fine dining table reservations
    │   ├── roomController.js                 # Room sanctuaries & live availability
    │   ├── roomServiceController.js          # In-room dining menu & order dispatch
    │   └── spaAppointmentController.js       # Thalasso spa rituals & bookings
    ├── middleware/
    │   ├── authMiddleware.js                 # JWT verification (protect, optionalAuth, adminOnly)
    │   └── errorMiddleware.js                # 404 handler and error response formatter
    ├── models/
    │   ├── Booking.js                        # Reservation lifecycle model
    │   ├── ContactInquiry.js                 # Contact desk inquiry model
    │   ├── GuestRequest.js                   # Concierge butler request model
    │   ├── HotelContent.js                   # Restaurants, Spa, Offers, Experiences, Reviews, Wishlist
    │   ├── Notification.js                   # Notification model
    │   ├── Room.js                           # Luxury sanctuary model
    │   ├── RoomServiceOrder.js               # In-room dining order model
    │   ├── RestaurantReservation.js          # Table reservation model
    │   ├── SpaAppointment.js                 # Spa treatment appointment model
    │   └── User.js                           # User profile & credentials model
    ├── routes/
    │   ├── authRoutes.js
    │   ├── bookingRoutes.js
    │   ├── contactRoutes.js
    │   ├── contentRoutes.js
    │   ├── diningRoutes.js
    │   ├── notificationRoutes.js
    │   ├── requestRoutes.js
    │   ├── roomRoutes.js
    │   ├── roomServiceRoutes.js
    │   ├── spaRoutes.js
    │   └── index.js                          # Master router mounted at /api
    ├── scripts/
    │   ├── seed.js                           # Seeder populating all MongoDB collections
    │   └── testEndpoints.js                  # Integration test suite (22 assertions)
    └── server.js                             # Express application entrypoint
```

---

## ⚙️ Environment Configuration (`.env`)

```ini
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/aurelia_hotel
JWT_SECRET=aurelia_grand_resort_luxury_secret_key_2026_jwt_token_auth
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Seed the Database
Populates rooms, restaurants, spa rituals, exclusive offers, experiences, in-room dining menus, reviews, and Lord Julian Davenport's account:
```bash
npm run seed
```

### 3. Start the Server
Development with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```
The server will boot at `http://localhost:5000`.

### 4. Run Automated Test Suite
```bash
node src/scripts/testEndpoints.js
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Membership Tier |
|------|-------|----------|-----------------|
| **VIP Guest** | `julian.davenport@davenport-estates.co.uk` | `password123` | Platinum (18,450 pts) |
| **Administrator** | `admin@aureliagrandresort.com` | `AdminPassword2026!` | Diamond (50,000 pts) |

---

## 📡 API Reference & Endpoints

### 1. System Health
- **`GET /api/health`**: Returns server status, database state, and timestamp.

### 2. Authentication (`/api/auth`)
- **`POST /api/auth/register`**: Register a new user profile (+1,000 complimentary Privilege points).
- **`POST /api/auth/login`**: Authenticate with email and password to receive a JWT token.
- **`POST /api/auth/demo`**: Instant 1-click authentication as Platinum guest Lord Julian Davenport.
- **`GET /api/auth/me`**: Get logged-in user profile with points and tier perks *(Requires Bearer Token)*.
- **`PUT /api/auth/me`**: Update phone, address, avatar, or password *(Requires Bearer Token)*.

### 3. Rooms & Availability (`/api/rooms`)
- **`GET /api/rooms`**: List rooms with optional filters (`?category=Deluxe&guests=2&minPrice=100&maxPrice=500`).
- **`GET /api/rooms/:id`**: Single sanctuary details by slug (`deluxe-room`) or MongoDB `_id`.
- **`GET /api/rooms/:id/availability?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD`**: Live conflict checking against room stock and confirmed reservations.
- **`POST /api/rooms`**: Create new room sanctuary *(Admin only)*.
- **`PUT /api/rooms/:id`**: Update room sanctuary details *(Admin only)*.
- **`DELETE /api/rooms/:id`**: Delete room sanctuary *(Admin only)*.

### 4. Bookings & Reservations (`/api/bookings`)
- **`POST /api/bookings`**: Create confirmed reservation (generates `AGR-XXXXX-YYYY` reference, credits loyalty points, dispatches notification).
- **`GET /api/bookings`**: List bookings for authenticated user *(Requires Bearer Token)*.
- **`GET /api/bookings/lookup?reference=AGR-99421-2026&email=guest@domain.com`**: Guest self-service reservation lookup.
- **`PUT /api/bookings/:id/dates`**: Modify reservation check-in and check-out dates.
- **`PUT /api/bookings/:id/cancel`**: Cancel reservation and trigger full refund process.

### 5. Fine Dining (`/api/dining`)
- **`GET /api/dining`**: List all hotel restaurants and fine dining venues.
- **`GET /api/dining/:id`**: Single restaurant detail with signature dishes and Michelin accolades.
- **`POST /api/dining/reservations`**: Book table (specifies restaurant, time, guests, seating preference, occasion).
- **`GET /api/dining/reservations`**: Retrieve table reservations *(Requires Bearer Token)*.
- **`PUT /api/dining/reservations/:id/cancel`**: Cancel dining table reservation.

### 6. Thalasso Spa (`/api/spa`)
- **`GET /api/spa/services`**: List all holistic spa treatments and rituals.
- **`POST /api/spa/appointments`**: Book spa appointment with date, time, duration, and therapist.
- **`GET /api/spa/appointments`**: Retrieve user spa appointments *(Requires Bearer Token)*.
- **`PUT /api/spa/appointments/:id/cancel`**: Cancel spa appointment.

### 7. In-Room Dining & Room Service (`/api/room-service`)
- **`GET /api/room-service/menu`**: Retrieve gourmet dish menu (optional `?category=Breakfast`).
- **`POST /api/room-service/orders`**: Place order for room/suite with custom delivery instructions.
- **`GET /api/room-service/orders`**: Retrieve user order history.
- **`PUT /api/room-service/orders/:id/status`**: Update kitchen preparation/delivery status *(Staff)*.

### 8. Concierge & Butler Requests (`/api/requests`)
- **`GET /api/requests`**: Retrieve active butler and concierge requests.
- **`POST /api/requests`**: Dispatch new concierge request (Pillow menu, transportation, housekeeping).

### 9. Notifications (`/api/notifications`)
- **`GET /api/notifications`**: Retrieve user notifications.
- **`PUT /api/notifications/:id/read`**: Mark notification as read.
- **`DELETE /api/notifications/:id`**: Remove notification.

### 10. Contact Desk (`/api/contact`)
- **`POST /api/contact`**: Submit inquiry to duty manager and concierge desk.
- **`GET /api/contact`**: View all incoming inquiries *(Admin only)*.

### 11. Resort Content & Wishlist (`/api/content`)
- **`GET /api/content/offers`**: Exclusive promo packages and discount codes.
- **`GET /api/content/experiences`**: Curated private Riviera itineraries.
- **`GET /api/content/addons`**: Booking enhancements (airport limousine, champagne, breakfast).
- **`GET /api/content/reviews`**: Verified five-star guest reviews.
- **`GET /api/content/wishlist`**: Get user's saved wishlist items *(Requires Bearer Token)*.
- **`POST /api/content/wishlist`**: Toggle item in user wishlist *(Requires Bearer Token)*.
