import express from 'express';
import {
  getGuestRequests,
  createGuestRequest,
} from '../controllers/guestRequestController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(optionalAuth, getGuestRequests)
  .post(optionalAuth, createGuestRequest);

export default router;
