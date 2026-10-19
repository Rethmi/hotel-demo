import ContactInquiry from '../models/ContactInquiry.js';

// @desc    Submit concierge or general inquiry
// @route   POST /api/contact
// @access  Public
export const submitInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, department, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and inquiry message' });
    }

    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone: phone || '',
      department: department || 'Concierge & Private Itineraries',
      message,
      status: 'New',
    });

    res.status(201).json({
      success: true,
      data: inquiry,
      message: 'Inquiry sent to the Aurelia Concierge desk. We will respond promptly within 2 hours.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries (Staff / Admin)
// @route   GET /api/contact
// @access  Private/Admin
export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};
