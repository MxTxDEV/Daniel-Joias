import manifest from '@/data/image-manifest.json';

interface ManifestEntry {
  src: string;
  bytes: number;
}

const slots = manifest.slots as Record<string, ManifestEntry | undefined>;

/**
 * Resolve o `slot` de uma imagem para um caminho real em /public.
 * Retorna `null` enquanto a fotografia oficial não estiver disponível —
 * nesse caso o componente `Figure` exibe o placeholder editorial com o
 * briefing do shot.
 */
export function resolveImage(slot: string): string | null {
  return slots[slot]?.src ?? null;
}

/** Proporções canônicas do design system. */
export const aspectClass = {
  portrait: 'aspect-[3/4]',
  editorial: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
  cinema: 'aspect-[21/9]',
} as const;

export type AspectName = keyof typeof aspectClass;
