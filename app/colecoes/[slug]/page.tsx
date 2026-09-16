import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Figure } from '@/components/ui/Figure';
import { Parallax } from '@/components/ui/Parallax';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { collections, getCollection } from '@/data/collections';
import {
  activeFilterLabels,
  collectionCategories,
  filterCollection,
  type CatalogFilters,
} from '@/lib/catalog';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/cn';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) return {};

  return buildMetadata({
    title: `${collection.title} — ${collection.eyebrow}`,
    description: collection.description,
    pathname: `/colecoes/${collection.slug}`,
    imageSlot: collection.image.slot,
  });
}

/** Primeiro valor de um parâmetro de busca. */
function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const collection = getCollection(slug);

  if (!collection) notFound();

  const filters: CatalogFilters = {
    categoria: single(query.categoria),
    para: single(query.para),
    ocasiao: single(query.ocasiao),
    destaque: single(query.destaque),
  };

  const products = filterCollection(collection.slug, filters);
  const categories = collectionCategories(collection.slug);
  const active = activeFilterLabels(filters);
  const basePath = `/colecoes/${collection.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Início', pathname: '/' },
              { name: 'Coleções', pathname: '/colecoes' },
              { name: collection.title, pathname: basePath },
            ]),
          ),
        }}
      />

      <PageHeader
        eyebrow={collection.eyebrow}
        title={collection.title}
        description={collection.intro ?? collection.description}
        breadcrumbs={[
          { label: 'Início', href: '/' },
          { label: 'Coleções', href: '/colecoes' },
          { label: collection.title },
        ]}
      />

      {/* Fotografia de abertura da coleção. */}
      <Reveal variant="clip" className="bg-ink">
        <Parallax distance={5} className="h-[46svh] w-full md:h-[64svh]">
          <Figure
            image={collection.image}
            sizes="100vw"
            fillParent
            placeholder="quiet"
            className="h-full w-full"
            tone={collection.theme}
            imageClassName="object-cover object-center"
          />
        </Parallax>
      </Reveal>

      <section className="bg-ink py-section-sm md:py-section">
        <div className="shell">
          {categories.length > 1 ? (
            <nav aria-label="Filtrar por categoria" className="border-b-hairline border-bone/10 pb-6">
              <ul className="no-scrollbar -mx-gutter flex gap-x-8 gap-y-3 overflow-x-auto px-gutter md:mx-0 md:flex-wrap md:px-0">
                <li className="shrink-0">
                  <Link
                    href={basePath}
                    data-active={!filters.categoria}
                    className={cn(
                      'link-underline whitespace-nowrap text-label-sm uppercase tracking-wider transition-colors duration-400',
                      filters.categoria ? 'text-bone/60 hover:text-bone' : 'text-gold',
                    )}
                  >
                    Todas
                  </Link>
                </li>
                {categories.map((category) => {
                  const isActive = filters.categoria === category.slug;
                  return (
                    <li key={category.slug} className="shrink-0">
                      <Link
                        href={`${basePath}?categoria=${category.slug}`}
                        data-active={isActive}
                        className={cn(
                          'link-underline whitespace-nowrap text-label-sm uppercase tracking-wider transition-colors duration-400',
                          isActive ? 'text-gold' : 'text-bone/60 hover:text-bone',
                        )}
                      >
                        {category.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
            <p className="text-micro uppercase tracking-editorial text-bone/55">
              {products.length} {products.length === 1 ? 'peça' : 'peças'}
              {active.length > 0 ? ` · ${active.join(' · ')}` : ''}
            </p>

            {active.length > 0 ? (
              <Link
                href={basePath}
                className="link-underline text-micro uppercase tracking-editorial text-bone/55 hover:text-gold"
              >
                Limpar filtros
              </Link>
            ) : null}
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} className="mt-14 md:mt-16" priorityCount={4} />
          ) : (
            <div className="flex flex-col items-start gap-8 py-24">
              <p className="max-w-prose font-display text-display-xs font-light text-bone/70">
                Nenhuma peça nesta seleção por enquanto.
              </p>
              <Button href={basePath} variant="outline" size="sm" withArrow>
                Ver toda a coleção
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
