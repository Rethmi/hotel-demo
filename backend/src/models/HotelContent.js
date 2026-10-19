import mongoose from 'mongoose';

// Restaurant Schema
const restaurantSchema = new mongoose.Schema(
  {
    restaurantId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cuisine: String,
    tagline: String,
    chef: String,
    michelinStars: { type: Number, default: 0 },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 0 },
    dressCode: String,
    hours: String,
    priceLevel: String,
    images: [String],
    description: String,
    features: [String],
    signatureDishes: [
      {
        name: String,
        description: String,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

restaurantSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.restaurantId;
    return ret;
  },
});

// Spa Service Schema
const spaServiceSchema = new mongoose.Schema(
  {
    serviceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: String,
    duration: String,
    price: Number,
    rating: { type: Number, default: 5 },
    description: String,
    benefits: [String],
    image: String,
  },
  { timestamps: true }
);

spaServiceSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.serviceId;
    return ret;
  },
});

// Offer / Package Schema
const offerSchema = new mongoose.Schema(
  {
    offerId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: String,
    discount: String,
    category: String,
    validDates: String,
    minNights: Number,
    promoCode: String,
    badge: String,
    image: String,
    inclusions: [String],
    terms: String,
  },
  { timestamps: true }
);

offerSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.offerId;
    return ret;
  },
});

// Experience / Curated Itinerary Schema
const experienceSchema = new mongoose.Schema(
  {
    experienceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: String,
    duration: String,
    price: Number,
    difficulty: String,
    rating: { type: Number, default: 5 },
    availability: String,
    description: String,
    inclusions: [String],
    image: String,
  },
  { timestamps: true }
);

experienceSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.experienceId;
    return ret;
  },
});

// Addon Schema
const addonSchema = new mongoose.Schema(
  {
    addonId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: String,
    price: { type: Number, required: true },
    perPerson: { type: Boolean, default: false },
    description: String,
    icon: String,
  },
  { timestamps: true }
);

addonSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.addonId;
    return ret;
  },
});

// Room Service Menu Item Schema
const menuItemSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    desc: String,
    image: String,
  },
  { timestamps: true }
);

menuItemSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.itemId;
    ret.desc = ret.desc || ret.description;
    return ret;
  },
});

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    author: String,
    country: String,
    countryFlag: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: String,
    stayedIn: String,
    title: String,
    comment: { type: String, required: true },
    categories: {
      cleanliness: { type: Number, default: 5 },
      service: { type: Number, default: 5 },
      location: { type: Number, default: 5 },
      facilities: { type: Number, default: 5 },
      value: { type: Number, default: 5 },
    },
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Wishlist Schema
const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export const SpaService = mongoose.model('SpaService', spaServiceSchema);
export const Offer = mongoose.model('Offer', offerSchema);
export const Experience = mongoose.model('Experience', experienceSchema);
export const Addon = mongoose.model('Addon', addonSchema);
export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export const Review = mongoose.model('Review', reviewSchema);
export const Wishlist = mongoose.model('Wishlist', wishlistSchema);
