import { ProductCard } from '@/components/product/ProductCard';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  tone?: 'dark' | 'light';
  /** Colunas no desktop. */
  columns?: 3 | 4;
  className?: string;
  priorityCount?: number;
}

/**
 * Grid de peças: 4 por linha no desktop, 2 no tablet, 2 no mobile largo e
 * 1 nos telefones menores (430px e abaixo).
 */
export function ProductGrid({
  products,
  tone = 'dark',
  columns = 4,
  className,
  priorityCount = 0,
}: ProductGridProps) {
  const sizes =
    columns === 4
      ? '(min-width: 1280px) 22vw, (min-width: 768px) 45vw, (min-width: 430px) 46vw, 100vw'
      : '(min-width: 1280px) 30vw, (min-width: 768px) 45vw, (min-width: 430px) 46vw, 100vw';

  return (
    <Stagger
      className={cn(
        'grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:gap-x-8 md:gap-y-20',
        columns === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3',
        className,
      )}
      staggerChildren={0.07}
    >
      {products.map((product, index) => (
        <Reveal key={product.slug} asChild>
          <ProductCard
            product={product}
            tone={tone}
            sizes={sizes}
            priority={index < priorityCount}
          />
        </Reveal>
      ))}
    </Stagger>
  );
}
