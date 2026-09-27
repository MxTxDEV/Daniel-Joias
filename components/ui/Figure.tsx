import Image from 'next/image';
import { RemoteImage } from '@/components/ui/RemoteImage';
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
      {src === null ? (
        <PhotographyPlaceholder image={image} tone={tone} variant={placeholder} />
      ) : src.startsWith('http') ? (
        <RemoteImage
          src={src}
          alt={image.alt}
          sizes={sizes}
          priority={priority}
          className={imageClassName}
          fallback={<PhotographyPlaceholder image={image} tone={tone} variant={placeholder} />}
        />
      ) : (
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
      )}
    </div>
  );
}

/**
 * Superfície usada enquanto a fotografia não existe.
 *
 * Por padrão é silenciosa: um campo de luz quente sobre o preto da marca,
 * com grão fino e uma variação de posição derivada do próprio slot — duas
 * superfícies vizinhas nunca ficam idênticas. Lê como direção de arte, não
 * como imagem faltando.
 *
 * Para a produção das fotos, `NEXT_PUBLIC_PHOTO_BRIEFS=1` reativa o briefing
 * de cada shot sobre a superfície.
 */
const SHOW_BRIEFS = process.env.NEXT_PUBLIC_PHOTO_BRIEFS === '1';

/** Variação estável por slot: muda o centro e a intensidade da luz. */
function lightField(slot: string): { x: number; y: number; spread: number } {
  let hash = 0;
  for (let i = 0; i < slot.length; i += 1) hash = (hash * 31 + slot.charCodeAt(i)) % 10000;
  return {
    x: 30 + (hash % 41),
    y: 22 + ((hash >> 3) % 33),
    spread: 78 + ((hash >> 5) % 35),
  };
}

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
  const { x, y, spread } = lightField(image.slot);

  const surface = dark
    ? `radial-gradient(${spread}% ${spread}% at ${x}% ${y}%, #232018 0%, #15130f 38%, #0b0a09 72%, #080808 100%)`
    : `radial-gradient(${spread}% ${spread}% at ${x}% ${y}%, #FFFFFF 0%, #F7F4ED 40%, #EDE7DA 78%, #E4DCCB 100%)`;

  return (
    <div
      aria-hidden="true"
      className="surface-grain absolute inset-0 overflow-hidden"
      style={{ backgroundImage: surface }}
    >
      {/* Brilho quente muito sutil — o ouro da identidade, sem virar dourado. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: dark
            ? `radial-gradient(42% 42% at ${x}% ${y}%, rgba(198,161,91,0.16) 0%, rgba(198,161,91,0) 70%)`
            : `radial-gradient(46% 46% at ${x}% ${y}%, rgba(198,161,91,0.14) 0%, rgba(198,161,91,0) 72%)`,
        }}
      />

      {/* Vinheta: fecha as bordas e dá profundidade de estúdio. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: dark
            ? 'radial-gradient(120% 120% at 50% 45%, rgba(8,8,8,0) 42%, rgba(8,8,8,0.72) 100%)'
            : 'radial-gradient(120% 120% at 50% 45%, rgba(8,8,8,0) 48%, rgba(8,8,8,0.10) 100%)',
        }}
      />

      {SHOW_BRIEFS && variant === 'caption' ? (
        <div className="photo-slot-caption absolute inset-0 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className={cn('eyebrow', dark ? 'text-gold/80' : 'text-gold-text')}>Fotografia</p>
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
          <p className={cn('text-micro uppercase', dark ? 'text-bone/40' : 'text-ink/45')}>
            {image.slot}
          </p>
        </div>
      ) : null}
    </div>
  );
}
