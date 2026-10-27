import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// In-memory fallback database for instant demo if local MongoDB is unreachable
const memoryUsers = [];

const signToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'smartagri_super_secure_jwt_secret_key_2026';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, location, farmDetails, preferredLanguage } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Try MongoDB first if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
          return res.status(400).json({ success: false, message: 'Farmer already registered with this email.' });
        }

        const newUser = new User({
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
          phone: phone || '',
          location: location || { state: 'Maharashtra', district: 'Nashik', village: 'Panchavati' },
          farmDetails: farmDetails || { sizeInAcres: 4.5, soilType: 'Black Soil', primaryCrop: 'Tomato', irrigationType: 'Drip' },
          preferredLanguage: preferredLanguage || 'en',
        });

        await newUser.save();

        const token = signToken({ id: newUser._id, email: newUser.email, name: newUser.name });
        return res.status(201).json({
          success: true,
          token,
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            location: newUser.location,
            farmDetails: newUser.farmDetails,
            preferredLanguage: newUser.preferredLanguage,
          },
        });
      } catch (mongoError) {
        console.warn('MongoDB operation failed, falling back to memory database:', mongoError.message);
      }
    }

    const exists = memoryUsers.find((u) => u.email === email.toLowerCase());
    if (exists) {
      return res.status(400).json({ success: false, message: 'Farmer already registered with this email.' });
    }

    const memoryUser = {
      _id: 'demo_' + Date.now(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '+91 9876543210',
      location: location || { state: 'Maharashtra', district: 'Nashik', village: 'Panchavati' },
      farmDetails: farmDetails || { sizeInAcres: 4.5, soilType: 'Black Soil', primaryCrop: 'Tomato', irrigationType: 'Drip' },
      preferredLanguage: preferredLanguage || 'en',
    };
    memoryUsers.push(memoryUser);

    const token = signToken({ id: memoryUser._id, email: memoryUser.email, name: memoryUser.name });
    return res.status(201).json({
      success: true,
      token,
      user: {
        id: memoryUser._id,
        name: memoryUser.name,
        email: memoryUser.email,
        phone: memoryUser.phone,
        location: memoryUser.location,
        farmDetails: memoryUser.farmDetails,
        preferredLanguage: memoryUser.preferredLanguage,
      },
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    let user = null;
    let isMatch = false;

    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
          isMatch = await bcrypt.compare(password, user.password);
        }
      } catch (mongoError) {
        console.warn('MongoDB query failed, checking demo store:', mongoError.message);
      }
    }

    if (!user) {
      user = memoryUsers.find((u) => u.email === email.toLowerCase());
      if (user) {
        isMatch = await bcrypt.compare(password, user.password);
      }
    }

    // Demo auto-login convenience for testing
    if (!user && (email === 'farmer@smartagri.com' || email === 'demo@farm.com')) {
      user = {
        _id: 'demo_default_1',
        name: 'Ramesh Patel',
        email: email,
        phone: '+91 98765 43210',
        location: { state: 'Maharashtra', district: 'Nashik', village: 'Panchavati' },
        farmDetails: { sizeInAcres: 5.2, soilType: 'Black Clay Loam', primaryCrop: 'Tomato & Cotton', irrigationType: 'Smart Drip' },
        preferredLanguage: 'en',
      };
      isMatch = true;
    }

    if (!user || !isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your email and password.' });
    }

    const token = signToken({ id: user._id, email: user.email, name: user.name });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        farmDetails: user.farmDetails,
        preferredLanguage: user.preferredLanguage,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
};

export const getProfile = async (req, res) => {
  try {
    let user = null;
    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findById(req.user.id).select('-password');
      } catch {
        user = memoryUsers.find((u) => u._id === req.user.id);
      }
    } else {
      user = memoryUsers.find((u) => u._id === req.user.id);
    }

    if (!user) {
      return res.json({
        success: true,
        user: {
          id: req.user.id,
          name: req.user.name || 'Progressive Farmer',
          email: req.user.email,
          location: { state: 'Maharashtra', district: 'Nashik', village: 'Panchavati' },
          farmDetails: { sizeInAcres: 4.5, soilType: 'Black Soil', primaryCrop: 'Tomato', irrigationType: 'Drip' },
        },
      });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};
