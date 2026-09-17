'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per browser session
    const hasLoaded = sessionStorage.getItem('portfolio_preloaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    document.body.style.overflow = 'hidden';

    // Fast, crisp progress counter (~850ms total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('portfolio_preloaded', 'true');
            document.body.style.overflow = '';
          }, 250);
          return 100;
        }
        // Accelerating increments
        const jump = Math.floor(Math.random() * 18) + 8;
        return Math.min(prev + jump, 100);
      });
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white select-none pointer-events-auto"
        >
          {/* Ambient Glow */}
          <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Monogram / Title */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-gray-400">
                JUAN PABLO LINARES
              </span>
            </div>

            {/* Large Numbers Counter */}
            <div className="h-16 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-light to-white">
                {progress}
                <span className="text-primary text-3xl sm:text-4xl ml-1">%</span>
              </span>
            </div>

            {/* Progress Bar Line */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary shadow-[0_0_10px_#0070f3]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Status caption */}
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
              Cargando Arquitectura & Experiencia
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
