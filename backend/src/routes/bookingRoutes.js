import express from 'express';
import {
  createBooking,
  getMyBookings,
  lookupBooking,
  updateBookingDates,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(optionalAuth, createBooking)
  .get(protect, getMyBookings);

router.get('/lookup', lookupBooking);
router.put('/:id/dates', updateBookingDates);
router.put('/:id/cancel', cancelBooking);

export default router;
