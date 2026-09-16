'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsappIcon } from '@/components/ui/Icons';
import { whatsappLink } from '@/lib/whatsapp';

/**
 * Atendimento por WhatsApp — botão discreto, ancorado no canto inferior.
 * Aparece somente após o hero, para não competir com a fotografia de abertura.
 */
export function WhatsappButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-4 z-40 inline-flex items-center gap-3 border-hairline border-bone/20 bg-ink/85 px-4 py-3 text-micro uppercase tracking-editorial text-bone/70 backdrop-blur-md transition-colors duration-600 ease-silk hover:border-gold/60 hover:text-gold md:bottom-8 md:right-8"
        >
          <WhatsappIcon size={15} />
          <span className="hidden sm:inline">Falar com especialista</span>
          <span className="sr-only sm:hidden">Falar com especialista</span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
