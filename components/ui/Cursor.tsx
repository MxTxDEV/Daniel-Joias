'use client';

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useHasFinePointer } from '@/hooks/useMediaQuery';

/**
 * Microinteração de cursor (apenas desktop com ponteiro fino).
 *
 * Elementos com `data-cursor="Explorar"` exibem um disco discreto com o
 * rótulo. Nada chamativo: 1 disco, 1 palavra, movimento amortecido.
 * Desativado quando o usuário pede menos movimento.
 */
export function Cursor() {
  const hasFinePointer = useHasFinePointer();
  const reduceMotion = useReducedMotion();
  const enabled = hasFinePointer && !reduceMotion;

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 });

  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const zone = target?.closest<HTMLElement>('[data-cursor]');
      setLabel(zone?.dataset.cursor ?? null);
    };

    const onLeave = () => setLabel(null);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
    >
      <AnimatePresence>
        {label ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none rounded-pill border-hairline border-bone/25 bg-ink/55 px-4 py-3 text-micro uppercase tracking-editorial text-bone backdrop-blur-[2px]"
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
