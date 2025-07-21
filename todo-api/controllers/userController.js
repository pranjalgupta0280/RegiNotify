const User = require('../models/User');
const emailService = require('../services/emailService');
const whatsappService = require('../services/whatsappService');

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, city, country } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or phone number already exists'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      city,
      country
    });

    await user.save();

    // Send notifications (don't wait for them to complete)
    const userDetails = { name, email, phone, city, country };
    
    // Send email notification
    emailService.sendWelcomeEmail(userDetails)
      .then(result => {
        if (result.success) {
          User.findByIdAndUpdate(user._id, { emailSent: true }).exec();
        }
      })
      .catch(error => console.error('Email notification error:', error));

    // Send WhatsApp notification
    whatsappService.sendWelcomeMessage(userDetails)
      .then(result => {
        if (result.success) {
          User.findByIdAndUpdate(user._id, { whatsappSent: true }).exec();
        }
      })
      .catch(error => console.error('WhatsApp notification error:', error));

    res.status(201).json({
      success: true,
      message: 'User registered successfully! Notifications are being sent.',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        country: user.country,
        registrationDate: user.registrationDate
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `User with this ${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const users = await User.find(query)
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById
};
