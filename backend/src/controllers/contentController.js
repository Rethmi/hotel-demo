import {
  Restaurant,
  SpaService,
  Offer,
  Experience,
  Addon,
  Review,
  Wishlist,
} from '../models/HotelContent.js';

export const getRestaurants = async (req, res, next) => {
  try {
    const data = await Restaurant.find();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

export const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let restaurant = await Restaurant.findOne({ restaurantId: id });
    if (!restaurant && id.match(/^[0-9a-fA-F]{24}$/)) {
      restaurant = await Restaurant.findById(id);
    }
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    res.json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

export const getSpaServices = async (req, res, next) => {
  try {
    const data = await SpaService.find();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

export const getOffers = async (req, res, next) => {
  try {
    const data = await Offer.find();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

export const getExperiences = async (req, res, next) => {
  try {
    const data = await Experience.find();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

export const getAddons = async (req, res, next) => {
  try {
    const data = await Addon.find();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const data = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.json({ success: true, data: [] });
    }
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, items: [] });
    }
    res.json({ success: true, data: wishlist.items });
  } catch (error) {
    next(error);
  }
};

export const toggleWishlist = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({ success: false, message: 'Item ID required' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, items: [itemId] });
      return res.json({ success: true, data: wishlist.items, added: true });
    }

    const index = wishlist.items.indexOf(itemId);
    let added = false;
    if (index > -1) {
      wishlist.items.splice(index, 1);
      added = false;
    } else {
      wishlist.items.push(itemId);
      added = true;
    }

    await wishlist.save();
    res.json({ success: true, data: wishlist.items, added });
  } catch (error) {
    next(error);
  }
};
