'use client';

import { motion } from 'framer-motion';
import { HeartIcon } from '@/components/ui/Icons';
import { useShop } from '@/lib/shop/ShopContext';
import { cn } from '@/lib/cn';

interface WishlistButtonProps {
  slug: string;
  productName: string;
  tone?: 'dark' | 'light';
  withLabel?: boolean;
  className?: string;
}

/** Favoritos — o coração preenche com um pulso curto ao ser ativado. */
export function WishlistButton({
  slug,
  productName,
  tone = 'dark',
  withLabel = false,
  className,
}: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist, hydrated } = useShop();
  const active = hydrated && isWishlisted(slug);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(slug);
      }}
      aria-pressed={active}
      aria-label={`${active ? 'Remover' : 'Adicionar'} ${productName} ${
        active ? 'dos' : 'aos'
      } favoritos`}
      className={cn(
        'group/heart inline-flex items-center gap-3 transition-colors duration-400 ease-silk',
        tone === 'dark'
          ? active
            ? 'text-gold'
            : 'text-bone/60 hover:text-bone'
          : active
            ? 'text-gold-text'
            : 'text-ink/65 hover:text-ink',
        className,
      )}
    >
      <motion.span animate={active ? { scale: [1, 1.22, 1] } : { scale: 1 }} transition={{ duration: 0.45 }}>
        <HeartIcon filled={active} />
      </motion.span>
      {withLabel ? (
        <span className="text-micro uppercase tracking-editorial">
          {active ? 'Nos favoritos' : 'Adicionar aos favoritos'}
        </span>
      ) : null}
    </button>
  );
}
