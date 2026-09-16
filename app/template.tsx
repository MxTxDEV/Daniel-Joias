'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Transição entre páginas: fade curto e preciso, para que a navegação pareça
 * uma experiência contínua. Não anima layout — apenas opacidade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
