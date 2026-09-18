'use client';

import { motion } from 'framer-motion';
import { Server, Monitor, Database, Terminal, Cpu, Cloud, Shield } from 'lucide-react';
import { playHover } from '@/utils/audio';

const skillCategories = [
  {
    label: 'Backend & Core Systems',
    icon: Server,
    color: '#00f2fe',
    description: 'Arquitecturas escalables, lógica de negocio y APIs de alto rendimiento.',
    skills: ['.NET 9', 'C#', 'NestJS 11', 'CQRS / MediatR', 'Java', 'Server-Sent Events (SSE)', 'Clean Architecture', 'REST APIs'],
  },
  {
    label: 'Frontend Reactivo & Kioskos',
    icon: Monitor,
    color: '#a855f7',
    description: 'Interfaces interactivas, modo kiosko táctil, signals y gráficos 2D.',
    skills: ['Angular 22 (Signals)', 'React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Canvas 2D API', 'Framer Motion'],
  },
  {
    label: 'Persistencia & Bases de Datos',
    icon: Database,
    color: '#10b981',
    description: 'Modelado relacional, micro-ORMs y optimización de consultas SQL.',
    skills: ['PostgreSQL', 'SQL Server', 'Prisma ORM', 'Dapper (Micro-ORM)', 'Supabase', 'SQLite Spool', 'Transacciones ACID'],
  },
  {
    label: 'DevOps, Cloud & Edge IoT',
    icon: Cpu,
    color: '#f59e0b',
    description: 'Containerización, nodos Edge en hardware accesible y despliegues en VPS.',
    skills: ['Docker Compose', 'DigitalOcean VPS', 'Raspberry Pi / IoT', 'Nginx Alpine', 'S3 Object Storage', 'Git / GitHub CI', 'Vercel'],
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

        {/* 2×2 glassmorphic skill cards */}
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
                className="flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-[#080d14]/80 border border-white/10 hover:border-primary/40 hover:bg-[#0a1018] transition-all duration-300 group shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${cat.color}15`,
                        borderColor: `${cat.color}35`,
                        color: cat.color,
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-primary transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-gray-400 font-mono text-xs">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className="w-2 h-2 rounded-full shadow-[0_0_12px_currentColor] mt-2 animate-pulse"
                    style={{ backgroundColor: cat.color, color: cat.color }}
                  />
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      onMouseEnter={() => playHover()}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium border border-white/10 bg-white/[0.03] text-gray-300 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
