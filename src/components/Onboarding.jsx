import React, { useState } from 'react';
import './Login.css'; // Reusing login styles for consistency

export function Onboarding({ user, onComplete }) {
  const [name, setName] = useState(user?.name || user?.nickname || '');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !weight || !height) return;

    const profileData = { name, age, weight, height };
    onComplete(profileData);
  };

  return (
    <div className="login-container">
      <div className="login-card" style={{ maxWidth: '400px' }}>
        <div className="login-header">
          <h2 style={{ fontSize: '38px', marginBottom: '8px', letterSpacing: '2px' }}>
            <span style={{ color: 'var(--primary)' }}>FIT</span>PULSE
          </h2>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: 'white' }}>
            Complete Your Profile
          </h3>
          <p>We need a few details to personalize your experience and calculate your metrics.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                placeholder="Years"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="13"
                max="120"
                required
              />
            </div>
            
            <div className="input-group" style={{ flex: 1 }}>
              <label htmlFor="weight">Weight</label>
              <input
                type="number"
                id="weight"
                placeholder="kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="20"
                max="300"
                required
              />
            </div>

            <div className="input-group" style={{ flex: 1 }}>
              <label htmlFor="height">Height</label>
              <input
                type="number"
                id="height"
                placeholder="cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="50"
                max="250"
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button" style={{ marginTop: '24px' }}>
            Go to Dashboard
          </button>
        </form>
      </div>
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}
