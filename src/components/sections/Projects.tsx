'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';

export default function Projects() {
  const projectList = Object.values(projects);

  return (
    <section id="projects" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-primary font-mono text-sm mb-8 block uppercase tracking-[0.3em]"
        >
          03. Mi Trabajo
        </motion.span>
        
        <h2 className="text-6xl md:text-8xl font-bold text-white mb-24 tracking-tighter">
          Casos de <br /> 
          <span className="text-primary">Éxito.</span>
        </h2>

        <div className="grid gap-32">
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

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div 
      ref={container}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
    >
      {/* Project Image */}
      <Link 
        href={`/projects/${project.slug}`}
        className="w-full md:w-3/5 aspect-video bg-secondary rounded-[2rem] overflow-hidden border border-white/5 relative group cursor-pointer interactive"
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Floating element for parallax */}
        <motion.div 
          style={{ y }}
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full"
        />
      </Link>

      {/* Project Info */}
      <div className="w-full md:w-2/5 flex flex-col space-y-6">
        <div className="space-y-2">
          <span className="text-primary font-mono text-sm uppercase tracking-widest">{project.category}</span>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h3>
        </div>
        
        <p className="text-gray-400 text-lg leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {project.tech.map((t: string) => (
            <span key={t} className="px-4 py-1 bg-secondary text-gray-300 text-xs font-mono rounded-full border border-white/5">
              {t}
            </span>
          ))}
        </div>

        <div className="pt-4">
          <Link 
            href={`/projects/${project.slug}`}
            className="inline-block px-6 py-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase text-xs tracking-widest interactive"
          >
            Explorar Caso
          </Link>
        </div>
      </div>
    </div>
  );
}
