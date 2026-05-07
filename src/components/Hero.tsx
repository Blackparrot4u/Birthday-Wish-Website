import { motion } from 'motion/react';
import React from 'react';

const balloons = [
  { id: 1, color: '#ffb6c1', delay: 0, left: '10%' },
  { id: 2, color: '#e0b0ff', delay: 1, left: '30%' },
  { id: 3, color: '#aec6cf', delay: 0.5, left: '50%' },
  { id: 4, color: '#fdfd96', delay: 1.5, left: '70%' },
  { id: 5, color: '#ffb6c1', delay: 0.2, left: '90%' },
];

export function Hero() {
  return (
    <div className="relative w-full flex items-center justify-center bg-white">
      <img 
        src="/amayra-poster.png" 
        alt="Amayra Birthday Poster" 
        className="w-full max-w-2xl h-auto object-contain"
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/800x800/ffb6c1/ffffff?text=Upload+amayra-poster.png+to+public+folder';
        }}
      />
    </div>
  );
}
