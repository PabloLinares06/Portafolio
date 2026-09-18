'use client';

import { useParams, useRouter } from 'next/navigation';
import { projects } from '@/data/projects';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Activity, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import ArchitectureTopology from '@/components/ArchitectureTopology';
import { playClick, playHover } from '@/utils/audio';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const project = projects[slug];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
        <h1 className="text-2xl font-mono mb-4 text-gray-300">404 // Proyecto no encontrado</h1>
        <Link 
          href="/" 
          onClick={() => playClick()}
          className="px-6 py-2.5 rounded-full border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
        >
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen text-white">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/#projects" 
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur-lg text-gray-300 hover:text-white hover:border-primary/40 transition-all font-mono text-xs uppercase tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.6)] interactive cursor-pointer"
        >
          <ArrowLeft size={15} /> VOLVER AL PORTAFOLIO
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[100vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover opacity-25 md:opacity-35 grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-[#050505]" />
        </div>
        
        <div className="relative z-10 text-center px-6 mt-20 md:mt-0 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="text-primary font-mono text-xs md:text-sm uppercase tracking-[0.4em] px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              {project.category}
            </span>
            {project.badge && (
              <span className="text-emerald-400 font-mono text-xs md:text-sm uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {project.badge}
              </span>
            )}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-300 text-base md:text-xl font-normal max-w-3xl mx-auto leading-relaxed"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* Executive Meta Bar */}
      <section className="border-y border-white/10 bg-[#070b10] py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Rol</span>
            <span className="text-white text-sm font-bold">Arquitecto & Full Stack</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Enfoque</span>
            <span className="text-white text-sm font-bold">Rendimiento, Resiliencia & Costos</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Categoría</span>
            <span className="text-white text-sm font-bold">{project.category}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Estado</span>
            <span className="text-emerald-400 text-sm font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Producción / En Operación
            </span>
          </div>
        </div>

        {/* Action Pills */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-3 items-center">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:border-white/30 text-white font-mono text-xs uppercase tracking-wider transition-all interactive shadow-sm"
              >
                <span>Repositorio GitHub</span>
                <span className="text-primary-light">↗</span>
              </a>
            )}
            {project.liveUrl && project.liveUrl !== project.githubUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all interactive shadow-[0_0_20px_rgba(0,242,254,0.35)]"
              >
                <span>Acceder al Sistema</span>
                <span>↗</span>
              </a>
            )}
          </div>
        )}
      </section>

      {/* Metrics Grid */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="py-12 px-6 border-b border-white/10 bg-[#05070a]">
          <div className="max-w-6xl mx-auto">
            <span className="text-primary-light font-mono text-xs uppercase tracking-widest mb-6 block">
              Métricas Cuantitativas & Impacto en Producción
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/40 transition-colors"
                >
                  <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-primary block mb-1">
                    {m.value}
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wide block mb-1">
                    {m.label}
                  </span>
                  <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The Challenge & Architecture */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-xl">
            <div className="col-span-1">
              <h2 className="text-primary-light font-mono text-xs uppercase tracking-widest md:sticky md:top-32 font-bold flex items-center gap-2">
                <ShieldCheck size={16} />
                01. EL RETO DE INGENIERÍA
              </h2>
            </div>
            <div className="col-span-2">
              <p className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed tracking-tight">
                {project.challenge}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-xl">
            <div className="col-span-1">
              <h2 className="text-primary-light font-mono text-xs uppercase tracking-widest md:sticky md:top-32 font-bold flex items-center gap-2">
                <Zap size={16} />
                02. DECISIONES DE ARQUITECTURA
              </h2>
            </div>
            <div className="col-span-2">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
                {project.architecture}
              </p>
            </div>
          </div>

          {/* Interactive Topology Graph */}
          {project.architectureFlow && project.architectureFlow.length > 0 && (
            <div className="pt-4">
              <ArchitectureTopology 
                nodes={project.architectureFlow} 
                projectTitle={project.title} 
              />
            </div>
          )}

          {/* Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-xl">
            <div className="col-span-1">
              <h2 className="text-primary-light font-mono text-xs uppercase tracking-widest md:sticky md:top-32 font-bold">
                03. ARSENAL TECNOLÓGICO
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
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 md:py-20 px-4 sm:px-6 bg-[#040608] border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 text-center">
              <span className="text-primary-light font-mono text-xs uppercase tracking-widest block mb-2">
                Capturas de Interfaz & Telemetría
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Evidencia Visual en Entornos Reales
              </h3>
            </div>
            <div className="grid gap-8">
              {project.gallery.map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0f16]"
                >
                  <Image
                    src={img}
                    alt={`${project.title} gallery ${i}`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-contain md:object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project Link */}
      <section className="h-[70vh] md:h-screen flex items-center justify-center border-t border-white/10 relative overflow-hidden px-6 bg-[#050505]">
        <Link 
          href={`/projects/${project.nextProject.slug}`}
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
          className="group text-center interactive w-full cursor-pointer"
        >
          <span className="text-primary-light font-mono text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6 block">
            Explorar Siguiente Caso de Estudio
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-500 leading-none">
            {project.nextProject.title}
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shadow-[0_0_30px_rgba(0,242,254,0.3)]">
              <ArrowRight size={24} className="md:w-7 md:h-7" />
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
