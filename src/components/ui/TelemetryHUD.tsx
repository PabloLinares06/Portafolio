'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, MapPin, Terminal, Search, Keyboard, FileText } from 'lucide-react';
import { playOpen, playClick } from '@/utils/audio';

export default function TelemetryHUD() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('es-CO', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'America/Bogota',
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const openCmd = () => {
    playOpen();
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  const openTerminal = () => {
    playOpen();
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  const openShortcuts = () => {
    playOpen();
    window.dispatchEvent(new CustomEvent('open-shortcuts'));
  };

  return (
    <div className="w-full border-y border-surface-border bg-surface/85 backdrop-blur-md py-2.5 px-6 select-none relative z-20 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-muted-foreground">
        
        {/* Left: Location & Local Time */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-foreground/80">
            <MapPin size={12} className="text-primary flex-shrink-0" />
            <span>MEDELLÍN, CO</span>
            <span className="text-muted-foreground/60 hidden sm:inline">[6.2442° N, 75.5812° W]</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size={12} className="text-primary flex-shrink-0" />
            <span>{time || '--:--:--'} COT (GMT-5)</span>
          </div>
        </div>

        {/* Center: System Status */}
        <div className="hidden lg:flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SYS_STATUS: ALL SERVICES OPERATIONAL // 0.2ms LOCAL LATENCY</span>
        </div>

        {/* Right: Quick shortcuts */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCmd}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-1 px-1.5 rounded hover:bg-surface-elevated/60"
            title="Paleta de Comandos (Ctrl+K)"
          >
            <Search size={11} className="text-primary" />
            <span className="font-semibold text-foreground/90">Ctrl+K</span>
          </button>

          <span className="text-surface-border">·</span>

          <button
            onClick={openTerminal}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-1 px-1.5 rounded hover:bg-surface-elevated/60"
            title="Consola Terminal (`)"
          >
            <Terminal size={11} className="text-primary" />
            <span className="font-semibold text-foreground/90">` Consola</span>
          </button>

          <span className="text-surface-border hidden sm:inline">·</span>

          <button
            onClick={openShortcuts}
            className="hidden sm:flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-1 px-1.5 rounded hover:bg-surface-elevated/60"
            title="Guía de Atajos de Teclado (?)"
          >
            <Keyboard size={11} className="text-primary" />
            <span className="font-semibold text-foreground/90">? Atajos</span>
          </button>

          <span className="text-surface-border hidden md:inline">·</span>

          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors py-1 px-1.5 rounded hover:bg-surface-elevated/60"
            title="Formato Markdown estructurado para LLMs y Agentes"
          >
            <FileText size={11} className="text-primary" />
            <span className="font-semibold text-foreground/90">llms.txt</span>
          </a>
        </div>

      </div>
    </div>
  );
}
