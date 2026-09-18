'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  Layers, 
  ExternalLink, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  FolderGit2, 
  Briefcase, 
  Cpu, 
  Send,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playHover, playClick, playSuccess, playOpen, isAudioMuted, setAudioMuted } from '@/utils/audio';

interface ActionItem {
  id: string;
  category: 'Navegación' | 'Proyectos' | 'Herramientas' | 'Social';
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSoundEnabled(!isAudioMuted());

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) playOpen();
          return !prev;
        });
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOpenCustom = () => {
      playOpen();
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenCustom);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenCustom);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setAudioMuted(!next);
    if (next) playSuccess();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('juan.linares682@pascualbravo.edu.co');
    setCopiedEmail(true);
    playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopiedEmail(false), 2500);
    setIsOpen(false);
  };

  const navigateToSection = (id: string) => {
    playClick();
    setIsOpen(false);
    if (window.location.pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openTerminal = () => {
    playClick();
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  const actions: ActionItem[] = [
    // Proyectos
    {
      id: 'proj-vitalapp',
      category: 'Proyectos',
      title: 'VitalAPP',
      subtitle: '.NET 9 · C# · Dapper · MediatR CQRS · SQL Server',
      badge: 'Caso de Estudio',
      icon: FolderGit2,
      action: () => {
        playClick();
        setIsOpen(false);
        router.push('/projects/vitalapp');
      }
    },
    {
      id: 'proj-natec',
      category: 'Proyectos',
      title: 'NaTec V2',
      subtitle: 'NestJS 11 · Angular 22 · EFFI ERP · Docker VPS · SSE',
      badge: 'Producción',
      icon: FolderGit2,
      action: () => {
        playClick();
        setIsOpen(false);
        router.push('/projects/natechnology');
      }
    },
    {
      id: 'proj-fuelix',
      category: 'Proyectos',
      title: 'Fuelix',
      subtitle: 'Industrial IoT · Raspberry Pi · NestJS · Offline-First',
      badge: 'Edge Computing',
      icon: Cpu,
      action: () => {
        playClick();
        setIsOpen(false);
        router.push('/projects/fuelix');
      }
    },

    // Navegación
    {
      id: 'nav-home',
      category: 'Navegación',
      title: 'Inicio / Hero',
      subtitle: 'Visión general y bienvenida',
      icon: Sparkles,
      action: () => navigateToSection('hero')
    },
    {
      id: 'nav-exp',
      category: 'Navegación',
      title: '01. Trayectoria & Experiencia',
      subtitle: 'Historial y evolución como desarrollador',
      icon: Briefcase,
      action: () => navigateToSection('experience')
    },
    {
      id: 'nav-stack',
      category: 'Navegación',
      title: '02. Stack & Arquitectura',
      subtitle: 'Consolas interactivas de código y capas del sistema',
      icon: Layers,
      action: () => navigateToSection('architecture')
    },
    {
      id: 'nav-projects',
      category: 'Navegación',
      title: '03. Casos de Estudio',
      subtitle: 'Proyectos destacados con métricas y arquitectura',
      icon: FolderGit2,
      action: () => navigateToSection('projects')
    },
    {
      id: 'nav-skills',
      category: 'Navegación',
      title: '04. Arsenal Técnico',
      subtitle: 'Especialidades backend, frontend y bases de datos',
      icon: Cpu,
      action: () => navigateToSection('skills')
    },
    {
      id: 'nav-contact',
      category: 'Navegación',
      title: '05. Contacto',
      subtitle: 'Canales directos de comunicación',
      icon: Send,
      action: () => navigateToSection('contact')
    },

    // Herramientas
    {
      id: 'tool-copy-email',
      category: 'Herramientas',
      title: copiedEmail ? '¡Correo Copiado al Portapapeles!' : 'Copiar Correo Directo',
      subtitle: 'juan.linares682@pascualbravo.edu.co',
      badge: 'Quick Copy',
      icon: copiedEmail ? Check : Copy,
      action: copyEmail
    },
    {
      id: 'tool-terminal',
      category: 'Herramientas',
      title: 'Abrir Consola Dev / Terminal',
      subtitle: 'Ejecuta comandos CLI interactivos y easter eggs',
      badge: 'Interactive',
      icon: Terminal,
      action: openTerminal
    },
    {
      id: 'tool-sound',
      category: 'Herramientas',
      title: soundEnabled ? 'Silenciar Efectos de Audio Hápticos' : 'Activar Sonido Háptico Sci-Fi',
      subtitle: soundEnabled ? 'Audio sintetizado actualmente activo' : 'Activar sonido Web Audio sintetizado',
      badge: soundEnabled ? 'ON' : 'OFF',
      icon: soundEnabled ? Volume2 : VolumeX,
      action: toggleSound
    },

    // Social
    {
      id: 'social-github',
      category: 'Social',
      title: 'GitHub Oficial',
      subtitle: 'github.com/PabloLinares06',
      icon: ExternalLink,
      action: () => {
        playClick();
        window.open('https://github.com/PabloLinares06', '_blank');
        setIsOpen(false);
      }
    }
  ];

  const filteredActions = actions.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q))
    );
  });

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playHover();
      setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playHover();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 md:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-[#090d12]/95 border border-white/15 rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden text-white z-10 flex flex-col max-h-[75vh]"
          >
            {/* Header Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
              <Search size={18} className="text-primary flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Escribe un comando o busca secciones, proyectos..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDownList}
                className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none font-sans"
              />
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 text-gray-400 bg-white/5">
                ESC para cerrar
              </span>
            </div>

            {/* Actions List */}
            <div className="overflow-y-auto p-2 divide-y divide-white/5 max-h-[50vh] custom-scroll">
              {filteredActions.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs font-mono">
                  No se encontraron comandos para &quot;{query}&quot;
                </div>
              ) : (
                filteredActions.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => {
                        setSelectedIndex(idx);
                        playHover();
                      }}
                      onClick={item.action}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? 'bg-primary/15 text-white border border-primary/30 shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                          : 'text-gray-300 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-black' : 'bg-white/5 text-gray-400'}`}>
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold tracking-wide truncate">{item.title}</span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/10 text-gray-400">
                              {item.category}
                            </span>
                          </div>
                          {item.subtitle && (
                            <p className="text-[11px] text-gray-400 truncate mt-0.5 font-mono">{item.subtitle}</p>
                          )}
                        </div>
                      </div>

                      {item.badge && (
                        <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${
                          isSelected ? 'bg-primary/20 text-primary-light border-primary/40' : 'bg-white/5 text-gray-400 border-white/10'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Telemetry */}
            <div className="px-5 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
              <div className="flex items-center gap-3">
                <span>↑↓ para navegar</span>
                <span>↵ seleccionar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>CORE TERMINAL READY</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
