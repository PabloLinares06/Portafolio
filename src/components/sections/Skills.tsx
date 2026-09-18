'use client';

import { motion } from 'framer-motion';
import { Server, Monitor, Database, Cpu } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { playHover } from '@/utils/audio';

const skillCategories = [
  {
    label: 'Backend & Core Systems',
    icon: Server,
    color: '#00f2fe',
    description: 'Arquitecturas escalables, lógica de negocio y APIs de alto rendimiento.',
    skills: [
      { name: '.NET 9', note: 'Web API · Minimal APIs' },
      { name: 'C#', note: 'Clean Code · LINQ' },
      { name: 'NestJS 11', note: 'Clean Architecture · Guards' },
      { name: 'CQRS / MediatR', note: 'Commands & Queries' },
      { name: 'Java', note: 'POO & Multithreading' },
      { name: 'Server-Sent Events (SSE)', note: 'Streaming en Tiempo Real' },
      { name: 'Clean Architecture', note: 'Desacoplamiento Estricto' },
      { name: 'REST APIs', note: 'HTTP/3 · OpenAPI Spec' },
    ],
  },
  {
    label: 'Frontend Reactivo & Kioskos',
    icon: Monitor,
    color: '#a855f7',
    description: 'Interfaces interactivas, modo kiosko táctil, signals y gráficos 2D.',
    skills: [
      { name: 'Angular 22 (Signals)', note: 'Standalone · Reactive' },
      { name: 'React 19', note: 'Server Components · Hooks' },
      { name: 'Next.js', note: 'App Router · Turbopack' },
      { name: 'TypeScript', note: 'Tipado Fuerte · Generics' },
      { name: 'Tailwind CSS', note: 'Diseño Sistemático' },
      { name: 'Canvas 2D API', note: 'Generación Gráfica 1200px' },
      { name: 'Framer Motion', note: 'Física y Microinteracciones' },
    ],
  },
  {
    label: 'Persistencia & Bases de Datos',
    icon: Database,
    color: '#10b981',
    description: 'Modelado relacional, micro-ORMs y optimización de consultas SQL.',
    skills: [
      { name: 'PostgreSQL', note: 'Transacciones ACID' },
      { name: 'SQL Server', note: 'Stored Procedures · Índices' },
      { name: 'Prisma ORM', note: 'Migraciones Idempotentes' },
      { name: 'Dapper (Micro-ORM)', note: 'P99 < 15ms · Zero Allocs' },
      { name: 'Supabase', note: 'Auth · Realtime Sync' },
      { name: 'SQLite Spool', note: 'Buffer de Cola Edge IoT' },
    ],
  },
  {
    label: 'DevOps, Cloud & Edge IoT',
    icon: Cpu,
    color: '#f59e0b',
    description: 'Containerización, nodos Edge en hardware accesible y despliegues en VPS.',
    skills: [
      { name: 'Docker Compose', note: 'Orquestación de Servicios' },
      { name: 'DigitalOcean VPS', note: 'Droplets $14/mo · Costos Fijos' },
      { name: 'Raspberry Pi / IoT', note: 'Lectura Serial Pasiva RS-485' },
      { name: 'Nginx Alpine', note: 'Proxy Inverso · SSL/TLS' },
      { name: 'S3 Spaces', note: 'Almacenamiento de Objetos' },
      { name: 'Git / GitHub CI', note: 'Control de Versiones y Flujos' },
      { name: 'Vercel', note: 'Edge Hosting Serverless' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="pt-20 pb-28 md:pt-28 md:pb-36 px-6 bg-[#040608] border-t border-white/5 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-5 block font-semibold"
        >
          04. Arsenal Técnico
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-14 md:mb-16"
        >
          El Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-blue-400 italic">Especializado.</span>
        </motion.h2>

        {/* 2×2 luxury spotlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((cat, catIndex) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              >
                <SpotlightCard
                  spotlightColor={`${cat.color}15`}
                  spotlightRadius={380}
                  className="p-6 sm:p-8 h-full bg-[#070b12]/80 border-white/10 hover:border-white/25 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                          style={{
                            backgroundColor: `${cat.color}15`,
                            borderColor: `${cat.color}35`,
                            color: cat.color,
                          }}
                        >
                          <Icon size={24} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg md:text-xl tracking-tight group-hover:text-primary transition-colors">
                            {cat.label}
                          </h3>
                          <p className="text-gray-400 font-mono text-xs mt-0.5">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_currentColor] mt-2 animate-pulse flex-shrink-0"
                        style={{ backgroundColor: cat.color, color: cat.color }}
                      />
                    </div>

                    {/* Technical Pills with Subtitle Notes */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.name}
                          onMouseEnter={() => playHover()}
                          className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 hover:text-white hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-200 cursor-default flex items-center gap-1.5"
                        >
                          <span className="text-xs font-mono font-medium text-white">{skill.name}</span>
                          <span className="text-[10px] font-mono text-gray-500 hidden sm:inline">· {skill.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
