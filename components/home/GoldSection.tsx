import { Figure } from '@/components/ui/Figure';
import { Parallax } from '@/components/ui/Parallax';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { getCollection } from '@/data/collections';

/**
 * Seção cinematográfica do ouro: fotografia macro em tela quase cheia,
 * movimento sutil de parallax no scroll e tipografia em contraste.
 */
export function GoldSection() {
  const collection = getCollection('ouro');
  if (!collection) return null;

  return (
    <section
      aria-labelledby="secao-ouro"
      className="relative flex min-h-[86svh] items-end overflow-hidden bg-ink-900 py-section-sm md:min-h-[92svh] md:py-section"
    >
      <Parallax distance={7} className="absolute inset-0">
        <Figure
          image={collection.image}
          sizes="100vw"
          fillParent
          placeholder="quiet"
          className="h-full w-full"
          imageClassName="object-cover object-center"
        />
      </Parallax>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.88)_0%,rgba(8,8,8,0.5)_45%,rgba(8,8,8,0.2)_100%)]"
      />

      <div className="shell relative z-10">
        <Stagger className="max-w-[34rem]">
          <Reveal asChild>
            <p className="eyebrow text-gold">Matéria-prima</p>
          </Reveal>

          <Reveal asChild>
            <h2
              id="secao-ouro"
              className="mt-8 font-display text-display-md font-light text-bone md:text-display-lg xl:text-display-xl"
            >
              Ouro 18K
            </h2>
          </Reveal>

          <Reveal asChild variant="hairline" className="mt-8 w-24 origin-left">
            <span className="block h-[0.5px] bg-gold/60" />
          </Reveal>

          <Reveal asChild>
            <p className="mt-8 max-w-measure font-display text-display-xs font-light italic leading-snug text-bone/75 md:text-[1.75rem]">
              Uma matéria-prima que atravessa gerações.
            </p>
          </Reveal>

          <Reveal asChild className="mt-12">
            <Button href="/colecoes/ouro" variant="gold" size="md" withArrow>
              Explorar ouro
            </Button>
          </Reveal>
        </Stagger>
      </div>
    </section>
  );
}
