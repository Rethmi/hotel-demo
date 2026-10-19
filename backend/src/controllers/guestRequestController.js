import GuestRequest from '../models/GuestRequest.js';

// @desc    Get concierge guest requests
// @route   GET /api/requests
// @access  Private / Public Demo
export const getGuestRequests = async (req, res, next) => {
  try {
    const query = req.user && req.user.role !== 'admin' ? { user: req.user._id } : {};
    const requests = await GuestRequest.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create special concierge request
// @route   POST /api/requests
// @access  Private / Public
export const createGuestRequest = async (req, res, next) => {
  try {
    const { category, title, details } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Please specify your request title' });
    }

    const reqId = `REQ-${Math.floor(300 + Math.random() * 700)}`;

    const guestRequest = await GuestRequest.create({
      requestId: reqId,
      user: req.user ? req.user._id : null,
      category: category || 'Room Setup',
      title,
      status: 'In Progress',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      response: details
        ? `Request noted: "${details}". Our Head Concierge has assigned this to duty staff.`
        : 'Assigned to Aurelia Butler service.',
    });

    res.status(201).json({
      success: true,
      data: guestRequest,
      message: 'Request dispatched to the Aurelia Concierge desk.',
    });
  } catch (error) {
    next(error);
  }
};
