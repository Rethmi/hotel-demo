import RoomServiceOrder from '../models/RoomServiceOrder.js';
import { MenuItem } from '../models/HotelContent.js';
import Notification from '../models/Notification.js';

// @desc    Get room service menu
// @route   GET /api/room-service/menu
// @access  Public
export const getRoomServiceMenu = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = category && category !== 'All' ? { category: new RegExp(category, 'i') } : {};
    const items = await MenuItem.find(query);

    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Place in-room dining order
// @route   POST /api/room-service/orders
// @access  Public / Optional Auth
export const placeRoomServiceOrder = async (req, res, next) => {
  try {
    const { roomNumber, items, instructions } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your dining tray is empty' });
    }

    const orderId = `ORD-${Math.floor(100 + Math.random() * 900)}`;
    const total = items.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

    const order = await RoomServiceOrder.create({
      orderId,
      user: req.user ? req.user._id : null,
      roomNumber: roomNumber || 'Suite 702',
      items,
      total,
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedDelivery: '30-45 mins',
      status: 'Preparing with Executive Chef',
      instructions: instructions || 'Deliver to terrace table with fresh ice and warm linens',
    });

    if (req.user) {
      await Notification.create({
        user: req.user._id,
        title: `Room Service #${orderId} Received`,
        message: `Executive Chef has begun preparing your order for ${roomNumber || 'Suite 702'}. Estimated delivery in 30-45 mins.`,
        time: 'Just now',
        type: 'dining',
      });
    }

    res.status(201).json({
      success: true,
      data: order,
      message: `Order #${orderId} received for ${roomNumber}. Bon appétit!`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get room service orders
// @route   GET /api/room-service/orders
// @access  Private / Optional
export const getRoomServiceOrders = async (req, res, next) => {
  try {
    const query = req.user ? (req.user.role === 'admin' ? {} : { user: req.user._id }) : {};
    const orders = await RoomServiceOrder.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Staff / Admin)
// @route   PUT /api/room-service/orders/:id/status
// @access  Private
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await RoomServiceOrder.findOne({
      $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status || order.status;
    await order.save();

    res.json({
      success: true,
      data: order,
      message: `Order status updated to: ${order.status}`,
    });
  } catch (error) {
    next(error);
  }
};
