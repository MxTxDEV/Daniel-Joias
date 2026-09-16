import { Figure } from '@/components/ui/Figure';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { instagramPosts } from '@/data/brand';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/cn';

/**
 * Grid social editorial — proporções alternadas, sem cara de feed.
 * Substituir os slots em `public/images/instagram/` pelos posts reais.
 */
const layout = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-3',
  'md:col-span-5 md:row-span-2',
  'md:col-span-3',
  'md:col-span-4',
  'md:col-span-4',
];

export function InstagramGrid() {
  return (
    <section
      aria-labelledby="secao-instagram"
      className="bg-ink py-section-sm md:py-section lg:py-section-lg"
    >
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Stagger>
            <Reveal asChild>
              <p className="eyebrow text-gold">Instagram</p>
            </Reveal>
            <Reveal asChild>
              <h2
                id="secao-instagram"
                className="mt-7 font-display text-display-sm font-light text-bone md:text-display-md"
              >
                {siteConfig.social.instagram.handle}
              </h2>
            </Reveal>
            <Reveal asChild>
              <p className="mt-6 text-body-sm font-light italic text-bone/60">
                Momentos reais. Peças reais.
              </p>
            </Reveal>
          </Stagger>

          <Reveal className="shrink-0 md:pb-2">
            <Button
              href={siteConfig.social.instagram.url}
              external
              variant="outline"
              size="sm"
              withArrow
            >
              Seguir no Instagram
            </Button>
          </Reveal>
        </div>

        <Stagger
          className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-2 md:gap-4"
          staggerChildren={0.05}
        >
          {instagramPosts.map((post, index) => (
            <Reveal key={post.slot} asChild className={cn('overflow-hidden', layout[index])}>
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Ver no Instagram"
                className="group block h-full w-full"
                aria-label={`Abrir ${siteConfig.social.instagram.handle} no Instagram`}
              >
                <Figure
                  image={post}
                  sizes="(min-width: 768px) 30vw, 50vw"
                  aspect="square"
                  /* Nos dois blocos altos a proporção cede lugar à altura da linha do grid. */
                  className={index === 0 || index === 2 ? 'md:aspect-auto md:h-full' : undefined}
                  imageClassName="transition-transform duration-1200 ease-silk group-hover:scale-[1.04]"
                />
              </a>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
