import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

// Helper to generate reference like AGR-94821-2026
const generateBookingReference = () => {
  const num = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `AGR-${num}-${year}`;
};

// @desc    Create a new booking reservation
// @route   POST /api/bookings
// @access  Public / Optional Auth
export const createBooking = async (req, res, next) => {
  try {
    const {
      roomId,
      checkIn,
      checkOut,
      guests,
      addOns,
      guest,
      guestDetails,
      bedPreference,
      specialRequests,
      paymentMethod,
      subtotal,
      discount,
      taxes,
      total,
    } = req.body;

    const leadGuest = guest || guestDetails;
    if (!roomId || !checkIn || !checkOut || !leadGuest?.email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking parameters (roomId, checkIn, checkOut, guest details)',
      });
    }

    // Lookup room
    let room = await Room.findOne({ roomId });
    if (!room && roomId.match(/^[0-9a-fA-F]{24}$/)) {
      room = await Room.findById(roomId);
    }

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room sanctuary not found' });
    }

    // Calculate nights
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.abs(d2 - d1);
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Calculate or use supplied totals
    const calculatedBase = room.price * nights;
    const bookingSubtotal = subtotal !== undefined ? subtotal : calculatedBase;
    const bookingTotal = total !== undefined ? total : bookingSubtotal;

    let reference = generateBookingReference();
    // Ensure uniqueness
    let existing = await Booking.findOne({ bookingReference: reference });
    while (existing) {
      reference = generateBookingReference();
      existing = await Booking.findOne({ bookingReference: reference });
    }

    // Link user if authenticated
    const userId = req.user ? req.user._id : null;

    const booking = await Booking.create({
      bookingReference: reference,
      user: userId,
      roomId: room.roomId,
      room: {
        id: room.roomId,
        name: room.name,
        category: room.category,
        price: room.price,
        images: room.images,
        bed: room.bed,
        view: room.view,
        sizeSqM: room.sizeSqM,
      },
      checkIn,
      checkOut,
      nights,
      guests: guests || { adults: 2, children: 0 },
      addOns: addOns || [],
      subtotal: bookingSubtotal,
      discount: discount || 0,
      taxes: taxes || Math.round(bookingSubtotal * 0.12),
      total: bookingTotal,
      paymentMethod: paymentMethod || 'Credit Card Guarantee',
      paymentStatus: 'Guaranteed',
      status: 'Confirmed',
      guest: {
        firstName: leadGuest.firstName || 'Guest',
        lastName: leadGuest.lastName || '',
        email: leadGuest.email,
        phone: leadGuest.phone || '',
        country: leadGuest.country || 'International',
        address: leadGuest.address || '',
      },
      bedPreference: bedPreference || '1 King Bed',
      specialRequests: specialRequests || '',
      notes: `Booked online for ${nights} nights at ${room.name}.`,
      canCancelUntil: '48 hours prior to arrival',
    });

    // Award loyalty points to user if registered
    if (userId) {
      const earnedPoints = Math.round(bookingTotal * 5);
      await User.findByIdAndUpdate(userId, { $inc: { points: earnedPoints } });

      // Create notification
      await Notification.create({
        user: userId,
        title: 'VIP Reservation Confirmed',
        message: `Your upcoming stay (${reference}) at ${room.name} from ${checkIn} to ${checkOut} has been confirmed. +${earnedPoints} Privilege Points credited!`,
        time: 'Just now',
        type: 'booking',
      });
    }

    res.status(201).json({
      success: true,
      data: booking,
      message: `Reservation ${reference} successfully confirmed!`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's bookings or all bookings for admin
// @route   GET /api/bookings
// @access  Private
export const getMyBookings = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Find booking by Reference ID & Email (Guest self-service)
// @route   GET /api/bookings/lookup
// @access  Public
export const lookupBooking = async (req, res, next) => {
  try {
    const { reference, email } = req.query;

    if (!reference) {
      return res.status(400).json({ success: false, message: 'Please provide booking reference number' });
    }

    const query = {
      bookingReference: reference.trim().toUpperCase(),
    };

    if (email) {
      query['guest.email'] = new RegExp(`^${email.trim()}$`, 'i');
    }

    const booking = await Booking.findOne(query);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'No active reservation found matching the reference ID and email provided.',
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Modify booking stay dates
// @route   PUT /api/bookings/:id/dates
// @access  Public / Auth
export const updateBookingDates = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut } = req.body;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ success: false, message: 'Both checkIn and checkOut dates are required' });
    }

    let booking = await Booking.findOne({
      $or: [{ bookingReference: id.toUpperCase() }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const nights = Math.max(1, Math.ceil(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24)));

    booking.checkIn = checkIn;
    booking.checkOut = checkOut;
    booking.nights = nights;
    booking.notes = `${booking.notes} [Modified dates to ${checkIn} - ${checkOut}]`;

    await booking.save();

    res.json({
      success: true,
      data: booking,
      message: 'Reservation dates updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking with full refund processing
// @route   PUT /api/bookings/:id/cancel
// @access  Public / Auth
export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    let booking = await Booking.findOne({
      $or: [{ bookingReference: id.toUpperCase() }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    booking.status = 'Cancelled (Full Refund Processed)';
    booking.paymentStatus = 'Refunded';
    booking.notes = `${booking.notes} [Cancelled on ${new Date().toLocaleDateString()} - Full refund initiated]`;

    await booking.save();

    res.json({
      success: true,
      data: booking,
      message: 'Reservation cancelled successfully. A full refund has been credited.',
    });
  } catch (error) {
    next(error);
  }
};
