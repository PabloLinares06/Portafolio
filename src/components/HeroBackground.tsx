'use client';

import { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    
    // Track mouse in viewport coordinates and map to canvas coordinates
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
      color: string;
      glow: string;
      canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.size = Math.random() * 2.5 + 1;

        const isPrimary = Math.random() > 0.3;
        this.color = isPrimary ? 'rgba(0, 112, 243, 1)' : 'rgba(168, 85, 247, 1)';
        this.glow = isPrimary ? 'rgba(0, 112, 243, 0.5)' : 'rgba(168, 85, 247, 0.5)';
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
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas));
      }
    };

    const drawLines = () => {
      if (!ctx) return;

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 112, 243, ${0.25 - distance / 600})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect and attract to cursor if inside hero bounds
        if (mouse.x > -500 && mouse.y > -500) {
          const dxMouse = particles[i].x - mouse.x;
          const dyMouse = particles[i].y - mouse.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distanceMouse < 300) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 112, 243, ${Math.max(0, 0.8 - distanceMouse / 375)})`;
            ctx.lineWidth = 1.4;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Attract towards the ball's center, leaving a clean compact halo around the cursor
            if (distanceMouse > 25) {
              particles[i].x -= dxMouse * 0.01;
              particles[i].y -= dyMouse * 0.01;
            }
          }
        }
      }
    };

    const animate = () => {
      updateMouseCanvasPosition();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'screen';

      drawLines();
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateMouseCanvasPosition);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      <div className="absolute inset-0 bg-[#050505] [mask-image:radial-gradient(ellipse_70%_70%_at_center,transparent_0%,black_100%)] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
    </div>
  );
}
