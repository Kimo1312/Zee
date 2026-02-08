
import React, { useMemo } from 'react';

const FloatingHeart: React.FC<{ delay: number; left: string; size: number }> = ({ delay, left, size }) => {
  return (
    <div
      className="absolute animate-bounce text-pink-300 opacity-20 pointer-events-none"
      style={{
        left,
        fontSize: `${size}px`,
        animation: `float ${6 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        bottom: '-50px'
      }}
    >
      ❤️
    </div>
  );
};

export const BackgroundEffects: React.FC = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 5,
      left: `${Math.random() * 100}%`,
      size: 20 + Math.random() * 30
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-red-300 via-red-400 to-red-500">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
      {hearts.map((h) => (
        <FloatingHeart key={h.id} {...h} />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-100/40 via-transparent to-transparent"></div>
    </div>
  );
};
