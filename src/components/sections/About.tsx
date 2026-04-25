'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const text =
  'Soy un apasionado desarrollador de software cursando el octavo semestre de ingeniería. Mi camino comenzó en el backend con .NET y Java, donde aprendí a valorar la arquitectura limpia y la eficiencia. Hoy, expando mi horizonte hacia el frontend con React y Angular, buscando el equilibrio perfecto entre la lógica robusta y la interactividad sublime. No solo escribo código, diseño soluciones que resuelven problemas reales.';

const stats = [
  { value: '8vo', label: 'Semestre' },
  { value: '2+', label: 'Proyectos Entregados' },
  { value: '6+', label: 'Tecnologías Activas' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Adjusting offset for better mobile control (triggering earlier and ending later)
    offset: ['start 0.9', 'end 0.1'],
  });

  const words = text.split(' ');

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 md:py-48 px-6 flex flex-col items-center justify-center bg-background relative overflow-hidden"
    >
      <div className="max-w-4xl w-full">

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-xs md:text-sm mb-8 block uppercase tracking-[0.3em]"
        >
          01. Mi Trayectoria
        </motion.span>

        {/* Word-by-word reveal */}
        <h2 className="text-2xl md:text-5xl font-medium leading-relaxed tracking-tight text-white flex flex-wrap gap-x-[0.3em] gap-y-1 mb-20">
          {words.map((word, i) => {
            // Expand the range so words reveal more smoothly across the scroll distance
            const start = i / (words.length * 1.5);
            const end = start + 3 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, Math.min(end, 1)]}>
                {word}
              </Word>
            );
          })}
        </h2>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 border-t border-white/5 pt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col gap-2 sm:gap-3"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">
                {stat.value}
              </span>
              <span className="text-gray-400 font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-widest leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute -right-32 top-1/3 w-80 h-80 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);

  return (
    <motion.span 
      style={{ opacity }} 
      // Add a CSS transition for mobile only to smooth out jittery touch scroll
      className="inline-block transition-opacity duration-500 ease-out md:transition-none"
    >
      {children}
    </motion.span>
  );
}
