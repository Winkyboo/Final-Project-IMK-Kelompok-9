/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Zap,
  X,
  CheckCircle2,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Info,
  HelpCircle
} from 'lucide-react';
import { SequencePuzzle, SequenceStep } from '../types';
import { SEQUENCES } from '../puzzlesData';

interface SequenceLogicProps {
  onGameComplete: (xpEarned: number, timeSec: number, accuracy: number, puzzleTitle: string, correctAnswersList?: boolean[]) => void;
  onBackToDashboard: () => void;
  userLevel?: number;
  userXp?: number;
}

export default function SequenceLogic({
  onGameComplete,
  onBackToDashboard,
  userLevel = 2,
  userXp = 1250
}: SequenceLogicProps) {
  const [activePuzzle, setActivePuzzle] = useState<SequencePuzzle>(SEQUENCES[1] || SEQUENCES[0]); // default to Bubble Sort (SEQUENCES[1]) to match mockup
  const [currentSlots, setCurrentSlots] = useState<SequenceStep[]>([]);
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  
  // Game states
  const [seconds, setSeconds] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isFullyCorrect, setIsFullyCorrect] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<{ [stepId: string]: 'correct' | 'wrong' | null }>({});
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [lives, setLives] = useState<number>(3);

  // Sound helper (mock or custom)
  const playLocalBeep = (type: 'success' | 'click' | 'miss') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'miss') {
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
        osc.frequency.setValueAtTime(147, audioCtx.currentTime + 0.1); // D3
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      }
    } catch (e) {
      // Audio context blocked or not supported
    }
  };

  // Load and shuffle puzzle steps
  useEffect(() => {
    // Generate a shuffled copy of steps
    const shuffled = [...activePuzzle.steps].sort(() => Math.random() - 0.5);
    setCurrentSlots(shuffled);
    setSelectedStepId(null);
    setAttempts(0);
    setIsFullyCorrect(false);
    setFeedbackMap({});
    setShowExplanation(null);
    setSeconds(0);
    setLives(3);

    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activePuzzle]);

  // Click-to-swap mechanism
  const handleStepClick = (stepId: string) => {
    if (isFullyCorrect) return;

    playLocalBeep('click');
    if (selectedStepId === null) {
      setSelectedStepId(stepId);
    } else {
      if (selectedStepId === stepId) {
        // Deselect
        setSelectedStepId(null);
      } else {
        // Swap slots
        const stepIndexA = currentSlots.findIndex(s => s.id === selectedStepId);
        const stepIndexB = currentSlots.findIndex(s => s.id === stepId);
        
        const updated = [...currentSlots];
        const temp = updated[stepIndexA];
        updated[stepIndexA] = updated[stepIndexB];
        updated[stepIndexB] = temp;
        
        setCurrentSlots(updated);
        setSelectedStepId(null);
        // Clear feedbacks on shift
        setFeedbackMap({});
      }
    }
  };

  // Up/Down controls
  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (isFullyCorrect) return;
    playLocalBeep('click');
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentSlots.length) return;

    const updated = [...currentSlots];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setCurrentSlots(updated);
    setFeedbackMap({});
  };

  // Check positions
  const checkCurrentOrder = () => {
    setAttempts(prev => prev + 1);
    const newFeedbackMap: { [stepId: string]: 'correct' | 'wrong' | null } = {};
    let correctCount = 0;

    currentSlots.forEach((step, index) => {
      if (step.correctOffset === index) {
        newFeedbackMap[step.id] = 'correct';
        correctCount++;
      } else {
        newFeedbackMap[step.id] = 'wrong';
      }
    });

    setFeedbackMap(newFeedbackMap);

    if (correctCount === activePuzzle.steps.length) {
      setIsFullyCorrect(true);
      playLocalBeep('success');
    } else {
      playLocalBeep('miss');
      setLives(prev => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          // Immediately call parent failure complete: 0 XP, 0 accuracy
          onGameComplete(0, seconds, 0, `Core Sequence: ${activePuzzle.title}`, currentSlots.map((step, idx) => step.correctOffset === idx));
        }
        return nextLives;
      });
    }
  };

  const calculateFinalXpReward = () => {
    const maxVal = activePuzzle.xpValue;
    const accuracy = Math.max(20, Math.round((1 / (attempts || 1)) * 100));
    return Math.max(50, Math.round(maxVal * (accuracy / 100)));
  };

  const handleNextChallenge = () => {
    const finalXp = calculateFinalXpReward();
    // 100% accuracy on successful re-order completion
    const accuracy = 100;
    // Step correctness is all correct since they solved it perfectly
    const sequenceAnswers = currentSlots.map(() => true);
    
    onGameComplete(finalXp, seconds, accuracy, `Core Sequence: ${activePuzzle.title}`, sequenceAnswers);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div id="sequence-logic-pane" className="w-full max-w-md mx-auto p-1 text-slate-100 flex flex-col font-sans select-none">
      
      {/* HEADER SECTION (F-08 matching top bar) */}
      <div className="w-full flex items-center justify-between py-2 border-b border-white/5 bg-[#0A0516] shrink-0 mb-4 px-1">
        <button 
          onClick={onBackToDashboard}
          className="p-1 px-1.5 text-slate-400 hover:text-white shrink-0 cursor-pointer transition"
          aria-label="Quit game"
        >
          <X className="w-5 h-5 text-slate-450" />
        </button>
        
        <h2 className="text-xs uppercase font-extrabold font-display tracking-widest text-[#9D90CC] flex items-center gap-1">
          LOGIKA & URUTAN
        </h2>

        {/* Level Badge matching mockup F-08 top right */}
        <span className="px-2.5 py-0.5 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-[10px] rounded-full bg-[#1C2C3E]/40 shadow-xs uppercase tracking-wider shrink-0">
          LV {userLevel}
        </span>
      </div>

      {/* CORE HUD COMPONENT (F-08 mockup style matching F-07a) */}
      <div className="w-full bg-[#120B24] border border-[#261F40] rounded-2xl px-5 py-3.5 flex items-center justify-between mb-5 shadow-inner">
        {/* Timer countdown state */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-[#00F0FF] font-mono font-black text-sm tracking-tight">
            {formatTime(seconds)}
          </span>
        </div>

        {/* Dynamic XP Score representer */}
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-400 fill-current animate-bounce" />
          <span className="text-white font-mono font-extrabold text-sm tracking-tight text-center">
            {userXp.toLocaleString()}
          </span>
        </div>

        {/* Hearts list representer (lives) */}
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

      {/* MAIN TITLE INTRO */}
      <div className="text-center space-y-1 mb-4">
        <h3 className="text-[13px] font-extrabold font-mono tracking-widest text-[#A294CE] uppercase">
          SUSUN URUTAN YANG BENAR:
        </h3>
        <h4 className="text-lg font-black font-display text-white tracking-tight">
          {activePuzzle.algorithmName}
        </h4>

        {/* Tech guidelines micro pill */}
        <div className="inline-flex items-center gap-1.5 bg-[#17112E] border border-[#342A5E] text-[#B0A7D9] text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase mt-1">
          ⇅ TEKAN PANAH UNTUK MENGURUTKAN
        </div>
      </div>

      {/* CORE STEP REORDERING DECK */}
      <div className="space-y-3 mb-6">
        {currentSlots.map((step, index) => {
          const isSelected = selectedStepId === step.id;
          const feedback = feedbackMap[step.id];

          let borderStyle = 'border-[#261F40] bg-[#120B24] hover:bg-[#1C1335]/70 text-slate-100';
          let indicatorBadgeColor = 'bg-[#18112E] text-slate-450 border border-[#2A2352]';
          let prefixNumber = `${index + 1}`;

          if (isSelected) {
            borderStyle = 'border-[#00FFFF] bg-[#0F2232] shadow-md shadow-cyan-900/10 animate-pulse';
            indicatorBadgeColor = 'bg-[#00D2FF] text-slate-950 font-black';
          } else if (feedback === 'correct') {
            borderStyle = 'border-emerald-500/70 bg-[#0F291D] text-slate-200';
            indicatorBadgeColor = 'bg-emerald-500 text-slate-950 font-black';
            prefixNumber = '✓';
          } else if (feedback === 'wrong') {
            borderStyle = 'border-rose-500/70 bg-[#29101B] text-slate-300';
            indicatorBadgeColor = 'bg-rose-500 text-slate-950 font-black';
            prefixNumber = '✗';
          }

          return (
            <div
              id={`step-card-${step.id}`}
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className={`border rounded-xl p-3 md:p-3.5 flex items-start gap-3 transition-all duration-200 cursor-pointer relative overflow-hidden ${borderStyle}`}
            >
              {/* Leftmost grip drag indicator */}
              <div className="flex items-center justify-center text-slate-500 shrink-0 self-center">
                <GripVertical className="w-4 h-4 opacity-75" />
              </div>

              {/* Number/Score Indicator badge on Left */}
              <div className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center shrink-0 self-center ${indicatorBadgeColor}`}>
                {prefixNumber}
              </div>

              {/* Main instructional text block */}
              <div className="flex-1 min-w-0 pr-1 self-center">
                <p className="text-[11.5px] md:text-xs text-slate-200 font-sans leading-normal">
                  {step.text}
                </p>

                {/* Inline Clue Box */}
                <AnimatePresence>
                  {showExplanation === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-2 text-[10px] text-cyan-400 bg-cyan-950/20 p-2 rounded border border-cyan-800/30 font-mono leading-relaxed"
                    >
                      <span className="font-bold text-slate-300">CLUE:</span> {step.explanation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right-most Up / Down Arrows & Info Trigger */}
              <div className="flex items-center gap-1 shrink-0 self-center" onClick={(e) => e.stopPropagation()}>
                <button
                  id={`btn-info-${step.id}`}
                  onClick={() => setShowExplanation(showExplanation === step.id ? null : step.id)}
                  className="p-1 text-slate-450 hover:text-cyan-400 hover:bg-slate-800/40 rounded transition cursor-pointer"
                  title="Read clue"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                
                <button
                  id={`btn-up-${step.id}`}
                  onClick={() => moveStep(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-slate-450 hover:text-white hover:bg-slate-800/40 rounded disabled:opacity-20 cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  id={`btn-down-${step.id}`}
                  onClick={() => moveStep(index, 'down')}
                  disabled={index === currentSlots.length - 1}
                  className="p-1 text-slate-450 hover:text-white hover:bg-slate-800/40 rounded disabled:opacity-20 cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* ACTIONS SUB-ZONE PANEL (F-08 matching layouts) */}
      <AnimatePresence mode="wait">
        {isFullyCorrect ? (
          /* GREEN FEEDBACK PANEL (F-08 Gameplay Logika & Urutan Feedback Benar) */
          <motion.div
            key="feedback-benat"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#11261B] border border-emerald-500/40 p-4 rounded-2xl flex flex-col gap-3 shadow-2xl relative"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 font-bold" />
              </div>
              <div className="leading-tight text-left">
                <h4 className="text-emerald-400 font-display font-extrabold text-[13px]">
                  Jawaban Benar!
                </h4>
                <p className="text-[10px] text-slate-300 mt-0.5 leading-relaxed">
                  Kamu berhasil menyusun langkah bubble sort dengan tepat. Pertahankan konsistensimu!
                </p>
              </div>
            </div>

            <button
              onClick={handleNextChallenge}
              className="w-full py-2.5 bg-[#785CFF] hover:bg-[#684CEF] text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 transition active:scale-[0.98] cursor-pointer"
            >
              <span>Lanjut</span>
              <span>➔</span>
            </button>
          </motion.div>
        ) : (
          /* UNVERIFIED BUTTON ACTION AREA */
          <motion.div key="action-verify" className="w-full">
            <button
              id="btn-check-order"
              onClick={checkCurrentOrder}
              className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition duration-200 active:scale-[0.98] cursor-pointer shadow-lg shadow-cyan-950/20"
            >
              <span>✓</span> Click & Verify Order
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SELECTOR TOGGLE DECK (ELEGANT LOW PROFILE ALBUM SELECTION IN FOOTER) */}
      <div className="mt-8 bg-[#0B061A] p-2.5 rounded-xl border border-white/5 text-center">
        <span className="block text-[8px] font-mono tracking-widest text-slate-500 uppercase mb-2">PILIH TOPIK CALIBRATION:</span>
        <div className="grid grid-cols-3 gap-1.5">
          {SEQUENCES.map((p) => {
            const isActive = activePuzzle.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  playLocalBeep('click');
                  setActivePuzzle(p);
                }}
                className={`px-2 py-1.5 rounded text-[9px] font-bold uppercase transition truncate ${
                  isActive
                    ? 'bg-[#29175C] text-cyan-300 border border-cyan-500/20 shadow-inner'
                    : 'bg-transparent text-slate-500 hover:text-slate-350 hover:bg-slate-900/30'
                }`}
                title={p.title}
              >
                {p.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
