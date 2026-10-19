import mongoose from 'mongoose';

const restaurantReservationSchema = new mongoose.Schema(
  {
    reservationId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      default: 2,
    },
    seating: {
      type: String,
      default: 'Cliffside Window Table',
    },
    occasion: {
      type: String,
      default: 'Romantic Dinner',
    },
    specialRequests: {
      type: String,
      default: '',
    },
    guestName: {
      type: String,
      default: '',
    },
    guestEmail: {
      type: String,
      default: '',
    },
    guestPhone: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Seated', 'Completed', 'Cancelled'],
      default: 'Confirmed',
    },
  },
  {
    timestamps: true,
  }
);

restaurantReservationSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.reservationId;
    return ret;
  },
});

const RestaurantReservation = mongoose.model('RestaurantReservation', restaurantReservationSchema);
export default RestaurantReservation;
