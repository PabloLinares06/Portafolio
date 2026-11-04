'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    
    const mouseViewport = { x: -1000, y: -1000 };
    const mouse = { x: -1000, y: -1000 };

    const updateMouseCanvasPosition = () => {
      if (mouseViewport.x < 0 || mouseViewport.y < 0) {
        mouse.x = -1000;
        mouse.y = -1000;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      if (
        mouseViewport.x < rect.left ||
        mouseViewport.x > rect.right ||
        mouseViewport.y < rect.top ||
        mouseViewport.y > rect.bottom
      ) {
        mouse.x = -1000;
        mouse.y = -1000;
      } else {
        mouse.x = (mouseViewport.x - rect.left) * (canvas.width / rect.width);
        mouse.y = (mouseViewport.y - rect.top) * (canvas.height / rect.height);
      }
    };

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    const isDark = resolvedTheme === 'dark';

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.round(rect.width || window.innerWidth);
      const height = Math.round(rect.height || window.innerHeight);

      if (canvas.width === width && canvas.height === height && particles.length > 0) {
        return;
      }

      canvas.width = width;
      canvas.height = height;
      initParticles();
      updateMouseCanvasPosition();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseViewport.x = e.clientX;
      mouseViewport.y = e.clientY;
      updateMouseCanvasPosition();
    };

    const handleMouseLeave = () => {
      mouseViewport.x = -1000;
      mouseViewport.y = -1000;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', updateMouseCanvasPosition, { passive: true });

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.body.addEventListener('mouseleave', handleMouseLeave);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.size = Math.random() * 1.8 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Architectural Sober Mint dots
        ctx.fillStyle = isDark
          ? 'rgba(52, 211, 153, 0.45)'
          : 'rgba(13, 148, 136, 0.4)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Balanced density: fewer, more restrained nodes (anti-slop)
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 22000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas));
      }
    };

    const drawLines = () => {
      if (!ctx) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            ctx.beginPath();
            const alpha = (1 - distance / 130) * (isDark ? 0.12 : 0.08);
            ctx.strokeStyle = isDark
              ? `rgba(52, 211, 153, ${alpha})`
              : `rgba(13, 148, 136, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Subtle interactive proximity to cursor
        if (mouse.x > -500 && mouse.y > -500) {
          const dxMouse = particles[i].x - mouse.x;
          const dyMouse = particles[i].y - mouse.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distanceMouse < 180) {
            const force = (1 - distanceMouse / 180) * 0.02;
            particles[i].vx += (dxMouse / distanceMouse) * force;
            particles[i].vy += (dyMouse / distanceMouse) * force;

            ctx.beginPath();
            const mouseAlpha = (1 - distanceMouse / 180) * (isDark ? 0.22 : 0.15);
            ctx.strokeStyle = isDark
              ? `rgba(52, 211, 153, ${mouseAlpha})`
              : `rgba(13, 148, 136, ${mouseAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateMouseCanvasPosition);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.body.removeEventListener('mouseleave', handleMouseLeave);
      }
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-70 transition-opacity duration-700"
      />
      {/* Architectural subtle ambient background gradient: calm sober mint vignette */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-primary/[0.04] dark:bg-primary/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
