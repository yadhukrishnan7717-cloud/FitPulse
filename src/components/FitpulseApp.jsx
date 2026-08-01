import React, { useState, useEffect } from 'react';
import { 
  Home, 
  TrendingUp, 
  Package, 
  User, 
  Droplets, 
  Flame, 
  CloudSun, 
  Footprints, 
  Coffee, 
  Moon, 
  Plus, 
  Clock, 
  Zap,
  BarChart3,
  ClipboardList,
  Compass
} from 'lucide-react';
import { switchAudio } from '../utils/audio';

export const DRINK_PRESETS = [
  { id: 'espresso', name: 'Espresso Shot', caffeineMg: 63, icon: '☕' },
  { id: 'coldbrew', name: 'Cold Brew Coffee', caffeineMg: 145, icon: '🧊' },
  { id: 'matcha', name: 'Matcha Green Tea', caffeineMg: 45, icon: '🍵' },
  { id: 'energy', name: 'Energy Drink', caffeineMg: 160, icon: '⚡' }
];

export const FitpulseApp = ({ fontClass, isDarkMode, accentColor = '#3D6B3D' }) => {
  const [activeTab, setActiveTab] = useState('today');
  const [hydration, setHydration] = useState(65);
  const [sugarCut, setSugarCut] = useState(12);
  const [activeBurn, setActiveBurn] = useState(410);
  const [distanceKm, setDistanceKm] = useState(6.3);

  // Professional Caffeine Usage State
  const [caffeineMg, setCaffeineMg] = useState(160); // Default 160mg
  const [caffeineLimitMg] = useState(400); // 400mg FDA recommended max limit
  const [caffeineLogHistory, setCaffeineLogHistory] = useState([
    { name: 'Morning Cold Brew', mg: 145, time: '08:30 AM' }
  ]);

  const primaryColor = accentColor || '#006654';

  const handleAddCaffeine = (preset) => {
    switchAudio.playClickSound();
    setCaffeineMg(prev => Math.min(prev + preset.caffeineMg, 600));
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCaffeineLogHistory(prev => [
      { name: preset.name, mg: preset.caffeineMg, time: timeStr },
      ...prev
    ]);
  };

  // Calculate estimated half-life remaining active caffeine (5.7h half-life)
  const remainingActiveCaffeine = Math.round(caffeineMg * 0.5);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl flex flex-col my-4">
      {/* Fitpulse Header */}
      <div className="w-full p-4 border-b border-white/10 flex flex-col items-center gap-3">
        <div className="flex items-center justify-between w-full px-2">
          <div className="w-6 h-6" />
          <h2 className="text-2xl font-black tracking-tight font-sans text-emerald-800 dark:text-emerald-400">
            fitpulse
          </h2>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-neutral-400" />
            <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-mono text-xs flex items-center justify-center font-bold">
              Y
            </div>
          </div>
        </div>

        {/* Top Pill Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 px-2 no-scrollbar">
          {[
            { id: 'today', label: 'Today', icon: Home },
            { id: 'caffeine', label: 'Caffeine Tracker', icon: Coffee },
            { id: 'trends', label: 'Trends', icon: TrendingUp },
            { id: 'sugar-cut', label: 'Sugar Cut', icon: Package },
            { id: 'profile', label: 'Profile', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  switchAudio.playClickSound();
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isSelected 
                    ? 'bg-emerald-800 text-white shadow-md' 
                    : 'bg-white/10 dark:bg-white/5 text-neutral-400 hover:text-neutral-100 border border-white/10'
                }`}
                style={{ backgroundColor: isSelected ? primaryColor : undefined }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Fitpulse Content */}
      <div className="p-6 flex flex-col items-center space-y-6">
        {/* Main Card (Distance Progress Ring + 4 Stat Badges) */}
        <div className="w-full max-w-md p-6 rounded-3xl bg-white/80 dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xl flex flex-col items-center">
          {/* Circular Progress Ring */}
          <div className="relative w-52 h-52 flex items-center justify-center my-2">
            <svg width="200" height="200" viewBox="0 0 200 200" className="rotate-[-90deg]">
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="16"
                strokeDasharray="490"
                strokeDashoffset="122"
                strokeLinecap="round"
                className="dark:stroke-neutral-800"
              />
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke={primaryColor}
                strokeWidth="16"
                strokeDasharray="490"
                strokeDashoffset={490 - (490 * (distanceKm / 10))}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Footprints className="w-6 h-6 mb-1" style={{ color: primaryColor }} />
              <span className="text-3xl font-extrabold font-sans tracking-tight">
                {distanceKm}
              </span>
              <span className="text-xs font-medium text-neutral-400">
                Kilometers Covered
              </span>
            </div>
          </div>

          {/* 4 Stat Badges: Hydration, Caffeine, Sugar Cut, Active Burn */}
          <div className="grid grid-cols-4 gap-2 w-full pt-4 mt-2 border-t border-black/5 dark:border-white/10 justify-items-center">
            {/* Hydration */}
            <div 
              onClick={() => setHydration(prev => (prev + 10) % 100)}
              className="flex flex-col items-center space-y-1 cursor-pointer group"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                style={{ backgroundColor: `${primaryColor}20`, border: `2px solid ${primaryColor}` }}
              >
                <Droplets className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <span className="text-xs font-bold">{hydration}%</span>
              <span className="text-[9px] text-neutral-400 font-mono">Hydration</span>
            </div>

            {/* Caffeine Usage Badge */}
            <div 
              onClick={() => setActiveTab('caffeine')}
              className="flex flex-col items-center space-y-1 cursor-pointer group"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm bg-amber-500/20 border-2 border-amber-500"
              >
                <Coffee className="w-5 h-5 text-amber-500" />
              </div>
              <span className="text-xs font-bold text-amber-500">{caffeineMg}mg</span>
              <span className="text-[9px] text-neutral-400 font-mono">Caffeine</span>
            </div>

            {/* Sugar Cut */}
            <div 
              onClick={() => setSugarCut(prev => prev + 2)}
              className="flex flex-col items-center space-y-1 cursor-pointer group"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                style={{ backgroundColor: `${primaryColor}20`, border: `2px solid ${primaryColor}` }}
              >
                <Package className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <span className="text-xs font-bold">{sugarCut}g</span>
              <span className="text-[9px] text-neutral-400 font-mono">Sugar Cut</span>
            </div>

            {/* Active Burn */}
            <div 
              onClick={() => setActiveBurn(prev => prev + 25)}
              className="flex flex-col items-center space-y-1 cursor-pointer group"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                style={{ backgroundColor: `${primaryColor}20`, border: `2px solid ${primaryColor}` }}
              >
                <Flame className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <span className="text-xs font-bold">{activeBurn}</span>
              <span className="text-[9px] text-neutral-400 font-mono">Active Burn</span>
            </div>
          </div>
        </div>

        {/* Professional Caffeine Usage & Metabolism Section */}
        <div className="w-full max-w-md p-5 rounded-3xl bg-white/80 dark:bg-neutral-900/90 border border-black/5 dark:border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">PROFESSIONAL CAFFEINE TRACKER</h3>
                <p className="text-[10px] text-neutral-400 font-mono">FDA Daily Limit: {caffeineLimitMg} mg</p>
              </div>
            </div>
            <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
              {caffeineMg} / {caffeineLimitMg} mg
            </span>
          </div>

          {/* Caffeine Progress Gauge Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-3 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
                style={{ width: `${Math.min((caffeineMg / caffeineLimitMg) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-mono text-neutral-400">
              <span>0 mg (Clean)</span>
              <span>200 mg (Focus Window)</span>
              <span>400 mg (Max Limit)</span>
            </div>
          </div>

          {/* Half-Life & Sleep Readiness Gauge */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block">Est. Active Level</span>
                <span className="text-sm font-bold font-mono text-amber-300">~{remainingActiveCaffeine} mg</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-2.5">
              <Moon className="w-5 h-5 text-indigo-400" />
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block">Cutoff Time</span>
                <span className="text-sm font-bold font-mono text-indigo-300">02:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Log Drink Buttons */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">LOG CAFFEINE DRINK</span>
            <div className="grid grid-cols-2 gap-2">
              {DRINK_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handleAddCaffeine(preset)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 text-xs font-mono flex items-center justify-between transition-all group"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{preset.icon}</span>
                    <span className="font-medium group-hover:text-amber-400">{preset.name}</span>
                  </span>
                  <span className="text-amber-500 font-bold">+{preset.caffeineMg}mg</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Log History */}
          {caffeineLogHistory.length > 0 && (
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <span className="text-[9px] font-mono text-neutral-400 uppercase">TODAY'S CAFFEINE LOG</span>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {caffeineLogHistory.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-mono p-1.5 rounded-lg bg-black/30 text-neutral-300">
                    <span>☕ {item.name}</span>
                    <span className="text-amber-400 font-bold">{item.mg} mg ({item.time})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Weather Hydration Banner */}
        <div className="w-full max-w-md p-3.5 rounded-2xl bg-white/70 dark:bg-neutral-900/80 border border-black/5 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CloudSun className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-bold text-neutral-800 dark:text-neutral-100">
              Weather Hydration
            </span>
          </div>
          <span 
            className="px-3 py-1 rounded-full text-xs font-bold font-mono"
            style={{ backgroundColor: `${primaryColor}25`, color: primaryColor }}
          >
            26.9°C | 64% Humidity
          </span>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="w-full p-3 border-t border-black/5 dark:border-white/10 bg-white/90 dark:bg-neutral-950/90 flex items-center justify-around">
        {[
          { id: 'today', label: 'Today', icon: Compass },
          { id: 'caffeine', label: 'Caffeine', icon: Coffee },
          { id: 'trends', label: 'Trends', icon: BarChart3 },
          { id: 'coach', label: 'Coach', icon: ClipboardList },
          { id: 'you', label: 'You', icon: User }
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                switchAudio.playClickSound();
              }}
              className="flex flex-col items-center gap-1 group"
            >
              <div 
                className={`p-1.5 rounded-full transition-all ${
                  isSelected ? 'bg-emerald-100 dark:bg-emerald-950' : ''
                }`}
              >
                <Icon className="w-5 h-5" style={{ color: isSelected ? primaryColor : '#94a3b8' }} />
              </div>
              <span 
                className="text-[10px] font-semibold"
                style={{ color: isSelected ? primaryColor : '#94a3b8' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
