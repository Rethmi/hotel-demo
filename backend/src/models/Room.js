import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide room name'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Please provide room base price per night'],
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    sizeSqM: {
      type: Number,
      required: true,
    },
    sizeSqFt: {
      type: Number,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
      default: 2,
    },
    bed: {
      type: String,
      required: true,
    },
    view: {
      type: String,
      default: 'Scenic Garden View',
    },
    floor: {
      type: String,
      default: 'Floors 1-3',
    },
    stock: {
      type: Number,
      default: 5,
    },
    popularBadge: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    includedServices: {
      type: [String],
      default: [],
    },
    cancellationPolicy: {
      type: String,
      default: 'Free cancellation up to 48 hours before check-in.',
    },
    breakfastAvailable: {
      type: Boolean,
      default: true,
    },
    breakfastPrice: {
      type: Number,
      default: 42,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual or helper for compatibility with client id
roomSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.roomId;
    return ret;
  },
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
