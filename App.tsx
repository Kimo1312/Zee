
import React, { useState, useEffect, useRef } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { StepCard } from './components/StepCard';
import { FinalProposal } from './components/FinalProposal';
import { STEPS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [confetti, setConfetti] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingBeforeVideoRef = useRef(false);

  const isVideoStep = currentPage < STEPS.length && Boolean(STEPS[currentPage]?.video);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Playback blocked:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextStep = () => {
    // Attempt to start music on first interaction to bypass browser autoplay restrictions
    if (!isPlaying && audioRef.current && currentPage === 0) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    }
    setCurrentPage(prev => prev + 1);
  };

  const handleAccept = () => {
    setAccepted(true);
    setConfetti(true);
    // On acceptance, ensure music is playing if it wasn't already
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    if (isVideoStep) {
      wasPlayingBeforeVideoRef.current = isPlaying;
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (currentPage >= STEPS.length && wasPlayingBeforeVideoRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
      wasPlayingBeforeVideoRef.current = false;
    }
  }, [currentPage, isVideoStep, isPlaying]);

  return (
    <main className="relative min-h-screen selection:bg-rose-200">
      {/* Background Music - Calm Traditional Piano Birthday Track */}
      <audio
        ref={audioRef}
        src="/Zee/03_-_Ala_Hobak.mp3"
        loop
      />

      <BackgroundEffects />

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-3 bg-white/60 backdrop-blur-md rounded-full shadow-lg border border-rose-100 hover:scale-110 transition-transform active:scale-95 group"
        aria-label="Toggle Music"
      >
        <div className="relative">
          {isPlaying ? (
            <span className="text-2xl block animate-pulse">🎵</span>
          ) : (
            <span className="text-2xl block opacity-50">🔇</span>
          )}
          {/* Subtle tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-1 rounded text-xs text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-rose-50">
            {isPlaying ? "Mute" : "Play Music"}
          </span>
        </div>
      </button>

      <div className="relative z-10">
        {!accepted ? (
          <>
            {currentPage < STEPS.length ? (
              <div key={currentPage} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <StepCard
                  step={STEPS[currentPage]}
                  onNext={nextStep}
                  isLast={currentPage === STEPS.length - 1}
                />
              </div>
            ) : (
              <div className="animate-in zoom-in duration-1000">
                <FinalProposal onAccept={handleAccept} />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 animate-in zoom-in duration-700">
            <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] p-12 shadow-[0_20px_50px_rgba(255,182,193,0.4)] border-4 border-rose-300 max-w-2xl relative overflow-hidden">
              {/* Floating elements inside the success card */}
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">🎈</div>
              <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce delay-100">🎁</div>

              <h1 className="text-6xl sm:text-7xl font-playfair font-bold text-rose-600 mb-8">
                YAY! 🎉
              </h1>
              <p className="text-2xl text-gray-700 mb-8 font-dancing font-bold">
                I can't wait to spend tomorrow with you, Zozy.
              </p>
              <div className="space-y-4 mb-10">
                <p className="text-lg text-gray-500 italic">"I love you more than words can say."</p>
                <div className="text-4xl">🎂 🥂 🌹 💖</div>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="text-rose-400 hover:text-rose-600 underline font-semibold transition-colors"
              >
                Watch our plans again
              </button>
            </div>

            {/* Custom Confetti Layer */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
              {Array.from({ length: 120 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: ['#fb7185', '#f472b6', '#e879f9', '#fbbf24', '#60a5fa', '#34d399'][Math.floor(Math.random() * 6)],
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${1 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tailwind animation extensions */}
      <style>{`
        .animate-in {
          animation-fill-mode: forwards;
        }
        .fade-in {
          animation: fadeIn 0.7s ease-out;
        }
        .slide-in-from-bottom-8 {
          animation: slideInFromBottom 0.7s ease-out;
        }
        .zoom-in {
          animation: zoomIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInFromBottom {
          from { transform: translateY(2rem); }
          to { transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
};

export default App;
