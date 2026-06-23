/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Shield, User, GraduationCap, CheckCircle2, ChevronRight, Save } from 'lucide-react';
import { Badge } from '../types';
import { BADGES } from '../puzzlesData';

interface ProfileCustomizerProps {
  currentUsername: string;
  currentSchoolTag: string;
  playerXp: number;
  playerBadges: string[];
  onUpdateProfile: (newUsername: string, newSchoolTag: string) => void;
}

export default function ProfileCustomizer({
  currentUsername,
  currentSchoolTag,
  playerXp,
  playerBadges,
  onUpdateProfile
}: ProfileCustomizerProps) {
  const [usernameInput, setUsernameInput] = useState(currentUsername);
  const [schoolTagSelect, setSchoolTagSelect] = useState(currentSchoolTag);
  const [isSaved, setIsSaved] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    // Remove empty spaces / symbols to make it handle compatible
    const cleanHandle = usernameInput.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    onUpdateProfile(cleanHandle || 'student_weaver', schoolTagSelect);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  const universityChoices = [
    { tag: 'UI', name: 'Universitas Indonesia' },
    { tag: 'ITB', name: 'Institut Teknologi Bandung' },
    { tag: 'BINUS', name: 'BINUS University' },
    { tag: 'UGM', name: 'Universitas Gadjah Mada' },
    { tag: 'ITS', name: 'Institut Teknologi Sepuluh Nopember' },
    { tag: 'UNPAD', name: 'Universitas Padjadjaran' },
  ];

  return (
    <div id="profile-card" className="bg-elegant-card border border-elegant-purple/25 rounded-2xl p-5 text-white shadow-xl">
      {/* Header */}
      <div className="flex gap-2.5 items-center mb-5 pb-3 border-b border-elegant-purple/15">
        <span className="p-2 bg-elegant-cyan/15 text-elegant-cyan rounded-lg border border-elegant-cyan/30 shadow-inner">
          <User className="w-5 h-5" />
        </span>
        <div>
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-elegant-purple">
            🕹️ CALIBRATE PROFILE SIGNALS
          </span>
          <h3 className="text-lg font-bold text-white font-display mt-0.5 animate-pulse-slow">
            Student Identity Controls
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Form controller */}
        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-1.5 flex justify-between">
              <span>Student Custom Handle</span>
              <span className="text-elegant-cyan">Lowercases, numbers & underscores</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450 font-mono text-sm">
                @
              </span>
              <input
                id="input-profile-username"
                type="text"
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                  setIsSaved(false);
                }}
                maxLength={20}
                placeholder="student_weaver"
                className="w-full bg-elegant-dark border border-elegant-purple/15 focus:border-elegant-cyan focus:ring-1 focus:ring-elegant-cyan rounded-xl py-2 pl-8 pr-4 text-xs font-mono text-white outline-none transition shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-1.5">
              Select University Node
            </label>
            <select
              id="select-profile-school"
              value={schoolTagSelect}
              onChange={(e) => {
                setSchoolTagSelect(e.target.value);
                setIsSaved(false);
              }}
              className="w-full bg-elegant-dark border border-elegant-purple/15 focus:border-elegant-cyan rounded-xl py-2 px-3 text-xs text-white outline-none transition shadow-inner"
            >
              {universityChoices.map((uni) => (
                <option key={uni.tag} value={uni.tag} className="bg-elegant-card text-white">
                  {uni.name} ({uni.tag})
                </option>
              ))}
            </select>
          </div>

          <button
            id="btn-save-profile"
            type="submit"
            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              isSaved
                ? 'bg-elegant-green text-slate-950 shadow-lg shadow-elegant-green/20'
                : 'bg-elegant-dark hover:bg-elegant-purple/10 text-slate-205 border border-elegant-purple/35 hover:text-white'
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Handle Signal Updated Successfully</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Credentials</span>
              </>
            )}
          </button>
        </form>

        {/* Right: Unlocked cognitive merit seals */}
        <div>
          <label className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-2">
            CONCURRENCY MERIT BADGES ({playerBadges.length} / {BADGES.length})
          </label>
          
          <div className="bg-elegant-dark/95 border border-elegant-purple/20 rounded-xl p-3 space-y-3 shadow-inner">
            {BADGES.map((badge) => {
              const matchesXpRequirement = playerXp >= badge.unlockedAtXp;
              const hasBadge = playerBadges.includes(badge.id) || matchesXpRequirement;

              return (
                <div
                  id={`badge-block-${badge.id}`}
                  key={badge.id}
                  className={`flex items-center justify-between p-2 rounded-lg border transition ${
                    hasBadge
                      ? 'bg-elegant-purple/10 border-elegant-purple/40 text-slate-100 shadow shadow-elegant-purple/5'
                      : 'bg-elegant-dark border-elegant-purple/10 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`p-1.5 rounded-lg shrink-0 ${
                      hasBadge 
                        ? 'bg-elegant-purple/15 text-elegant-purple border border-elegant-purple/35 shadow-inner' 
                        : 'bg-elegant-dark text-slate-600'
                    }`}>
                      <Award className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-normal truncate">{badge.title}</p>
                      <p className="text-[10px] text-slate-400 truncate leading-tight">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {hasBadge ? (
                      <span className="text-[9px] bg-elegant-cyan/15 border border-elegant-cyan/35 text-elegant-cyan px-1.5 py-0.5 rounded font-mono font-bold uppercase shadow">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-slate-500">
                        {badge.unlockedAtXp} XP Needed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
