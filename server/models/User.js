import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: '',
  },
  location: {
    state: { type: String, default: 'Maharashtra' },
    district: { type: String, default: 'Nashik' },
    village: { type: String, default: 'Panchavati' },
  },
  farmDetails: {
    sizeInAcres: { type: Number, default: 4.5 },
    soilType: { type: String, default: 'Black Soil' },
    primaryCrop: { type: String, default: 'Tomato' },
    irrigationType: { type: String, default: 'Drip Irrigation' },
  },
  preferredLanguage: {
    type: String,
    enum: ['en', 'hi', 'mr', 'ta', 'te'],
    default: 'en',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
