import express from 'express';
import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from '../controllers/notificationController.js';
import { optionalAuth, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(optionalAuth, getNotifications);

router.route('/:id')
  .delete(protect, deleteNotification);

router.put('/:id/read', protect, markNotificationRead);

export default router;
