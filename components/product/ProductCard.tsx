'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Figure } from '@/components/ui/Figure';
import { WishlistButton } from '@/components/product/WishlistButton';
import { formatPrice } from '@/lib/format';
import { useShop } from '@/lib/shop/ShopContext';
import { cn } from '@/lib/cn';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  /** `sizes` do next/image conforme a coluna onde o card é usado. */
  sizes?: string;
  priority?: boolean;
  tone?: 'dark' | 'light';
}

/**
 * Peça exposta como em uma galeria: sem card, sem sombra, sem preenchimento.
 * No hover a fotografia secundária entra em fade, a imagem aproxima 3% e
 * surgem as ações.
 */
export function ProductCard({
  product,
  sizes = '(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 50vw',
  priority = false,
  tone = 'dark',
}: ProductCardProps) {
  const { addToCart } = useShop();
  const [hovered, setHovered] = useState(false);
  const dark = tone === 'dark';
  const secondary = product.images[1];

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col"
    >
      <Link
        href={`/produto/${product.slug}`}
        data-cursor="Ver peça"
        className="relative block overflow-hidden"
        aria-label={`${product.name} — ${product.material}`}
      >
        <Figure
          image={product.images[0]}
          aspect="editorial"
          sizes={sizes}
          priority={priority}
          tone={tone}
          imageClassName={cn(
            'transition-transform duration-1200 ease-silk',
            hovered && secondary ? 'scale-[1.03] opacity-0' : 'group-hover:scale-[1.03]',
          )}
        />

        {secondary ? (
          <span
            className={cn(
              'pointer-events-none absolute inset-0 transition-opacity duration-900 ease-silk',
              hovered ? 'opacity-100' : 'opacity-0',
            )}
          >
            <Figure
              image={secondary}
              aspect="editorial"
              sizes={sizes}
              tone={tone}
              imageClassName={cn('transition-transform duration-1200 ease-silk', hovered && 'scale-[1.03]')}
            />
          </span>
        ) : null}

        {product.badge ? (
          <span
            className={cn(
              'absolute left-4 top-4 text-micro uppercase tracking-editorial',
              dark ? 'text-gold' : 'text-gold-text',
            )}
          >
            {product.badge}
          </span>
        ) : null}

        {/* Informação que aparece no hover, sobre a fotografia. */}
        <span
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 hidden items-center justify-center border-t-hairline px-4 py-4 text-micro uppercase tracking-editorial transition-all duration-600 ease-silk lg:flex',
            dark ? 'border-bone/15 bg-ink/70 text-bone' : 'border-ink/10 bg-bone/80 text-ink',
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
        >
          Ver peça
        </span>
      </Link>

      <div className="relative mt-5 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className={cn('font-display text-body-lg font-light', dark ? 'text-bone' : 'text-ink')}>
            <Link href={`/produto/${product.slug}`} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <p
            className={cn(
              'text-micro uppercase tracking-editorial',
              dark ? 'text-bone/55' : 'text-ink/65',
            )}
          >
            {product.material}
          </p>
          <p className={cn('mt-1 text-body-sm font-light', dark ? 'text-bone/75' : 'text-ink/70')}>
            {formatPrice(product.price)}
          </p>
        </div>

        <WishlistButton
          slug={product.slug}
          productName={product.name}
          tone={tone}
          className="mt-1 shrink-0"
        />
      </div>

      <button
        type="button"
        onClick={() => addToCart(product, { size: product.sizes?.[0] })}
        className={cn(
          'mt-5 w-fit text-micro uppercase tracking-editorial transition-all duration-600 ease-silk',
          dark ? 'text-bone/60 hover:text-gold' : 'text-ink/65 hover:text-gold-text',
          'lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100',
        )}
      >
        <span className="link-underline">Adicionar à sacola</span>
      </button>
    </article>
  );
}
