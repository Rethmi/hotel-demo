import express from 'express';
import {
  getRoomServiceMenu,
  placeRoomServiceOrder,
  getRoomServiceOrders,
  updateOrderStatus,
} from '../controllers/roomServiceController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/menu', getRoomServiceMenu);

router.route('/orders')
  .post(optionalAuth, placeRoomServiceOrder)
  .get(optionalAuth, getRoomServiceOrders);

router.put('/orders/:id/status', protect, updateOrderStatus);

export default router;
