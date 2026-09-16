'use client';

import Link from 'next/link';
import { Figure } from '@/components/ui/Figure';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';
import type { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
  sizes?: string;
  /** Proporção — permite composições assimétricas na home. */
  aspect?: 'portrait' | 'editorial' | 'wide';
  className?: string;
}

/**
 * Categoria em fotografia grande. No hover: zoom de 3%, overlay escuro muito
 * sutil e seta minimalista.
 */
export function CollectionCard({
  collection,
  sizes = '(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 92vw',
  aspect = 'portrait',
  className,
}: CollectionCardProps) {
  return (
    <Link
      href={`/colecoes/${collection.slug}`}
      data-cursor="Explorar"
      className={cn('group relative block overflow-hidden', className)}
    >
      <Figure
        image={collection.image}
        aspect={aspect}
        sizes={sizes}
        /* O card aparece sobre superfície escura, independente do tema da
           própria coleção. */
        tone="dark"
        imageClassName="transition-transform duration-1200 ease-silk group-hover:scale-[1.03]"
      />

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-ink/10 opacity-0 transition-opacity duration-900 ease-silk group-hover:opacity-100"
      />

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,rgba(8,8,8,0)_0%,rgba(8,8,8,0.7)_100%)]"
      />

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
        <span className="flex flex-col gap-2.5">
          <span className="eyebrow text-gold/90">{collection.eyebrow}</span>
          <span className="font-display text-display-xs font-light text-bone md:text-display-sm">
            {collection.title}
          </span>
        </span>

        <span className="mb-2 shrink-0 translate-x-[-6px] text-bone/70 opacity-0 transition-all duration-600 ease-silk group-hover:translate-x-0 group-hover:text-gold group-hover:opacity-100">
          <ArrowRightIcon size={22} />
        </span>
      </span>
    </Link>
  );
}
