'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import HeroBackground from '@/components/HeroBackground';
import { ChevronDown, Terminal, Search } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { playClick, playHover, playOpen } from '@/utils/audio';
import MagneticButton from '@/components/ui/MagneticButton';

const roles = [
  'Software Engineer',
  'Backend Architecture (.NET 9 & NestJS)',
  'Industrial IoT & Edge Systems',
  'Clean Architecture & CQRS',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const lenis = useLenis();

  // 3D Perspective Tilt with springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playClick();
    const target = document.getElementById('projects');
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { offset: -25, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playClick();
    const target = document.getElementById('contact');
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { offset: -25, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openCmd = () => {
    playOpen();
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  const openTerminal = () => {
    playOpen();
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col items-center overflow-hidden pb-20"
    >
      <HeroBackground />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center px-6 w-full max-w-4xl mx-auto gap-6 pt-24 md:pt-28">
        
        {/* Status badges */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-medium">Disponible para nuevos proyectos</span>
          </div>

          <button
            onClick={openCmd}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-cyan-300 hover:bg-primary/20 transition-all font-mono text-[10px] sm:text-[11px] uppercase tracking-wider interactive cursor-pointer"
          >
            <Search size={12} className="text-primary" />
            <span>Cmd Palette</span>
            <span className="bg-white/10 px-1 py-0.2 rounded text-[9px] text-gray-300">Ctrl+K</span>
          </button>
        </motion.div>

        {/* Name with 3D Tilt */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          className="relative cursor-default select-none"
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            style={{ transform: 'translateZ(50px)' }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none"
          >
            JUAN PABLO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-primary bg-[length:200%_auto] animate-gradient">
              LINARES
            </span>
          </motion.h1>
        </motion.div>

        {/* Animated role typewriter with terminal cursor */}
        <div className="h-8 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center text-primary-light font-mono tracking-[0.18em] text-xs sm:text-sm md:text-base uppercase font-semibold"
            >
              <span>{roles[roleIndex]}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block text-primary ml-1 font-black"
              >
                _
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-xl text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed text-balance"
        >
          Ingeniero de software enfocado en construir <span className="text-white font-medium">arquitecturas backend de alto rendimiento</span>, sistemas distribuidos offline-first y experiencias digitales con precisión de microsegundos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 w-full sm:w-auto mb-10"
        >
          <MagneticButton>
            <a
              href="#projects"
              onClick={handleProjectsClick}
              onMouseEnter={() => playHover()}
              className="inline-block px-7 py-3.5 bg-primary text-black font-bold rounded-full hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(0,242,254,0.35)] interactive text-sm cursor-pointer"
            >
              Ver Casos de Estudio
            </a>
          </MagneticButton>

          <MagneticButton>
            <button
              onClick={openTerminal}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-primary/40 bg-primary/10 text-cyan-300 font-mono font-bold rounded-full hover:bg-primary/20 transition-all interactive text-xs uppercase tracking-wider cursor-pointer"
            >
              <Terminal size={14} className="text-primary" />
              <span>&gt;_ Consola Dev</span>
            </button>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#contact"
              onClick={handleContactClick}
              onMouseEnter={() => playHover()}
              className="inline-block px-7 py-3.5 border border-white/20 bg-white/[0.04] text-white font-bold rounded-full hover:bg-white/10 hover:border-white/40 transition-all interactive text-sm cursor-pointer"
            >
              Contactar ✉
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="https://github.com/PabloLinares06"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="inline-block px-6 py-3.5 border border-white/10 text-gray-400 hover:text-white font-medium rounded-full hover:bg-white/5 transition-all interactive text-sm font-mono uppercase tracking-wider cursor-pointer"
            >
              GitHub ↗
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator - fixed at the bottom with safe padding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
