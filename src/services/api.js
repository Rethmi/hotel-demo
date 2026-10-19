// Frontend API Service client connecting to Express.js Backend

const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('aurelia_auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg = data.message || `Request failed with status ${res.status}`;
    throw new Error(errorMsg);
  }
  return data;
};

// ==========================================
// Authentication & User Profile API
// ==========================================
export const authAPI = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await handleResponse(res);
    if (result.data?.token) {
      localStorage.setItem('aurelia_auth_token', result.data.token);
    }
    return result;
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const result = await handleResponse(res);
    if (result.data?.token) {
      localStorage.setItem('aurelia_auth_token', result.data.token);
    }
    return result;
  },

  demoLogin: async () => {
    const res = await fetch(`${API_BASE}/auth/demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await handleResponse(res);
    if (result.data?.token) {
      localStorage.setItem('aurelia_auth_token', result.data.token);
    }
    return result;
  },

  getProfile: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  updateProfile: async (profileData) => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse(res);
  },

  logout: () => {
    localStorage.removeItem('aurelia_auth_token');
  },
};

// ==========================================
// Rooms & Sanctuaries API
// ==========================================
export const roomAPI = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/rooms${query ? `?${query}` : ''}`);
    return handleResponse(res);
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE}/rooms/${id}`);
    return handleResponse(res);
  },

  checkAvailability: async (id, checkIn, checkOut) => {
    const res = await fetch(`${API_BASE}/rooms/${id}/availability?checkIn=${checkIn}&checkOut=${checkOut}`);
    return handleResponse(res);
  },
};

// ==========================================
// Bookings & Reservations API
// ==========================================
export const bookingAPI = {
  create: async (bookingData) => {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData),
    });
    return handleResponse(res);
  },

  getMyBookings: async () => {
    const res = await fetch(`${API_BASE}/bookings`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  lookup: async (reference, email) => {
    const query = new URLSearchParams({ reference, ...(email ? { email } : {}) }).toString();
    const res = await fetch(`${API_BASE}/bookings/lookup?${query}`);
    return handleResponse(res);
  },

  updateDates: async (id, checkIn, checkOut) => {
    const res = await fetch(`${API_BASE}/bookings/${id}/dates`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkIn, checkOut }),
    });
    return handleResponse(res);
  },

  cancel: async (id) => {
    const res = await fetch(`${API_BASE}/bookings/${id}/cancel`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(res);
  },
};

// ==========================================
// Fine Dining & Table Reservations API
// ==========================================
export const diningAPI = {
  getRestaurants: async () => {
    const res = await fetch(`${API_BASE}/dining`);
    return handleResponse(res);
  },

  bookTable: async (reservationData) => {
    const res = await fetch(`${API_BASE}/dining/reservations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reservationData),
    });
    return handleResponse(res);
  },

  getMyReservations: async () => {
    const res = await fetch(`${API_BASE}/dining/reservations`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  cancelReservation: async (id) => {
    const res = await fetch(`${API_BASE}/dining/reservations/${id}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};

// ==========================================
// Thalasso Spa Appointments API
// ==========================================
export const spaAPI = {
  getServices: async () => {
    const res = await fetch(`${API_BASE}/spa/services`);
    return handleResponse(res);
  },

  bookAppointment: async (appointmentData) => {
    const res = await fetch(`${API_BASE}/spa/appointments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(appointmentData),
    });
    return handleResponse(res);
  },

  getMyAppointments: async () => {
    const res = await fetch(`${API_BASE}/spa/appointments`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  cancelAppointment: async (id) => {
    const res = await fetch(`${API_BASE}/spa/appointments/${id}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};

// ==========================================
// Room Service & In-Room Dining API
// ==========================================
export const roomServiceAPI = {
  getMenu: async (category = 'All') => {
    const query = category && category !== 'All' ? `?category=${category}` : '';
    const res = await fetch(`${API_BASE}/room-service/menu${query}`);
    return handleResponse(res);
  },

  placeOrder: async (orderData) => {
    const res = await fetch(`${API_BASE}/room-service/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    return handleResponse(res);
  },

  getMyOrders: async () => {
    const res = await fetch(`${API_BASE}/room-service/orders`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};

// ==========================================
// Concierge & Guest Special Requests API
// ==========================================
export const requestAPI = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/requests`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  create: async (requestData) => {
    const res = await fetch(`${API_BASE}/requests`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestData),
    });
    return handleResponse(res);
  },
};

// ==========================================
// Notifications API
// ==========================================
export const notificationAPI = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/notifications`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  markRead: async (id) => {
    const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE}/notifications/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
};

// ==========================================
// Contact & Concierge Inquiry API
// ==========================================
export const contactAPI = {
  submit: async (inquiryData) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData),
    });
    return handleResponse(res);
  },
};

// ==========================================
// Dynamic Content & Wishlist API
// ==========================================
export const contentAPI = {
  getOffers: async () => {
    const res = await fetch(`${API_BASE}/content/offers`);
    return handleResponse(res);
  },

  getExperiences: async () => {
    const res = await fetch(`${API_BASE}/content/experiences`);
    return handleResponse(res);
  },

  getAddons: async () => {
    const res = await fetch(`${API_BASE}/content/addons`);
    return handleResponse(res);
  },

  getReviews: async () => {
    const res = await fetch(`${API_BASE}/content/reviews`);
    return handleResponse(res);
  },

  getWishlist: async () => {
    const res = await fetch(`${API_BASE}/content/wishlist`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  toggleWishlist: async (itemId) => {
    const res = await fetch(`${API_BASE}/content/wishlist`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ itemId }),
    });
    return handleResponse(res);
  },
};
