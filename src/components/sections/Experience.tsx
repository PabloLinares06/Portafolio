'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Server, Database, Layers, Monitor, Terminal, Shield, Cpu } from 'lucide-react';
import { playHover } from '@/utils/audio';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    id: 1,
    title: 'Backend Core',
    tech: '.NET 9 / C# / NestJS 11',
    description:
      'El corazón de mis aplicaciones. Desarrollo de APIs REST robustas, lógica de negocio de alta concurrencia y sistemas escalables con enfoque en microsegundos.',
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
    tech: 'Dapper / SQL Server / PostgreSQL / Prisma',
    description:
      'Dominio de la persistencia relacional con micro-ORMs de alta velocidad y optimización manual de consultas SQL para rendimiento sin fugas de memoria.',
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
    title: 'Arquitectura Limpia & Eventos',
    tech: 'CQRS / MediatR / SSE / Clean Arch',
    description:
      'Separación radical de responsabilidades. Commands vs Queries desacoplados, streaming reactivo Server-Sent Events (SSE) y reglas de negocio puras.',
    Icon: Layers,
    filename: 'CQRS_Flow.arch',
    metric: 'Decoupled · SSE Live Stream',
    code: `[ Client / Kiosk ] ──► [ Nginx / TLS ]
         │
         ▼
[ NestJS / .NET API Gateway ]
         │
         ├──► [ MediatR CQRS / Clean Domain ]
         │
         └──► [ Server-Sent Events Real-Time Bus ]`,
  },
  {
    id: 4,
    title: 'Frontend Reactivo & Kioskos',
    tech: 'Angular 22 Signals / React 19 / Next.js',
    description:
      'Interfaces ultra-rápidas, modo kiosko táctil con PIN de seguridad, renderizado Canvas 2D en navegador y sincronización reactiva de estado.',
    Icon: Monitor,
    filename: 'KioskCatalog.ts',
    metric: '60+ FPS · Signals Reactive',
    code: `@Component({
  standalone: true,
  template: \`
    <div class="kiosk-grid">
      @for (product of products(); track product.id) {
        <product-card [item]="product" (select)="addToCart($event)" />
      }
    </div>
  \`
})
export class KioskCatalog {
  products = signal<Product[]>([]);
}`,
  },
  {
    id: 5,
    title: 'Infraestructura & Edge IoT',
    tech: 'Docker Compose / DigitalOcean / Raspberry Pi',
    description:
      'Containerización multi-stage, reducción drástica de costos de nube (migración Firebase a VPS $14/mes) y telemetría edge tolerante a fallos.',
    Icon: Cpu,
    filename: 'docker-compose.yml',
    metric: '$14 USD/mes Droplet · 99.9% SLA',
    code: `services:
  api:
    build: { context: ./backend, dockerfile: Dockerfile }
    environment: [ DATABASE_URL, JWT_SECRET, S3_BUCKET ]
    restart: always
  web:
    build: { context: ./frontend, dockerfile: Dockerfile }
    ports: ["80:80", "443:443"]
    depends_on: [ api ]`,
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
    <div id="experience" className="overflow-hidden bg-[#06080c]">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="flex flex-col md:flex-row md:w-[500vw] min-h-screen md:h-screen"
        >
          {layers.map((layer, index) => {
            const Icon = layer.Icon;
            return (
              <div
                key={layer.id}
                onMouseEnter={() => playHover()}
                className="w-full md:w-screen min-h-screen md:h-full flex items-center justify-center p-6 md:p-14 relative border-b md:border-b-0 md:border-r border-white/10"
              >
                {/* Layer Number background watermark */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14rem] sm:text-[18rem] md:text-[24rem] font-black text-white/[0.02] select-none pointer-events-none font-mono">
                  0{layer.id}
                </span>

                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center relative z-10">
                  {/* Left Column: Description & Metadata */}
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-2xl text-primary shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                        <Icon size={24} className="md:w-7 md:h-7" />
                      </div>
                      <span className="text-primary font-mono text-xs uppercase tracking-[0.25em] font-semibold">
                        Nivel 0{layer.id} · Arquitectura
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                      {layer.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-mono text-cyan-300 font-medium px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 inline-block">
                      {layer.tech}
                    </p>

                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      {layer.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
                      <Shield size={14} />
                      <span>{layer.metric}</span>
                    </div>
                  </div>

                  {/* Right Column: Interactive Code Console Mockup */}
                  <div className="rounded-2xl border border-white/10 bg-[#040608]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
                    {/* Console Header Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/10 text-gray-500 font-mono text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                        <span className="ml-2 text-gray-300 flex items-center gap-1">
                          <Terminal size={11} className="text-primary" />
                          {layer.filename}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-600 uppercase tracking-widest hidden sm:inline">
                        PRODUCTION
                      </span>
                    </div>

                    {/* Code Snippet Display */}
                    <div className="p-4 sm:p-5 overflow-x-auto text-[11px] sm:text-xs font-mono text-gray-300 leading-relaxed custom-scroll">
                      <pre>
                        <code>{layer.code}</code>
                      </pre>
                    </div>

                    {/* Console Footer Telemetry */}
                    <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                      <span>STATUS: OPTIMIZED</span>
                      <span className="text-primary-light">THREAD: SAFE</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Slide Progress Tracker */}
                <div className="absolute bottom-8 left-14 hidden md:flex items-center gap-2 text-xs font-mono text-gray-600">
                  <span className="text-white font-bold">0{index + 1}</span>
                  <span>/</span>
                  <span>0{layers.length}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
