'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    // Smooth cursor using RAF
    const loop = () => {
      setPosition((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.12,
        y: prev.y + (targetRef.current.y - prev.y) * 0.12,
      }));
      rafRef.current = requestAnimationFrame(loop);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(loop);

    const addListeners = () => {
      document.querySelectorAll('a, button, .interactive').forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    // Wait for DOM
    const timeout = setTimeout(addListeners, 500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(timeout);
      document.querySelectorAll('a, button, .interactive').forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[200] hidden md:block"
      animate={{
        width: isHovering ? 48 : 28,
        height: isHovering ? 48 : 28,
        x: position.x - (isHovering ? 24 : 14),
        y: position.y - (isHovering ? 24 : 14),
        opacity: isVisible ? 1 : 0,
        backgroundColor: isHovering ? 'rgba(0, 112, 243, 0.9)' : 'rgba(0, 0, 0, 0)',
        borderColor: isHovering ? 'rgba(0, 112, 243, 0.9)' : 'rgba(0, 112, 243, 0.8)',
        mixBlendMode: isHovering ? 'normal' : 'normal',
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.4 }}
      style={{ border: '1.5px solid rgba(0, 112, 243, 0.8)' }}
    />
  );
}
