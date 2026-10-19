import express from 'express';
import authRoutes from './authRoutes.js';
import roomRoutes from './roomRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import diningRoutes from './diningRoutes.js';
import spaRoutes from './spaRoutes.js';
import roomServiceRoutes from './roomServiceRoutes.js';
import requestRoutes from './requestRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import contactRoutes from './contactRoutes.js';
import contentRoutes from './contentRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);
router.use('/dining', diningRoutes);
router.use('/spa', spaRoutes);
router.use('/room-service', roomServiceRoutes);
router.use('/requests', requestRoutes);
router.use('/notifications', notificationRoutes);
router.use('/contact', contactRoutes);
router.use('/content', contentRoutes);

export default router;
