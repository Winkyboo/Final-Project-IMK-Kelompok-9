import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';

interface WordSearchProps {
  targetScript: string;
  targetWord: string;
  onSuccess: () => void;
}

export default function WordSearchHanacaraka({ targetScript, targetWord, onSuccess }: WordSearchProps) {
  const size = 4;
  
  // Try to use Intl.Segmenter, fallback to Array.from if not available
  const segments = useMemo(() => {
    try {
       const segmenter = new Intl.Segmenter("jv", { granularity: "grapheme" });
       return Array.from(segmenter.segment(targetScript)).map(s => s.segment);
    } catch (e) {
       return Array.from(targetScript);
    }
  }, [targetScript]);

  const [grid, setGrid] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const randomChars = ['ꦲ', 'ꦤ', 'ꦕ', 'ꦫ', 'ꦏ', 'ꦢ', 'ꦠ', 'ꦱ', 'ꦮ', 'ꦭ', 'ꦥ', 'ꦝ', 'ꦗ', 'ꦪ', 'ꦚ', 'ꦩ', 'ꦒ', 'ꦧ', 'ꦛ', 'ꦔ'];
    const newGrid = Array(size * size).fill('');
    
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 100) {
       attempts++;
       const dx = Math.floor(Math.random() * 3) - 1;
       const dy = Math.floor(Math.random() * 3) - 1;
       if (dx === 0 && dy === 0) continue;
       
       const startX = Math.floor(Math.random() * size);
       const startY = Math.floor(Math.random() * size);
       
       const endX = startX + dx * (segments.length - 1);
       const endY = startY + dy * (segments.length - 1);
       
       if (endX >= 0 && endX < size && endY >= 0 && endY < size) {
          for (let i = 0; i < segments.length; i++) {
             newGrid[(startY + dy * i) * size + (startX + dx * i)] = segments[i];
          }
          placed = true;
       }
    }
    
    for (let i=0; i<newGrid.length; i++) {
       if (!newGrid[i]) newGrid[i] = randomChars[Math.floor(Math.random() * randomChars.length)];
    }
    setGrid(newGrid);
    setSelectedIndices([]);
    setErrorMsg(null);
  }, [segments]);

  const handleCellClick = (index: number) => {
    if (errorMsg) return; // Prevent clicks while showing error

    if (selectedIndices.includes(index)) {
        if (selectedIndices[selectedIndices.length - 1] === index) {
            setSelectedIndices(prev => prev.slice(0, -1));
        } else {
            setSelectedIndices([]);
        }
    } else {
        if (selectedIndices.length > 0) {
            const lastIndex = selectedIndices[selectedIndices.length - 1];
            const lx = lastIndex % size;
            const ly = Math.floor(lastIndex / size);
            const cx = index % size;
            const cy = Math.floor(index / size);
            
            const dx = Math.abs(cx - lx);
            const dy = Math.abs(cy - ly);
            
            if (dx <= 1 && dy <= 1 && (dx !== 0 || dy !== 0)) {
                 const dirX = cx - lx;
                 const dirY = cy - ly;
                 if (selectedIndices.length > 1) {
                     const firstIndex = selectedIndices[selectedIndices.length - 2];
                     const fx = firstIndex % size;
                     const fy = Math.floor(firstIndex / size);
                     const prevDirX = lx - fx;
                     const prevDirY = ly - fy;
                     if (dirX !== prevDirX || dirY !== prevDirY) {
                         setSelectedIndices([index]);
                         return;
                     }
                 }
                 const newSelected = [...selectedIndices, index];
                 setSelectedIndices(newSelected);
                 checkWin(newSelected);
            } else {
                 setSelectedIndices([index]);
            }
        } else {
            const newSelected = [index];
            setSelectedIndices(newSelected);
            checkWin(newSelected);
        }
    }
  };

  const checkWin = (selected: number[]) => {
      if (selected.length === segments.length) {
          const selectedWord = selected.map(i => grid[i]).join('');
          if (selectedWord === targetScript) {
             onSuccess();
          } else {
             setErrorMsg("Rangkaian kurang tepat, coba lagi ya!");
             setTimeout(() => {
                 setSelectedIndices([]);
                 setErrorMsg(null);
             }, 1000); 
          }
      } else if (selected.length > segments.length) {
          setSelectedIndices([selected[selected.length - 1]]);
      }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center text-[10px] font-black uppercase text-amber-200 tracking-wider">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"></span>
          Cari Rangkaian Aksara: <span className="text-yellow-350 font-black font-mono px-2.5 py-0.5 rounded-md border border-[#3d1f0d] text-base leading-none capitalize">{targetWord}</span>
        </span>
      </div>
      
      <div className="bg-gradient-to-b from-[#140a05] to-[#25130b] p-4 rounded-3xl border-2 border-stone-800 flex justify-center shadow-2xl relative">
        {errorMsg && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900/90 text-white px-4 py-2 rounded-xl text-xs font-black z-20 border-2 border-red-500 shadow-lg text-center leading-tight w-[80%] max-w-[200px]">
                {errorMsg}
            </div>
        )}
        <div className="grid grid-cols-4 gap-2 border-2 border-[#5c3a21]/50 p-2.5 rounded-2xl bg-gradient-to-br from-[#1d120d] to-[#0c0603] shadow-inner relative z-10 w-full max-w-[260px]">
          {grid.map((char, i) => {
            const isSelected = selectedIndices.includes(i);
            const isLast = selectedIndices[selectedIndices.length - 1] === i;
            return (
              <motion.button
                key={i}
                whileHover={!errorMsg ? { scale: 1.05 } : {}}
                whileTap={!errorMsg ? { scale: 0.95 } : {}}
                onClick={() => handleCellClick(i)}
                disabled={!!errorMsg}
                className={`w-full aspect-square flex items-center justify-center rounded-xl font-aksara-display text-2xl sm:text-3xl transition-colors duration-150 shadow-md transform ${
                  isSelected 
                    ? isLast 
                      ? "bg-gradient-to-b from-[#c44f2e] to-[#a33818] text-white border-b-4 border-[#822c15] translate-y-0.5" 
                      : "bg-gradient-to-b from-[#b89565] to-[#8c6f49] text-stone-900 border-b-4 border-[#52412b] translate-y-0.5"
                    : "bg-gradient-to-b from-[#2a364f] to-[#1d263b] text-amber-50 hover:bg-[#344059] border-b-4 border-[#0c121e]"
                } ${errorMsg && isSelected ? "animate-pulse" : ""}`}
              >
                {char}
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="text-center text-[9px] text-amber-200/50 uppercase tracking-widest font-black leading-tight border border-amber-900/40 rounded-lg p-2 bg-[#1b0d06]/50">
        Tekan sejajar berturut-turut untuk memilih huruf (Horizontal, Vertikal, Miring)
      </div>
    </div>
  );
}
