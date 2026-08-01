import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  UtensilsCrossed, 
  Trophy, 
  Flame, 
  Droplets, 
  Footprints, 
  Coffee, 
  Package, 
  CloudSun, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Plus, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  ChevronRight, 
  Zap, 
  Target, 
  Bike, 
  Award,
  Calendar,
  X,
  Check,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  BarChart3
} from 'lucide-react';
import { switchAudio } from '../utils/audio';

export const FitpulseApp = () => {
  // Navigation State (4 Bottom Tabs: 'dashboard', 'workout', 'food', 'goals')
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dark / Light Theme Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fitpulse_is_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Sound Feedback State
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('fitpulse_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Dedicated Analytics Graph Modal State (Triggered from Top Right Header Button)
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);

  // Analytics Graph Time Range State ('today', 'week', 'month')
  const [graphTimeRange, setGraphTimeRange] = useState('week');

  // Dashboard Core Metrics State
  const [hydration, setHydration] = useState(() => {
    const saved = localStorage.getItem('fitpulse_hydration');
    return saved ? JSON.parse(saved) : 65; // percentage
  });
  const [sugarCut, setSugarCut] = useState(() => {
    const saved = localStorage.getItem('fitpulse_sugar_cut');
    return saved ? JSON.parse(saved) : 14; // grams avoided
  });
  const [activeBurn, setActiveBurn] = useState(() => {
    const saved = localStorage.getItem('fitpulse_active_burn');
    return saved ? JSON.parse(saved) : 480; // kcal
  });
  const [distanceKm, setDistanceKm] = useState(() => {
    const saved = localStorage.getItem('fitpulse_distance_km');
    return saved ? JSON.parse(saved) : 7.2; // km
  });

  // Google Connect & Modal State
  const [isGoogleConnected, setIsGoogleConnected] = useState(() => {
    return localStorage.getItem('fitpulse_google_connected') === 'true';
  });
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Workout State
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('fitpulse_workouts');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Morning Highway Ride', type: 'cycling', duration: 45, distance: 15.4, calories: 320, time: '07:30 AM' },
      { id: 2, name: 'Interval Park Run', type: 'running', duration: 25, distance: 4.8, calories: 240, time: '06:15 AM' }
    ];
  });
  const [workoutForm, setWorkoutForm] = useState({ name: '', type: 'running', duration: '', distance: '', calories: '' });

  // Food & Nutrition State
  const [foodLogs, setFoodLogs] = useState(() => {
    const saved = localStorage.getItem('fitpulse_food_logs');
    return saved ? JSON.parse(saved) : [
      { id: 1, meal: 'Breakfast', name: 'Oatmeal & Banana Smoothie', calories: 380, protein: 18, carbs: 54, fats: 8 },
      { id: 2, meal: 'Lunch', name: 'Grilled Chicken & Quinoa Salad', calories: 520, protein: 42, carbs: 40, fats: 14 }
    ];
  });
  const [foodForm, setFoodForm] = useState({ meal: 'Lunch', name: '', calories: '', protein: '', carbs: '', fats: '' });
  const calorieGoal = 2200;

  // Challenges State
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('fitpulse_challenges');
    return saved ? JSON.parse(saved) : [
      { id: 'sugar-cut', title: '7-Day Zero Sugar Challenge', desc: 'Avoid refined sugars for 7 full days', progress: 5, total: 7, joined: true, icon: '⚡', unit: 'Days' },
      { id: 'cycling-50k', title: '50km Cycling Sprint', desc: 'Cover 50km total distance cycling this week', progress: 32.5, total: 50, joined: true, icon: '🚴', unit: 'km' },
      { id: 'hydration-streak', title: '100% Hydration Goal Streak', desc: 'Reach 2,500ml daily water target for 5 consecutive days', progress: 4, total: 5, joined: true, icon: '💧', unit: 'Days' },
      { id: 'caffeine-cutoff', title: '0 Caffeine After 2 PM', desc: 'Protect your deep sleep quality', progress: 3, total: 3, joined: false, icon: '☕', unit: 'Days' }
    ];
  });

  // Save State Persistence
  useEffect(() => {
    localStorage.setItem('fitpulse_is_dark_mode', JSON.stringify(isDarkMode));
    localStorage.setItem('fitpulse_sound_enabled', JSON.stringify(isSoundEnabled));
    localStorage.setItem('fitpulse_hydration', JSON.stringify(hydration));
    localStorage.setItem('fitpulse_sugar_cut', JSON.stringify(sugarCut));
    localStorage.setItem('fitpulse_active_burn', JSON.stringify(activeBurn));
    localStorage.setItem('fitpulse_distance_km', JSON.stringify(distanceKm));
    localStorage.setItem('fitpulse_google_connected', isGoogleConnected.toString());
    localStorage.setItem('fitpulse_workouts', JSON.stringify(workouts));
    localStorage.setItem('fitpulse_food_logs', JSON.stringify(foodLogs));
    localStorage.setItem('fitpulse_challenges', JSON.stringify(challenges));
  }, [isDarkMode, isSoundEnabled, hydration, sugarCut, activeBurn, distanceKm, isGoogleConnected, workouts, foodLogs, challenges]);

  const triggerClickSound = () => {
    if (isSoundEnabled) {
      switchAudio.playClickSound();
    }
  };

  const toggleTheme = () => {
    triggerClickSound();
    setIsDarkMode(prev => !prev);
  };

  // Analytics Graph Datasets
  const analyticsData = {
    today: {
      labels: ['08 AM', '10 AM', '12 PM', '02 PM', '04 PM', '06 PM', '08 PM'],
      calories: [80, 140, 210, 180, 310, 480, 520],
      distance: [1.2, 2.4, 3.1, 4.0, 5.5, 7.2, 7.8]
    },
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      calories: [420, 560, 390, 610, 480, 720, 540],
      distance: [5.4, 8.1, 4.2, 9.5, 7.2, 12.0, 8.4]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      calories: [3200, 3900, 4100, 4500],
      distance: [38.5, 46.2, 52.0, 58.4]
    }
  };

  const currentGraphData = analyticsData[graphTimeRange];
  const maxCalorieValue = Math.max(...currentGraphData.calories);
  const maxDistanceValue = Math.max(...currentGraphData.distance);

  // Form Handlers
  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (!workoutForm.name || !workoutForm.duration || !workoutForm.calories) return;
    triggerClickSound();

    const newWorkout = {
      id: Date.now(),
      name: workoutForm.name,
      type: workoutForm.type,
      duration: parseInt(workoutForm.duration),
      distance: workoutForm.distance ? parseFloat(workoutForm.distance) : 0,
      calories: parseInt(workoutForm.calories),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setWorkouts([newWorkout, ...workouts]);
    setActiveBurn(prev => prev + newWorkout.calories);
    if (newWorkout.distance > 0) {
      setDistanceKm(prev => parseFloat((prev + newWorkout.distance).toFixed(1)));
    }
    setWorkoutForm({ name: '', type: 'running', duration: '', distance: '', calories: '' });
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    if (!foodForm.name || !foodForm.calories) return;
    triggerClickSound();

    const newFood = {
      id: Date.now(),
      meal: foodForm.meal,
      name: foodForm.name,
      calories: parseInt(foodForm.calories),
      protein: foodForm.protein ? parseInt(foodForm.protein) : 0,
      carbs: foodForm.carbs ? parseInt(foodForm.carbs) : 0,
      fats: foodForm.fats ? parseInt(foodForm.fats) : 0
    };

    setFoodLogs([newFood, ...foodLogs]);
    setFoodForm({ meal: 'Lunch', name: '', calories: '', protein: '', carbs: '', fats: '' });
  };

  const toggleChallengeJoin = (id) => {
    triggerClickSound();
    setChallenges(challenges.map(c => c.id === id ? { ...c, joined: !c.joined } : c));
  };

  const handleGoogleSync = () => {
    setIsSyncing(true);
    triggerClickSound();
    setTimeout(() => {
      setIsSyncing(false);
      setIsGoogleConnected(true);
      setIsGoogleModalOpen(false);
    }, 1200);
  };

  const totalFoodCalories = foodLogs.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = foodLogs.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = foodLogs.reduce((sum, item) => sum + item.carbs, 0);
  const totalFats = foodLogs.reduce((sum, item) => sum + item.fats, 0);

  // Dynamic Theme Classes
  const themeContainerClass = isDarkMode 
    ? 'bg-slate-950 text-slate-100 border-slate-800' 
    : 'bg-white text-slate-900 border-slate-200 shadow-xl';

  const headerBgClass = isDarkMode 
    ? 'bg-slate-900/80 border-slate-800' 
    : 'bg-slate-50/90 border-slate-200';

  const cardBgClass = isDarkMode 
    ? 'bg-slate-900/90 border-slate-800 text-slate-100' 
    : 'bg-white border-slate-200 shadow-sm text-slate-900';

  const subCardBgClass = isDarkMode 
    ? 'bg-slate-950 border-slate-800 text-slate-200' 
    : 'bg-slate-50 border-slate-200 text-slate-800';

  const mutedTextClass = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`w-full max-w-4xl mx-auto rounded-3xl overflow-hidden glass-panel border shadow-2xl flex flex-col my-4 transition-colors duration-300 ${themeContainerClass}`}>
      
      {/* 1. TOP HEADER BAR: Dedicated Graph Tab (Top Right), Theme Switcher, Google Connect & Future Updates Banner */}
      <div className={`w-full p-4 border-b flex flex-col gap-3 backdrop-blur-md transition-colors duration-300 ${headerBgClass}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg shadow-md">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold tracking-tight font-sans">
                  FITPULSE
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono uppercase font-bold">
                  {isDarkMode ? 'DARK MODE' : 'LIGHT MODE'}
                </span>
              </div>
              <p className={`text-xs font-mono ${mutedTextClass}`}>Fitness &amp; Hydration Engine</p>
            </div>
          </div>

          {/* TOP RIGHT TOOLBAR: Dedicated Graph Tab, Sound Toggle, Dark Mode & Google Connect */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* DEDICATED GRAPH TAB BUTTON (TOP RIGHT) */}
            <button
              onClick={() => {
                triggerClickSound();
                setIsAnalyticsModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md"
              title="Open Dedicated Analytics & Graph Tab"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dedicated Graphs</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                setIsSoundEnabled(!isSoundEnabled);
                triggerClickSound();
              }}
              className={`p-2 rounded-xl border text-xs font-mono transition-all ${
                isSoundEnabled 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              }`}
              title="Toggle Audio Feedback"
            >
              {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* MASTER DARK / LIGHT MODE SWITCH BUTTON */}
            <button
              onClick={toggleTheme}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                isDarkMode 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30' 
                  : 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700'
              }`}
              title="Switch Dark / Light Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-amber-200" />}
              <span>{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>

            {/* Google Connect Pill Button */}
            <button
              onClick={() => {
                triggerClickSound();
                setIsGoogleModalOpen(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all border shadow-sm ${
                isGoogleConnected 
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="hidden sm:inline">{isGoogleConnected ? 'Google Fit' : 'Connect'}</span>
            </button>
          </div>
        </div>

        {/* Future Updates Notification Banner */}
        <div className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono ${
          isDarkMode 
            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' 
            : 'bg-indigo-50 border-indigo-200 text-indigo-800'
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span>Future Update Feature: Real-time Wearable &amp; Google Connect Auto-Sync Enabled</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-bold border border-indigo-500/30">NEW</span>
        </div>
      </div>

      {/* 2. MAIN TAB CONTENT AREA */}
      <div className="p-6 flex-1 min-h-[380px]">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Circular Distance Progress Ring */}
              <div className={`p-6 rounded-3xl border flex flex-col items-center justify-center ${cardBgClass}`}>
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg width="180" height="180" viewBox="0 0 180 180" className="rotate-[-90deg]">
                    <circle cx="90" cy="90" r="70" fill="none" stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} strokeWidth="14" />
                    <circle 
                      cx="90" 
                      cy="90" 
                      r="70" 
                      fill="none" 
                      stroke="#059669" 
                      strokeWidth="14" 
                      strokeDasharray="440"
                      strokeDashoffset={440 - (440 * Math.min(distanceKm / 10, 1))}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <Footprints className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-1" />
                    <span className="text-3xl font-extrabold font-mono">{distanceKm}</span>
                    <span className={`text-xs font-mono ${mutedTextClass}`}>Kilometers Covered</span>
                  </div>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Hydration */}
                <div 
                  onClick={() => setHydration(prev => (prev + 10) % 110)}
                  className={`p-4 rounded-2xl border hover:border-blue-500/40 cursor-pointer transition-all space-y-2 group ${cardBgClass}`}
                >
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 w-fit group-hover:scale-110 transition-transform">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-500 dark:text-blue-300 font-mono">{hydration}%</div>
                    <span className={`text-[10px] font-mono uppercase ${mutedTextClass}`}>Hydration Level</span>
                  </div>
                </div>

                {/* Active Burn */}
                <div 
                  onClick={() => setActiveBurn(prev => prev + 50)}
                  className={`p-4 rounded-2xl border hover:border-orange-500/40 cursor-pointer transition-all space-y-2 group ${cardBgClass}`}
                >
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 w-fit group-hover:scale-110 transition-transform">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-500 dark:text-orange-300 font-mono">{activeBurn} kcal</div>
                    <span className={`text-[10px] font-mono uppercase ${mutedTextClass}`}>Active Burn</span>
                  </div>
                </div>

                {/* Sugar Cut */}
                <div 
                  onClick={() => setSugarCut(prev => prev + 2)}
                  className={`p-4 rounded-2xl border hover:border-emerald-500/40 cursor-pointer transition-all space-y-2 group ${cardBgClass}`}
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit group-hover:scale-110 transition-transform">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-300 font-mono">{sugarCut}g</div>
                    <span className={`text-[10px] font-mono uppercase ${mutedTextClass}`}>Sugar Avoided</span>
                  </div>
                </div>

                {/* Daily Calorie Intake */}
                <div 
                  onClick={() => setActiveTab('food')}
                  className={`p-4 rounded-2xl border hover:border-amber-500/40 cursor-pointer transition-all space-y-2 group ${cardBgClass}`}
                >
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 w-fit group-hover:scale-110 transition-transform">
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-amber-600 dark:text-amber-300 font-mono">{totalFoodCalories} / {calorieGoal}</div>
                    <span className={`text-[10px] font-mono uppercase ${mutedTextClass}`}>Calories Consumed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Hydration Banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${cardBgClass}`}>
              <div className="flex items-center gap-3">
                <CloudSun className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <div className="text-sm font-bold">Optimal Weather Hydration</div>
                  <span className={`text-xs font-mono ${mutedTextClass}`}>26.9°C Ambient Temperature | 64% Humidity</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                RECOMMENDED: +500ml
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: WORKOUT */}
        {activeTab === 'workout' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Workout Logger Form */}
              <form onSubmit={handleAddWorkout} className={`p-5 rounded-3xl border space-y-4 ${cardBgClass}`}>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-sm font-bold uppercase font-mono">Log Workout Activity</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Activity Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Morning Highway Ride"
                      value={workoutForm.name}
                      onChange={e => setWorkoutForm({ ...workoutForm, name: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Workout Type</label>
                      <select 
                        value={workoutForm.type}
                        onChange={e => setWorkoutForm({ ...workoutForm, type: e.target.value })}
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                      >
                        <option value="running">🏃 Running</option>
                        <option value="cycling">🚴 Cycling</option>
                        <option value="swimming">🏊 Swimming</option>
                        <option value="gym">🏋️ Gym / Weights</option>
                      </select>
                    </div>

                    <div>
                      <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Duration (mins)</label>
                      <input 
                        type="number"
                        placeholder="e.g. 45"
                        value={workoutForm.duration}
                        onChange={e => setWorkoutForm({ ...workoutForm, duration: e.target.value })}
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Distance (km)</label>
                      <input 
                        type="number"
                        step="0.1"
                        placeholder="e.g. 15.4"
                        value={workoutForm.distance}
                        onChange={e => setWorkoutForm({ ...workoutForm, distance: e.target.value })}
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Calories Burned</label>
                      <input 
                        type="number"
                        placeholder="e.g. 320"
                        value={workoutForm.calories}
                        onChange={e => setWorkoutForm({ ...workoutForm, calories: e.target.value })}
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Save Workout Log
                  </button>
                </div>
              </form>

              {/* Workout History Feed */}
              <div className={`p-5 rounded-3xl border space-y-3 flex flex-col ${cardBgClass}`}>
                <h3 className="text-sm font-bold uppercase font-mono flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" /> Logged Workouts Feed
                </h3>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {workouts.map(item => (
                    <div key={item.id} className={`p-3 rounded-2xl border flex items-center justify-between ${subCardBgClass}`}>
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">
                          {item.type === 'cycling' ? '🚴' : item.type === 'swimming' ? '🏊' : item.type === 'gym' ? '🏋️' : '🏃'}
                        </span>
                        <div>
                          <div className="text-xs font-bold">{item.name}</div>
                          <span className={`text-[10px] font-mono ${mutedTextClass}`}>{item.duration} mins • {item.time}</span>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-orange-500">+{item.calories} kcal</div>
                        {item.distance > 0 && <span className="text-[10px] text-emerald-600 dark:text-emerald-400">{item.distance} km</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FOOD AND CALORIES */}
        {activeTab === 'food' && (
          <div className="space-y-6">
            {/* Calorie Goal Progress Card */}
            <div className={`p-5 rounded-3xl border space-y-3 ${cardBgClass}`}>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold">DAILY CALORIE BUDGET</span>
                <span className="text-amber-500 font-bold">{totalFoodCalories} / {calorieGoal} kcal</span>
              </div>
              <div className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${subCardBgClass}`}>
                <div 
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((totalFoodCalories / calorieGoal) * 100))}%` }}
                />
              </div>

              {/* Macro Nutrients Breakdown */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-center font-mono">
                <div className={`p-2.5 rounded-xl border ${subCardBgClass}`}>
                  <span className={`text-[10px] block ${mutedTextClass}`}>PROTEIN</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{totalProtein}g</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${subCardBgClass}`}>
                  <span className={`text-[10px] block ${mutedTextClass}`}>CARBS</span>
                  <span className="text-sm font-bold text-amber-500">{totalCarbs}g</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${subCardBgClass}`}>
                  <span className={`text-[10px] block ${mutedTextClass}`}>FATS</span>
                  <span className="text-sm font-bold text-orange-500">{totalFats}g</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add Food Form */}
              <form onSubmit={handleAddFood} className={`p-5 rounded-3xl border space-y-3 ${cardBgClass}`}>
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-bold uppercase font-mono">Log Meal &amp; Calories</h3>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Meal Time</label>
                    <select 
                      value={foodForm.meal}
                      onChange={e => setFoodForm({ ...foodForm, meal: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-500 ${subCardBgClass}`}
                    >
                      <option value="Breakfast">🍳 Breakfast</option>
                      <option value="Lunch">🥗 Lunch</option>
                      <option value="Dinner">🍲 Dinner</option>
                      <option value="Snacks">🍎 Snacks</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Calories</label>
                    <input 
                      type="number"
                      placeholder="e.g. 450"
                      value={foodForm.calories}
                      onChange={e => setFoodForm({ ...foodForm, calories: e.target.value })}
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-500 ${subCardBgClass}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Food Item Description</label>
                  <input 
                    type="text"
                    placeholder="e.g. Grilled Chicken & Rice"
                    value={foodForm.name}
                    onChange={e => setFoodForm({ ...foodForm, name: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-500 ${subCardBgClass}`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <input 
                    type="number" 
                    placeholder="Protein (g)"
                    value={foodForm.protein}
                    onChange={e => setFoodForm({ ...foodForm, protein: e.target.value })}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono focus:outline-none ${subCardBgClass}`}
                  />
                  <input 
                    type="number" 
                    placeholder="Carbs (g)"
                    value={foodForm.carbs}
                    onChange={e => setFoodForm({ ...foodForm, carbs: e.target.value })}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono focus:outline-none ${subCardBgClass}`}
                  />
                  <input 
                    type="number" 
                    placeholder="Fats (g)"
                    value={foodForm.fats}
                    onChange={e => setFoodForm({ ...foodForm, fats: e.target.value })}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono focus:outline-none ${subCardBgClass}`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold uppercase transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Food Log
                </button>
              </form>

              {/* Food Logs List */}
              <div className={`p-5 rounded-3xl border space-y-3 ${cardBgClass}`}>
                <h3 className="text-sm font-bold uppercase font-mono">Today's Meals</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {foodLogs.map(item => (
                    <div key={item.id} className={`p-3 rounded-2xl border flex items-center justify-between ${subCardBgClass}`}>
                      <div>
                        <span className="text-[10px] text-amber-500 font-mono uppercase font-bold">{item.meal}</span>
                        <div className="text-xs font-bold">{item.name}</div>
                      </div>
                      <div className="text-right font-mono text-xs font-bold">
                        {item.calories} kcal
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GOALS AND CHALLENGES */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold uppercase font-mono">Fitness Challenges &amp; Burn Goals</h3>
              </div>
              <span className={`text-xs font-mono ${mutedTextClass}`}>4 Active Challenges</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.map(c => {
                const pct = Math.min(100, Math.round((c.progress / c.total) * 100));
                return (
                  <div key={c.id} className={`p-5 rounded-3xl border space-y-3 hover:border-amber-500/40 transition-all ${cardBgClass}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-2xl p-2 rounded-2xl border ${subCardBgClass}`}>{c.icon}</span>
                        <div>
                          <div className="text-sm font-bold">{c.title}</div>
                          <p className={`text-xs ${mutedTextClass}`}>{c.desc}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className={mutedTextClass}>Progress</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{c.progress} / {c.total} {c.unit} ({pct}%)</span>
                      </div>
                      <div className={`w-full h-2.5 rounded-full overflow-hidden p-0.5 border ${subCardBgClass}`}>
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => toggleChallengeJoin(c.id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all shadow-sm ${
                          c.joined 
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40' 
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        }`}
                      >
                        {c.joined ? 'Joined & Active ✓' : 'Join Challenge'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 3. BOTTOM NAVIGATION BAR (4 MAIN TABS) */}
      <div className={`w-full p-3 border-t backdrop-blur-md flex items-center justify-around ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/95 border-slate-200'
      }`}>
        {[
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'workout', label: 'Workout', icon: Dumbbell },
          { id: 'food', label: 'Food & Calories', icon: UtensilsCrossed },
          { id: 'goals', label: 'Goals & Challenges', icon: Trophy }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                triggerClickSound();
                setActiveTab(tab.id);
              }}
              className={`flex flex-col items-center gap-1 transition-all group ${
                isSelected ? 'scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div 
                className={`p-2 rounded-2xl transition-all ${
                  isSelected ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : `${mutedTextClass} group-hover:text-slate-900 dark:group-hover:text-slate-100`
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-mono font-bold tracking-tight ${isSelected ? 'text-emerald-600 dark:text-emerald-400' : mutedTextClass}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. DEDICATED GRAPH ANALYTICS MODAL (TRIGGERED FROM TOP RIGHT TAB) */}
      {isAnalyticsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-2xl border rounded-3xl p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto ${cardBgClass}`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold font-sans flex items-center gap-2">
                    DEDICATED GRAPH ANALYTICS
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold">LIVE</span>
                  </h3>
                  <p className={`text-xs font-mono ${mutedTextClass}`}>Performance Metrics &amp; Calorie Burn Breakdown</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAnalyticsModalOpen(false)}
                className={`p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 ${mutedTextClass} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Time Period Filter Toolbar */}
            <div className="flex items-center justify-between p-3 rounded-2xl border bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">Time Range:</span>
              <div className="flex gap-1.5">
                {['today', 'week', 'month'].map(range => (
                  <button
                    key={range}
                    onClick={() => {
                      triggerClickSound();
                      setGraphTimeRange(range);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                      graphTimeRange === range 
                        ? 'bg-emerald-600 text-white shadow' 
                        : `${mutedTextClass} hover:text-slate-900 dark:hover:text-slate-100`
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Calorie Burn Bar Graph */}
            <div className={`p-5 rounded-2xl border space-y-3 ${subCardBgClass}`}>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-orange-500 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> Calorie Burn Trend ({graphTimeRange})
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Max: {maxCalorieValue} kcal</span>
              </div>
              <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                {currentGraphData.calories.map((val, idx) => {
                  const heightPct = Math.max(15, Math.round((val / maxCalorieValue) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold bg-orange-500 text-white px-2 py-0.5 rounded shadow">
                        {val} kcal
                      </div>
                      <div 
                        className="w-full rounded-t-xl bg-gradient-to-t from-orange-600 via-amber-500 to-amber-300 transition-all duration-500 group-hover:brightness-125"
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className={`text-[10px] font-mono font-bold ${mutedTextClass}`}>{currentGraphData.labels[idx]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Distance & Active Minutes Bar Graph */}
            <div className={`p-5 rounded-2xl border space-y-3 ${subCardBgClass}`}>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Footprints className="w-4 h-4" /> Distance &amp; Activity Progress ({graphTimeRange})
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Max: {maxDistanceValue} km</span>
              </div>
              <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                {currentGraphData.distance.map((val, idx) => {
                  const heightPct = Math.max(15, Math.round((val / maxDistanceValue) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold bg-emerald-600 text-white px-2 py-0.5 rounded shadow">
                        {val} km
                      </div>
                      <div 
                        className="w-full rounded-t-xl bg-gradient-to-t from-emerald-700 via-emerald-500 to-teal-300 transition-all duration-500 group-hover:brightness-125"
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className={`text-[10px] font-mono font-bold ${mutedTextClass}`}>{currentGraphData.labels[idx]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Summary Metrics */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className={`p-3 rounded-2xl border ${subCardBgClass}`}>
                <span className={`text-[10px] block ${mutedTextClass}`}>AVERAGE BURN</span>
                <span className="text-sm font-bold text-orange-500">~{Math.round(currentGraphData.calories.reduce((a,b)=>a+b,0)/currentGraphData.calories.length)} kcal</span>
              </div>
              <div className={`p-3 rounded-2xl border ${subCardBgClass}`}>
                <span className={`text-[10px] block ${mutedTextClass}`}>TOTAL DISTANCE</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{currentGraphData.distance.reduce((a,b)=>a+b,0).toFixed(1)} km</span>
              </div>
              <div className={`p-3 rounded-2xl border ${subCardBgClass}`}>
                <span className={`text-[10px] block ${mutedTextClass}`}>ACTIVE GOAL</span>
                <span className="text-sm font-bold text-blue-500">100% On Track</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. GOOGLE CONNECT MODAL */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-md border rounded-3xl p-6 space-y-5 shadow-2xl ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <h3 className="text-base font-bold">Google Fit Connect</h3>
              </div>
              <button 
                onClick={() => setIsGoogleModalOpen(false)}
                className={`p-1 rounded-lg ${mutedTextClass} hover:text-slate-900 dark:hover:text-white`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p>Authorize FitPulse to sync your daily steps, active workout duration, and calories burned automatically with Google Fit.</p>
              
              <div className={`p-3.5 rounded-2xl border space-y-2 font-mono text-[11px] ${subCardBgClass}`}>
                <div className="flex justify-between">
                  <span className={mutedTextClass}>Account:</span>
                  <span className="font-bold">yadhukrishnan7717@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className={mutedTextClass}>Status:</span>
                  <span className={isGoogleConnected ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-500 font-bold'}>
                    {isGoogleConnected ? 'SYNCED & ACTIVE' : 'READY TO AUTHORIZE'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleGoogleSync}
              disabled={isSyncing}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Syncing with Google Fit...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{isGoogleConnected ? 'Re-Sync Account Data' : 'Authorize & Connect Google Fit'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
