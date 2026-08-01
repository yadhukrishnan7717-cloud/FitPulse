import React from 'react';
import { FitpulseApp } from './components/FitpulseApp';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 flex flex-col justify-between p-4 sm:p-6 transition-colors duration-300">
      {/* Fitpulse Application Header */}
      <header className="w-full max-w-2xl mx-auto py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            FITPULSE HEALTH & CAFFEINE SYSTEM
          </span>
        </div>
        <span className="text-xs font-mono text-neutral-400">JAVA BACKEND SYNCED</span>
      </header>

      {/* Main Fitpulse Tracker Application View */}
      <main className="flex-1 w-full max-w-2xl mx-auto flex items-center justify-center">
        <FitpulseApp accentColor="#006654" />
      </main>

      {/* Minimal Footer */}
      <footer className="w-full max-w-2xl mx-auto py-3 text-center text-xs font-mono text-neutral-400 flex justify-between items-center border-t border-black/5 dark:border-white/10">
        <span>FITPULSE (C) 2026</span>
        <span>HYDRATION • CAFFEINE BASIS • SUGAR CUT • BURN</span>
      </footer>
    </div>
  );
}
