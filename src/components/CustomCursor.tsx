'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const followerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Position inner dot immediately with zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Responsive, silky-smooth follower loop
    const loop = () => {
      // 0.22 gives a fluid yet immediate response that never drifts or lags far behind
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.22;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.22;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    // Event delegation for all interactive elements (links, buttons, clickable items)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, .interactive, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer Follower Ball / Ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[200] hidden md:block transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out ${
          isHovering
            ? 'w-14 h-14 bg-primary/15 border border-primary/60 shadow-[0_0_25px_rgba(0,112,243,0.35)]'
            : 'w-7 h-7 bg-transparent border-[1.5px] border-primary/80 shadow-[0_0_12px_rgba(0,112,243,0.2)]'
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: 'transform',
        }}
      />

      {/* Center Hotspot Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[201] hidden md:block transition-all duration-150 ${
          isHovering ? 'w-2 h-2 bg-primary-light shadow-[0_0_8px_#60a5fa]' : 'w-1.5 h-1.5 bg-primary'
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}
