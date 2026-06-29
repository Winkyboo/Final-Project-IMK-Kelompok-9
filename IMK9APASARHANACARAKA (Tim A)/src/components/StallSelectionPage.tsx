/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface StallSelectionPageProps {
  onSelectStall: (stall: 'kelontong' | 'jamu' | 'buah') => void;
  onNavigateTab: (tab: string) => void;
  onBack: () => void;
  userLevel: number;
}

export default function StallSelectionPage({ onSelectStall, onNavigateTab, onBack, userLevel }: StallSelectionPageProps) {
  // Lock criteria based on current level
  const isJamuLocked = userLevel < 5;
  const isBuahLocked = userLevel < 10;
  const isMakananLocked = userLevel < 15;

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col pt-16 pb-24 relative overflow-x-hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 z-50 bg-surface border-b-4 border-secondary/20 shadow-[0_4px_0_0_rgba(119,87,77,0.2)] flex justify-between items-center w-full px-4 h-16">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-secondary-container/30 transition-colors active:translate-y-[2px] text-on-surface-variant flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">Pasar Hanacaraka</h1>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full max-w-container-max mx-auto px-4 md:px-16 py-4">
        {/* 3D Market Map Section (Hero) */}
        <section className="mb-8 mt-4 rounded-xl overflow-hidden shadow-[0_6px_0_0_#77574d] relative border border-secondary/10 bg-surface-container h-[200px] md:h-[300px] ring-4 ring-primary/10">
          <img 
            alt="A stylized, vibrant 3D rendering of a traditional Javanese market (pasar) seen from an isometric top-down perspective." 
            className="w-full h-full object-cover opacity-90" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD60ofNeAQNx9bL5_4aJBr0VJl1vgU0Ffag3pESirzqo3qLcVIDP8Yh0M9KQErWuVbA5i4GG78MiWOQ0qEKFukaJpv9TFUr7v3T0od5RM21Nj3CGHtYDzJicKDxqkRRmC1PDCj2ApPE8S2JWSSyUX2A6Eb44_4GAz9wp3taHx4rpPvFjLKpaktIizBwRWjhlM-LVXFTjFyeGXPGyu23SKpU9gk4IlR5l71PFnFj8eNfUbwv0F2Nb5U-4G8V4A6fjs4MWU_NCS8zPWA"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-white mb-1">Pilih Warung</h2>
            <p className="text-white/90 text-sm">Pilih area dagangmu untuk mulai bermain.</p>
          </div>
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30 text-white">
            <span className="material-symbols-outlined text-[24px]">explore</span>
          </div>
        </section>

        {/* Stall Selection List */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
          {/* Warung Sembako */}
          <button 
            onClick={() => onSelectStall('kelontong')}
            className="text-left w-full bg-surface-container rounded-xl p-4 border border-secondary/10 shadow-[0_4px_0_0_#77574d] hover:bg-surface-container-high transition-transform active:translate-y-[4px] active:shadow-none flex items-start gap-4 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0 shadow-inner border border-outline-variant">
              <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>rice_bowl</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-label-bold text-label-bold text-on-surface text-lg">Warung Sembako</h3>
                <span className="bg-tertiary-container text-on-tertiary-container text-xs px-2 py-1 rounded-full font-semibold">Dasar</span>
              </div>
              <p className="text-on-surface-variant text-sm mb-2">Kosakata Kebutuhan Pokok</p>
              <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                <span>Mulai Jualan</span>
              </div>
            </div>
          </button>

          {/* Warung Jamu */}
          <button 
            disabled={isJamuLocked}
            onClick={() => onSelectStall('jamu')}
            className={`text-left w-full bg-surface-container rounded-xl p-4 border border-secondary/10 shadow-[0_4px_0_0_#77574d] hover:bg-surface-container-high transition-transform flex items-start gap-4 ${isJamuLocked ? 'opacity-70 cursor-not-allowed' : 'active:translate-y-[4px] active:shadow-none cursor-pointer'}`}
          >
            <div className="w-16 h-16 rounded-lg bg-surface-variant flex items-center justify-center flex-shrink-0 shadow-inner border border-outline-variant">
              <span className="material-symbols-outlined text-[32px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>local_drink</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-label-bold text-label-bold text-on-surface text-lg">Warung Jamu</h3>
                <span className="bg-surface-variant text-on-surface-variant border border-outline-variant text-xs px-2 py-1 rounded-full font-semibold">Menengah</span>
              </div>
              <p className="text-on-surface-variant text-sm mb-2">Kosakata Ramuan Herbal</p>
              
              {isJamuLocked ? (
                <div className="flex items-center gap-1 text-primary text-xs font-semibold opacity-60">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Buka di Level 5</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Mulai Jualan</span>
                </div>
              )}
            </div>
          </button>

          {/* Warung Buah */}
          <button 
            disabled={isBuahLocked}
            onClick={() => onSelectStall('buah')}
            className={`text-left w-full bg-surface-container rounded-xl p-4 border border-secondary/10 shadow-[0_4px_0_0_#77574d] hover:bg-surface-container-high transition-transform flex items-start gap-4 ${isBuahLocked ? 'opacity-70 cursor-not-allowed' : 'active:translate-y-[4px] active:shadow-none cursor-pointer'}`}
          >
            <div className="w-16 h-16 rounded-lg bg-surface-variant flex items-center justify-center flex-shrink-0 shadow-inner border border-outline-variant">
              <span className="material-symbols-outlined text-[32px] text-[#e65100]" style={{ fontVariationSettings: "'FILL' 1" }}>nutrition</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-label-bold text-label-bold text-on-surface text-lg">Warung Buah</h3>
                <span className="bg-surface-variant text-on-surface-variant border border-outline-variant text-xs px-2 py-1 rounded-full font-semibold">Lanjut</span>
              </div>
              <p className="text-on-surface-variant text-sm mb-2">Kosakata Buah Tropis</p>
              
              {isBuahLocked ? (
                <div className="flex items-center gap-1 text-primary text-xs font-semibold opacity-60">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Buka di Level 10</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Mulai Jualan</span>
                </div>
              )}
            </div>
          </button>

          {/* Warung Makanan Tradisional */}
          <button 
            disabled={isMakananLocked}
            onClick={() => onSelectStall('kelontong')}
            className={`text-left w-full bg-surface-container rounded-xl p-4 border border-secondary/10 shadow-[0_4px_0_0_#77574d] hover:bg-surface-container-high transition-transform flex items-start gap-4 ${isMakananLocked ? 'opacity-70 cursor-not-allowed' : 'active:translate-y-[4px] active:shadow-none cursor-pointer'}`}
          >
            <div className="w-16 h-16 rounded-lg bg-surface-variant flex items-center justify-center flex-shrink-0 shadow-inner border border-outline-variant">
              <span className="material-symbols-outlined text-[32px] text-[#827717]" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-label-bold text-label-bold text-on-surface text-lg leading-tight">Warung Makanan Tradisional</h3>
                <span className="bg-surface-variant text-on-surface-variant border border-outline-variant text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap ml-2">Mahir</span>
              </div>
              <p className="text-on-surface-variant text-sm mb-2 mt-1">Kosakata Kuliner Khas</p>
              
              {isMakananLocked ? (
                <div className="flex items-center gap-1 text-primary text-xs font-semibold opacity-60">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Buka di Level 15</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Mulai Jualan</span>
                </div>
              )}
            </div>
          </button>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-surface-container border-t-4 border-secondary/10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] rounded-t-xl">
        <button 
          onClick={() => onNavigateTab('pasar')}
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1 shadow-[0_3px_0_0_#862303] active:scale-95 active:translate-y-1 transition-transform cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          <span className="font-label-bold text-[12px] mt-1">Pasar</span>
        </button>

        <button 
          onClick={() => onNavigateTab('belajar')}
          className="flex flex-col items-center justify-center text-on-secondary-container opacity-70 hover:bg-secondary-container transition-all rounded-xl px-4 py-1 active:scale-95 active:translate-y-1 cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu_book</span>
          <span className="font-label-bold text-[12px] mt-1">Belajar</span>
        </button>

        <button 
          onClick={() => onNavigateTab('toko')}
          className="flex flex-col items-center justify-center text-on-secondary-container opacity-70 hover:bg-secondary-container transition-all rounded-xl px-4 py-1 active:scale-95 active:translate-y-1 cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>payments</span>
          <span className="font-label-bold text-[12px] mt-1">Toko</span>
        </button>

        <button 
          onClick={() => onNavigateTab('rapor')}
          className="flex flex-col items-center justify-center text-on-secondary-container opacity-70 hover:bg-secondary-container transition-all rounded-xl px-4 py-1 active:scale-95 active:translate-y-1 cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>leaderboard</span>
          <span className="font-label-bold text-[12px] mt-1">Rapor</span>
        </button>
      </nav>
    </div>
  );
}
