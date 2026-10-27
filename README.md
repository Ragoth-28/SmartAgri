# 🌾 SmartAgri — AI-Powered Precision Agriculture Platform

> A full-stack MERN application providing AI-driven advisory to Indian farmers in **English, हिन्दी, தமிழ், and తెలుగు**.

![SmartAgri Banner](client/public/realistic_smart_farm.jpg)

---

## 🚀 Features

| Module | Description |
|---|---|
| 🤖 **AI Chatbot** | Google Gemini AI in 4 Indian languages with voice input/output |
| 🌱 **Crop Recommendation** | NPK-based weighted scoring across 9 major Indian crops |
| 🌦️ **Weather Advisory** | Live 7-day agri-forecast via OpenWeatherMap |
| 🦠 **Leaf Disease Detection** | Upload leaf image for instant disease diagnosis |
| 📡 **IoT Telemetry** | Live soil sensor simulation with auto pump control |
| 💧 **Smart Irrigation** | Drip irrigation schedule planner |
| 🧪 **Fertilizer Calculator** | NPK dose recommender per crop and growth stage |
| 📈 **Market Prices** | APMC mandi price tracker + profit predictor |
| 🏛️ **Govt Schemes** | PM-KISAN, PM-KUSUM, PMFBY navigator |
| 🌐 **3D Farm Visualizer** | Holographic CSS 3D cyber farm map |

---

## 🛠️ Tech Stack

- **Backend:** Node.js · Express.js · Mongoose · MongoDB Atlas
- **Frontend:** React 19 · Vite · Tailwind CSS · Framer Motion
- **AI:** Google Gemini Flash API
- **Weather:** OpenWeatherMap API
- **Auth:** bcryptjs + JWT
- **Voice:** Web Speech API (te-IN · ta-IN · hi-IN · en-IN)

---

## 📦 Project Structure

```
Smartagri/
├── server/               # Express.js backend
│   ├── controllers/      # Business logic (chatbot, crop, weather, IoT…)
│   ├── models/           # Mongoose schema (User)
│   ├── routes/           # REST API routes
│   ├── middleware/        # JWT auth middleware
│   └── server.js         # Entry point
│
└── client/               # React 19 + Vite frontend
    └── src/
        ├── components/   # All UI feature components
        ├── locales/      # i18n: en / hi / ta / te translations
        └── services/     # API service layer
```

---

## ⚙️ Setup & Run

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/SmartAgri.git
cd SmartAgri
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=Smartagri
GEMINI_API_KEY=your_google_gemini_api_key
WEATHER_API_KEY=your_openweathermap_api_key
PORT=5000
```

Start the backend:
```bash
node server.js
# Runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev -- --host
# Runs on http://localhost:5173
```

---

## 🌍 Language Support

| Language | Code | Voice Locale |
|---|---|---|
| English | `en` | `en-IN` |
| Hindi | `hi` | `hi-IN` |
| Tamil | `ta` | `ta-IN` |
| Telugu | `te` | `te-IN` |

---

## 🔐 Security Notes

- All secrets are stored in `server/.env` — **never committed to git**
- Passwords are hashed with **bcrypt (salt=10)**
- Sessions are managed via **JWT (24h expiry)**
- MongoDB Atlas connection is **URI-only**, no hardcoded credentials

---

## 📄 License

MIT License — Free to use for educational and non-commercial purposes.

---

> 🌾 *SmartAgri — Empowering Indian Farmers with AI-Driven Precision Agriculture*
