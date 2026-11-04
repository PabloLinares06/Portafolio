'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { Menu, X, Search, Volume2, VolumeX, Terminal, ArrowLeft } from 'lucide-react';
import { playHover, playClick, playSuccess, playOpen, isAudioMuted, setAudioMuted } from '@/utils/audio';
import ThemeToggle from '@/components/ThemeToggle';

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) playOpen();
    else playClick();
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

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', updateScrollAndActiveSection, { passive: true });
    updateScrollAndActiveSection();

    return () => window.removeEventListener('scroll', updateScrollAndActiveSection);
  }, [isHomePage]);

  return (
    <>
      {/* Top Left Brand Signature */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-6 left-6 z-50 hidden lg:block"
      >
        <Link
          href={isHomePage ? '/#hero' : '/#projects'}
          onClick={(e) => (isHomePage ? handleNavClick(e, '/#hero') : playClick())}
          className="flex items-center gap-3 px-3.5 py-2 rounded-full border border-surface-border bg-surface/80 backdrop-blur-xl hover:border-primary/40 transition-all duration-300 interactive shadow-sm group"
        >
          {isHomePage ? (
            <>
              <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center font-mono font-bold text-xs text-primary group-hover:scale-105 transition-transform">
                PL
              </div>
              <span className="font-mono text-xs tracking-wider uppercase text-foreground/80 group-hover:text-foreground font-semibold">
                PABLO LINARES
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </>
          ) : (
            <>
              <ArrowLeft size={14} className="text-primary group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-mono text-xs tracking-wider uppercase text-foreground/80 group-hover:text-foreground font-semibold">
                VOLVER AL PORTAFOLIO
              </span>
            </>
          )}
        </Link>
      </motion.div>

      {/* Desktop Centered Floating Island */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all duration-300 ${
          isScrolled
            ? 'border-surface-border-strong bg-surface/90 backdrop-blur-xl shadow-lg'
            : 'border-surface-border bg-surface/75 backdrop-blur-lg shadow-sm'
        }`}
      >
        {/* Navigation items */}
        {isHomePage ? (
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
                  className={`relative px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors duration-200 rounded-full interactive ${
                    isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary-subtle border border-primary-border shadow-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs font-mono">
            <Link
              href="/#projects"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 uppercase tracking-wider text-primary hover:text-primary-hover font-semibold interactive rounded-full hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Portafolio</span>
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <a
              href="#resumen"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="px-3 py-1.5 uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors rounded-full interactive"
            >
              Resumen
            </a>
            <a
              href="#metricas"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="px-3 py-1.5 uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors rounded-full interactive"
            >
              Métricas
            </a>
            <a
              href="#arquitectura"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="px-3 py-1.5 uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors rounded-full interactive"
            >
              Arquitectura
            </a>
            <a
              href="#galeria"
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="px-3 py-1.5 uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors rounded-full interactive"
            >
              Galería
            </a>
          </div>
        )}

        {/* Vertical divider */}
        <div className="w-[1px] h-4 bg-surface-border-strong mx-1.5" />

        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Command Palette Trigger */}
        <button
          onClick={openCmd}
          onMouseEnter={() => playHover()}
          title="Abrir Command Palette (Ctrl+K)"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all text-xs font-mono border border-surface-border hover:border-primary/40 interactive cursor-pointer"
        >
          <Search size={12} className="text-primary" />
          <span className="text-[10px] text-muted">⌘K</span>
        </button>

        {/* Shortcuts Modal Trigger */}
        <button
          onClick={() => {
            playOpen();
            window.dispatchEvent(new CustomEvent('open-shortcuts'));
          }}
          onMouseEnter={() => playHover()}
          title="Ver Atajos de Teclado (?)"
          className="flex items-center justify-center w-7 h-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all text-xs font-mono border border-surface-border hover:border-primary/40 interactive cursor-pointer font-bold"
        >
          ?
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          onMouseEnter={() => playHover()}
          title={soundActive ? 'Silenciar efectos de audio' : 'Activar sonido háptico'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all text-xs font-mono border interactive cursor-pointer ${
            soundActive 
              ? 'text-primary border-primary-border bg-primary-subtle hover:bg-primary-subtle/80' 
              : 'text-muted border-surface-border hover:text-foreground hover:bg-surface-hover'
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
            ? 'border-surface-border-strong bg-surface/90 backdrop-blur-xl shadow-md'
            : 'border-surface-border bg-surface/80 backdrop-blur-lg shadow-sm'
        }`}
      >
        {!isHomePage && (
          <Link
            href="/#projects"
            onClick={() => playClick()}
            className="flex items-center gap-1.5 text-xs font-mono text-primary hover:text-primary-hover font-semibold mr-1 pr-2 border-r border-surface-border"
          >
            <ArrowLeft size={13} />
            <span>Portafolio</span>
          </Link>
        )}

        <button
          onClick={openCmd}
          className="flex items-center gap-2 text-xs font-mono text-foreground/80 hover:text-foreground"
        >
          <Search size={14} className="text-primary" />
          <span>Comandos</span>
          <span className="text-[10px] bg-surface-subtle border border-surface-border px-1.5 py-0.5 rounded text-muted-foreground">⌘K</span>
        </button>

        <ThemeToggle />

        <button
          onClick={toggleSound}
          className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-surface-hover"
          title="Sonido"
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
        aria-label="Alternar menú"
        className={`fixed top-6 right-6 z-[60] lg:hidden w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-300 text-foreground interactive cursor-pointer ${
          isScrolled
            ? 'border-surface-border-strong bg-surface/90 backdrop-blur-xl shadow-md'
            : 'border-surface-border bg-surface/80 backdrop-blur-lg shadow-sm'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X key="close" size={18} /> : <Menu key="menu" size={18} />}
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
            className="fixed inset-0 z-[55] bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
          >
            <div className="flex flex-col items-center gap-6">
              {!isHomePage && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2"
                >
                  <Link
                    href="/#projects"
                    onClick={() => {
                      playClick();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-wider font-bold shadow-sm"
                  >
                    <ArrowLeft size={14} />
                    <span>Volver al Portafolio</span>
                  </Link>
                </motion.div>
              )}
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
                      className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors uppercase ${
                        isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Actions Bar */}
            <div className="mt-10 flex items-center gap-3">
              <ThemeToggle />

              <button
                onClick={() => {
                  setIsOpen(false);
                  openCmd();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary-border bg-primary-subtle text-foreground text-xs font-mono"
              >
                <Search size={14} className="text-primary" />
                <span>Buscar (⌘K)</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  openTerminal();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-surface-border bg-surface text-foreground text-xs font-mono"
              >
                <Terminal size={14} className="text-primary" />
                <span>Consola</span>
              </button>

              <button
                onClick={toggleSound}
                className="p-2 rounded-full border border-surface-border bg-surface text-foreground text-xs font-mono"
                title="Sonido"
              >
                {soundActive ? <Volume2 size={16} className="text-primary" /> : <VolumeX size={16} />}
              </button>
            </div>

            {/* Social / Contact bottom */}
            <div className="absolute bottom-10 flex gap-8">
              <a
                href="mailto:juanpalinare@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors font-mono text-xs uppercase tracking-widest"
              >
                Email
              </a>
              <a
                href="https://github.com/PabloLinares06"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors font-mono text-xs uppercase tracking-widest"
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
