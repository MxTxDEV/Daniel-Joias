import Link from 'next/link';
import type { ReactNode } from 'react';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { ChevronIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Breadcrumb[];
  children?: ReactNode;
  className?: string;
  /** Alinhamento do bloco — `center` para páginas institucionais curtas. */
  align?: 'left' | 'center';
}

/**
 * Abertura das páginas internas. Sempre em superfície escura, para que o
 * header transparente mantenha contraste no topo de qualquer rota.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  className,
  align = 'left',
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'bg-ink pb-16 pt-[calc(var(--header-height)+4.5rem)] md:pb-20 md:pt-[calc(var(--header-height)+7rem)]',
        className,
      )}
    >
      <div className="shell">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Você está em" className="mb-10">
            <ol className="flex flex-wrap items-center gap-3 text-micro uppercase tracking-editorial text-bone/55">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-3">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors duration-400 hover:text-gold">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-bone/65">
                      {crumb.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <ChevronIcon size={9} className="text-bone/50" />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Stagger className={cn('flex flex-col', align === 'center' && 'items-center text-center')}>
          {eyebrow ? (
            <Reveal asChild>
              <p className="eyebrow text-gold">{eyebrow}</p>
            </Reveal>
          ) : null}

          <Reveal asChild>
            <h1
              className={cn(
                'mt-7 max-w-[22ch] font-display font-light leading-[1.04] text-bone',
                'text-display-sm md:text-display-md xl:text-display-lg',
              )}
            >
              {title}
            </h1>
          </Reveal>

          <Reveal asChild variant="hairline" className="mt-9 w-20 origin-left">
            <span className={cn('block h-[0.5px] bg-gold/50', align === 'center' && 'mx-auto origin-center')} />
          </Reveal>

          {description ? (
            <Reveal asChild>
              <p className="mt-9 max-w-prose text-body-sm font-light text-bone/65 md:text-body">
                {description}
              </p>
            </Reveal>
          ) : null}

          {children ? <Reveal asChild className="mt-10">{children}</Reveal> : null}
        </Stagger>
      </div>
    </header>
  );
}
