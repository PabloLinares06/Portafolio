'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { projects, ProjectData } from '@/data/projects';
import { playClick, playHover } from '@/utils/audio';
import { ArrowRight } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Projects() {
  const projectList = Object.values(projects);

  return (
    <section id="projects" className="py-20 md:py-32 px-6 bg-[#05070a] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-xs md:text-sm mb-6 block uppercase tracking-[0.3em] font-semibold"
        >
          03. Casos de Estudio & Arquitectura
        </motion.span>
        
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-16 md:mb-24 tracking-tighter leading-none">
          Casos de <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-blue-400">
            Ingeniería.
          </span>
        </h2>

        <div className="grid gap-20 md:gap-32">
          {projectList.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div 
      ref={container}
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-14 items-center`}
    >
      {/* Project Image Box with Spotlight */}
      <div className="w-full lg:w-3/5">
        <Link 
          href={`/projects/${project.slug}`}
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
          className="block w-full cursor-pointer interactive"
        >
          <SpotlightCard
            spotlightColor="rgba(0, 242, 254, 0.16)"
            spotlightRadius={400}
            className="w-full aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden border-white/10 hover:border-primary/50 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.6)] group"
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            
            {/* Badges Top Left */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#050505]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-widest text-gray-200">
                {project.category}
              </span>
              {project.badge && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {project.badge}
                </span>
              )}
            </div>

            {/* Hover Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />
          </SpotlightCard>
        </Link>
      </div>

      {/* Project Info */}
      <div className="w-full lg:w-2/5 flex flex-col space-y-4 md:space-y-6">
        <div className="space-y-1">
          <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-semibold">
            0{index + 1} · Case Study
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
        
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          {project.description}
        </p>

        {/* Metrics preview row */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-1">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div key={idx} className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs">
                <span className="text-primary font-bold block">{m.value}</span>
                <span className="text-gray-400 text-[10px] uppercase truncate block">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t: string) => (
            <span 
              key={t}
              onMouseEnter={() => playHover()}
              className="px-2.5 py-1 bg-surface text-gray-300 text-xs font-mono rounded-lg border border-white/10 hover:border-primary/40 transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA Button with Magnetic Physics */}
        <div className="pt-2 md:pt-4">
          <MagneticButton>
            <Link 
              href={`/projects/${project.slug}`}
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-primary/40 bg-primary/10 rounded-full text-white hover:bg-primary hover:text-black transition-all duration-300 font-bold uppercase text-xs tracking-widest interactive shadow-[0_0_20px_rgba(0,242,254,0.15)] group cursor-pointer"
            >
              <span>Explorar Caso de Estudio</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-primary group-hover:text-black" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
