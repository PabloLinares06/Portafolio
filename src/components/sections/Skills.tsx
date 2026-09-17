'use client';

import { motion } from 'framer-motion';
import { Server, Monitor, Database, Terminal } from 'lucide-react';

const skillCategories = [
  {
    label: 'Backend Core',
    icon: Server,
    color: '#0070f3',
    description: 'Arquitecturas escalables, lógica de negocio y APIs REST.',
    skills: ['C#', '.NET Core', 'Java', 'Spring Boot', 'ASP.NET', 'Microservicios'],
  },
  {
    label: 'Frontend Reactivo',
    icon: Monitor,
    color: '#a855f7',
    description: 'Interfaces de alto impacto, fluidez y sincronización.',
    skills: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Bases de Datos & ORM',
    icon: Database,
    color: '#10b981',
    description: 'Modelado relacional y acceso a datos de alto rendimiento.',
    skills: ['SQL Server', 'PostgreSQL', 'Dapper', 'Entity Framework', 'Consultas SQL'],
  },
  {
    label: 'Herramientas & DevOps',
    icon: Terminal,
    color: '#f59e0b',
    description: 'Flujo de trabajo moderno, control de versiones y contenedores.',
    skills: ['Git', 'GitHub', 'Docker', 'Figma', 'Postman', 'Vercel'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="pt-20 pb-28 md:pt-28 md:pb-36 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary-light font-mono text-xs uppercase tracking-[0.3em] mb-5 block"
        >
          04. Arsenal Técnico
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-14 md:mb-16"
        >
          El Stack <span className="text-primary italic">Diario.</span>
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
                className="flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-[#09090b]/80 border border-white/10 hover:border-white/20 hover:bg-[#0c0c10] transition-all duration-300 group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${cat.color}15`,
                        borderColor: `${cat.color}35`,
                        color: cat.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-primary transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-gray-500 font-mono text-xs">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] mt-2"
                    style={{ backgroundColor: cat.color, color: cat.color }}
                  />
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="interactive select-none px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all duration-200 cursor-default"
                      style={{
                        color: '#f3f4f6',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {skill}
                    </motion.span>
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
