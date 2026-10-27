import React, { useState, useEffect } from 'react';
import { Landmark, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export const GovtSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await api.getSchemes(filter);
        if (res.success) {
          setSchemes(res.schemes);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSchemes();
  }, [filter]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-wider">
          <Landmark className="w-4 h-4" />
          <span>Government Agrarian Initiatives</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Government Schemes & Subsidies</h2>
        <p className="text-sm text-slate-600 font-medium">Official subsidies, solar irrigation grants, and direct income assistance for farmers.</p>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="rounded-3xl glass-card-3d p-6 border border-emerald-500/25 shadow-md space-y-4 hover:border-emerald-500/50 transition-all flex flex-col justify-between bg-white/95"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-400/30">
                  {scheme.category}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">{scheme.name}</h3>
              <p className="text-xs text-emerald-700 font-bold">{scheme.benefit}</p>
              <div className="text-xs text-slate-700 font-medium">
                <strong>Eligibility:</strong> {scheme.eligibility}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="text-xs text-slate-600 font-medium">
                <span className="font-bold text-slate-800 block mb-1">Required Documents:</span>
                <div className="flex flex-wrap gap-1.5">
                  {scheme.docsRequired.map((doc, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={scheme.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20"
              >
                <span>Visit Official National Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
