'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 relative overflow-hidden select-none transition-colors">
      {/* Background ambient glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-primary/10 blur-[130px] pointer-events-none -top-20 -right-20" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -bottom-20 -left-20" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* Terminal Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400 font-mono text-xs uppercase tracking-widest mb-8 font-semibold"
        >
          <ShieldAlert size={14} />
          <span>HTTP 404 // SIGNAL LOST</span>
        </motion.div>

        {/* 404 Large Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-6"
        >
          <span className="text-8xl md:text-9xl font-black tracking-tighter text-foreground select-none">
            404
          </span>
        </motion.div>

        {/* Diagnostic message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-surface-border bg-surface-card backdrop-blur-md rounded-xl p-5 mb-8 text-left w-full shadow-lg font-mono text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-surface-border text-muted-foreground font-medium">
            <Terminal size={14} className="text-primary" />
            <span>sys_diag: routing_failure.log</span>
          </div>
          <p className="text-foreground/90 mb-1">
            <span className="text-primary">&gt;</span> ERROR: Route not resolved in current runtime scope.
          </p>
          <p className="text-muted-foreground">
            <span className="text-primary">&gt;</span> STATUS: Page relocated, decommissioned or never deployed.
          </p>
        </motion.div>

        {/* Action CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-white dark:text-slate-950 font-mono text-xs uppercase tracking-wider font-bold hover:bg-primary-hover transition-all shadow-md interactive"
          >
            <ArrowLeft size={16} />
            <span>Regresar a la Base / Inicio</span>
          </Link>
        </motion.div>
      </div>

      {/* Subtle bottom telemetry */}
      <div className="absolute bottom-6 text-center font-mono text-[10px] text-muted-foreground/60 tracking-widest">
        LATENCY: 0.2ms // PROTOCOL: HTTP/3 // SECURE NODE
      </div>
    </main>
  );
}
