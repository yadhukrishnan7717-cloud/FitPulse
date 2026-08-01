import React, { useState, useEffect, useRef } from 'react';
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
  BarChart3,
  Settings,
  User,
  Scale,
  Ruler,
  Save,
  Smartphone,
  MessageSquare,
  Send,
  Users,
  Smile,
  Heart,
  GitBranch,
  Type,
  MapPin,
  Trash2,
  PlusCircle,
  Play,
  Star,
  BookOpen,
  Menu
} from 'lucide-react';
import { switchAudio } from '../utils/audio';

export const FitpulseApp = () => {
  // Navigation State (4 Floating Bottom Tabs: 'dashboard', 'workout', 'food', 'goals')
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dark / Light Theme Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('fitpulse_is_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Font Style State ('nothing', 'inter', 'mono')
  const [fontStyle, setFontStyle] = useState(() => {
    const saved = localStorage.getItem('fitpulse_font_style');
    return saved || 'nothing';
  });

  // Sound Feedback State
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('fitpulse_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Motivational Motto State
  const motivationalMottos = [
    "Empower Your Movement ⚡",
    "Consistency Builds Greatness 🔥",
    "Push Beyond Your Limits 💪",
    "Every Step Counts 🏃",
    "Small Daily Gains = Big Results 🏆"
  ];
  const [mottoIndex, setMottoIndex] = useState(0);

  // Dedicated Modals State
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCommunityChatOpen, setIsCommunityChatOpen] = useState(false);
  const [isCreateChallengeModalOpen, setIsCreateChallengeModalOpen] = useState(false);

  // Quick Stat Logger Modal State ('hydration', 'burn', 'sugar')
  const [quickLogModal, setQuickLogModal] = useState({ isOpen: false, type: null });
  const [customQuickValue, setCustomQuickValue] = useState('');

  // Streak Count State
  const [streakDays, setStreakDays] = useState(5);
  const [totalXp, setTotalXp] = useState(140);

  // Geolocation & Ambient Hydration State
  const [locationStatus, setLocationStatus] = useState(() => {
    const saved = localStorage.getItem('fitpulse_user_city');
    return saved || 'Kochi, Kerala (Detected)';
  });
  const [tempCelsius, setTempCelsius] = useState(29.5);
  const [humidityPct, setHumidityPct] = useState(68);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [recommendedExtraWaterMl, setRecommendedExtraWaterMl] = useState(650);

  // GitHub Cloud Sync State inside Settings
  const [isGithubSyncing, setIsGithubSyncing] = useState(false);
  const [githubSyncStatus, setGithubSyncStatus] = useState('SYNCED WITH MAIN');

  // Community Chat State
  const [chatChannel, setChatChannel] = useState('general');
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('fitpulse_community_chat');
    return saved ? JSON.parse(saved) : [
      { id: 1, sender: 'Sarah K.', text: 'Day 5 of the Zero Sugar Challenge completed! Feeling super energized today ⚡', time: '11:42 AM', channel: 'general', avatar: '👩‍🦰' },
      { id: 2, sender: 'Alex M.', text: 'Just finished a 15.4km morning highway ride! Burned 320 kcal 🚴🔥', time: '11:48 AM', channel: 'workout-motivation', avatar: '🏃' },
      { id: 3, sender: 'Yadhu Krishnan', text: 'Reached 100% of my daily hydration target (2,500ml)! Stay hydrated everyone 💧', time: '12:01 PM', channel: 'general', avatar: '⚡' }
    ];
  });
  const [newMessageText, setNewMessageText] = useState('');
  const chatBottomRef = useRef(null);

  // User Profile & Settings State (Height, Weight, Daily Calorie Goal)
  const [userWeight, setUserWeight] = useState(() => {
    const saved = localStorage.getItem('fitpulse_user_weight');
    return saved ? parseFloat(saved) : 70.0;
  });
  const [userHeight, setUserHeight] = useState(() => {
    const saved = localStorage.getItem('fitpulse_user_height');
    return saved ? parseFloat(saved) : 175.0;
  });
  const [calorieGoal, setCalorieGoal] = useState(() => {
    const saved = localStorage.getItem('fitpulse_calorie_goal');
    return saved ? parseInt(saved) : 2200;
  });
  const [hydrationTarget, setHydrationTarget] = useState(() => {
    const saved = localStorage.getItem('fitpulse_hydration_target');
    return saved ? parseInt(saved) : 2500;
  });

  // Temp Form State for Settings Modal
  const [settingsForm, setSettingsForm] = useState({
    weight: userWeight,
    height: userHeight,
    calorieGoal: calorieGoal,
    hydrationTarget: hydrationTarget,
    fontStyle: fontStyle
  });

  // Custom Challenge Form State
  const [newChallengeForm, setNewChallengeForm] = useState({
    title: '',
    desc: '',
    total: '',
    unit: 'Days',
    icon: '⚡'
  });

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

  // Challenges State (Fully Customizable by User)
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('fitpulse_challenges');
    return saved ? JSON.parse(saved) : [
      { id: 'sugar-cut', title: '7-Day Zero Sugar Challenge', desc: 'Avoid refined sugars for 7 full days', progress: 5, total: 7, joined: true, icon: '⚡', unit: 'Days' },
      { id: 'cycling-50k', title: '50km Cycling Sprint', desc: 'Cover 50km total distance cycling this week', progress: 32.5, total: 50, joined: true, icon: '🚴', unit: 'km' },
      { id: 'hydration-streak', title: '100% Hydration Goal Streak', desc: 'Reach 2,500ml daily water target for 5 consecutive days', progress: 4, total: 5, joined: true, icon: '💧', unit: 'Days' },
      { id: 'caffeine-cutoff', title: '0 Caffeine After 2 PM', desc: 'Protect your deep sleep quality', progress: 3, total: 3, joined: false, icon: '☕', unit: 'Days' }
    ];
  });

  // Daily Quests State
  const [dailyQuests, setDailyQuests] = useState([
    { id: 1, title: 'Burn 500 Calories', desc: 'Spend 25 minutes exercising', completed: true, xp: 20 },
    { id: 2, title: 'Drink 2,500ml Water', desc: 'Reach 100% hydration target', completed: false, xp: 15 }
  ]);

  // Save State Persistence
  useEffect(() => {
    localStorage.setItem('fitpulse_is_dark_mode', JSON.stringify(isDarkMode));
    localStorage.setItem('fitpulse_font_style', fontStyle);
    localStorage.setItem('fitpulse_sound_enabled', JSON.stringify(isSoundEnabled));
    localStorage.setItem('fitpulse_user_weight', userWeight.toString());
    localStorage.setItem('fitpulse_user_height', userHeight.toString());
    localStorage.setItem('fitpulse_calorie_goal', calorieGoal.toString());
    localStorage.setItem('fitpulse_hydration_target', hydrationTarget.toString());
    localStorage.setItem('fitpulse_hydration', JSON.stringify(hydration));
    localStorage.setItem('fitpulse_sugar_cut', JSON.stringify(sugarCut));
    localStorage.setItem('fitpulse_active_burn', JSON.stringify(activeBurn));
    localStorage.setItem('fitpulse_distance_km', JSON.stringify(distanceKm));
    localStorage.setItem('fitpulse_google_connected', isGoogleConnected.toString());
    localStorage.setItem('fitpulse_workouts', JSON.stringify(workouts));
    localStorage.setItem('fitpulse_food_logs', JSON.stringify(foodLogs));
    localStorage.setItem('fitpulse_challenges', JSON.stringify(challenges));
    localStorage.setItem('fitpulse_community_chat', JSON.stringify(chatMessages));
    localStorage.setItem('fitpulse_user_city', locationStatus);
  }, [isDarkMode, fontStyle, isSoundEnabled, userWeight, userHeight, calorieGoal, hydrationTarget, hydration, sugarCut, activeBurn, distanceKm, isGoogleConnected, workouts, foodLogs, challenges, chatMessages, locationStatus]);

  const triggerClickSound = () => {
    if (isSoundEnabled) {
      switchAudio.playClickSound();
    }
  };

  const toggleTheme = () => {
    triggerClickSound();
    setIsDarkMode(prev => !prev);
  };

  const cycleMotto = () => {
    triggerClickSound();
    setMottoIndex((prev) => (prev + 1) % motivationalMottos.length);
  };

  // Browser Geolocation Detector for Dynamic Hydration Intelligence
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    triggerClickSound();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(2);
          const lon = position.coords.longitude.toFixed(2);
          
          const calculatedTemp = 30.2;
          const calculatedHumidity = 72;
          const extraWaterNeeded = Math.round((calculatedTemp - 20) * 45 + (calculatedHumidity * 3));

          setTempCelsius(calculatedTemp);
          setHumidityPct(calculatedHumidity);
          setRecommendedExtraWaterMl(extraWaterNeeded);
          setLocationStatus(`GPS Loc (${lat}°, ${lon}°)` );
          setIsDetectingLocation(false);
        },
        (error) => {
          setLocationStatus("Kochi, Kerala (Default)");
          setRecommendedExtraWaterMl(600);
          setIsDetectingLocation(false);
        },
        { timeout: 5000 }
      );
    } else {
      setLocationStatus("Local Region");
      setIsDetectingLocation(false);
    }
  };

  // Quick Stat Logger Handlers (Hydration ml, Active Burn kcal, Sugar Cut g)
  const openQuickLog = (type) => {
    triggerClickSound();
    setCustomQuickValue('');
    setQuickLogModal({ isOpen: true, type });
  };

  const handleAddHydrationMl = (ml) => {
    triggerClickSound();
    const addedPct = Math.round((ml / hydrationTarget) * 100);
    setHydration(prev => Math.min(100, prev + addedPct));
    setTotalXp(prev => prev + 10);
    setQuickLogModal({ isOpen: false, type: null });
  };

  const handleAddActiveBurnKcal = (kcal) => {
    triggerClickSound();
    setActiveBurn(prev => prev + kcal);
    setTotalXp(prev => prev + 25);
    setQuickLogModal({ isOpen: false, type: null });
  };

  const handleAddSugarCutGrams = (grams) => {
    triggerClickSound();
    setSugarCut(prev => prev + grams);
    setTotalXp(prev => prev + 15);
    setQuickLogModal({ isOpen: false, type: null });
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;
    triggerClickSound();

    const msg = {
      id: Date.now(),
      sender: 'Yadhu Krishnan',
      text: newMessageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: chatChannel,
      avatar: '⚡'
    };

    setChatMessages(prev => [...prev, msg]);
    setNewMessageText('');
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTriggerGithubSync = () => {
    setIsGithubSyncing(true);
    triggerClickSound();
    setTimeout(() => {
      setIsGithubSyncing(false);
      setGithubSyncStatus('PUSHED TO MAIN ✓');
    }, 1000);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    triggerClickSound();
    setUserWeight(parseFloat(settingsForm.weight));
    setUserHeight(parseFloat(settingsForm.height));
    setCalorieGoal(parseInt(settingsForm.calorieGoal));
    setHydrationTarget(parseInt(settingsForm.hydrationTarget));
    setFontStyle(settingsForm.fontStyle);
    setIsSettingsModalOpen(false);
  };

  // Custom Challenge Handlers
  const handleCreateChallenge = (e) => {
    e.preventDefault();
    if (!newChallengeForm.title || !newChallengeForm.total) return;
    triggerClickSound();

    const customChallenge = {
      id: `custom-${Date.now()}`,
      title: newChallengeForm.title,
      desc: newChallengeForm.desc || 'Personal custom fitness challenge',
      progress: 0,
      total: parseFloat(newChallengeForm.total),
      joined: true,
      icon: newChallengeForm.icon || '🏆',
      unit: newChallengeForm.unit || 'Days'
    };

    setChallenges([customChallenge, ...challenges]);
    setNewChallengeForm({ title: '', desc: '', total: '', unit: 'Days', icon: '⚡' });
    setIsCreateChallengeModalOpen(false);
  };

  const handleDeleteChallenge = (id) => {
    triggerClickSound();
    setChallenges(challenges.filter(c => c.id !== id));
  };

  const handleIncrementChallengeProgress = (id) => {
    triggerClickSound();
    setChallenges(challenges.map(c => {
      if (c.id === id) {
        const nextProg = Math.min(c.total, parseFloat((c.progress + 1).toFixed(1)));
        return { ...c, progress: nextProg };
      }
      return c;
    }));
  };

  const toggleQuest = (id) => {
    triggerClickSound();
    setDailyQuests(dailyQuests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
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

  // Dynamic Theme & Font Classes
  const themeContainerClass = isDarkMode 
    ? 'bg-black text-slate-100 border-slate-800' 
    : 'bg-white text-slate-900 border-slate-200 shadow-xl';

  const fontClass = fontStyle === 'nothing' 
    ? 'font-mono uppercase tracking-wider' 
    : fontStyle === 'mono' ? 'font-mono' : 'font-sans';

  const cardBgClass = isDarkMode 
    ? 'bg-[#121214] border-slate-800 text-slate-100' 
    : 'bg-white border-slate-200 shadow-sm text-slate-900';

  const subCardBgClass = isDarkMode 
    ? 'bg-[#18181b] border-slate-800 text-slate-200' 
    : 'bg-slate-50 border-slate-200 text-slate-800';

  const mutedTextClass = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`w-full max-w-md mx-auto min-h-screen pb-24 relative flex flex-col transition-colors duration-300 ${themeContainerClass} ${fontClass}`}>
      
      {/* 1. GAMIFIED TOP HEADER: Greeting, User Name, Hamburger Menu & User Profile Avatar */}
      <div className="w-full px-5 pt-6 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-serif italic text-slate-400 block">Good afternoon,</span>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
            Yadhu Krishnan!
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Settings Button ⚙️ */}
          <button
            onClick={() => {
              triggerClickSound();
              setSettingsForm({ weight: userWeight, height: userHeight, calorieGoal: calorieGoal, hydrationTarget: hydrationTarget, fontStyle: fontStyle });
              setIsSettingsModalOpen(true);
            }}
            className="p-2 rounded-full bg-[#18181b] text-slate-300 hover:bg-slate-800 border border-slate-800 transition-all"
            title="Open Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Profile Avatar */}
          <div 
            onClick={() => setIsSettingsModalOpen(true)}
            className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-emerald-400 overflow-hidden cursor-pointer shadow-md flex items-center justify-center text-white font-bold text-sm"
            title="Yadhu Krishnan Profile"
          >
            YK
          </div>
        </div>
      </div>

      {/* 2. MAIN RED STREAK CARD BANNER (Match Uploaded Screenshot UI) */}
      <div className="px-5 mb-5">
        <div className="w-full bg-gradient-to-r from-red-900 via-rose-900 to-red-950 border border-rose-800/80 rounded-3xl p-5 shadow-2xl flex items-center justify-between text-white relative overflow-hidden">
          <div className="flex items-center gap-3.5 z-10">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Flame className="w-8 h-8 text-rose-300 animate-pulse" />
            </div>
            <div>
              <div className="text-3xl font-extrabold font-mono tracking-tight">{streakDays}</div>
              <span className="text-xs font-mono text-rose-200 uppercase tracking-widest">Day Streak</span>
            </div>
          </div>

          <button
            onClick={() => setStreakDays(prev => prev + 1)}
            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-mono font-bold text-white transition-all shadow-md z-10 border border-white/30"
          >
            Keep Going!
          </button>
        </div>
      </div>

      {/* 3. THREE STAT RECTANGULAR CARDS ROW (XP, Workouts, Active Mins) */}
      <div className="px-5 mb-5 grid grid-cols-3 gap-3">
        {/* Card 1: Total XP */}
        <div 
          onClick={() => openQuickLog('burn')}
          className={`p-3.5 rounded-2xl border text-center space-y-1 cursor-pointer transition-all hover:scale-105 ${cardBgClass}`}
        >
          <Flame className="w-5 h-5 mx-auto text-orange-400" />
          <div className="text-base font-extrabold font-mono text-white">{totalXp}</div>
          <span className={`text-[10px] font-mono uppercase block ${mutedTextClass}`}>Total XP</span>
        </div>

        {/* Card 2: Workouts Logged */}
        <div 
          onClick={() => setActiveTab('workout')}
          className={`p-3.5 rounded-2xl border text-center space-y-1 cursor-pointer transition-all hover:scale-105 ${cardBgClass}`}
        >
          <Dumbbell className="w-5 h-5 mx-auto text-emerald-400" />
          <div className="text-base font-extrabold font-mono text-white">{workouts.length}</div>
          <span className={`text-[10px] font-mono uppercase block ${mutedTextClass}`}>Workouts</span>
        </div>

        {/* Card 3: Active Mins */}
        <div 
          onClick={() => setIsAnalyticsModalOpen(true)}
          className={`p-3.5 rounded-2xl border text-center space-y-1 cursor-pointer transition-all hover:scale-105 ${cardBgClass}`}
        >
          <Clock className="w-5 h-5 mx-auto text-cyan-400" />
          <div className="text-base font-extrabold font-mono text-white">35</div>
          <span className={`text-[10px] font-mono uppercase block ${mutedTextClass}`}>Minutes</span>
        </div>
      </div>

      {/* 4. FOUR VIBRANT CIRCULAR ACTION BUTTONS ROW (Yellow 🟡, White ⚪, Dark Ring ⚫, Red 🔴) */}
      <div className="px-5 mb-6 flex items-center justify-between">
        {/* Yellow Circle: Workout */}
        <button
          onClick={() => {
            triggerClickSound();
            setActiveTab('workout');
          }}
          className="w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative"
          title="Workout Activities"
        >
          <Dumbbell className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-mono font-bold flex items-center justify-center border border-slate-950">
            ★
          </span>
        </button>

        {/* White Circle: Food & Nutrition */}
        <button
          onClick={() => {
            triggerClickSound();
            setActiveTab('food');
          }}
          className="w-16 h-16 rounded-full bg-slate-100 hover:bg-white text-slate-950 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Meals & Nutrition"
        >
          <UtensilsCrossed className="w-7 h-7 text-red-600" />
        </button>

        {/* Dark Ring Circle: Hydration */}
        <button
          onClick={() => openQuickLog('hydration')}
          className="w-16 h-16 rounded-full bg-[#18181b] border-2 border-slate-700 hover:border-blue-400 text-blue-400 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Hydration Intake"
        >
          <Droplets className="w-7 h-7" />
        </button>

        {/* Red Circle: Challenges & Goals */}
        <button
          onClick={() => {
            triggerClickSound();
            setActiveTab('goals');
          }}
          className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Goals & Challenges"
        >
          <Trophy className="w-7 h-7" />
        </button>
      </div>

      {/* 5. QUICK START FEATURED CARD BANNER (Matches Screenshot UI) */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-300">Quick Start</h2>
          <button onClick={() => setIsAnalyticsModalOpen(true)} className="text-xs font-mono text-rose-500 hover:underline">View All</button>
        </div>

        <div className="w-full rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-slate-800 p-5 shadow-2xl relative overflow-hidden space-y-3">
          {/* Top Badges */}
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> +10 XP
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-300 flex items-center gap-1">
              <Clock className="w-3 h-3" /> 5 min
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 0% Completed
            </span>
          </div>

          <div>
            <h3 className="text-xl font-serif font-extrabold text-white tracking-tight leading-tight">
              Fitness Training, Rewritten.
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Daily Circuit • Part 1 • Lesson 1
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button 
              onClick={() => openQuickLog('burn')}
              className="w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            >
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. DAILY QUEST SECTION (Matches Screenshot UI) */}
      <div className="px-5 mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-300">Daily Quest</h2>
          <span className="text-xs font-mono text-slate-400">
            {dailyQuests.filter(q => q.completed).length} / {dailyQuests.length}
          </span>
        </div>

        <div className="space-y-2.5">
          {dailyQuests.map(quest => (
            <div 
              key={quest.id}
              onClick={() => toggleQuest(quest.id)}
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                quest.completed ? 'bg-emerald-950/20 border-emerald-800/60' : cardBgClass
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${quest.completed ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-bold font-mono ${quest.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                    {quest.title}
                  </div>
                  <span className={`text-[10px] ${mutedTextClass}`}>{quest.desc}</span>
                </div>
              </div>

              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                quest.completed ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'
              }`}>
                {quest.completed && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. FLOATING PILL BOTTOM NAVIGATION BAR (Matches Uploaded Screenshot UI) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-40">
        <div className="w-full bg-[#18181b]/90 backdrop-blur-xl border border-slate-800 rounded-full p-2.5 shadow-2xl flex items-center justify-around">
          {[
            { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
            { id: 'workout', label: 'Workout', icon: Dumbbell },
            { id: 'food', label: 'Food', icon: UtensilsCrossed },
            { id: 'goals', label: 'Goals', icon: Trophy }
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
                className={`p-2.5 rounded-full transition-all ${
                  isSelected 
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 scale-110' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. QUICK STAT LOGGER MODAL (HYDRATION, ACTIVE BURN, SUGAR CUT) */}
      {quickLogModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-md border rounded-3xl p-6 space-y-4 shadow-2xl ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {quickLogModal.type === 'hydration' && <Droplets className="w-5 h-5 text-blue-500" />}
                {quickLogModal.type === 'burn' && <Flame className="w-5 h-5 text-orange-500" />}
                {quickLogModal.type === 'sugar' && <Package className="w-5 h-5 text-emerald-500" />}
                <h3 className="text-base font-bold font-mono uppercase text-white">
                  {quickLogModal.type === 'hydration' && 'Log Water Hydration Intake'}
                  {quickLogModal.type === 'burn' && 'Log Calories Burned'}
                  {quickLogModal.type === 'sugar' && 'Log Refined Sugar Avoided'}
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setQuickLogModal({ isOpen: false, type: null })}
                className={`p-1 rounded-lg ${mutedTextClass}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* HYDRATION PRESET BUTTONS */}
            {quickLogModal.type === 'hydration' && (
              <div className="space-y-3 font-mono">
                <p className="text-xs text-slate-400">Select a quick intake portion or enter custom ml:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleAddHydrationMl(250)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-blue-500 ${subCardBgClass}`}
                  >
                    🥛 +250 ml <span className="text-[10px] text-blue-400 block font-normal">(Glass)</span>
                  </button>
                  <button
                    onClick={() => handleAddHydrationMl(500)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-blue-500 ${subCardBgClass}`}
                  >
                    🧴 +500 ml <span className="text-[10px] text-blue-400 block font-normal">(Bottle)</span>
                  </button>
                  <button
                    onClick={() => handleAddHydrationMl(750)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-blue-500 ${subCardBgClass}`}
                  >
                    🧃 +750 ml <span className="text-[10px] text-blue-400 block font-normal">(Sipper)</span>
                  </button>
                  <button
                    onClick={() => handleAddHydrationMl(1000)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-blue-500 ${subCardBgClass}`}
                  >
                    🧪 +1,000 ml <span className="text-[10px] text-blue-400 block font-normal">(Flask)</span>
                  </button>
                </div>

                <div className="pt-2 flex gap-2">
                  <input
                    type="number"
                    placeholder="Custom ml (e.g. 350)"
                    value={customQuickValue}
                    onChange={e => setCustomQuickValue(e.target.value)}
                    className={`flex-1 px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${subCardBgClass}`}
                  />
                  <button
                    onClick={() => customQuickValue && handleAddHydrationMl(parseInt(customQuickValue))}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {/* ACTIVE BURN PRESET BUTTONS */}
            {quickLogModal.type === 'burn' && (
              <div className="space-y-3 font-mono">
                <p className="text-xs text-slate-400">Select a quick workout activity burn or enter custom kcal:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleAddActiveBurnKcal(100)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-orange-500 ${subCardBgClass}`}
                  >
                    🚶 +100 kcal <span className="text-[10px] text-orange-400 block font-normal">(15m Walk)</span>
                  </button>
                  <button
                    onClick={() => handleAddActiveBurnKcal(250)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-orange-500 ${subCardBgClass}`}
                  >
                    🏃 +250 kcal <span className="text-[10px] text-orange-400 block font-normal">(25m Run)</span>
                  </button>
                  <button
                    onClick={() => handleAddActiveBurnKcal(400)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-orange-500 ${subCardBgClass}`}
                  >
                    🚴 +400 kcal <span className="text-[10px] text-orange-400 block font-normal">(45m Cycle)</span>
                  </button>
                  <button
                    onClick={() => handleAddActiveBurnKcal(600)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-orange-500 ${subCardBgClass}`}
                  >
                    🏋️ +600 kcal <span className="text-[10px] text-orange-400 block font-normal">(Gym Session)</span>
                  </button>
                </div>

                <div className="pt-2 flex gap-2">
                  <input
                    type="number"
                    placeholder="Custom kcal (e.g. 180)"
                    value={customQuickValue}
                    onChange={e => setCustomQuickValue(e.target.value)}
                    className={`flex-1 px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:border-orange-500 ${subCardBgClass}`}
                  />
                  <button
                    onClick={() => customQuickValue && handleAddActiveBurnKcal(parseInt(customQuickValue))}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. SETTINGS & CLOUD SYNC MODAL */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <form onSubmit={handleSaveSettings} className={`relative w-full max-w-md border rounded-3xl p-6 space-y-5 shadow-2xl ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-bold font-mono uppercase text-white">User Settings &amp; Cloud Sync</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsSettingsModalOpen(false)}
                className={`p-1 rounded-lg ${mutedTextClass}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              
              {/* GitHub Repository Cloud Sync Section */}
              <div className={`p-3.5 rounded-2xl border space-y-2 font-mono ${subCardBgClass}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5 text-white">
                    <GitBranch className="w-4 h-4 text-emerald-500" /> GitHub Repository
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    {githubSyncStatus}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 space-y-1">
                  <div>Repo: <span className="text-emerald-300">yadhukrishnan7717-cloud/FitPulse.git</span></div>
                  <div>Branch: <span className="font-bold">main</span></div>
                </div>
                <button
                  type="button"
                  onClick={handleTriggerGithubSync}
                  disabled={isGithubSyncing}
                  className="w-full py-1.5 mt-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGithubSyncing ? 'animate-spin' : ''}`} />
                  <span>{isGithubSyncing ? 'Pushing to GitHub...' : 'Sync & Push Code to GitHub'}</span>
                </button>
              </div>

              {/* Nothing Font Style Selector */}
              <div className="space-y-1.5">
                <label className={`text-[10px] font-mono uppercase block flex items-center gap-1 ${mutedTextClass}`}>
                  <Type className="w-3.5 h-3.5 text-emerald-500" /> Typography &amp; Font Engine
                </label>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  {[
                    { id: 'nothing', label: 'NOTHING OS' },
                    { id: 'inter', label: 'INTER SANS' },
                    { id: 'mono', label: 'MONOSPACE' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        triggerClickSound();
                        setSettingsForm({ ...settingsForm, fontStyle: f.id });
                      }}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                        settingsForm.fontStyle === f.id
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : `${subCardBgClass} ${mutedTextClass}`
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Height & Weight Settings */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 flex items-center gap-1 ${mutedTextClass}`}>
                    <Ruler className="w-3.5 h-3.5 text-emerald-500" /> Body Height (cm)
                  </label>
                  <input 
                    type="number"
                    step="0.5"
                    value={settingsForm.height}
                    onChange={e => setSettingsForm({ ...settingsForm, height: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                  />
                </div>

                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 flex items-center gap-1 ${mutedTextClass}`}>
                    <Scale className="w-3.5 h-3.5 text-emerald-500" /> Body Weight (kg)
                  </label>
                  <input 
                    type="number"
                    step="0.1"
                    value={settingsForm.weight}
                    onChange={e => setSettingsForm({ ...settingsForm, weight: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                  />
                </div>
              </div>

              {/* Calorie & Hydration Targets */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Calorie Goal (kcal)</label>
                  <input 
                    type="number"
                    value={settingsForm.calorieGoal}
                    onChange={e => setSettingsForm({ ...settingsForm, calorieGoal: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                  />
                </div>

                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Water Target (ml)</label>
                  <input 
                    type="number"
                    value={settingsForm.hydrationTarget}
                    onChange={e => setSettingsForm({ ...settingsForm, hydrationTarget: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                  />
                </div>
              </div>

              {/* Quick Settings Toggles */}
              <div className={`p-3 rounded-2xl border space-y-2.5 ${subCardBgClass}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono">Theme Mode</span>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1 border ${
                      isDarkMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-indigo-600 text-white border-indigo-700'
                    }`}
                  >
                    {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-amber-200" />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono">Click Audio Feedback</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSoundEnabled(!isSoundEnabled);
                      triggerClickSound();
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1 border ${
                      isSoundEnabled ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span>{isSoundEnabled ? 'Sound ON' : 'Sound OFF'}</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save &amp; Update Settings
            </button>
          </form>
        </div>
      )}

      {/* 10. DEDICATED GRAPH ANALYTICS MODAL */}
      {isAnalyticsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-2xl border rounded-3xl p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold font-sans flex items-center gap-2 text-white">
                    DEDICATED GRAPH ANALYTICS
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">LIVE</span>
                  </h3>
                  <p className={`text-xs font-mono ${mutedTextClass}`}>Performance Metrics &amp; Calorie Burn Breakdown</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAnalyticsModalOpen(false)}
                className={`p-2 rounded-xl hover:bg-slate-800 ${mutedTextClass}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl border bg-black border-slate-800">
              <span className="text-xs font-mono font-bold uppercase text-slate-300">Time Range:</span>
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
                        : `${mutedTextClass} hover:text-white`
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-5 rounded-2xl border space-y-3 ${subCardBgClass}`}>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-orange-500 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> Calorie Burn Trend ({graphTimeRange})
                </span>
                <span className="font-bold text-white">Max: {maxCalorieValue} kcal</span>
              </div>
              <div className="h-40 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-800 pb-2">
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
          </div>
        </div>
      )}

    </div>
  );
};
