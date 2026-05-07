import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_WISHES } from '../data/constants';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Heart, X } from 'lucide-react';

export function Wishes() {
  const [wishes, setWishes] = useState(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish = { id: Date.now(), name, message };
    setWishes([newWish, ...wishes]);
    
    setShowSuccessModal(true);

    setName('');
    setMessage('');

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffb6c1', '#e0b0ff', '#aec6cf', '#fdfd96']
    });
  };

  return (
    <div className="py-20 px-4 max-w-5xl mx-auto relative">
      <h2 className="text-5xl md:text-6xl font-heading text-center text-pink-600 mb-12">Lots of Love & Wishes 💌</h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Write a Wish Form */}
        <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-pink-100 h-fit relative">
          
          <AnimatePresence>
            {showSuccessModal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-3xl p-8 text-center shadow-2xl border-2 border-pink-400"
              >
                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
                <div className="text-5xl mb-4">💌</div>
                <h3 className="text-2xl font-bold text-pink-600 mb-2">Letter sent to Amayra 💌</h3>
                <p className="text-lg text-gray-700 font-medium">
                  Thank you for making her smile! 😊
                </p>
                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition"
                >
                  Got it!
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <h3 className="text-3xl font-heading text-purple-600 mb-6 flex items-center gap-2">
            Leave a Message <Heart className="text-pink-500 fill-pink-500" />
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Amayra's friend..."
                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Happy Birthday! Wishing you..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition transform hover:scale-105 flex justify-center items-center gap-2"
            >
              Send Wish <Send size={18} />
            </button>
          </form>
        </div>

        {/* Display Wishes */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-l-pink-400"
              >
                <div className="font-heading text-2xl mb-2 text-purple-700 font-bold">{wish.name}</div>
                <div className="text-gray-700 whitespace-pre-wrap">{wish.message}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
