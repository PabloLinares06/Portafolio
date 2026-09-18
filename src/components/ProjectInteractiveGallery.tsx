'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GalleryItem } from '@/data/projects';
import { 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Layers, 
  Store, 
  Settings, 
  Smartphone, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { playClick, playHover, playOpen } from '@/utils/audio';

interface ProjectInteractiveGalleryProps {
  items: GalleryItem[];
  projectTitle: string;
}

export default function ProjectInteractiveGallery({ items, projectTitle }: ProjectInteractiveGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tienda' | 'admin' | 'mobile'>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (indexInFiltered: number) => {
    playOpen();
    setActiveImageIndex(indexInFiltered);
  };

  const closeLightbox = useCallback(() => {
    playClick();
    setActiveImageIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    if (activeImageIndex === null) return;
    playClick();
    setActiveImageIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [activeImageIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (activeImageIndex === null) return;
    playClick();
    setActiveImageIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [activeImageIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, closeLightbox, nextImage, prevImage]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeImageIndex]);

  const counts = {
    all: items.length,
    tienda: items.filter((i) => i.category === 'tienda').length,
    admin: items.filter((i) => i.category === 'admin').length,
    mobile: items.filter((i) => i.category === 'mobile').length,
  };

  const activeItem = activeImageIndex !== null ? filteredItems[activeImageIndex] : null;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 bg-[#030507] border-t border-white/5 relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-4"
          >
            <Sparkles size={13} className="text-primary" />
            <span>Evidencia Visual en Producción ({items.length} Vistas)</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            Galería Interactiva del Sistema
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Explora las pantallas reales de la plataforma {projectTitle}: desde la experiencia del cliente mayorista en tienda y dispositivos móviles, hasta los módulos de analítica BI y la integración fiscal con EFFI ERP.
          </p>
        </div>

        {/* Technical Migration Comparison Callout */}
        <div className="mb-14 p-6 md:p-8 rounded-3xl bg-[#080d14]/90 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold block mb-1">
                Arquitectura en Evolución // Caso Real de Negocio
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Migración Estratégica: Firebase Serverless → VPS Auto-Hospedado
              </h3>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              ROI & COSTOS OPTIMIZADOS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {/* Antes */}
            <div className="p-5 rounded-2xl bg-red-500/[0.03] border border-red-500/20 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider font-bold">
                <span>✕ Arquitectura Previa (Firebase Serverless)</span>
              </div>
              <ul className="text-xs font-mono text-gray-400 space-y-1.5 pt-2">
                <li>• Facturación elástica impredecible por lecturas continuas de Firestore.</li>
                <li>• Exportación manual y digitación repetitiva de pedidos en software contable.</li>
                <li>• Ausencia de modo kiosko interactivo con bloqueo de seguridad en bodega.</li>
                <li>• Banners estáticos sin generación dinámica para vendedores de WhatsApp.</li>
              </ul>
            </div>

            {/* Ahora */}
            <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold">
                <span>✓ NaTec V2 (NestJS + Docker VPS + EFFI ERP)</span>
              </div>
              <ul className="text-xs font-mono text-gray-300 space-y-1.5 pt-2">
                <li>• Costo fijo mensual de $14 USD/mes en Droplet VPS DigitalOcean + Nginx.</li>
                <li>• Integración oficial con EFFI ERP: exportación masiva en .xlsx con ExcelJS.</li>
                <li>• Modo Kiosko táctil con PIN de seguridad y reinicio automático por inactividad.</li>
                <li>• Motor Canvas 2D a 1200×1200 px con copiado directo al portapapeles.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          <button
            onClick={() => {
              playClick();
              setSelectedCategory('all');
            }}
            onMouseEnter={() => playHover()}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all interactive cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(0,242,254,0.35)]'
                : 'bg-white/[0.03] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>Todas las Vistas ({counts.all})</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setSelectedCategory('tienda');
            }}
            onMouseEnter={() => playHover()}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all interactive cursor-pointer ${
              selectedCategory === 'tienda'
                ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(0,242,254,0.35)]'
                : 'bg-white/[0.03] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Store size={14} />
            <span>Tienda Pública ({counts.tienda})</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setSelectedCategory('admin');
            }}
            onMouseEnter={() => playHover()}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all interactive cursor-pointer ${
              selectedCategory === 'admin'
                ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(0,242,254,0.35)]'
                : 'bg-white/[0.03] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Settings size={14} />
            <span>Panel Admin, ERP & BI ({counts.admin})</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setSelectedCategory('mobile');
            }}
            onMouseEnter={() => playHover()}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all interactive cursor-pointer ${
              selectedCategory === 'mobile'
                ? 'bg-primary text-black font-bold shadow-[0_0_20px_rgba(0,242,254,0.35)]'
                : 'bg-white/[0.03] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>Vistas Móviles ({counts.mobile})</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(idx)}
                onMouseEnter={() => playHover()}
                className="group relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-[#090e16] hover:border-primary/50 transition-all duration-500 shadow-xl cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className={`relative w-full overflow-hidden bg-[#040608] ${
                  item.category === 'mobile' ? 'aspect-[9/14]' : 'aspect-video'
                }`}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[9px] font-mono uppercase tracking-wider text-gray-200">
                      {item.category === 'admin' ? '⚙️ Admin & ERP' : item.category === 'tienda' ? '🛒 Tienda' : '📱 Móvil'}
                    </span>
                  </div>

                  {/* Zoom overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 rounded-full bg-primary text-black shadow-[0_0_20px_rgba(0,242,254,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 flex-1 flex flex-col justify-between border-t border-white/5 bg-[#070b12]">
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400 font-mono mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>AMPLIAR EN ALTA DEFINICIÓN</span>
                    <ArrowUpRight size={12} className="text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between text-white z-20 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary font-mono text-xs uppercase tracking-wider font-bold">
                  {activeItem.category === 'admin' ? 'Panel Admin & EFFI ERP' : activeItem.category === 'tienda' ? 'Tienda Pública' : 'Vista Móvil UX'}
                </span>
                <span className="font-mono text-xs text-gray-400 hidden sm:inline">
                  [{activeImageIndex! + 1} / {filteredItems.length}]
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Cerrar (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Center Image Container with Navigation Arrows */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-black/60 hover:bg-primary hover:text-black text-white border border-white/15 transition-all shadow-xl cursor-pointer"
                title="Anterior (←)"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Main Image */}
              <motion.div
                key={activeItem.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full max-w-6xl max-h-[75vh]"
              >
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-black/60 hover:bg-primary hover:text-black text-white border border-white/15 transition-all shadow-xl cursor-pointer"
                title="Siguiente (→)"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="max-w-4xl mx-auto text-center z-20 pt-4 border-t border-white/10 w-full">
              <h3 className="text-base sm:text-xl font-bold text-white tracking-tight mb-1">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-mono max-w-2xl mx-auto leading-relaxed">
                {activeItem.description}
              </p>
              <div className="text-[10px] font-mono text-gray-500 mt-2 flex items-center justify-center gap-4">
                <span>Usa las flechas ← → del teclado para explorar</span>
                <span>•</span>
                <span>ESC para cerrar</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
