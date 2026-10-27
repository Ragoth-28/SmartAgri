import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Sparkles, Building2, Calculator, Calendar } from 'lucide-react';
import { api } from '../services/api';

export const MarketPriceProfit = () => {
  const [commodities, setCommodities] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [acres, setAcres] = useState(4.5);
  const [profitData, setProfitData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await api.getMarketPrices();
        if (res.success) {
          setCommodities(res.commodities);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPrices();
  }, []);

  const calculateProfit = async () => {
    setLoading(true);
    try {
      const res = await api.predictProfit({ crop: selectedCrop, acres });
      if (res.success) {
        setProfitData(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateProfit();
  }, [selectedCrop, acres]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-wider">
          <TrendingUp className="w-4 h-4" />
          <span>APMC Mandi Intelligence & Yield Economics</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Market Price + Profit Prediction</h2>
        <p className="text-sm text-slate-600 font-medium">Track real-time wholesale mandi rates, price trajectories, and predict harvest net profit margins.</p>
      </div>

      {/* Live Mandi Ticker Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {commodities.map((item) => (
          <div
            key={item.crop}
            onClick={() => setSelectedCrop(item.crop)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
              selectedCrop === item.crop
                ? 'bg-emerald-100 border-emerald-500 text-slate-900 shadow-md'
                : 'glass-card-3d bg-white/90 border-slate-200 hover:border-emerald-400 text-slate-800 shadow-sm'
            }`}
          >
            <div className="text-xs font-black text-slate-900">{item.crop}</div>
            <div className="text-base font-black text-emerald-800 mt-1">₹{item.currentPrice}</div>
            <div className="flex items-center justify-between text-[10px] mt-1 text-slate-500 font-bold">
              <span>MSP: ₹{item.msp}</span>
              <span className={item.dailyChange.startsWith('+') ? 'text-emerald-700 font-black' : 'text-rose-600 font-black'}>
                {item.dailyChange}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Profit Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 rounded-3xl glass-card-3d p-6 border border-emerald-500/25 shadow-md space-y-4 bg-white/90">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-3">
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>Farm Yield & Land Parameters</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Selected Produce</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-semibold"
              >
                {commodities.map((c) => (
                  <option key={c.crop} value={c.crop}>
                    {c.crop} (₹{c.currentPrice}/Quintal)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-emerald-800">Cultivated Area: {acres} Acres</span>
                <span className="text-slate-500 font-medium">1 - 25 Acres</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Profit Projection Card */}
        <div className="lg:col-span-7">
          {profitData && (
            <div className="rounded-3xl glass-card-3d p-6 border border-emerald-500/30 shadow-md space-y-5 bg-white/95">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Economic Projection for {profitData.landAreaAcres} Acres of {profitData.crop}
                </span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Total Production: {profitData.totalYieldQuintals} Quintals
                </span>
              </div>

              {/* Current vs Predicted Comparison Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Current Market Option */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-sm">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Sell Immediately Today</div>
                  <div className="text-xs text-slate-600 font-medium">Rate: ₹{profitData.currentMarket.pricePerQuintal}/Quintal</div>
                  <div className="text-2xl font-black text-slate-900">
                    ₹{profitData.currentMarket.netProfit.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-emerald-700 font-black">
                    Net Margin: {profitData.currentMarket.roiPercent}% ROI
                  </div>
                </div>

                {/* Forecast Option */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-400 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">Predicted 30-Day Rate</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-xs text-slate-600 font-medium">Rate: ₹{profitData.forecastMarket.predictedPricePerQuintal}/Quintal</div>
                  <div className="text-2xl font-black text-emerald-900">
                    ₹{profitData.forecastMarket.netProfit.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-green-700 font-black">
                    Net Margin: {profitData.forecastMarket.roiPercent}% ROI
                  </div>
                </div>
              </div>

              {/* Selling Recommendation Box */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs space-y-1.5">
                <span className="font-black text-amber-900 uppercase tracking-wider block">AI Commercial Advisory:</span>
                <p className="text-slate-800 leading-relaxed font-semibold">
                  {profitData.sellingRecommendation}
                </p>
                {profitData.forecastMarket.projectedExtraGain > 0 && (
                  <p className="text-emerald-800 font-black">
                    Potential holding bonus: +₹{profitData.forecastMarket.projectedExtraGain.toLocaleString('en-IN')}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
