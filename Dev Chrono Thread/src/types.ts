/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  username: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakStatus: boolean[]; // 7-day state, e.g., [true, true, false, ...]
  streakCount: number;
  lastClaimedDate: string | null; // For 7-day habits claiming
  gameHistory: GameHistoryItem[];
  badges: string[];
  schoolTag: string;
}

export interface GameHistoryItem {
  id: string;
  gameType: 'visual' | 'sequence';
  puzzleTitle: string;
  xpEarned: number;
  completedAt: string;
  timeSec: number;
  accuracy: number;
}

export interface GridCell {
  row: string; // 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  col: number; // 1 | 2 | 3 | 4 | 5 | 6
  icon: string; // Emoji or signal marker
  isTarget: boolean;
  isBonus?: boolean;
}

export interface CoordinatePuzzle {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  gridSize: number;
  targetRow: string;
  targetCol: number;
  radarMode: boolean; // Enables the "Sonar Distance Sensor" indicators
  hint: string;
  xpValue: number;
}

export interface SequenceStep {
  id: string;
  text: string;
  correctOffset: number; // 0-indexed position in correct sequence
  explanation: string;
}

export interface SequencePuzzle {
  id: string;
  title: string;
  algorithmName: string;
  description: string;
  steps: SequenceStep[];
  difficulty: 'easy' | 'medium' | 'hard';
  academicArea: 'computer_science' | 'statistics' | 'logic_analysis';
  realWorldImpact: string;
  xpValue: number;
}

export interface LeaderboardEntry {
  username: string;
  xp: number;
  level: number;
  schoolTag: string; // e.g. "UI", "ITB", "BINUS", "UGM"
  avatarColor: string;
  isPlayer?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAtXp: number;
}
