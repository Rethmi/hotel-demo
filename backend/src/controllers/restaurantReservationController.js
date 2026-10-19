import RestaurantReservation from '../models/RestaurantReservation.js';
import Notification from '../models/Notification.js';

// @desc    Create restaurant table reservation
// @route   POST /api/dining/reservations
// @access  Public / Optional Auth
export const createRestaurantReservation = async (req, res, next) => {
  try {
    const {
      restaurantId,
      restaurantName,
      date,
      time,
      guests,
      seating,
      occasion,
      specialRequests,
      guestName,
      guestEmail,
      guestPhone,
    } = req.body;

    if (!restaurantId || !restaurantName || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide restaurant, date, time, and party size',
      });
    }

    const resId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;

    const reservation = await RestaurantReservation.create({
      reservationId: resId,
      user: req.user ? req.user._id : null,
      restaurantId,
      restaurantName,
      date,
      time,
      guests: guests || 2,
      seating: seating || 'Cliffside Window Table',
      occasion: occasion || 'Romantic Dinner',
      specialRequests: specialRequests || '',
      guestName: guestName || (req.user ? req.user.name : 'Valued Guest'),
      guestEmail: guestEmail || (req.user ? req.user.email : ''),
      guestPhone: guestPhone || '',
      status: 'Confirmed',
    });

    if (req.user) {
      await Notification.create({
        user: req.user._id,
        title: `Table Confirmed: ${restaurantName}`,
        message: `Your table for ${guests || 2} on ${date} at ${time} (${seating || 'Cliffside Table'}) is confirmed.`,
        time: 'Just now',
        type: 'dining',
      });
    }

    res.status(201).json({
      success: true,
      data: reservation,
      message: `Table confirmed at ${restaurantName} for ${date} at ${time}`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reservations for current user or all for admin
// @route   GET /api/dining/reservations
// @access  Private
export const getRestaurantReservations = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const reservations = await RestaurantReservation.find(query).sort({ date: 1, time: 1 });

    res.json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel dining reservation
// @route   PUT /api/dining/reservations/:id/cancel
// @access  Public / Auth
export const cancelRestaurantReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resItem = await RestaurantReservation.findOne({
      $or: [{ reservationId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!resItem) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    resItem.status = 'Cancelled';
    await resItem.save();

    res.json({
      success: true,
      data: resItem,
      message: 'Table reservation cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};
