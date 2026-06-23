/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Trophy, ArrowUpRight, Search, Medal, GraduationCap, Flame } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardPanelProps {
  playerXp: number;
  playerLevel: number;
  playerUsername: string;
  payerSchoolTag: string;
  competitors: { username: string; xp: number; level: number; schoolTag: string; avatarColor: string }[];
}

export default function LeaderboardPanel({
  playerXp,
  playerLevel,
  playerUsername,
  payerSchoolTag,
  competitors
}: LeaderboardPanelProps) {
  
  // Combine user details with competitors to sort dynamically!
  const combinedList: LeaderboardEntry[] = [
    ...competitors.map(c => ({ ...c, isPlayer: false })),
    {
      username: playerUsername || 'Guest_Weaver',
      xp: playerXp,
      level: playerLevel,
      schoolTag: payerSchoolTag || 'UI',
      avatarColor: 'bg-gradient-to-r from-purple-500 to-cyan-500 border border-purple-400',
      isPlayer: true
    }
  ].sort((a, b) => b.xp - a.xp);

  // Find player ranking index
  const playerRank = combinedList.findIndex(x => x.isPlayer) + 1;

  return (
    <div id="leaderboard-deck" className="bg-elegant-card border border-elegant-purple/25 rounded-2xl p-5 text-white shadow-xl h-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-elegant-purple/15">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-elegant-cyan">
              🏆 ACADEMIC COMPETITION PANEL
            </span>
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-1.5 mt-0.5">
              <Trophy className="w-5 h-5 text-[#FFD700] fill-[#FFD700]/10" />
              National Student Leaderboard
            </h3>
          </div>
          
          {/* User live position label */}
          <div className="text-right">
            <span className="block text-[9px] text-slate-450 font-mono">YOUR DECK RANK</span>
            <span className="text-sm font-black text-elegant-cyan font-mono flex items-center gap-1 justify-end">
              #{playerRank} <Medal className="w-4 h-4 text-[#FFD700] shrink-0" />
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-normal mb-5">
          Compete with algorithmic solvers and students worldwide. Earn experience in core puzzles to claim the absolute top sector.
        </p>

        {/* Grid List for Top Solvers */}
        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
          {combinedList.map((entry, index) => {
            const rank = index + 1;
            const isUser = entry.isPlayer;

            let rankBadge = <span className="font-mono text-xs text-slate-400 font-bold">#{rank}</span>;
            if (rank === 1) rankBadge = <Trophy className="w-4.5 h-4.5 text-yellow-400 fill-yellow-400" />;
            if (rank === 2) rankBadge = <Medal className="w-4.5 h-4.5 text-slate-300" />;
            if (rank === 3) rankBadge = <Medal className="w-4.5 h-4.5 text-amber-600" />;

            return (
              <div
                id={`leaderboard-entry-${rank}`}
                key={`${entry.username}-${rank}`}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                  isUser
                    ? 'bg-elegant-purple/15 border-elegant-purple shadow-lg shadow-elegant-purple/15'
                    : 'bg-elegant-dark/50 border-elegant-purple/10 hover:border-elegant-purple/35'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank Indicator */}
                  <div className="w-7 flex justify-center">{rankBadge}</div>

                  {/* Avatar sphere */}
                  <div className={`w-8 h-8 rounded-full ${entry.avatarColor} flex items-center justify-center text-xs font-black font-mono text-slate-950 shadow-inner shrink-0`}>
                    {entry.username.charAt(0).toUpperCase()}
                  </div>

                  {/* Handle and Uni */}
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs font-bold leading-none ${isUser ? 'text-white' : 'text-slate-200'}`}>
                        @{entry.username}
                      </span>
                      {isUser && (
                        <span className="bg-elegant-purple/20 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase border border-elegant-purple/35">
                          YOU
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono mt-1">
                      <GraduationCap className="w-3 h-3 text-elegant-cyan" />
                      <span>{entry.schoolTag} University Sector</span>
                    </div>
                  </div>
                </div>

                {/* XP and level metrics */}
                <div className="text-right">
                  <span className="block text-xs font-black font-mono text-elegant-purple">
                    {entry.xp.toLocaleString()} XP
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Lvl {entry.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Bottom Drawer */}
      {playerRank > 1 && (
        <div className="mt-4 p-3 bg-elegant-dark border border-elegant-purple/20 rounded-xl flex items-center justify-between text-xs">
          <span className="text-slate-450 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-elegant-orange" />
            <span>Pass @{combinedList[playerRank - 2].username} on next puzzle!</span>
          </span>
          <span className="font-mono text-elegant-cyan font-bold bg-elegant-cyan/10 px-2 py-0.5 rounded border border-elegant-cyan/25">
            Need {combinedList[playerRank - 2].xp - playerXp + 1} XP
          </span>
        </div>
      )}
    </div>
  );
}
