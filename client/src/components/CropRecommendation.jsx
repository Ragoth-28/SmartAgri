import React, { useState } from 'react';
import { Sprout, Sparkles, CheckCircle2, ArrowRight, Gauge, Droplets, Clock, BarChart3 } from 'lucide-react';
import { api } from '../services/api';

export const CropRecommendation = ({ onNavigateTab, setCropForFertilizer }) => {
  const [params, setParams] = useState({
    nitrogen: 85,
    phosphorus: 45,
    potassium: 40,
    temperature: 26,
    humidity: 65,
    ph: 6.8,
    rainfall: 95,
    soilType: 'Black Soil',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRecommend = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await api.recommendCrop(params);
      if (res.success) {
        setResult(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCropForFertilizer = (cropName) => {
    if (setCropForFertilizer) setCropForFertilizer(cropName);
    if (onNavigateTab) onNavigateTab('fertilizer');
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-black uppercase tracking-wider">
            <Sprout className="w-4 h-4" />
            <span>AI Agronomic Engine</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI Crop Recommendation</h2>
          <p className="text-sm text-slate-600 font-medium">Match soil nutrients, pH, rainfall, and micro-climate with optimal high-yield crops.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters Panel */}
        <div className="lg:col-span-5 rounded-3xl glass-card-3d p-6 border border-emerald-500/25 shadow-md space-y-5 bg-white/90">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-emerald-500/15 pb-3">
            <Gauge className="w-4 h-4 text-emerald-600" />
            <span>Soil & Climate Parameters</span>
          </h3>

          <form onSubmit={handleRecommend} className="space-y-4">
            {/* Soil Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Soil Type</label>
              <select
                value={params.soilType}
                onChange={(e) => setParams({ ...params, soilType: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800"
              >
                <option value="Black Soil">Black Soil (Regur)</option>
                <option value="Clayey">Clayey / Clay Loam</option>
                <option value="Alluvial">Alluvial Soil</option>
                <option value="Sandy Loam">Sandy Loam</option>
                <option value="Red Soil">Red Soil</option>
              </select>
            </div>

            {/* Sliders for N, P, K */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-emerald-800">Nitrogen (N): {params.nitrogen} kg/ha</span>
                  <span className="text-slate-500 font-medium">0 - 150</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={params.nitrogen}
                  onChange={(e) => setParams({ ...params, nitrogen: Number(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-green-800">Phosphorus (P): {params.phosphorus} kg/ha</span>
                  <span className="text-slate-500 font-medium">5 - 100</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={params.phosphorus}
                  onChange={(e) => setParams({ ...params, phosphorus: Number(e.target.value) })}
                  className="w-full accent-green-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-lime-800">Potassium (K): {params.potassium} kg/ha</span>
                  <span className="text-slate-500 font-medium">5 - 120</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={params.potassium}
                  onChange={(e) => setParams({ ...params, potassium: Number(e.target.value) })}
                  className="w-full accent-lime-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Grid of Microclimate values */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Avg Temp (°C)</label>
                <input
                  type="number"
                  value={params.temperature}
                  onChange={(e) => setParams({ ...params, temperature: Number(e.target.value) })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Humidity (%)</label>
                <input
                  type="number"
                  value={params.humidity}
                  onChange={(e) => setParams({ ...params, humidity: Number(e.target.value) })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Soil pH (0-14)</label>
                <input
                  type="number"
                  step="0.1"
                  value={params.ph}
                  onChange={(e) => setParams({ ...params, ph: Number(e.target.value) })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rainfall (mm)</label>
                <input
                  type="number"
                  value={params.rainfall}
                  onChange={(e) => setParams({ ...params, rainfall: Number(e.target.value) })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm tracking-wide shadow-md shadow-emerald-700/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Computing AI Model...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze & Recommend Crop</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-5">
          {result?.primaryRecommendation ? (
            <div className="rounded-3xl glass-card-3d p-6 border border-emerald-500/30 shadow-lg relative overflow-hidden space-y-5 bg-white/95">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-400/40 text-xs font-black uppercase tracking-wider">
                  Top Recommended Crop
                </span>
                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-500/30">
                  <span>Match Confidence:</span>
                  <span className="text-emerald-700 font-extrabold text-sm">{result.primaryRecommendation.confidence}%</span>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                  {result.primaryRecommendation.name}
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </h3>
                <p className="text-xs text-emerald-700 font-bold mt-0.5">{result.primaryRecommendation.category}</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Duration</span>
                  </div>
                  <div className="text-sm font-black text-slate-900">{result.primaryRecommendation.growthDuration}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-bold mb-1">
                    <BarChart3 className="w-3.5 h-3.5 text-green-600" />
                    <span>Expected Yield</span>
                  </div>
                  <div className="text-sm font-black text-slate-900">{result.primaryRecommendation.expectedYield}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-bold mb-1">
                    <Droplets className="w-3.5 h-3.5 text-teal-600" />
                    <span>Water Needs</span>
                  </div>
                  <div className="text-sm font-black text-slate-900">{result.primaryRecommendation.waterRequirement}</div>
                </div>
              </div>

              {/* Agronomic Tip */}
              <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-500/25 text-xs space-y-1">
                <span className="font-black text-emerald-900 uppercase tracking-wider block">Agronomist Advisory:</span>
                <p className="text-slate-700 leading-relaxed font-medium">{result.primaryRecommendation.tips}</p>
              </div>

              {/* Quick action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => handleSelectCropForFertilizer(result.primaryRecommendation.name)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-md shadow-emerald-700/20"
                >
                  <span>Calculate Fertilizer Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('market')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold transition-all"
                >
                  <span>Check Mandi Market Price</span>
                </button>
              </div>

              {/* Alternative Crops */}
              {result.alternativeRecommendations?.length > 0 && (
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
                    Alternative Viable Options
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.alternativeRecommendations.map((alt) => (
                      <div
                        key={alt.name}
                        onClick={() => handleSelectCropForFertilizer(alt.name)}
                        className="p-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between shadow-sm"
                      >
                        <div>
                          <div className="text-sm font-black text-slate-900">{alt.name}</div>
                          <div className="text-[10px] text-slate-500 font-semibold">{alt.category}</div>
                        </div>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {alt.confidence}% match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl glass-card-3d p-12 border border-emerald-500/20 text-center flex flex-col items-center justify-center space-y-4 bg-white/90">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-500/30 flex items-center justify-center text-emerald-700">
                <Sprout className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900">No Analysis Run Yet</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1 font-medium">
                  Adjust your soil NPK values and climate conditions on the left, then click <strong>"Analyze & Recommend Crop"</strong>.
                </p>
              </div>
              <button
                onClick={handleRecommend}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-md shadow-emerald-700/20"
              >
                Run Quick Simulation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
