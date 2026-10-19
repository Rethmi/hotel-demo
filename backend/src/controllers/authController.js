import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'aurelia_grand_resort_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, name, email, password, phone } = req.body;

    const fullName = name || `${firstName || ''} ${lastName || ''}`.trim();
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const user = await User.create({
      name: fullName,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      membershipTier: 'Silver',
      points: 1000,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        membershipTier: user.membershipTier,
        points: user.points,
        memberSince: user.memberSince,
        avatar: user.avatar,
        vipPerks: user.vipPerks,
        role: user.role,
        token: generateToken(user._id),
      },
      message: 'Account created successfully with 1,000 complimentary Privilege points!',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          membershipTier: user.membershipTier,
          points: user.points,
          memberSince: user.memberSince,
          avatar: user.avatar,
          vipPerks: user.vipPerks,
          role: user.role,
          address: user.address,
          token: generateToken(user._id),
        },
        message: `Welcome back, ${user.name}`,
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email address or password' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/me
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    user.avatar = req.body.avatar || user.avatar;

    if (req.body.address) {
      user.address = {
        ...user.address,
        ...req.body.address,
      };
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        membershipTier: updatedUser.membershipTier,
        points: updatedUser.points,
        memberSince: updatedUser.memberSince,
        avatar: updatedUser.avatar,
        vipPerks: updatedUser.vipPerks,
        address: updatedUser.address,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      },
      message: 'Profile updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Demo Quick Login (Lord Julian Davenport)
// @route   POST /api/auth/demo
// @access  Public
export const demoLogin = async (req, res, next) => {
  try {
    let demoUser = await User.findOne({ email: 'julian.davenport@davenport-estates.co.uk' });

    if (!demoUser) {
      demoUser = await User.create({
        name: 'Lord Julian Davenport',
        email: 'julian.davenport@davenport-estates.co.uk',
        password: 'password123',
        phone: '+44 7911 123456',
        membershipTier: 'Platinum',
        points: 18450,
        memberSince: '2021',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        vipPerks: [
          'Complimentary Room Upgrade upon availability',
          'Guaranteed 16:00 Late Check-out & 11:00 Early Check-in',
          'Executive Club Lounge Access with Grand Cru Champagne',
          'Annual $500 Aurelia Wellness & Spa Credit',
          'Dedicated 24/7 Private Concierge & Butler line',
        ],
        address: {
          street: '14 Belgrave Square',
          city: 'London',
          postalCode: 'SW1X 8PS',
          country: 'United Kingdom',
        },
      });
    }

    res.json({
      success: true,
      data: {
        _id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        phone: demoUser.phone,
        membershipTier: demoUser.membershipTier,
        points: demoUser.points,
        memberSince: demoUser.memberSince,
        avatar: demoUser.avatar,
        vipPerks: demoUser.vipPerks,
        role: demoUser.role,
        address: demoUser.address,
        token: generateToken(demoUser._id),
      },
      message: 'Signed in as Platinum VIP Guest Lord Julian Davenport',
    });
  } catch (error) {
    next(error);
  }
};
