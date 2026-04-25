'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 80 || !isHomePage);
  });

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    const sections = navItems.map((item) => item.href.split('#')[1]);
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-4 py-2 rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur-lg shadow-[0_0_30px_rgba(0,112,243,0.1)]"
      >
        {navItems.map((item) => {
          const id = item.href.split('#')[1];
          const isActive = isHomePage && activeSection === id;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors duration-300 rounded-full interactive ${
                isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-primary/20 border border-primary/40"
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
        initial={{ y: -100, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-[60] md:hidden w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur-lg text-white interactive"
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
            className="fixed inset-0 z-[55] bg-background flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-bold tracking-tighter text-white hover:text-primary transition-colors uppercase"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Social / Contact bottom */}
            <div className="absolute bottom-12 flex gap-6">
               <a href="mailto:juanpalinare@gmail.com" className="text-gray-500 font-mono text-xs uppercase tracking-widest">Email</a>
               <a href="https://linkedin.com/in/jplinaresdev" target="_blank" className="text-gray-500 font-mono text-xs uppercase tracking-widest">LinkedIn</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
