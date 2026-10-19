import mongoose from 'mongoose';

const guestRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    category: {
      type: String,
      required: true,
      enum: ['Room Setup', 'Transportation', 'Housekeeping', 'Dining & Wine', 'Luggage & Butler', 'Other'],
      default: 'Room Setup',
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Received', 'In Progress', 'Completed', 'Cancelled'],
      default: 'In Progress',
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    },
    response: {
      type: String,
      default: 'Concierge is actively addressing your request.',
    },
  },
  {
    timestamps: true,
  }
);

guestRequestSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.requestId;
    return ret;
  },
});

const GuestRequest = mongoose.model('GuestRequest', guestRequestSchema);
export default GuestRequest;
