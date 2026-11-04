'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { playClick, playHover } from '@/utils/audio';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-full border border-surface-border bg-surface-subtle flex items-center justify-center opacity-60 ${className}`}>
        <span className="w-3.5 h-3.5" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => playHover()}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-label="Cambiar tema de color"
      className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 border border-surface-border hover:border-primary/50 bg-surface/80 hover:bg-surface-hover interactive cursor-pointer group text-foreground/80 hover:text-foreground ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun size={14} className="text-primary-light transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon size={14} className="text-primary transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
