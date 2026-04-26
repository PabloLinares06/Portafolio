'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';

export default function Projects() {
  const projectList = Object.values(projects);

  return (
    <section id="projects" className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary-light font-mono text-xs md:text-sm mb-8 block uppercase tracking-[0.3em]"
        >
          02. Mi Trabajo
        </motion.span>
        
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-16 md:mb-24 tracking-tighter leading-none">
          Casos de <br /> 
          <span className="text-primary">Éxito.</span>
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

function ProjectCard({ project, index }: { project: any, index: number }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  // Reduced parallax for mobile performance
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div 
      ref={container}
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 items-center`}
    >
      {/* Project Image */}
      <Link 
        href={`/projects/${project.slug}`}
        className="w-full lg:w-3/5 aspect-video bg-secondary rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 relative group cursor-pointer interactive"
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Floating element for parallax - hidden on small mobile */}
        <motion.div 
          style={{ y }}
          className="hidden sm:block absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full"
        />
      </Link>

      {/* Project Info */}
      <div className="w-full lg:w-2/5 flex flex-col space-y-4 md:space-y-6">
        <div className="space-y-1">
          <span className="text-primary-light font-mono text-[10px] sm:text-xs uppercase tracking-widest">{project.category}</span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">{project.title}</h3>
        </div>
        
        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 md:gap-3">
          {project.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 bg-secondary text-primary-light/80 text-[10px] sm:text-xs font-mono rounded-full border border-primary-light/10">
              {t}
            </span>
          ))}
        </div>

        <div className="pt-2 md:pt-4">
          <Link 
            href={`/projects/${project.slug}`}
            className="inline-block px-6 py-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase text-[10px] sm:text-xs tracking-widest interactive"
          >
            Explorar Caso
          </Link>
        </div>
      </div>
    </div>
  );
}
