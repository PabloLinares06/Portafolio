'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, MapPin, Terminal, Search } from 'lucide-react';
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

  return (
    <div className="w-full border-y border-white/5 bg-[#040608]/80 backdrop-blur-md py-3 px-6 select-none relative z-20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-gray-400">
        
        {/* Left: Location & Local Time */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-gray-300">
            <MapPin size={12} className="text-primary flex-shrink-0" />
            <span>MEDELLÍN, CO</span>
            <span className="text-gray-600 hidden sm:inline">[6.2442° N, 75.5812° W]</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400">
            <Clock size={12} className="text-cyan-400 flex-shrink-0" />
            <span>{time || '--:--:--'} COT (GMT-5)</span>
          </div>
        </div>

        {/* Center: System Status */}
        <div className="hidden lg:flex items-center gap-2 text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYS_STATUS: ALL SERVICES OPERATIONAL // 0.2ms LOCAL LATENCY</span>
        </div>

        {/* Right: Quick shortcuts */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCmd}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            title="Paleta de Comandos"
          >
            <Search size={11} className="text-primary" />
            <span className="text-gray-300">Ctrl+K</span>
          </button>

          <span className="text-gray-700">·</span>

          <button
            onClick={openTerminal}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            title="Consola Terminal"
          >
            <Terminal size={11} className="text-cyan-400" />
            <span className="text-gray-300">` Consola</span>
          </button>
        </div>

      </div>
    </div>
  );
}
