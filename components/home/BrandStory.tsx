import { Figure } from '@/components/ui/Figure';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { brandStory } from '@/data/brand';

/**
 * Seção institucional.
 * Os textos são placeholders editáveis em `data/brand.ts` — não afirmam tempo
 * de mercado, tradição nem certificações.
 */
export function BrandStory() {
  return (
    <section
      aria-labelledby="secao-marca"
      className="bg-ink py-section-sm md:py-section lg:py-section-lg"
    >
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <Stagger className="lg:col-span-5 lg:pt-10">
          <Reveal asChild>
            <p className="eyebrow text-gold">{brandStory.eyebrow}</p>
          </Reveal>

          <Reveal asChild>
            <h2
              id="secao-marca"
              className="mt-8 font-display text-display-sm font-light leading-[1.06] text-bone md:text-display-md xl:text-display-lg"
            >
              {brandStory.titleTop}
              <span className="block italic text-bone/80">{brandStory.titleBottom}</span>
            </h2>
          </Reveal>

          <Reveal asChild variant="hairline" className="mt-10 w-24 origin-left">
            <span className="block h-[0.5px] bg-gold/50" />
          </Reveal>

          <div className="mt-10 flex flex-col gap-6">
            {brandStory.paragraphs.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 24)} asChild>
                <p className="max-w-prose text-body-sm font-light text-bone/65">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal asChild className="mt-12">
            <dl className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-8">
              {brandStory.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-2 border-t-hairline border-bone/12 pt-5"
                >
                  <dt className="text-micro uppercase tracking-editorial text-bone/55">
                    {fact.label}
                  </dt>
                  <dd className="text-body-sm font-light text-bone/70">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal asChild className="mt-14">
            <Button href="/sobre" variant="outline" size="md" withArrow>
              Sobre a Daniel Joias
            </Button>
          </Reveal>
        </Stagger>

        <Reveal variant="clip" className="lg:col-span-6 lg:col-start-7">
          <Figure
            image={brandStory.image}
            aspect="editorial"
            sizes="(min-width: 1024px) 48vw, 100vw"
            imageClassName="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
