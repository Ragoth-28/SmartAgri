import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets, Thermometer, AlertTriangle, ShieldCheck, Search, Volume2, Sun, CloudRain } from 'lucide-react';
import { api } from '../services/api';

export const WeatherAdvisory = ({ onSpeechReadout }) => {
  const [city, setCity] = useState('Nashik');
  const [state, setState] = useState('Maharashtra');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const data = await api.getWeather(city, state);
      if (data.success) {
        setWeatherData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleReadAdvisories = () => {
    if (!weatherData?.advisories || !onSpeechReadout) return;
    const text = weatherData.advisories.map((a) => `${a.title}. ${a.message}`).join('. ');
    onSpeechReadout(`Weather advisory for ${city}: ` + text);
  };

  return (
    <div className="space-y-6">
      {/* Title & City Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-800 text-xs font-black uppercase tracking-wider">
            <CloudSun className="w-4 h-4" />
            <span>Agro-Meteorology Advisory</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Weather-based Advisory</h2>
          <p className="text-sm text-slate-600 font-medium">Localized farm micro-weather forecasting with actionable agricultural spray and harvest alerts.</p>
        </div>

        {/* Location search bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="District / City..."
            className="glass-input rounded-xl px-3.5 py-2 text-xs font-bold w-40 sm:w-48 text-slate-800"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Update</span>
          </button>
          <button
            onClick={handleReadAdvisories}
            title="Read out advisories via audio"
            className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 transition-all shadow-sm"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {weatherData && (
        <div className="space-y-6">
          {/* Current Microclimate Hero Card */}
          <div className="rounded-3xl glass-card-3d p-6 border border-amber-500/30 shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-gradient-to-r from-white via-amber-50/50 to-white">
            <div className="md:col-span-5 space-y-2">
              <div className="text-xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-600 animate-spin-slow" />
                <span>Current Microclimate • {weatherData.currentWeather.location}</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-black text-slate-900">
                  {weatherData.currentWeather.temp}°C
                </span>
                <span className="text-sm text-amber-900 font-extrabold px-3 py-1 rounded-full bg-amber-100 border border-amber-400">
                  {weatherData.currentWeather.condition}
                </span>
              </div>
              <div className="text-xs text-slate-600 font-medium">
                Feels like {weatherData.currentWeather.feelsLike}°C • Dew Point: {weatherData.currentWeather.dewPoint}°C • Synced {weatherData.currentWeather.updatedAt}
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-600" />
                  <span>Humidity</span>
                </div>
                <div className="text-lg font-black text-slate-900">{weatherData.currentWeather.humidity}%</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
                  <Wind className="w-3.5 h-3.5 text-teal-600" />
                  <span>Wind Speed</span>
                </div>
                <div className="text-lg font-black text-slate-900">{weatherData.currentWeather.windSpeed} km/h</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                  <span>Soil Temp</span>
                </div>
                <div className="text-lg font-black text-slate-900">{weatherData.currentWeather.soilTemp}°C</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
                  <CloudRain className="w-3.5 h-3.5 text-blue-600" />
                  <span>Rain Chance</span>
                </div>
                <div className="text-lg font-black text-slate-900">{weatherData.currentWeather.rainfallProbability}%</div>
              </div>
            </div>
          </div>

          {/* Actionable Agricultural Advisories */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Agricultural Directives</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weatherData.advisories.map((adv) => (
                <div
                  key={adv.id}
                  className={`rounded-3xl glass-card-3d p-5 border shadow-sm ${
                    adv.type === 'warning'
                      ? 'border-amber-400 bg-amber-50/70'
                      : adv.type === 'favorable'
                      ? 'border-emerald-400 bg-emerald-50/70'
                      : 'border-sky-400 bg-sky-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-800">
                      {adv.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600">{adv.urgency} Urgency</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mb-1.5">{adv.title}</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{adv.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Agricultural Forecast */}
          <div className="rounded-3xl glass-card-3d p-6 border border-emerald-500/20 backdrop-blur-2xl shadow-md space-y-4 bg-white/90">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              7-Day Crop Operation Suitability Outlook
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {weatherData.forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-2 hover:border-emerald-500/50 hover:bg-emerald-50/50 transition-all shadow-sm"
                >
                  <div>
                    <div className="text-xs font-black text-slate-900">{day.day}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">{day.date}</div>
                  </div>

                  <div className="my-1">
                    <div className="text-sm font-black text-slate-900">{day.maxTemp}° / {day.minTemp}°</div>
                    <div className="text-[10px] text-emerald-700 font-bold truncate">{day.condition}</div>
                  </div>

                  <div className="space-y-1 text-[10px] pt-1.5 border-t border-slate-100">
                    <div className="flex justify-between text-slate-600 font-semibold">
                      <span>Rain:</span>
                      <span className="font-extrabold text-sky-700">{day.rainChance}%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${day.suitableForSpraying ? 'bg-emerald-500 shadow-sm' : 'bg-rose-500 shadow-sm'}`} />
                      <span className="text-slate-800 font-bold">{day.suitableForSpraying ? 'Spray Safe' : 'No Spray'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
