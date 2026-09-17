import type { ImageRef, Product } from '@/types';

/**
 * CATÁLOGO DE ESTRUTURA — NÃO É O CATÁLOGO OFICIAL.
 *
 * Todos os registros abaixo existem para definir a arquitetura de dados da
 * loja (rotas, filtros, busca, carrinho, SEO). Nomes, preços, pesos e medidas
 * são marcadores e estão sinalizados com `isPlaceholder: true`.
 *
 * Ao receber o catálogo real da Daniel Joias:
 *   1. substitua os objetos deste arquivo (ou troque a fonte por um CMS/API
 *      mantendo o mesmo shape de `Product`);
 *   2. marque `isPlaceholder: false` em cada peça publicada;
 *   3. ajuste `catalogIsPlaceholder` em `data/site.ts` para `false`.
 */

const ringSizes = ['16', '17', '18', '19', '20', '21', '22'];
const chainLengths = ['45 cm', '50 cm', '60 cm', '70 cm'];
const braceletSizes = ['18 cm', '20 cm', '22 cm'];

/** Gera a galeria padrão de uma peça (5 ângulos) a partir do slug. */
function gallery(slug: string, name: string, material: string): ImageRef[] {
  return [
    {
      slot: `produtos/${slug}-01`,
      alt: `${name} em ${material} — fotografia principal`,
      brief: `${name} — foto principal, fundo preto, luz de estúdio de 2 pontos`,
      aspect: 'editorial',
    },
    {
      slot: `produtos/${slug}-02`,
      alt: `${name} em ${material} — detalhe macro do acabamento`,
      brief: `${name} — macro do acabamento, profundidade de campo curta`,
      aspect: 'editorial',
    },
    {
      slot: `produtos/${slug}-03`,
      alt: `${name} em ${material} — vista lateral`,
      brief: `${name} — vista lateral, perfil da peça, fundo preto`,
      aspect: 'editorial',
    },
    {
      slot: `produtos/${slug}-04`,
      alt: `${name} em ${material} — peça em uso`,
      brief: `${name} — peça em uso, luz natural, pele em foco suave`,
      aspect: 'editorial',
    },
    {
      slot: `produtos/${slug}-05`,
      alt: `${name} em ${material} — detalhe do polimento`,
      brief: `${name} — macro extremo do polimento e reflexos do metal`,
      aspect: 'editorial',
    },
  ];
}

const catalog: Product[] = [
  {
    slug: 'anel-signature-ouro-18k',
    name: 'Anel Signature',
    tagline: 'Faixa larga, acabamento polido, presença contida.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 289000,
    category: 'aneis',
    audiences: ['masculino', 'presentes'],
    collections: ['masculino', 'ouro', 'mais-vendidos', 'presentes'],
    sizes: ringSizes,
    occasions: ['premium', 'datas-especiais'],
    badge: 'Mais vendido',
    description:
      'Faixa larga em ouro 18K com superfície polida e aresta viva. O desenho reduz a peça ao essencial: massa, luz e proporção.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Acabamento', value: 'Polido espelhado' },
      { label: 'Largura', value: 'A confirmar (mm)' },
    ],
    images: gallery('anel-signature', 'Anel Signature', 'ouro 18K'),
    keywords: ['anel', 'anel masculino', 'ouro', 'aliança larga'],
    isPlaceholder: true,
  },
  {
    slug: 'anel-solitario-ouro-18k',
    name: 'Anel Solitário',
    tagline: 'Uma pedra central, nada além do necessário.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 549000,
    category: 'solitarios',
    audiences: ['casamento', 'feminino'],
    collections: ['casamento', 'ouro'],
    sizes: ringSizes,
    occasions: ['pedido-de-casamento', 'premium'],
    description:
      'Solitário em ouro 18K com garras finas e aro discreto, desenhado para que a luz atravesse a peça por inteiro.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Pedra', value: 'A confirmar' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Acabamento', value: 'Polido' },
    ],
    images: gallery('anel-solitario', 'Anel Solitário', 'ouro 18K'),
    keywords: ['anel', 'noivado', 'solitário', 'pedido de casamento'],
    isPlaceholder: true,
  },
  {
    slug: 'alianca-essencial-ouro-18k',
    name: 'Aliança Essencial',
    tagline: 'Perfil abaulado, acabamento acetinado.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 379000,
    category: 'aliancas',
    audiences: ['casamento'],
    collections: ['casamento', 'ouro', 'mais-vendidos'],
    sizes: ringSizes,
    description:
      'Aliança em ouro 18K de perfil abaulado e superfície acetinada — confortável no uso contínuo, estável no tempo.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Acabamento', value: 'Acetinado' },
      { label: 'Largura', value: 'A confirmar (mm)' },
    ],
    images: gallery('alianca-essencial', 'Aliança Essencial', 'ouro 18K'),
    keywords: ['aliança', 'casamento', 'ouro', 'par'],
    isPlaceholder: true,
  },
  {
    slug: 'par-de-aliancas-classico-ouro-18k',
    name: 'Par de Alianças Clássico',
    tagline: 'Duas peças, uma mesma leitura de luz.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 729000,
    category: 'par-de-aliancas',
    audiences: ['casamento', 'presentes'],
    collections: ['casamento', 'ouro', 'presentes'],
    sizes: ringSizes,
    occasions: ['premium'],
    badge: 'Feito à mão',
    description:
      'Par de alianças em ouro 18K com larguras distintas e o mesmo acabamento, para que as duas peças conversem sem se repetir.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Peso do par', value: 'A confirmar (g)' },
      { label: 'Acabamento', value: 'Polido e acetinado' },
      { label: 'Gravação', value: 'Disponível — consultar' },
    ],
    images: gallery('par-de-aliancas-classico', 'Par de Alianças Clássico', 'ouro 18K'),
    keywords: ['par de alianças', 'aliança', 'casamento', 'noivado'],
    isPlaceholder: true,
  },
  {
    slug: 'corrente-veneziana-ouro-18k',
    name: 'Corrente Veneziana',
    tagline: 'Elos quadrados, caimento contínuo.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 459000,
    category: 'correntes',
    audiences: ['masculino', 'feminino'],
    collections: ['masculino', 'feminino', 'ouro'],
    sizes: chainLengths,
    description:
      'Corrente veneziana em ouro 18K de elos quadrados e malha fechada — reflete a luz em linha contínua, sem interrupções.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Espessura', value: 'A confirmar (mm)' },
      { label: 'Fecho', value: 'Mosquetão' },
    ],
    images: gallery('corrente-veneziana', 'Corrente Veneziana', 'ouro 18K'),
    keywords: ['corrente', 'cordão', 'ouro', 'veneziana'],
    isPlaceholder: true,
  },
  {
    slug: 'cordao-cubano-ouro-18k',
    name: 'Cordão Cubano',
    tagline: 'Malha entrelaçada, peso presente.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 1289000,
    category: 'cordoes',
    audiences: ['masculino'],
    collections: ['masculino', 'ouro', 'mais-vendidos'],
    sizes: chainLengths,
    occasions: ['premium'],
    badge: 'Mais vendido',
    description:
      'Cordão cubano em ouro 18K com elos entrelaçados e polimento profundo. Uma peça de peso, feita para ser a única no pescoço.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Espessura', value: 'A confirmar (mm)' },
      { label: 'Fecho', value: 'Gaveta com trava dupla' },
    ],
    images: gallery('cordao-cubano', 'Cordão Cubano', 'ouro 18K'),
    keywords: ['cordão', 'cubano', 'corrente', 'ouro', 'masculino'],
    isPlaceholder: true,
  },
  {
    slug: 'colar-ponto-de-luz-ouro-18k',
    name: 'Colar Ponto de Luz',
    tagline: 'Um único ponto, no lugar exato.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 219000,
    category: 'colares',
    audiences: ['feminino', 'presentes'],
    collections: ['feminino', 'ouro', 'presentes', 'novidades'],
    sizes: ['40 cm', '45 cm'],
    occasions: ['aniversario', 'datas-especiais', 'pedido-de-namoro'],
    badge: 'Novidade',
    description:
      'Colar em ouro 18K com pingente de ponto de luz e corrente fina — pensado para uso contínuo e sobreposição.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Pedra', value: 'A confirmar' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Fecho', value: 'Mosquetão' },
    ],
    images: gallery('colar-ponto-de-luz', 'Colar Ponto de Luz', 'ouro 18K'),
    keywords: ['colar', 'ponto de luz', 'presente', 'ouro'],
    isPlaceholder: true,
  },
  {
    slug: 'pulseira-elos-ouro-18k',
    name: 'Pulseira Elos',
    tagline: 'Articulação precisa, superfície viva.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 389000,
    category: 'pulseiras',
    audiences: ['masculino', 'feminino'],
    collections: ['masculino', 'feminino', 'ouro'],
    sizes: braceletSizes,
    description:
      'Pulseira em ouro 18K de elos articulados, com fecho embutido que mantém a linha da peça limpa.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Largura', value: 'A confirmar (mm)' },
      { label: 'Fecho', value: 'Embutido com trava' },
    ],
    images: gallery('pulseira-elos', 'Pulseira Elos', 'ouro 18K'),
    keywords: ['pulseira', 'ouro', 'elos'],
    isPlaceholder: true,
  },
  {
    slug: 'anel-aparador-ouro-18k',
    name: 'Anel Aparador',
    tagline: 'Feito para dividir o dedo com outra peça.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 169000,
    category: 'aneis',
    audiences: ['feminino', 'presentes'],
    collections: ['feminino', 'ouro', 'presentes'],
    sizes: ringSizes,
    occasions: ['aniversario', 'datas-especiais'],
    description:
      'Aro fino em ouro 18K desenhado para acompanhar um solitário ou uma aliança, sem competir com a peça principal.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Acabamento', value: 'Polido' },
      { label: 'Largura', value: 'A confirmar (mm)' },
    ],
    images: gallery('anel-aparador', 'Anel Aparador', 'ouro 18K'),
    keywords: ['anel', 'aparador', 'ouro', 'feminino'],
    isPlaceholder: true,
  },
  {
    slug: 'anel-sello-prata-925',
    name: 'Anel Sello',
    tagline: 'Face plana, leitura direta.',
    material: 'Prata 925',
    metal: 'prata',
    price: 89000,
    category: 'aneis',
    audiences: ['masculino'],
    collections: ['masculino', 'prata'],
    sizes: ringSizes,
    description:
      'Anel em prata 925 com face plana e aresta definida — superfície pronta para gravação ou para permanecer limpa.',
    details: [
      { label: 'Material', value: 'Prata 925' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Acabamento', value: 'Polido' },
      { label: 'Gravação', value: 'Disponível — consultar' },
    ],
    images: gallery('anel-sello', 'Anel Sello', 'prata 925'),
    keywords: ['anel', 'prata', 'masculino', 'gravação'],
    isPlaceholder: true,
  },
  {
    slug: 'corrente-cartier-prata-925',
    name: 'Corrente Cartier',
    tagline: 'Elos alongados, ritmo regular.',
    material: 'Prata 925',
    metal: 'prata',
    price: 129000,
    category: 'correntes',
    audiences: ['masculino', 'feminino'],
    collections: ['masculino', 'feminino', 'prata', 'novidades'],
    sizes: chainLengths,
    badge: 'Novidade',
    description:
      'Corrente em prata 925 de elos alongados, com espaçamento regular que mantém o desenho legível a distância.',
    details: [
      { label: 'Material', value: 'Prata 925' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Espessura', value: 'A confirmar (mm)' },
      { label: 'Fecho', value: 'Mosquetão' },
    ],
    images: gallery('corrente-cartier', 'Corrente Cartier', 'prata 925'),
    keywords: ['corrente', 'prata', 'cartier'],
    isPlaceholder: true,
  },
  {
    slug: 'cordao-grumet-prata-925',
    name: 'Cordão Grumet',
    tagline: 'Elo torcido, brilho em duas direções.',
    material: 'Prata 925',
    metal: 'prata',
    price: 149000,
    category: 'cordoes',
    audiences: ['masculino'],
    collections: ['masculino', 'prata'],
    sizes: chainLengths,
    description:
      'Cordão grumet em prata 925 com elos torcidos e polimento alto — a malha reflete a luz em dois planos.',
    details: [
      { label: 'Material', value: 'Prata 925' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Espessura', value: 'A confirmar (mm)' },
      { label: 'Fecho', value: 'Mosquetão reforçado' },
    ],
    images: gallery('cordao-grumet', 'Cordão Grumet', 'prata 925'),
    keywords: ['cordão', 'grumet', 'prata'],
    isPlaceholder: true,
  },
  {
    slug: 'pulseira-veneziana-prata-925',
    name: 'Pulseira Veneziana',
    tagline: 'Fina, discreta, contínua.',
    material: 'Prata 925',
    metal: 'prata',
    price: 79000,
    category: 'pulseiras',
    audiences: ['feminino', 'presentes'],
    collections: ['feminino', 'prata', 'presentes'],
    sizes: braceletSizes,
    occasions: ['aniversario', 'datas-especiais'],
    description:
      'Pulseira veneziana em prata 925 de malha fina, com caimento fluido e fecho discreto.',
    details: [
      { label: 'Material', value: 'Prata 925' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Espessura', value: 'A confirmar (mm)' },
      { label: 'Fecho', value: 'Mosquetão' },
    ],
    images: gallery('pulseira-veneziana', 'Pulseira Veneziana', 'prata 925'),
    keywords: ['pulseira', 'prata', 'presente'],
    isPlaceholder: true,
  },
  {
    slug: 'colar-medalha-prata-925',
    name: 'Colar Medalha',
    tagline: 'Superfície plana, luz difusa.',
    material: 'Prata 925',
    metal: 'prata',
    price: 119000,
    category: 'colares',
    audiences: ['feminino', 'presentes'],
    collections: ['feminino', 'prata', 'presentes'],
    sizes: ['45 cm', '50 cm'],
    occasions: ['datas-especiais', 'pedido-de-namoro'],
    description:
      'Colar em prata 925 com medalha circular de superfície plana — base ideal para gravação de data ou inicial.',
    details: [
      { label: 'Material', value: 'Prata 925' },
      { label: 'Diâmetro da medalha', value: 'A confirmar (mm)' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Gravação', value: 'Disponível — consultar' },
    ],
    images: gallery('colar-medalha', 'Colar Medalha', 'prata 925'),
    keywords: ['colar', 'medalha', 'prata', 'presente', 'gravação'],
    isPlaceholder: true,
  },
  {
    slug: 'anel-noivado-halo-ouro-18k',
    name: 'Anel de Noivado Halo',
    tagline: 'Um halo fecha a composição.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 689000,
    category: 'noivado',
    audiences: ['casamento', 'feminino'],
    collections: ['casamento', 'ouro', 'novidades'],
    sizes: ringSizes,
    occasions: ['premium', 'pedido-de-casamento'],
    badge: 'Edição limitada',
    description:
      'Anel de noivado em ouro 18K com pedra central circundada por halo, elevando a leitura de luz da peça.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Pedra central', value: 'A confirmar' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Acabamento', value: 'Polido' },
    ],
    images: gallery('anel-noivado-halo', 'Anel de Noivado Halo', 'ouro 18K'),
    keywords: ['noivado', 'anel', 'halo', 'pedido de casamento'],
    isPlaceholder: true,
  },
  {
    slug: 'corrente-figaro-ouro-18k',
    name: 'Corrente Figaro',
    tagline: 'Alternância de elos, cadência própria.',
    material: 'Ouro 18K',
    metal: 'ouro',
    price: 639000,
    category: 'correntes',
    audiences: ['masculino', 'presentes'],
    collections: ['masculino', 'ouro', 'presentes'],
    sizes: chainLengths,
    occasions: ['premium', 'datas-especiais'],
    description:
      'Corrente figaro em ouro 18K com alternância de elos curtos e longos — desenho reconhecível, acabamento espelhado.',
    details: [
      { label: 'Material', value: 'Ouro 18K' },
      { label: 'Peso', value: 'A confirmar (g)' },
      { label: 'Espessura', value: 'A confirmar (mm)' },
      { label: 'Fecho', value: 'Mosquetão' },
    ],
    images: gallery('corrente-figaro', 'Corrente Figaro', 'ouro 18K'),
    keywords: ['corrente', 'figaro', 'ouro', 'presente'],
    isPlaceholder: true,
  },
];

/**
 * Cada peça herda dois conjuntos de fotografia, usados enquanto o shot
 * próprio não existe: primeiro o da sua categoria (`categorias/aneis-01`…),
 * depois o do seu metal (`materiais/ouro-01`…). Sem nenhum dos dois, vale o
 * conjunto `editorial`. É o que permite apresentar o catálogo inteiro com
 * poucas fotografias, sem repetir a mesma imagem em peças vizinhas.
 */
export const products: Product[] = catalog.map((product) => ({
  ...product,
  images: product.images.map((image) => ({
    ...image,
    pools: [`categorias/${product.category}`, `materiais/${product.metal}`],
  })),
}));

/** Peças destacadas na home, na seção “Peças selecionadas”. */
export const featuredProductSlugs = [
  'anel-signature-ouro-18k',
  'cordao-cubano-ouro-18k',
  'colar-ponto-de-luz-ouro-18k',
  'alianca-essencial-ouro-18k',
  'corrente-veneziana-ouro-18k',
  'anel-sello-prata-925',
  'pulseira-elos-ouro-18k',
  'corrente-cartier-prata-925',
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProducts(slugs: readonly string[]): Product[] {
  return slugs
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product));
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((product) => product.collections.includes(collectionSlug));
}

/** Peças relacionadas: mesmo metal, preferindo a mesma categoria. */
export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProduct(slug);
  if (!current) return [];

  const scored = products
    .filter((product) => product.slug !== slug)
    .map((product) => {
      let score = 0;
      if (product.metal === current.metal) score += 2;
      if (product.category === current.category) score += 3;
      score += product.collections.filter((c) => current.collections.includes(c)).length;
      return { product, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.product);
}
