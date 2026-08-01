import React from 'react';
import { FitpulseApp } from './components/FitpulseApp';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-3 sm:p-6 transition-colors duration-300">
      {/* App Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex items-center justify-center">
        <FitpulseApp />
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto py-3 text-center text-xs font-mono text-slate-400 flex flex-col sm:flex-row justify-between items-center border-t border-slate-800 gap-2">
        <span>FITPULSE (C) 2026</span>
        <span>DASHBOARD • WORKOUT • NUTRITION • CHALLENGES</span>
      </footer>
    </div>
  );
}
