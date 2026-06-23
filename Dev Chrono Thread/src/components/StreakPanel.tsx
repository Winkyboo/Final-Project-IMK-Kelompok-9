/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Calendar, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StreakPanelProps {
  streakCount: number;
  streakStatus: boolean[]; // 7 items (true = completed, false = locked/unread)
  lastClaimedDate: string | null;
  onClaimDailyBonus: () => void;
}

export default function StreakPanel({
  streakCount,
  streakStatus,
  lastClaimedDate,
  onClaimDailyBonus
}: StreakPanelProps) {
  const currentDate = new Date().toLocaleDateString();
  const alreadyClaimedToday = lastClaimedDate === currentDate;

  const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div id="streak-habit-card" className="bg-elegant-card border border-elegant-purple/25 rounded-2xl p-5 text-white relative overflow-hidden shadow-xl">
      {/* Decorative pulse glow */}
      <span className="absolute top-0 right-0 w-24 h-24 bg-elegant-purple/10 rounded-full blur-2xl"></span>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-elegant-purple">
            📊 HABIT BUILDER (7-DAY STREAK)
          </span>
          <h3 className="text-lg font-bold text-white font-display flex items-center gap-2 mt-0.5 animate-pulse-slow">
            <Calendar className="w-5 h-5 text-elegant-cyan" />
            Daily Training Streak
          </h3>
        </div>

        {/* Current streak tag */}
        <div className="bg-elegant-orange/15 border border-elegant-orange/35 text-elegant-orange px-3 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow shadow-elegant-orange/10">
          <Zap className="w-4 h-4 fill-elegant-orange" />
          <span>{streakCount} {streakCount === 1 ? 'DAY' : 'DAYS'} HOT</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-5 max-w-xl">
        Train your algorithmic focus before bed or prior to lectures. Playing at least one training run every 24 hours secures your daily momentum badge.
      </p>

      {/* 7 Day Tracker Grid */}
      <div className="grid grid-cols-7 gap-1.5 md:gap-3 mb-6">
        {weekdayNames.map((day, idx) => {
          const isCompleted = streakStatus[idx];
          // Simple visual indicator of active day (e.g. Mon=idx 0, Tue=idx 1 etc. today is Mon relative)
          const isToday = idx === (streakCount % 7);

          let cellStyle = 'bg-elegant-dark/70 border-elegant-purple/10 text-slate-500';
          let icon = <span className="text-xs font-bold">{idx + 1}</span>;

          if (isCompleted) {
            cellStyle = 'bg-gradient-to-br from-elegant-purple/15 to-elegant-purple/25 border-elegant-purple/50 text-white shadow-inner';
            icon = <CheckCircle2 className="w-4.5 h-4.5 text-elegant-cyan" />;
          } else if (isToday) {
            cellStyle = 'bg-elegant-dark border-elegant-cyan text-elegant-cyan animate-pulse';
          }

          return (
            <div
              id={`streak-day-${idx + 1}`}
              key={idx}
              className={`flex flex-col items-center justify-between p-2.5 rounded-xl border aspect-square min-h-[68px] transition-all duration-200 ${cellStyle}`}
            >
              <span className="text-[10px] font-mono opacity-70 uppercase">{day}</span>
              <div className="my-1.5">{icon}</div>
              <span className="text-[9px] font-mono opacity-60 font-bold">
                {isCompleted ? '+50 XP' : 'LOCKED'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action Claim Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-elegant-dark/95 border border-elegant-purple/20 p-3.5 rounded-xl gap-3 shadow-inner">
        <div className="flex items-center gap-2 text-xs text-slate-350 text-center sm:text-left">
          <AlertCircle className="w-4 h-4 text-elegant-purple shrink-0 animate-pulse" />
          <span>
            {alreadyClaimedToday 
              ? "Habit verified for today! Return tomorrow for the next calibration sequence." 
              : "Calibrate your daily check-in sequence to collect your XP habit bounty."
            }
          </span>
        </div>

        <button
          id="btn-claim-daily"
          onClick={onClaimDailyBonus}
          disabled={alreadyClaimedToday}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
            alreadyClaimedToday
              ? 'bg-elegant-card border border-elegant-purple/12 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-elegant-cyan to-elegant-purple hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black shadow-lg shadow-elegant-cyan/20'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
          <span>{alreadyClaimedToday ? 'Bonus Claimed' : 'Verify Calendar (+50 XP)'}</span>
        </button>
      </div>
    </div>
  );
}
