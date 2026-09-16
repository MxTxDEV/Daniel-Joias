'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useParallax } from '@/hooks/useParallax';
import { cn } from '@/lib/cn';

interface ParallaxProps {
  children: ReactNode;
  /** Deslocamento em % da altura do elemento (o bleed acompanha). */
  distance?: number;
  className?: string;
}

/**
 * Parallax sutil para imagens grandes.
 * O conteúdo interno é estendido acima e abaixo do container, de modo que o
 * deslocamento nunca revele as bordas da fotografia.
 */
export function Parallax({ children, distance = 6, className }: ParallaxProps) {
  const { ref, y } = useParallax(distance);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={{ y, top: `-${distance}%`, height: `${100 + distance * 2}%` }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
