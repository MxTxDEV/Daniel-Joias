import { Button } from '@/components/ui/Button';
import { DiamondGlyph } from '@/components/ui/Icons';

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ink">
      <div className="shell flex flex-col items-start gap-10 py-section-sm">
        <DiamondGlyph size={11} className="text-gold/85" />

        <p className="eyebrow text-gold">Erro 404</p>

        <h1 className="max-w-[20ch] font-display text-display-sm font-light leading-[1.05] text-bone md:text-display-md">
          Esta página não
          <span className="block italic">foi encontrada.</span>
        </h1>

        <p className="max-w-prose text-body-sm font-light text-bone/65">
          O endereço pode ter mudado. Volte à seleção de peças ou fale com um especialista.
        </p>

        <div className="mt-2 flex flex-wrap gap-4">
          <Button href="/" variant="solid" size="md">
            Ir para a home
          </Button>
          <Button href="/colecoes" variant="outline" size="md" withArrow>
            Explorar coleções
          </Button>
        </div>
      </div>
    </section>
  );
}
