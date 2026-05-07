/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Gallery } from './components/Gallery';
import { Wishes } from './components/Wishes';
import { FunZone } from './components/FunZone';
import { SpecialMessage } from './components/SpecialMessage';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="w-full">
      <Hero />
      <Countdown />
      <Gallery />
      <Wishes />
      <FunZone />
      <SpecialMessage />
      <MusicPlayer />
      
      <footer className="py-6 text-center text-sm font-medium text-purple-700/60 bg-white/20">
        Created with ❤️ for Amayra Zoya's Birthday
      </footer>
    </div>
  );
}
