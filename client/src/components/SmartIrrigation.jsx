import React, { useState, useEffect } from 'react';
import { Droplets, Power, Clock, Gauge, Waves, AlertCircle, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

export const SmartIrrigation = ({ telemetry, onTogglePump }) => {
  const [params, setParams] = useState({
    soilMoisture: telemetry?.soilMoisture || 28,
    soilType: 'Black Soil',
    cropType: 'Tomato',
    growthStage: 'Flowering',
    fieldAreaAcres: 4.5,
  });

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchIrrigationSchedule = async () => {
    setLoading(true);
    try {
      const res = await api.calculateIrrigation(params);
      if (res.success) {
        setRecommendation(res.irrigationAction);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIrrigationSchedule();
  }, [params.soilMoisture, params.soilType, params.cropType, params.growthStage]);

  const isPumpActive = telemetry?.pumpActive || false;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sky-700 text-xs font-black uppercase tracking-wider">
            <Droplets className="w-4 h-4" />
            <span>Precision Hydro-Automation</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Smart Irrigation Recommendation</h2>
          <p className="text-sm text-slate-600 font-medium">Automated water scheduling based on real-time soil field capacity and plant phenology stage.</p>
        </div>

        {/* 3D Glass Pump Switch */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl glass-panel border border-sky-400/40 shadow-sm bg-white/95">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-700">
              Field Relay Valve: <span className={isPumpActive ? 'text-sky-700 font-black' : 'text-slate-500'}>{isPumpActive ? 'FLOWING' : 'IDLE'}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Submersible Motor 5 HP</div>
          </div>
          <button
            onClick={() => onTogglePump?.(!isPumpActive)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md p-3 ${
              isPumpActive
                ? 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-sky-500/40 animate-pulse scale-105'
                : 'bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-300'
            }`}
          >
            <Power className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls and Sliders */}
        <div className="lg:col-span-5 rounded-3xl glass-card-3d p-6 border border-sky-500/25 shadow-md space-y-5 bg-white/90">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-3">
            <Gauge className="w-4 h-4 text-sky-600" />
            <span>Field Hydration Controls</span>
          </h3>

          <div className="space-y-4">
            {/* Soil Moisture Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-sky-900">Current Soil Moisture: {params.soilMoisture}%</span>
                <span className="text-slate-500 font-medium">Optimal Band: 40-55%</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                value={params.soilMoisture}
                onChange={(e) => setParams({ ...params, soilMoisture: Number(e.target.value) })}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
                <span className="text-rose-600">Dry (10%)</span>
                <span className="text-emerald-700">Ideal (45%)</span>
                <span className="text-blue-700">Saturated (75%)</span>
              </div>
            </div>

            {/* Crop Stage */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Crop Growth Stage</label>
              <select
                value={params.growthStage}
                onChange={(e) => setParams({ ...params, growthStage: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              >
                <option value="Seedling">Seedling Stage (Low Demand)</option>
                <option value="Vegetative">Vegetative Growth (Normal)</option>
                <option value="Flowering">Flowering / Fruit Set (Critical Peak)</option>
                <option value="Fruiting">Fruiting / Grain Fill (High)</option>
                <option value="Maturity">Ripening / Pre-Harvest (Tapering)</option>
              </select>
            </div>

            {/* Soil Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Soil Type</label>
              <select
                value={params.soilType}
                onChange={(e) => setParams({ ...params, soilType: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              >
                <option value="Black Soil">Black Soil (High Retention)</option>
                <option value="Loamy Soil">Loamy Soil (Medium Retention)</option>
                <option value="Clay Soil">Clay Soil (Heavy Retention)</option>
                <option value="Sandy Soil">Sandy Soil (Fast Drainage)</option>
                <option value="Red Soil">Red Soil</option>
              </select>
            </div>

            {/* Field Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Field Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={params.fieldAreaAcres}
                onChange={(e) => setParams({ ...params, fieldAreaAcres: Number(e.target.value) })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Output Recommendation Panel */}
        <div className="lg:col-span-7 space-y-4">
          {recommendation && (
            <div className="rounded-3xl glass-card-3d p-6 border border-sky-500/30 shadow-md space-y-5 bg-white/95">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                  recommendation.urgency === 'Critical'
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : recommendation.urgency === 'Optimal'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-sky-100 text-sky-800 border-sky-300'
                }`}>
                  {recommendation.urgency} Action Status
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800">
                  <Waves className="w-4 h-4 text-sky-600" />
                  <span>Drip Automation Engine</span>
                </div>
              </div>

              {/* Action Directive */}
              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-300 text-xs space-y-1">
                <div className="font-black text-sky-900 uppercase tracking-wider">Hydration Advisory:</div>
                <p className="text-slate-800 leading-relaxed text-sm font-medium">{recommendation.message}</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                    <Clock className="w-4 h-4 text-sky-600" />
                    <span>Recommended Runtime</span>
                  </div>
                  <div className="text-3xl font-black text-sky-900">
                    {recommendation.recommendedRunTimeMinutes} Minutes
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">Standard 5 HP submersible discharge</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span>Total Required Volume</span>
                  </div>
                  <div className="text-3xl font-black text-blue-900">
                    {recommendation.totalWaterVolumeLiters.toLocaleString('en-IN')} L
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">~{recommendation.waterLitersPerAcre.toLocaleString('en-IN')} Liters / acre</p>
                </div>
              </div>

              {/* Timing Tip */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                <span className="font-black text-amber-900 uppercase tracking-wider block">Best Irrigating Window:</span>
                <p className="text-slate-800 font-medium">{recommendation.bestTimeToIrrigate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
