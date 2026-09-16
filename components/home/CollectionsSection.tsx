import { CollectionCard } from '@/components/home/CollectionCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { collections, homeCollections } from '@/data/collections';

/**
 * Seção editorial de coleções.
 * O grid usa assimetria controlada: as colunas pares descem levemente no
 * desktop, quebrando a leitura de “grade de template”.
 */
export function CollectionsSection() {
  const featured = homeCollections
    .map((slug) => collections.find((collection) => collection.slug === slug))
    .filter((collection): collection is NonNullable<typeof collection> => Boolean(collection));

  return (
    <section id="colecoes" className="bg-ink py-section-sm md:py-section lg:py-section-lg">
      <div className="shell">
        <SectionHeading
          eyebrow="Nossas coleções"
          title={
            <>
              Descubra peças para
              <span className="block italic">diferentes momentos.</span>
            </>
          }
          size="lg"
        />

        <Stagger className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-8 xl:grid-cols-4 xl:gap-x-6">
          {featured.map((collection, index) => (
            <Reveal
              key={collection.slug}
              asChild
              className={index % 2 === 1 ? 'xl:mt-16' : undefined}
            >
              <CollectionCard collection={collection} />
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
