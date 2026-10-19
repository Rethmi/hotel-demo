import express from 'express';
import {
  getOffers,
  getExperiences,
  getAddons,
  getReviews,
  getWishlist,
  toggleWishlist,
} from '../controllers/contentController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/offers', getOffers);
router.get('/experiences', getExperiences);
router.get('/addons', getAddons);
router.get('/reviews', getReviews);

router.route('/wishlist')
  .get(protect, getWishlist)
  .post(protect, toggleWishlist);

export default router;
