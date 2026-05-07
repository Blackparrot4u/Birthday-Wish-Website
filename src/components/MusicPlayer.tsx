import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { motion } from 'motion/react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Optional: add a real audio source
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log("Autoplay failed (usually due to browser policies requiring user interaction first):", e);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Hidden audio element, replace src with a valid birthday song URL if available */}
      <audio ref={audioRef} src="https://upload.wikimedia.org/wikipedia/commons/0/02/Happy_Birthday_to_You.ogg" loop preload="auto" />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-colors border-2 ${
          isPlaying ? 'bg-pink-500 border-pink-300' : 'bg-purple-500 border-purple-300'
        }`}
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} className="translate-x-1" />}
      </motion.button>
      
      {/* Floating music notes */}
      {isPlaying && (
        <>
          <motion.div
            animate={{ y: [0, -40], opacity: [0, 1, 0], x: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="absolute -top-4  text-pink-400 pointer-events-none"
          >
            <Music size={16} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -60], opacity: [0, 1, 0], x: [0, 20] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute -top-2 left-2 text-purple-400 pointer-events-none"
          >
           <Music size={20} />
          </motion.div>
        </>
      )}
    </div>
  );
}
