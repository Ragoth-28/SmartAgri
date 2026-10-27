const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // 🔐 Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  // 🌱 Crop Recommendation
  recommendCrop: async (params) => {
    const res = await fetch(`${API_BASE_URL}/crop/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  // 🌦️ Weather Advisory
  getWeather: async (city = 'Nashik', state = 'Maharashtra') => {
    const res = await fetch(`${API_BASE_URL}/weather/advisory?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`);
    return res.json();
  },

  // 🦠 Leaf Disease Detection
  detectDisease: async (data) => {
    const res = await fetch(`${API_BASE_URL}/disease/detect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // 💧 Smart Irrigation
  calculateIrrigation: async (params) => {
    const res = await fetch(`${API_BASE_URL}/irrigation/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  // 🧪 Fertilizer Recommendation
  recommendFertilizer: async (params) => {
    const res = await fetch(`${API_BASE_URL}/fertilizer/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  // 📈 Market & Profit
  getMarketPrices: async () => {
    const res = await fetch(`${API_BASE_URL}/market/prices`);
    return res.json();
  },

  predictProfit: async (params) => {
    const res = await fetch(`${API_BASE_URL}/market/predict-profit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  // 🤖 AI Farmer Chatbot
  askChatbot: async (message, language = 'en') => {
    const res = await fetch(`${API_BASE_URL}/chat/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language }),
    });
    return res.json();
  },

  // 🏛️ Schemes
  getSchemes: async (category = 'All') => {
    const res = await fetch(`${API_BASE_URL}/schemes?category=${category}`);
    return res.json();
  },

  // 📡 IoT Telemetry & Pump Switch
  getTelemetry: async () => {
    const res = await fetch(`${API_BASE_URL}/iot/telemetry`);
    return res.json();
  },

  togglePump: async (pumpActive, autoMode) => {
    const res = await fetch(`${API_BASE_URL}/iot/pump`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pumpActive, autoMode }),
    });
    return res.json();
  },
};
