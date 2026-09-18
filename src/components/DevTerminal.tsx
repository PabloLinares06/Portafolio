'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playSuccess, playTerminalKey, playOpen } from '@/utils/audio';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
}

const WELCOME_BANNER = `
  ██████╗  █████╗ ██████╗ ██╗      ██████╗ 
  ██╔══██╗██╔══██╗██╔══██╗██║     ██╔═══██╗
  ██████╔╝███████║██████╔╝██║     ██║   ██║
  ██╔═══╝ ██╔══██║██╔══██╗██║     ██║   ██║
  ██║     ██║  ██║██████╔╝███████╗╚██████╔╝
  ╚═╝     ╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝ 
  Terminal Core v2.6.4 // Node: Pablo Linares Architecture
  Escribe 'help' para ver los comandos disponibles.
`;

export default function DevTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'output', content: WELCOME_BANNER }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => {
      playOpen();
      setIsOpen(true);
      setIsMinimized(false);
    };

    const handleKey = (e: KeyboardEvent) => {
      // Toggle terminal with backtick if not typing in an input
      if (e.key === '`' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) playOpen();
          return !prev;
        });
      }
    };

    window.addEventListener('open-terminal', handleOpen);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('open-terminal', handleOpen);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 50);
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [isOpen, isMinimized, history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [
      ...history,
      { id: Math.random().toString(), type: 'input', content: `pablo@core:~$ ${cmd}` }
    ];

    if (trimmed) {
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIdx(-1);
    }

    switch (trimmed) {
      case 'help':
        newHistory.push({
          id: Math.random().toString(),
          type: 'output',
          content: `Comandos disponibles:
  • help       - Muestra este menú de ayuda
  • whoami     - Perfil profesional y filosofía de ingeniería
  • projects   - Lista de proyectos y casos de estudio
  • natec      - Detalles técnicos de la migración de NaTec V2 a VPS
  • fuelix     - Arquitectura Industrial IoT y Offline-First de Fuelix
  • stack      - Diagrama visual de arquitecturas dominadas
  • contact    - Datos de contacto directo
  • clear      - Limpia la consola
  • sudo hire  - [CONFIDENCIAL] Inicializa protocolo de contratación
  • exit       - Cierra la consola interactiva`
        });
        break;

      case 'whoami':
        newHistory.push({
          id: Math.random().toString(),
          type: 'output',
          content: `PABLO LINARES
Desarrollador de Software enfocado en Backend de alto rendimiento,
arquitecturas desacopladas y sistemas de misión crítica.
Especializado en .NET 9, NestJS 11, Angular 22, micro-ORMs (Dapper),
persistencia relacional (SQL Server, PostgreSQL) e infraestructura Docker VPS.`
        });
        break;

      case 'projects':
        newHistory.push({
          id: Math.random().toString(),
          type: 'output',
          content: `[01] VitalAPP   — Backend .NET 9 / C# / Dapper / CQRS / SQL Server (Gestión Médica)
[02] NaTec V2   — NestJS 11 / Angular 22 / EFFI ERP / Docker VPS / SSE (E-Commerce Mayorista)
[03] Fuelix     — Angular 22 / NestJS 11 / Raspberry Pi / Offline-First (Industrial IoT)`
        });
        break;

      case 'natec':
        newHistory.push({
          id: Math.random().toString(),
          type: 'success',
          content: `[NaTec V2 - RESUMEN DE MIGRACIÓN]
• Desafío: Alto costo e imprevisibilidad de Firebase en volumen mayorista.
• Solución: Migración a VPS DigitalOcean con Docker Compose + Nginx Alpine.
• Impacto: Reducción a costo fijo de $14 USD/mes con rendimiento superior.
• Integraciones: Motor contable oficial EFFI ERP mediante ExcelJS y tiempo real con SSE.`
        });
        break;

      case 'fuelix':
        newHistory.push({
          id: Math.random().toString(),
          type: 'success',
          content: `[Fuelix - INDUSTRIAL IOT & EDGE]
• Nivel 1: Gateway en Raspberry Pi con lectura serial pasiva a dispensadores y buffer SQLite.
• Nivel 2: Servidor local en PC con NestJS y PostgreSQL como fuente de verdad en estación.
• Nivel 3: Nube multi-tenant con Angular 22 PWA y Supabase.
• Cumplimiento: Estricta metrología legal SIC (Resoluciones 77507 / 67760).`
        });
        break;

      case 'stack':
        newHistory.push({
          id: Math.random().toString(),
          type: 'output',
          content: `[SYSTEM ARCHITECTURE TOPOLOGY]
  [ CLIENTS ]  ──► React / Angular Signals / Touch Kiosk / PWA
       │
  [ GATEWAY ]  ──► Nginx Reverse Proxy / TLS Termination / Gzip
       │
  [ BACKEND ]  ──► ASP.NET Core 9 (.NET) / NestJS 11 Clean Arch
       │
  [ BUS/EVENTS] ─► MediatR CQRS / Server-Sent Events (SSE)
       │
  [ DATA LAYER] ─► Dapper Micro-ORM / Prisma / SQL Server / PostgreSQL
       │
  [ INFRA ]    ──► Docker Compose / DigitalOcean Droplets / Spaces S3`
        });
        break;

      case 'contact':
        navigator.clipboard.writeText('juan.linares682@pascualbravo.edu.co');
        playSuccess();
        newHistory.push({
          id: Math.random().toString(),
          type: 'success',
          content: `Email copiado al portapapeles: juan.linares682@pascualbravo.edu.co
GitHub: https://github.com/PabloLinares06
Estado: Abierto a retos desafiantes de arquitectura y desarrollo backend/full-stack.`
        });
        break;

      case 'sudo hire':
        playSuccess();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        newHistory.push({
          id: Math.random().toString(),
          type: 'success',
          content: `🚀 [AUTORIZACIÓN CONFIRMADA: SUDO ACCESS GRANTED]
*************************************************************
¡Excelente decisión!
Has desbloqueado a un ingeniero enfocado en resolver problemas reales,
optimizar costos de infraestructura y escribir código limpio y medible.
Escríbeme directamente a: juan.linares682@pascualbravo.edu.co
*************************************************************`
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        setIsOpen(false);
        return;

      case '':
        break;

      default:
        newHistory.push({
          id: Math.random().toString(),
          type: 'error',
          content: `Comando no reconocido: '${cmd}'. Escribe 'help' para ver las instrucciones.`
        });
        break;
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1 < commandHistory.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    } else {
      playTerminalKey();
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playOpen();
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-primary/30 bg-[#090d14]/90 backdrop-blur-md text-gray-300 hover:text-white hover:border-primary transition-all shadow-[0_0_20px_rgba(0,242,254,0.2)] font-mono text-xs interactive cursor-pointer"
        >
          <TerminalIcon size={14} className="text-primary animate-pulse" />
          <span className="hidden sm:inline">&gt;_ Dev Console</span>
          <span className="text-[10px] bg-white/10 px-1 rounded text-gray-400">`</span>
        </motion.button>
      </div>

      {/* Terminal Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-50 transition-all duration-300 ${
              isMinimized
                ? 'bottom-6 right-20 w-80 h-12'
                : 'bottom-4 right-4 sm:bottom-10 sm:right-10 w-[95vw] sm:w-[680px] h-[520px] max-h-[85vh]'
            } bg-[#06090e]/95 border border-primary/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col overflow-hidden text-gray-200 font-mono text-xs`}
          >
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10 select-none">
              <div className="flex items-center gap-2">
                <div 
                  onClick={() => {
                    playClick();
                    setIsOpen(false);
                  }} 
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer transition-colors" 
                />
                <div 
                  onClick={() => {
                    playClick();
                    setIsMinimized(!isMinimized);
                  }} 
                  className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 cursor-pointer transition-colors" 
                />
                <div 
                  onClick={() => {
                    playSuccess();
                    executeCommand('sudo hire');
                  }} 
                  className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 cursor-pointer transition-colors" 
                />
                <span className="ml-3 text-[11px] text-gray-400 font-mono flex items-center gap-1.5">
                  <TerminalIcon size={12} className="text-primary" />
                  core-terminal // pablo@production
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <button
                  onClick={() => {
                    playClick();
                    setIsMinimized(!isMinimized);
                  }}
                  className="p-1 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {isMinimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setIsOpen(false);
                  }}
                  className="p-1 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            {!isMinimized && (
              <>
                <div 
                  ref={scrollRef}
                  className="flex-1 p-4 overflow-y-auto space-y-2 select-text custom-scroll"
                >
                  {history.map((line) => (
                    <div 
                      key={line.id} 
                      className={`whitespace-pre-wrap leading-relaxed ${
                        line.type === 'input' 
                          ? 'text-cyan-300 font-semibold' 
                          : line.type === 'error' 
                          ? 'text-red-400' 
                          : line.type === 'success' 
                          ? 'text-emerald-400 font-medium' 
                          : 'text-gray-300'
                      }`}
                    >
                      {line.content}
                    </div>
                  ))}
                </div>

                {/* Input Prompt Line */}
                <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-t border-white/5">
                  <span className="text-primary font-bold">pablo@core:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe 'help' o un comando..."
                    className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-600 font-mono text-xs"
                    autoFocus
                  />
                  <span className="w-2 h-4 bg-primary animate-pulse" />
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
