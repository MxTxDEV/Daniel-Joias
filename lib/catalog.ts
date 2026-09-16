import { getProductsByCollection, products as allProducts } from '@/data/products';
import type { Product } from '@/types';

/** Rótulos legíveis das categorias usadas nas rotas e filtros. */
export const categoryLabels: Record<string, string> = {
  aneis: 'Anéis',
  correntes: 'Correntes',
  cordoes: 'Cordões',
  colares: 'Colares',
  pulseiras: 'Pulseiras',
  aliancas: 'Alianças',
  'par-de-aliancas': 'Par de alianças',
  noivado: 'Anéis de noivado',
  solitarios: 'Solitários',
};

export const occasionLabels: Record<string, string> = {
  aniversario: 'Aniversário',
  'datas-especiais': 'Datas especiais',
  premium: 'Presentes premium',
  'pedido-de-namoro': 'Pedido de namoro',
  'pedido-de-casamento': 'Pedido de casamento',
};

export const audienceLabels: Record<string, string> = {
  ele: 'Para ele',
  ela: 'Para ela',
};

export interface CatalogFilters {
  categoria?: string;
  /** `ele` | `ela` — usado na coleção de presentes. */
  para?: string;
  ocasiao?: string;
  /** `true` limita às peças com selo. */
  destaque?: string;
}

/** Aplica os filtros de query string sobre as peças de uma coleção. */
export function filterCollection(collectionSlug: string, filters: CatalogFilters): Product[] {
  let result = collectionSlug === 'tudo' ? [...allProducts] : getProductsByCollection(collectionSlug);

  if (filters.categoria) {
    result = result.filter((product) => product.category === filters.categoria);
  }

  if (filters.para === 'ele') {
    result = result.filter((product) => product.audiences.includes('masculino'));
  }

  if (filters.para === 'ela') {
    result = result.filter((product) => product.audiences.includes('feminino'));
  }

  if (filters.ocasiao) {
    result = result.filter((product) => product.occasions?.includes(filters.ocasiao as string));
  }

  if (filters.destaque === 'true') {
    result = result.filter((product) => Boolean(product.badge));
  }

  return result;
}

/** Categorias presentes em uma coleção, para montar a régua de filtros. */
export function collectionCategories(collectionSlug: string): { slug: string; label: string }[] {
  const source = collectionSlug === 'tudo' ? allProducts : getProductsByCollection(collectionSlug);
  const unique = Array.from(new Set(source.map((product) => product.category)));

  return unique
    .map((slug) => ({ slug, label: categoryLabels[slug] ?? slug }))
    .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
}

/** Resumo textual dos filtros ativos — usado no cabeçalho da coleção. */
export function activeFilterLabels(filters: CatalogFilters): string[] {
  const labels: string[] = [];

  if (filters.categoria) labels.push(categoryLabels[filters.categoria] ?? filters.categoria);
  if (filters.para) labels.push(audienceLabels[filters.para] ?? filters.para);
  if (filters.ocasiao) labels.push(occasionLabels[filters.ocasiao] ?? filters.ocasiao);
  if (filters.destaque === 'true') labels.push('Destaques');

  return labels;
}
