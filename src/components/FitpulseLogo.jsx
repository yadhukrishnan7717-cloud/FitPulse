import React from 'react';

export const FitpulseLogo = ({ className = '', height = 48, animated = true, showText = true }) => {
  return (
    <div className={`flex items-center justify-center gap-3 select-none ${className}`}>
      {/* Heart Icon with Pulse Wave & Gear */}
      <div className="relative flex items-center justify-center">
        <svg 
          width={height * 1.15} 
          height={height} 
          viewBox="0 0 120 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Heart Outer Outline */}
          <path 
            d="M50 88 C20 65 5 45 5 28 C5 14 16 4 30 4 C38 4 45 8 50 14 C55 8 62 4 70 4 C84 4 95 14 95 28 C95 38 88 50 75 62" 
            stroke="#1D4ED8" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* ECG Animated Heartbeat Wave Line */}
          <path 
            d="M-5 46 L20 46 L28 46 L34 25 L42 68 L50 32 L56 54 L62 46 L105 46" 
            stroke="#1D4ED8" 
            strokeWidth="5.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={animated ? 'pulse-wave-animated' : ''}
          />

          {/* Bottom Right Gear / Cog Wheel Icon (Matching User Image) */}
          <g transform="translate(62, 54)">
            {/* Outer Cog Teeth */}
            <circle cx="20" cy="20" r="14" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="4" />
            <path d="M20 2 V6 M20 34 V38 M2 20 H6 M34 20 H38 M7 7 L10 10 M30 30 L33 33 M7 33 L10 30 M30 10 L33 7" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round" />
            {/* Center Hole */}
            <circle cx="20" cy="20" r="5" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="3" />
          </g>
        </svg>
      </div>

      {/* Outlined FITPULSE Brand Text */}
      {showText && (
        <div className="flex flex-col justify-center">
        <svg 
          height={height * 0.75} 
          viewBox="0 0 320 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <text 
            x="0" 
            y="48" 
            fontFamily="system-ui, -apple-system, sans-serif" 
            fontWeight="900" 
            fontSize="52" 
            letterSpacing="3" 
            fill="#FFFFFF" 
            stroke="#1D4ED8" 
            strokeWidth="3.5"
            strokeLinejoin="round"
          >
            FITPULSE
          </text>
        </svg>
      </div>
      )}

      {/* SVG Animation Keyframes */}
      <style>{`
        .pulse-wave-animated {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: pulseWaveRun 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes pulseWaveRun {
          0% {
            stroke-dashoffset: 200;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -200;
          }
        }
      `}</style>
    </div>
  );
};
