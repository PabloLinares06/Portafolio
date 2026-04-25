'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <footer
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center border-t border-white/5 bg-[#050505] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-primary/8 to-transparent pointer-events-none" />

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
          className="text-gray-500 text-lg mb-16 max-w-md mx-auto"
        >
          Abierto a oportunidades, freelance y colaboraciones. Conectemos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-6 items-center justify-center"
        >
          <a
            href="mailto:juanpalinare@gmail.com"
            className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-600 transition-colors shadow-[0_0_30px_var(--primary-glow)] interactive group"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            juanpalinare@gmail.com
          </a>

          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/jplinaresdev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 border border-white/10 rounded-full hover:bg-white/5 transition-all interactive font-bold text-sm uppercase tracking-widest text-gray-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" /></svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/PabloLinares06"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 border border-white/10 rounded-full hover:bg-white/5 transition-all interactive font-bold text-sm uppercase tracking-widest text-gray-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 w-full text-center">
        <p className="text-gray-700 font-mono text-xs uppercase tracking-[0.5em]">
          © 2026 Juan Pablo Linares · Construido con Lógica y Pasión
        </p>
      </div>
    </footer>
  );
}
