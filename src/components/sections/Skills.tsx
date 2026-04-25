'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    label: 'Backend',
    color: '#0070f3',
    skills: ['C#', '.NET Core', 'Java', 'Spring Boot', 'ASP.NET'],
  },
  {
    label: 'Frontend',
    color: '#a855f7',
    skills: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Bases de Datos',
    color: '#10b981',
    skills: ['SQL Server', 'PostgreSQL', 'Dapper'],
  },
  {
    label: 'Herramientas',
    color: '#f59e0b',
    skills: ['Git', 'GitHub', 'Docker', 'Figma'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="pt-20 pb-28 md:pt-28 md:pb-36 px-6 bg-[#050505] border-t border-white/5 relative">
      <div className="w-full max-w-7xl mx-auto">

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-5 block"
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

        {/* 2×2 skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="flex flex-col gap-4"
            >
              {/* Category header */}
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
                  {cat.label}
                </span>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.05 + i * 0.04, duration: 0.3 }}
                    whileHover={{ scale: 1.06, y: -1 }}
                    className="interactive select-none"
                    style={{
                      display: 'inline-block',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: '13px',
                      lineHeight: 1.4,
                      color: cat.color,
                      backgroundColor: `${cat.color}15`,
                      border: `1px solid ${cat.color}45`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
