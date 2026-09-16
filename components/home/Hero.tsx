'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Figure } from '@/components/ui/Figure';
import { Button } from '@/components/ui/Button';
import { ScrollCue } from '@/components/ui/ScrollCue';
import { duration, easing } from '@/lib/motion';
import type { ImageRef } from '@/types';

/**
 * Fotografia crítica do site (LCP).
 * Substituir pelo shot oficial em `public/images/hero/principal.(avif|webp|jpg)`.
 */
const heroImage: ImageRef = {
  slot: 'hero/principal',
  alt: 'Anel em ouro 18K fotografado em macro sobre fundo preto, com reflexos naturais do metal',
  brief:
    'Anel em ouro 18K — macro, fundo preto sofisticado, iluminação de estúdio, reflexos naturais, profundidade de campo curta',
  aspect: 'cinema',
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { delayChildren: 0.25, staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.slower, ease: easing.editorial } },
  };

  return (
    <section
      aria-label="Daniel Joias — o luxo está nos detalhes"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Fotografia */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, scale: 1.06 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: easing.editorial }}
        className="absolute inset-0"
      >
        <Figure
          image={heroImage}
          sizes="100vw"
          priority
          fillParent
          placeholder="quiet"
          className="h-full w-full"
          imageClassName="object-cover object-center"
        />
      </motion.div>

      {/* Vinheta: mantém o contraste do texto sobre a fotografia. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.62)_0%,rgba(8,8,8,0.18)_38%,rgba(8,8,8,0.72)_100%)]"
      />

      <motion.div
        variants={container}
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : 'visible'}
        className="relative z-10 flex flex-col items-center px-gutter pb-24 pt-[calc(var(--header-height)+5rem)] text-center md:pb-28 lg:pb-32"
      >
        <motion.p variants={item} className="eyebrow text-gold">
          Daniel Joias
        </motion.p>

        <motion.span
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 1.2, ease: easing.editorial } },
          }}
          aria-hidden="true"
          className="mt-8 block h-[0.5px] w-16 bg-gold/70"
        />

        {/* Contraste tipográfico: serifada fina + sans em caixa alta. */}
        <motion.h1
          variants={item}
          className="mt-10 max-w-[18ch] font-display text-display-md font-light leading-[1.02] text-bone md:text-display-lg xl:text-display-xl"
        >
          O luxo está
          <span className="block italic text-bone/90">nos detalhes.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-9 max-w-measure text-body-sm font-light leading-relaxed text-bone/65 md:text-body"
        >
          Ouro e prata escolhidos para marcar momentos que permanecem.
        </motion.p>

        <motion.div variants={item} className="mt-12">
          <Button href="/colecoes" variant="outline" size="lg" withArrow>
            Explorar coleção
          </Button>
        </motion.div>

        <motion.div variants={item} className="mt-16 hidden md:block">
          <ScrollCue />
        </motion.div>
      </motion.div>
    </section>
  );
}
