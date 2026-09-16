import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { CollectionCard } from '@/components/home/CollectionCard';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { collections } from '@/data/collections';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/cn';

export const metadata: Metadata = buildMetadata({
  title: 'Coleções',
  description:
    'Coleções Daniel Joias: masculino, feminino, casamento, presentes, ouro e prata. Anéis, correntes, cordões, colares, pulseiras e alianças.',
  pathname: '/colecoes',
});

export default function CollectionsIndexPage() {
  const [first, second, ...rest] = collections;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Início', pathname: '/' },
              { name: 'Coleções', pathname: '/colecoes' },
            ]),
          ),
        }}
      />

      <PageHeader
        eyebrow="Coleções"
        title={
          <>
            Peças para
            <span className="block italic">diferentes momentos.</span>
          </>
        }
        description="Explore por público, por ocasião ou pela matéria-prima."
        breadcrumbs={[{ label: 'Início', href: '/' }, { label: 'Coleções' }]}
      />

      <section className="bg-ink pb-section-sm md:pb-section lg:pb-section-lg">
        <div className="shell">
          {/* Duas aberturas grandes, o resto em grade de quatro. */}
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {[first, second].map(
              (collection, index) =>
                collection && (
                  <Reveal key={collection.slug} asChild className={index === 1 ? 'md:mt-16' : undefined}>
                    <CollectionCard
                      collection={collection}
                      aspect="editorial"
                      sizes="(min-width: 768px) 46vw, 92vw"
                    />
                  </Reveal>
                ),
            )}
          </Stagger>

          <Stagger className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 md:gap-8 xl:grid-cols-3">
            {rest.map((collection, index) => (
              <Reveal
                key={collection.slug}
                asChild
                className={cn(index % 3 === 1 && 'xl:mt-12')}
              >
                <CollectionCard
                  collection={collection}
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                />
              </Reveal>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
