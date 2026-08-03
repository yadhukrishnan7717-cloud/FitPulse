import React, { useState, useEffect } from 'react';
import { FitpulseApp } from './components/FitpulseApp';
import { Login } from './components/Login';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('User');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fitpulse_is_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('fitpulse_is_dark_mode');
      if (saved !== null) {
        setIsDarkMode(JSON.parse(saved));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 500);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!isLoggedIn) {
    return <Login onLoginSuccess={(name) => { setUsername(name); setIsLoggedIn(true); }} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col justify-between p-3 sm:p-6 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* App Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex items-center justify-center">
        <FitpulseApp username={username} onLogout={() => setIsLoggedIn(false)} />
      </main>

      {/* Footer */}
      <footer className={`w-full max-w-4xl mx-auto py-3 text-center text-xs font-mono flex flex-col sm:flex-row justify-between items-center border-t gap-2 ${
        isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
      }`}>
        <span>FITPULSE (C) 2026</span>
        <span>DASHBOARD • WORKOUT • NUTRITION • CHALLENGES</span>
      </footer>
    </div>
  );
}
