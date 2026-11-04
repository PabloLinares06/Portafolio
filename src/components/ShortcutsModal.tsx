'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Keyboard, 
  X, 
  Search, 
  Terminal, 
  SunMoon, 
  Volume2, 
  Copy, 
  Compass, 
  ArrowRight,
  Check
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { playClick, playHover, playOpen, playSuccess, isAudioMuted, setAudioMuted } from '@/utils/audio';

interface ShortcutGroup {
  category: string;
  items: {
    keys: string[];
    description: string;
    action?: () => void;
  }[];
}

export default function ShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    playClick();
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const toggleAudio = () => {
    const muted = isAudioMuted();
    setAudioMuted(!muted);
    if (muted) playSuccess();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('juanpalinare@gmail.com');
    playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    playClick();
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      const activeEl = document.activeElement;
      const isInput = activeEl instanceof HTMLInputElement || activeEl instanceof HTMLTextAreaElement;

      // Toggle shortcuts modal with '?'
      if (e.key === '?' && !isInput) {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) playOpen();
          return !prev;
        });
        return;
      }

      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      // Quick hotkeys when no modal/input is active
      if (!isInput && !isOpen) {
        const key = e.key.toLowerCase();
        if (key === 't') {
          e.preventDefault();
          toggleTheme();
        } else if (key === 'm') {
          e.preventDefault();
          toggleAudio();
        } else if (key === 'c') {
          e.preventDefault();
          copyEmail();
        } else if (key === 'h') {
          scrollTo('hero');
        } else if (key === 'a') {
          scrollTo('about');
        } else if (key === 'e') {
          scrollTo('experience');
        } else if (key === 'p') {
          scrollTo('projects');
        } else if (key === 's') {
          scrollTo('skills');
        }
      }
    };

    const handleOpenCustom = () => {
      playOpen();
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-shortcuts', handleOpenCustom);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-shortcuts', handleOpenCustom);
    };
  }, [isOpen, resolvedTheme]);

  const shortcutGroups: ShortcutGroup[] = [
    {
      category: 'Navegación Rápida',
      items: [
        { keys: ['H'], description: 'Ir a Inicio / Hero' },
        { keys: ['A'], description: 'Ir a Trayectoria & Filosofía' },
        { keys: ['E'], description: 'Ir a Arquitectura & Experiencia' },
        { keys: ['P'], description: 'Ir a Casos de Estudio (Proyectos)' },
        { keys: ['S'], description: 'Ir a Arsenal Técnico' },
      ],
    },
    {
      category: 'Herramientas de Desarrollador',
      items: [
        { keys: ['Ctrl', 'K'], description: 'Abrir Paleta de Comandos' },
        { keys: ['`'], description: 'Abrir Consola Terminal Dev' },
        { keys: ['T'], description: 'Alternar Tema Claro / Oscuro' },
        { keys: ['M'], description: 'Alternar Efectos de Audio Hápticos' },
        { keys: ['C'], description: 'Copiar Correo Directo al Portapapeles' },
        { keys: ['?'], description: 'Ver esta Guía de Atajos' },
      ],
    },
  ];

  return (
    <>
      {/* Toast Notification when 'C' copies email */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2.5 rounded-full bg-surface-elevated/95 border border-primary/40 text-foreground font-mono text-xs flex items-center gap-2 shadow-2xl backdrop-blur-md"
          >
            <Check size={14} className="text-emerald-500" />
            <span>juanpalinare@gmail.com copiado al portapapeles</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shortcuts Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-surface-card border border-surface-border rounded-2xl shadow-2xl overflow-hidden text-foreground z-10 flex flex-col max-h-[85vh] backdrop-blur-xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-elevated/40 select-none">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Keyboard size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">Atajos de Teclado</h3>
                    <p className="text-[11px] font-mono text-muted-foreground">Navegación e ingeniería a nivel de sistema</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playClick();
                    setIsOpen(false);
                  }}
                  className="p-1.5 hover:text-foreground text-muted-foreground rounded-lg hover:bg-surface-elevated transition-colors cursor-pointer"
                  title="Cerrar (Esc)"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 custom-scroll">
                {shortcutGroups.map((group) => (
                  <div key={group.category} className="space-y-2.5">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                      {group.category}
                    </h4>

                    <div className="grid gap-2">
                      {group.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-2 px-3 rounded-xl bg-surface-elevated/30 border border-surface-border hover:border-primary/30 transition-colors"
                        >
                          <span className="text-xs text-foreground/90 font-medium">
                            {item.description}
                          </span>

                          <div className="flex items-center gap-1">
                            {item.keys.map((k, kIdx) => (
                              <kbd
                                key={kIdx}
                                className="px-2 py-0.5 rounded-md bg-surface-elevated border border-surface-border font-mono text-[11px] font-semibold text-foreground shadow-xs min-w-[24px] text-center"
                              >
                                {k}
                              </kbd>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 bg-surface-elevated/50 border-t border-surface-border flex items-center justify-between text-[11px] font-mono text-muted-foreground select-none">
                <span>Pulsa <kbd className="px-1.5 py-0.5 rounded bg-surface-border text-foreground font-semibold">?</kbd> en cualquier momento</span>
                <span>ESC para cerrar</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
