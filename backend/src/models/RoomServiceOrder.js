import mongoose from 'mongoose';

const roomServiceItemSchema = new mongoose.Schema(
  {
    itemId: String,
    name: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    category: String,
  },
  { _id: false }
);

const roomServiceOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    roomNumber: {
      type: String,
      required: [true, 'Please specify room or suite number'],
      default: 'Suite 702',
    },
    items: {
      type: [roomServiceItemSchema],
      required: true,
      validate: [val => val.length > 0, 'Order tray must contain at least one item'],
    },
    total: {
      type: Number,
      required: true,
    },
    orderTime: {
      type: String,
      default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    estimatedDelivery: {
      type: String,
      default: '30-45 mins',
    },
    status: {
      type: String,
      enum: [
        'Preparing with Executive Chef',
        'Preparing in Kitchen with Executive Chef',
        'Out for In-Suite Delivery',
        'Delivered to Suite',
        'Cancelled',
      ],
      default: 'Preparing with Executive Chef',
    },
    instructions: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

roomServiceOrderSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.orderId;
    return ret;
  },
});

const RoomServiceOrder = mongoose.model('RoomServiceOrder', roomServiceOrderSchema);
export default RoomServiceOrder;
