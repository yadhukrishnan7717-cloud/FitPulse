import React, { useState } from 'react';
import './Login.css';

export function Login({ onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (view === 'login') {
      console.log('Login attempted:', email);
      onLoginSuccess();
    } else if (view === 'signup') {
      console.log('Signup attempted:', name, email);
      alert('Account created successfully for ' + name + '! You can now log in.');
      setView('login');
    } else {
      console.log('Password reset requested for:', email);
      alert('Password reset link sent to ' + email);
      setView('login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>
            {view === 'login' && 'Welcome Back'}
            {view === 'signup' && 'Create Account'}
            {view === 'forgot' && 'Reset Password'}
          </h2>
          <p>
            {view === 'login' && 'Please enter your details to sign in.'}
            {view === 'signup' && 'Sign up to get started.'}
            {view === 'forgot' && 'Enter your email to reset your password.'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {view === 'signup' && (
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {view !== 'forgot' && (
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {view === 'login' && (
            <div className="form-actions">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={() => setView('forgot')} 
                className="forgot-password"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" className="login-button">
            {view === 'login' && 'Sign In'}
            {view === 'signup' && 'Sign Up'}
            {view === 'forgot' && 'Send Reset Link'}
          </button>
        </form>

        <div className="login-footer">
          {view === 'login' ? (
            <p>Don't have an account? <button type="button" onClick={() => setView('signup')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontFamily: 'inherit', fontSize: 'inherit' }}>Sign up</button></p>
          ) : (
            <p>Already have an account? <button type="button" onClick={() => setView('login')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--primary)', fontWeight: 600, fontFamily: 'inherit', fontSize: 'inherit' }}>Sign in</button></p>
          )}
        </div>
      </div>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}
