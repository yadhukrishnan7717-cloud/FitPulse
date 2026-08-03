import React from 'react';

// 1. Cyclist Character SVG (Route & Cardio Paths)
export const CyclistCharacter = ({ className = "w-28 h-28" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bike Wheels */}
    <circle cx="50" cy="140" r="32" stroke="#1D4ED8" strokeWidth="6" />
    <circle cx="50" cy="140" r="8" fill="#1D4ED8" />
    <circle cx="150" cy="140" r="32" stroke="#1D4ED8" strokeWidth="6" />
    <circle cx="150" cy="140" r="8" fill="#1D4ED8" />

    {/* Frame Lines */}
    <path d="M50 140 L85 95 L130 95 L150 140 M85 95 L115 140 M50 140 L115 140 M130 95 L125 75 H145" stroke="#1D4ED8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M80 90 H95" stroke="#1D4ED8" strokeWidth="6" strokeLinecap="round" />

    {/* Rider Body */}
    <circle cx="100" cy="40" r="14" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="4" />
    <path d="M100 26 C90 26 86 34 86 40 H114 C114 34 110 26 100 26 Z" fill="#1D4ED8" /> {/* Helmet */}
    <path d="M96 54 L85 85 L65 110" stroke="#1D4ED8" strokeWidth="6" strokeLinecap="round" /> {/* Legs */}
    <path d="M100 54 L110 88 L125 125" stroke="#1D4ED8" strokeWidth="6" strokeLinecap="round" />
    <path d="M100 54 L120 70 L135 72" stroke="#1D4ED8" strokeWidth="6" strokeLinecap="round" /> {/* Arms holding phone */}
    
    {/* Smartphone GPS */}
    <rect x="132" y="60" width="14" height="22" rx="3" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="3" />
    <path d="M139 67 L139 73" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 2. Heavy Weightlifter Character SVG (Performance & Strength Goals)
export const WeightlifterCharacter = ({ className = "w-28 h-28" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Head & Cap */}
    <circle cx="100" cy="45" r="16" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="5" />
    <path d="M84 40 C84 26 92 20 100 20 C108 20 116 26 116 40 H84 Z" fill="#1D4ED8" />

    {/* Muscular Torso & Singlet */}
    <path d="M65 65 Q100 55 135 65 L125 120 H75 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="5" strokeLinejoin="round" />
    <path d="M80 65 L90 90 M120 65 L110 90" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />

    {/* Muscular Arms Holding Barbell */}
    <path d="M65 65 L40 105 L48 135" stroke="#1D4ED8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M135 65 L160 105 L152 135" stroke="#1D4ED8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />

    {/* Barbell & Heavy Bumper Plates */}
    <line x1="10" y1="135" x2="190" y2="135" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" />
    <rect x="22" y="105" width="16" height="60" rx="4" fill="#1D4ED8" />
    <rect x="5" y="112" width="15" height="46" rx="3" fill="#2563EB" stroke="#1D4ED8" strokeWidth="3" />
    <rect x="162" y="105" width="16" height="60" rx="4" fill="#1D4ED8" />
    <rect x="180" y="112" width="15" height="46" rx="3" fill="#2563EB" stroke="#1D4ED8" strokeWidth="3" />

    {/* Squat Legs & Lifting Shoes */}
    <path d="M80 120 L70 165 L60 175 H85" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M120 120 L130 165 L140 175 H115" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 3. Swimmer Character SVG (Swimming & Lap Count)
export const SwimmerCharacter = ({ className = "w-28 h-28" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Swimming Pool Water Waves Background */}
    <path d="M0 110 Q50 95 100 110 T200 110 V190 H0 Z" fill="#60A5FA" opacity="0.3" />
    <path d="M0 130 Q50 115 100 130 T200 130 V190 H0 Z" fill="#2563EB" opacity="0.5" />
    
    {/* Swimmer Head, Goggles & Swim Cap */}
    <circle cx="140" cy="90" r="16" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="4" />
    <path d="M128 82 C132 75 148 75 152 82 H128 Z" fill="#1D4ED8" /> {/* Swim Cap */}
    <rect x="134" y="88" width="14" height="7" rx="3" fill="#1E40AF" stroke="#FFFFFF" strokeWidth="2" /> {/* Goggles */}

    {/* Streamlined Body in Motion */}
    <path d="M50 125 Q95 100 140 100" stroke="#1D4ED8" strokeWidth="16" strokeLinecap="round" />
    
    {/* Freestyle Arm Stroke */}
    <path d="M120 98 Q90 60 70 70 L95 105" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />

    {/* Water Splash Dots */}
    <circle cx="60" cy="80" r="4" fill="#60A5FA" />
    <circle cx="75" cy="65" r="3" fill="#93C5FD" />
    <circle cx="160" cy="115" r="5" fill="#60A5FA" />
  </svg>
);

// 4. Foodie Guy Character SVG (Nutrition & Macros)
export const FoodieCharacter = ({ className = "w-28 h-28" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Dining Table */}
    <rect x="10" y="145" width="180" height="12" rx="4" fill="#1D4ED8" />

    {/* Happy Foodie Guy Head & Beard */}
    <circle cx="100" cy="55" r="18" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="4" />
    <path d="M84 45 C84 32 92 26 100 26 C108 26 116 32 116 45 Z" fill="#1D4ED8" /> {/* Hair */}
    <path d="M86 62 Q100 76 114 62" stroke="#1D4ED8" strokeWidth="4" fill="none" strokeLinecap="round" /> {/* Smile & Beard */}

    {/* Torso & Shirt */}
    <path d="M70 85 L100 78 L130 85 L140 145 H60 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="4" strokeLinejoin="round" />

    {/* Fork & Knife in Hands */}
    <path d="M50 145 L50 95" stroke="#1D4ED8" strokeWidth="5" strokeLinecap="round" />
    <path d="M44 95 H56 M44 90 V95 M50 90 V95 M56 90 V95" stroke="#1D4ED8" strokeWidth="3" /> {/* Fork */}

    <path d="M150 145 L150 95" stroke="#1D4ED8" strokeWidth="5" strokeLinecap="round" />
    <path d="M150 95 Q158 105 150 120" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="3" /> {/* Knife */}

    {/* Meal Plate with Salmon Fish & Healthy Greens */}
    <ellipse cx="100" cy="140" rx="30" ry="10" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="3" />
    <path d="M85 138 Q100 130 115 138" stroke="#3B82F6" strokeWidth="4" fill="none" />
  </svg>
);
