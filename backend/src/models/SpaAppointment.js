import mongoose from 'mongoose';

const spaAppointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    serviceId: {
      type: String,
      required: true,
    },
    serviceName: {
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
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    therapist: {
      type: String,
      default: 'Senior Certified Therapist',
    },
    guestName: {
      type: String,
      default: '',
    },
    guestEmail: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Confirmed', 'In Treatment', 'Completed', 'Cancelled'],
      default: 'Confirmed',
    },
  },
  {
    timestamps: true,
  }
);

spaAppointmentSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.appointmentId;
    return ret;
  },
});

const SpaAppointment = mongoose.model('SpaAppointment', spaAppointmentSchema);
export default SpaAppointment;
