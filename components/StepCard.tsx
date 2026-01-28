
import React from 'react';
import { Step } from '../types';

interface StepCardProps {
  step: Step;
  onNext: () => void;
  isLast: boolean;
}

export const StepCard: React.FC<StepCardProps> = ({ step, onNext, isLast }) => {
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
          
          <button
            onClick={onNext}
            className={`px-10 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg bg-gradient-to-r ${step.accent}`}
          >
            {isLast ? "Ready for the big question? 🌹" : "Tell me more! ✨"}
          </button>
        </div>
      </div>
    </div>
  );
};
