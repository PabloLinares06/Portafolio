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
      <div className="fixed top-10 left-10 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm interactive"
        >
          <ArrowLeft size={16} /> VOLVER
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-[120vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-mono text-sm uppercase tracking-[0.4em] mb-4 block"
          >
            {project.category}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-bold text-white tracking-tighter"
          >
            {project.title}
          </motion.h1>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="col-span-1">
              <h2 className="text-primary font-mono text-xs uppercase tracking-widest sticky top-32">EL RETO</h2>
            </div>
            <div className="col-span-2">
              <p className="text-3xl md:text-4xl text-white font-medium leading-tight tracking-tight">
                {project.challenge}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="col-span-1">
              <h2 className="text-primary font-mono text-xs uppercase tracking-widest sticky top-32">ARQUITECTURA</h2>
            </div>
            <div className="col-span-2">
              <p className="text-xl text-gray-400 leading-relaxed">
                {project.architecture}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto grid gap-10">
          {project.gallery.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
            >
              <Image
                src={img}
                alt={`${project.title} gallery ${i}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next Project Link */}
      <section className="h-screen flex items-center justify-center border-t border-secondary relative overflow-hidden">
        <Link 
          href={`/projects/${project.nextProject.slug}`}
          className="group text-center interactive"
        >
          <span className="text-primary font-mono text-sm uppercase tracking-widest mb-6 block">Siguiente Proyecto</span>
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-500">
            {project.nextProject.title}
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={24} />
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
