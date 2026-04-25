'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Server, Database, Layers, Monitor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    id: 1,
    title: 'Backend Core',
    tech: '.NET 9 / C# / Java',
    description:
      'El corazón de mis aplicaciones. Desarrollo de APIs REST robustas, lógica de negocio compleja y sistemas escalables con enfoque en el rendimiento.',
    Icon: Server,
  },
  {
    id: 2,
    title: 'Acceso a Datos',
    tech: 'Dapper / SQL Server / PostgreSQL',
    description:
      'Dominio de la persistencia de datos con enfoque en el rendimiento, usando micro-ORMs y optimización de consultas SQL para resultados ultrarrápidos.',
    Icon: Database,
  },
  {
    id: 3,
    title: 'Arquitectura Limpia',
    tech: 'CQRS / Layered / Repository',
    description:
      'Aplicación de patrones que garantizan código mantenible, testable y desacoplado, inspirado en las mejores prácticas de la industria.',
    Icon: Layers,
  },
  {
    id: 4,
    title: 'Frontend Reactivo',
    tech: 'React / Angular / Next.js',
    description:
      'La capa final donde la lógica se encuentra con el usuario a través de interfaces modernas, rápidas y totalmente reactivas.',
    Icon: Monitor,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run horizontal scroll on screens larger than mobile
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const totalSlides = layers.length;
      const ctx = gsap.to(sectionRef.current, {
        x: () => `-${(totalSlides - 1) * 100}vw`,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${window.innerWidth * (totalSlides - 1)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => ctx.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="experience" className="overflow-hidden bg-[#080808]">
      <div ref={triggerRef}>
        <div 
          ref={sectionRef} 
          className="flex flex-col md:flex-row min-h-screen will-change-transform" 
          style={{ width: 'auto' }} // Reset width for mobile stack
        >
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="min-h-screen md:h-screen w-full md:w-[100vw] flex-shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-20 py-20 md:py-0 border-b border-white/5 md:border-b-0"
            >
              <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center">

                {/* Text side */}
                <div className="flex flex-col order-2 md:order-1">
                  <span className="text-primary font-mono text-xs sm:text-sm mb-4 block uppercase tracking-widest">
                    Mi Stack · {layer.id}/{layers.length}
                  </span>

                  {/* Progress dots - hidden on mobile as they stack vertically */}
                  <div className="hidden md:flex gap-2 mb-10">
                    {layers.map((l) => (
                      <div
                        key={l.id}
                        className={`h-[2px] rounded-full transition-all duration-300 ${
                          l.id === layer.id
                            ? 'w-8 bg-primary'
                            : l.id < layer.id
                            ? 'w-4 bg-primary/40'
                            : 'w-4 bg-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-tight">
                    {layer.title}
                  </h3>
                  <div className="text-primary/80 font-mono text-xs sm:text-sm md:text-base mb-8 border-l-2 border-primary/30 pl-4 py-1">
                    {layer.tech}
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                    {layer.description}
                  </p>
                </div>

                {/* Icon side */}
                <div className="flex order-1 md:order-2 items-center justify-center">
                  <div className="relative scale-75 sm:scale-100">
                    <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150" />
                    <div className="relative p-10 sm:p-14 border border-white/5 rounded-3xl bg-white/[0.02] backdrop-blur">
                      <layer.Icon
                        className="w-16 h-16 sm:w-28 sm:h-28 text-primary/30 transition-all duration-500"
                        strokeWidth={1}
                      />
                    </div>
                    <span className="absolute -top-3 -right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-white text-xs sm:text-sm font-black flex items-center justify-center shadow-lg">
                      {layer.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
