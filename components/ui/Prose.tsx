import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Bloco de texto longo das páginas institucionais.
 * Medida de leitura curta (~62 caracteres) e hierarquia tipográfica própria.
 */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-prose text-body-sm font-light leading-relaxed text-bone/70',
        '[&_h2]:mt-14 [&_h2]:font-display [&_h2]:text-display-xs [&_h2]:font-light [&_h2]:text-bone',
        '[&_h3]:mt-10 [&_h3]:text-label [&_h3]:uppercase [&_h3]:tracking-wider [&_h3]:text-gold',
        '[&_p]:mt-6 [&_ul]:mt-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3',
        '[&_li]:relative [&_li]:pl-6',
        "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:h-[0.5px] [&_li]:before:w-3 [&_li]:before:bg-gold/50 [&_li]:before:content-['']",
        '[&_a]:text-gold [&_a]:underline [&_a]:decoration-gold/40 [&_a]:underline-offset-4',
        '[&_strong]:font-normal [&_strong]:text-bone/85',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Nota de conteúdo pendente — deixa explícito o que falta ser fornecido. */
export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-10 border-l-hairline border-gold/40 pl-5 text-[0.6875rem] uppercase leading-relaxed tracking-editorial text-bone/55">
      {children}
    </p>
  );
}
