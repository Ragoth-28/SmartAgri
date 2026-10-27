import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FarmerDashboard } from './components/FarmerDashboard';
import { CropRecommendation } from './components/CropRecommendation';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { LeafDiseaseDetection } from './components/LeafDiseaseDetection';
import { SmartIrrigation } from './components/SmartIrrigation';
import { FertilizerCalculator } from './components/FertilizerCalculator';
import { MarketPriceProfit } from './components/MarketPriceProfit';
import { AiChatbot } from './components/AiChatbot';
import { GovtSchemes } from './components/GovtSchemes';
import { AuthModal } from './components/AuthModal';
import { api } from './services/api';
import { TRANSLATIONS } from './locales/translations';
import {
  LayoutDashboard,
  Sprout,
  CloudSun,
  Bug,
  Droplets,
  FlaskConical,
  TrendingUp,
  Bot,
  Landmark,
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('smartagri_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Ramesh Patel',
          email: 'farmer@smartagri.com',
          phone: '+91 98765 43210',
          location: { state: 'Maharashtra', district: 'Nashik', village: 'Panchavati' },
          farmDetails: { sizeInAcres: 4.5, soilType: 'Black Soil', primaryCrop: 'Tomato', irrigationType: 'Drip' },
        };
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [language, setLanguage] = useState('ta'); // Default to Tamil
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('smartagri_theme') || 'light';
  });
  const [cropForFertilizer, setCropForFertilizer] = useState('Tomato');
  const [telemetry, setTelemetry] = useState({
    soilMoisture: 32.4,
    soilTemperature: 24.2,
    ambientTemperature: 28.5,
    ambientHumidity: 64,
    pumpActive: false,
    autoMode: true,
  });

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Polling IoT Telemetry
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await api.getTelemetry();
        if (res.success && res.telemetry) {
          setTelemetry(res.telemetry);
        }
      } catch (err) {
        setTelemetry((prev) => ({
          ...prev,
          soilMoisture: Number(Math.max(15, Math.min(80, prev.soilMoisture + (prev.pumpActive ? 0.8 : -0.1))).toFixed(1)),
        }));
      }
    };

    poll();
    const interval = setInterval(poll, 4000);
    return () => clearInterval(interval);
  }, []);

  // Persist and synchronize theme
  useEffect(() => {
    localStorage.setItem('smartagri_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Text-To-Speech Readout handler supporting Tamil (ta-IN), Telugu (te-IN), Hindi (hi-IN)
  const handleSpeechReadout = (text) => {
    if (!speechEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ta' ? 'ta-IN' : language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleTogglePump = async (desiredState) => {
    try {
      const res = await api.togglePump(desiredState, true);
      if (res.success) {
        setTelemetry(res.telemetry);
      }
    } catch {
      setTelemetry((prev) => ({ ...prev, pumpActive: desiredState }));
    }
  };

  const handleAuthSuccess = (authenticatedUser, token) => {
    setUser(authenticatedUser);
    localStorage.setItem('smartagri_user', JSON.stringify(authenticatedUser));
    if (token) localStorage.setItem('smartagri_token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('smartagri_user');
    localStorage.removeItem('smartagri_token');
  };

  // Dual-theme navigation tabs
  const navTabs = [
    { id: 'dashboard', label: t.tabs.dashboard, icon: LayoutDashboard },
    { id: 'crops', label: t.tabs.crops, icon: Sprout },
    { id: 'weather', label: t.tabs.weather, icon: CloudSun },
    { id: 'disease', label: t.tabs.disease, icon: Bug },
    { id: 'irrigation', label: t.tabs.irrigation, icon: Droplets },
    { id: 'fertilizer', label: t.tabs.fertilizer, icon: FlaskConical },
    { id: 'market', label: t.tabs.market, icon: TrendingUp },
    { id: 'chatbot', label: t.tabs.chatbot, icon: Bot },
    { id: 'schemes', label: t.tabs.schemes, icon: Landmark },
  ];

  return (
    <div
      className={`min-h-screen relative overflow-hidden flex flex-col transition-colors duration-500 ${
        theme === 'light' ? 'theme-light text-slate-800' : 'theme-dark text-slate-100'
      }`}
    >
      {/* Dynamic Ambient Background: Half-White/Green vs Cyber Neon */}
      {theme === 'light' ? (
        <>
          {/* Natural Half-White & Emerald Mist Ambient Lights */}
          <div className="fixed top-[-5%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-emerald-400/12 blur-[130px] pointer-events-none -z-10" />
          <div className="fixed top-[-5%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-white/80 blur-[140px] pointer-events-none -z-10" />
          <div className="fixed bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-green-300/15 blur-[140px] pointer-events-none -z-10" />
          <div className="fixed bottom-[-10%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-emerald-200/20 blur-[130px] pointer-events-none -z-10" />
        </>
      ) : (
        <>
          {/* Cybernetic Multi-Color Neon Glowing 3D Orbs */}
          <div className="fixed top-[-10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-indigo-600/30 blur-[140px] pointer-events-none -z-10 neon-orb" />
          <div className="fixed top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/25 blur-[150px] pointer-events-none -z-10 neon-orb" style={{ animationDelay: '-2s' }} />
          <div className="fixed bottom-[-15%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-purple-600/30 blur-[160px] pointer-events-none -z-10 neon-orb" style={{ animationDelay: '-4s' }} />
          <div className="fixed top-[50%] left-[-15%] w-[35vw] h-[35vw] rounded-full bg-rose-500/20 blur-[130px] pointer-events-none -z-10 neon-orb" style={{ animationDelay: '-1s' }} />
          <div className="fixed bottom-[10%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-amber-500/20 blur-[140px] pointer-events-none -z-10 neon-orb" style={{ animationDelay: '-3s' }} />
        </>
      )}

      {/* Header */}
      <Navbar
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        language={language}
        setLanguage={setLanguage}
        speechEnabled={speechEnabled}
        setSpeechEnabled={setSpeechEnabled}
        theme={theme}
        setTheme={setTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        telemetry={telemetry}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Horizontal Navigation Half-White / Cyber Neon Ribbon */}
        <div
          className={`p-2 rounded-2xl glass-panel backdrop-blur-2xl overflow-x-auto no-scrollbar flex items-center gap-1.5 transition-all duration-300 ${
            theme === 'light'
              ? 'border border-emerald-500/20 shadow-md'
              : 'border border-cyan-500/30 shadow-lg shadow-cyan-950/40'
          }`}
        >
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                  isActive
                    ? theme === 'light'
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md shadow-emerald-700/20 scale-105 border border-emerald-400/40'
                      : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/40 scale-105 border border-cyan-200'
                    : theme === 'light'
                      ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/80 font-bold'
                      : 'text-slate-300 hover:text-cyan-300 hover:bg-white/10 font-bold'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? theme === 'light'
                        ? 'text-white'
                        : 'text-slate-950'
                      : theme === 'light'
                        ? 'text-emerald-600'
                        : 'text-cyan-400'
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Sub-views */}
        {activeTab === 'dashboard' && (
          <FarmerDashboard
            user={user}
            telemetry={telemetry}
            onTogglePump={handleTogglePump}
            setActiveTab={setActiveTab}
            onSpeechReadout={handleSpeechReadout}
            language={language}
            theme={theme}
          />
        )}

        {activeTab === 'crops' && (
          <CropRecommendation
            onNavigateTab={setActiveTab}
            setCropForFertilizer={setCropForFertilizer}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherAdvisory onSpeechReadout={handleSpeechReadout} />
        )}

        {activeTab === 'disease' && (
          <LeafDiseaseDetection onSpeechReadout={handleSpeechReadout} />
        )}

        {activeTab === 'irrigation' && (
          <SmartIrrigation
            telemetry={telemetry}
            onTogglePump={handleTogglePump}
          />
        )}

        {activeTab === 'fertilizer' && (
          <FertilizerCalculator initialCrop={cropForFertilizer} />
        )}

        {activeTab === 'market' && <MarketPriceProfit />}

        {activeTab === 'chatbot' && (
          <AiChatbot
            language={language}
            onSpeechReadout={handleSpeechReadout}
          />
        )}

        {activeTab === 'schemes' && <GovtSchemes />}
      </main>

      {/* Footer */}
      <footer
        className={`mt-auto border-t backdrop-blur-xl py-4 px-4 text-center text-xs transition-colors duration-300 ${
          theme === 'light'
            ? 'border-emerald-500/20 bg-white/80 text-slate-600'
            : 'border-cyan-500/25 bg-slate-950/80 text-slate-400'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className={`font-bold ${theme === 'light' ? 'text-emerald-900' : 'text-cyan-400'}`}>
            {language === 'ta'
              ? 'SmartAgri AI வேளாண்மை வழிகாட்டி தளம் • 100% Pure MERN Stack கட்டமைப்பு'
              : language === 'te'
              ? 'SmartAgri AI వ్యవసాయ మార్గదర్శక వేదిక • 100% Pure MERN Stack నిర్మాణం'
              : 'SmartAgri AI Advisory Platform • 100% Pure MERN Stack Architecture'}
          </span>
          <span className={`${theme === 'light' ? 'text-emerald-700' : 'text-emerald-400'} font-mono font-bold`}>
            React 19 • Express.js • MongoDB • Node.js
          </span>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
