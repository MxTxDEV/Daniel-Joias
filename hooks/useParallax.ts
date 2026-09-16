'use client';

import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/**
 * Parallax sutil para imagens grandes.
 * `distance` em porcentagem da altura do elemento (padrão: 6%).
 * Desativado automaticamente quando o usuário pede menos movimento.
 */
export function useParallax(distance = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : [`-${distance}%`, `${distance}%`],
  );

  return { ref, y };
}
