import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: 'Just now',
    },
    read: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ['booking', 'loyalty', 'dining', 'spa', 'general'],
      default: 'general',
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    return ret;
  },
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
