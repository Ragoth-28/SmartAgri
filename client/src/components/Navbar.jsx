import React from 'react';
import { Sprout, User, LogOut, Globe, Volume2, VolumeX, Sun, Moon, Zap } from 'lucide-react';
import { TRANSLATIONS } from '../locales/translations';

export const Navbar = ({
  user,
  onOpenAuth,
  onLogout,
  language = 'ta',
  setLanguage,
  speechEnabled,
  setSpeechEnabled,
  theme = 'light',
  setTheme,
  activeTab,
  setActiveTab,
  telemetry,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-2xl px-4 lg:px-8 py-3.5 transition-all duration-300 ${
        theme === 'light'
          ? 'bg-white/90 border-b border-emerald-500/20 shadow-sm'
          : 'bg-slate-950/85 border-b border-cyan-500/30 shadow-lg shadow-cyan-950/50'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md ${
              theme === 'light'
                ? 'bg-gradient-to-tr from-emerald-600 to-green-500 shadow-emerald-600/20'
                : 'bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 shadow-cyan-500/35 border border-cyan-300/40'
            }`}
          >
            <Sprout className={`w-6 h-6 animate-bounce ${theme === 'light' ? 'text-white' : 'text-slate-950'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-black text-xl tracking-tight bg-clip-text text-transparent ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800'
                    : 'bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300'
                }`}
              >
                SmartAgri
              </span>
              <span
                className={`text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full border ${
                  theme === 'light'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-400/40'
                    : 'bg-cyan-950/80 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-400/30'
                }`}
              >
                {language === 'ta' ? '3D தமிழ்' : language === 'te' ? '3D తెలుగు' : language === 'hi' ? '3D हिंदी' : '3D Farm'}
              </span>
            </div>
            <p className={`text-xs hidden sm:block font-medium ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Live IoT Sensor Badge */}
        {telemetry && (
          <div
            className={`hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl text-xs shadow-sm border ${
              theme === 'light'
                ? 'bg-emerald-50/90 border-emerald-500/30'
                : 'bg-slate-900/90 border-cyan-500/40 shadow-cyan-500/20'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  theme === 'light' ? 'bg-emerald-500' : 'bg-cyan-400'
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  theme === 'light' ? 'bg-emerald-600' : 'bg-cyan-400'
                }`}
              ></span>
            </span>
            <span className={`font-black ${theme === 'light' ? 'text-emerald-800' : 'text-cyan-300'}`}>
              {t.iotNode}:
            </span>
            <span className={`font-extrabold ${theme === 'light' ? 'text-slate-900' : 'text-slate-200'}`}>
              {telemetry.soilMoisture}% {t.moisture}
            </span>
            <span className={theme === 'light' ? 'text-emerald-300' : 'text-slate-700'}>|</span>
            <span
              className={`font-black ${
                telemetry.pumpActive
                  ? theme === 'light'
                    ? 'text-sky-600 animate-pulse'
                    : 'text-cyan-300 animate-pulse'
                  : 'text-slate-500'
              }`}
            >
              {t.pump} {telemetry.pumpActive ? t.pumpActive : t.pumpIdle}
            </span>
          </div>
        )}

        {/* Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dual-Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Cyber Neon Dark Mode' : 'Switch to Natural Light Mode'}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all transform hover:scale-105 border ${
              theme === 'light'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-sm hover:bg-emerald-100'
                : 'bg-cyan-950/80 text-cyan-300 border-cyan-400/60 shadow-md shadow-cyan-500/30 hover:bg-cyan-900/60'
            }`}
          >
            {theme === 'light' ? (
              <>
                <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '18s' }} />
                <span className="hidden sm:inline font-bold">{t.lightMode}</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-cyan-300 animate-pulse" />
                <span className="hidden sm:inline font-bold">{t.neonMode}</span>
              </>
            )}
          </button>

          {/* TTS Audio toggle */}
          <button
            onClick={() => setSpeechEnabled(!speechEnabled)}
            title={speechEnabled ? 'Voice Readout Enabled' : 'Voice Readout Disabled'}
            className={`p-2.5 rounded-xl transition-all border ${
              speechEnabled
                ? theme === 'light'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-400 shadow-sm'
                  : 'bg-cyan-950 text-cyan-300 border-cyan-400 shadow-sm shadow-cyan-400/30'
                : theme === 'light'
                  ? 'bg-white text-slate-400 border-slate-200 hover:text-slate-700'
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Switcher with Tamil, Telugu, English, Hindi */}
          <div className="relative flex items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`appearance-none text-xs rounded-xl px-3.5 py-2 pr-7 font-black cursor-pointer focus:outline-none focus:ring-2 shadow-sm border ${
                theme === 'light'
                  ? 'bg-white border-emerald-500/30 text-emerald-900 focus:ring-emerald-500'
                  : 'bg-slate-900 border-cyan-500/40 text-cyan-300 focus:ring-cyan-500'
              }`}
            >
              <option value="en" className={theme === 'light' ? 'bg-white text-slate-800 font-semibold' : 'bg-slate-900 text-slate-100 font-semibold'}>English (EN)</option>
              <option value="ta" className={theme === 'light' ? 'bg-white text-emerald-800 font-black' : 'bg-slate-900 text-cyan-300 font-black'}>தமிழ் (Tamil)</option>
              <option value="te" className={theme === 'light' ? 'bg-white text-emerald-800 font-black' : 'bg-slate-900 text-cyan-300 font-black'}>తెలుగు (Telugu)</option>
              <option value="hi" className={theme === 'light' ? 'bg-white text-slate-800 font-semibold' : 'bg-slate-900 text-slate-100 font-semibold'}>हिंदी (Hindi)</option>
            </select>
            <Globe className={`w-3.5 h-3.5 absolute right-2.5 pointer-events-none ${theme === 'light' ? 'text-emerald-600' : 'text-cyan-400'}`} />
          </div>

          {/* User Auth chip */}
          {user ? (
            <div className={`flex items-center gap-2 pl-2 border-l ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
              <div 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer transition-colors shadow-sm border ${
                  theme === 'light'
                    ? 'bg-emerald-50 border-emerald-500/25 hover:border-emerald-500'
                    : 'bg-slate-900 border-cyan-500/30 hover:border-cyan-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    theme === 'light' ? 'bg-emerald-600 text-white' : 'bg-cyan-500 text-slate-950'
                  }`}
                >
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden lg:block">
                  <div className={`text-xs font-bold leading-tight ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>{user.name}</div>
                  <div className={`text-[10px] font-semibold leading-tight ${theme === 'light' ? 'text-emerald-700' : 'text-cyan-400'}`}>{user.location?.district || 'Farm'}</div>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Logout"
                className={`p-2.5 rounded-xl transition-all shadow-sm border ${
                  theme === 'light'
                    ? 'bg-white text-rose-600 hover:bg-rose-50 border-rose-200'
                    : 'bg-slate-900 text-rose-400 hover:bg-rose-950/40 border-rose-900/50'
                }`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs tracking-wide shadow-md transition-all transform hover:scale-105 ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-emerald-700/20'
                  : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 shadow-cyan-500/30 font-black'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t.farmerLogin}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
