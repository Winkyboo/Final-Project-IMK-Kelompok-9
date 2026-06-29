/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JavaneseAksara } from "../types";

// The 20 main consonants of Javanese (Aksara Nglegena) and essential Sandhangan (vowels)
export const AKSARA_LIST: JavaneseAksara[] = [
  // --- ROW 1: Ha-Na-Ca-Ra-Ka ("Ada Utusan") ---
  {
    char: "ꦲ",
    phonetic: "ha",
    name: "Ha",
    meaning: "Ada / Hidup (Presence / Life)",
    category: "nglegena"
  },
  {
    char: "ꦤ",
    phonetic: "na",
    name: "Na",
    meaning: "Pranata / Aturan (Order / Breath)",
    category: "nglegena"
  },
  {
    char: "ꦕ",
    phonetic: "ca",
    name: "Ca",
    meaning: "Cipta / Rasa (Creation / Thought)",
    category: "nglegena"
  },
  {
    char: "ꦫ",
    phonetic: "ra",
    name: "Ra",
    meaning: "Rasa / Jiwa (Feeling / Spirit)",
    category: "nglegena"
  },
  {
    char: "ꦏ",
    phonetic: "ka",
    name: "Ka",
    meaning: "Karsa / Kehendak (Willpower / Force)",
    category: "nglegena"
  },

  // --- ROW 2: Da-Ta-Sa-Wa-La ("Saling Berkelahi/Bertengkar") ---
  {
    char: "ꦢ",
    phonetic: "da",
    name: "Da",
    meaning: "Dzat (Divine Essence)",
    category: "nglegena"
  },
  {
    char: "ꦠ",
    phonetic: "ta",
    name: "Ta",
    meaning: "Tetep / Pendirian (Consistency)",
    category: "nglegena"
  },
  {
    char: "ꦱ",
    phonetic: "sa",
    name: "Sa",
    meaning: "Siji / Tunggal (Unity / Oneness)",
    category: "nglegena"
  },
  {
    char: "ꦮ",
    phonetic: "wa",
    name: "Wa",
    meaning: "Wujud / Semesta (Manifestation)",
    category: "nglegena"
  },
  {
    char: "ꦭ",
    phonetic: "la",
    name: "La",
    meaning: "Lelampahan / Takdir (Journey / Path)",
    category: "nglegena"
  },

  // --- ROW 3: Pa-Dha-Ja-Ya-Nya ("Sama-sama Sakti") ---
  {
    char: "ꦥ",
    phonetic: "pa",
    name: "Pa",
    meaning: "Paring / Pemberian (Grace)",
    category: "nglegena"
  },
  {
    char: "ꦝ",
    phonetic: "dha",
    name: "Dha",
    meaning: "Dhuwur / Luhur (Nobility of Mind)",
    category: "nglegena"
  },
  {
    char: "ꦗ",
    phonetic: "ja",
    name: "Ja",
    meaning: "Jumbuhing / Harmoni (Unity of duality)",
    category: "nglegena"
  },
  {
    char: "ꦪ",
    phonetic: "ya",
    name: "Ya",
    meaning: "Yakin / Kepercayaan (Certainty)",
    category: "nglegena"
  },
  {
    char: "ꦚ",
    phonetic: "nya",
    name: "Nya",
    meaning: "Nyata / Kebenaran (Truth / Reality)",
    category: "nglegena"
  },

  // --- ROW 4: Ma-Ga-Ba-Tha-Nga ("Semuanya Menjadi Mayat") ---
  {
    char: "ꦩ",
    phonetic: "ma",
    name: "Ma",
    meaning: "Mantep / Kemantapan (Conviction)",
    category: "nglegena"
  },
  {
    char: "ꦒ",
    phonetic: "ga",
    name: "Ga",
    meaning: "Gusti / Pencipta (Divine Origin)",
    category: "nglegena"
  },
  {
    char: "ꦧ",
    phonetic: "ba",
    name: "Ba",
    meaning: "Babar / Pencerahan (Unfolding / Revelations)",
    category: "nglegena"
  },
  {
    char: "ꦛ",
    phonetic: "tha",
    name: "Tha",
    meaning: "Thukul / Pertumbuhan (Growth)",
    category: "nglegena"
  },
  {
    char: "ꦔ",
    phonetic: "nga",
    name: "Nga",
    meaning: "Ngrasa / Berserah (Reflecting / Surrender)",
    category: "nglegena"
  },

  // --- VOWEL SANDHANGAN (Aesthetic/Gameplay Addition) ---
  {
    char: "ꦶ",
    phonetic: "i",
    name: "Wulu (i)",
    meaning: "Mengubah vokal menjadi i (e.g. Ka -> Ki / ꦏꦶ)",
    category: "sandhangan"
  },
  {
    char: "ꦸ",
    phonetic: "u",
    name: "Suku (u)",
    meaning: "Mengubah vokal menjadi u (e.g. Ka -> Ku / ꦏꦸ)",
    category: "sandhangan"
  },
  {
    char: "ꦺ",
    phonetic: "o",
    name: "Taling (é)",
    meaning: "Mengubah vokal menjadi é/è (placed left of letter, e.g. ꦺꦏ = Ké)",
    category: "sandhangan"
  },
  {
    char: "ꦼ",
    phonetic: "e",
    name: "Pepet (e)",
    meaning: "Mengubah vokal menjadi e pepet seperti 'emas' (e.g. ꦏꦼ = Ke)",
    category: "sandhangan"
  }
];

// Helper to translate letters using a simple phonetic fallback maps
export function transliterateRomanToAksara(word: string): string {
  const syllables = word.toLowerCase().replace(/[^a-z]/g, "").match(/.{1,3}/g) || [];
  let result = "";
  for (const s of syllables) {
    const match = AKSARA_LIST.find(a => a.phonetic === s || s.startsWith(a.phonetic));
    if (match) {
      result += match.char;
    }
  }
  return result || "ꦲꦤꦕꦫꦏ";
}
