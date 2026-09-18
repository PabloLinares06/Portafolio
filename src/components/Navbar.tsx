'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { Menu, X, Search, Volume2, VolumeX, Terminal } from 'lucide-react';
import { playHover, playClick, playSuccess, playOpen, isAudioMuted, setAudioMuted } from '@/utils/audio';

const navItems = [
  { label: 'Inicio', href: '/#hero' },
  { label: 'Trayectoria', href: '/#about' },
  { label: 'Stack', href: '/#experience' },
  { label: 'Proyectos', href: '/#projects' },
  { label: 'Arsenal', href: '/#skills' },
  { label: 'Contacto', href: '/#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const lenis = useLenis();

  useEffect(() => {
    setSoundActive(!isAudioMuted());
  }, []);

  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const next = !soundActive;
    setSoundActive(next);
    setAudioMuted(!next);
    if (next) playSuccess();
  };

  const openCmd = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    playOpen();
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  const openTerminal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    playOpen();
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  // Handle smooth scroll clicks with Lenis
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    playClick();
    const hash = href.includes('#') ? href.split('#')[1] : null;

    if (isHomePage && hash) {
      e.preventDefault();
      const target = document.getElementById(hash);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, {
            offset: hash === 'hero' ? 0 : -25,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(hash);
        window.history.pushState(null, '', `#${hash}`);
      }
      if (isOpen) setIsOpen(false);
    } else {
      if (isOpen) setIsOpen(false);
    }
  };

  // Scroll and active section tracking
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.split('#')[1]);

    const updateScrollAndActiveSection = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (!isHomePage) return;

      if (scrollY < 120) {
        setActiveSection('hero');
        return;
      }

      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      if (scrollY + windowHeight >= fullHeight - 100) {
        setActiveSection('contact');
        return;
      }

      const probeY = scrollY + windowHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (probeY >= top && probeY < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    updateScrollAndActiveSection();
    window.addEventListener('scroll', updateScrollAndActiveSection, { passive: true });
    window.addEventListener('resize', updateScrollAndActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollAndActiveSection);
      window.removeEventListener('resize', updateScrollAndActiveSection);
    };
  }, [isHomePage]);

  // Handle URL hash on initial load or route transition
  useEffect(() => {
    if (isHomePage && typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const target = document.getElementById(hash);
      if (target) {
        const timer = setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(target, { offset: -25, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          setActiveSection(hash);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isHomePage, lenis]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    playClick();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all duration-300 ${
          isScrolled
            ? 'border-white/15 bg-[#05070a]/90 backdrop-blur-xl shadow-[0_0_35px_rgba(0,242,254,0.18)]'
            : 'border-white/10 bg-[#05070a]/75 backdrop-blur-lg shadow-[0_0_20px_rgba(0,242,254,0.08)]'
        }`}
      >
        {/* Navigation items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const id = item.href.split('#')[1];
            const isActive = isHomePage && activeSection === id;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={() => playHover()}
                className={`relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors duration-300 rounded-full interactive ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary/20 border border-primary/40 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Vertical divider */}
        <div className="w-[1px] h-4 bg-white/10 mx-1.5" />

        {/* Command Palette Trigger */}
        <button
          onClick={openCmd}
          onMouseEnter={() => playHover()}
          title="Abrir Command Palette (Ctrl+K)"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-mono border border-white/10 hover:border-primary/40 interactive cursor-pointer"
        >
          <Search size={12} className="text-primary" />
          <span className="text-[10px] text-gray-400">⌘K</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          onMouseEnter={() => playHover()}
          title={soundActive ? 'Silenciar efectos de audio' : 'Activar sonido háptico'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all text-xs font-mono border interactive cursor-pointer ${
            soundActive 
              ? 'text-cyan-300 border-primary/30 bg-primary/10 hover:bg-primary/20' 
              : 'text-gray-500 border-white/10 hover:text-gray-300 hover:bg-white/5'
          }`}
        >
          {soundActive ? (
            <>
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-2 bg-primary animate-pulse" />
                <span className="w-0.5 h-3 bg-primary animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-primary animate-pulse delay-150" />
              </div>
              <Volume2 size={12} />
            </>
          ) : (
            <VolumeX size={12} />
          )}
        </button>
      </motion.nav>

      {/* Medium screens compact navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-6 left-6 z-50 hidden md:flex lg:hidden items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
          isScrolled
            ? 'border-white/15 bg-[#05070a]/90 backdrop-blur-xl shadow-[0_0_25px_rgba(0,242,254,0.18)]'
            : 'border-white/10 bg-[#05070a]/75 backdrop-blur-lg shadow-[0_0_15px_rgba(0,242,254,0.08)]'
        }`}
      >
        <button
          onClick={openCmd}
          className="flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-white"
        >
          <Search size={14} className="text-primary" />
          <span>Comandos</span>
          <span className="text-[10px] bg-white/10 px-1 rounded text-gray-400">⌘K</span>
        </button>
        <button
          onClick={toggleSound}
          className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/5"
        >
          {soundActive ? <Volume2 size={14} className="text-primary" /> : <VolumeX size={14} />}
        </button>
      </motion.nav>

      {/* Mobile Navbar Trigger */}
      <motion.button
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className={`fixed top-6 right-6 z-[60] lg:hidden w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 text-white interactive cursor-pointer ${
          isScrolled
            ? 'border-white/15 bg-[#05070a]/90 backdrop-blur-xl shadow-[0_0_25px_rgba(0,242,254,0.18)]'
            : 'border-white/10 bg-[#05070a]/75 backdrop-blur-lg shadow-[0_0_15px_rgba(0,242,254,0.08)]'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X key="close" size={20} /> : <Menu key="menu" size={20} />}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-[#05070a]/98 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
          >
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, index) => {
                const id = item.href.split('#')[1];
                const isActive = isHomePage && activeSection === id;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-2xl sm:text-3xl font-bold tracking-tighter transition-colors uppercase ${
                        isActive ? 'text-primary' : 'text-white hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Actions Bar */}
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openCmd();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-white text-xs font-mono"
              >
                <Search size={14} className="text-primary" />
                <span>Buscar (⌘K)</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  openTerminal();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white text-xs font-mono"
              >
                <Terminal size={14} className="text-cyan-300" />
                <span>Consola</span>
              </button>

              <button
                onClick={toggleSound}
                className="p-2 rounded-full border border-white/15 bg-white/5 text-white text-xs font-mono"
              >
                {soundActive ? <Volume2 size={16} className="text-primary" /> : <VolumeX size={16} />}
              </button>
            </div>

            {/* Social / Contact bottom */}
            <div className="absolute bottom-10 flex gap-8">
              <a
                href="mailto:juan.linares682@pascualbravo.edu.co"
                className="text-gray-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
              >
                Email
              </a>
              <a
                href="https://github.com/PabloLinares06"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
