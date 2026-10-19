import express from 'express';
import {
  createSpaAppointment,
  getSpaAppointments,
  cancelSpaAppointment,
} from '../controllers/spaAppointmentController.js';
import { getSpaServices } from '../controllers/contentController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/services', getSpaServices);

router.route('/appointments')
  .post(optionalAuth, createSpaAppointment)
  .get(protect, getSpaAppointments);

router.put('/appointments/:id/cancel', cancelSpaAppointment);

export default router;
