'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { DiamondGlyph } from '@/components/ui/Icons';
import { testimonials } from '@/data/testimonials';
import { cn } from '@/lib/cn';

/**
 * Depoimentos — navegação discreta, sem cards e sem estrelas.
 * Os textos são placeholders até que a Daniel Joias forneça depoimentos reais
 * (ver `data/testimonials.ts`).
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  if (!current) return null;

  return (
    <section
      aria-label="Depoimentos de clientes"
      className="border-y-hairline border-bone/10 bg-ink-800 py-section-sm md:py-section"
    >
      <div className="shell max-w-content flex flex-col items-center text-center">
        <DiamondGlyph className="text-gold/85" />

        <div className="mt-12 min-h-[11rem] w-full sm:min-h-[9rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mx-auto max-w-[44ch] font-display text-display-xs font-light italic leading-snug text-bone/85 md:text-display-sm">
                “{current.quote}”
              </p>
              <footer className="mt-10 flex flex-col items-center gap-2">
                <cite className="text-micro uppercase not-italic tracking-editorial text-bone/60">
                  — {current.author}
                </cite>
                {current.context ? (
                  <span className="text-[0.625rem] uppercase tracking-editorial text-bone/50">
                    {current.context}
                  </span>
                ) : null}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {testimonials.length > 1 ? (
          <div className="mt-12 flex items-center gap-4">
            {testimonials.map((testimonial, position) => (
              <button
                key={`${testimonial.author}-${position}`}
                type="button"
                onClick={() => setIndex(position)}
                aria-label={`Ver depoimento ${position + 1}`}
                aria-current={position === index}
                className="p-2"
              >
                <span
                  className={cn(
                    'block h-[0.5px] w-8 transition-colors duration-600 ease-silk',
                    position === index ? 'bg-gold' : 'bg-bone/20 hover:bg-bone/40',
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}

        {current.isPlaceholder ? (
          <p className="mt-10 max-w-measure text-[0.625rem] uppercase tracking-editorial text-bone/50">
            Espaço reservado — depoimentos reais serão publicados quando fornecidos.
          </p>
        ) : null}
      </div>
    </section>
  );
}
