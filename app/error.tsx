'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { DiamondGlyph } from '@/components/ui/Icons';
import { whatsappLink } from '@/lib/whatsapp';

/**
 * Fronteira de erro das rotas.
 * Mantém a identidade da marca mesmo quando algo falha — e oferece o caminho
 * de atendimento em vez de deixar o visitante sem saída.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // O digest é o identificador do erro no servidor — útil no suporte.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center bg-ink">
      <div className="shell flex flex-col items-start gap-10 py-section-sm">
        <DiamondGlyph size={11} className="text-gold/70" />

        <p className="eyebrow text-gold">Algo não carregou</p>

        <h1 className="max-w-[20ch] font-display text-display-sm font-light leading-[1.05] text-bone md:text-display-md">
          Tivemos um problema
          <span className="block italic">ao exibir esta página.</span>
        </h1>

        <p className="max-w-prose text-body-sm font-light text-bone/65">
          Tente novamente. Se o problema continuar, fale com um especialista — seguimos o
          atendimento por WhatsApp.
        </p>

        <div className="mt-2 flex flex-wrap gap-4">
          <Button variant="solid" size="md" onClick={reset}>
            Tentar novamente
          </Button>
          <Button href="/" variant="outline" size="md" withArrow>
            Ir para a home
          </Button>
          <Button href={whatsappLink()} external variant="quiet" size="md" className="text-bone/60 hover:text-gold">
            Falar com especialista
          </Button>
        </div>

        {error.digest ? (
          <p className="text-micro uppercase tracking-editorial text-bone/50">
            Referência: {error.digest}
          </p>
        ) : null}
      </div>
    </section>
  );
}
