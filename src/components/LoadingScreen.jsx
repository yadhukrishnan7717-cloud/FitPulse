import React, { useState, useEffect } from 'react';
import { FitpulseLogo } from './FitpulseLogo';

export const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing FitPulse System...');

  useEffect(() => {
    const textIntervals = [
      { at: 20, text: 'Connecting Java Health Services...' },
      { at: 50, text: 'Loading Caffeine & Metabolism Data...' },
      { at: 80, text: 'Syncing Workout & Hydration Metrics...' },
      { at: 95, text: 'FitPulse Ready!' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        const currentTextObj = textIntervals.find(t => t.at <= next);
        if (currentTextObj) {
          setLoadingText(currentTextObj.text);
        }
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 300);
          return 100;
        }
        return next;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-between p-8 select-none animate-fade-in">
      <div className="w-full" />

      {/* Center Startup App Logo Icon Animation */}
      <div className="flex flex-col items-center justify-center space-y-8 relative">
        {/* Pulsing Outer Ambient Ring */}
        <div className="absolute w-44 h-44 rounded-full bg-blue-600/20 animate-ping pointer-events-none" />
        
        {/* FITPULSE Heart Icon Only (Matching User Request) */}
        <div className="relative z-10 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform">
          <FitpulseLogo height={64} animated={true} />
        </div>

        {/* Loading Progress Bar */}
        <div className="w-64 space-y-2 text-center z-10">
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 pt-1">
            <span>{loadingText}</span>
            <span className="font-bold text-blue-400">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs font-mono text-slate-500 tracking-widest">
        FITPULSE • SYSTEM STARTUP
      </div>
    </div>
  );
};
