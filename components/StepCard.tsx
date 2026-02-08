
import React, { useEffect, useMemo, useState } from 'react';
import { Step } from '../types';

interface StepCardProps {
  step: Step;
  onNext: () => void;
  isLast: boolean;
}

export const StepCard: React.FC<StepCardProps> = ({ step, onNext, isLast }) => {
  const targetDate = useMemo(() => {
    if (!step.countdownTarget) return null;
    const parsed = new Date(step.countdownTarget);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }, [step.countdownTarget]);

  const [timeLeftMs, setTimeLeftMs] = useState(() => {
    if (!targetDate) return 0;
    return Math.max(0, targetDate.getTime() - Date.now());
  });

  useEffect(() => {
    if (!targetDate) return;

    const update = () => {
      setTimeLeftMs(Math.max(0, targetDate.getTime() - Date.now()));
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  const countdown = useMemo(() => {
    if (!targetDate) return null;

    const totalSeconds = Math.floor(timeLeftMs / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, done: totalSeconds <= 0 };
  }, [targetDate, timeLeftMs]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full border border-pink-100 transform transition-all duration-500 hover:scale-[1.01]">
        <div className="relative h-64 sm:h-96">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${step.accent} opacity-30`}></div>
        </div>
        
        <div className="p-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-800 mb-4 leading-tight">
            {step.title}
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light italic">
            {step.description}
          </p>

          {countdown && (
            <div className="mb-8">
              <div className="text-sm uppercase tracking-[0.3em] text-rose-400 font-semibold mb-3">
                Countdown
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds }
                ].map(item => (
                  <div
                    key={item.label}
                    className="bg-white/80 border border-rose-100 rounded-2xl px-3 py-4 shadow-sm"
                  >
                    <div className="text-2xl font-bold text-rose-500">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              {countdown.done && (
                <div className="mt-4 text-rose-500 font-semibold">
                  It’s time! 💖
                </div>
              )}
            </div>
          )}
          
          {step.id !== 1 && (
            <button
              onClick={onNext}
              className={`px-10 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg bg-gradient-to-r ${step.accent}`}
            >
              {isLast ? "Ready for the big question? 🌹" : "Tell me more! ✨"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
