'use client';

import { useParams, useRouter } from 'next/navigation';
import { projects } from '@/data/projects';
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import ArchitectureTopology from '@/components/ArchitectureTopology';
import ProjectInteractiveGallery from '@/components/ProjectInteractiveGallery';
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
      <div className="h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors">
        <h1 className="text-2xl font-mono mb-4 text-muted-foreground">404 // Proyecto no encontrado</h1>
        <Link 
          href="/" 
          onClick={() => playClick()}
          className="px-6 py-2.5 rounded-full border border-primary text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-white dark:hover:text-slate-950 transition-all font-semibold"
        >
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="bg-background min-h-screen text-foreground transition-colors">
      {/* Editorial Case Study Header & Hero */}
      <section id="resumen" className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle Ambient Radial Mesh behind Hero */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-primary/10 blur-[130px] pointer-events-none -z-10" />

        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-2.5 mb-5"
          >
            <span className="text-primary font-mono text-xs uppercase tracking-[0.25em] px-3.5 py-1 rounded-full bg-primary/10 border border-primary/25 font-semibold">
              {project.category}
            </span>
            {project.badge && (
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                {project.badge}
              </span>
            )}
            <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-surface-subtle border border-surface-border">
              Caso de Estudio de Producción
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-8xl font-black text-foreground tracking-tight leading-none mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-muted-foreground text-base sm:text-lg md:text-xl font-normal max-w-3xl mx-auto leading-relaxed"
          >
            {project.description}
          </motion.p>
        </div>

        {/* Executive Meta Bar */}
        <div className="border border-surface-border bg-surface-card rounded-2xl md:rounded-3xl p-6 md:p-8 mb-10 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Rol</span>
              <span className="text-foreground text-sm font-bold">Arquitecto & Full Stack</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Enfoque</span>
              <span className="text-foreground text-sm font-bold">Rendimiento, Resiliencia & Costos</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Categoría</span>
              <span className="text-foreground text-sm font-bold">{project.category}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Estado</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Producción / En Operación
              </span>
            </div>
          </div>

          {/* Action Pills */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="mt-6 pt-6 border-t border-surface-border flex flex-wrap gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-3 items-center">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-surface-border bg-surface-elevated/40 hover:bg-surface-elevated hover:border-primary/50 text-foreground font-mono text-xs uppercase tracking-wider transition-all interactive shadow-sm group"
                  >
                    <span>Código en GitHub</span>
                    <ArrowUpRight size={14} className="text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== project.githubUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white dark:text-slate-950 font-bold font-mono text-xs uppercase tracking-wider hover:bg-primary-hover transition-all interactive shadow-sm group"
                  >
                    <span>Acceder al Sistema</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Demostración de Arquitectura & Código</span>
              </div>
            </div>
          )}
        </div>

        {/* Device Showcase Mockup Window */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="relative rounded-2xl md:rounded-3xl border border-surface-border bg-surface-card shadow-2xl overflow-hidden group"
        >
          {/* macOS / Workstation Window Chrome */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-surface-border bg-surface-elevated/60 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1 rounded-lg bg-surface border border-surface-border text-xs font-mono text-muted-foreground max-w-sm truncate">
              <span className="text-primary font-bold">https://</span>
              <span className="truncate">{project.slug === 'fuelix' ? 'app.fuelix.io/dashboard/operaciones' : 'natechnology.co/admin/panel'}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <span className="hidden sm:inline uppercase">Producción</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Screenshot Display */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-elevated">
            <Image
              src={project.heroImage}
              alt={`${project.title} - Interfaz de Operación`}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
              priority
            />
          </div>

          {/* Footer Caption */}
          <div className="px-6 py-3 border-t border-surface-border bg-surface/80 flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>Vista de producción: {project.slug === 'fuelix' ? 'Consolidado operacional y telemetría de tanques' : 'Panel de pedidos y sincronización con EFFI ERP'}</span>
            <span className="text-primary font-semibold hidden sm:inline">2880 × 1800 px · High Fidelity</span>
          </div>
        </motion.div>
      </section>

      {/* Metrics Grid */}
      {project.metrics && project.metrics.length > 0 && (
        <section id="metricas" className="py-12 px-6 border-y border-surface-border bg-surface-elevated/20">
          <div className="max-w-6xl mx-auto">
            <span className="text-primary font-mono text-xs uppercase tracking-widest mb-6 block font-semibold">
              Métricas Cuantitativas & Impacto en Producción
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-surface-card border border-surface-border hover:border-primary/40 transition-colors shadow-sm"
                >
                  <span className="text-2xl md:text-3xl font-black text-primary block mb-1">
                    {m.value}
                  </span>
                  <span className="text-xs font-mono font-bold text-foreground/90 uppercase tracking-wide block mb-1">
                    {m.label}
                  </span>
                  <p className="text-[11px] text-muted-foreground font-mono leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The Challenge & Architecture */}
      <section id="arquitectura" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 p-8 rounded-3xl bg-surface-card border border-surface-border shadow-md">
            <div className="col-span-1">
              <h2 className="text-primary font-mono text-xs uppercase tracking-widest md:sticky md:top-32 font-bold flex items-center gap-2">
                <ShieldCheck size={16} />
                EL RETO DE INGENIERÍA
              </h2>
            </div>
            <div className="col-span-2">
              <p className="text-lg sm:text-xl md:text-2xl text-foreground font-medium leading-relaxed tracking-tight">
                {project.challenge}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 p-8 rounded-3xl bg-surface-card border border-surface-border shadow-md">
            <div className="col-span-1">
              <h2 className="text-primary font-mono text-xs uppercase tracking-widest md:sticky md:top-32 font-bold flex items-center gap-2">
                <Zap size={16} />
                DECISIONES DE ARQUITECTURA
              </h2>
            </div>
            <div className="col-span-2">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 p-8 rounded-3xl bg-surface-card border border-surface-border shadow-md">
            <div className="col-span-1">
              <h2 className="text-primary font-mono text-xs uppercase tracking-widest md:sticky md:top-32 font-bold">
                ARSENAL TECNOLÓGICO
              </h2>
            </div>
            <div className="col-span-2 flex flex-wrap gap-2.5">
              {project.tech.map((t: string) => (
                <span
                  key={t}
                  className="px-4 py-2 bg-surface text-foreground font-mono text-xs md:text-sm rounded-xl border border-surface-border shadow-sm font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Gallery / Showcase */}
      <div id="galeria">
        {project.galleryItems && project.galleryItems.length > 0 ? (
          <ProjectInteractiveGallery
            items={project.galleryItems}
            projectTitle={project.title}
            projectSlug={project.slug}
          />
        ) : project.gallery && project.gallery.length > 0 ? (
          <section className="py-16 md:py-20 px-4 sm:px-6 bg-background border-t border-surface-border">
            <div className="max-w-6xl mx-auto">
              <div className="mb-10 text-center">
                <span className="text-primary font-mono text-xs uppercase tracking-widest block mb-2 font-semibold">
                  Capturas de Interfaz & Telemetría
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
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
                    className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-surface-border shadow-xl bg-surface-card"
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
        ) : null}
      </div>

      {/* Next Project Link */}
      <section className="h-[70vh] md:h-screen flex items-center justify-center border-t border-surface-border relative overflow-hidden px-6 bg-background transition-colors">
        <Link 
          href={`/projects/${project.nextProject.slug}`}
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
          className="group text-center interactive w-full cursor-pointer"
        >
          <span className="text-primary font-mono text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6 block font-semibold">
            Explorar Siguiente Caso de Estudio
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-foreground tracking-tighter group-hover:scale-105 group-hover:text-primary transition-all duration-500 leading-none">
            {project.nextProject.title}
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white dark:group-hover:text-slate-950 transition-all shadow-md">
              <ArrowRight size={24} className="md:w-7 md:h-7" />
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
