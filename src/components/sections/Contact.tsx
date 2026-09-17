'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('juanpalinare@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center border-t border-white/5 bg-[#050505] relative overflow-hidden"
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
          className="text-primary font-mono text-sm uppercase tracking-[0.3em] mb-6"
        >
          05. Contacto
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 text-white group cursor-default"
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
          Disponible para proyectos freelance, roles de ingeniería y retos de alto impacto. Conectemos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          {/* Main Mailto CTA */}
          <a
            href="mailto:juanpalinare@gmail.com"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-600 transition-all shadow-[0_0_30px_rgba(0,112,243,0.3)] interactive group text-sm md:text-base"
          >
            <Mail size={18} />
            <span>Enviar Correo</span>
          </a>

          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-primary/50 text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all interactive relative"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-400" />
                <span className="text-emerald-400 font-bold">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={16} className="text-gray-400" />
                <span>juanpalinare@gmail.com</span>
              </>
            )}
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <a
              href="https://linkedin.com/in/jplinaresdev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-4 border border-white/10 rounded-full hover:bg-white/5 hover:border-white/20 transition-all interactive font-bold text-xs uppercase tracking-widest text-gray-300"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a
              href="https://github.com/PabloLinares06"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-4 border border-white/10 rounded-full hover:bg-white/5 hover:border-white/20 transition-all interactive font-bold text-xs uppercase tracking-widest text-gray-300"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 w-full text-center px-4">
        <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Juan Pablo Linares · Arquitectura, Código & Diseño
        </p>
      </div>
    </footer>
  );
}
