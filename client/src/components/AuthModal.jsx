import React, { useState } from 'react';
import { X, Lock, Mail, User, MapPin, Tractor, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: 'Ramesh Patel',
    email: 'farmer@smartagri.com',
    password: 'password123',
    phone: '+91 98765 43210',
    district: 'Nashik',
    sizeInAcres: 4.5,
    soilType: 'Black Soil',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (isLogin) {
        res = await api.login(formData.email, formData.password);
      } else {
        res = await api.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          location: { state: 'Maharashtra', district: formData.district, village: 'Panchavati' },
          farmDetails: {
            sizeInAcres: formData.sizeInAcres,
            soilType: formData.soilType,
            primaryCrop: 'Tomato',
            irrigationType: 'Drip',
          },
        });
      }

      if (res.success) {
        onAuthSuccess(res.user, res.token);
        onClose();
      } else {
        setError(res.message || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
      setError('Connection to server failed. Please verify the backend is online.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const res = await api.login('farmer@smartagri.com', 'password123');
      if (res.success) {
        onAuthSuccess(res.user, res.token);
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl glass-card-3d border border-emerald-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6 bg-white/95 text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-emerald-600 items-center justify-center text-white shadow-md shadow-emerald-700/25 mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            {isLogin ? 'Farmer Portal Login' : 'Register Farm Profile'}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {isLogin ? 'Sign in to access your customized advisory & telemetry' : 'Join the SmartAgri AI advisory ecosystem'}
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full py-2.5 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-400 text-emerald-800 text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Instant 1-Click Demo Farmer Login</span>
        </button>

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs text-center font-bold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Farmer Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm pl-10 font-semibold"
                  placeholder="e.g. Ramesh Patel"
                />
                <User className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm pl-10 font-semibold"
                placeholder="farmer@smartagri.com"
              />
              <Mail className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm pl-10 font-semibold"
                placeholder="••••••••"
              />
              <Lock className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3" />
            </div>
          </div>

          {!isLogin && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">District / Region</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Farm Area (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.sizeInAcres}
                  onChange={(e) => setFormData({ ...formData, sizeInAcres: Number(e.target.value) })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm tracking-wide shadow-md shadow-emerald-700/25 transition-all transform hover:scale-[1.02]"
          >
            {loading ? 'Authenticating...' : isLogin ? 'Sign In to Dashboard' : 'Register Farm Profile'}
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="text-center text-xs text-slate-500 font-medium">
          {isLogin ? (
            <span>
              New progressive farmer?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-emerald-700 font-bold hover:underline ml-1"
              >
                Create Account
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-emerald-700 font-bold hover:underline ml-1"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
