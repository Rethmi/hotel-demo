import SpaAppointment from '../models/SpaAppointment.js';
import Notification from '../models/Notification.js';

// @desc    Book a spa treatment
// @route   POST /api/spa/appointments
// @access  Public / Optional Auth
export const createSpaAppointment = async (req, res, next) => {
  try {
    const {
      serviceId,
      serviceName,
      date,
      time,
      duration,
      price,
      therapist,
      guestName,
      guestEmail,
    } = req.body;

    if (!serviceId || !serviceName || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide spa service, date, and appointment time',
      });
    }

    const apptId = `SPA-${Math.floor(1000 + Math.random() * 9000)}`;

    const appointment = await SpaAppointment.create({
      appointmentId: apptId,
      user: req.user ? req.user._id : null,
      serviceId,
      serviceName,
      date,
      time,
      duration: duration || '60 min',
      price: price || 200,
      therapist: therapist || 'Senior Certified Therapist',
      guestName: guestName || (req.user ? req.user.name : ''),
      guestEmail: guestEmail || (req.user ? req.user.email : ''),
      status: 'Confirmed',
    });

    if (req.user) {
      await Notification.create({
        user: req.user._id,
        title: 'Spa Sanctuary Confirmed',
        message: `Your ritual appointment (${serviceName}) on ${date} at ${time} is scheduled with ${therapist || 'our senior therapist'}.`,
        time: 'Just now',
        type: 'spa',
      });
    }

    res.status(201).json({
      success: true,
      data: appointment,
      message: `Spa appointment confirmed for ${serviceName} on ${date} at ${time}`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get spa appointments for current user or all for admin
// @route   GET /api/spa/appointments
// @access  Private
export const getSpaAppointments = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const appointments = await SpaAppointment.find(query).sort({ date: 1, time: 1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel spa appointment
// @route   PUT /api/spa/appointments/:id/cancel
// @access  Public / Auth
export const cancelSpaAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const appt = await SpaAppointment.findOne({
      $or: [{ appointmentId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
    });

    if (!appt) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    appt.status = 'Cancelled';
    await appt.save();

    res.json({
      success: true,
      data: appt,
      message: 'Spa appointment cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};
