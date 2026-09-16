import { Figure } from '@/components/ui/Figure';
import { Parallax } from '@/components/ui/Parallax';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import type { ImageRef } from '@/types';

const primary: ImageRef = {
  slot: 'casamento/principal',
  alt: 'Mãos com alianças em ouro 18K, luz natural suave',
  brief:
    'Mãos com alianças em ouro 18K — luz natural suave, foco nas alianças, fundo neutro desfocado',
  aspect: 'cinema',
};

const secondary: ImageRef = {
  slot: 'casamento/detalhe',
  alt: 'Detalhe macro de aliança em ouro 18K',
  brief: 'Macro de aliança em ouro 18K sobre tecido claro, luz lateral',
  aspect: 'portrait',
};

/**
 * Casamento — a seção mais cinematográfica da home: fotografia em tela cheia,
 * imagem secundária sobreposta e movimento lento.
 */
export function WeddingSection() {
  return (
    <section aria-labelledby="secao-casamento" className="relative bg-ink">
      <Parallax distance={6} className="relative h-[80svh] w-full md:h-[92svh]">
        <Figure
          image={primary}
          sizes="100vw"
          fillParent
          placeholder="quiet"
          className="h-full w-full"
          imageClassName="object-cover object-center"
        />
      </Parallax>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.55)_0%,rgba(8,8,8,0.15)_45%,rgba(8,8,8,0.85)_100%)]"
      />

      <div className="absolute inset-x-0 bottom-0">
        <div className="shell grid grid-cols-1 items-end gap-10 pb-16 md:grid-cols-12 md:pb-20 lg:pb-24">
          {/* Imagem secundária sobreposta — assimetria controlada. */}
          <Reveal variant="clip" className="hidden md:col-span-3 md:block">
            <Figure
              image={secondary}
              aspect="portrait"
              sizes="(min-width: 1280px) 22vw, 28vw"
              imageClassName="object-cover"
            />
          </Reveal>

          <Stagger className="md:col-span-7 md:col-start-6">
            <Reveal asChild>
              <p className="eyebrow text-gold">Casamento</p>
            </Reveal>

            <Reveal asChild>
              <h2
                id="secao-casamento"
                className="mt-7 font-display text-display-md font-light text-bone md:text-display-lg"
              >
                Para dizer <span className="italic">“sim”.</span>
              </h2>
            </Reveal>

            <Reveal asChild>
              <p className="mt-7 max-w-prose text-body-sm font-light text-bone/65 md:text-body">
                Alianças e anéis pensados para representar um momento único.
              </p>
            </Reveal>

            <Reveal asChild className="mt-10">
              <Button href="/colecoes/casamento" variant="outline" size="md" withArrow>
                Explorar alianças
              </Button>
            </Reveal>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
