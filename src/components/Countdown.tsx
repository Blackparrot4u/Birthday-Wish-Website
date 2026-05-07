import React, { useEffect, useState } from 'react';

// Use a date slightly in the future to show the timer actually working, or use tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +tomorrow - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="py-12 px-4 flex flex-col items-center bg-white/30 backdrop-blur-sm">
      <h2 className="text-4xl md:text-5xl font-heading text-purple-800 mb-6 text-center">Countdown to the Big Day! ⏳</h2>
      <div className="flex gap-4 md:gap-8 justify-center items-center">
        {Object.entries(timeLeft).map(([interval, value], index) => (
          <React.Fragment key={interval}>
            {index === 0 && (
              <div className="text-5xl md:text-7xl text-purple-800 font-bold mb-8 mr-2">-</div>
            )}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl md:text-5xl font-bold text-pink-500">
                {value}
              </div>
              <span className="mt-2 text-lg font-medium text-purple-900 capitalize">{interval}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
