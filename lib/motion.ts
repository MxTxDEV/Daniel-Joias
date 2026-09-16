import type { Transition, Variants } from 'framer-motion';

/**
 * Tokens de motion.
 *
 * Regra do projeto: movimento lento, preciso e discreto. Apenas `opacity`,
 * `transform` e `clip-path` são animados — nunca propriedades que causam
 * layout. Durações entre 400ms e 1200ms.
 */
export const easing = {
  silk: [0.22, 1, 0.36, 1],
  editorial: [0.16, 1, 0.3, 1],
  precise: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  instant: 0.16,
  quick: 0.26,
  base: 0.4,
  slow: 0.6,
  slower: 0.9,
  cinematic: 1.2,
} as const;

export const transition = {
  silk: { duration: duration.slow, ease: easing.silk } satisfies Transition,
  editorial: { duration: duration.slower, ease: easing.editorial } satisfies Transition,
  cinematic: { duration: duration.cinematic, ease: easing.editorial } satisfies Transition,
  quick: { duration: duration.quick, ease: easing.silk } satisfies Transition,
};

/** Fade + translate vertical — o reveal padrão do site. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.editorial,
  },
};

/** Cortina em clip-path, usada em imagens grandes. */
export const revealClip: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(14% 0% 0% 0%)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: duration.cinematic, ease: easing.editorial },
  },
};

/** Linha dourada que se desenha da esquerda para a direita. */
export const hairline: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: duration.cinematic, ease: easing.editorial },
  },
};

/** Viewport padrão dos reveals: dispara uma vez, um pouco antes de entrar. */
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;
