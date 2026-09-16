'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';
import type { Product } from '@/types';

/**
 * Detalhes da peça em acordeão.
 * As informações vêm de `product.details` — basta popular o catálogo para que
 * peso, acabamento e medidas apareçam aqui.
 */
export function ProductDetails({ product }: { product: Product }) {
  const sections = [
    {
      title: 'Detalhes',
      content: (
        <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
          {product.details.map((detail) => (
            <div key={detail.label} className="flex flex-col gap-1.5">
              <dt className="text-micro uppercase tracking-editorial text-bone/55">
                {detail.label}
              </dt>
              <dd className="text-body-sm font-light text-bone/75">{detail.value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      title: 'Cuidados com a peça',
      content: (
        <p className="max-w-prose text-body-sm font-light text-bone/70">
          Guarde a peça isolada, seca e fora do contato com perfumes e produtos de limpeza. A
          orientação completa de cuidado será publicada junto ao catálogo oficial.
        </p>
      ),
    },
    {
      title: 'Entrega e atendimento',
      content: (
        <p className="max-w-prose text-body-sm font-light text-bone/70">
          Prazos, formas de envio e condições de pagamento são confirmados no atendimento por
          WhatsApp. Informação a ser fornecida pela Daniel Joias.
        </p>
      ),
    },
  ];

  const [open, setOpen] = useState<string | null>(sections[0]?.title ?? null);

  return (
    <div className="flex flex-col">
      {sections.map((section) => {
        const expanded = open === section.title;

        return (
          <div key={section.title} className="border-b-hairline border-bone/10">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : section.title)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    'font-display text-display-xs font-light transition-colors duration-400',
                    expanded ? 'text-bone' : 'text-bone/70',
                  )}
                >
                  {section.title}
                </span>
                <ChevronIcon
                  className={cn(
                    'shrink-0 transition-transform duration-600 ease-silk',
                    expanded ? 'rotate-90 text-gold' : 'text-bone/55',
                  )}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8">{section.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
