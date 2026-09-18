'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, ArrowUpRight, Terminal, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playHover, playSuccess, playOpen } from '@/utils/audio';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('juanpalinare@gmail.com');
    setCopied(true);
    playSuccess();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const openTerminal = () => {
    playOpen();
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  return (
    <footer
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center border-t border-white/5 bg-[#040608] relative overflow-hidden px-6"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 border-t border-primary/5"
            style={{ top: `${25 + i * 25}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-primary font-mono text-sm uppercase tracking-[0.3em] mb-6 font-semibold"
        >
          05. Contacto & Despliegue
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-white group cursor-default"
        >
          <span className="relative inline-block hover:text-primary transition-colors duration-300">
            HABLEMOS.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-base md:text-lg mb-12 max-w-md mx-auto leading-relaxed"
        >
          Disponible para retos de arquitectura backend, sistemas distribuidos, IoT y roles de alto impacto. Conectemos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8"
        >
          {/* Main Mailto CTA */}
          <a
            href="mailto:juanpalinare@gmail.com"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-cyan-300 transition-all shadow-[0_0_35px_rgba(0,242,254,0.35)] interactive group text-sm md:text-base cursor-pointer"
          >
            <Mail size={18} />
            <span>Enviar Correo</span>
          </a>

          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            onMouseEnter={() => playHover()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-primary/50 text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all interactive relative cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-400" />
                <span className="text-emerald-400 font-bold">¡Copiado con Éxito!</span>
              </>
            ) : (
              <>
                <Copy size={16} className="text-primary" />
                <span>juanpalinare@gmail.com</span>
              </>
            )}
          </button>

          {/* Easter egg terminal button */}
          <button
            onClick={openTerminal}
            onMouseEnter={() => playHover()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 border border-primary/30 bg-primary/10 text-cyan-300 hover:bg-primary/20 font-mono text-xs uppercase tracking-wider rounded-full transition-all interactive cursor-pointer"
          >
            <Terminal size={14} className="text-primary" />
            <span>&gt;_ sudo hire</span>
          </button>
        </motion.div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 pt-8 border-t border-white/5">
          <a
            href="https://github.com/PabloLinares06"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <span>GitHub</span>
            <ArrowUpRight size={14} />
          </a>
          <span className="text-gray-700">·</span>
          <a
            href="https://linkedin.com/in/jplinaresdev"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="absolute bottom-6 left-0 right-0 px-8 flex flex-col sm:flex-row items-center justify-between text-gray-600 font-mono text-[11px] gap-2">
        <span>© {new Date().getFullYear()} Juan Pablo Linares Laverde</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PRODUCTION-READY · NEXT.JS 16 TURBOPACK</span>
        </div>
      </div>
    </footer>
  );
}
