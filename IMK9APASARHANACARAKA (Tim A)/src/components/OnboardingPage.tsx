/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface OnboardingPageProps {
  role: 'pembeli' | 'penjual';
  onStartGame: () => void;
  onBackToRoles: () => void;
  onNavigateTab: (tab: string) => void;
}

export default function OnboardingPage({ role, onStartGame, onBackToRoles, onNavigateTab }: OnboardingPageProps) {
  const isPenjual = role === 'penjual';

  return (
    <div className="bg-[#fffadf] text-[#1e1c00] font-sans min-h-screen flex flex-col relative overflow-x-hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 z-50 bg-[#fffadf] border-b-4 border-[#77574d]/20 shadow-[0_4px_0_0_rgba(119,87,77,0.2)] flex justify-between items-center w-full px-4 h-16">
        <button 
          onClick={onBackToRoles}
          className="text-[#58423c] hover:bg-[#fed3c7]/30 transition-colors p-2 rounded-full active:translate-y-[2px] flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-[#a33818] tracking-tight">Pasar Hanacaraka</h1>
        <div className="w-10"></div> {/* Spacer placeholder */}
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[400px]"
        >
          {/* "Bakul" Content Card */}
          <div className="bg-[#f6f0bb] rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_8px_0_0_#77574d] border-2 border-[#77574d]/10 relative overflow-hidden">
            {/* Decorative subtle top highlight for skeuomorphism */}
            <div className="absolute top-0 left-0 w-full h-2 bg-white/30 rounded-t-2xl"></div>
            
            <div className="w-16 h-16 bg-[#ffdbd1] rounded-full flex items-center justify-center mb-6 shadow-inner border-2 border-white">
              <span 
                className="material-symbols-outlined text-[#a33818] text-4xl" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPenjual ? "storefront" : "shopping_basket"}
              </span>
            </div>

            <h2 className="font-bold text-[31px] md:text-[32px] leading-[40px] text-[#a33818] mb-4">
              {isPenjual ? "Siap Melayani?" : "Baca & Belanja"}
            </h2>

            <p className="font-body-md text-sm text-[#58423c] mb-8 px-2 leading-relaxed">
              {isPenjual 
                ? "Pelanggan akan datang membawa permintaan dalam Aksara Jawa. Layani mereka dengan cepat dan tepat untuk mendapatkan koin dan hadiah menarik!"
                : "Baca permintaan penjual dalam Aksara Jawa dan temukan barang yang tepat. Kumpulkan koin untuk membuka koleksi menarik lainnya!"
              }
            </p>

            {/* Primary Action Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={onStartGame}
              className="w-full bg-[#a33818] text-white font-semibold text-sm py-4 px-6 rounded-xl border-b-4 border-[#862303] shadow-md hover:bg-[#c44f2e] transition-all flex justify-center items-center gap-2 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">
                {isPenjual ? "Mulai Berdagang" : "Mulai Belanja"}
              </span>
              <span className="material-symbols-outlined relative z-10 text-[20px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </motion.button>
          </div>
        </motion.div>
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
