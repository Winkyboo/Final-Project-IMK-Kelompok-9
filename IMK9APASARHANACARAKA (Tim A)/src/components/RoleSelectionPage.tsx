/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface RoleSelectionPageProps {
  onSelectRole: (role: 'pembeli' | 'penjual') => void;
  onNavigateTab: (tab: string) => void;
  onBackToSplash?: () => void;
}

export default function RoleSelectionPage({ onSelectRole, onNavigateTab, onBackToSplash }: RoleSelectionPageProps) {
  return (
    <div className="min-h-screen bg-[#fffadf] text-[#1e1c00] pb-28 font-sans selection:bg-[#c44f2e] selection:text-white flex flex-col">
      {/* TopAppBar */}
      <header className="bg-[#fffadf] border-b border-[#dfc0b8] shadow-sm sticky top-0 z-40 w-full">
        <div className="flex items-center w-full px-4 h-16 gap-4 max-w-xl mx-auto">
          <button 
            onClick={onBackToSplash}
            aria-label="Menu" 
            className="text-[#1e1c00] hover:bg-[#eae4b1] transition-colors active:translate-y-[2px] p-2 -ml-2 rounded-full flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          <h1 className="font-semibold text-xl tracking-tight" style={{ color: "#CC5533" }}>
            Pasar Hanacaraka
          </h1>
          <div className="flex-1"></div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="px-4 py-6 flex flex-col gap-6 w-full max-w-md mx-auto relative flex-grow">
        {/* Screen Title */}
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-3xl font-headline text-[#1e1c00]">Pilih Peranmu</h2>
          <p className="font-body-md text-[#58423c] max-w-[320px] leading-relaxed">
            Siapakah kamu di pasar tradisional hari ini?
          </p>
        </div>

        {/* Role Cards Container */}
        <div className="flex flex-col gap-5">
          {/* Card 1: PEMBELI */}
          <motion.button
            whileHover={{ scale: 1.01, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectRole('pembeli')}
            className="w-full border border-[#dfc0b8] rounded-2xl p-4 flex flex-col gap-4 transition-all hover:shadow-lg group text-left relative overflow-hidden shadow-sm cursor-pointer"
            style={{ backgroundColor: "#5D4037" }}
          >
            {/* Mini Preview Image/Animation Area */}
            <div className="w-full h-40 rounded-xl overflow-hidden relative bg-[#eae4b1]">
              <img
                alt="Pembeli Gameplay Preview"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAP-vdng-fLE2UORKdIZe3FB47aJmYr-3uMVXp0QSWycLRYNcwfZNv4BYwAfgZcEPQU2LZrUpcaWP_xuNA4mt7mW6wYKAkHtYc3494t-uF44Y7JinxrIVMTbIck5x3m-hw2zbTGrk_FM5syxPmWdlzet-GLmUe70dZIqmMXkpDsNMfC2H1Jj94jlYL0lqrlyo31BniHJwppnVw0-XKe10FKQ_lJd40duA-F3IwfksoXffwDmGc14qly6oaeVTsw4QvpnpfTtG7YAk"
                referrerPolicy="no-referrer"
              />
              {/* Icon Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div 
                  className="p-2 rounded-lg shadow-sm border border-orange-200/20 flex items-center gap-2" 
                  style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                >
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shopping_basket
                  </span>
                  <span className="font-semibold text-xs tracking-wide uppercase">Pembeli</span>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="px-1 text-amber-50">
              <p className="text-sm font-medium leading-snug text-[#fffadf]/90">
                Datang ke pasar, membaca aksara, dan beli barang kebutuhanmu.
              </p>
            </div>

            <div className="absolute top-4 right-4 bg-amber-50/80 backdrop-blur-sm rounded-full p-1 border border-amber-950/20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <span className="material-symbols-outlined text-[#1e1c00] text-lg">arrow_forward</span>
            </div>
          </motion.button>

          {/* Card 2: PENJUAL */}
          <motion.button
            whileHover={{ scale: 1.01, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectRole('penjual')}
            className="w-full border border-[#dfc0b8] rounded-2xl p-4 flex flex-col gap-4 transition-all hover:shadow-lg group text-left relative overflow-hidden shadow-sm cursor-pointer"
            style={{ backgroundColor: "#5D4037" }}
          >
            {/* Mini Preview Image Area */}
            <div className="w-full h-40 rounded-xl overflow-hidden relative bg-[#eae4b1]">
              <img
                alt="Penjual Gameplay Preview"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqLvtg2exJvUw1LBu-5QUj1WbTHhbeNAG3weVtqY6iULoXe79Sa0yGD72MoJr-Yq6L0D6ytRFwOv0PA-G7VQrHy73omLdd54vdpEdGs9LssNkazI0KdRmP0aHzIynuMNeI-PlWNTBk-S3YCaGJab23idj-RB6r1-S2m8LMqongOSXzAf5XzD6Ibo5KziFlkjvzPTn-YOZj-Ii34AP8nQkqYn-MyDi8_nDkujWGm084oY_5CSluXW9K2owuC9D24hqF-QJb8rSo0_A"
                referrerPolicy="no-referrer"
              />
              {/* Icon Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div 
                  className="p-2 rounded-lg shadow-sm border border-amber-200/20 flex items-center gap-2" 
                  style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                >
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    storefront
                  </span>
                  <span className="font-semibold text-xs tracking-wide uppercase">Penjual</span>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="px-1 text-amber-50">
              <p className="text-sm font-medium leading-snug text-[#fffadf]/90">
                Layani pelanggan dengan memahami permintaan aksara mereka.
              </p>
            </div>

            <div className="absolute top-4 right-4 bg-amber-50/80 backdrop-blur-sm rounded-full p-1 border border-amber-950/20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <span className="material-symbols-outlined text-[#1e1c00] text-lg">arrow_forward</span>
            </div>
          </motion.button>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="bg-[#f6f0bb] border-t-4 border-[#77574d]/10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] fixed bottom-0 left-0 w-full z-30 flex justify-around items-center px-4 pb-4 pt-2 rounded-t-xl">
        {/* Pasar Tab (Active State) */}
        <button 
          onClick={() => onNavigateTab('pasar')}
          className="flex flex-col items-center justify-center bg-[#c44f2e] text-white rounded-xl px-4 py-1.5 shadow-[0_3px_0_0_#862303] active:scale-95 active:translate-y-1 transition-transform w-[72px] cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
          <span className="font-semibold text-[11px] mt-1">Pasar</span>
        </button>

        {/* Belajar Tab */}
        <button 
          onClick={() => onNavigateTab('belajar')}
          className="flex flex-col items-center justify-center text-[#795950] opacity-75 hover:bg-[#fed3c7]/40 transition-all active:scale-95 active:translate-y-1 rounded-xl px-4 py-1.5 w-[72px] cursor-pointer"
        >
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-semibold text-[11px] mt-1">Belajar</span>
        </button>

        {/* Toko Tab */}
        <button 
          onClick={() => onNavigateTab('toko')}
          className="flex flex-col items-center justify-center text-[#795950] opacity-75 hover:bg-[#fed3c7]/40 transition-all active:scale-95 active:translate-y-1 rounded-xl px-4 py-1.5 w-[72px] cursor-pointer"
        >
          <span className="material-symbols-outlined">payments</span>
          <span className="font-semibold text-[11px] mt-1">Toko</span>
        </button>

        {/* Rapor Tab */}
        <button 
          onClick={() => onNavigateTab('rapor')}
          className="flex flex-col items-center justify-center text-[#795950] opacity-75 hover:bg-[#fed3c7]/40 transition-all active:scale-95 active:translate-y-1 rounded-xl px-4 py-1.5 w-[72px] cursor-pointer"
        >
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="font-semibold text-[11px] mt-1">Rapor</span>
        </button>
      </nav>
    </div>
  );
}
