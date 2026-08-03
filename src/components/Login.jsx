import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Login.css';

export function Login() {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <div className="login-container">
      <div className="login-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div className="login-header" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '38px', marginBottom: '16px', letterSpacing: '2px' }}>
            <span style={{ color: 'var(--primary)' }}>FIT</span>PULSE
          </h2>
          <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: 'white' }}>
            Welcome to FitPulse
          </h3>
          <p style={{ marginBottom: '32px' }}>
            Please log in or sign up to access your dashboard.
          </p>
        </div>

        <button 
          onClick={() => loginWithRedirect()} 
          className="login-button" 
          disabled={isLoading} 
          style={{ padding: '12px 24px', fontSize: '16px', width: '100%', maxWidth: '300px' }}
        >
          {isLoading ? 'Loading...' : 'Log In / Sign Up'}
        </button>

      </div>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}
