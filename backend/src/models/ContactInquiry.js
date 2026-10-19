import mongoose from 'mongoose';

const contactInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
    },
    phone: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: 'Concierge & Private Itineraries',
    },
    message: {
      type: String,
      required: [true, 'Please enter your inquiry message'],
    },
    status: {
      type: String,
      enum: ['New', 'In Review', 'Answered', 'Archived'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

contactInquirySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    return ret;
  },
});

const ContactInquiry = mongoose.model('ContactInquiry', contactInquirySchema);
export default ContactInquiry;
