/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// User profile and authentication
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'player' | 'admin';
  createdAt: string;
}

// Player's game progress
export interface GameProgress {
  uid?: string;
  coins: number;
  level: number;
  xp: number;
  title: string; // e.g., 'Caliye' (Beginner), 'Prakanca' (Apprentice), 'Sedulur' (Trader), 'Juragan' (Market Master)
  unlockedStalls: string[]; // e.g., ['kelontong', 'jamu', 'buah']
  completedCount: number;
  lastUpdated: string;
}

// Session details returning to the client
export interface SessionData {
  user: UserProfile | null;
  progress: GameProgress | null;
}

// Javanese character (Aksara) schema
export interface JavaneseAksara {
  char: string;
  phonetic: string;
  name: string;
  meaning?: string;
  category: 'nglegena' | 'sandhangan';
}

// Market ingredient or item
export interface MarketItem {
  id: string;
  name: string;
  javaneseName: string; // spelled out in roman phonetics (e.g., 'lombok')
  javaneseScript: string; // spelled out in unicode aksara (e.g., 'ꦭꦺꦴꦩ꧀ꦧꦺꦴꦏ꧀' or simpler 'ꦭꦺꦴꦩ꧀ꦧꦺꦴꦏ꧀')
  price: number;
  category: 'kelontong' | 'jamu' | 'buah';
  description: string;
  imageUrl?: string;
}

// Customer order details
export interface CustomerOrder {
  id: string;
  customerName: string;
  avatarSeed: string;
  dialogue: string;
  itemRequested: MarketItem;
  quantity: number;
  questionType: 'match_char' | 'read_script' | 'spell_script';
  options: string[]; // multi-choice Options
  correctAnswer: string; // correct answer string or char sequence
  bonusCoins: number;
}

// Leaderboard row entry
export interface LeaderboardEntry {
  name: string;
  title: string;
  level: number;
  coins: number;
  completedCount: number;
}
