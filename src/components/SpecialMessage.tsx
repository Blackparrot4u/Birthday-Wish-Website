import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Download } from 'lucide-react';
import { toJpeg } from 'html-to-image';

export function SpecialMessage() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const blowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    
    // Epic confetti burst for blowing candles
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffb6c1', '#e0b0ff', '#aec6cf', '#fdfd96']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffb6c1', '#e0b0ff', '#aec6cf', '#fdfd96']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      // Temporarily hide the button during capture
      const button = cardRef.current.querySelector('button');
      if (button) button.style.display = 'none';

      const dataUrl = await toJpeg(cardRef.current, {
        quality: 0.95,
        backgroundColor: '#fdf2f8', // Match the pink-100 gradient vibe
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      
      if (button) button.style.display = 'flex'; // Restore button display

      const link = document.createElement('a');
      link.download = 'Amayra-Birthday-Note.jpg';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to download the note. Please try again!');
    }
  };

  return (
    <div className="py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-pink-100">
      <div 
        ref={cardRef}
        className="max-w-2xl text-center space-y-6 bg-white/60 p-8 md:p-12 rounded-3xl backdrop-blur-sm shadow-xl border border-white"
      >
        <h2 className="text-4xl md:text-5xl font-heading text-pink-600">A Special Note Just For You 💌</h2>
        <div className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium space-y-4">
          <p>
            Dearest Amayra Zoya,
          </p>
          <p>
            May your day be as bright as your smile, and your year as sweet as the cake you're about to eat. 
            Keep shining, keep smiling, and never stop being the wonderful princess that you are!
          </p>
          <p className="font-bold text-purple-600">
            Happy Birthday! 🎈👑
          </p>
        </div>

        {/* Interactive Cake */}
        <div className="mt-12 mb-8 select-none" onClick={blowCandles}>
          <div className="text-8xl cursor-pointer hover:scale-110 transition duration-300 relative inline-block text-center w-full">
            <span className="inline-block relative">
              {candlesBlown ? '🎂' : '🎂'}
              {!candlesBlown && (
                <motion.div 
                  animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl"
                >
                  🔥
                </motion.div>
              )}
              {candlesBlown && (
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -50 }}
                  transition={{ duration: 2 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl"
                >
                  💨
                </motion.div>
              )}
            </span>
          </div>
          <p className="mt-4 text-sm font-bold text-gray-500 uppercase tracking-widest cursor-pointer">
            {candlesBlown ? 'Yay! Make a wish ✨' : 'Click the Cake to Blow the Candle!'}
          </p>
        </div>

        {/* Download Memories Button */}
        <button 
          className="mt-8 mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          onClick={handleDownload}
        >
          <Download size={20} />
          Download Note
        </button>

      </div>
    </div>
  );
}
