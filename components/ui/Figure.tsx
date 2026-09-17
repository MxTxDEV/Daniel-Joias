import Image from 'next/image';
import { aspectClass, resolveRef, type AspectName } from '@/lib/images';
import { cn } from '@/lib/cn';
import type { ImageRef } from '@/types';

interface FigureProps {
  image: ImageRef;
  /** Proporção — sobrepõe a definida no próprio ImageRef. */
  aspect?: AspectName;
  /** `sizes` do next/image: obrigatório para servir a largura correta. */
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  tone?: 'dark' | 'light';
  /** Desativa a proporção fixa quando o container já define a altura. */
  fillParent?: boolean;
  /**
   * `quiet` omite o briefing no placeholder — usado em imagens de fundo,
   * onde há texto sobreposto.
   */
  placeholder?: 'caption' | 'quiet';
}

/**
 * Único ponto de renderização de fotografia do site.
 *
 * Se existir um arquivo em `public/images/<slot>.<ext>`, ele é servido via
 * next/image (AVIF/WebP, srcset responsivo, lazy loading). Enquanto a
 * fotografia oficial não existir, renderiza um placeholder editorial com o
 * briefing do shot — sem imagens genéricas e sem quebra de layout.
 *
 * Para substituir todas as imagens do site: salve os arquivos em
 * `public/images` seguindo os slots (ver public/images/README.md).
 */
export function Figure({
  image,
  aspect,
  sizes,
  priority = false,
  className,
  imageClassName,
  tone = 'dark',
  fillParent = false,
  placeholder = 'caption',
}: FigureProps) {
  const src = resolveRef(image);
  const ratio = aspect ?? image.aspect ?? 'editorial';

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        fillParent ? 'h-full w-full' : aspectClass[ratio],
        tone === 'dark' ? 'bg-ink-800' : 'bg-bone-300',
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          quality={82}
          className={cn('object-cover', imageClassName)}
        />
      ) : (
        <PhotographyPlaceholder image={image} tone={tone} variant={placeholder} />
      )}
    </div>
  );
}

/**
 * Placeholder de fotografia.
 * Deliberadamente sóbrio: descreve o shot esperado em vez de simular uma joia.
 */
function PhotographyPlaceholder({
  image,
  tone,
  variant,
}: {
  image: ImageRef;
  tone: 'dark' | 'light';
  variant: 'caption' | 'quiet';
}) {
  const dark = tone === 'dark';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'photo-slot surface-grain absolute inset-0 flex items-center justify-center',
        dark
          ? 'bg-[radial-gradient(120%_90%_at_50%_0%,#1b1b1b_0%,#101010_45%,#080808_100%)]'
          : 'bg-[radial-gradient(120%_90%_at_50%_0%,#FBFAF7_0%,#F1EDE4_50%,#E7E1D5_100%)]',
      )}
    >
      <div
        className={cn(
          'absolute inset-[6%] border-hairline',
          dark ? 'border-gold/25' : 'border-gold-dark/25',
        )}
      />
      {variant === 'quiet' ? null : (
        <div className="photo-slot-caption relative max-w-[22rem] flex-col items-center gap-4 px-6 text-center">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            className={dark ? 'text-gold' : 'text-gold-text'}
          >
            <path d="M6.5 0.6 12.4 6.5 6.5 12.4 0.6 6.5Z" stroke="currentColor" strokeWidth="0.6" />
          </svg>
          <p
            className={cn(
              'eyebrow',
              dark ? 'text-gold/85' : 'text-gold-text',
            )}
          >
            Fotografia
          </p>
          {image.brief ? (
            <p
              className={cn(
                'text-[0.6875rem] font-light leading-relaxed tracking-[0.06em]',
                dark ? 'text-bone/55' : 'text-ink/60',
              )}
            >
              {image.brief}
            </p>
          ) : null}
          <p
            className={cn(
              'text-micro uppercase',
              dark ? 'text-bone/40' : 'text-ink/45',
            )}
          >
            {image.slot}
          </p>
        </div>
      )}
    </div>
  );
}
