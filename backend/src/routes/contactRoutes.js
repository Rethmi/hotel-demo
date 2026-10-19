import express from 'express';
import {
  submitInquiry,
  getInquiries,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(submitInquiry)
  .get(protect, adminOnly, getInquiries);

export default router;
