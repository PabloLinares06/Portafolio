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
    filename: 'OrdersController.cs',
    metric: 'P99: 12ms · 200 OK',
    code: `[HttpPost("api/v1/orders")]
[Authorize(Policy = "RequireAdmin")]
public async Task<IActionResult> CreateOrder(
    [FromBody] CreateOrderCommand cmd) 
{
    var result = await _mediator.Send(cmd);
    return result.IsSuccess 
        ? Ok(result.Value) 
        : BadRequest(result.Error);
}`,
  },
  {
    id: 2,
    title: 'Acceso a Datos',
    tech: 'Dapper / SQL Server / PostgreSQL',
    description:
      'Dominio de la persistencia de datos con enfoque en el rendimiento, usando micro-ORMs y optimización de consultas SQL para resultados ultrarrápidos.',
    Icon: Database,
    filename: 'ProductRepository.cs',
    metric: 'Exec: 1.4ms · Zero Alloc',
    code: `// Dapper High-Performance Query
const string sql = @"
    SELECT p.Id, p.Title, p.Stock, c.Name
    FROM Products p
    INNER JOIN Categories c ON p.CatId = c.Id
    WHERE p.IsActive = 1
    ORDER BY p.CreatedAt DESC";

return await _db.QueryAsync<ProductDto>(sql);`,
  },
  {
    id: 3,
    title: 'Arquitectura Limpia',
    tech: 'CQRS / Layered / Repository',
    description:
      'Aplicación de patrones que garantizan código mantenible, testable y desacoplado, inspirado en las mejores prácticas de la industria.',
    Icon: Layers,
    filename: 'CQRS_Flow.arch',
    metric: 'Decoupled · MediatR Pipeline',
    code: `[ HTTP Request ] ──► [ JWT Auth Pipeline ]
         │
         ▼
[ MediatR Command / Query Bus ]
         │
         ├──► [ Domain Aggregate & Rules ]
         │
         └──► [ Repository / Dapper UnitOfWork ]`,
  },
  {
    id: 4,
    title: 'Frontend Reactivo',
    tech: 'React / Angular / Next.js',
    description:
      'La capa final donde la lógica se encuentra con el usuario a través de interfaces modernas, rápidas y totalmente reactivas.',
    Icon: Monitor,
    filename: 'VirtualCatalog.tsx',
    metric: '60+ FPS · SSR / RSC Pipeline',
    code: `export default function VirtualCatalog() {
  const { data } = useQuery(['catalog'], fetchLive);
  const lenis = useLenis();

  return (
    <VirtualScroll items={data} lerp={0.1}>
      {(item) => <ProductNode item={item} />}
    </VirtualScroll>
  );
}`,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          style={{ width: 'auto' }}
        >
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="min-h-[85vh] md:h-screen w-full md:w-[100vw] flex-shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-20 py-16 md:py-0 border-b border-white/5 md:border-b-0"
            >
              <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 md:gap-14 items-center">

                {/* Text side */}
                <div className="flex flex-col order-2 md:order-1">
                  <span className="text-primary-light font-mono text-xs sm:text-sm mb-4 block uppercase tracking-[0.25em]">
                    02. Stack & Arquitectura · {layer.id}/{layers.length}
                  </span>

                  {/* Progress dots */}
                  <div className="flex gap-2 mb-6 md:mb-8 items-center">
                    {layers.map((l) => (
                      <div
                        key={l.id}
                        className={`h-[3px] rounded-full transition-all duration-300 ${
                          l.id === layer.id
                            ? 'w-10 bg-primary shadow-[0_0_10px_rgba(0,112,243,0.5)]'
                            : l.id < layer.id
                            ? 'w-5 bg-primary-light/40'
                            : 'w-5 bg-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 tracking-tighter leading-tight">
                    {layer.title}
                  </h3>
                  <div className="text-primary-light font-mono text-xs sm:text-sm mb-6 border-l-2 border-primary/50 pl-3 py-1 bg-primary/5 rounded-r-lg max-w-fit">
                    {layer.tech}
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
                    {layer.description}
                  </p>
                </div>

                {/* Technical IDE / Spec Card */}
                <div className="flex order-1 md:order-2 items-center justify-center w-full">
                  <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c0e] shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                    {/* Window Titlebar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/70 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block" />
                        <span className="font-mono text-[11px] text-gray-400 ml-2">
                          {layer.filename}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {layer.metric}
                      </span>
                    </div>

                    {/* Code Container */}
                    <div className="p-4 sm:p-5 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-gray-300 bg-[#08080a]">
                      <pre className="text-balance">
                        <code>{layer.code}</code>
                      </pre>
                    </div>

                    {/* Subtle layer watermark */}
                    <div className="absolute right-4 bottom-4 pointer-events-none opacity-5">
                      <layer.Icon className="w-20 h-20 text-white" />
                    </div>
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
