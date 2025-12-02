import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-gray-950 flex flex-col items-center justify-center transition-opacity duration-700 ${progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative mb-8">
        <div className="text-6xl font-serif font-bold text-white tracking-tighter animate-pulse">
          Lumina
        </div>
      </div>
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-600 transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      <div className="mt-4 font-mono text-gray-500 text-sm">
        {Math.min(progress, 100)}%
      </div>
    </div>
  );
};

export default LoadingScreen;
