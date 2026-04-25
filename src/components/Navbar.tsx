'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 80 || !isHomePage);
  });

  useEffect(() => {
    // Force visibility on subpages
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

  const handleNavClick = (id: string) => {
    if (isHomePage) {
      setActiveSection(id);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-4 py-2 rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur-lg shadow-[0_0_30px_rgba(0,112,243,0.1)]"
    >
      {navItems.map((item) => {
        const id = item.href.split('#')[1];
        const isActive = isHomePage && activeSection === id;
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => handleNavClick(id)}
            className={`relative px-4 py-2 text-[10px] md:text-xs font-mono uppercase tracking-widest transition-colors duration-300 rounded-full interactive ${
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
  );
}
