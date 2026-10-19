import express from 'express';
import {
  createRestaurantReservation,
  getRestaurantReservations,
  cancelRestaurantReservation,
} from '../controllers/restaurantReservationController.js';
import {
  getRestaurants,
  getRestaurantById,
} from '../controllers/contentController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);

router.route('/reservations')
  .post(optionalAuth, createRestaurantReservation)
  .get(protect, getRestaurantReservations);

router.put('/reservations/:id/cancel', cancelRestaurantReservation);

export default router;
