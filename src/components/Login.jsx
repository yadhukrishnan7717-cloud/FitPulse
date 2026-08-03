import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import './Login.css';

export function Login({ onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (view === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setError('Please verify your email before logging in. Check your inbox.');
          auth.signOut();
        } else {
          onLoginSuccess(userCredential.user.displayName || email.split('@')[0]);
        }
      } else if (view === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await sendEmailVerification(userCredential.user);
        setMessage('Account created! Please check your email to verify your account before logging in.');
        auth.signOut();
        setView('login');
      } else {
        await sendPasswordResetEmail(auth, email);
        setMessage('Password reset link sent to ' + email);
        setView('login');
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 style={{ fontSize: '38px', marginBottom: '16px', letterSpacing: '2px' }}>
            <span style={{ color: 'var(--primary)' }}>FIT</span>PULSE
          </h2>
          <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: 'white' }}>
            {view === 'login' && 'Welcome Back'}
            {view === 'signup' && 'Create Account'}
            {view === 'forgot' && 'Reset Password'}
          </h3>
          <p>
            {view === 'login' && 'Please enter your details to sign in.'}
            {view === 'signup' && 'Sign up to get started.'}
            {view === 'forgot' && 'Enter your email to reset your password.'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div style={{ color: '#ef4444', fontSize: '13px', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}
          {message && <div style={{ color: '#10b981', fontSize: '13px', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>{message}</div>}
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

          <button type="submit" className="login-button" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Processing...' : (
              <>
                {view === 'login' && 'Sign In'}
                {view === 'signup' && 'Sign Up'}
                {view === 'forgot' && 'Send Reset Link'}
              </>
            )}
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
