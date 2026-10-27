import React, { useState, useRef } from 'react';
import {
  Layers,
  Thermometer,
  Droplets,
  Radio,
  Eye,
  Plane,
  Sparkles,
  Maximize2,
  Scan,
  Compass,
  CheckCircle2,
  Power,
} from 'lucide-react';

export const FarmVisualizer3D = ({ telemetry, onTogglePump, onNavigateTab, language = 'ta' }) => {
  const [activeView, setActiveView] = useState('drone'); // 'drone', 'thermal'
  const [scannerActive, setScannerActive] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const isPumpActive = telemetry?.pumpActive || false;
  const isTamil = language === 'ta';
  const isTelugu = language === 'te';

  // 3D Tilt on mouse move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const hotspots = [
    {
      id: 'iot-mast',
      x: '50%',
      y: '58%',
      title: isTamil ? 'IoT சூரியசக்தி வானிலை மையம்' : isTelugu ? 'IoT సోలార్ వాతావరణ కేంద్రం' : 'IoT Solar Weather Station',
      metric: `${telemetry?.soilMoisture || 32}% ${isTamil ? 'ஈரப்பதம்' : isTelugu ? 'తేమ' : 'Moisture'} • ${telemetry?.soilTemperature || 24}°C`,
      tab: 'weather',
    },
    {
      id: 'drone-scout',
      x: '72%',
      y: '22%',
      title: isTamil ? 'AI வான்வழி ட்ரோன் ஸ்கேனர்' : isTelugu ? 'AI డ్రోన్ స్కేనర్' : 'Autonomous AI Crop Drone',
      metric: isTamil ? '98.5% ஆரோக்கியம் • உயரம் 18m' : isTelugu ? '98.5% ఆరోగ్యం • ఎత్తు 18m' : '98.5% Health • Alt 18m',
      tab: 'disease',
    },
    {
      id: 'irrigation-line',
      x: '28%',
      y: '78%',
      title: isTamil ? 'நுண்ணிய சொட்டு நீர் பாசனம்' : isTelugu ? 'స్మార్ట్ బిందు సేద్యం (డ్రిప్)' : 'Smart Micro-Drip Sprinklers',
      metric: isPumpActive
        ? (isTamil ? 'பம்ப் இயங்குகிறது' : isTelugu ? 'పంప్ నడుస్తోంది' : 'Pump FLOWING')
        : (isTamil ? 'பம்ப் நிறுத்தம்' : isTelugu ? 'పంప్ ఆగింది' : 'Pump Standby'),
      tab: 'irrigation',
      isPumpToggle: true,
    },
    {
      id: 'crop-patch',
      x: '22%',
      y: '48%',
      title: isTamil ? 'தக்காளி & காய்கறி பாத்தி A' : isTelugu ? 'కూరగాయల పంట విభాగం A' : 'Vegetable Crop Sector A',
      metric: isTamil ? 'பூக்கும் பருவம் • NPK சமநிலை' : isTelugu ? 'పూత దశ • NPK సమతుల్యత' : 'Flowering Stage • Balanced NPK',
      tab: 'crops',
    },
  ];

  return (
    <div className="relative rounded-3xl glass-card-3d border border-emerald-500/25 p-5 sm:p-6 shadow-md backdrop-blur-2xl overflow-hidden bg-white/90">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/25">
            <Scan className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>{isTamil ? 'உண்மையான 3D பண்ணை டிஜிட்டல் பார்வை' : isTelugu ? 'నైజమైన 3D స్మార్ట్ ఫారమ్ డిజిటల్ ట్విన్' : 'Photorealistic 3D Smart Farm Digital Twin'}</span>
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-400/40">
                8K Realistic
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              {isTamil
                ? 'நேரடி வான்வழி கேமரா • IoT சென்சார்கள் • நுண்ணிய நீர் பாசனம்'
                : isTelugu
                ? 'ప్రత్యక్ష డ్రోన్ కెమెరా • IoT సెన్సార్లు • స్మార్ట్ నీటి పారుదల'
                : 'Real aerial camera view • Connected IoT telemetry • Interactive hotspots'}
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs shadow-inner">
            <button
              onClick={() => setActiveView('drone')}
              className={`px-3.5 py-1.5 rounded-xl font-black transition-all ${
                activeView === 'drone'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-800'
              }`}
            >
              {isTamil ? '☀️ பகல் நேர நேரடிப் பார்வை' : isTelugu ? '☀️ డేలైట్ డ్రోన్ వ్యూ' : '☀️ Cinematic Drone View'}
            </button>
            <button
              onClick={() => setActiveView('thermal')}
              className={`px-3.5 py-1.5 rounded-xl font-black transition-all ${
                activeView === 'thermal'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-amber-800'
              }`}
            >
              {isTamil ? '🛰️ வெப்ப & NDVI வரைபடம்' : isTelugu ? '🛰️ థర్మల్ NDVI హీట్‌మ్యాప్' : '🛰️ Thermal NDVI Heatmap'}
            </button>
          </div>

          <button
            onClick={() => setScannerActive(!scannerActive)}
            title="Toggle Holographic Scanner"
            className={`p-2 rounded-xl text-xs font-bold border transition-all ${
              scannerActive
                ? 'bg-emerald-100 text-emerald-800 border-emerald-400 shadow-sm'
                : 'bg-white text-slate-400 border-slate-200 hover:text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Photorealistic 3D Viewport with Mouse Tilt Effect */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative w-full h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-emerald-500/25 shadow-xl group cursor-crosshair bg-slate-900 select-none"
      >
        {/* Realistic Farm Image Base */}
        <img
          src={activeView === 'drone' ? '/realistic_smart_farm.jpg' : '/smart_farm_thermal.jpg'}
          alt="Realistic Smart Farm Digital Twin"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
        />

        {/* Subtle Atmospheric Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

        {/* Dynamic Holographic Laser Grid Scanner Overlay */}
        {scannerActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399]"
                 style={{
                   animation: 'scanline 4s linear infinite',
                 }}
            />
          </div>
        )}

        {/* Floating Top Telemetry HUD Badges (Clean White-Glass) */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2.5 z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-500/40 text-xs shadow-md text-slate-900">
            <Droplets className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-600 font-semibold">{isTamil ? 'மண் ஈரப்பதம்:' : 'Soil Moisture:'}</span>
            <span className="font-black text-emerald-800">{telemetry?.soilMoisture || 32.4}%</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-500/40 text-xs shadow-md text-slate-900">
            <Thermometer className="w-4 h-4 text-amber-600" />
            <span className="text-slate-600 font-semibold">{isTamil ? 'நில வெப்பநிலை:' : 'Ground Temp:'}</span>
            <span className="font-black text-amber-800">{telemetry?.soilTemperature || 24.2}°C</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-green-500/40 text-xs shadow-md text-slate-900">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-slate-600 font-semibold">{isTamil ? 'பயிர் நிலை:' : 'NDVI Health:'}</span>
            <span className="font-black text-green-800">0.86 (Optimal)</span>
          </div>
        </div>

        {/* Interactive Holographic Hotspots Over Real Photo */}
        {hotspots.map((spot) => (
          <div
            key={spot.id}
            style={{ left: spot.x, top: spot.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group/spot"
          >
            {/* Pulsing Beacon Ring */}
            <div className="relative cursor-pointer"
                 onClick={() => {
                   if (spot.isPumpToggle) {
                     onTogglePump?.(!isPumpActive);
                   } else if (onNavigateTab) {
                     onNavigateTab(spot.tab);
                   }
                 }}
            >
              <span className="animate-ping absolute -inset-1 rounded-full bg-emerald-400 opacity-75"></span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-emerald-600 text-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-600/40 group-hover/spot:scale-125 transition-transform duration-300">
                <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700 animate-spin-slow" />
              </div>
            </div>

            {/* Hover Tooltip Card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 hidden group-hover/spot:flex flex-col items-center pointer-events-none transition-all z-40 whitespace-nowrap">
              <div className="p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-500/40 text-slate-900 shadow-2xl text-xs space-y-1 text-center">
                <div className="font-black text-emerald-800 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{spot.title}</span>
                </div>
                <div className="text-[11px] text-slate-700 font-bold">{spot.metric}</div>
                <div className="text-[9px] text-emerald-600 font-semibold">
                  {spot.isPumpToggle ? (isTamil ? 'கிளிக் செய்து பம்ப் மாற்றவும்' : 'Click to Toggle Pump') : (isTamil ? 'கிளிக் செய்து விவரம் பார்க்க' : 'Click to View Module')}
                </div>
              </div>
              <div className="w-2.5 h-2.5 bg-white rotate-45 -mt-1 border-r border-b border-emerald-500/40"></div>
            </div>
          </div>
        ))}

        {/* Bottom Interactive HUD Status Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 z-30">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 text-xs text-slate-800 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-[11px] text-emerald-900">
              {isTamil ? 'நேரடி கேமரா இணைக்கப்பட்டுள்ளது (1080p 60fps)' : 'LIVE Drone Telemetry Connected (1080p 60fps)'}
            </span>
          </div>

          {/* Quick Pump Trigger Button */}
          <button
            onClick={() => onTogglePump?.(!isPumpActive)}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl font-black text-xs transition-all shadow-lg border ${
              isPumpActive
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-400 shadow-emerald-600/40 animate-pulse scale-105'
                : 'bg-white text-emerald-800 border-emerald-500/40 hover:bg-emerald-50'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>
              {isPumpActive
                ? (isTamil ? 'பாசனம் இயங்குகிறது (நிறுத்த கிளிக்)' : 'Irrigation Flowing (Tap to Stop)')
                : (isTamil ? 'பாசன மோட்டாரை இயக்கு' : 'Start Micro-Drip Irrigation')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
