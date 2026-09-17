import manifest from '@/data/image-manifest.json';
import type { ImageRef } from '@/types';

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

/** Conjunto genérico: preenche qualquer slot que ainda não tenha foto própria. */
const FALLBACK_POOL = 'editorial';

/** Fotografias disponíveis em um conjunto numerado (`prefixo-01`, `prefixo-02`…). */
function poolVariants(prefix: string): string[] {
  const pattern = new RegExp(`^${prefix}-\\d+$`);
  return Object.keys(slots)
    .filter((slot) => pattern.test(slot))
    .sort();
}

/** Hash estável — a mesma peça recebe sempre a mesma fotografia do conjunto. */
function seedIndex(seed: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }
  return hash % length;
}

/**
 * Caminho da fotografia de uma referência.
 *
 * Ordem: o slot exato → os conjuntos declarados na própria referência →
 * o conjunto `editorial`. Retorna `null` quando não há nenhuma fotografia,
 * e aí o placeholder editorial assume.
 */
export function resolveRef(ref: ImageRef): string | null {
  const exact = resolveImage(ref.slot);
  if (exact) return exact;

  for (const prefix of [...(ref.pools ?? []), FALLBACK_POOL]) {
    const variants = poolVariants(prefix);
    if (variants.length > 0) {
      return slots[variants[seedIndex(ref.slot, variants.length)]]?.src ?? null;
    }
  }

  return null;
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
