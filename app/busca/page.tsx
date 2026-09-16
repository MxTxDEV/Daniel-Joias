import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SearchForm } from '@/components/search/SearchForm';
import { searchProducts, searchSuggestions } from '@/lib/search';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Busca',
    description: 'Busque anéis, correntes, cordões, alianças e joias em ouro e prata.',
    pathname: '/busca',
  }),
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = (Array.isArray(params.q) ? params.q[0] : params.q) ?? '';
  const results = searchProducts(query, 24);

  return (
    <>
      <PageHeader
        eyebrow="Busca"
        title={query ? `“${query}”` : 'O que você procura?'}
        description={
          query
            ? `${results.length} ${results.length === 1 ? 'peça encontrada' : 'peças encontradas'}.`
            : 'Busque por tipo de peça, material ou ocasião.'
        }
      >
        <SearchForm initialQuery={query} />
      </PageHeader>

      <section className="bg-ink pb-section-sm md:pb-section">
        <div className="shell">
          {results.length > 0 ? (
            <ProductGrid
              products={results.map((result) => result.product)}
              priorityCount={4}
            />
          ) : (
            <div className="flex flex-col gap-10">
              <p className="max-w-prose text-body-sm font-light text-bone/65">
                {query
                  ? 'Nenhuma peça corresponde a esse termo. Tente uma das buscas abaixo.'
                  : 'Buscas frequentes:'}
              </p>
              <ul className="flex flex-wrap gap-x-8 gap-y-4">
                {searchSuggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <Link
                      href={`/busca?q=${encodeURIComponent(suggestion)}`}
                      className="link-underline text-body-sm font-light text-bone/70 hover:text-bone"
                    >
                      {suggestion}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
