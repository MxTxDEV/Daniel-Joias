import { products } from '@/data/products';
import type { Product } from '@/types';

/** Remove acentos e normaliza para comparação (anel/anéis, cordao/cordão). */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/** Sinônimos e termos de busca frequentes mapeados para tokens do catálogo. */
const synonyms: Record<string, string[]> = {
  anel: ['aneis', 'anel', 'solitario', 'aparador'],
  aneis: ['anel', 'aneis'],
  corrente: ['correntes', 'corrente', 'cordao', 'cordoes'],
  cordao: ['cordoes', 'cordao', 'corrente', 'correntes'],
  colar: ['colares', 'colar'],
  pulseira: ['pulseiras', 'pulseira'],
  alianca: ['aliancas', 'alianca', 'casamento', 'par-de-aliancas'],
  noivado: ['noivado', 'solitarios', 'pedido'],
  presente: ['presentes', 'presente'],
  ouro: ['ouro', '18k'],
  prata: ['prata', '925'],
};

function tokensFor(product: Product): string {
  return normalize(
    [
      product.name,
      product.material,
      product.metal,
      product.category,
      product.tagline ?? '',
      product.description,
      ...product.audiences,
      ...product.collections,
      ...(product.keywords ?? []),
    ].join(' '),
  );
}

const index = products.map((product) => ({ product, haystack: tokensFor(product) }));

export interface SearchResult {
  product: Product;
  score: number;
}

/** Busca simples por termos, com sinônimos e pontuação por relevância. */
export function searchProducts(query: string, limit = 8): SearchResult[] {
  const normalized = normalize(query);
  if (normalized.length < 2) return [];

  const terms = normalized.split(/\s+/).filter(Boolean);
  const expanded = terms.flatMap((term) => [term, ...(synonyms[term] ?? [])]);

  const results: SearchResult[] = [];

  for (const entry of index) {
    let score = 0;

    for (const term of terms) {
      if (normalize(entry.product.name).startsWith(term)) score += 6;
      if (normalize(entry.product.name).includes(term)) score += 4;
    }

    for (const term of expanded) {
      if (entry.haystack.includes(term)) score += 1;
    }

    if (score > 0) results.push({ product: entry.product, score });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Sugestões exibidas no overlay antes de digitar. */
export const searchSuggestions = [
  'Anel',
  'Corrente',
  'Cordão',
  'Aliança',
  'Ouro 18K',
  'Prata 925',
  'Presente',
];
