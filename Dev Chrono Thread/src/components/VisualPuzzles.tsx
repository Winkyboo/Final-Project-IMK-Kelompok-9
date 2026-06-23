/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Clock, 
  Zap, 
  Heart, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  RotateCcw,
  Compass,
  Trophy,
  Activity,
  Award
} from 'lucide-react';

interface VisualPuzzlesProps {
  onGameComplete: (xpEarned: number, timeSec: number, accuracy: number, puzzleTitle: string, correctAnswersList?: boolean[]) => void;
  onBackToDashboard: () => void;
  userLevel?: number;
  userXp?: number;
}

interface PatternQuestion {
  id: number;
  phrase: string;
  renderSequenceLeft: () => React.ReactNode;
  renderSequenceMiddle: () => React.ReactNode;
  options: {
    id: number;
    render: (colorClass?: string) => React.ReactNode;
  }[];
  correctIndex: number;
  explanationCorrect: string;
  explanationIncorrect: string;
}

// Custom simple sound helper inside the file
function localPlayBeep(type: 'success' | 'click' | 'miss' | 'complete') {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'miss') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'complete') {
      osc.type = 'sine';
      const times = [0, 0.1, 0.2, 0.3];
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      times.forEach((t, i) => {
        osc.frequency.setValueAtTime(freqs[i], ctx.currentTime + t);
      });
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) {
    // browser audio context block safeguard
  }
}

export default function VisualPuzzles({ onGameComplete, onBackToDashboard, userLevel = 2, userXp = 1240 }: VisualPuzzlesProps) {
  // Pattern Questions Master List
  const questions: PatternQuestion[] = [
    {
      id: 1,
      phrase: "LENGKAPI POLA BERIKUT:",
      correctIndex: 1,
      explanationCorrect: "Kamu berhasil mengidentifikasi penambahan garis pada pola. Teruskan fokusmu!",
      explanationIncorrect: "Polanya adalah penambahan satu garis di setiap langkah. Kamu memilih pola yang salah.",
      renderSequenceLeft: () => (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 fill-none" stroke="currentColor">
          <circle cx="50" cy="50" r="40" className="text-[#3AC9E3] stroke-[2.5]" />
          <line x1="50" y1="10" x2="50" y2="90" className="text-[#3AC9E3] stroke-[2.5]" />
        </svg>
      ),
      renderSequenceMiddle: () => (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 fill-none" stroke="currentColor">
          <circle cx="50" cy="50" r="40" className="text-[#3AC9E3] stroke-[2.5]" />
          <line x1="50" y1="10" x2="50" y2="90" className="text-[#3AC9E3] stroke-[2.5]" />
          <line x1="10" y1="50" x2="90" y2="50" className="text-[#3AC9E3] stroke-[2.5]" />
        </svg>
      ),
      options: [
        {
          id: 0,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <circle cx="50" cy="50" r="40" className="stroke-[2.5]" />
              <line x1="10" y1="50" x2="90" y2="50" className="stroke-[2.5]" />
            </svg>
          )
        },
        {
          id: 1,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <circle cx="50" cy="50" r="40" className="stroke-[2.5]" />
              <line x1="50" y1="10" x2="50" y2="90" className="stroke-[2.5]" />
              <line x1="10" y1="50" x2="90" y2="50" className="stroke-[2.5]" />
              <line x1="22" y1="22" x2="78" y2="78" className="stroke-[2.5]" />
              <line x1="78" y1="22" x2="22" y2="78" className="stroke-[2.5]" />
            </svg>
          )
        },
        {
          id: 2,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <circle cx="50" cy="50" r="40" className="stroke-[2.5]" />
              <line x1="22" y1="22" x2="78" y2="78" className="stroke-[2.5]" />
              <line x1="78" y1="22" x2="22" y2="78" className="stroke-[2.5]" />
            </svg>
          )
        },
        {
          id: 3,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <rect x="25" y="15" width="50" height="70" rx="8" className="stroke-[2.5]" />
              <line x1="50" y1="15" x2="50" y2="85" className="stroke-[2.5]" />
            </svg>
          )
        }
      ]
    },
    {
      id: 2,
      phrase: "LENGKAPI POLA BERIKUT:",
      correctIndex: 2,
      explanationCorrect: "Luar biasa! Kamu memahami arah putaran jarum jam sebesar 90 derajat!",
      explanationIncorrect: "Polanya adalah rotasi jarum jam 90 derajat searah jarum jam (12 ➔ 3 ➔ 6).",
      renderSequenceLeft: () => (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 fill-none" stroke="currentColor">
          <circle cx="50" cy="50" r="40" className="text-[#3AC9E3] stroke-[2.5]" />
          <line x1="50" y1="50" x2="50" y2="15" className="text-[#3AC9E3] stroke-[2.5]" />
          <polygon points="50,15 46,25 54,25" className="text-[#3AC9E3] fill-[#3AC9E3]" />
        </svg>
      ),
      renderSequenceMiddle: () => (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 fill-none" stroke="currentColor">
          <circle cx="50" cy="50" r="40" className="text-[#3AC9E3] stroke-[2.5]" />
          <line x1="50" y1="50" x2="85" y2="50" className="text-[#3AC9E3] stroke-[2.5]" />
          <polygon points="85,50 75,46 75,54" className="text-[#3AC9E3] fill-[#3AC9E3]" />
        </svg>
      ),
      options: [
        {
          id: 0,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <circle cx="50" cy="50" r="40" className="stroke-[2.5]" />
              <line x1="50" y1="50" x2="15" y2="50" className="stroke-[2.5]" />
              <polygon points="15,50 25,46 25,54" className="fill-current" />
            </svg>
          )
        },
        {
          id: 1,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <circle cx="50" cy="50" r="40" className="stroke-[2.5]" />
              <line x1="50" y1="50" x2="25" y2="25" className="stroke-[2.5]" />
              <polygon points="25,25 35,22 32,32" className="fill-current" />
            </svg>
          )
        },
        {
          id: 2,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <circle cx="50" cy="50" r="40" className="stroke-[2.5]" />
              <line x1="50" y1="50" x2="50" y2="85" className="stroke-[2.5]" />
              <polygon points="50,85 46,75 54,75" className="fill-current" />
            </svg>
          )
        },
        {
          id: 3,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <circle cx="50" cy="50" r="40" className="stroke-[2.5]" />
              <line x1="50" y1="50" x2="50" y2="15" className="stroke-[2.5]" />
              <polygon points="50,15 46,25 54,25" className="fill-current" />
            </svg>
          )
        }
      ]
    },
    {
      id: 3,
      phrase: "LENGKAPI POLA BERIKUT:",
      correctIndex: 0,
      explanationCorrect: "Hebat! Bentuk lingkaran dalam membesar secara konsisten mengisi ruang segitiga.",
      explanationIncorrect: "Polanya adalah pembesaran ukuran elemen bulat yang berada di dalam segitiga luar.",
      renderSequenceLeft: () => (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 fill-none" stroke="currentColor">
          <polygon points="50,10 90,85 10,85" className="text-[#3AC9E3] stroke-[2.5]" />
          <circle cx="50" cy="55" r="10" className="text-[#3AC9E3] stroke-[2.5] fill-none" />
        </svg>
      ),
      renderSequenceMiddle: () => (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 fill-none" stroke="currentColor">
          <polygon points="50,10 90,85 10,85" className="text-[#3AC9E3] stroke-[2.5]" />
          <circle cx="50" cy="55" r="20" className="text-[#3AC9E3] stroke-[2.5] fill-none" />
        </svg>
      ),
      options: [
        {
          id: 0,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <polygon points="50,10 90,85 10,85" className="stroke-[2.5]" />
              <circle cx="50" cy="55" r="30" className="stroke-[2.5] fill-none" />
            </svg>
          )
        },
        {
          id: 1,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <polygon points="50,25 80,80 20,80" className="stroke-[2.5]" />
              <circle cx="50" cy="50" r="45" className="stroke-[2.5] fill-none" />
            </svg>
          )
        },
        {
          id: 2,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <polygon points="50,10 90,85 10,85" className="stroke-[2.5]" />
            </svg>
          )
        },
        {
          id: 3,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <rect x="20" y="20" width="60" height="60" rx="4" className="stroke-[2.5]" />
              <circle cx="50" cy="50" r="15" className="stroke-[2.5] fill-none" />
            </svg>
          )
        }
      ]
    },
    {
      id: 4,
      phrase: "LENGKAPI POLA BERIKUT:",
      correctIndex: 2,
      explanationCorrect: "Presisi tinggi! Setiap langkah menambahkan satu kuadran berwarna searah jarum jam.",
      explanationIncorrect: "Kuadran persegi ditambahkan secara bertahap searah jarum jam (1 kuadran ➔ 2 ➔ 3).",
      renderSequenceLeft: () => (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 fill-none" stroke="currentColor">
          <rect x="10" y="10" width="80" height="80" rx="4" className="text-[#3AC9E3] stroke-[2.5]" />
          <line x1="50" y1="10" x2="50" y2="90" className="text-[#3AC9E3] stroke-[1]" strokeDasharray="2" />
          <line x1="10" y1="50" x2="90" y2="50" className="text-[#3AC9E3] stroke-[1]" strokeDasharray="2" />
          <rect x="10" y="10" width="40" height="40" className="text-[#3AC9E3] fill-[#3AC9E3]/40" />
        </svg>
      ),
      renderSequenceMiddle: () => (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 fill-none" stroke="currentColor">
          <rect x="10" y="10" width="80" height="80" rx="4" className="text-[#3AC9E3] stroke-[2.5]" />
          <line x1="50" y1="10" x2="50" y2="90" className="text-[#3AC9E3] stroke-[1]" strokeDasharray="2" />
          <line x1="10" y1="50" x2="90" y2="50" className="text-[#3AC9E3] stroke-[1]" strokeDasharray="2" />
          <rect x="10" y="10" width="40" height="40" className="text-[#3AC9E3] fill-[#3AC9E3]/40" />
          <rect x="50" y="10" width="40" height="40" className="text-[#3AC9E3] fill-[#3AC9E3]/40" />
        </svg>
      ),
      options: [
        {
          id: 0,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <rect x="10" y="10" width="80" height="80" rx="4" className="stroke-[2.5]" />
              <rect x="10" y="10" width="80" height="80" rx="4" className="fill-current/30 stroke-[2.5]" />
            </svg>
          )
        },
        {
          id: 1,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <rect x="10" y="10" width="80" height="80" rx="4" className="stroke-[2.5]" />
              <line x1="50" y1="10" x2="50" y2="90" className="stroke-[1]" strokeDasharray="2" />
              <line x1="10" y1="50" x2="90" y2="50" className="stroke-[1]" strokeDasharray="2" />
              <rect x="10" y="50" width="40" height="40" className="fill-current/40" />
            </svg>
          )
        },
        {
          id: 2,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <rect x="10" y="10" width="80" height="80" rx="4" className="stroke-[2.5]" />
              <line x1="50" y1="10" x2="50" y2="90" className="stroke-[1]" strokeDasharray="2" />
              <line x1="10" y1="50" x2="90" y2="50" className="stroke-[1]" strokeDasharray="2" />
              <rect x="10" y="10" width="40" height="40" className="fill-current/40" />
              <rect x="50" y="10" width="40" height="40" className="fill-current/40" />
              <rect x="50" y="50" width="40" height="40" className="fill-current/40" />
            </svg>
          )
        },
        {
          id: 3,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <rect x="10" y="10" width="80" height="80" rx="4" className="stroke-[2.5]" />
              <line x1="50" y1="10" x2="50" y2="90" className="stroke-[1]" strokeDasharray="2" />
              <line x1="10" y1="50" x2="90" y2="50" className="stroke-[1]" strokeDasharray="2" />
              <rect x="50" y="10" width="40" height="40" className="fill-current/40" />
            </svg>
          )
        }
      ]
    },
    {
      id: 5,
      phrase: "LENGKAPI POLA BERIKUT:",
      correctIndex: 1,
      explanationCorrect: "Sempurna! Jumlah ruas garis bertambah satu di setiap langkah (2 ➔ 3 ➔ 4 ruas).",
      explanationIncorrect: "Pola didasarkan pada penambahan jumlah sisi/ruas garis geometri secara berurutan.",
      renderSequenceLeft: () => (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 fill-none" stroke="currentColor">
          <path d="M 20 80 L 50 20 L 80 80" className="text-[#3AC9E3] stroke-[2.5]" />
        </svg>
      ),
      renderSequenceMiddle: () => (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 fill-none" stroke="currentColor">
          <polygon points="50,15 85,80 15,80" className="text-[#3AC9E3] stroke-[2.5]" />
        </svg>
      ),
      options: [
        {
          id: 0,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <polygon points="50,15 85,40 70,80 30,80 15,40" className="stroke-[2.5]" />
            </svg>
          )
        },
        {
          id: 1,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <polygon points="50,15 85,50 50,85 15,50" className="stroke-[2.5]" />
            </svg>
          )
        },
        {
          id: 2,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <circle cx="50" cy="50" r="40" className="stroke-[2.5]" />
            </svg>
          )
        },
        {
          id: 3,
          render: (colorClass = "text-slate-300") => (
            <svg viewBox="0 0 100 100" className={`w-10 h-10 md:w-12 md:h-12 fill-none ${colorClass}`} stroke="currentColor">
              <line x1="15" y1="50" x2="85" y2="50" className="stroke-[2.5]" />
            </svg>
          )
        }
      ]
    }
  ];

  // Gameplay State
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(3);
  const [correctAnswersList, setCorrectAnswersList] = useState<boolean[]>([]);
  const [accumulatedXp, setAccumulatedXp] = useState<number>(userXp);
  const [bonusEarned, setBonusEarned] = useState<number>(0);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'completed' | 'gameover'>('playing');

  // Timers: Countdowns from 180 seconds (03:00)
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          localPlayBeep('miss');
          setGameStatus('completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentQuestion = questions[currentIdx];

  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId: number) => {
    if (hasAnswered || gameStatus !== 'playing') return;

    localPlayBeep('click');
    setSelectedAns(optionId);
    setHasAnswered(true);
    setTotalQuestionsAnswered(prev => prev + 1);

    const isCorrect = optionId === currentQuestion.correctIndex;
    if (isCorrect) {
      localPlayBeep('success');
      setCorrectAnswersList(prev => [...prev, true]);
      setBonusEarned(prev => prev + 60);
      setAccumulatedXp(prev => prev + 60);
    } else {
      localPlayBeep('miss');
      setCorrectAnswersList(prev => [...prev, false]);
      setLives(prev => prev - 1);
    }
  };

  // Listen for ending conditions in useEffect to avoid any stale closures
  useEffect(() => {
    if (lives <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      let finalAnswers = [...correctAnswersList];
      // Ensure we fill to 5 options for review
      while (finalAnswers.length < 5) {
        finalAnswers.push(false);
      }
      const accurateCount = finalAnswers.filter(Boolean).length;
      const accuracy = Math.round((accurateCount / 5) * 100);
      const finalAccuracy = Math.min(100, accuracy);
      onGameComplete(bonusEarned, 180 - timeLeft, finalAccuracy, `Visual Puzzle: Pattern Completer`, finalAnswers);
    }
  }, [lives]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      let finalAnswers = [...correctAnswersList];
      while (finalAnswers.length < 5) {
        finalAnswers.push(false);
      }
      const accurateCount = finalAnswers.filter(Boolean).length;
      const accuracy = Math.round((accurateCount / 5) * 100);
      onGameComplete(bonusEarned, 180, accuracy, `Visual Puzzle: Pattern Completer`, finalAnswers);
    }
  }, [timeLeft]);

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAns(null);
      setHasAnswered(false);
    } else {
      localPlayBeep('complete');
      if (timerRef.current) clearInterval(timerRef.current);
      let finalAnswers = [...correctAnswersList];
      while (finalAnswers.length < 5) {
        finalAnswers.push(false);
      }
      const accurateCount = finalAnswers.filter(Boolean).length;
      const accuracy = Math.round((accurateCount / 5) * 100);
      onGameComplete(bonusEarned, 180 - timeLeft, accuracy, `Visual Puzzle: Pattern Completer`, finalAnswers);
    }
  };

  const triggerClaimAndExit = () => {
    localPlayBeep('click');
    let finalAnswers = [...correctAnswersList];
    while (finalAnswers.length < 5) {
      finalAnswers.push(false);
    }
    const accurateCount = finalAnswers.filter(Boolean).length;
    const accuracy = Math.round((accurateCount / 5) * 100);
    onGameComplete(bonusEarned, 180 - timeLeft, accuracy, `Visual Puzzle: Pattern Completer`, finalAnswers);
  };

  return (
    <div id="visual-puzzles-pane" className="w-full max-w-md mx-auto p-1 text-slate-100 flex flex-col font-sans select-none">
      
      {/* HEADER SECTION (F-07a matching mockup top bar) */}
      <div className="w-full flex items-center justify-between py-2 border-b border-white/5 bg-[#0A0516] shrink-0 mb-4 px-1">
        <button 
          onClick={onBackToDashboard}
          className="p-1 px-1.5 text-slate-400 hover:text-white shrink-0 cursor-pointer transition"
          aria-label="Quit game"
        >
          <X className="w-5 h-5 text-slate-450" />
        </button>
        
        <h2 className="text-xs uppercase font-extrabold font-display tracking-widest text-[#9D90CC] flex items-center gap-1">
          VISUAL PUZZLE
        </h2>

        {/* Level badge */}
        <span className="px-2.5 py-0.5 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-[10px] rounded-full bg-[#1C2C3E]/40 shadow-xs uppercase tracking-wider shrink-0">
          LV {userLevel}
        </span>
      </div>

      {/* CORE HUD COMPONENT (F-07a layout) */}
      <div className="w-full bg-[#120B24] border border-[#261F40] rounded-2xl px-5 py-3.5 flex items-center justify-between mb-5 shadow-inner">
        {/* Timer countdown state */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-[#00F0FF] font-mono font-black text-sm tracking-tight">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Dynamic XP Score representer */}
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-purple-400 animate-bounce" />
          <span className="text-white font-mono font-extrabold text-sm tracking-tight text-center">
            {accumulatedXp.toLocaleString()}
          </span>
        </div>

        {/* Hearts list representer */}
        <div className="flex items-center gap-0.8">
          {[1, 2, 3].map((val) => {
            const isFull = val <= lives;
            return (
              <span key={val} className="text-base select-none">
                {isFull ? '❤️' : '♡'}
              </span>
            );
          })}
        </div>
      </div>

      {/* GAMEPLAY CORE SECTION */}
      {gameStatus === 'playing' ? (
        <div className="space-y-4">
          
          {/* Puzzle Title Instruction */}
          <div className="text-center">
            <h4 className="text-[11px] font-extrabold font-mono tracking-widest text-[#B0A2DC] uppercase">
              {currentQuestion.phrase}
            </h4>
          </div>

          {/* SVG Sequence Box */}
          <div className="w-full border border-[#2F2156] bg-[#140F2D] rounded-2xl p-6 flex items-center justify-center gap-4 shadow-xl">
            {/* Shape 1 */}
            <div className="w-14 h-14 bg-[#110D2C] border border-[#211E4C] rounded-2xl flex items-center justify-center shrink-0">
              {currentQuestion.renderSequenceLeft()}
            </div>

            {/* Pointer direction arrow */}
            <span className="text-[#6F6A8F] font-bold text-lg select-none">➔</span>

            {/* Shape 2 */}
            <div className="w-14 h-14 bg-[#110D2C] border border-[#211E4C] rounded-2xl flex items-center justify-center shrink-0">
              {currentQuestion.renderSequenceMiddle()}
            </div>

            {/* Pointer direction arrow */}
            <span className="text-[#6F6A8F] font-bold text-lg select-none">➔</span>

            {/* Pattern Target ? Placeholder mockup */}
            <div className="w-14 h-14 bg-[#110D2C] border-2 border-dashed border-[#574FA9] rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden">
              {hasAnswered && selectedAns === currentQuestion.correctIndex ? (
                currentQuestion.options[currentQuestion.correctIndex].render("text-[#3AC9E3]")
              ) : (
                <span className="text-[#B0A2DC] font-black text-xl select-none animate-pulse">?</span>
              )}
            </div>
          </div>

          {/* Selection Choices Option Grid */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedAns === opt.id;
              const isCorrectOpt = opt.id === currentQuestion.correctIndex;

              let cardStyle = "border-[#2B2350] bg-[#1A1235]/45 hover:bg-[#1A1235]/70 text-slate-350";
              let statusOverlay = null;

              if (hasAnswered) {
                if (isCorrectOpt) {
                  // Always highlight correct option with emerald green
                  cardStyle = "border-2 border-emerald-500 bg-[#122A26]/50 text-white shadow-lg shadow-emerald-950/20";
                  statusOverlay = (
                    <span className="absolute top-2.5 right-2.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-xs select-none">✓</span>
                  );
                } else if (isSelected) {
                  // If selected bad ans, highlight card with red/rose
                  cardStyle = "border-2 border-rose-500 bg-[#2D1620]/50 text-white shadow-lg shadow-rose-950/20";
                  statusOverlay = (
                    <span className="absolute top-2.5 right-2.5 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-xs select-none">✕</span>
                  );
                } else {
                  cardStyle = "border-[#2B2350]/30 bg-[#130E26]/20 text-slate-500 opacity-60";
                }
              }

              return (
                <button
                  align-auto="true"
                  id={`opt-visual-${opt.id}`}
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={hasAnswered}
                  className={`aspect-square rounded-2xl border flex items-center justify-center relative cursor-pointer outline-none transition duration-200 ${cardStyle}`}
                >
                  <div className="scale-105 p-3">
                    {opt.render(hasAnswered ? (isCorrectOpt ? "text-emerald-400" : (isSelected ? "text-rose-450" : "text-slate-500")) : "text-slate-300")}
                  </div>
                  
                  {statusOverlay}
                </button>
              );
            })}
          </div>

          {/* DYNAMIC FEEDBACK OVERLAY CARD (F-07a/F-07b matching layout) */}
          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="w-full mt-3 z-30"
              >
                {selectedAns === currentQuestion.correctIndex ? (
                  /* CORRECT NOTIFICATION CARD */
                  <div className="bg-[#1B162C] border border-emerald-500/40 p-5 rounded-2xl flex flex-col gap-3.5 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-400 font-bold" />
                      </div>
                      <div className="leading-tight">
                        <h4 className="text-emerald-400 font-display font-extrabold text-sm">
                          Jawaban Benar!
                        </h4>
                        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                          {currentQuestion.explanationCorrect}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-2.5 bg-[#705FF5] hover:bg-[#604FE3] text-white rounded-xl text-xs font-bold font-sans tracking-wide flex items-center justify-center gap-1 cursor-pointer transition active:scale-[0.98]"
                    >
                      <span>Lanjut</span>
                      <span>➔</span>
                    </button>
                  </div>
                ) : (
                  /* INCORRECT NOTIFICATION CARD */
                  <div className="bg-[#36101D] border border-rose-500/40 p-5 rounded-2xl flex flex-col gap-3.5 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
                        <XCircle className="w-5 h-5 text-rose-400" />
                      </div>
                      <div className="leading-tight">
                        <h4 className="text-rose-405 font-display font-extrabold text-sm">
                          Jawaban Salah!
                        </h4>
                        <p className="text-[11px] text-slate-350 mt-1 leading-relaxed">
                          {currentQuestion.explanationIncorrect}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-2.5 bg-[#FAB39D] hover:bg-[#ECA38D] text-slate-900 rounded-xl text-xs font-black tracking-wide flex items-center justify-center gap-1 cursor-pointer transition active:scale-[0.98]"
                    >
                      <span>Lanjut</span>
                      <span>➔</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active progress tracker pill */}
          <div className="flex justify-center items-center gap-1.5 pt-2 text-[10px] text-slate-550 font-mono">
            <span>RANGKAIAN:</span>
            {questions.map((q, idx) => {
              const isActive = idx === currentIdx;
              const isPassed = idx < currentIdx;
              const isCorrectVal = correctAnswersList[idx];

              let dotStyle = 'bg-neutral-800 border border-slate-700 w-2.5 h-2.5';
              if (isActive) dotStyle = 'bg-cyan-400 w-5 h-2.5 rounded-full';
              else if (isPassed) {
                dotStyle = isCorrectVal ? 'bg-emerald-500 w-2.5 h-2.5' : 'bg-rose-500 w-2.5 h-2.5';
              }

              return (
                <span key={q.id} className={`rounded-full transition-all duration-200 ${dotStyle}`} />
              );
            })}
          </div>

        </div>
      ) : (
        /* GAME OVER / COMPLETION SCREEN RESULT BOX (F-09 style) */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#120B24] border border-[#261F40] rounded-3xl p-6 text-center space-y-5 shadow-2xl relative overflow-hidden"
        >
          {/* Radiant top backdrop light */}
          <div className={`absolute top-0 inset-x-0 h-28 bg-gradient-to-b ${gameStatus === 'completed' ? 'from-emerald-500/10' : 'from-rose-500/10'} to-transparent`} />

          {/* Center Trophy Icon or Warning Icon */}
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-1 relative z-10 animate-bounce">
            {gameStatus === 'completed' ? (
              <div className="w-16 h-16 bg-emerald-550/15 rounded-full flex items-center justify-center border border-emerald-500/35">
                <Trophy className="w-9 h-9 text-emerald-400" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-rose-550/15 rounded-full flex items-center justify-center border border-rose-500/35">
                <Activity className="w-9 h-9 text-rose-450" />
              </div>
            )}
          </div>

          <div className="space-y-1 relative z-10">
            {gameStatus === 'completed' ? (
              <>
                <span className="block text-[10px] text-amber-400 font-mono font-black tracking-widest uppercase">★ TANTANGAN SELESAI ★</span>
                <h3 className="text-white font-display font-extrabold text-xl leading-snug">Visual Sinyal Sempurna!</h3>
              </>
            ) : (
              <>
                <span className="block text-[10px] text-rose-450 font-mono font-black tracking-widest uppercase">⚡ DETOKSIKASI LOGAM ⚡</span>
                <h3 className="text-white font-display font-extrabold text-xl">Sesi Terputus (Gagal)</h3>
              </>
            )}
            <p className="text-xs text-slate-400 px-4 leading-relaxed">
              {gameStatus === 'completed' 
                ? 'Integrasi neural visual terkalibrasi dengan baik. Jaringan logika matrik berhasil dimurnikan.'
                : 'Fokus terdistraksi sebelum selesai. Ambil nafas tenang dan ulangi kalibrasi visual.'}
            </p>
          </div>

          {/* Premium scoreboard box */}
          <div className="bg-[#0A0516] border border-[#20173A] rounded-2xl p-4 space-y-2.5 text-left font-mono text-xs text-slate-350 relative z-10">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span>Keakuratan Sesi</span>
              <span className={`font-black ${gameStatus === 'completed' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {correctAnswersList.filter(Boolean).length} / {questions.length} Benar
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span>Sisa Waktu</span>
              <span className="text-cyan-400 font-extrabold">{formatTime(timeLeft)}</span>
            </div>

            <div className="flex justify-between items-center pt-1 font-sans">
              <span className="font-bold text-slate-200">Bonus Hadiah XP</span>
              <span className="text-amber-400 font-black text-sm">+{bonusEarned} XP</span>
            </div>
          </div>

          {/* Exit / retry Buttons */}
          <div className="space-y-2.5 pt-2 relative z-10">
            <button
              onClick={triggerClaimAndExit}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/15 cursor-pointer transition active:scale-[0.98]"
            >
              Klaim & Kembali Ke Beranda
            </button>

            {gameStatus !== 'completed' && (
              <button
                onClick={() => {
                  localPlayBeep('click');
                  setLives(3);
                  setSelectedAns(null);
                  setHasAnswered(false);
                  setCurrentIdx(0);
                  setCorrectAnswersList([]);
                  setBonusEarned(0);
                  setTotalQuestionsAnswered(0);
                  setTimeLeft(180);
                  setGameStatus('playing');
                }}
                className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-850 border border-slate-800 text-slate-300 font-semibold text-xs uppercase rounded-xl cursor-pointer transition"
              >
                Ulangi Kalibrasi
              </button>
            )}
          </div>

        </motion.div>
      )}

    </div>
  );
}
