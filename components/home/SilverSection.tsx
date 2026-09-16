import { Figure } from '@/components/ui/Figure';
import { Parallax } from '@/components/ui/Parallax';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { getCollection } from '@/data/collections';

/**
 * Prata: mesma identidade, outra temperatura. Fundo off-white, composição
 * dividida e muito espaço negativo.
 */
export function SilverSection() {
  const collection = getCollection('prata');
  if (!collection) return null;

  return (
    <section
      aria-labelledby="secao-prata"
      className="bg-bone py-section-sm md:py-section lg:py-section-lg"
    >
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal variant="clip" className="lg:col-span-7">
          <Parallax distance={4} className="aspect-[4/3] w-full lg:aspect-[4/5]">
            <Figure
              image={collection.image}
              sizes="(min-width: 1024px) 58vw, 100vw"
              tone="light"
              fillParent
              className="h-full w-full"
              imageClassName="object-cover"
            />
          </Parallax>
        </Reveal>

        <Stagger className="lg:col-span-4 lg:col-start-9">
          <Reveal asChild>
            <p className="eyebrow text-gold-text">Matéria-prima</p>
          </Reveal>

          <Reveal asChild>
            <h2
              id="secao-prata"
              className="mt-8 font-display text-display-sm font-light text-ink md:text-display-md xl:text-display-lg"
            >
              Prata
            </h2>
          </Reveal>

          <Reveal asChild variant="hairline" className="mt-8 w-20 origin-left">
            <span className="block h-[0.5px] bg-gold-dark/50" />
          </Reveal>

          <Reveal asChild>
            <p className="mt-8 max-w-measure font-display text-display-xs font-light italic leading-snug text-ink/70">
              Elegância em sua forma mais essencial.
            </p>
          </Reveal>

          <Reveal asChild>
            <p className="mt-8 max-w-prose text-body-sm font-light text-ink/70">
              {collection.intro}
            </p>
          </Reveal>

          <Reveal asChild className="mt-12">
            <Button href="/colecoes/prata" variant="outline-ink" size="md" withArrow>
              Explorar prata
            </Button>
          </Reveal>
        </Stagger>
      </div>
    </section>
  );
}
