import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

// @desc    Get all rooms with optional filtering
// @route   GET /api/rooms
// @access  Public
export const getRooms = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, guests, search } = req.query;

    const query = {};

    if (category && category !== 'All') {
      query.category = new RegExp(category, 'i');
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (guests) {
      query.maxGuests = { $gte: Number(guests) };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { view: { $regex: search, $options: 'i' } },
      ];
    }

    const rooms = await Room.find(query).sort({ price: 1 });

    res.json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single room by ID or slug
// @route   GET /api/rooms/:id
// @access  Public
export const getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let room = await Room.findOne({ roomId: id });
    if (!room && id.match(/^[0-9a-fA-F]{24}$/)) {
      room = await Room.findById(id);
    }

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room sanctuary not found' });
    }

    res.json({
      success: true,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check room availability for date range
// @route   GET /api/rooms/:id/availability
// @access  Public
export const checkRoomAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ success: false, message: 'Please provide both checkIn and checkOut dates' });
    }

    const room = await Room.findOne({ roomId: id });
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room sanctuary not found' });
    }

    // Find conflicting bookings: status Confirmed, and date overlaps:
    // overlap if booking.checkIn < newCheckOut AND booking.checkOut > newCheckIn
    const conflictingBookings = await Booking.countDocuments({
      roomId: room.roomId,
      status: 'Confirmed',
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    });

    const availableStock = Math.max(0, room.stock - conflictingBookings);
    const isAvailable = availableStock > 0;

    res.json({
      success: true,
      data: {
        roomId: room.roomId,
        name: room.name,
        totalStock: room.stock,
        activeBookings: conflictingBookings,
        availableStock,
        isAvailable,
        checkIn,
        checkOut,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new room (Admin)
// @route   POST /api/rooms
// @access  Private/Admin
export const createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({
      success: true,
      data: room,
      message: 'New room sanctuary created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update room (Admin)
// @route   PUT /api/rooms/:id
// @access  Private/Admin
export const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    let room = await Room.findOneAndUpdate({ roomId: id }, req.body, { new: true });
    if (!room && id.match(/^[0-9a-fA-F]{24}$/)) {
      room = await Room.findByIdAndUpdate(id, req.body, { new: true });
    }

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.json({
      success: true,
      data: room,
      message: 'Room details updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete room (Admin)
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
export const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    let room = await Room.findOneAndDelete({ roomId: id });
    if (!room && id.match(/^[0-9a-fA-F]{24}$/)) {
      room = await Room.findByIdAndDelete(id);
    }

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.json({
      success: true,
      message: 'Room deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
