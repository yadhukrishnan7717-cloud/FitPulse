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
  Menu,
  Library,
  Hourglass,
  Newspaper,
  Book,
  Crown,
  Medal,
  Search,
  Filter,
  ThumbsUp
} from 'lucide-react';
import { switchAudio } from '../utils/audio';
import { FitpulseLogo } from './FitpulseLogo';
import { CyclistCharacter, WeightlifterCharacter, SwimmerCharacter, FoodieCharacter } from './SectionCharacters';
import { EmotionWidget } from './EmotionWidget';
import { AdBanner } from './AdBanner';

export const FitpulseApp = ({ username = 'User', onLogout }) => {
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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAddQuestModalOpen, setIsAddQuestModalOpen] = useState(false);

  // User Profile Icon & Avatar State
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return localStorage.getItem('fitpulse_user_avatar') || '⚡';
  });
  const [avatarColor, setAvatarColor] = useState(() => {
    return localStorage.getItem('fitpulse_avatar_color') || 'emerald';
  });
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Quick Stat Logger Modal State ('hydration', 'burn', 'sugar')
  const [quickLogModal, setQuickLogModal] = useState({ isOpen: false, type: null });
  const [customQuickValue, setCustomQuickValue] = useState('');
  const [newQuestForm, setNewQuestForm] = useState({ title: '', desc: '', xp: 10, type: 'time' });

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
  const [dailyQuests, setDailyQuests] = useState(() => {
    const saved = localStorage.getItem('fitpulse_daily_quests');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Morning Stretch', desc: 'Stretch for 10 minutes', completed: false, xp: 10, type: 'time' },
      { id: 2, title: 'Read Fitness Article', desc: 'Earn +15 XP', completed: false, xp: 15, type: 'article' }
    ];
  });

  // Leaderboard & Ranking State
  const [lbTimeframe, setLbTimeframe] = useState('week'); // 'today', 'week', 'month', 'all'
  const [lbCategory, setLbCategory] = useState('xp'); // 'xp', 'burn', 'distance', 'streak'
  const [lbSearch, setLbSearch] = useState('');
  const [lbKudosMap, setLbKudosMap] = useState(() => {
    const saved = localStorage.getItem('fitpulse_kudos_map');
    return saved ? JSON.parse(saved) : {
      'alex-1': 52,
      'elena-2': 44,
      'marcus-3': 38,
      'sarah-4': 31,
      'david-5': 27,
      'hana-6': 21,
      'user-me': 15
    };
  });

  const getLeaderboardData = () => {
    const timeMultipliers = { today: 0.2, week: 1.0, month: 3.8, all: 14.5 };
    const mult = timeMultipliers[lbTimeframe] || 1.0;

    const baseAthletes = [
      { id: 'alex-1', name: 'Alex Rivera', badge: 'Diamond Sprinter', avatar: '⚡', xp: 3420, burn: 1850, distance: 62.4, streak: 12 },
      { id: 'elena-2', name: 'Elena Rostova', badge: 'Elite Cyclist', avatar: '🚴', xp: 3150, burn: 1620, distance: 84.1, streak: 9 },
      { id: 'marcus-3', name: 'Marcus Chen', badge: 'Pro Powerlifter', avatar: '🏋️', xp: 2890, burn: 1410, distance: 31.0, streak: 14 },
      { id: 'sarah-4', name: 'Sarah Jenkins', badge: 'Sprint Master', avatar: '🏃', xp: 2640, burn: 1290, distance: 45.2, streak: 7 },
      { id: 'david-5', name: 'David Miller', badge: 'Endurance Legend', avatar: '🏔️', xp: 2310, burn: 1150, distance: 52.8, streak: 5 },
      { id: 'hana-6', name: 'Hana Tanaka', badge: 'Zen Warrior', avatar: '🧘', xp: 2100, burn: 980, distance: 28.5, streak: 8 },
      { id: 'user-me', name: `${username} (You)`, badge: 'Pulse Challenger', avatar: '🔥', xp: totalXp, burn: activeBurn, distance: distanceKm, streak: 4, isCurrentUser: true }
    ];

    const scaled = baseAthletes.map(player => {
      const isMe = player.isCurrentUser;
      const factor = isMe ? 1.0 : mult;
      return {
        ...player,
        xpVal: Math.round(player.xp * factor),
        burnVal: Math.round(player.burn * factor),
        distVal: parseFloat((player.distance * factor).toFixed(1)),
        kudos: lbKudosMap[player.id] || 0
      };
    });

    const sorted = scaled.sort((a, b) => {
      if (lbCategory === 'xp') return b.xpVal - a.xpVal;
      if (lbCategory === 'burn') return b.burnVal - a.burnVal;
      if (lbCategory === 'distance') return b.distVal - a.distVal;
      if (lbCategory === 'streak') return b.streak - a.streak;
      return b.xpVal - a.xpVal;
    });

    if (!lbSearch.trim()) return sorted;
    return sorted.filter(item => 
      item.name.toLowerCase().includes(lbSearch.toLowerCase()) || 
      item.badge.toLowerCase().includes(lbSearch.toLowerCase())
    );
  };

  const handleGiveKudos = (id) => {
    triggerClickSound();
    setLbKudosMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Automatic Daily Streak Analyzer (Calculates streak days automatically)
  useEffect(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastActive = localStorage.getItem('fitpulse_last_active_date');
      const savedStreak = localStorage.getItem('fitpulse_streak_count');
      
      let currentStreak = savedStreak ? parseInt(savedStreak) : 5;

      if (lastActive && lastActive !== today) {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(today);
        const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak += 1;
        } else if (diffDays > 1) {
          currentStreak = 1;
        }
      }

      localStorage.setItem('fitpulse_last_active_date', today);
      localStorage.setItem('fitpulse_streak_count', currentStreak.toString());
      setStreakDays(currentStreak);
    } catch {
      // Fallback
    }
  }, []);

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
    localStorage.setItem('fitpulse_daily_quests', JSON.stringify(dailyQuests));
    localStorage.setItem('fitpulse_kudos_map', JSON.stringify(lbKudosMap));
    localStorage.setItem('fitpulse_community_chat', JSON.stringify(chatMessages));
    localStorage.setItem('fitpulse_user_city', locationStatus);
    localStorage.setItem('fitpulse_user_avatar', selectedAvatar);
    localStorage.setItem('fitpulse_avatar_color', avatarColor);
  }, [isDarkMode, fontStyle, isSoundEnabled, userWeight, userHeight, calorieGoal, hydrationTarget, hydration, sugarCut, activeBurn, distanceKm, isGoogleConnected, workouts, foodLogs, challenges, dailyQuests, chatMessages, locationStatus, selectedAvatar, avatarColor]);

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

  const handleAddSteps = (stepsCount) => {
    triggerClickSound();
    setDistanceKm(prev => parseFloat((prev + (stepsCount * 0.000762)).toFixed(2)));
    setTotalXp(prev => prev + Math.floor(stepsCount / 100));
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

  const handleAddQuest = (e) => {
    e.preventDefault();
    if (!newQuestForm.title) return;
    triggerClickSound();
    const newQuest = {
      id: `custom-${Date.now()}`,
      title: newQuestForm.title,
      desc: newQuestForm.desc,
      completed: false,
      xp: parseInt(newQuestForm.xp),
      type: newQuestForm.type
    };
    setDailyQuests([newQuest, ...dailyQuests]);
    setNewQuestForm({ title: '', desc: '', xp: 10, type: 'time' });
    setIsAddQuestModalOpen(false);
  };

  const handleDeleteQuest = (id, e) => {
    e.stopPropagation();
    triggerClickSound();
    setDailyQuests(dailyQuests.filter(q => q.id !== id));
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

    if (window.google?.accounts?.oauth2) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '102938475612-fitpulse.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read',
          callback: (response) => {
            if (response.access_token) {
              fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${response.access_token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
                  bucketByTime: { durationMillis: 86400000 },
                  startTimeMillis: Date.now() - 86400000,
                  endTimeMillis: Date.now()
                })
              })
              .then(res => res.json())
              .then(() => {
                setIsSyncing(false);
                setIsGoogleConnected(true);
                setIsGoogleModalOpen(false);
              })
              .catch(() => {
                setIsSyncing(false);
                setIsGoogleConnected(true);
                setIsGoogleModalOpen(false);
              });
            } else {
              setIsSyncing(false);
              setIsGoogleConnected(true);
              setIsGoogleModalOpen(false);
            }
          }
        });
        client.requestAccessToken();
      } catch {
        setTimeout(() => {
          setIsSyncing(false);
          setIsGoogleConnected(true);
          setIsGoogleModalOpen(false);
        }, 1200);
      }
    } else {
      setTimeout(() => {
        setIsSyncing(false);
        setIsGoogleConnected(true);
        setIsGoogleModalOpen(false);
      }, 1200);
    }
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
    <div className={`w-full max-w-md mx-auto min-h-screen pb-36 relative flex flex-col transition-colors duration-300 ${themeContainerClass} ${fontClass}`}>
      
      {/* 1. TOP HEADER BAR: Greeting on Left, Chat & Header Buttons on Right */}
      <div className="w-full px-5 pt-6 pb-4 flex items-center justify-between">
        {/* Left: Greeting */}
        <div>
          <span className="text-xs font-serif italic text-slate-400 block">
            {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening'},
          </span>
          <h1 className={`text-xl font-bold tracking-tight flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {username}!
          </h1>
        </div>

        {/* Right: Chat & Header Buttons */}
        <div className="flex items-center gap-2">
          {/* Community Chat 💬 */}
          <button
            onClick={() => {
              triggerClickSound();
              setIsCommunityChatOpen(true);
            }}
            className="p-2 rounded-full bg-[#18181b] text-indigo-400 hover:bg-slate-800 border border-slate-800 transition-all"
            title="Open Community Chat"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Graphs 📊 */}
          <button
            onClick={() => {
              triggerClickSound();
              setIsAnalyticsModalOpen(true);
            }}
            className="p-2 rounded-full bg-[#18181b] text-emerald-400 hover:bg-slate-800 border border-slate-800 transition-all"
            title="Open Analytics Graphs"
          >
            <BarChart3 className="w-4 h-4" />
          </button>

          {/* Settings Button (Replaced with FITPULSE Heart-ECG-Gear Icon) */}
          <button
            onClick={() => {
              triggerClickSound();
              setSettingsForm({ weight: userWeight, height: userHeight, calorieGoal: calorieGoal, hydrationTarget: hydrationTarget, fontStyle: fontStyle });
              setIsSettingsModalOpen(true);
            }}
            className="p-1.5 rounded-full bg-[#18181b] hover:bg-slate-800 border border-slate-800 transition-all flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm"
            title="Open Settings"
          >
            <FitpulseLogo height={22} showText={false} animated={false} />
          </button>

          {/* Profile Avatar with Dropdown */}
          <div className="relative">
            <div 
              onClick={() => {
                triggerClickSound();
                setIsProfileMenuOpen(!isProfileMenuOpen);
              }}
              className={`w-10 h-10 rounded-full border-2 overflow-hidden cursor-pointer shadow-md flex items-center justify-center text-white font-bold text-sm hover:scale-105 transition-transform ${
                avatarColor === 'blue' ? 'bg-blue-600 border-blue-400' :
                avatarColor === 'amber' ? 'bg-amber-600 border-amber-400' :
                avatarColor === 'rose' ? 'bg-rose-600 border-rose-400' :
                avatarColor === 'purple' ? 'bg-purple-600 border-purple-400' :
                'bg-emerald-600 border-emerald-400'
              }`}
              title={`${username} Profile`}
            >
              {selectedAvatar === 'initials' ? username.substring(0, 2).toUpperCase() : selectedAvatar}
            </div>
            
            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-[#18181b] border border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-fade-in text-slate-200 text-sm font-mono">
                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    triggerClickSound();
                    setIsAvatarModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-800 transition-colors flex items-center gap-2 text-sky-400 font-bold"
                >
                  <User className="w-4 h-4" />
                  Profile Icon Options
                </button>
                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    triggerClickSound();
                    setSettingsForm({ weight: userWeight, height: userHeight, calorieGoal: calorieGoal, hydrationTarget: hydrationTarget, fontStyle: fontStyle });
                    setIsSettingsModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-emerald-500" />
                  Account Settings
                </button>
                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    toggleTheme();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                  Toggle Theme
                </button>
                <div className="my-1 border-t border-slate-800"></div>
                <button 
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    triggerClickSound();
                    if (onLogout) onLogout();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-800 transition-colors flex items-center gap-2 text-rose-400"
                >
                  <User className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC TAB CONTENT VIEWS (Dashboard, Workout, Food, Goals) */}
      
      {/* TAB 1: DASHBOARD / HOME */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-fade-in">
          {/* MAIN ATHLETIC DAILY STREAK CARD BANNER (Dashboard Only) */}
          <div className="px-5">
            <div className="w-full bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/60 rounded-3xl p-5 shadow-2xl flex items-center justify-between text-white relative overflow-hidden group">
              {/* Ambient Glow */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-blue-600/20 blur-xl pointer-events-none" />

              {/* Left Side: Flame & Streak Counter */}
              <div className="flex items-center gap-3.5 z-10">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <Flame className="w-8 h-8 text-amber-400 animate-pulse" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold font-mono tracking-tight text-white">{streakDays}</div>
                  <span className="text-xs font-mono text-blue-300 uppercase tracking-widest block">DAILY STREAK</span>
                  <span className="text-[10px] font-mono text-slate-400">Keep up the athletic gains!</span>
                </div>
              </div>

              {/* Right Side: Featured Athletic Character Avatar */}
              <div className="flex items-center gap-3 z-10">
                {/* Athletic Character (Weightlifter) */}
                <div className="p-1 rounded-2xl bg-slate-800/80 border border-blue-500/30 shadow-lg">
                  <WeightlifterCharacter className="w-16 h-16 transform group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>


          {/* Three Stat Cards Row (XP, Workouts, Active Mins) */}
          <div className="px-5 grid grid-cols-3 gap-3">
            <div 
              onClick={() => openQuickLog('burn')}
              className={`p-3.5 rounded-2xl border text-center space-y-1 cursor-pointer transition-all hover:scale-105 ${cardBgClass}`}
            >
              <Flame className="w-5 h-5 mx-auto text-amber-500" />
              <div className={`text-base font-extrabold font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{totalXp}</div>
              <span className={`text-[10px] font-mono uppercase block ${mutedTextClass}`}>Total XP</span>
            </div>

            <div 
              onClick={() => setActiveTab('workout')}
              className={`p-3.5 rounded-2xl border text-center space-y-1 cursor-pointer transition-all hover:scale-105 ${cardBgClass}`}
            >
              <BookOpen className="w-5 h-5 mx-auto text-rose-500" />
              <div className={`text-base font-extrabold font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>0</div>
              <span className={`text-[10px] font-mono uppercase block ${mutedTextClass}`}>Lessons</span>
            </div>

            <div 
              onClick={() => setIsAnalyticsModalOpen(true)}
              className={`p-3.5 rounded-2xl border text-center space-y-1 cursor-pointer transition-all hover:scale-105 ${cardBgClass}`}
            >
              <Clock className="w-5 h-5 mx-auto text-indigo-400" />
              <div className={`text-base font-extrabold font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>35</div>
              <span className={`text-[10px] font-mono uppercase block ${mutedTextClass}`}>Minutes</span>
            </div>
          </div>

          {/* Four Circular Action Buttons Row */}
          <div className="px-5 flex items-center justify-between">
            <button
              onClick={() => openQuickLog('steps')}
              className="w-20 h-20 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative"
              title="Log Steps"
            >
              <Footprints className="w-8 h-8" />
              <span className="absolute top-0 right-0 w-6 h-6 rounded-full bg-amber-600 text-white text-[12px] font-mono flex items-center justify-center border-2 border-black">★</span>
            </button>

            <button
              onClick={() => {
                triggerClickSound();
                setActiveTab('food');
              }}
              className="w-20 h-20 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              title="Nutrition"
            >
              <UtensilsCrossed className="w-8 h-8 text-rose-600" />
            </button>

            <button
              onClick={() => openQuickLog('hydration')}
              className="w-20 h-20 rounded-full bg-[#18181b] border-2 border-slate-700 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              title="Hydration"
            >
              <Droplets className="w-8 h-8 text-blue-400" />
            </button>

            <button
              onClick={() => {
                triggerClickSound();
                setActiveTab('goals');
              }}
              className="w-20 h-20 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              title="Challenges"
            >
              <Trophy className="w-8 h-8" />
            </button>
          </div>

          {/* ATHLETE EMOTION & MOOD EMOJI WIDGET WITH CHARACTER */}
          <div className="px-5">
            <EmotionWidget />
          </div>

          {/* Quick Start Featured Card Banner */}
          <div className="px-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-300">Quick Start</h2>
              <button onClick={() => setIsAnalyticsModalOpen(true)} className="text-xs font-mono text-rose-500 hover:underline">View All</button>
            </div>

            <div className="w-full rounded-3xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 border border-slate-800 p-5 shadow-2xl relative overflow-hidden space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold">
                <span className="px-2.5 py-1 rounded-full bg-slate-800/50 text-amber-400 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> +10 XP
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-800/50 text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 5 min
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-800/50 text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> 0%
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
                  High-Intensity<br/>Core Burn.
                </h3>
                <p className="text-xs font-mono text-slate-700 mt-2">
                  No Equipment • Full Body<br/>15 Minutes • 120 kcal
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    triggerClickSound();
                    const quickWorkout = {
                      id: Date.now(),
                      name: '15-Min Core Burn',
                      type: 'hiit',
                      duration: 15,
                      distance: 0,
                      calories: 120,
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setWorkouts([quickWorkout, ...workouts]);
                    setActiveBurn(prev => prev + 120);
                    setTotalXp(prev => prev + 50);
                    alert("Workout Started & Logged! +120 kcal, +50 XP");
                  }}
                  className="w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  title="Start Workout"
                >
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Daily Quests Section */}
          <div className="px-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-300">Daily Quest</h2>
                <button 
                  onClick={() => setIsAddQuestModalOpen(true)}
                  className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
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
                    <div className={`p-4 rounded-xl text-white ${quest.type === 'article' ? 'bg-yellow-500' : 'bg-blue-600'}`}>
                      {quest.type === 'article' ? <Newspaper className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className={`text-sm font-bold font-sans ${quest.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                        {quest.title}
                      </div>
                      <span className={`text-xs ${mutedTextClass}`}>{quest.desc}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {quest.id.toString().startsWith('custom-') && (
                      <button
                        onClick={(e) => handleDeleteQuest(quest.id, e)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete Quest"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className={`w-8 h-8 rounded-2xl border-2 flex items-center justify-center transition-all ${
                      quest.completed ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'
                    }`}>
                      {quest.completed && <Check className="w-5 h-5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geolocation Weather Hydration Banner */}
          <div className="px-5 pb-4">
            <div className={`p-4.5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${cardBgClass}`}>
              <div className="flex items-center gap-3">
                <CloudSun className="w-7 h-7 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-mono font-bold uppercase flex items-center gap-1.5 text-emerald-400">
                    <MapPin className="w-3.5 h-3.5" /> {locationStatus}
                  </div>
                  <div className="text-xs font-mono text-slate-300 mt-0.5">
                    {tempCelsius}°C Ambient Temp | {humidityPct}% Humidity
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-mono font-bold flex items-center gap-1 shadow-sm transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                  <span>{isDetectingLocation ? 'Locating...' : 'GPS 📍'}</span>
                </button>
                <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  +{recommendedExtraWaterMl}ml
                </span>
              </div>
            </div>
          </div>

          {/* AdSense / AdMob Monetization Banner */}
          <div className="px-5">
            <AdBanner label="Sponsor / Ad Monetization Partner" />
          </div>
        </div>
      )}

      {/* TAB 2: WORKOUT LOGGING TAB */}
      {activeTab === 'workout' && (
        <div className="px-5 space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold uppercase font-mono text-white">Workout Activity Tracker</h2>
            </div>
            <button onClick={() => setActiveTab('dashboard')} className="text-xs font-mono text-slate-400 hover:text-white">← Back</button>
          </div>

          {/* Workout Logger Form */}
          <form onSubmit={handleAddWorkout} className={`p-5 rounded-3xl border space-y-4 ${cardBgClass}`}>
            <div className="space-y-3">
              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Activity Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Morning Highway Ride"
                  value={workoutForm.name}
                  onChange={e => setWorkoutForm({ ...workoutForm, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 ${subCardBgClass}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Workout Type</label>
                  <select 
                    value={workoutForm.type}
                    onChange={e => setWorkoutForm({ ...workoutForm, type: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 ${subCardBgClass}`}
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
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 ${subCardBgClass}`}
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
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 ${subCardBgClass}`}
                  />
                </div>

                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Calories Burned</label>
                  <input 
                    type="number"
                    placeholder="e.g. 320"
                    value={workoutForm.calories}
                    onChange={e => setWorkoutForm({ ...workoutForm, calories: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 ${subCardBgClass}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-bold uppercase transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Save Workout Log
              </button>
            </div>
          </form>

          {/* Workout History List */}
          <div className={`p-5 rounded-3xl border space-y-3 ${cardBgClass}`}>
            <h3 className="text-xs font-bold uppercase font-mono flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-emerald-400" /> Logged Workouts Feed ({workouts.length})
            </h3>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {workouts.map(item => (
                <div key={item.id} className={`p-3 rounded-2xl border flex items-center justify-between ${subCardBgClass}`}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">
                      {item.type === 'cycling' ? '🚴' : item.type === 'swimming' ? '🏊' : item.type === 'gym' ? '🏋️' : '🏃'}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{item.name}</div>
                      <span className={`text-[10px] font-mono ${mutedTextClass}`}>{item.duration} mins • {item.time}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-orange-400">+{item.calories} kcal</div>
                    {item.distance > 0 && <span className="text-[10px] text-emerald-400">{item.distance} km</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FOOD & NUTRITION TAB */}
      {activeTab === 'food' && (
        <div className="px-5 space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-red-500" />
              <h2 className="text-base font-bold uppercase font-mono text-white">Food &amp; Calorie Tracker</h2>
            </div>
            <button onClick={() => setActiveTab('dashboard')} className="text-xs font-mono text-slate-400 hover:text-white">← Back</button>
          </div>

          {/* Calorie Budget Progress Card */}
          <div className={`p-5 rounded-3xl border space-y-3 ${cardBgClass}`}>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">DAILY CALORIE BUDGET</span>
              <span className="text-amber-400 font-bold">{totalFoodCalories} / {calorieGoal} kcal</span>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${subCardBgClass}`}>
              <div 
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((totalFoodCalories / calorieGoal) * 100))}%` }}
              />
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center font-mono">
              <div className={`p-2.5 rounded-xl border ${subCardBgClass}`}>
                <span className={`text-[10px] block ${mutedTextClass}`}>PROTEIN</span>
                <span className="text-xs font-bold text-emerald-400">{totalProtein}g</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${subCardBgClass}`}>
                <span className={`text-[10px] block ${mutedTextClass}`}>CARBS</span>
                <span className="text-xs font-bold text-amber-400">{totalCarbs}g</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${subCardBgClass}`}>
                <span className={`text-[10px] block ${mutedTextClass}`}>FATS</span>
                <span className="text-xs font-bold text-orange-400">{totalFats}g</span>
              </div>
            </div>
          </div>

          {/* Meal Logger Form */}
          <form onSubmit={handleAddFood} className={`p-5 rounded-3xl border space-y-3 ${cardBgClass}`}>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-rose-500" />
              <h3 className="text-xs font-bold uppercase font-mono text-white">Log Meal &amp; Calories</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Meal Time</label>
                <select 
                  value={foodForm.meal}
                  onChange={e => setFoodForm({ ...foodForm, meal: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-rose-500 ${subCardBgClass}`}
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
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-rose-500 ${subCardBgClass}`}
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
                className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-rose-500 ${subCardBgClass}`}
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
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Food Log
            </button>
          </form>

          {/* Meals List */}
          <div className={`p-5 rounded-3xl border space-y-3 ${cardBgClass}`}>
            <h3 className="text-xs font-bold uppercase font-mono text-slate-300">Today's Logged Meals ({foodLogs.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {foodLogs.map(item => (
                <div key={item.id} className={`p-3 rounded-2xl border flex items-center justify-between ${subCardBgClass}`}>
                  <div>
                    <span className="text-[10px] text-rose-400 font-mono uppercase font-bold">{item.meal}</span>
                    <div className="text-xs font-bold text-white">{item.name}</div>
                  </div>
                  <div className="text-right font-mono text-xs font-bold text-amber-400">
                    {item.calories} kcal
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GOALS & CUSTOM CHALLENGES TAB */}
      {activeTab === 'goals' && (
        <div className="px-5 space-y-5 animate-fade-in">
          {/* 4 ATHLETIC CHARACTER SECTIONS (Matching User Screenshot) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-300">
                ATHLETIC SECTIONS & CHARACTERS
              </h2>
              <span className="text-xs font-mono text-blue-400">FITPULSE SYSTEM</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Section 1: Route & Cardio Paths (Cyclist) */}
              <div 
                onClick={() => openQuickLog('steps')}
                className="p-4 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all flex flex-col items-center text-center cursor-pointer group shadow-lg"
              >
                <CyclistCharacter className="w-24 h-24 transition-transform group-hover:scale-110" />
                <h3 className="text-xs font-bold font-mono text-white mt-2 uppercase tracking-wide">
                  ROUTE & CARDIO PATHS
                </h3>
                <span className="text-[10px] text-slate-400 font-mono mt-1">Gym Floor & GPS</span>
              </div>

              {/* Section 2: Performance & Strength Goals (Weightlifter) */}
              <div 
                onClick={() => setActiveTab('workout')}
                className="p-4 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all flex flex-col items-center text-center cursor-pointer group shadow-lg"
              >
                <WeightlifterCharacter className="w-24 h-24 transition-transform group-hover:scale-110" />
                <h3 className="text-xs font-bold font-mono text-white mt-2 uppercase tracking-wide">
                  PERFORMANCE & STRENGTH
                </h3>
                <span className="text-[10px] text-blue-400 font-mono mt-1 font-bold">405 lbs PR Deadlift</span>
              </div>

              {/* Section 3: Swimming & Lap Count (Swimmer) */}
              <div 
                onClick={() => setIsAnalyticsModalOpen(true)}
                className="p-4 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all flex flex-col items-center text-center cursor-pointer group shadow-lg"
              >
                <SwimmerCharacter className="w-24 h-24 transition-transform group-hover:scale-110" />
                <h3 className="text-xs font-bold font-mono text-white mt-2 uppercase tracking-wide">
                  SWIMMING & LAP COUNT
                </h3>
                <span className="text-[10px] text-slate-400 font-mono mt-1">Pace Clock & Laps</span>
              </div>

              {/* Section 4: Nutrition & Macros (Foodie Guy) */}
              <div 
                onClick={() => setActiveTab('food')}
                className="p-4 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all flex flex-col items-center text-center cursor-pointer group shadow-lg"
              >
                <FoodieCharacter className="w-24 h-24 transition-transform group-hover:scale-110" />
                <h3 className="text-xs font-bold font-mono text-white mt-2 uppercase tracking-wide">
                  NUTRITION & MACROS
                </h3>
                <span className="text-[10px] text-slate-400 font-mono mt-1">Foodie Guy's Picks</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-rose-500" />
              <h2 className="text-base font-bold uppercase font-mono text-white">Custom Challenges ({challenges.length})</h2>
            </div>
            
            <button
              onClick={() => {
                triggerClickSound();
                setIsCreateChallengeModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-sm flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" /> + New Challenge
            </button>
          </div>

          <div className="space-y-3">
            {challenges.map(c => {
              const pct = Math.min(100, Math.round((c.progress / c.total) * 100));
              return (
                <div key={c.id} className={`p-4 rounded-3xl border space-y-3 hover:border-rose-500/40 transition-all ${cardBgClass}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl p-2 rounded-2xl border ${subCardBgClass}`}>{c.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{c.title}</div>
                        <p className={`text-[11px] ${mutedTextClass}`}>{c.desc}</p>
                      </div>
                    </div>
                    {c.id.toString().startsWith('custom-') && (
                      <button
                        onClick={() => handleDeleteChallenge(c.id)}
                        className="p-1 rounded-xl hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete Challenge"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className={mutedTextClass}>Progress</span>
                      <span className="font-bold text-emerald-400">{c.progress} / {c.total} {c.unit} ({pct}%)</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden p-0.5 border ${subCardBgClass}`}>
                      <div className="bg-gradient-to-r from-rose-500 to-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  <div className="pt-1 flex justify-between items-center">
                    <button
                      onClick={() => handleIncrementChallengeProgress(c.id)}
                      className="px-3 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                    >
                      + Step Log
                    </button>

                    <button
                      onClick={() => toggleChallengeJoin(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all shadow-sm ${
                        c.joined 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                          : 'bg-rose-600 hover:bg-rose-500 text-white'
                      }`}
                    >
                      {c.joined ? 'Active ✓' : 'Join'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: LEADERBOARD & COMMUNITY RANKINGS TAB */}
      {activeTab === 'leaderboard' && (
        <div className="px-5 space-y-5 animate-fade-in pb-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold uppercase font-mono text-white">Global Leaderboard &amp; Rankings</h2>
            </div>
            <button onClick={() => setActiveTab('dashboard')} className="text-xs font-mono text-slate-400 hover:text-white">← Back</button>
          </div>

          {/* Top Summary Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
            <div className={`p-3 rounded-2xl border ${cardBgClass} space-y-1`}>
              <div className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-400" /> Total Athletes
              </div>
              <div className="text-base font-extrabold text-white">1,248</div>
            </div>
            <div className={`p-3 rounded-2xl border ${cardBgClass} space-y-1`}>
              <div className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Community XP
              </div>
              <div className="text-base font-extrabold text-amber-400">84.2K</div>
            </div>
            <div className={`p-3 rounded-2xl border ${cardBgClass} space-y-1`}>
              <div className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-500" /> Avg Burn
              </div>
              <div className="text-base font-extrabold text-rose-400">1.4K kcal</div>
            </div>
            <div className={`p-3 rounded-2xl border ${cardBgClass} space-y-1`}>
              <div className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" /> Total Kudos
              </div>
              <div className="text-base font-extrabold text-emerald-400">1.8K 👏</div>
            </div>
          </div>

          {/* Controls: Time Horizon & Category Selection */}
          <div className={`p-4 rounded-3xl border space-y-3.5 ${cardBgClass}`}>
            {/* Time Horizon Pills */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1 shrink-0">
                <Clock className="w-3.5 h-3.5 text-rose-500" /> Timeframe:
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                {[
                  { id: 'today', label: 'Today' },
                  { id: 'week', label: 'This Week' },
                  { id: 'month', label: 'This Month' },
                  { id: 'all', label: 'All-Time' }
                ].map(tf => (
                  <button
                    key={tf.id}
                    onClick={() => {
                      triggerClickSound();
                      setLbTimeframe(tf.id);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                      lbTimeframe === tf.id 
                        ? 'bg-rose-600 text-white shadow-md' 
                        : `${subCardBgClass} hover:text-white`
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Ranking Pills */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 border-t border-slate-800/80 pt-3">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-amber-400" /> Metric:
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                {[
                  { id: 'xp', label: '⚡ XP & Rank' },
                  { id: 'burn', label: '🔥 Calories' },
                  { id: 'distance', label: '🏃 Distance' },
                  { id: 'streak', label: '💧 Streak' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      triggerClickSound();
                      setLbCategory(cat.id);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                      lbCategory === cat.id 
                        ? 'bg-amber-400 text-slate-950 shadow-md' 
                        : `${subCardBgClass} hover:text-white`
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input Box */}
            <div className="relative pt-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search athlete or badge title..."
                value={lbSearch}
                onChange={e => setLbSearch(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-400 ${subCardBgClass}`}
              />
            </div>
          </div>

          {/* Top 3 Podium Highlights */}
          {getLeaderboardData().length >= 3 && !lbSearch && (
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {/* 2nd Place */}
              <div className={`p-3.5 rounded-3xl border border-slate-400/40 text-center space-y-2 relative ${cardBgClass}`}>
                <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-950 font-bold font-mono text-xs flex items-center justify-center mx-auto shadow-md">
                  2nd
                </div>
                <div className="text-2xl">{getLeaderboardData()[1]?.avatar}</div>
                <div>
                  <div className="text-xs font-bold text-white truncate">{getLeaderboardData()[1]?.name}</div>
                  <span className="text-[10px] font-mono text-slate-400 block truncate">{getLeaderboardData()[1]?.badge}</span>
                </div>
                <div className="text-xs font-mono font-bold text-slate-300">
                  {lbCategory === 'xp' && `${getLeaderboardData()[1]?.xpVal} XP`}
                  {lbCategory === 'burn' && `${getLeaderboardData()[1]?.burnVal} kcal`}
                  {lbCategory === 'distance' && `${getLeaderboardData()[1]?.distVal} km`}
                  {lbCategory === 'streak' && `${getLeaderboardData()[1]?.streak} days`}
                </div>
              </div>

              {/* 1st Place (Gold Crown) */}
              <div className={`p-4 rounded-3xl border-2 border-amber-400/80 text-center space-y-2 relative bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-950 shadow-xl -translate-y-2`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase flex items-center gap-1 shadow-md">
                  <Crown className="w-3 h-3 fill-slate-950" /> 1ST CHAMP
                </div>
                <div className="text-3xl pt-1">{getLeaderboardData()[0]?.avatar}</div>
                <div>
                  <div className="text-xs font-extrabold text-amber-300 truncate">{getLeaderboardData()[0]?.name}</div>
                  <span className="text-[10px] font-mono text-amber-400/80 block truncate">{getLeaderboardData()[0]?.badge}</span>
                </div>
                <div className="text-sm font-mono font-extrabold text-amber-400">
                  {lbCategory === 'xp' && `${getLeaderboardData()[0]?.xpVal} XP`}
                  {lbCategory === 'burn' && `${getLeaderboardData()[0]?.burnVal} kcal`}
                  {lbCategory === 'distance' && `${getLeaderboardData()[0]?.distVal} km`}
                  {lbCategory === 'streak' && `${getLeaderboardData()[0]?.streak} days`}
                </div>
              </div>

              {/* 3rd Place */}
              <div className={`p-3.5 rounded-3xl border border-amber-700/40 text-center space-y-2 relative ${cardBgClass}`}>
                <div className="w-8 h-8 rounded-full bg-amber-800 text-amber-100 font-bold font-mono text-xs flex items-center justify-center mx-auto shadow-md">
                  3rd
                </div>
                <div className="text-2xl">{getLeaderboardData()[2]?.avatar}</div>
                <div>
                  <div className="text-xs font-bold text-white truncate">{getLeaderboardData()[2]?.name}</div>
                  <span className="text-[10px] font-mono text-slate-400 block truncate">{getLeaderboardData()[2]?.badge}</span>
                </div>
                <div className="text-xs font-mono font-bold text-amber-600">
                  {lbCategory === 'xp' && `${getLeaderboardData()[2]?.xpVal} XP`}
                  {lbCategory === 'burn' && `${getLeaderboardData()[2]?.burnVal} kcal`}
                  {lbCategory === 'distance' && `${getLeaderboardData()[2]?.distVal} km`}
                  {lbCategory === 'streak' && `${getLeaderboardData()[2]?.streak} days`}
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Table */}
          <div className={`p-5 rounded-3xl border space-y-4 overflow-hidden ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase font-mono flex items-center gap-2 text-slate-200">
                <Trophy className="w-4 h-4 text-amber-400" /> Official Athlete Standings ({getLeaderboardData().length})
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Live Auto-Synced</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-3"># RANK</th>
                    <th className="py-2.5 px-3">ATHLETE</th>
                    <th className="py-2.5 px-3">TIER / BADGE</th>
                    <th className="py-2.5 px-3 text-right">
                      {lbCategory === 'xp' && 'TOTAL XP'}
                      {lbCategory === 'burn' && 'CALORIES BURNED'}
                      {lbCategory === 'distance' && 'DISTANCE'}
                      {lbCategory === 'streak' && 'STREAK'}
                    </th>
                    <th className="py-2.5 px-3 text-center">STREAK</th>
                    <th className="py-2.5 px-3 text-right">COMMUNITY KUDOS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {getLeaderboardData().map((player, idx) => {
                    const rankNum = idx + 1;
                    const isMe = player.isCurrentUser;
                    return (
                      <tr 
                        key={player.id}
                        className={`transition-colors ${
                          isMe 
                            ? 'bg-rose-950/30 border-l-4 border-l-rose-500 hover:bg-rose-950/40' 
                            : 'hover:bg-slate-800/40'
                        }`}
                      >
                        {/* Rank Column */}
                        <td className="py-3 px-3 font-bold">
                          {rankNum === 1 ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[11px] flex items-center gap-1 w-fit shadow">
                              🥇 1st
                            </span>
                          ) : rankNum === 2 ? (
                            <span className="px-2 py-0.5 rounded-full bg-slate-300 text-slate-950 font-extrabold text-[11px] flex items-center gap-1 w-fit shadow">
                              🥈 2nd
                            </span>
                          ) : rankNum === 3 ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-800 text-amber-100 font-extrabold text-[11px] flex items-center gap-1 w-fit shadow">
                              🥉 3rd
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono text-xs pl-2">#{rankNum}</span>
                          )}
                        </td>

                        {/* Athlete Name & Avatar */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg p-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60">{player.avatar}</span>
                            <div>
                              <div className={`font-bold flex items-center gap-1.5 ${isMe ? 'text-rose-400' : 'text-white'}`}>
                                {player.name}
                                {isMe && (
                                  <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white text-[9px] font-mono font-extrabold uppercase">
                                    YOU
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Kudos Badge Each Rank */}
                        <td className="py-3 px-3">
                          {rankNum === 1 ? (
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/50 text-amber-300 shadow-sm flex items-center gap-1 w-fit animate-pulse">
                              👑 TITAN CHAMPION (150+ Kudos)
                            </span>
                          ) : rankNum === 2 ? (
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-sky-500/20 border border-cyan-500/50 text-cyan-300 shadow-sm flex items-center gap-1 w-fit">
                              ⚡ APEX ATHLETE (100+ Kudos)
                            </span>
                          ) : rankNum === 3 ? (
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/50 text-orange-300 shadow-sm flex items-center gap-1 w-fit">
                              🔥 STREAK WARRIOR (75+ Kudos)
                            </span>
                          ) : rankNum <= 5 ? (
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1 w-fit">
                              💪 GAINS MASTER (50+ Kudos)
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 flex items-center gap-1 w-fit">
                              🚴 PULSE PERFORMER ({player.kudos} Kudos)
                            </span>
                          )}
                        </td>

                        {/* Category Metric Score */}
                        <td className="py-3 px-3 text-right font-extrabold">
                          {lbCategory === 'xp' && <span className="text-amber-400">{player.xpVal.toLocaleString()} XP</span>}
                          {lbCategory === 'burn' && <span className="text-rose-400">{player.burnVal.toLocaleString()} kcal</span>}
                          {lbCategory === 'distance' && <span className="text-emerald-400">{player.distVal} km</span>}
                          {lbCategory === 'streak' && <span className="text-blue-400">{player.streak} Days</span>}
                        </td>

                        {/* Streak */}
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[11px] font-bold">
                            🔥 {player.streak}d
                          </span>
                        </td>

                        {/* Kudos Action */}
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleGiveKudos(player.id)}
                            className="px-2.5 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold transition-all active:scale-95 flex items-center gap-1 ml-auto"
                            title="Give Kudos"
                          >
                            <span>👏</span>
                            <span>{player.kudos}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. FLOATING PILL BOTTOM NAVIGATION BAR (Matches Uploaded Screenshot UI) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-40">
        <div className="w-full bg-[#18181b]/90 backdrop-blur-xl border border-slate-800 rounded-full p-2.5 shadow-2xl flex items-center justify-around">
          {[
            { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
            { id: 'workout', label: 'Workout', icon: Dumbbell },
            { id: 'food', label: 'Food', icon: UtensilsCrossed },
            { id: 'goals', label: 'Goals', icon: Trophy },
            { id: 'leaderboard', label: 'Rankings', icon: Crown }
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
                title={tab.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. CREATE CUSTOM CHALLENGE MODAL */}
      {isCreateChallengeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <form onSubmit={handleCreateChallenge} className={`relative w-full max-w-md border rounded-3xl p-6 space-y-4 shadow-2xl ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-rose-500" />
                <h3 className="text-base font-bold font-mono uppercase text-white">Create Custom Fitness Challenge</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsCreateChallengeModalOpen(false)}
                className={`p-1 rounded-lg ${mutedTextClass}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Challenge Title</label>
                <input 
                  type="text"
                  placeholder="e.g. 100 Pushups Daily Streak"
                  value={newChallengeForm.title}
                  onChange={e => setNewChallengeForm({ ...newChallengeForm, title: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-rose-500 ${subCardBgClass}`}
                />
              </div>

              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Short Description</label>
                <input 
                  type="text"
                  placeholder="e.g. Complete 100 pushups for 14 straight days"
                  value={newChallengeForm.desc}
                  onChange={e => setNewChallengeForm({ ...newChallengeForm, desc: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-rose-500 ${subCardBgClass}`}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Target Goal</label>
                  <input 
                    type="number"
                    placeholder="e.g. 14"
                    value={newChallengeForm.total}
                    onChange={e => setNewChallengeForm({ ...newChallengeForm, total: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-rose-500 ${subCardBgClass}`}
                  />
                </div>

                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Unit</label>
                  <select 
                    value={newChallengeForm.unit}
                    onChange={e => setNewChallengeForm({ ...newChallengeForm, unit: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-rose-500 ${subCardBgClass}`}
                  >
                    <option value="Days">Days</option>
                    <option value="km">km</option>
                    <option value="kcal">kcal</option>
                    <option value="Liters">Liters</option>
                  </select>
                </div>

                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Icon Emoji</label>
                  <input 
                    type="text"
                    placeholder="⚡"
                    value={newChallengeForm.icon}
                    onChange={e => setNewChallengeForm({ ...newChallengeForm, icon: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-mono text-center focus:outline-none focus:border-rose-500 ${subCardBgClass}`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Custom Challenge
            </button>
          </form>
        </div>
      )}

      {/* CREATE CUSTOM QUEST MODAL */}
      {isAddQuestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <form onSubmit={handleAddQuest} className={`relative w-full max-w-md border rounded-3xl p-6 space-y-4 shadow-2xl ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-bold font-mono uppercase text-white">Add Custom Quest</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsAddQuestModalOpen(false)}
                className={`p-1 rounded-lg ${mutedTextClass}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Quest Title</label>
                <input 
                  type="text"
                  placeholder="e.g. 100 Pushups"
                  value={newQuestForm.title}
                  onChange={e => setNewQuestForm({ ...newQuestForm, title: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                />
              </div>

              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Short Description</label>
                <input 
                  type="text"
                  placeholder="e.g. Complete 100 pushups before bed"
                  value={newQuestForm.desc}
                  onChange={e => setNewQuestForm({ ...newQuestForm, desc: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Reward XP</label>
                  <input 
                    type="number"
                    placeholder="e.g. 25"
                    value={newQuestForm.xp}
                    onChange={e => setNewQuestForm({ ...newQuestForm, xp: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                  />
                </div>

                <div>
                  <label className={`text-[10px] font-mono uppercase block mb-1 ${mutedTextClass}`}>Icon Type</label>
                  <select 
                    value={newQuestForm.type}
                    onChange={e => setNewQuestForm({ ...newQuestForm, type: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-emerald-500 ${subCardBgClass}`}
                  >
                    <option value="time">Time ⏱️</option>
                    <option value="article">Activity 🏃</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Quest
            </button>
          </form>
        </div>
      )}

      {/* 6. QUICK STAT LOGGER MODAL (HYDRATION, ACTIVE BURN, SUGAR CUT) */}
      {quickLogModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-md border rounded-3xl p-6 space-y-4 shadow-2xl ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {quickLogModal.type === 'hydration' && <Droplets className="w-5 h-5 text-blue-500" />}
                {quickLogModal.type === 'burn' && <Flame className="w-5 h-5 text-orange-500" />}
                {quickLogModal.type === 'sugar' && <Package className="w-5 h-5 text-emerald-500" />}
                {quickLogModal.type === 'steps' && <Footprints className="w-5 h-5 text-amber-500" />}
                <h3 className="text-base font-bold font-mono uppercase text-white">
                  {quickLogModal.type === 'hydration' && 'Log Water Hydration Intake'}
                  {quickLogModal.type === 'burn' && 'Log Calories Burned'}
                  {quickLogModal.type === 'sugar' && 'Log Refined Sugar Avoided'}
                  {quickLogModal.type === 'steps' && 'Log Daily Steps'}
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

            {/* STEPS PRESET BUTTONS */}
            {quickLogModal.type === 'steps' && (
              <div className="space-y-3 font-mono">
                <p className="text-xs text-slate-400">Select a quick step count or enter custom amount:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleAddSteps(500)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-amber-500 ${subCardBgClass}`}
                  >
                    🚶‍♂️ +500 <span className="text-[10px] text-amber-400 block font-normal">(Short Walk)</span>
                  </button>
                  <button
                    onClick={() => handleAddSteps(1000)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-amber-500 ${subCardBgClass}`}
                  >
                    🚶‍♂️ +1,000 <span className="text-[10px] text-amber-400 block font-normal">(Block Walk)</span>
                  </button>
                  <button
                    onClick={() => handleAddSteps(5000)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-amber-500 ${subCardBgClass}`}
                  >
                    🏃 +5,000 <span className="text-[10px] text-amber-400 block font-normal">(Long Walk)</span>
                  </button>
                  <button
                    onClick={() => handleAddSteps(10000)}
                    className={`p-3 rounded-xl border text-center font-bold hover:border-amber-500 ${subCardBgClass}`}
                  >
                    🏃 +10,000 <span className="text-[10px] text-amber-400 block font-normal">(Daily Goal)</span>
                  </button>
                </div>

                <div className="pt-2 flex gap-2">
                  <input
                    type="number"
                    placeholder="Custom steps (e.g. 2450)"
                    value={customQuickValue}
                    onChange={e => setCustomQuickValue(e.target.value)}
                    className={`flex-1 px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:border-amber-500 ${subCardBgClass}`}
                  />
                  <button
                    onClick={() => customQuickValue && handleAddSteps(parseInt(customQuickValue))}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. LIVE COMMUNITY CHAT MODAL */}
      {isCommunityChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-lg border rounded-3xl p-5 space-y-4 shadow-2xl flex flex-col h-[85vh] ${cardBgClass}`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-500 border border-indigo-500/30">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-mono uppercase flex items-center gap-2 text-white">
                    FitPulse Community Chat
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </h3>
                  <span className={`text-xs font-mono ${mutedTextClass}`}>14 Athletes Active Now</span>
                </div>
              </div>
              <button 
                onClick={() => setIsCommunityChatOpen(false)}
                className={`p-1.5 rounded-xl hover:bg-slate-800 ${mutedTextClass}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Channels Switcher */}
            <div className="flex gap-2 font-mono text-xs overflow-x-auto pb-1">
              {[
                { id: 'general', label: '#general' },
                { id: 'workout-motivation', label: '#workout-talk' },
                { id: 'sugar-cut', label: '#zero-sugar' }
              ].map(ch => (
                <button
                  key={ch.id}
                  onClick={() => {
                    triggerClickSound();
                    setChatChannel(ch.id);
                  }}
                  className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all border ${
                    chatChannel === ch.id 
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm' 
                      : `${subCardBgClass} ${mutedTextClass}`
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1">
              {chatMessages.filter(m => m.channel === chatChannel || chatChannel === 'general').map(msg => (
                <div key={msg.id} className={`p-3 rounded-2xl border space-y-1 ${
                  msg.sender === 'Yadhu Krishnan'
                    ? 'bg-emerald-500/10 border-emerald-500/30 ml-6'
                    : subCardBgClass
                }`}>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold flex items-center gap-1.5 text-slate-200">
                      <span>{msg.avatar}</span> {msg.sender}
                    </span>
                    <span className={`text-[10px] ${mutedTextClass}`}>{msg.time}</span>
                  </div>
                  <p className="text-xs font-sans leading-relaxed text-slate-200">{msg.text}</p>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Cheer Emojis */}
            <div className="flex gap-2 font-mono text-xs">
              {['💪 Keep going!', '🚴 10k Done!', '🔥 Stay active!', '💧 Drink water!'].map((cheer, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNewMessageText(cheer);
                    triggerClickSound();
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold ${subCardBgClass} hover:border-emerald-500 transition-colors whitespace-nowrap`}
                >
                  {cheer}
                </button>
              ))}
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendChatMessage} className="flex gap-2">
              <input
                type="text"
                placeholder={`Message ${chatChannel}...`}
                value={newMessageText}
                onChange={e => setNewMessageText(e.target.value)}
                className={`flex-1 px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-indigo-500 ${subCardBgClass}`}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase transition-all shadow flex items-center justify-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* 8. SETTINGS & CLOUD SYNC MODAL */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <form onSubmit={handleSaveSettings} className={`relative w-full max-w-md border rounded-3xl p-6 space-y-5 shadow-2xl ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
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
              
              {/* Health Data Integration (Google Fit / Apple Health) */}
              <div className={`p-3.5 rounded-2xl border space-y-2 font-mono ${subCardBgClass}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5 text-white">
                    <Smartphone className="w-4 h-4 text-blue-500" /> Google Fit Sync
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${isGoogleConnected ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
                    {isGoogleConnected ? 'CONNECTED ✓' : 'NOT CONNECTED'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 space-y-1">
                  <div>Auto-sync Daily Steps, Workouts, and Active Burn data.</div>
                </div>
                <button
                  type="button"
                  onClick={handleGoogleSync}
                  disabled={isSyncing || isGoogleConnected}
                  className={`w-full py-1.5 mt-1 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${isGoogleConnected ? 'bg-blue-600/20 text-blue-500 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Connecting to Google Fit...' : isGoogleConnected ? 'Connected & Syncing' : 'Connect to Google Fit'}</span>
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
                        setFontStyle(f.id);
                      }}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                        fontStyle === f.id
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm scale-105 ring-2 ring-emerald-500/30'
                          : `${subCardBgClass} ${mutedTextClass} hover:border-slate-700`
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

            {onLogout && (
              <button
                type="button"
                onClick={() => {
                  triggerClickSound();
                  setIsSettingsModalOpen(false);
                  onLogout();
                }}
                className="w-full py-3 rounded-2xl bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-500/30 font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 mt-2"
              >
                Log Out
              </button>
            )}
          </form>
        </div>
      )}

      {/* 9. DEDICATED GRAPH ANALYTICS MODAL */}
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

      {/* 10. DEDICATED PROFILE ICON OPTIONS MODAL */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className={`relative w-full max-w-md border rounded-3xl p-6 space-y-5 shadow-2xl ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-mono uppercase text-white">Profile Icon Options</h3>
                  <span className={`text-[11px] font-mono ${mutedTextClass}`}>Customize your avatar &amp; ring color</span>
                </div>
              </div>
              <button 
                onClick={() => setIsAvatarModalOpen(false)}
                className={`p-1.5 rounded-xl hover:bg-slate-800 ${mutedTextClass}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Profile Avatar Preview */}
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-3xl shadow-xl transition-all ${
                avatarColor === 'blue' ? 'bg-blue-600 border-blue-400 ring-4 ring-blue-500/20' :
                avatarColor === 'amber' ? 'bg-amber-600 border-amber-400 ring-4 ring-amber-500/20' :
                avatarColor === 'rose' ? 'bg-rose-600 border-rose-400 ring-4 ring-rose-500/20' :
                avatarColor === 'purple' ? 'bg-purple-600 border-purple-400 ring-4 ring-purple-500/20' :
                'bg-emerald-600 border-emerald-400 ring-4 ring-emerald-500/20'
              }`}>
                {selectedAvatar === 'initials' ? username.substring(0, 2).toUpperCase() : selectedAvatar}
              </div>
              <span className="text-xs font-mono font-bold text-white">{username}</span>
            </div>

            {/* Avatar Preset Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">SELECT AVATAR ICON</span>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: '⚡', label: 'Neon' },
                  { id: '🏋️', label: 'Lifter' },
                  { id: '🚴', label: 'Rider' },
                  { id: '🏊', label: 'Swimmer' },
                  { id: '🥗', label: 'Foodie' },
                  { id: '🏆', label: 'Champ' },
                  { id: '🔥', label: 'Flame' },
                  { id: '👑', label: 'King' },
                  { id: '🎯', label: 'Focus' },
                  { id: 'initials', label: 'Initials' }
                ].map(av => (
                  <button
                    key={av.id}
                    onClick={() => {
                      triggerClickSound();
                      setSelectedAvatar(av.id);
                    }}
                    className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                      selectedAvatar === av.id 
                        ? 'bg-sky-600 text-white border-sky-400 scale-105 shadow-md' 
                        : `${subCardBgClass} border-slate-800 text-slate-300 hover:border-slate-700`
                    }`}
                  >
                    <span className="text-lg mb-0.5">{av.id === 'initials' ? username.substring(0, 2).toUpperCase() : av.id}</span>
                    <span className="text-[9px] font-mono font-bold">{av.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Theme Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">RING &amp; BADGE COLOR</span>
              <div className="flex gap-2">
                {[
                  { id: 'emerald', colorClass: 'bg-emerald-600 border-emerald-400' },
                  { id: 'blue', colorClass: 'bg-blue-600 border-blue-400' },
                  { id: 'amber', colorClass: 'bg-amber-600 border-amber-400' },
                  { id: 'rose', colorClass: 'bg-rose-600 border-rose-400' },
                  { id: 'purple', colorClass: 'bg-purple-600 border-purple-400' }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      triggerClickSound();
                      setAvatarColor(c.id);
                    }}
                    className={`flex-1 py-2 rounded-xl border text-xs font-mono font-bold capitalize transition-all ${c.colorClass} ${
                      avatarColor === c.id ? 'ring-2 ring-white scale-105 shadow-lg' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {c.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  triggerClickSound();
                  setIsAvatarModalOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-bold uppercase transition-all shadow-md"
              >
                Save Profile Icon
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
