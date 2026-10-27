import React from 'react';
import {
  Sprout,
  CloudSun,
  Bug,
  Droplets,
  FlaskConical,
  TrendingUp,
  Bot,
  Landmark,
  ArrowRight,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { FarmVisualizer3D } from './FarmVisualizer3D';
import { TRANSLATIONS } from '../locales/translations';

export const FarmerDashboard = ({
  user,
  telemetry,
  onTogglePump,
  setActiveTab,
  onSpeechReadout,
  language = 'ta',
  theme = 'light',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleReadMorningBriefing = () => {
    if (!onSpeechReadout) return;
    let text = '';
    if (language === 'ta') {
      text = `வணக்கம் ${user?.name || 'விவசாயி நண்பரே'}! உங்கள் 3D பண்ணை டிஜிட்டல் இரட்டையர் மண் ஈரப்பதம் ${telemetry?.soilMoisture || 32}% என்று காட்டுகிறது. இன்றைய வானிலை பகுதி மேகமூட்டத்துடன் 28 டிகிரியாக உள்ளது. இன்று இலைகளில் பூச்சிக்கொல்லி தெளிக்க உகந்த நாள். தக்காளி மண்டி விலை குவிண்டாலுக்கு 2,850 ரூபாயாக உயர்ந்துள்ளது.`;
    } else if (language === 'te') {
      text = `నమస్కారం ${user?.name || 'రైతు సోదరా'}! మీ 3D ఫారమ్ డిజిటల్ ట్విన్ నేల తేమను ${telemetry?.soilMoisture || 32}% గా చూపిస్తోంది. నేటి వాతావరణం పాక్షికంగా మబ్బులతో 28 డిగ్రీలుగా ఉంది. ఈరోజు ఆకులపై పురుగుమందుల పిచికారీకి అనుకూలమైన రోజు. టమాటా మండి ధర క్వింటాలుకు 2,850 రూపాయలుగా ఉంది.`;
    } else if (language === 'hi') {
      text = `नमस्ते ${user?.name || 'किसान भाई'}! आपके 3D फार्म डिजिटल ट्विन में मिट्टी की नमी ${telemetry?.soilMoisture || 32}% है। आज नासिक में मौसम अनुकूल है और छिड़काव के लिए सही समय है। टमाटर के मंडी भाव ₹2,850 प्रति क्विंटल चल रहे हैं।`;
    } else {
      text = `Good day, ${user?.name || 'Farmer'}! Your 3D Farm Digital Twin reports soil moisture at ${telemetry?.soilMoisture || 32}%. The weather in Nashik is partly cloudy at 28 degrees. Foliar spraying is safe today. Tomato mandi rates are surging at 2,850 rupees per quintal.`;
    }
    onSpeechReadout(text);
  };

  return (
    <div className="space-y-6">
      {/* 3D Hero Banner: Half-White/Green vs Cyber Neon */}
      <div
        className={`rounded-3xl glass-card-3d p-6 sm:p-7 backdrop-blur-2xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden transition-all duration-300 ${
          theme === 'light'
            ? 'border border-emerald-500/25 bg-gradient-to-r from-white/95 via-emerald-50/80 to-white/95'
            : 'border border-cyan-500/35 bg-gradient-to-r from-slate-900/95 via-cyan-950/40 to-slate-900/95 shadow-cyan-950/50'
        }`}
      >
        <div className="space-y-2 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${
                theme === 'light'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-400/30'
                  : 'bg-cyan-950 text-cyan-300 border-cyan-400/40 shadow-sm shadow-cyan-400/20'
              }`}
            >
              {t.dashboardTitle}
            </span>
            <span className={`text-xs font-semibold ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
              {new Date().toLocaleDateString(language === 'ta' ? 'ta-IN' : language === 'te' ? 'te-IN' : 'en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className={`text-2xl sm:text-4xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            {t.welcomeBack},{' '}
            <span className={theme === 'light' ? 'text-emerald-700' : 'text-cyan-300'}>
              {user ? user.name : (language === 'ta' ? 'ரமேஷ் படேல்' : language === 'te' ? 'రమేష్ పటేల్' : 'Ramesh Patel')}
            </span>! 🌾
          </h1>
          <p className={`text-xs sm:text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            {language === 'ta' ? 'நிலம்' : language === 'te' ? 'పొలం రకం' : 'Plot'}:{' '}
            <span className={`font-bold ${theme === 'light' ? 'text-emerald-800' : 'text-emerald-400'}`}>
              {user?.farmDetails?.sizeInAcres || 4.5} {language === 'ta' ? 'ஏக்கர்' : language === 'te' ? 'ఎకరాలు' : 'Acres'}
            </span>{' '}
            • {language === 'ta' ? 'வட்டம்' : language === 'te' ? 'ప్రాంతం' : 'Region'}:{' '}
            <span className={`font-bold ${theme === 'light' ? 'text-amber-800' : 'text-amber-400'}`}>
              {user?.location?.district || 'Nashik'}
            </span>{' '}
            • {language === 'ta' ? 'முக்கிய பயிர்' : language === 'te' ? 'ముఖ్యమైన పంట' : 'Crop'}:{' '}
            <span className={`font-bold ${theme === 'light' ? 'text-emerald-800' : 'text-cyan-300'}`}>
              {user?.farmDetails?.primaryCrop || 'Tomato'}
            </span>
          </p>
        </div>

        {/* Audio Briefing Button */}
        <div className="flex items-center gap-3 z-10">
          <button
            onClick={handleReadMorningBriefing}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-black text-xs tracking-wide shadow-md transition-all transform hover:scale-105 ${
              theme === 'light'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-emerald-700/20'
                : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 shadow-cyan-500/30'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{t.playAudioBriefing}</span>
          </button>
        </div>

        {/* Ambient Glow Highlights */}
        {theme === 'light' ? (
          <>
            <div className="absolute top-0 right-10 w-48 h-48 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-20 w-48 h-48 bg-green-200/20 rounded-full blur-3xl pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          </>
        )}
      </div>

      {/* Photorealistic 3D Farm Digital Twin */}
      <FarmVisualizer3D
        telemetry={telemetry}
        onTogglePump={onTogglePump}
        onNavigateTab={setActiveTab}
        language={language}
      />

      {/* 8 Natural Organic Half-White & Green 3D Feature Portals */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{language === 'ta' ? '3D வேளாண் சேவைகள் தளம்' : language === 'te' ? '3D వ్యవసాయ సేవల పోర్టల్' : '3D Agriculture Operations Gateway'}</span>
          </h2>
          <span className="text-xs text-slate-500 font-semibold">{t.allModules}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {/* 1. 🌱 AI Crop Recommendation */}
          <div
            onClick={() => setActiveTab('crops')}
            className="rounded-3xl glass-card-3d p-5 border border-emerald-500/20 cursor-pointer group flex flex-col justify-between hover:bg-emerald-50/60 shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                  {language === 'ta' ? 'மண் & பயிர் வகை' : language === 'te' ? 'నేల & పంట రకం' : 'Soil & Genetics'}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {t.cards.cropTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {t.cards.cropDesc}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-500/20 text-xs">
                <span className="text-[10px] text-slate-500 block font-semibold">{language === 'ta' ? 'பருவப் பயிர்:' : 'Top Match:'}</span>
                <span className="font-extrabold text-emerald-800">Cotton (99%) & Tomato (94%)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 mt-4 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ta' ? 'பரிந்துரையைப் பார்' : 'Analyze Soil Profile'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 2. 🌦️ Weather-based Advisory */}
          <div
            onClick={() => setActiveTab('weather')}
            className="rounded-3xl glass-card-3d p-5 border border-amber-500/25 cursor-pointer group flex flex-col justify-between hover:bg-amber-50/50 shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                <CloudSun className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                  {language === 'ta' ? 'வானிலை & சுற்றுச்சூழல்' : 'Agro-Meteorology'}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors">
                  {t.cards.weatherTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {t.cards.weatherDesc}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-500/20 text-xs">
                <span className="text-[10px] text-slate-500 block font-semibold">{language === 'ta' ? 'தெளிக்கும் நேரம்:' : 'Spraying Window:'}</span>
                <span className="font-extrabold text-amber-900">{language === 'ta' ? 'இன்று உகந்தது' : 'Favorable (Wind 11 km/h)'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 mt-4 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ta' ? '7 நாள் முன்னறிவிப்பு' : 'View 7-Day Outlook'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 3. 🦠 Leaf Disease Detection */}
          <div
            onClick={() => setActiveTab('disease')}
            className="rounded-3xl glass-card-3d p-5 border border-rose-500/20 cursor-pointer group flex flex-col justify-between hover:bg-rose-50/50 shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                <Bug className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-700 tracking-wider">
                  {language === 'ta' ? 'நோய் கண்டறிதல்' : 'Pathogen AI'}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-rose-800 transition-colors">
                  {t.cards.diseaseTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {t.cards.diseaseDesc}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-500/20 text-xs">
                <span className="text-[10px] text-slate-500 block font-semibold">{language === 'ta' ? 'ஸ்கேனர் நிலை:' : 'Scanner:'}</span>
                <span className="font-extrabold text-rose-800">{language === 'ta' ? 'தயாராக உள்ளது' : 'Ready for Leaf Upload'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 mt-4 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ta' ? 'இலையை ஸ்கேன் செய்' : 'Scan Crop Foliage'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 4. 💧 Smart Irrigation Recommendation */}
          <div
            onClick={() => setActiveTab('irrigation')}
            className="rounded-3xl glass-card-3d p-5 border border-sky-500/20 cursor-pointer group flex flex-col justify-between hover:bg-sky-50/50 shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-700 tracking-wider">
                  {language === 'ta' ? 'நீர் பாசனம்' : 'Hydro-Automation'}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-800 transition-colors">
                  {t.cards.irrigationTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {t.cards.irrigationDesc}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-sky-50/80 border border-sky-500/20 text-xs">
                <span className="text-[10px] text-slate-500 block font-semibold">{language === 'ta' ? 'மண் ஈரப்பதம்:' : 'Hydration:'}</span>
                <span className="font-extrabold text-sky-800">{telemetry?.soilMoisture || 32}% • 45m Cycle</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-sky-700 mt-4 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ta' ? 'பம்ப் இயக்கம்' : 'Control Water Relay'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 5. 🧪 Fertilizer Recommendation */}
          <div
            onClick={() => setActiveTab('fertilizer')}
            className="rounded-3xl glass-card-3d p-5 border border-emerald-500/25 cursor-pointer group flex flex-col justify-between hover:bg-emerald-50/50 shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  {language === 'ta' ? 'உர கணக்கீடு' : 'Nutrient NPK'}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {t.cards.fertilizerTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {t.cards.fertilizerDesc}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-500/20 text-xs">
                <span className="text-[10px] text-slate-500 block font-semibold">{language === 'ta' ? 'உர விகிதம்:' : 'Formulation:'}</span>
                <span className="font-extrabold text-emerald-900">DAP + Urea Basal Splits</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 mt-4 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ta' ? 'அளவைக் கணக்கிடு' : 'Calculate Dosages'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 6. 📈 Market Price + Profit Prediction */}
          <div
            onClick={() => setActiveTab('market')}
            className="rounded-3xl glass-card-3d p-5 border border-amber-500/25 cursor-pointer group flex flex-col justify-between hover:bg-amber-50/50 shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                  {language === 'ta' ? 'மண்டி விலை கணிப்பு' : 'APMC Econometrics'}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors">
                  {t.cards.marketTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {t.cards.marketDesc}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-500/20 text-xs">
                <span className="text-[10px] text-slate-500 block font-semibold">{language === 'ta' ? 'தக்காளி மண்டி விலை:' : 'Tomato Mandi:'}</span>
                <span className="font-extrabold text-amber-900">₹2,850/Qtl (+4.8% Rally)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 mt-4 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ta' ? 'லாபத்தை கணக்கிடு' : 'Forecast Harvest ROI'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 7. 🤖 AI Farmer Chatbot */}
          <div
            onClick={() => setActiveTab('chatbot')}
            className="rounded-3xl glass-card-3d p-5 border border-teal-500/25 cursor-pointer group flex flex-col justify-between hover:bg-teal-50/50 shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider">
                  {language === 'ta' ? 'தமிழ் குரல் சாட்போட்' : 'Voice Agronomist'}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-teal-800 transition-colors">
                  {t.cards.chatbotTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {t.cards.chatbotDesc}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50/80 border border-teal-500/20 text-xs">
                <span className="text-[10px] text-slate-500 block font-semibold">{language === 'ta' ? 'குரல் சேவை:' : 'Languages:'}</span>
                <span className="font-extrabold text-teal-900">தமிழ் (Tamil), English, हिंदी</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-teal-800 mt-4 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ta' ? 'குரலில் பேசுங்கள்' : 'Start Voice Assistant'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 8. 🏛️ Government Schemes */}
          <div
            onClick={() => setActiveTab('schemes')}
            className="rounded-3xl glass-card-3d p-5 border border-emerald-500/25 cursor-pointer group flex flex-col justify-between hover:bg-emerald-50/50 shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  {language === 'ta' ? 'அரசு மானியங்கள்' : 'National Grants'}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {t.cards.schemesTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {t.cards.schemesDesc}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-500/20 text-xs">
                <span className="text-[10px] text-slate-500 block font-semibold">{language === 'ta' ? 'முக்கிய திட்டம்:' : 'Featured:'}</span>
                <span className="font-extrabold text-emerald-900">PM-KUSUM 60% Solar Pump</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 mt-4 group-hover:translate-x-1 transition-transform">
              <span>{language === 'ta' ? 'விவரங்களை அறி' : 'Check Eligibility'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
