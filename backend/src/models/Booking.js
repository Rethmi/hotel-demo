import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    roomId: {
      type: String,
      required: true,
    },
    room: {
      id: String,
      name: String,
      category: String,
      price: Number,
      images: [String],
      bed: String,
      view: String,
      sizeSqM: Number,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    nights: {
      type: Number,
      required: true,
      default: 1,
    },
    guests: {
      adults: { type: Number, default: 2 },
      children: { type: Number, default: 0 },
    },
    addOns: {
      type: [String],
      default: [],
    },
    subtotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    taxes: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: 'Credit Card Guarantee',
    },
    paymentStatus: {
      type: String,
      enum: ['Guaranteed', 'Paid', 'Pending', 'Refunded'],
      default: 'Guaranteed',
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Completed', 'Cancelled', 'Cancelled (Full Refund Processed)'],
      default: 'Confirmed',
    },
    guest: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      country: { type: String, default: '' },
      address: { type: String, default: '' },
    },
    bedPreference: {
      type: String,
      default: '1 King Bed',
    },
    specialRequests: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    canCancelUntil: {
      type: String,
      default: '48 hours prior to arrival',
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.bookingReference;
    return ret;
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
