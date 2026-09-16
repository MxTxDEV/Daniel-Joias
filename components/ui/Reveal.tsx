'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { fadeUp, hairline, revealClip, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';

type RevealVariant = 'fade-up' | 'clip' | 'hairline';

const variants: Record<RevealVariant, Variants> = {
  'fade-up': fadeUp,
  clip: revealClip,
  hairline,
};

interface RevealProps {
  children?: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: ElementType;
  /** Anima junto do elemento pai (usado com `Stagger`). */
  asChild?: boolean;
}

/**
 * Reveal de scroll. Anima apenas opacity / transform / clip-path e respeita
 * `prefers-reduced-motion` (nesse caso o conteúdo já entra visível).
 */
export function Reveal({
  children,
  variant = 'fade-up',
  delay = 0,
  className,
  as = 'div',
  asChild = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  if (asChild) {
    return (
      <MotionTag variants={variants[variant]} className={cn('will-reveal', className)}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants[variant]}
      transition={{ delay }}
      className={cn('will-reveal', className)}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  as?: ElementType;
}

/** Container que encadeia os `Reveal asChild` internos. */
export function Stagger({
  children,
  className,
  delayChildren = 0.08,
  staggerChildren = 0.09,
  as = 'div',
}: StaggerProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{ hidden: {}, visible: { transition: { delayChildren, staggerChildren } } }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
