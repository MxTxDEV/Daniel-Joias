import Link from 'next/link';
import { resolveImage } from '@/lib/images';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/data/site';

/**
 * Marca Daniel Joias.
 *
 * A logo oficial será fornecida posteriormente. Para aplicá-la, salve os
 * arquivos abaixo — o componente passa a usá-los automaticamente, em todas as
 * aplicações (header, footer, menu mobile), sem distorcer a arte:
 *
 *   public/images/marca/logo-claro.svg   → versão para fundos escuros
 *   public/images/marca/logo-escuro.svg  → versão para fundos claros
 *
 * A área de respiro é controlada por `padding` aqui e as proporções são
 * preservadas (altura fixa, largura automática). Enquanto os arquivos não
 * existirem, é exibido o logotipo tipográfico provisório.
 */

interface LogoProps {
  /** `light` = logo clara sobre fundo escuro. */
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Renderiza sem o link (uso em footer/menu). */
  asText?: boolean;
}

const heights = { sm: 'h-[18px]', md: 'h-[22px]', lg: 'h-[30px]' } as const;

const wordmarkSize = {
  sm: 'text-[0.8125rem] tracking-[0.34em]',
  md: 'text-[0.9375rem] tracking-[0.38em]',
  lg: 'text-[1.25rem] tracking-[0.42em]',
} as const;

export function Logo({ tone = 'light', size = 'md', className, asText = false }: LogoProps) {
  const file = resolveImage(tone === 'light' ? 'marca/logo-claro' : 'marca/logo-escuro');

  const content = file ? (
    // A logo oficial é servida sem recorte nem reprocessamento.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={file}
      alt={siteConfig.name}
      className={cn('w-auto object-contain', heights[size])}
      decoding="async"
    />
  ) : (
    <span
      className={cn(
        'block whitespace-nowrap font-display font-light uppercase',
        wordmarkSize[size],
        tone === 'light' ? 'text-bone' : 'text-ink',
      )}
    >
      Daniel&nbsp;Joias
    </span>
  );

  if (asText) {
    return <span className={cn('inline-flex items-center', className)}>{content}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — página inicial`}
      className={cn(
        'inline-flex items-center transition-opacity duration-600 ease-silk hover:opacity-70',
        className,
      )}
    >
      {content}
    </Link>
  );
}
