/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  Award,
  BookOpen,
  Compass,
  TrendingUp,
  RotateCcw,
  GraduationCap,
  History,
  FileClock,
  LogOut,
  Moon,
  ChevronRight,
  HelpCircle,
  Menu,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Lock,
  Home,
  PlayCircle,
  Activity,
  User,
  ChevronLeft,
  Volume2,
  Bell,
  Eye,
  Flame,
  Trash2,
  Cpu,
  Info,
  Calendar,
  Layers,
  ChevronRightSquare,
  Clock,
  Check,
  FileText
} from 'lucide-react';

// Components
import VisualPuzzles from './components/VisualPuzzles';
import SequenceLogic from './components/SequenceLogic';
import LeaderboardPanel from './components/LeaderboardPanel';
import StreakPanel from './components/StreakPanel';
import ProfileCustomizer from './components/ProfileCustomizer';
import AuthModal from './components/AuthModal';

// Firebase Integrations
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from './lib/firebase';
import { getUserProfile, saveUserProfile } from './lib/firebaseStore';

// Typings & Presets
import { GameHistoryItem, UserProfile } from './types';
import { INITIAL_LEADERBOARD, BADGES } from './puzzlesData';

// Interactive sound assist using Web Audio Context
function playBeep(type: 'success' | 'click' | 'miss' | 'levelUp' | 'streak') {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'miss') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.12); // G5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'levelUp') {
      osc.type = 'sine';
      let times = [0, 0.08, 0.16, 0.24, 0.32, 0.44];
      let freqs = [329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // E4, G4, C5, E5, G5, C6
      times.forEach((t, i) => {
        osc.frequency.setValueAtTime(freqs[i], ctx.currentTime + t);
      });
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } else if (type === 'streak') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    console.log('Audio Context holds until primary user event.');
  }
}

export default function App() {
  // Simulator Visual States
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [loadingPercent, setLoadingPercent] = useState<number>(0);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [onboardingIndex, setOnboardingIndex] = useState<number>(0);

  // System Settings local state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(true);

  // Navigation: bottom bar tabs
  const [activeTab, setActiveTab] = useState<'home' | 'game' | 'progress' | 'profile'>('home');

  // Interactive views (if a game is active, we trigger gameplay view over the simulator body)
  const [activeGameplay, setActiveGameplay] = useState<'none' | 'visual_puzzle' | 'sequence_logic'>('none');

  // Firebase Auth states
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Profile data state - Initialize with realistic 'Sakurajima' matching screenshots
  const [username, setUsername] = useState<string>('Sakurajima');
  const [schoolTag, setSchoolTag] = useState<string>('BINUS');
  // Starts with Level 6 / 2180 XP (equivalent to 180 XP inside Level 6 range of progress)
  const [xp, setXp] = useState<number>(2180);
  const [streakCount, setStreakCount] = useState<number>(7);
  const [streakStatus, setStreakStatus] = useState<boolean[]>([true, true, true, true, true, true, true]);
  const [lastClaimedDate, setLastClaimedDate] = useState<string | null>(null);
  
  // High fidelity default history matching the F-04 screenshot
  const [gameHistory, setGameHistory] = useState<GameHistoryItem[]>([
    {
      id: 'h-mock-1',
      gameType: 'visual',
      puzzleTitle: 'Pattern Recall',
      xpEarned: 120,
      completedAt: 'Hari ini, 09:41 AM',
      timeSec: 86,
      accuracy: 80
    },
    {
      id: 'h-mock-2',
      gameType: 'sequence',
      puzzleTitle: 'Speed Sort',
      xpEarned: 85,
      completedAt: 'Kemarin, 20:15 PM',
      timeSec: 98,
      accuracy: 88
    }
  ]);
  const [badges, setBadges] = useState<string[]>(['badge-1', 'badge-2', 'badge-3']);

  // Difficulty selections inside F-05a choose game screen
  const [selectedGameType, setSelectedGameType] = useState<'visual' | 'sequence'>('visual');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'mudah' | 'sedang' | 'sulit'>('sedang');

  // Global Level Up modal status
  const [levelUpModal, setLevelUpModal] = useState<{ show: boolean; levelReached: number }>({ show: false, levelReached: 1 });

  // Master Result and Level Up Popup ("F-09 Hasil & Skor")
  const [completePopup, setCompletePopup] = useState<{
    show: boolean;
    xpEarned: number;
    timeSec: number;
    accuracy: number;
    puzzleTitle: string;
    oldXp: number;
    newXp: number;
    oldLevel: number;
    newLevel: number;
    correctCountStr: string;
    gameType: 'visual' | 'sequence';
    isLevelUp: boolean;
  } | null>(null);

  // Toggle for review display inside complete popup
  const [showAnswerReview, setShowAnswerReview] = useState<boolean>(false);

  // Trigger remounting game component
  const [gameSessionKey, setGameSessionKey] = useState<number>(0);

  // 1. Simulate Loader Screen Progress
  useEffect(() => {
    if (isAppLoading) {
      const interval = setInterval(() => {
        setLoadingPercent(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsAppLoading(false);
            }, 300);
            return 100;
          }
          const increment = Math.floor(Math.random() * 15) + 8;
          return Math.min(100, prev + increment);
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isAppLoading]);

  // Load from local storage on mount as offline-first fallback
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('chrono_profile');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.username) setUsername(parsed.username);
        if (parsed.schoolTag) setSchoolTag(parsed.schoolTag);
        if (parsed.xp !== undefined) setXp(parsed.xp);
        if (parsed.streakCount !== undefined) setStreakCount(parsed.streakCount);
        if (parsed.streakStatus) setStreakStatus(parsed.streakStatus);
        if (parsed.lastClaimedDate !== undefined) setLastClaimedDate(parsed.lastClaimedDate);
        if (parsed.gameHistory && parsed.gameHistory.length > 0) setGameHistory(parsed.gameHistory);
        if (parsed.badges) setBadges(parsed.badges);
      }
      
      const onboardedFlag = localStorage.getItem('chrono_onboarded');
      if (onboardedFlag === 'true') {
        setIsOnboarded(true);
      }
    } catch (e) {
      console.warn('LocalStorage load failed, fallback used.', e);
    }
  }, []);

  // Sync state with Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        try {
          const cloudData = await getUserProfile(user.uid);
          if (cloudData) {
            setUsername(cloudData.username);
            setSchoolTag(cloudData.schoolTag);
            setXp(cloudData.xp);
            setStreakCount(cloudData.streakCount);
            setStreakStatus(cloudData.streakStatus);
            setLastClaimedDate(cloudData.lastClaimedDate);
            if (cloudData.gameHistory && cloudData.gameHistory.length > 0) {
              setGameHistory(cloudData.gameHistory);
            }
            setBadges(cloudData.badges);
            
            localStorage.setItem('chrono_profile', JSON.stringify(cloudData));
          } else {
            // Seed current credentials to cloud
            const seedVal: UserProfile = {
              username: username || 'Sakurajima',
              schoolTag: schoolTag || 'BINUS',
              xp: xp || 2180,
              level: Math.floor((xp || 2180) / 400) + 1,
              xpToNextLevel: 400 - ((xp || 2180) % 400),
              streakCount: streakCount || 7,
              streakStatus: streakStatus || [true, true, true, true, true, true, true],
              lastClaimedDate: lastClaimedDate || null,
              gameHistory: gameHistory || [],
              badges: badges || ['badge-1', 'badge-2', 'badge-3']
            };
            await saveUserProfile(user.uid, seedVal);
          }
        } catch (dbErr) {
          console.error('Error in login sync:', dbErr);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync state with localstorage + Firestore DB
  const saveState = (updated: Partial<UserProfile>) => {
    try {
      const currentObj = {
        username: updated.username !== undefined ? updated.username : username,
        schoolTag: updated.schoolTag !== undefined ? updated.schoolTag : schoolTag,
        xp: updated.xp !== undefined ? updated.xp : xp,
        streakCount: updated.streakCount !== undefined ? updated.streakCount : streakCount,
        streakStatus: updated.streakStatus !== undefined ? updated.streakStatus : streakStatus,
        lastClaimedDate: updated.lastClaimedDate !== undefined ? updated.lastClaimedDate : lastClaimedDate,
        gameHistory: updated.gameHistory !== undefined ? updated.gameHistory : gameHistory,
        badges: updated.badges !== undefined ? updated.badges : badges
      };
      
      localStorage.setItem('chrono_profile', JSON.stringify(currentObj));

      // Synchronize in Firestore
      if (auth.currentUser) {
        const fullCloudProfile: UserProfile = {
          ...currentObj,
          level: Math.floor(currentObj.xp / 400) + 1,
          xpToNextLevel: 400 - (currentObj.xp % 400)
        };
        saveUserProfile(auth.currentUser.uid, fullCloudProfile);
      }
    } catch (e) {
      console.error('LocalStorage save failed.', e);
    }
  };

  // Convert accumulative XP to standard gamified Level metrics
  // Level scale is based on 400 XP increments
  const computedLevel = Math.floor(xp / 400) + 1;
  const currentLevelXp = xp % 400;
  const levelProgressPct = Math.min(100, Math.round((currentLevelXp / 400) * 100));

  // Edit user profile handles
  const handleUpdateProfile = (newUsername: string, newSchoolTag: string) => {
    if (isSoundEnabled) playBeep('click');
    setUsername(newUsername);
    setSchoolTag(newSchoolTag);
    saveState({ username: newUsername, schoolTag: newSchoolTag });
  };

  // Daily Streak Check-in Tracker claim
  const handleClaimDailyBonus = () => {
    const today = new Date().toLocaleDateString();
    if (lastClaimedDate === today) return;

    if (isSoundEnabled) playBeep('streak');
    
    const addedXp = 50;
    const nextXp = xp + addedXp;
    
    const currentLvl = Math.floor(xp / 400) + 1;
    const nextLvl = Math.floor(nextXp / 400) + 1;

    const nextStreakCount = streakCount + 1;
    const nextStreakStatus = [...streakStatus];
    
    // Check off grid item
    const firstCheckIndex = nextStreakStatus.indexOf(false);
    if (firstCheckIndex !== -1) {
      nextStreakStatus[firstCheckIndex] = true;
    } else {
      nextStreakStatus.fill(false);
      nextStreakStatus[0] = true;
    }

    const updatedBadges = [...badges];
    BADGES.forEach(b => {
      if (nextXp >= b.unlockedAtXp && !updatedBadges.includes(b.id)) {
        updatedBadges.push(b.id);
      }
    });

    setXp(nextXp);
    setStreakCount(nextStreakCount);
    setStreakStatus(nextStreakStatus);
    setLastClaimedDate(today);
    setBadges(updatedBadges);

    saveState({
      xp: nextXp,
      streakCount: nextStreakCount,
      streakStatus: nextStreakStatus,
      lastClaimedDate: today,
      badges: updatedBadges
    });

    if (nextLvl > currentLvl) {
      setTimeout(() => {
        if (isSoundEnabled) playBeep('levelUp');
        setLevelUpModal({ show: true, levelReached: nextLvl });
      }, 400);
    }
  };

  // Active cognitive engine completions
  const handleGameComplete = (xpEarned: number, timeSec: number, accuracy: number, puzzleTitle: string, correctAnswersList?: boolean[]) => {
    if (isSoundEnabled) playBeep('success');

    const nextXp = xp + xpEarned;
    const currentLvl = Math.floor(xp / 400) + 1;
    const nextLvl = Math.floor(nextXp / 400) + 1;
    const isLevelUp = nextLvl > currentLvl;

    const newLogItem: GameHistoryItem = {
      id: `history-${Date.now()}`,
      gameType: puzzleTitle.toLowerCase().includes('visual') || puzzleTitle.toLowerCase().includes('pattern') ? 'visual' : 'sequence',
      puzzleTitle: puzzleTitle.replace('Coordinate Match: ', '').replace('Core Sequence: ', '').replace('Visual Puzzle: ', ''),
      xpEarned: xpEarned,
      completedAt: 'Hari ini, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeSec: timeSec,
      accuracy: accuracy
    };

    const nextHistory = [newLogItem, ...gameHistory].slice(0, 8);

    const updatedBadges = [...badges];
    BADGES.forEach(badge => {
      if (nextXp >= badge.unlockedAtXp && !updatedBadges.includes(badge.id)) {
        updatedBadges.push(badge.id);
      }
    });

    setXp(nextXp);
    setGameHistory(nextHistory);
    setBadges(updatedBadges);
    
    // Switch background back to dashboard so user can see progress behind the modal
    setActiveGameplay('none');
    setActiveTab('home');

    // Pre-calculate correct count and types
    const isVisual = puzzleTitle.toLowerCase().includes('visual') || puzzleTitle.toLowerCase().includes('pattern');
    const totalQuestions = 5;
    const correctCount = Math.round((accuracy / 100) * totalQuestions);
    const correctCountStr = `${correctCount}/${totalQuestions}`;

    // Pop up the master result overlay ("F-09 Hasil & Skor")
    setCompletePopup({
      show: true,
      xpEarned: xpEarned,
      timeSec: timeSec,
      accuracy: accuracy,
      puzzleTitle: puzzleTitle,
      oldXp: xp,
      newXp: nextXp,
      oldLevel: currentLvl,
      newLevel: nextLvl,
      correctCountStr: correctCountStr,
      gameType: isVisual ? 'visual' : 'sequence',
      isLevelUp: isLevelUp,
      correctAnswersList: correctAnswersList
    });

    setShowAnswerReview(false);

    saveState({
      xp: nextXp,
      gameHistory: nextHistory,
      badges: updatedBadges
    });

    if (isLevelUp) {
      setTimeout(() => {
        if (isSoundEnabled) playBeep('levelUp');
      }, 300);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUsername('student_weaver');
      setSchoolTag('BINUS');
      setXp(120);
      setStreakCount(3);
      setStreakStatus([true, true, true, false, false, false, false]);
      setLastClaimedDate(null);
      setGameHistory([
        {
          id: 'h-mock-1',
          gameType: 'visual',
          puzzleTitle: 'Pattern Recall',
          xpEarned: 120,
          completedAt: 'Hari ini, 09:41 AM',
          timeSec: 86,
          accuracy: 80
        },
        {
          id: 'h-mock-2',
          gameType: 'sequence',
          puzzleTitle: 'Speed Sort',
          xpEarned: 85,
          completedAt: 'Kemarin, 20:15 PM',
          timeSec: 98,
          accuracy: 88
        }
      ]);
      setBadges(['badge-1']);
      localStorage.removeItem('chrono_profile');
      if (isSoundEnabled) playBeep('miss');
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };

  const clearAllProgress = () => {
    if (isSoundEnabled) playBeep('miss');
    if (window.confirm("Perform neural factory reset? All XP, levels, and training streak logs will be deleted!")) {
      localStorage.removeItem('chrono_profile');
      setUsername('student_weaver');
      setSchoolTag('BINUS');
      setXp(120);
      setStreakCount(3);
      setStreakStatus([true, true, true, false, false, false, false]);
      setLastClaimedDate(null);
      setGameHistory([]);
    }
  };

  // Launch preselected challenge from home dashboard cards
  const launchChallengeFromHome = (type: 'visual' | 'sequence') => {
    if (isSoundEnabled) playBeep('click');
    setSelectedGameType(type);
    setSelectedDifficulty('sedang');
    setActiveTab('game');
  };

  // Onboarding text list mapping mockups
  const onboardingSlides = [
    {
      title: "Latih Otakmu Setiap Hari",
      text: "Chrono-Thread memiliki game kognitif yang dirancang untuk meningkatkan fokus dan daya ingatmu.",
      icon: <Cpu className="w-16 h-16 text-elegant-purple animate-pulse" />
    },
    {
      title: "Asah Kemampuan Kognitif",
      text: "Lacak skor dan perkembangan kemampuan berpikir serta pemahaman strukturalmu secara real-time.",
      icon: <TrendingUp className="w-16 h-16 text-elegant-cyan animate-bounce" />
    },
    {
      title: "Kalibrasi Berkelanjutan",
      text: "Pecahkan koordinat visual dan latih logika urutan algoritma komputer untuk melangkah lebih tinggi.",
      icon: <Sparkles className="w-16 h-16 text-elegant-orange" />
    }
  ];

  const handleFinishOnboarding = () => {
    if (isSoundEnabled) playBeep('success');
    localStorage.setItem('chrono_onboarded', 'true');
    setIsOnboarded(true);
  };

  return (
    <div className="min-h-screen bg-[#07030F] text-slate-100 flex flex-col items-center justify-center sm:py-8 sm:px-4 selection:bg-elegant-purple/30 selection:text-elegant-cyan font-sans overflow-x-hidden relative">
      
      {/* Dynamic atmospheric background glow circles */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-elegant-purple/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none select-none z-0"></div>
      <div className="absolute bottom-[20%] left-1/3 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-elegant-cyan/5 rounded-full blur-[90px] sm:blur-[150px] pointer-events-none select-none z-0"></div>

      {/* Modern Mockup Smartphone Enclosure wrapper on Desktop, Full screen on Mobile */}
      <div className="w-full max-w-md h-screen sm:h-[850px] bg-[#0A0516] sm:rounded-[42px] sm:border-[10px] sm:border-slate-800/95 sm:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95)] flex flex-col relative overflow-hidden z-10 border-elegant-purple/10">
        
        {/* Phone Speaker & Camera Notch bar (simulating a notch for aesthetic realism) */}
        <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-55 justify-center items-center">
          <div className="w-12 h-1 bg-neutral-800 rounded-full mb-1 shrink-0"></div>
          <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full mb-1 ml-2.5 outline outline-slate-800/20"></div>
        </div>

        {/* Dynamic Status Bar - Ultra-premium look matching native iOS/Android layout */}
        <div className="w-full bg-[#0A0516]/65 backdrop-blur-md h-12 flex items-center justify-between px-6 pt-2 select-none text-[10px] text-slate-400 font-mono z-50 border-b border-white/5 shrink-0">
          <span className="font-bold tracking-tight text-white/90">09:41</span>
          
          <div className="flex items-center gap-2">
            {/* Cellular network bars representation */}
            <div className="flex items-end gap-0.5 h-2.5">
              <span className="w-0.5 h-1 bg-white/70 rounded-full"></span>
              <span className="w-0.5 h-1.5 bg-white/70 rounded-full"></span>
              <span className="w-0.5 h-2 bg-white/70 rounded-full"></span>
              <span className="w-0.5 h-2.5 bg-elegant-cyan rounded-full animate-pulse"></span>
            </div>
            {/* Wi-Fi Indicator Mock */}
            <Activity className="w-3.5 h-3.5 text-elegant-cyan" />
            
            {/* Battery indicators percentage */}
            <span className="text-[9px] text-white/70 scale-90">100%</span>
            <div className="w-5 h-2.5 border border-white/40 p-0.5 rounded flex items-center">
              <div className="w-full h-full bg-elegant-green rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* SIMULATED MOBILE SCREENS VIEW PORT */}
        <div className="flex-1 w-full overflow-y-auto relative no-scrollbar flex flex-col">
          
          <AnimatePresence mode="wait">
            
            {/* F-01: SPLASH SCREEN (Percentage progress animation) */}
            {isAppLoading && (
              <motion.div
                key="splash-screen"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                className="absolute inset-0 bg-[#0A0516] flex flex-col items-center justify-between p-8 z-55 text-center"
              >
                <div></div>
                
                {/* Center Core Logo */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ scale: 0.8, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="w-20 h-20 bg-gradient-to-tr from-elegant-purple to-elegant-cyan rounded-2xl flex items-center justify-center shadow-lg shadow-elegant-purple/35 mx-auto relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 mx-auto w-full h-[50%] skew-y-12"></div>
                    <span className="font-display font-black text-slate-950 text-2xl relative z-10">CT</span>
                  </motion.div>
                  
                  <div>
                    <h2 className="font-display font-bold text-2xl tracking-widest text-white mt-1">CHRONO-THREAD</h2>
                    <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-widest font-mono">Asah Otak. Naik Level.</p>
                  </div>
                </div>

                {/* Progress bar deck */}
                <div className="w-full max-w-xs space-y-3 pb-8">
                  <div className="w-full bg-[#18102B]/80 h-1.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div className="bg-gradient-to-r from-elegant-purple to-elegant-cyan h-full rounded-full transition-all" style={{ width: `${loadingPercent}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 px-1">
                    <span>SYS_INIT_V2.0</span>
                    <span className="text-elegant-cyan font-bold">{loadingPercent}% COMPLETED</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* F-00: ONBOARDING SCREEN SLIDESHOW */}
            {!isAppLoading && !isOnboarded && (
              <motion.div
                key="onboarding-flow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="absolute inset-0 bg-[#0B0518] flex flex-col justify-between p-7 text-center z-50"
              >
                {/* Skip option */}
                <div className="flex justify-end pr-1 pt-2">
                  <button onClick={handleFinishOnboarding} className="text-xs text-slate-400 font-mono hover:text-white cursor-pointer px-2 py-1">
                    Skip Link ➔
                  </button>
                </div>

                {/* Sliding main body */}
                <div className="space-y-6 px-2 my-auto">
                  <div className="mx-auto flex justify-center h-20 items-center">
                    {onboardingSlides[onboardingIndex].icon}
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold font-display text-white">{onboardingSlides[onboardingIndex].title}</h2>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">{onboardingSlides[onboardingIndex].text}</p>
                  </div>
                </div>

                {/* Carousel progress dots & Primary Action CTA */}
                <div className="space-y-6 pb-6">
                  {/* Status index dot indicators */}
                  <div className="flex justify-center gap-1.5">
                    {onboardingSlides.map((_, idx) => (
                      <button
                        align-auto="true"
                        key={idx}
                        onClick={() => setOnboardingIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-200 outline-none ${idx === onboardingIndex ? 'w-6 bg-elegant-purple' : 'w-2 bg-slate-700'}`}
                      />
                    ))}
                  </div>

                  {/* CTA button */}
                  {onboardingIndex === onboardingSlides.length - 1 ? (
                    <button
                      onClick={handleFinishOnboarding}
                      className="w-full py-3 bg-elegant-purple hover:bg-[#A300E6] text-white font-bold rounded-xl text-xs tracking-wider transition uppercase cursor-pointer text-center relative overflow-hidden"
                    >
                      MULAI SEKARANG!
                    </button>
                  ) : (
                    <button
                      onClick={() => setOnboardingIndex(p => Math.min(onboardingSlides.length - 1, p + 1))}
                      className="w-full py-3 bg-neutral-900 border border-slate-700 hover:bg-neutral-800 text-slate-200 font-bold rounded-xl text-xs tracking-wider transition uppercase cursor-pointer text-center"
                    >
                      LANJUTKAN
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* MAIN APP VIEWS - RENDER ACTIVE TAB */}
            {!isAppLoading && isOnboarded && activeGameplay === 'none' && (
              <motion.div
                key="main-app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col"
              >
                
                {/* HOME TAB SCREEN */}
                {activeTab === 'home' && (
                  <div className="px-5 py-5 space-y-5 animate-fadeIn">
                    
                    {/* Compact Title Row & Profile Circle button */}
                    <div className="flex justify-between items-center">
                      <h1 className="font-display font-black text-lg tracking-tight text-white flex items-center gap-1.2">
                        Chrono-Thread
                        <span className="text-[8px] bg-elegant-cyan/20 border border-elegant-cyan/35 text-elegant-cyan px-1.5 py-0.2 rounded font-sans uppercase font-black tracking-wider">LITE</span>
                      </h1>
                      
                      <button
                        onClick={() => { if (isSoundEnabled) playBeep('click'); setActiveTab('profile'); }}
                        className="w-8 h-8 rounded-full bg-elegant-card border border-elegant-purple/35 flex items-center justify-center text-[10px] font-bold text-white shadow-md relative overflow-hidden cursor-pointer shrink-0"
                      >
                        <span className="relative z-10">{username.slice(0, 2).toUpperCase()}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-elegant-purple/20 to-elegant-cyan/15 z-0"></div>
                      </button>
                    </div>

                    {/* Greeting title */}
                    <div className="space-y-0.5">
                      <h2 className="text-xl font-display font-extrabold text-white leading-tight">Halo, {username} 👋</h2>
                      <p className="text-xs text-slate-400">Siap untuk melatih fokusmu hari ini?</p>
                    </div>

                    {/* User level details card with pink brain logo */}
                    <div className="bg-[#150D26]/95 border border-[#301E54]/95 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden shadow-xl shadow-black/30">
                      {/* Atmospheric backing glow */}
                      <div className="absolute top-0 right-0 w-24 h-16 bg-elegant-purple/10 rounded-bl-full blur-xl pointer-events-none"></div>

                      <div className="flex-1 space-y-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-elegant-cyan/15 border border-elegant-cyan/30 text-elegant-cyan text-[10px] font-bold font-mono px-2 py-0.5 rounded-lg flex items-center gap-1 shrink-0">
                            ⚡ Level {computedLevel}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono font-medium shrink-0">
                            {xp} total XP
                          </span>
                        </div>
                        
                        {/* Progress line */}
                        <div className="space-y-1 max-w-sm">
                          <div className="w-full bg-[#0A0516] h-1.5 rounded-full overflow-hidden p-0.5 border border-white/5">
                            <div className="bg-[#7B2CBF] h-full rounded-full transition-all duration-300" style={{ width: `${levelProgressPct}%` }} />
                          </div>
                          <span className="block text-[8px] font-mono text-slate-400">
                            {currentLevelXp} / 400 XP ({levelProgressPct}% level progress)
                          </span>
                        </div>
                      </div>

                      {/* Pink Brain illustration */}
                      <div className="w-14 h-14 bg-[#31165A]/40 rounded-xl border border-[#522998]/40 flex items-center justify-center text-3xl shadow-inner shrink-0 scale-95 relative z-10 select-none ml-2">
                        🧠
                      </div>
                    </div>

                    {/* Streak Banner (gradient yellow orange) */}
                    <button
                      onClick={handleClaimDailyBonus}
                      className="w-full text-left rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-450 hover:to-orange-450 p-4 relative overflow-hidden flex items-center gap-3.5 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-black/25 rounded-full flex items-center justify-center text-xl shrink-0">
                        🔥
                      </div>
                      <div className="flex-1 leading-tight">
                        <h4 className="text-slate-950 font-display font-black text-sm tracking-wide uppercase">STREAK {streakCount} HARI</h4>
                        <p className="text-[10px] text-slate-900 font-medium font-sans mt-0.5">Main terus agar tidak putus!</p>
                      </div>
                      <div className="bg-black/20 text-slate-950 text-[9px] font-bold px-2 py-1 rounded-lg shrink-0">
                        INFO
                      </div>
                    </button>

                    {/* TANTANGAN HARI INI */}
                    <div className="space-y-2.5">
                      <span className="block uppercase text-[10px] font-mono font-bold text-slate-450 tracking-wider">TANTANGAN HARI INI</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {/* Challeng 1: Visual Puzzle */}
                        <div
                          onClick={() => launchChallengeFromHome('visual')}
                          className="bg-[#160D2D]/85 border border-[#301E54]/75 rounded-2xl p-4 flex flex-col justify-between hover:border-elegant-cyan/40 transition active:scale-[0.97] cursor-pointer shadow h-[120px]"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#1CDAFF]/15 border border-[#1CDAFF]/30 flex items-center justify-center text-base">
                            🧩
                          </div>
                          <div>
                            <h5 className="text-white font-display font-bold text-xs">Visual Puzzle</h5>
                            <span className="inline-block px-2 py-0.5 bg-emerald-900/40 text-emerald-400 border border-emerald-900/60 rounded-md text-[9px] scale-90 -ml-1 mt-1.5 font-bold font-sans">
                              Mudah
                            </span>
                          </div>
                        </div>

                        {/* Challeng 2: Sequence Logic */}
                        <div
                          onClick={() => launchChallengeFromHome('sequence')}
                          className="bg-[#160D2D]/85 border border-[#301E54]/75 rounded-2xl p-4 flex flex-col justify-between hover:border-elegant-purple/40 transition active:scale-[0.97] cursor-pointer shadow h-[120px]"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#BD00FF]/15 border border-[#BD00FF]/30 flex items-center justify-center text-base">
                            ⚙️
                          </div>
                          <div>
                            <h5 className="text-white font-display font-bold text-xs">Logika & Urutan</h5>
                            <span className="inline-block px-2 py-0.5 bg-amber-950/40 text-amber-500 border border-amber-900/60 rounded-md text-[9px] scale-90 -ml-1 mt-1.5 font-bold font-sans">
                              Sedang
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Sessions list matching mock and real updates */}
                    <div className="space-y-2.5 pb-6">
                      <span className="block uppercase text-[10px] font-mono font-bold text-slate-450 tracking-wider">AKTIVITAS TERAKHIR</span>
                      
                      <div className="space-y-2">
                        {gameHistory.length === 0 ? (
                          <div className="text-center py-6 border border-dashed border-elegant-purple/15 rounded-xl bg-elegant-dark/10">
                            <p className="text-[10px] text-slate-500 font-mono uppercase">BELUM ADA DATA SESI LIVE</p>
                          </div>
                        ) : (
                          gameHistory.slice(0, 3).map((item) => (
                            <div key={item.id} className="bg-[#160D2C] border border-[#21163F] p-3 rounded-2xl flex items-center justify-between shadow-xs">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${item.gameType === 'visual' ? 'bg-[#1CDAFF]/10 text-cyan-400' : 'bg-elegant-purple/10 text-purple-400'}`}>
                                  {item.gameType === 'visual' ? '🧩' : '⚙️'}
                                </div>
                                <div className="leading-tight">
                                  <h5 className="text-white font-display font-bold text-xs">{item.puzzleTitle}</h5>
                                  <span className="text-[9px] text-[#A69FC0] font-mono mt-0.5 block">{item.completedAt}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-mono font-black text-elegant-cyan">+{item.xpEarned} XP</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>
                )}

                {/* GAME SELECTION TAB (F-05a) */}
                {activeTab === 'game' && (
                  <div className="px-5 py-5 space-y-4 animate-fadeIn">
                    
                    {/* Header bar */}
                    <div className="flex items-center gap-2">
                      <button onClick={() => { if (isSoundEnabled) playBeep('click'); setActiveTab('home'); }} className="p-1 px-1.5 text-slate-400 hover:text-white shrink-0 cursor-pointer">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <h4 className="text-sm font-display font-semibold text-[#B1A6D2]">Chrono-Thread Selection</h4>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-2xl font-display font-bold tracking-tight text-white uppercase">PILIH GAME</h2>
                      <p className="text-xs text-slate-400">Pilih tantangan kognitif hari ini</p>
                    </div>

                    {/* Mode Large Selector cards */}
                    <div className="space-y-3">
                      {/* Option 1: Visual Puzzle */}
                      <button
                        onClick={() => { if (isSoundEnabled) playBeep('click'); setSelectedGameType('visual'); }}
                        className={`w-full text-left p-4 rounded-2xl border transition relative flex items-center justify-between cursor-pointer ${selectedGameType === 'visual' ? 'bg-[#1C1337] border-elegant-purple shadow-lg shadow-purple-950/20' : 'bg-[#150D27]/80 border-slate-800'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#BD00FF]/15 border border-[#BD00FF]/35 rounded-xl flex items-center justify-center text-lg shrink-0">
                            🧩
                          </div>
                          <div className="leading-tight">
                            <h4 className="text-white font-display font-extrabold text-sm">Visual Puzzle</h4>
                            <span className="text-[9px] text-cyan-400 font-mono tracking-wider font-bold">FOKUS VISUAL</span>
                          </div>
                        </div>

                        {selectedGameType === 'visual' && (
                          <div className="w-5 h-5 bg-elegant-purple rounded-full flex items-center justify-center text-[10px] text-white font-black">
                            ✓
                          </div>
                        )}
                      </button>

                      {/* Option 2: Sequence Logic */}
                      <button
                        onClick={() => { if (isSoundEnabled) playBeep('click'); setSelectedGameType('sequence'); }}
                        className={`w-full text-left p-4 rounded-2xl border transition relative flex items-center justify-between cursor-pointer ${selectedGameType === 'sequence' ? 'bg-[#1C1337] border-elegant-purple shadow-lg shadow-purple-950/20' : 'bg-[#150D27]/80 border-slate-800'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#BD00FF]/15 border border-[#BD00FF]/35 rounded-xl flex items-center justify-center text-lg shrink-0">
                            ⚙️
                          </div>
                          <div className="leading-tight">
                            <h4 className="text-white font-display font-extrabold text-sm">Logika & Urutan</h4>
                            <span className="text-[9px] text-[#A69FC0] font-mono tracking-wider">MEMORI PROSEDURAL</span>
                          </div>
                        </div>

                        {selectedGameType === 'sequence' && (
                          <div className="w-5 h-5 bg-elegant-purple rounded-full flex items-center justify-center text-[10px] text-white font-black">
                            ✓
                          </div>
                        )}
                      </button>
                    </div>

                    {/* DIFFICULTY Segmented Selector */}
                    <div className="space-y-2 pt-2">
                      <span className="block text-[10px] font-mono font-bold text-[#9D91C4] tracking-wider">LEVEL KESULITAN</span>
                      
                      <div className="grid grid-cols-3 gap-2 bg-[#090415] border border-slate-800 p-1 rounded-xl">
                        {/* Mudah */}
                        <button
                          onClick={() => { if (isSoundEnabled) playBeep('click'); setSelectedDifficulty('mudah'); }}
                          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${selectedDifficulty === 'mudah' ? 'bg-[#291B4C] text-elegant-cyan border border-elegant-cyan/25' : 'text-slate-400 bg-transparent'}`}
                        >
                          Mudah
                        </button>
                        
                        {/* Sedang */}
                        <button
                          onClick={() => { if (isSoundEnabled) playBeep('click'); setSelectedDifficulty('sedang'); }}
                          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${selectedDifficulty === 'sedang' ? 'bg-[#291B4C] text-elegant-cyan border border-elegant-cyan/25' : 'text-slate-400 bg-transparent'}`}
                        >
                          Sedang
                        </button>

                        {/* Sulit */}
                        <button
                          onClick={() => { if (isSoundEnabled) playBeep('click'); setSelectedDifficulty('sulit'); }}
                          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${selectedDifficulty === 'sulit' ? 'bg-[#291B4C] text-elegant-cyan border border-elegant-cyan/25' : 'text-slate-400 bg-transparent'}`}
                        >
                          Sulit
                        </button>
                      </div>
                    </div>

                    {/* Metadata help pill */}
                    <div className="bg-[#150D27] border border-[#21163F] p-3 rounded-xl flex items-start gap-2 text-xs text-[#9B8EB9]">
                      <Info className="w-4 h-4 text-elegant-purple shrink-0 mt-0.5" />
                      <div>
                        {selectedDifficulty === 'mudah' && <p>4 soal • 1 menit • Pola dasar akademis</p>}
                        {selectedDifficulty === 'sedang' && <p>8 soal • 2 menit • Pola menengah kognitif</p>}
                        {selectedDifficulty === 'sulit' && <p>12 soal • 3 menit • Pola rumit analisis</p>}
                        <p className="text-[10px] text-slate-500 mt-1">Selesaikan tantangan untuk mendapatkan bonus leaderboard nasional.</p>
                      </div>
                    </div>

                    {/* Play Start Action Button */}
                    <button
                      onClick={() => {
                        if (isSoundEnabled) playBeep('success');
                        setActiveGameplay(selectedGameType === 'visual' ? 'visual_puzzle' : 'sequence_logic');
                      }}
                      className="w-full py-4 mt-2 bg-gradient-to-r from-elegant-purple to-[#BD00FF] hover:opacity-95 text-white font-extrabold text-sm rounded-xl transition shadow-lg shadow-purple-500/20 active:scale-[0.98] cursor-pointer text-center flex items-center justify-center gap-1"
                    >
                      <span>Mulai Bermain</span>
                      <span>▶</span>
                    </button>

                  </div>
                )}

                {/* PROGRESS TRACKING TAB (F-10) */}
                {activeTab === 'progress' && (
                  <div className="px-5 py-5 space-y-4 animate-fadeIn">
                    
                    <div className="flex justify-between items-center pr-1">
                      <h2 className="text-xl font-display font-extrabold text-white tracking-tight uppercase">PROGRESS</h2>
                      <button onClick={() => { if (isSoundEnabled) playBeep('click'); setActiveTab('profile'); }} className="w-6 h-6 rounded-full bg-elegant-purple/10 flex items-center justify-center text-xs border border-elegant-purple/35 text-slate-400">
                        SK
                      </button>
                    </div>

                    {/* Level tracker progression card */}
                    <div className="bg-[#150D26] border border-[#21163F] p-4 rounded-2xl space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="bg-elegant-cyan/15 px-2 py-0.5 border border-elegant-cyan/25 text-elegant-cyan text-[10px] font-bold font-mono rounded">
                          ⚡ LEVEL {computedLevel}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{levelProgressPct}%</span>
                      </div>
                      <div className="w-full bg-[#0A0516] h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <div className="bg-[#7B2CBF] h-full rounded-full transition-all duration-300" style={{ width: `${levelProgressPct}%` }} />
                      </div>
                      <p className="text-[10px] text-[#A69FC0] font-medium leading-relaxed">
                        {levelProgressPct}% to Level {computedLevel + 1}. Keep up the flow state.
                      </p>
                    </div>

                    {/* Week Chart SKOR MINGGUAN */}
                    <div className="bg-[#150D26]/90 border border-[#21163F] p-4 rounded-2xl space-y-3 shadow shadow-purple-950/5">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-slate-200 text-xs font-display font-bold">SKOR MINGGUAN</span>
                        <div className="flex gap-1 text-[9px] font-mono font-bold bg-[#090415] border border-slate-800 rounded p-0.5 scale-90">
                          <span className="px-1 text-elegant-cyan">7 Hari</span>
                          <span className="px-1 text-slate-500">30 Hari</span>
                        </div>
                      </div>
                      
                      {/* Premium SVG Line Sparkline exactly matching the gorgeous wave */}
                      <div className="h-32 w-full pt-2 relative">
                        <svg className="w-full h-full" viewBox="0 0 300 100">
                          <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          
                          {/* Shadow grid lines */}
                          <line x1="0" y1="20" x2="300" y2="20" stroke="#FFFFFF" strokeOpacity="0.03" strokeDasharray="3" />
                          <line x1="0" y1="50" x2="300" y2="50" stroke="#FFFFFF" strokeOpacity="0.03" strokeDasharray="3" />
                          <line x1="0" y1="80" x2="300" y2="80" stroke="#FFFFFF" strokeOpacity="0.03" strokeDasharray="3" />

                          {/* Gradient area */}
                          <path
                            d="M 10 70 Q 50 20, 90 60 T 170 30 T 250 80 T 290 40 L 290 100 L 10 100 Z"
                            fill="url(#chartGradient)"
                          />
                          
                          {/* Curve Path Line path */}
                          <path
                            d="M 10 70 Q 50 20, 90 60 T 170 30 T 250 80 T 290 40"
                            fill="none"
                            stroke="#00F0FF"
                            strokeWidth="2.5"
                            className="drop-shadow-[0_0_6px_rgba(0,240,255,0.7)]"
                          />

                          {/* Interactive data value point dot marker */}
                          <circle cx="170" cy="30" r="4.5" fill="#00F0FF" stroke="#000000" strokeWidth="1" className="animate-pulse" />
                        </svg>
                        
                        {/* Days acronym abbreviation scale */}
                        <div className="flex justify-between text-[8px] font-mono text-slate-400 mt-1 px-1">
                          <span>Sn</span>
                          <span>Sl</span>
                          <span>Rb</span>
                          <span>Km</span>
                          <span>Jm</span>
                          <span>Sb</span>
                          <span>Mg</span>
                        </div>
                      </div>
                    </div>

                    {/* PENCAPAIAN Badges */}
                    <div className="bg-[#150D26]/90 border border-[#21163F] p-4 rounded-2xl space-y-2.5">
                      <span className="block uppercase text-[10px] font-mono font-bold text-slate-450 tracking-wider">PENCAPAIAN</span>
                      
                      <div className="flex justify-between items-center py-1 sm:px-2 gap-1.5">
                        {/* Badge 1 */}
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-orange-500/35 flex items-center justify-center text-lg shadow-inner cursor-help" title="7 Days Check-in Streak unlocked">
                            🔥
                          </div>
                          <span className="text-[8px] font-mono text-slate-400 mt-1 font-bold">STREAK</span>
                        </div>
                        
                        {/* Badge 2 */}
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500/10 to-amber-500/10 border border-yellow-500/40 flex items-center justify-center text-lg shadow-inner cursor-help" title="Lightning solver unlocked">
                            ⚡
                          </div>
                          <span className="text-[8px] font-mono text-slate-400 mt-1 font-bold">KILAT</span>
                        </div>

                        {/* Badge 3 */}
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500/15 to-indigo-500/15 border border-purple-500/40 flex items-center justify-center text-lg shadow-inner cursor-help" title="Brain power focal achieved">
                            🧠
                          </div>
                          <span className="text-[8px] font-mono text-slate-400 mt-1 font-bold">FOKUS</span>
                        </div>

                        {/* Badge 4 - Locked */}
                        <div className="flex flex-col items-center opacity-40">
                          <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400">
                            🔒
                          </div>
                          <span className="text-[8px] font-mono text-slate-500 mt-1">LV. 10</span>
                        </div>

                        {/* Badge 4 - Locked */}
                        <div className="flex flex-col items-center opacity-40">
                          <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-slate-400">
                            🔒
                          </div>
                          <span className="text-[8px] font-mono text-slate-500 mt-1">MASTER</span>
                        </div>
                      </div>
                    </div>

                    {/* Sesi Terakhir gameplay history */}
                    <div className="space-y-2 pb-4">
                      <span className="block uppercase text-[10px] font-mono font-bold text-slate-450 tracking-wider">SESI TERAKHIR</span>
                      {gameHistory.map((h) => (
                        <div key={h.id} className="bg-[#10091E]/95 border border-[#21163F] p-3 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{h.gameType === 'visual' ? '🧩' : '⚙️'}</span>
                            <div className="leading-tight">
                              <h5 className="text-xs font-bold text-white font-display">{h.puzzleTitle}</h5>
                              <span className="text-[9px] text-[#86809A] font-mono mt-0.5 block">{h.completedAt}</span>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-elegant-cyan">+{h.xpEarned} XP</span>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* PROFILE & SETTINGS TAB (F-11) */}
                {activeTab === 'profile' && (
                  <div className="px-5 py-5 space-y-4 pb-12 animate-fadeIn">
                    
                    <div className="flex items-center gap-2">
                      <button onClick={() => { if (isSoundEnabled) playBeep('click'); setActiveTab('home'); }} className="p-1 px-1.5 text-slate-400 hover:text-white shrink-0 cursor-pointer">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <h4 className="text-sm font-display font-semibold text-[#B1A6D2]">Chrono-Thread Profile</h4>
                    </div>

                    {/* High fidelity circle avatar SK with surround level ring */}
                    <div className="flex flex-col items-center space-y-3 pt-2">
                      {/* Avatar Glowing wrapper */}
                      <div className="w-18 h-18 rounded-full bg-slate-900 border-[3px] border-elegant-purple flex items-center justify-center relative shadow-lg shadow-purple-950/50">
                        <span className="font-display font-medium text-white text-xl uppercase font-black">
                          {username.slice(0, 2).toUpperCase()}
                        </span>
                        {/* Overlapping small Level Badge */}
                        <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-violet-600 to-[#BD00FF] border border-violet-400/30 text-white rounded-md text-[8px] px-1.5 py-0.5 leading-none shrink-0 font-bold">
                          ⚡ Lvl {computedLevel}
                        </span>
                      </div>
                      
                      {/* Name Details & Inline Customizer modal trigger link */}
                      <div className="text-center">
                        <h3 className="text-white font-display font-bold text-lg">{username}</h3>
                        
                        {/* Customizer wrapper */}
                        <div className="mt-2 text-center flex justify-center">
                          <ProfileCustomizer
                            currentUsername={username}
                            currentSchoolTag={schoolTag}
                            playerBadges={badges}
                            playerXp={xp}
                            onUpdateProfile={handleUpdateProfile}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stats table row (Sesi | Streak | Badge) */}
                    <div className="grid grid-cols-3 gap-3 bg-[#150D26]/90 border border-[#21163F] p-3 rounded-2xl text-center shadow-xs">
                      <div className="leading-tight">
                        <span className="block text-[9px] text-[#A69FC0] uppercase font-mono font-bold">Sesi</span>
                        <span className="text-sm font-display font-black text-white">{gameHistory.length + 3}</span>
                      </div>
                      <div className="leading-tight border-x border-[#3F3169]/30">
                        <span className="block text-[9px] text-[#A69FC0] uppercase font-mono font-bold">Streak</span>
                        <span className="text-sm font-display font-black text-white flex items-center gap-0.5 justify-center">
                          {streakCount} <span className="scale-90">🔥</span>
                        </span>
                      </div>
                      <div className="leading-tight">
                        <span className="block text-[9px] text-[#A69FC0] uppercase font-mono font-bold">Badge</span>
                        <span className="text-sm font-display font-black text-white">{badges.length}</span>
                      </div>
                    </div>

                    {/* VERTICAL PRESTIGE SETTINGS MENUS */}
                    <div className="bg-[#150D26]/90 border border-[#21163F] p-2 rounded-2xl space-y-0.5 shadow-md">
                      
                      {/* Mode Gelap toggle switch row */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/3 transition">
                        <div className="flex items-center gap-3">
                          <Moon className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="text-xs text-slate-100 font-medium">Mode Gelap</span>
                        </div>
                        
                        {/* Realistic switch toggle */}
                        <button
                          onClick={() => { if (isSoundEnabled) playBeep('click'); setIsDarkMode(!isDarkMode); }}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer outline-none focus:ring-0 shrink-0 ${isDarkMode ? 'bg-elegant-purple' : 'bg-slate-800'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* sound indicator toggle switch */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/3 transition">
                        <div className="flex items-center gap-3">
                          <Volume2 className="w-4 h-4 text-[#BD00FF] shrink-0" />
                          <span className="text-xs text-slate-100 font-medium">Suara & Audio</span>
                        </div>
                        
                        <button
                          onClick={() => { if (isSoundEnabled) playBeep('click'); setIsSoundEnabled(!isSoundEnabled); }}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors relative cursor-pointer outline-none focus:ring-0 shrink-0 ${isSoundEnabled ? 'bg-elegant-purple' : 'bg-slate-800'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isSoundEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* Notifikasi Chevron button */}
                      <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/3 transition cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Bell className="w-4 h-4 text-amber-500 shrink-0" />
                          <span className="text-xs text-slate-100 font-medium">Notifikasi Harian</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>

                      {/* Replay Onboarding slide tutorial option */}
                      <div
                        onClick={() => { if (isSoundEnabled) playBeep('click'); setOnboardingIndex(0); setIsOnboarded(false); }}
                        className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/3 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="text-xs text-slate-100 font-medium">Tutorial & Onboarding</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </div>

                    </div>

                    {/* Logout Outlined Red button */}
                    <div className="pt-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full py-4 text-xs font-semibold text-red-400 hover:text-red-300 border border-red-500/25 hover:border-red-500/40 bg-red-950/10 rounded-xl text-center cursor-pointer transition active:scale-[0.98]"
                      >
                        Keluar (Sign Out Account)
                      </button>
                    </div>

                    {/* Reset All Progres action */}
                    <div className="text-center">
                      <button onClick={clearAllProgress} className="text-[10px] text-slate-500 hover:text-red-400 font-mono tracking-wide transition cursor-pointer py-1.5">
                        Reset Seluruh Progres
                      </button>
                    </div>

                  </div>
                )}

              </motion.div>
            )}

            {/* FULLY IMMERSIVE ACTIVE COMPACT GAMEPLAY PANEL OVERPHONE */}
            {!isAppLoading && isOnboarded && activeGameplay !== 'none' && (
              <motion.div
                key="active-gameplay-simulator"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#0A0516] flex flex-col z-55 pb-4"
              >
                {activeGameplay === 'visual_puzzle' ? (
                  <div key={`visual-puzzles-wrapper-${gameSessionKey}`} className="flex-1 overflow-y-auto w-full px-4 pt-1 pb-16 no-scrollbar">
                    <VisualPuzzles
                      userLevel={computedLevel}
                      userXp={xp}
                      onGameComplete={handleGameComplete}
                      onBackToDashboard={() => { if (isSoundEnabled) playBeep('click'); setActiveGameplay('none'); }}
                    />
                  </div>
                ) : (
                  <div key={`sequence-logic-wrapper-${gameSessionKey}`} className="flex-1 overflow-y-auto w-full px-4 pt-1 pb-16 no-scrollbar">
                    <SequenceLogic
                      userLevel={computedLevel}
                      userXp={xp}
                      onGameComplete={handleGameComplete}
                      onBackToDashboard={() => { if (isSoundEnabled) playBeep('click'); setActiveGameplay('none'); }}
                    />
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* BOTTOM REALISTIC TELEMETRY NAVIGATION BAR - HIDE ON ACTIVE INTENSIVE GAMEPLAY */}
        {!isAppLoading && isOnboarded && activeGameplay === 'none' && (
          <div className="w-full bg-[#0E071F]/90 backdrop-blur-md border-t border-white/5 py-2 px-4 flex justify-around items-center z-45 shrink-0 scale-95 sm:scale-100">
            {/* Nav Item 1: Home */}
            <button
              onClick={() => { if (isSoundEnabled) playBeep('click'); setActiveTab('home'); }}
              className={`flex flex-col items-center justify-center p-1.5 transition-all text-center relative select-none cursor-pointer outline-none ${activeTab === 'home' ? 'text-elegant-cyan' : 'text-[#837B9F]'}`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-medium tracking-tight">Home</span>
              
              {activeTab === 'home' && (
                <motion.div layoutId="nav-glow-pulse" className="absolute -bottom-1 w-5 h-0.5 bg-elegant-cyan shadow shadow-elegant-cyan" />
              )}
            </button>

            {/* Nav Item 2: Game */}
            <button
              onClick={() => { if (isSoundEnabled) playBeep('click'); setActiveTab('game'); }}
              className={`flex flex-col items-center justify-center p-1.5 transition-all text-center relative select-none cursor-pointer outline-none ${activeTab === 'game' ? 'text-elegant-cyan' : 'text-[#837B9F]'}`}
            >
              <PlayCircle className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-medium tracking-tight">Game</span>
              
              {activeTab === 'game' && (
                <motion.div layoutId="nav-glow-pulse" className="absolute -bottom-1 w-5 h-0.5 bg-elegant-cyan shadow shadow-elegant-cyan" />
              )}
            </button>

            {/* Nav Item 3: Progress */}
            <button
              onClick={() => { if (isSoundEnabled) playBeep('click'); setActiveTab('progress'); }}
              className={`flex flex-col items-center justify-center p-1.5 transition-all text-center relative select-none cursor-pointer outline-none ${activeTab === 'progress' ? 'text-elegant-cyan' : 'text-[#837B9F]'}`}
            >
              <Activity className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-medium tracking-tight">Progress</span>
              
              {activeTab === 'progress' && (
                <motion.div layoutId="nav-glow-pulse" className="absolute -bottom-1 w-5 h-0.5 bg-elegant-cyan shadow shadow-elegant-cyan" />
              )}
            </button>

            {/* Nav Item 4: Profile */}
            <button
              onClick={() => { if (isSoundEnabled) playBeep('click'); setActiveTab('profile'); }}
              className={`flex flex-col items-center justify-center p-1.5 transition-all text-center relative select-none cursor-pointer outline-none ${activeTab === 'profile' ? 'text-elegant-cyan' : 'text-[#837B9F]'}`}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-medium tracking-tight">Profile</span>
              
              {activeTab === 'profile' && (
                <motion.div layoutId="nav-glow-pulse" className="absolute -bottom-1 w-5 h-0.5 bg-elegant-cyan shadow shadow-elegant-cyan" />
              )}
            </button>
          </div>
        )}

      </div>

      {/* Outer desktop instruction credits - purely discrete and humbler style */}
      <span className="hidden sm:block text-[10px] text-slate-500 font-mono mt-4 tracking-wider uppercase select-none">
        Chrono-Thread Smartphone Simulation Workspace
      </span>

      {/* Master Result & Level Complete Popup ("F-09 Hasil & Skor" / "F-09b Review Jawaban") */}
      <AnimatePresence>
        {completePopup && completePopup.show && (
          <motion.div
            key="game-result-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-60"
          >
            {!showAnswerReview ? (
              /* STANDARD F-09 SKOR & HASIL POPUP (Sleek dark theme matching mockup exactly) */
              <motion.div
                key="f09-skor-card"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#0C081A] border border-[#201C3F] rounded-[30px] p-6 max-w-[340px] w-full text-center shadow-2xl relative overflow-hidden"
              >
                {/* Soft gold backdrop glow at the top matching the mockup logo */}
                <div className="absolute top-0 inset-x-0 h-40 bg-radial-gradient from-[#F1C40F]/15 via-transparent to-transparent pointer-events-none" />

                {/* Yellow/Gold Cup Trophy */}
                <div className="mx-auto w-16 h-16 flex items-center justify-center text-[#F1C40F] mb-1 relative z-10">
                  <div className="absolute inset-0 bg-[#F1C40F]/10 blur-xl rounded-full" />
                  <Award className="w-12 h-12 text-[#F1C40F] filter drop-shadow-[0_0_10px_rgba(241,196,15,0.6)] animate-pulse" />
                </div>

                {/* HIGH SCORE BARU Badging capsule */}
                <div className="inline-flex items-center gap-1.5 bg-[#FEF9E7]/5 border border-[#FEF9E7]/20 text-[#FFC400] text-[9px] font-extrabold tracking-widest px-3.5 py-1 rounded-full uppercase mb-2 relative z-10">
                  <Sparkles className="w-3 h-3 text-[#FFC400]" />
                  HIGH SCORE BARU!
                </div>

                {/* Big Score / New XP text displaying the total current XP */}
                <div className="text-[52px] font-black tracking-tight bg-gradient-to-b from-white via-[#E2F5FF] to-[#80D6FF] text-transparent bg-clip-text font-display my-2 leading-none relative z-10 drop-shadow-[0_2px_10px_rgba(128,214,255,0.2)]">
                  {completePopup.newXp.toLocaleString()}
                </div>

                {/* Rocket capsule - Indonesian level up badging */}
                <div className="inline-flex items-center gap-1.5 bg-[#00C2FF]/10 border border-[#00C2FF]/20 text-[#00F0FF] font-extrabold text-[11px] py-1.5 px-4 rounded-full uppercase tracking-wider mb-2 relative z-10 transition">
                  <span>🚀</span>
                  {completePopup.isLevelUp ? `NAIK KE LEVEL ${completePopup.newLevel}!` : `KALI LEBIH DI LEVEL ${completePopup.newLevel}!`}
                </div>

                {/* 2-Column Stats Grid (Dark background matching the mockup) */}
                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                  {/* Correct Answers Card */}
                  <div className="bg-[#120B24] border border-[#201C3F] rounded-2xl p-3 flex flex-col items-center justify-center relative col-span-1 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#8F00FF]/10 border border-[#8F00FF]/30 flex items-center justify-center text-[#B1A6FF] mb-1.5">
                      <Check className="w-4 h-4 stroke-[3.5]" />
                    </div>
                    <span className="text-xl font-extrabold font-mono text-white leading-none">
                      {completePopup.correctCountStr}
                    </span>
                    <span className="text-[10px] text-[#8E87AA] font-sans font-medium mt-1">
                      Benar
                    </span>
                  </div>

                  {/* Experience Gain Card */}
                  <div className="bg-[#120B24] border border-[#201C3F] rounded-2xl p-3 flex flex-col items-center justify-center relative col-span-1 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#FFB703]/10 border border-[#FFB703]/30 flex items-center justify-center text-[#FFB703] mb-1.5">
                      <Zap className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-xl font-extrabold font-mono text-white leading-none">
                      +{completePopup.xpEarned}
                    </span>
                    <span className="text-[10px] text-[#8E87AA] font-sans font-medium mt-1">
                      XP
                    </span>
                  </div>
                </div>

                {/* Wide Time Card */}
                <div className="bg-[#120B24] border border-[#201C3F] rounded-2xl p-3 px-4 flex items-center justify-between w-full mt-3 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/30 flex items-center justify-center text-[#00F0FF]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-[#8E87AA] font-semibold font-sans">
                      Total Waktu
                    </span>
                  </div>
                  <span className="text-lg font-bold font-mono text-white leading-none">
                    {Math.floor(completePopup.timeSec / 60)}:{(completePopup.timeSec % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* 1. Transparent Cyan Outlined "LIHAT REVIEW JAWABAN" */}
                <button
                  align-auto="true"
                  id="btn-lihat-review"
                  onClick={() => {
                    if (isSoundEnabled) playBeep('click');
                    setShowAnswerReview(true);
                  }}
                  className="w-full mt-5 py-3.5 border border-[#23D2FF] bg-[#102B41]/20 hover:bg-[#23D2FF]/10 text-[#23D2FF] hover:text-white rounded-2xl text-xs font-extrabold tracking-wider flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-xs active:scale-[0.99]"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  LIHAT REVIEW JAWABAN
                </button>

                {/* 2. Filled Lavender "MAIN LAGI" */}
                <button
                  align-auto="true"
                  id="btn-main-lagi"
                  onClick={() => {
                    if (isSoundEnabled) playBeep('click');
                    setGameSessionKey(p => p + 1);
                    setActiveGameplay(completePopup.gameType === 'visual' ? 'visual_puzzle' : 'sequence_logic');
                    setCompletePopup(null);
                  }}
                  className="w-full mt-3 py-3.5 bg-[#B5ACFF] hover:bg-[#9E93FF] text-[#0C081A] rounded-2xl text-xs font-black tracking-wider flex items-center justify-center gap-2 transition duration-200 active:scale-[0.98] cursor-pointer shadow-[0_4px_20px_rgba(181,172,255,0.25)]"
                >
                  <RotateCcw className="w-4 h-4 shrink-0 text-[#0C081A]" />
                  MAIN LAGI
                </button>

                {/* 3. Small Home footer line */}
                <button
                  align-auto="true"
                  id="btn-home-close"
                  onClick={() => {
                    if (isSoundEnabled) playBeep('click');
                    setCompletePopup(null);
                    setActiveGameplay('none');
                    setActiveTab('home');
                  }}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#8E87AA] hover:text-white transition duration-200 cursor-pointer font-sans font-semibold pb-1.5"
                >
                  <Home className="w-3.5 h-3.5" />
                  Home
                </button>
              </motion.div>
            ) : (
              /* F-09B REVIEW JAWABAN SCREEN (Premium, dark-palette scrollable layout) */
              <motion.div
                key="f09b-review-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0C081A] border border-white/5 rounded-[30px] p-5 max-w-[360px] w-full h-[90vh] flex flex-col shadow-2xl relative overflow-hidden text-left"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between pb-3.5 border-b border-white/5 shrink-0 mb-4 pt-1">
                  <button 
                    onClick={() => { if (isSoundEnabled) playBeep('click'); setShowAnswerReview(false); }}
                    className="p-1 px-1.5 text-[#A599CD] hover:text-white shrink-0 cursor-pointer transition"
                    aria-label="Back to results"
                  >
                    <ArrowLeft className="w-5 h-5 text-slate-350" />
                  </button>
                  
                  <h2 className="text-xs uppercase font-extrabold font-display tracking-widest text-[#9D90CC] flex-1 text-center">
                    REVIEW JAWABAN
                  </h2>

                  {/* Right Badge pill indicating correctness */}
                  <span className="px-2.5 py-0.5 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-[10px] rounded-full bg-[#1C2C3E]/40 shadow-xs uppercase tracking-wider shrink-0">
                    {completePopup.correctCountStr} Benar
                  </span>
                </div>

                {/* Scrollable Questions list container */}
                <div className="flex-1 overflow-y-auto pr-1 pb-16 space-y-4 no-scrollbar">
                  {(() => {
                    const reviewItems = completePopup.gameType === 'visual' ? [
                      {
                        num: 1,
                        title: "Pertanyaan Mengenai Pola",
                        correct: completePopup.correctAnswersList ? completePopup.correctAnswersList[0] : true,
                        wrongAns: "Arah Rotasi Terbalik",
                        correctAns: "Arah Pola Searah Jarum Jam",
                        penjelasan: "Pola berputar 90 derajat searah jarum jam pada setiap langkah. Elemen tengah bertukar warna antara biru dan ungu secara bergantian."
                      },
                      {
                        num: 2,
                        title: "Urutan Memori",
                        correct: completePopup.correctAnswersList ? completePopup.correctAnswersList[1] : false,
                        wrongAns: "Segitiga, Kotak",
                        correctAns: "Segitiga, Lingkaran",
                        penjelasan: "Simbol kedua yang muncul adalah Lingkaran, bukan Kotak. Perhatikan kembali jeda waktu kemunculan simbol yang lebih cepat pada tahap ini."
                      },
                      {
                        num: 3,
                        title: "Kalkulasi Cepat",
                        correct: completePopup.correctAnswersList ? completePopup.correctAnswersList[2] : true,
                        wrongAns: "32",
                        correctAns: "42",
                        ansSuffix: "(42)",
                        penjelasan: "Sesuai dengan aturan BODMAS, perkalian dilakukan terlebih dahulu: (6 x 5) + 12 = 30 + 12 = 42."
                      },
                      {
                        num: 4,
                        title: "Orientasi Spasial",
                        correct: completePopup.correctAnswersList ? completePopup.correctAnswersList[3] : true,
                        penjelasan: null
                      },
                      {
                        num: 5,
                        title: "Fokus Terbagi",
                        correct: completePopup.correctAnswersList ? completePopup.correctAnswersList[4] : false,
                        wrongAns: "Target A",
                        correctAns: "Target C",
                        penjelasan: "Target C adalah satu-satunya objek yang bergerak berlawanan arah dengan kelompok mayoritas saat gangguan visual muncul."
                      }
                    ] : [
                      {
                        num: 1,
                        title: "Inisialisasi Keadaan Awal",
                        correct: completePopup.correctAnswersList ? completePopup.correctAnswersList[0] : true,
                        wrongAns: "Pengacakan Tanpa Urutan",
                        correctAns: "Prapemrosesan Pengurutan Naik",
                        penjelasan: "Prapemrosesan daftar data sangat penting dipastikan terurut sebelum pointer looping bergerak melacak target secara linear."
                      },
                      {
                        num: 2,
                        title: "Penetapan Batas Array",
                        correct: completePopup.correctAnswersList ? completePopup.correctAnswersList[1] : true,
                        wrongAns: "Definisi Null Pointer",
                        correctAns: "Penetapan Left & Right Bounds",
                        penjelasan: "Pointer kiri (index 0) dan pointer kanan (index N-1) menandai domain spasial loop aktif evaluasi."
                      },
                      {
                        num: 3,
                        title: "Kalkulasi Titik Tengah",
                        correct: completePopup.correctAnswersList ? completePopup.correctAnswersList[2] : true,
                        wrongAns: "Median Acak Float",
                        correctAns: "Floor Median Logaritmis (Mid)",
                        penjelasan: "Membagi domain logis menjadi dua biner simetris dengan rumus pembulatan pembagian median."
                      },
                      {
                        num: 4,
                        title: "Verifikasi Kondisi Ideal",
                        correct: completePopup.correctAnswersList ? completePopup.correctAnswersList[3] : true,
                        wrongAns: "Infinite Loop Check",
                        correctAns: "Direct Matching Terhadap Target",
                        penjelasan: "Jika elemen tengah langsung cocok dengan target, iterasi dihentikan seketika untuk efisiensi kognitif optimal."
                      },
                      {
                        num: 5,
                        title: "Pergeseran Iteratif",
                        correct: completePopup.correctAnswersList ? completePopup.correctAnswersList[4] : true,
                        wrongAns: "Reset All Bounds",
                        correctAns: "Pembaruan Pointer Terhadap Mid",
                        penjelasan: "Menyesuaikan domain baru (Left = Mid + 1 atau Right = Mid - 1) secara bertahap sampai kriteria kecocokan terpenuhi."
                      }
                    ];

                    return reviewItems.map((item) => {
                      const isItemCorrect = item.correct !== false;
                      const hasPenjelasan = !!item.penjelasan;

                      const cardStyle = isItemCorrect 
                        ? "border border-[#201C3F] bg-[#120D26]/60 rounded-2xl p-4 flex gap-3 relative overflow-hidden border-l-[3.5px] border-l-[#3AC9E3]"
                        : "border border-[#3B1A24] bg-[#221016] rounded-2xl p-4 flex gap-3 relative overflow-hidden border-l-[3.5px] border-l-rose-500";

                      return (
                        <div key={item.num} className={cardStyle}>
                          {/* Circle Index Badge */}
                          <div className="w-7 h-7 rounded-full bg-[#080514]/90 text-slate-400 text-[11px] font-mono font-extrabold flex items-center justify-center shrink-0">
                            {item.num}
                          </div>

                          <div className="flex-1 min-w-0 text-left">
                            <h5 className="text-[12.5px] font-bold text-white tracking-tight leading-normal">
                              {item.title}
                            </h5>

                            {isItemCorrect ? (
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-[#00F0FF] font-mono text-[10px] font-bold flex items-center gap-1">
                                  ✓ Jawaban Anda Benar {item.ansSuffix || ''}
                                </span>
                              </div>
                            ) : (
                              <div className="mt-1 space-y-0.5 font-mono text-[10px]">
                                <div className="text-rose-400 font-bold">
                                  ✕ Jawaban Anda: {item.wrongAns || 'Kurang Tepat'}
                                </div>
                                {item.correctAns && (
                                  <div className="text-[#00F0FF] font-semibold">
                                    ➜ Jawaban Benar: {item.correctAns}
                                  </div>
                                )}
                              </div>
                            )}

                            {hasPenjelasan && (
                              <div className="mt-2.5 p-2.5 bg-[#080514]/85 border border-white/5 rounded-xl text-[10px] text-slate-350 leading-relaxed font-sans">
                                <span className="block text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1 leading-none">PENJELASAN</span>
                                {item.penjelasan}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                {/* Absolute Floating Bottom Action Panel for Selesai Lavender button */}
                <div className="absolute bottom-4 left-0 right-0 px-5 bg-[#0C081A] pt-2 shrink-0">
                  <button
                    id="btn-selesai-review"
                    onClick={() => {
                      if (isSoundEnabled) playBeep('click');
                      setCompletePopup(null);
                      setActiveGameplay('none');
                      setActiveTab('home');
                    }}
                    className="w-full py-3.5 bg-[#C2BAFF] hover:bg-[#B1A6FF] text-slate-900 rounded-[24px] text-xs font-black tracking-wider flex items-center justify-center gap-2 transition duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    Selesai
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Level Up Overlay modal fallback (for daily claims etc) */}
      <AnimatePresence>
        {levelUpModal.show && (
          <motion.div
            key="level-up-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-60 text-center"
          >
            <motion.div
              initial={{ scale: 0.85, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, rotate: 2 }}
              className="bg-[#120924] border-2 border-amber-500 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              {/* Spinning lights ambient glow */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-amber-500/20 via-purple-600/10 to-transparent animate-spin-slow rounded-full filter blur-xl pointer-events-none select-none z-0"></div>
              
              <div className="mx-auto w-16 h-16 bg-amber-500/15 border-2 border-amber-500 rounded-2xl flex items-center justify-center text-amber-400 mb-4 animate-bounce relative z-10">
                <Sparkles className="w-10 h-10" />
              </div>

              <h3 className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-300 relative z-10 font-black">
                LEVEL UP!
              </h3>
              
              <p className="text-white text-lg font-bold font-display mt-2 relative z-10">
                REACHED FOCUS LEVEL {levelUpModal.levelReached}
              </p>

              <p className="text-xs text-slate-300 leading-relaxed mt-3 max-w-xs mx-auto relative z-10">
                Your focus vector potential is spreading! You have unlocked higher accuracy thresholds and expanded student leaderboard eligibility.
              </p>

              <div className="bg-[#090412]/80 border border-slate-800 p-3 rounded-xl mt-5 font-mono text-[10px] text-cyan-400 relative z-10">
                ★ Level Rewards unlocked: +50 Leaderboard Position Bonus ★
              </div>

              <button
                id="btn-close-lvl"
                onClick={() => setLevelUpModal({ show: false, levelReached: 1 })}
                className="mt-6 w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl text-xs tracking-wider transition uppercase shadow-lg shadow-orange-500/20 cursor-pointer relative z-10"
              >
                Continue Calibrating
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Firebase Authentication dialog modal overlay */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onAuthSuccess={(user, isNewUser) => {
              // Sync is handled by our dynamic auth-hook!
            }}
            currentGuestProfile={{
              username,
              schoolTag,
              xp,
              level: computedLevel,
              streakCount,
              streakStatus,
              lastClaimedDate,
              gameHistory,
              badges
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
