import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data/constants';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export function FunZone() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [feedbackEmoji, setFeedbackEmoji] = useState<{emoji: string, id: number} | null>(null);

  const handleAnswer = (selectedOption: string) => {
    if (isLocked) return;
    setIsLocked(true);

    const isCorrect = selectedOption === QUIZ_QUESTIONS[currentQuestion].answer;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#77dd77', '#fdfd96']
      });
      handleNext(newScore);
    } else {
      const emojis = ['🤦‍♂️', '😂', '🙄', '🤭'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      setFeedbackEmoji({ emoji: randomEmoji, id: Date.now() });
      setTimeout(() => {
        handleNext(score);
      }, 1500);
    }
  };

  const handleNext = (currentScore: number) => {
    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
      if (currentScore === QUIZ_QUESTIONS.length) {
        confetti({ particleCount: 300, spread: 150, zIndex: 100 });
      }
    }
    setIsLocked(false);
    setFeedbackEmoji(null);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setFeedbackEmoji(null);
    setIsLocked(false);
  };

  return (
    <div className="py-20 px-4 bg-yellow-50/60 flex flex-col items-center">
      <h2 className="text-5xl md:text-6xl font-heading text-center text-orange-500 mb-4 flex items-center gap-3">
        <Sparkles className="text-orange-400" size={40} /> Fun Zone <Sparkles className="text-orange-400" size={40} />
      </h2>
      <p className="text-xl text-orange-700 mb-10 text-center">Kitna jaante ho Amayra ko? Let's find out! 😋</p>

      <div className="relative max-w-xl w-full bg-white rounded-3xl p-6 md:p-10 shadow-xl border-2 border-orange-100 min-h-[300px] flex flex-col justify-center overflow-hidden">
        {feedbackEmoji && (
          <motion.div
            key={feedbackEmoji.id}
            initial={{ opacity: 0, scale: 0.5, y: 0, x: '-50%' }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 2, 2.5, 3], y: '-50%' }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-1/2 text-8xl pointer-events-none z-50 text-center"
          >
            {feedbackEmoji.emoji}
          </motion.div>
        )}
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {QUIZ_QUESTIONS[currentQuestion].question}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className="py-4 px-6 rounded-xl border-2 border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-400 font-medium text-lg text-orange-900 transition active:scale-95"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-8 text-center text-orange-400 font-medium tracking-widest">
                QUESTION {currentQuestion + 1} OF {QUIZ_QUESTIONS.length}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">
                {score === QUIZ_QUESTIONS.length ? '🏆' : '👍'}
              </div>
              {score === QUIZ_QUESTIONS.length && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-lg mb-6 inline-block text-xl"
                >
                  💖 You're Amayra's Bestie! 💖
                </motion.div>
              )}
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h3>
              <p className="text-xl text-gray-600 mb-6">
                You scored <span className="font-bold text-orange-500">{score}</span> out of {QUIZ_QUESTIONS.length}.
              </p>
              <p className="text-lg text-purple-700 font-medium mb-8 italic">
                {score === 0 && "Arre wah! Aap Amayra ko to jaante hi nahi 😜. Lagta hai aapko dobara introduction lena padega!"}
                {score === 1 && "Hmm… sirf ek sahi? Lagta hai aap Amayra se pyar nahi karte 😏. Thoda aur jaan‑pehchaan zaroori hai!"}
                {score === 2 && "Bas do sahi? Thoda aur effort karo, warna Amayra bolegi – 'Tumhe meri pasand hi nahi pata!' 😂"}
                {score === 3 && "Wah wah! 🎉 Aap to Amayra ke encyclopedia nikle! Full marks, ab party mein aapko extra cake milega 🍰😋"}
              </p>
              <button
                onClick={resetQuiz}
                className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-md transition"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
