import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { recommendCrop } from '../controllers/cropController.js';
import { getWeatherAdvisory } from '../controllers/weatherController.js';
import { detectDisease } from '../controllers/diseaseController.js';
import { calculateIrrigation } from '../controllers/irrigationController.js';
import { recommendFertilizer } from '../controllers/fertilizerController.js';
import { getMarketPrices, predictProfit } from '../controllers/marketController.js';
import { chatWithAi } from '../controllers/chatbotController.js';
import { getSchemes } from '../controllers/schemeController.js';
import { getTelemetry, togglePump } from '../controllers/iotController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// 🔐 Authentication
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', authenticateToken, getProfile);

// 🌱 AI Crop Recommendation
router.post('/crop/recommend', recommendCrop);

// 🌦️ Weather-based Advisory
router.get('/weather/advisory', getWeatherAdvisory);

// 🦠 Leaf Disease Detection
router.post('/disease/detect', detectDisease);

// 💧 Smart Irrigation Recommendation
router.post('/irrigation/calculate', calculateIrrigation);

// 🧪 Fertilizer Recommendation
router.post('/fertilizer/recommend', recommendFertilizer);

// 📈 Market Price + Profit Prediction
router.get('/market/prices', getMarketPrices);
router.post('/market/predict-profit', predictProfit);

// 🤖 AI Farmer Chatbot
router.post('/chat/ask', chatWithAi);

// 🏛️ Government Schemes
router.get('/schemes', getSchemes);

// 📡 IoT Soil Sensor Telemetry & Pump Switch
router.get('/iot/telemetry', getTelemetry);
router.post('/iot/pump', togglePump);

export default router;
