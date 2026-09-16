'use client';

import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/Button';
import { getProduct } from '@/data/products';
import { useShop } from '@/lib/shop/ShopContext';
import type { Product } from '@/types';

/** Lista de favoritos — lida do estado da loja (localStorage). */
export function WishlistGrid() {
  const { wishlist, hydrated } = useShop();

  if (!hydrated) {
    return (
      <p className="py-24 text-micro uppercase tracking-editorial text-bone/55">Carregando…</p>
    );
  }

  const products = wishlist
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product));

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-start gap-8 py-24">
        <p className="max-w-prose font-display text-display-xs font-light text-bone/70">
          Você ainda não salvou nenhuma peça.
        </p>
        <Button href="/colecoes" variant="outline" size="sm" withArrow>
          Explorar coleções
        </Button>
      </div>
    );
  }

  return <ProductGrid products={products} priorityCount={4} />;
}
