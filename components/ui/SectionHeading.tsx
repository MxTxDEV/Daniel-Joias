import type { ReactNode } from 'react';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  /** Linha em serifada fina. */
  title: ReactNode;
  description?: ReactNode;
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
  children?: ReactNode;
  className?: string;
  /** Tamanho do título — `lg` para aberturas de seção. */
  size?: 'md' | 'lg';
  /** Id do h2 — usado por `aria-labelledby` nas seções. */
  titleId?: string;
}

/**
 * Cabeçalho editorial de seção: eyebrow em sans espaçada, título em serifada
 * e linha dourada que se desenha ao entrar no viewport.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'dark',
  align = 'left',
  children,
  className,
  size = 'md',
  titleId,
}: SectionHeadingProps) {
  const dark = tone === 'dark';

  return (
    <Stagger
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal asChild className="mb-6 flex items-center gap-3">
          <span className={cn('eyebrow', dark ? 'text-gold' : 'text-gold-text')}>{eyebrow}</span>
        </Reveal>
      ) : null}

      <Reveal asChild>
        <h2
          id={titleId}
          className={cn(
            'max-w-[24ch] font-display font-light',
            size === 'lg'
              ? 'text-display-sm md:text-display-md xl:text-display-lg'
              : 'text-display-xs md:text-display-sm xl:text-display-md',
            dark ? 'text-bone' : 'text-ink',
          )}
        >
          {title}
        </h2>
      </Reveal>

      <Reveal asChild variant="hairline" className="mt-8 w-full max-w-[9rem] origin-left">
        <span
          className={cn(
            'block h-[0.5px]',
            dark ? 'bg-gold/45' : 'bg-gold-dark/40',
            align === 'center' && 'mx-auto origin-center',
          )}
        />
      </Reveal>

      {description ? (
        <Reveal asChild className="mt-8">
          <p
            className={cn(
              'max-w-prose text-body-sm font-light md:text-body',
              dark ? 'text-bone/65' : 'text-ink/75',
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}

      {children ? <Reveal asChild className="mt-10">{children}</Reveal> : null}
    </Stagger>
  );
}
