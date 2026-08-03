import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FitpulseApp } from './components/FitpulseApp';
import { Login } from './components/Login';
import { Onboarding } from './components/Onboarding';

export default function App() {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const profileKey = `fitpulse_profile_${user.sub}`;
      const savedProfile = localStorage.getItem(profileKey);
      if (savedProfile) {
        setHasCompletedProfile(true);
        setUserProfile(JSON.parse(savedProfile));
      } else {
        setHasCompletedProfile(false);
      }
    }
  }, [isAuthenticated, user]);

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

  if (isLoading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', color: 'white', fontFamily: 'Inter, sans-serif' }}>Authenticating...</div>;
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => {}} />;
  }

  if (!hasCompletedProfile) {
    return (
      <Onboarding 
        user={user} 
        onComplete={(profileData) => {
          const profileKey = `fitpulse_profile_${user.sub}`;
          localStorage.setItem(profileKey, JSON.stringify(profileData));
          setUserProfile(profileData);
          setHasCompletedProfile(true);
        }} 
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col justify-between p-3 sm:p-6 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* App Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex items-center justify-center">
        <FitpulseApp 
          username={userProfile?.name || user?.name || user?.nickname || user?.email?.split('@')[0] || 'User'} 
          profile={userProfile}
          onLogout={() => logout({ logoutParams: { returnTo: window.location.origin } })} 
        />
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
