import React, { useState, useEffect } from 'react';
import { FlaskConical, Scale, Sparkles, CheckCircle2, AlertTriangle, Layers, Sprout } from 'lucide-react';
import { api } from '../services/api';

export const FertilizerCalculator = ({ initialCrop = 'Tomato' }) => {
  const [params, setParams] = useState({
    cropName: initialCrop,
    currentN: 80,
    currentP: 35,
    currentK: 30,
    landAreaAcres: 4.5,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialCrop) {
      setParams((prev) => ({ ...prev, cropName: initialCrop }));
    }
  }, [initialCrop]);

  const handleCalculate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await api.recommendFertilizer(params);
      if (res.success) {
        setResult(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [params.cropName, params.currentN, params.currentP, params.currentK, params.landAreaAcres]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-wider">
          <FlaskConical className="w-4 h-4" />
          <span>NPK Stoichiometric Balancing</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Fertilizer Recommendation</h2>
        <p className="text-sm text-slate-600 font-medium">Calculate exact bag dosages of Urea, DAP, and MOP while preventing soil over-fertilization.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-5 rounded-3xl glass-card-3d p-6 border border-emerald-500/25 shadow-md space-y-4 bg-white/90">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-3">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>Target Crop & Soil Test Values</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Crop</label>
              <select
                value={params.cropName}
                onChange={(e) => setParams({ ...params, cropName: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              >
                <option value="Tomato">Tomato (Horticulture)</option>
                <option value="Wheat">Wheat (Cereal / Rabi)</option>
                <option value="Rice (Paddy)">Rice / Paddy (Kharif)</option>
                <option value="Cotton">Cotton (Cash Crop)</option>
                <option value="Maize (Corn)">Maize / Corn</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Onion">Onion</option>
              </select>
            </div>

            {/* Sliders for current soil NPK */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-emerald-800">Soil Available Nitrogen (N): {params.currentN} kg/ha</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="140"
                  value={params.currentN}
                  onChange={(e) => setParams({ ...params, currentN: Number(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-green-800">Soil Available Phosphorus (P): {params.currentP} kg/ha</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={params.currentP}
                  onChange={(e) => setParams({ ...params, currentP: Number(e.target.value) })}
                  className="w-full accent-green-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-lime-800">Soil Available Potassium (K): {params.currentK} kg/ha</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={params.currentK}
                  onChange={(e) => setParams({ ...params, currentK: Number(e.target.value) })}
                  className="w-full accent-lime-600 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Cultivated Land Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={params.landAreaAcres}
                onChange={(e) => setParams({ ...params, landAreaAcres: Number(e.target.value) })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-4">
          {result && (
            <div className="rounded-3xl glass-card-3d p-6 border border-emerald-500/25 shadow-md space-y-5 bg-white/95">
              {/* Nutrient Balance Indicators */}
              <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5">
                  Nutrient Deficit Balance ({result.cropName})
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-center">
                    <span className="text-xs text-slate-600 font-bold block">Nitrogen Deficit</span>
                    <span className="text-xl font-black text-emerald-800">{result.soilHealthStatus.nitrogen.deficit} kg/ha</span>
                    <span className="text-[10px] text-slate-500 font-semibold block">Target: {result.soilHealthStatus.nitrogen.target}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-green-50/80 border border-green-300 text-center">
                    <span className="text-xs text-slate-600 font-bold block">Phosphorus Deficit</span>
                    <span className="text-xl font-black text-green-800">{result.soilHealthStatus.phosphorus.deficit} kg/ha</span>
                    <span className="text-[10px] text-slate-500 font-semibold block">Target: {result.soilHealthStatus.phosphorus.target}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-lime-50/80 border border-lime-300 text-center">
                    <span className="text-xs text-slate-600 font-bold block">Potassium Deficit</span>
                    <span className="text-xl font-black text-lime-800">{result.soilHealthStatus.potassium.deficit} kg/ha</span>
                    <span className="text-[10px] text-slate-500 font-semibold block">Target: {result.soilHealthStatus.potassium.target}</span>
                  </div>
                </div>
              </div>

              {/* Required Commercial Fertilizers */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Commercial Fertilizer Requirement for {result.landAreaAcres} Acres:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* DAP */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-400 space-y-1">
                    <span className="text-[10px] uppercase font-black text-emerald-800">Basal Application</span>
                    <div className="text-sm font-bold text-slate-900">DAP (18-46-0)</div>
                    <div className="text-2xl font-black text-emerald-800">{result.chemicalRecommendations.dap.totalBags50kg} Bags</div>
                    <p className="text-[10px] text-slate-600 leading-tight font-medium">{result.chemicalRecommendations.dap.applicationTime}</p>
                  </div>

                  {/* Urea */}
                  <div className="p-3.5 rounded-2xl bg-green-50 border border-green-400 space-y-1">
                    <span className="text-[10px] uppercase font-black text-green-800">Top Dressing</span>
                    <div className="text-sm font-bold text-slate-900">Neem Urea (46% N)</div>
                    <div className="text-2xl font-black text-green-800">{result.chemicalRecommendations.urea.totalBags50kg} Bags</div>
                    <p className="text-[10px] text-slate-600 leading-tight font-medium">{result.chemicalRecommendations.urea.applicationTime}</p>
                  </div>

                  {/* MOP */}
                  <div className="p-3.5 rounded-2xl bg-lime-50 border border-lime-400 space-y-1">
                    <span className="text-[10px] uppercase font-black text-lime-800">Fruit/Grain Quality</span>
                    <div className="text-sm font-bold text-slate-900">MOP (Potash 60%)</div>
                    <div className="text-2xl font-black text-lime-800">{result.chemicalRecommendations.mop.totalBags50kg} Bags</div>
                    <p className="text-[10px] text-slate-600 leading-tight font-medium">{result.chemicalRecommendations.mop.applicationTime}</p>
                  </div>
                </div>
              </div>

              {/* Organic Integration */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-black text-emerald-800 uppercase tracking-wider block">Bio-Organic Integration:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 font-medium">
                  <div>• <strong>Vermicompost:</strong> {result.organicAlternatives.vermicompost}</div>
                  <div>• <strong>Neem Cake:</strong> {result.organicAlternatives.neemCake}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
