/** Tipos compartilhados do catálogo e da navegação. */

export type Material = 'Ouro 18K' | 'Ouro 10K' | 'Prata 925';

export type MetalFamily = 'ouro' | 'prata';

export type Audience = 'masculino' | 'feminino' | 'casamento' | 'presentes';

export type Badge = 'Novidade' | 'Mais vendido' | 'Feito à mão' | 'Edição limitada';

/**
 * Referência de imagem.
 *
 * `slot` é a chave do arquivo em `public/images/<slot>.(avif|webp|jpg|png)`.
 * Enquanto a fotografia oficial não existir, o componente `Figure` renderiza
 * um placeholder editorial descrevendo o briefing do shot (`brief`).
 */
export interface ImageRef {
  slot: string;
  alt: string;
  /** Briefing da fotografia — aparece apenas no placeholder. */
  brief?: string;
  aspect?: 'portrait' | 'editorial' | 'square' | 'wide' | 'cinema';
}

export interface ProductDetail {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Linha editorial curta, exibida na página de produto. */
  tagline?: string;
  material: Material;
  metal: MetalFamily;
  /** Preço em centavos de BRL. */
  price: number;
  /** Preço de referência, quando houver. */
  compareAtPrice?: number;
  category: string;
  audiences: Audience[];
  collections: string[];
  sizes?: string[];
  /** Ocasiões de presente (ver filtros de /colecoes/presentes). */
  occasions?: string[];
  badge?: Badge;
  description: string;
  details: ProductDetail[];
  images: ImageRef[];
  /** Termos extras considerados pela busca. */
  keywords?: string[];
  /** true enquanto a peça for um registro de estrutura, não catálogo oficial. */
  isPlaceholder: boolean;
}

export interface Collection {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  /** Texto longo do cabeçalho da coleção. */
  intro?: string;
  image: ImageRef;
  theme: 'dark' | 'light';
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  /** Colunas do mega-menu. */
  columns: {
    title?: string;
    links: NavLink[];
  }[];
  feature?: {
    image: ImageRef;
    label: string;
    title: string;
    href: string;
  };
}

export interface CartLine {
  productSlug: string;
  size?: string;
  quantity: number;
}

export interface Testimonial {
  /** Texto do depoimento — placeholder até o cliente fornecer o real. */
  quote: string;
  author: string;
  context?: string;
  isPlaceholder: boolean;
}
