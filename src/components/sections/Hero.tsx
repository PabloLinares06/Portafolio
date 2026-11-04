'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import HeroBackground from '@/components/HeroBackground';
import { ChevronDown, Terminal, Search, Mail, ArrowUpRight } from 'lucide-react';
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
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), springConfig);

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
      className="relative min-h-screen w-full flex flex-col items-center overflow-hidden pb-20 bg-background"
    >
      <HeroBackground />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center px-6 w-full max-w-4xl mx-auto gap-6 pt-28 md:pt-32">
        
        {/* Status badges */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary-border bg-primary-subtle backdrop-blur-md text-primary shadow-sm">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-semibold">
              Disponible para proyectos
            </span>
          </div>

          <button
            onClick={openCmd}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-surface-border bg-surface/90 text-muted-foreground hover:text-foreground hover:border-primary-border transition-all font-mono text-[10px] sm:text-[11px] uppercase tracking-wider interactive cursor-pointer shadow-sm"
          >
            <Search size={12} className="text-primary" />
            <span>Cmd Palette</span>
            <span className="bg-surface-subtle border border-surface-border px-1 py-0.2 rounded text-[9px] text-muted-foreground font-semibold">Ctrl+K</span>
          </button>
        </motion.div>

        {/* Name with 3D Tilt - Solid High-End Typography (Anti-Slop) */}
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
            transition={{ duration: 0.9, delay: 0.5 }}
            style={{ transform: 'translateZ(40px)' }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none text-foreground"
          >
            JUAN PABLO <br />
            <span className="text-primary tracking-tight">
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
              className="flex items-center text-primary-light font-mono tracking-[0.16em] text-xs sm:text-sm md:text-base uppercase font-semibold"
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
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-xl text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed text-balance"
        >
          Ingeniero de software enfocado en construir <span className="text-foreground font-semibold">arquitecturas backend de alto rendimiento</span>, sistemas distribuidos offline-first y experiencias digitales con precisión de microsegundos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 w-full sm:w-auto mb-10"
        >
          <MagneticButton>
            <a
              href="#projects"
              onClick={handleProjectsClick}
              onMouseEnter={() => playHover()}
              className="inline-block px-7 py-3.5 bg-primary text-white dark:text-slate-950 font-bold rounded-full hover:bg-primary-hover transition-all shadow-md hover:shadow-lg interactive text-sm cursor-pointer"
            >
              Ver Casos de Estudio
            </a>
          </MagneticButton>

          <MagneticButton>
            <button
              onClick={openTerminal}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-primary-border bg-primary-subtle text-primary font-mono font-semibold rounded-full hover:bg-primary-subtle/80 transition-all interactive text-xs uppercase tracking-wider cursor-pointer"
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
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-surface-border-strong bg-surface hover:bg-surface-hover text-foreground font-semibold rounded-full transition-all interactive text-sm cursor-pointer shadow-sm group"
            >
              <Mail size={15} className="text-primary" />
              <span>Contactar</span>
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="https://github.com/PabloLinares06"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-1.5 px-6 py-3.5 border border-surface-border text-muted-foreground hover:text-foreground font-medium rounded-full hover:bg-surface-hover transition-all interactive text-sm font-mono uppercase tracking-wider cursor-pointer group"
            >
              <span>GitHub</span>
              <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
