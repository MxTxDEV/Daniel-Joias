import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { featuredProductSlugs, getProducts } from '@/data/products';

/** “Peças selecionadas” — grid premium de 4 colunas no desktop. */
export function FeaturedProducts() {
  const products = getProducts(featuredProductSlugs);

  return (
    <section className="bg-ink pb-section-sm md:pb-section lg:pb-section-lg">
      <div className="shell">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Seleção"
            title="Peças selecionadas"
            description="Detalhes cuidadosamente escolhidos para acompanhar você."
            size="lg"
            className="md:max-w-[36rem]"
          />

          <Reveal className="shrink-0 md:pb-3">
            <Button href="/colecoes" variant="quiet" size="sm" withArrow className="text-bone/70 hover:text-gold">
              Ver todas as peças
            </Button>
          </Reveal>
        </div>

        <ProductGrid products={products} className="mt-16 md:mt-20" />
      </div>
    </section>
  );
}
