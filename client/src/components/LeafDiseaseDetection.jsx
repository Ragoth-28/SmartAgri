import React, { useState } from 'react';
import { Bug, UploadCloud, CheckCircle2, AlertOctagon, Sparkles, Volume2, ShieldAlert, ScanLine } from 'lucide-react';
import { api } from '../services/api';

export const LeafDiseaseDetection = ({ onSpeechReadout }) => {
  const [selectedSample, setSelectedSample] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  const sampleLeaves = [
    { id: 'tomato-early-blight', crop: 'Tomato', label: 'Tomato Early Blight', tag: 'High Fungus' },
    { id: 'potato-late-blight', crop: 'Potato', label: 'Potato Late Blight', tag: 'Critical Rot' },
    { id: 'rice-blast', crop: 'Rice (Paddy)', label: 'Rice Blast', tag: 'Spindle Blight' },
    { id: 'cotton-leaf-curl', crop: 'Cotton', label: 'Cotton Leaf Curl Virus', tag: 'Viral Enation' },
    { id: 'maize-corn-rust', crop: 'Maize (Corn)', label: 'Corn Common Rust', tag: 'Pustule Spores' },
    { id: 'healthy-leaf', crop: 'Healthy', label: 'Healthy Plant Leaf', tag: 'No Pathogen' },
  ];

  const handleRunDiagnosis = async (cropName, fileName) => {
    setLoading(true);
    try {
      const res = await api.detectDisease({ cropName, fileName, imageUrl: previewUrl });
      if (res.success) {
        setDiagnosis(res.diagnosis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (sample) => {
    setSelectedSample(sample.id);
    handleRunDiagnosis(sample.crop, sample.label);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedSample(null);
      handleRunDiagnosis(null, file.name);
    }
  };

  const handleAudioReadout = () => {
    if (!diagnosis || !onSpeechReadout) return;
    const text = `Diagnosis: ${diagnosis.diseaseName}. Pathogen: ${diagnosis.pathogenType}. Recommended organic remedy: ${diagnosis.organicRemedies[0]}`;
    onSpeechReadout(text);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-rose-700 text-xs font-black uppercase tracking-wider">
            <Bug className="w-4 h-4" />
            <span>AI Computer Vision Diagnostics</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Leaf Disease Detection</h2>
          <p className="text-sm text-slate-600 font-medium">Upload or scan a crop leaf to identify pathogens, severity, and instant curative remedies.</p>
        </div>

        {diagnosis && (
          <button
            onClick={handleAudioReadout}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:opacity-90 text-white text-xs font-black transition-all shadow-md shadow-rose-600/20"
          >
            <Volume2 className="w-4 h-4" />
            <span>Read Treatment Audio</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload & Sample Selector */}
        <div className="lg:col-span-5 space-y-4">
          {/* File Upload Drop Area */}
          <div className="rounded-3xl glass-card-3d p-6 border border-emerald-500/20 shadow-md flex flex-col items-center justify-center text-center space-y-3 relative group bg-white/90">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shadow-sm group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <div className="text-base font-black text-slate-900">Upload Field Leaf Image</div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Click or drag & drop PNG, JPG, or WebP</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-50 text-[10px] text-emerald-800 border border-emerald-300 font-bold">
              High-Precision Foliage Neural Network
            </div>
          </div>

          {/* Quick Preset Samples */}
          <div className="rounded-3xl glass-card-3d p-5 border border-emerald-500/20 shadow-md space-y-3 bg-white/90">
            <div className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Or Test with Field Samples</span>
              <ScanLine className="w-4 h-4 text-emerald-700" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {sampleLeaves.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    selectedSample === sample.id
                      ? 'bg-emerald-100 border-emerald-500 text-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400'
                  }`}
                >
                  <span className="text-[10px] uppercase font-black text-emerald-700 tracking-wider">{sample.crop}</span>
                  <span className="text-xs font-black mt-1 line-clamp-1">{sample.label}</span>
                  <span className="text-[9px] text-slate-500 mt-1 font-semibold">{sample.tag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnosis Report Results */}
        <div className="lg:col-span-7">
          {diagnosis ? (
            <div className="rounded-3xl glass-card-3d p-6 border border-emerald-500/25 shadow-lg space-y-5 bg-white/95">
              {/* Header status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                    diagnosis.severity.toLowerCase().includes('high')
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : diagnosis.severity === 'None'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {diagnosis.severity} Severity
                  </span>
                  <span className="text-xs font-bold text-slate-700">Crop: {diagnosis.crop}</span>
                </div>

                <div className="text-xs font-black text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-300">
                  Confidence: {diagnosis.confidenceScore}%
                </div>
              </div>

              {/* Diagnosis Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {diagnosis.diseaseName}
                </h3>
                <p className="text-xs text-rose-700 font-bold mt-1">
                  Pathogen: <span className="text-slate-800 font-semibold">{diagnosis.pathogenType}</span>
                </p>
              </div>

              {/* Symptoms */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Identified Symptoms:</h4>
                <ul className="space-y-1 text-xs text-slate-700 font-medium">
                  {diagnosis.symptoms.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-black">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Remedies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Organic Remedies */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-400 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Organic & Bio-Control</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                    {diagnosis.organicRemedies.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-700 font-bold text-sm leading-none">✓</span>
                        <span className="leading-tight">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chemical Control */}
                <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-300 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black text-sky-900 uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4 text-sky-700" />
                    <span>Chemical Treatment</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                    {diagnosis.chemicalControl.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-sky-700 font-bold text-sm leading-none">⚡</span>
                        <span className="leading-tight">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Preventive Cultivation Advice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <span className="font-black text-slate-900 uppercase tracking-wider block">Long-term Field Prevention:</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {diagnosis.preventivePractices.join('. ')}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl glass-card-3d p-12 border border-slate-200 text-center flex flex-col items-center justify-center space-y-4 bg-white/90">
              <div className="w-16 h-16 rounded-3xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700">
                <Bug className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900">Awaiting Leaf Inspection</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1 font-medium">
                  Upload an image from your field or click one of the preset sample crop leaves on the left to view immediate diagnosis.
                </p>
              </div>
              <button
                onClick={() => handleSelectSample(sampleLeaves[0])}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-black transition-all shadow-md shadow-emerald-700/20"
              >
                Scan Tomato Early Blight Sample
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
