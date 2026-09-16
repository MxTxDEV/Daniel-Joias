import type { Collection } from '@/types';

/**
 * Coleções editoriais. Cada slug responde por uma rota /colecoes/[slug].
 * As imagens seguem o sistema de slots (ver public/images/README.md).
 */
export const collections: Collection[] = [
  {
    slug: 'masculino',
    title: 'Masculino',
    eyebrow: 'Coleção',
    description: 'Anéis, correntes, cordões e pulseiras de presença discreta.',
    intro:
      'Peças de linhas firmes, acabamento preciso e peso equilibrado — pensadas para o uso diário e para as ocasiões que pedem presença.',
    image: {
      slot: 'colecoes/masculino',
      alt: 'Anel masculino em ouro 18K com acabamento polido sobre fundo escuro',
      brief: 'Anel masculino em ouro 18K, macro 100mm, fundo preto, luz lateral dura',
      aspect: 'portrait',
    },
    theme: 'dark',
  },
  {
    slug: 'feminino',
    title: 'Feminino',
    eyebrow: 'Coleção',
    description: 'Anéis, correntes, colares e pulseiras de desenho essencial.',
    intro:
      'Desenho essencial e proporções delicadas. Joias que se sobrepõem, se combinam e acompanham o corpo sem pedir licença.',
    image: {
      slot: 'colecoes/feminino',
      alt: 'Colar feminino em ouro 18K sobre pele, luz natural',
      brief: 'Colar fino em ouro 18K sobre pele, luz natural difusa, foco no fecho',
      aspect: 'portrait',
    },
    theme: 'dark',
  },
  {
    slug: 'casamento',
    title: 'Casamento',
    eyebrow: 'Coleção',
    description: 'Alianças, anéis de noivado e solitários.',
    intro:
      'Alianças e anéis pensados para representar um momento único — e para atravessar os anos que vêm depois dele.',
    image: {
      slot: 'colecoes/casamento',
      alt: 'Par de alianças em ouro 18K sobre superfície clara',
      brief: 'Par de alianças em ouro 18K, macro, fundo off-white, sombra suave',
      aspect: 'portrait',
    },
    theme: 'light',
  },
  {
    slug: 'presentes',
    title: 'Presentes',
    eyebrow: 'Coleção',
    description: 'Seleções para ele, para ela e para datas que merecem registro.',
    intro:
      'Um presente que permanece. Peças escolhidas pela durabilidade do material e pela clareza do desenho.',
    image: {
      slot: 'colecoes/presentes',
      alt: 'Joia em ouro sobre embalagem de veludo escuro',
      brief: 'Joia em ouro dentro de estojo de veludo escuro, luz de estúdio pontual',
      aspect: 'portrait',
    },
    theme: 'dark',
  },
  {
    slug: 'ouro',
    title: 'Ouro',
    eyebrow: 'Matéria-prima',
    description: 'Ouro 18K — reflexo profundo, peso real, permanência.',
    intro:
      'Uma matéria-prima que atravessa gerações. Trabalhamos o ouro 18K em peças de acabamento polido, acetinado e escovado.',
    image: {
      slot: 'colecoes/ouro',
      alt: 'Macro de superfície de joia em ouro 18K com reflexos naturais',
      brief: 'Macro extremo de superfície de ouro 18K, reflexos naturais, fundo preto',
      aspect: 'wide',
    },
    theme: 'dark',
  },
  {
    slug: 'prata',
    title: 'Prata',
    eyebrow: 'Matéria-prima',
    description: 'Prata 925 — elegância em sua forma mais essencial.',
    intro:
      'A prata 925 responde à luz de outro modo: mais fria, mais silenciosa, igualmente precisa no acabamento.',
    image: {
      slot: 'colecoes/prata',
      alt: 'Anel em prata 925 sobre superfície off-white',
      brief: 'Anel em prata 925 sobre papel off-white, luz difusa, sombra longa',
      aspect: 'wide',
    },
    theme: 'light',
  },
  {
    slug: 'novidades',
    title: 'Novidades',
    eyebrow: 'Seleção',
    description: 'As peças mais recentes da Daniel Joias.',
    image: {
      slot: 'colecoes/novidades',
      alt: 'Composição de joias novas em ouro e prata',
      brief: 'Composição de 3 peças (ouro e prata) em fundo preto, still editorial',
      aspect: 'portrait',
    },
    theme: 'dark',
  },
  {
    slug: 'mais-vendidos',
    title: 'Mais vendidos',
    eyebrow: 'Seleção',
    description: 'As escolhas mais frequentes de quem já é cliente.',
    image: {
      slot: 'colecoes/mais-vendidos',
      alt: 'Corrente em ouro 18K disposta em curva sobre fundo escuro',
      brief: 'Corrente em ouro 18K em curva contínua, fundo preto, luz rasante',
      aspect: 'portrait',
    },
    theme: 'dark',
  },
];

/** Coleções exibidas na seção “Nossas coleções” da home. */
export const homeCollections = ['masculino', 'feminino', 'casamento', 'presentes'] as const;

export function getCollection(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}
