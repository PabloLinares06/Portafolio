'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Inicio', href: '/#hero' },
  { label: 'Trayectoria', href: '/#about' },
  { label: 'Stack', href: '/#experience' },
  { label: 'Proyectos', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contacto', href: '/#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const lenis = useLenis();

  // Handle smooth scroll clicks with Lenis
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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

      // Check section crossing scanline (35% down viewport)
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

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-4 py-2 rounded-full border transition-all duration-300 ${
          isScrolled
            ? 'border-white/15 bg-[#050505]/90 backdrop-blur-xl shadow-[0_0_35px_rgba(0,112,243,0.18)]'
            : 'border-white/10 bg-[#050505]/75 backdrop-blur-lg shadow-[0_0_20px_rgba(0,112,243,0.08)]'
        }`}
      >
        {navItems.map((item) => {
          const id = item.href.split('#')[1];
          const isActive = isHomePage && activeSection === id;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors duration-300 rounded-full interactive ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-primary/20 border border-primary/40 shadow-[0_0_15px_rgba(0,112,243,0.3)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </motion.nav>

      {/* Mobile Navbar Trigger */}
      <motion.button
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className={`fixed top-6 right-6 z-[60] md:hidden w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 text-white interactive ${
          isScrolled
            ? 'border-white/15 bg-[#050505]/90 backdrop-blur-xl shadow-[0_0_25px_rgba(0,112,243,0.18)]'
            : 'border-white/10 bg-[#050505]/75 backdrop-blur-lg shadow-[0_0_15px_rgba(0,112,243,0.08)]'
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
            className="fixed inset-0 z-[55] bg-[#050505]/98 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-7">
              {navItems.map((item, index) => {
                const id = item.href.split('#')[1];
                const isActive = isHomePage && activeSection === id;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-3xl sm:text-4xl font-bold tracking-tighter transition-colors uppercase ${
                        isActive ? 'text-primary' : 'text-white hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Social / Contact bottom */}
            <div className="absolute bottom-12 flex gap-8">
              <a
                href="mailto:juanpalinare@gmail.com"
                className="text-gray-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
              >
                Email
              </a>
              <a
                href="https://linkedin.com/in/jplinaresdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

