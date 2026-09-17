'use client';

import { useParams, useRouter } from 'next/navigation';
import { projects } from '@/data/projects';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const project = projects[slug];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <h1 className="text-white text-2xl font-mono">Proyecto no encontrado.</h1>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="bg-background min-h-screen">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur-lg text-gray-300 hover:text-white hover:border-primary/40 transition-all font-mono text-xs uppercase tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.6)] interactive"
        >
          <ArrowLeft size={15} /> VOLVER
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[110vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover opacity-30 md:opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
        
        <div className="relative z-10 text-center px-6 mt-20 md:mt-0">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-light font-mono text-xs md:text-sm uppercase tracking-[0.4em] mb-4 block"
          >
            {project.category} · Caso de Estudio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none"
          >
            {project.title}
          </motion.h1>
        </div>
      </section>

      {/* Executive Meta Bar */}
      <section className="border-y border-white/10 bg-[#08080a] py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Rol</span>
            <span className="text-white text-sm font-bold">Full Stack & Backend</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Enfoque</span>
            <span className="text-white text-sm font-bold">Escalabilidad & Rendimiento</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Categoría</span>
            <span className="text-white text-sm font-bold">{project.category}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Estado</span>
            <span className="text-emerald-400 text-sm font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Producción Activa
            </span>
          </div>
        </div>

        {/* Action Pills */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="max-w-5xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-3 items-center">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:border-white/30 text-white font-mono text-xs uppercase tracking-wider transition-all interactive shadow-sm"
              >
                <span>Ver Código en GitHub</span>
                <span className="text-primary-light">↗</span>
              </a>
            )}
            {project.liveUrl && project.liveUrl !== project.githubUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-mono text-xs uppercase tracking-wider hover:bg-blue-600 transition-all interactive shadow-[0_0_20px_rgba(0,112,243,0.35)]"
              >
                <span>Demo en Vivo</span>
                <span>↗</span>
              </a>
            )}
          </div>
        )}
      </section>

      {/* The Challenge & Architecture */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-xl">
            <div className="col-span-1">
              <h2 className="text-primary-light font-mono text-xs uppercase tracking-widest md:sticky md:top-32 font-bold">
                01. EL RETO
              </h2>
            </div>
            <div className="col-span-2">
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium leading-snug tracking-tight">
                {project.challenge}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-xl">
            <div className="col-span-1">
              <h2 className="text-primary-light font-mono text-xs uppercase tracking-widest md:sticky md:top-32 font-bold">
                02. ARQUITECTURA
              </h2>
            </div>
            <div className="col-span-2">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
                {project.architecture}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-xl">
            <div className="col-span-1">
              <h2 className="text-primary-light font-mono text-xs uppercase tracking-widest md:sticky md:top-32 font-bold">
                03. TECNOLOGÍAS
              </h2>
            </div>
            <div className="col-span-2 flex flex-wrap gap-2.5">
              {project.tech.map((t: string) => (
                <span
                  key={t}
                  className="px-4 py-2 bg-surface text-primary-light font-mono text-xs md:text-sm rounded-xl border border-white/10 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-secondary/10">
        <div className="max-w-6xl mx-auto grid gap-6 md:gap-10">
          {project.gallery.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-surface-card"
            >
              <Image
                src={img}
                alt={`${project.title} gallery ${i}`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next Project Link */}
      <section className="h-[70vh] md:h-screen flex items-center justify-center border-t border-secondary relative overflow-hidden px-6">
        <Link 
          href={`/projects/${project.nextProject.slug}`}
          className="group text-center interactive w-full"
        >
          <span className="text-primary-light font-mono text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6 block">Siguiente Proyecto</span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-500 leading-none">
            {project.nextProject.title}
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={20} className="md:w-6 md:h-6" />
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
