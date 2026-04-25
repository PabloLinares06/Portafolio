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
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

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
        this.vx = (Math.random() - 0.5) * 0.7; // Ligeramente más rápidos
        this.vy = (Math.random() - 0.5) * 0.7;
        this.size = Math.random() * 2.5 + 1; // Un poco más grandes
        
        // Colores mucho más vibrantes y opacos
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
      // Volvemos a una densidad más óptima para rendimiento (14000)
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 14000);
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

          if (distance < 150) { // Distancia de conexión mayor
            ctx.beginPath();
            // Líneas base más visibles
            ctx.strokeStyle = `rgba(0, 112, 243, ${0.25 - distance / 600})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < 300) { // Mayor radio de interacción con el cursor
          ctx.beginPath();
          // Rayos magnéticos mucho más brillantes
          ctx.strokeStyle = `rgba(0, 112, 243, ${0.8 - distanceMouse / 375})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          
          if (distanceMouse > 80) {
            particles[i].x -= dxMouse * 0.008; // Atracción más fuerte
            particles[i].y -= dyMouse * 0.008;
          }
        }
      }
    };

    const animate = () => {
      // Limpiamos el frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Habilitamos Additive Blending para que los colores se sumen y brillen
      ctx.globalCompositeOperation = 'screen';
      
      drawLines(); // Dibujamos líneas primero para que queden por debajo
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      ctx.globalCompositeOperation = 'source-over'; // Reset
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
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
