import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'SmartAgri Pure MERN API Gateway',
    timestamp: new Date().toISOString(),
    mongoDbConnected: mongoose.connection.readyState === 1,
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SmartAgri AI Platform Backend (100% Pure MERN Stack)',
    docs: '/api/health',
  });
});
// Connect to MongoDB Atlas with graceful handling
const connectDatabase = async () => {
  if (!MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI environment variable is missing.');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB Atlas cluster successfully!');

    // Automatically seed smartagri database so it appears in Atlas Collections
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash('farmer123', 10);
      await User.create({
        name: 'Ramesh Patel',
        email: 'farmer@smartagri.com',
        password: hashedPassword,
        phone: '+91 98765 43210',
        location: { state: 'Maharashtra', district: 'Nashik', village: 'Panchavati' },
        farmDetails: { sizeInAcres: 4.5, soilType: 'Black Soil', primaryCrop: 'Tomato', irrigationType: 'Drip Irrigation' },
        preferredLanguage: 'ta',
      });
      console.log('🌱 Seeded initial farmer profile into smartagri.users collection in Atlas!');
    }
  } catch (err) {
    console.warn('⚠️  MongoDB Atlas Connection Warning:', err.message);
    console.warn('⚡ Running with intelligent in-memory persistence fallback for immediate demo!');
  }
};

connectDatabase();

app.listen(PORT, () => {
  console.log(`🚀 SmartAgri Server running on http://localhost:${PORT}`);
});
