/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface LevelSelectionPageProps {
  onSelectLevel: (level: number) => void;
  onNavigateTab: (tab: string) => void;
  onBack: () => void;
  userLevel: number;
}

export default function LevelSelectionPage({ onSelectLevel, onNavigateTab, onBack, userLevel }: LevelSelectionPageProps) {
  return (
    <div className="bg-[#fffadf] text-[#1e1c00] font-sans min-h-screen flex flex-col relative overflow-x-hidden pb-28">
      {/* TopAppBar */}
      <header className="fixed top-0 z-50 bg-[#fffadf] border-b-4 border-[#77574d]/20 shadow-[0_4px_0_0_rgba(119,87,77,0.2)] flex justify-between items-center w-full px-4 h-16">
        <button 
          onClick={onBack}
          className="text-[#58423c] hover:bg-[#fed3c7]/30 transition-colors p-2 rounded-full active:translate-y-[2px] flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-[#a33818] tracking-tight text-center flex-1 mx-2 truncate">
          Pasar Hanacaraka
        </h1>
        <div className="w-10"></div> {/* Spacer placeholder */}
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-16 pt-24 pb-12">
        {/* Page Title */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e1c00] mb-2 font-headline-lg">
            Pilih Level Belanja
          </h2>
          <p className="text-sm md:text-base text-[#58423c] font-body-md">
            Tentukan tingkat kesulitan sebelum mulai melayani pembeli di pasar.
          </p>
        </div>

        {/* Level Selection Cards (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level 1: Pemula */}
          <motion.article 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#f0eab6] rounded-2xl border-b-[6px] border-[#77574d] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col relative group"
          >
            {/* Card Header */}
            <div className="bg-[#ffdbd0] py-4 px-6 border-b border-[#dfc0b8] flex items-center gap-3">
              <div className="w-12 h-12 bg-[#fffadf] rounded-full flex items-center justify-center shadow-sm text-[#a33818]">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>sentiment_satisfied</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#2c160e]">Pemula</h3>
            </div>

            {/* Card Body (Characteristics) */}
            <div className="p-6 flex-1 flex flex-col gap-3">
              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">sort_by_alpha</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Kompleksitas Aksara</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">Dasar (Nglegena)</span>
                </div>
              </div>

              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">speed</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Kecepatan Permainan</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">Santai</span>
                </div>
              </div>

              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">lightbulb</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Ketersediaan Hint</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">Selalu Tersedia</span>
                </div>
              </div>

              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">shopping_basket</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Kesulitan Request</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">4 Barang</span>
                </div>
              </div>
            </div>

            {/* Card Action */}
            <div className="p-6 pt-0 mt-auto">
              <button 
                onClick={() => onSelectLevel(1)}
                className="w-full bg-[#a33818] text-white font-semibold py-4 rounded-xl border-b-4 border-[#862303] shadow-sm flex items-center justify-center gap-2 hover:bg-[#c44f2e] transition-colors cursor-pointer active:translate-y-[4px] active:border-b-0 active:shadow-none"
              >
                <span>Pilih Pemula</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </motion.article>

          {/* Level 2: Menengah */}
          <motion.article 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#f0eab6] rounded-2xl border-b-[6px] border-[#77574d] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col relative group"
          >
            {/* Card Header */}
            <div className="bg-[#ffdbd1] py-4 px-6 border-b border-[#dfc0b8] flex items-center gap-3">
              <div className="w-12 h-12 bg-[#fffadf] rounded-full flex items-center justify-center shadow-sm text-[#a33818]">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>sentiment_neutral</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#3b0900]">Menengah</h3>
            </div>

            {/* Card Body (Characteristics) */}
            <div className="p-6 flex-1 flex flex-col gap-3">
              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">sort_by_alpha</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Kompleksitas Aksara</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">Sandhangan & Pasangan</span>
                </div>
              </div>

              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">speed</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Kecepatan Permainan</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">Sedang</span>
                </div>
              </div>

              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">lightbulb</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Ketersediaan Hint</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">Tersedia (Bayar Koin)</span>
                </div>
              </div>

              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">shopping_basket</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Kesulitan Request</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">8 Barang</span>
                </div>
              </div>
            </div>

            {/* Card Action */}
            <div className="p-6 pt-0 mt-auto">
              <button 
                onClick={() => onSelectLevel(5)}
                className="w-full bg-[#eae4b1] text-[#1e1c00] font-semibold py-4 rounded-xl border-b-4 border-[#8b716a] hover:bg-[#e1dca9] transition-colors cursor-pointer active:translate-y-[4px] active:border-b-0 active:shadow-none"
              >
                <span>Pilih Menengah</span>
              </button>
            </div>
          </motion.article>

          {/* Level 3: Mahir */}
          <motion.article 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#f0eab6] rounded-2xl border-b-[6px] border-[#77574d] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col relative group"
          >
            {/* Card Header */}
            <div className="bg-[#ffdad6] py-4 px-6 border-b border-[#dfc0b8] flex items-center gap-3">
              <div className="w-12 h-12 bg-[#fffadf] rounded-full flex items-center justify-center shadow-sm text-[#ba1a1a]">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#93000a]">Mahir</h3>
            </div>

            {/* Card Body (Characteristics) */}
            <div className="p-6 flex-1 flex flex-col gap-3">
              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">sort_by_alpha</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Kompleksitas Aksara</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">Lengkap</span>
                </div>
              </div>

              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">speed</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Kecepatan Permainan</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">Cepat</span>
                </div>
              </div>

              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">lightbulb</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Ketersediaan Hint</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">Tidak Tersedia</span>
                </div>
              </div>

              <div className="bg-[#fffadf] rounded-lg p-3 shadow-[inset_0_2px_4px_rgba(119,87,77,0.15)] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#8b716a] mt-0.5 text-[20px]">shopping_basket</span>
                <div>
                  <span className="block font-bold text-[#58423c] text-[10px] uppercase tracking-wider mb-0.5">Kesulitan Request</span>
                  <span className="text-sm font-semibold text-[#1e1c00]">12 Barang</span>
                </div>
              </div>
            </div>

            {/* Card Action */}
            <div className="p-6 pt-0 mt-auto">
              <button 
                onClick={() => onSelectLevel(10)}
                className="w-full bg-[#eae4b1] text-[#1e1c00] font-semibold py-4 rounded-xl border-b-4 border-[#8b716a] hover:bg-[#e1dca9] transition-colors cursor-pointer active:translate-y-[4px] active:border-b-0 active:shadow-none"
              >
                <span>Pilih Mahir</span>
              </button>
            </div>
          </motion.article>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#f6f0bb] border-t-4 border-[#77574d]/10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] rounded-t-xl flex justify-around items-center px-4 pb-4 pt-2">
        {/* Pasar (Active) */}
        <button 
          onClick={() => onNavigateTab('pasar')}
          className="flex flex-col items-center justify-center bg-[#c44f2e] text-white rounded-xl px-4 py-2 shadow-[0_3px_0_0_#862303] active:scale-95 active:translate-y-1 transition-transform w-[72px] cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          <span className="font-bold text-[11px] mt-1">Pasar</span>
        </button>

        {/* Belajar */}
        <button 
          onClick={() => onNavigateTab('belajar')}
          className="flex flex-col items-center justify-center text-[#795950] opacity-70 hover:bg-[#fed3c7]/30 transition-all rounded-xl px-4 py-2 active:scale-95 active:translate-y-1 w-[72px] cursor-pointer"
        >
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-bold text-[11px] mt-1">Belajar</span>
        </button>

        {/* Toko */}
        <button 
          onClick={() => onNavigateTab('toko')}
          className="flex flex-col items-center justify-center text-[#795950] opacity-70 hover:bg-[#fed3c7]/30 transition-all rounded-xl px-4 py-2 active:scale-95 active:translate-y-1 w-[72px] cursor-pointer"
        >
          <span className="material-symbols-outlined">payments</span>
          <span className="font-bold text-[11px] mt-1">Toko</span>
        </button>

        {/* Rapor */}
        <button 
          onClick={() => onNavigateTab('rapor')}
          className="flex flex-col items-center justify-center text-[#795950] opacity-70 hover:bg-[#fed3c7]/30 transition-all rounded-xl px-4 py-2 active:scale-95 active:translate-y-1 w-[72px] cursor-pointer"
        >
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="font-bold text-[11px] mt-1">Rapor</span>
        </button>
      </nav>
    </div>
  );
}
