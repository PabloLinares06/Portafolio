'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { playHover } from '@/utils/audio';

const text =
  'Soy un apasionado desarrollador de software cursando el octavo semestre de ingeniería. Mi camino comenzó en el backend con .NET y Java, donde aprendí a valorar la arquitectura limpia y la eficiencia. Hoy, expando mi horizonte hacia el frontend con React y Angular, buscando el equilibrio perfecto entre la lógica robusta y la interactividad sublime. No solo escribo código, diseño soluciones que resuelven problemas reales.';

const keyTerms = new Set([
  '.NET',
  'Java,',
  'arquitectura',
  'limpia',
  'React',
  'Angular,',
  'lógica',
  'robusta',
  'eficiencia.',
]);

const stats = [
  { value: '8vo', label: 'Semestre', detail: 'Ingeniería de Software' },
  { value: '100%', label: 'Clean Code', detail: 'SOLID & Clean Architecture' },
  { value: '+300', label: 'Items en Vivo', detail: 'Sync en tiempo real' },
  { value: 'Full Stack', label: 'Core Stack', detail: '.NET 9 & React / Next.js' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.25'],
  });

  const words = text.split(' ');

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 md:py-40 px-6 flex flex-col items-center justify-center bg-background relative overflow-hidden"
    >
      <div className="max-w-5xl w-full">

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-xs md:text-sm mb-8 block uppercase tracking-[0.3em] font-semibold"
        >
          01. Trayectoria & Filosofía
        </motion.span>

        {/* Word-by-word reveal */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium leading-relaxed tracking-tight text-white flex flex-wrap gap-x-[0.35em] gap-y-2 mb-16 md:mb-20">
          {words.map((word, i) => {
            const start = (i / words.length) * 0.75;
            const end = start + 0.12;
            const isKey = keyTerms.has(word);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, Math.min(end, 1)]} isKey={isKey}>
                {word}
              </Word>
            );
          })}
        </h2>

        {/* Stats Grid with Spotlight Luxury Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 border-t border-white/10 pt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <SpotlightCard
                onMouseEnter={() => playHover()}
                spotlightColor="rgba(0, 242, 254, 0.12)"
                spotlightRadius={260}
                className="p-5 sm:p-6 flex flex-col justify-between h-full bg-[#080d14]/70 border-white/10 hover:border-primary/40 group"
              >
                <div>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter group-hover:text-primary transition-colors block mb-1">
                    {stat.value}
                  </span>
                  <span className="text-gray-200 font-mono text-xs uppercase tracking-wider font-semibold block mb-1">
                    {stat.label}
                  </span>
                </div>
                <span className="text-gray-500 font-mono text-[10px] sm:text-xs">
                  {stat.detail}
                </span>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute -right-32 top-1/3 w-96 h-96 bg-primary/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -left-32 bottom-1/4 w-80 h-80 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  isKey,
}: {
  children: string;
  progress: any;
  range: [number, number];
  isKey?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);

  return (
    <motion.span 
      style={{ opacity }} 
      className={`inline-block transition-opacity duration-300 ease-out md:transition-none ${
        isKey ? 'text-primary font-semibold' : ''
      }`}
    >
      {children}
    </motion.span>
  );
}
