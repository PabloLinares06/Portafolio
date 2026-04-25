'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import HeroBackground from '../HeroBackground';

const roles = [
  'Backend Engineer',
  'Frontend Developer',
  'Arquitecto de Soluciones',
  'Full Stack Developer',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // 3D Tilt Effect State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Calcula el porcentaje desde el centro (-0.5 a 0.5)
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    // Vuelve al centro suavemente
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <HeroBackground />

      {/* Content — vertically centered with generous spacing */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto gap-6">

        {/* "Disponible" badge */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest">Disponible para nuevos proyectos</span>
        </motion.div>

        {/* Name with 3D Tilt */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          className="relative cursor-default"
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            style={{ transform: 'translateZ(50px)' }} // Hace que el texto resalte hacia adelante en 3D
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none"
          >
            JUAN PABLO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient">
              LINARES
            </span>
          </motion.h1>
        </motion.div>

        {/* Animated role typewriter */}
        <div className="h-8 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-primary font-mono tracking-[0.15em] text-[10px] sm:text-sm md:text-base uppercase"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-md text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed text-balance"
        >
          Estudiante de ingeniería de software enfocado en construir arquitecturas robustas y experiencias digitales de alto impacto.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-600 transition-colors shadow-[0_0_30px_rgba(0,112,243,0.4)] interactive text-sm md:text-base"
          >
            Ver Proyectos
          </a>
          <a
            href="https://github.com/PabloLinares06"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-white/15 text-white font-bold rounded-full hover:bg-white/5 hover:border-white/30 transition-all interactive text-sm md:text-base"
          >
            GitHub ↗
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
