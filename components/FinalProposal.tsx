
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ButtonPosition } from '../types';

interface FinalProposalProps {
  onAccept: () => void;
}

export const FinalProposal: React.FC<FinalProposalProps> = ({ onAccept }) => {
  const [noPosition, setNoPosition] = useState<ButtonPosition>({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 100;
    const buttonHeight = 50;

    const newX = Math.random() * (container.width - buttonWidth - 40) + 20;
    const newY = Math.random() * (container.height - buttonHeight - 40) + 20;

    setNoPosition({ x: newX, y: newY });
    setIsMoved(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div
        ref={containerRef}
        className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 sm:p-12 max-w-xl w-full text-center border-4 border-rose-200 relative overflow-hidden"
      >
        <div className="mb-6">
          <span className="text-6xl">💍</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-rose-600 mb-6 leading-tight">
          Will you be my valentine?
        </h2>

        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          I've put my heart into planning this day just for you. Please say you'll come!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[120px]">
          <button
            onClick={onAccept}
            className="px-12 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-rose-300 transition-all duration-300 transform hover:scale-110 active:scale-95 z-10"
          >
            YES ! 💖
          </button>

          <button
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            style={isMoved ? {
              position: 'absolute',
              left: `${noPosition.x}px`,
              top: `${noPosition.y}px`,
              transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            } : {}}
            className="px-10 py-4 bg-gray-200 text-gray-500 rounded-full text-lg font-semibold border-2 border-gray-300 hover:bg-gray-300 transition-colors"
          >
            No 😢
          </button>
        </div>

        <div className="mt-12 text-gray-400 font-dancing text-2xl">
          Forever Yours...
        </div>
      </div>
    </div>
  );
};
