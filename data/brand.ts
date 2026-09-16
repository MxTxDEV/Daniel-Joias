import type { ImageRef } from '@/types';

/**
 * Conteúdo institucional — PLACEHOLDERS EDITÁVEIS.
 *
 * Nada aqui afirma tempo de mercado, tradição, certificações ou prêmios.
 * O cliente fornece o texto real; a estrutura permanece.
 */
export const brandStory = {
  eyebrow: 'A marca',
  titleTop: 'Mais do que uma joia.',
  titleBottom: 'Uma história para carregar.',
  paragraphs: [
    'Texto institucional a ser fornecido pela Daniel Joias. Espaço destinado à apresentação da marca, à forma de trabalho e ao critério de seleção das peças.',
    'Segundo parágrafo editável. Sugestão de conteúdo: como as peças são escolhidas, como funciona o atendimento e o que o cliente pode esperar ao comprar uma joia da Daniel Joias.',
  ],
  facts: [
    { label: 'Materiais', value: 'Ouro 18K e Prata 925' },
    { label: 'Atendimento', value: 'Consultivo, por WhatsApp' },
    { label: 'Informação a definir', value: 'A ser fornecido pelo cliente' },
  ],
  image: {
    slot: 'marca/atelier',
    alt: 'Detalhe de bancada de joalheria com ferramentas e peça em ouro',
    brief: 'Bancada de joalheria, ferramentas reais, peça em ouro, luz lateral quente',
    aspect: 'editorial',
  } satisfies ImageRef,
};

export const giftOccasions = [
  {
    label: 'Para ele',
    href: '/colecoes/presentes?para=ele',
    image: {
      slot: 'presentes/para-ele',
      alt: 'Anel e corrente masculinos em ouro sobre fundo escuro',
      brief: 'Anel + corrente masculinos, still em fundo preto, luz dura lateral',
      aspect: 'portrait',
    } satisfies ImageRef,
  },
  {
    label: 'Para ela',
    href: '/colecoes/presentes?para=ela',
    image: {
      slot: 'presentes/para-ela',
      alt: 'Colar e anel femininos em ouro sobre superfície clara',
      brief: 'Colar + anel femininos, fundo off-white, luz difusa',
      aspect: 'portrait',
    } satisfies ImageRef,
  },
  {
    label: 'Aniversário',
    href: '/colecoes/presentes?ocasiao=aniversario',
    image: {
      slot: 'presentes/aniversario',
      alt: 'Joia em ouro dentro de estojo aberto',
      brief: 'Estojo aberto com joia em ouro, luz pontual, fundo escuro',
      aspect: 'portrait',
    } satisfies ImageRef,
  },
  {
    label: 'Data especial',
    href: '/colecoes/presentes?ocasiao=datas-especiais',
    image: {
      slot: 'presentes/data-especial',
      alt: 'Detalhe de joia em ouro com gravação',
      brief: 'Macro de gravação em joia de ouro, luz rasante',
      aspect: 'portrait',
    } satisfies ImageRef,
  },
  {
    label: 'Pedido de namoro',
    href: '/colecoes/presentes?ocasiao=pedido-de-namoro',
    image: {
      slot: 'presentes/pedido-de-namoro',
      alt: 'Anel delicado em ouro segurado entre os dedos',
      brief: 'Anel delicado entre dedos, luz natural, fundo neutro desfocado',
      aspect: 'portrait',
    } satisfies ImageRef,
  },
  {
    label: 'Pedido de casamento',
    href: '/colecoes/casamento?categoria=noivado',
    image: {
      slot: 'presentes/pedido-de-casamento',
      alt: 'Anel de noivado em ouro 18K em estojo de veludo',
      brief: 'Anel de noivado em estojo de veludo, macro, luz de estúdio',
      aspect: 'portrait',
    } satisfies ImageRef,
  },
];

/** Grid social — substituir pelos posts reais do @danieljoias. */
export const instagramPosts: ImageRef[] = [
  {
    slot: 'instagram/01',
    alt: 'Publicação do Instagram da Daniel Joias — anel em ouro 18K',
    brief: 'Post 1 — anel em ouro, still editorial',
    aspect: 'square',
  },
  {
    slot: 'instagram/02',
    alt: 'Publicação do Instagram da Daniel Joias — corrente em ouro',
    brief: 'Post 2 — corrente em ouro em uso',
    aspect: 'portrait',
  },
  {
    slot: 'instagram/03',
    alt: 'Publicação do Instagram da Daniel Joias — detalhe de aliança',
    brief: 'Post 3 — macro de aliança',
    aspect: 'square',
  },
  {
    slot: 'instagram/04',
    alt: 'Publicação do Instagram da Daniel Joias — peça em prata 925',
    brief: 'Post 4 — peça em prata, fundo off-white',
    aspect: 'square',
  },
  {
    slot: 'instagram/05',
    alt: 'Publicação do Instagram da Daniel Joias — joia em uso',
    brief: 'Post 5 — joia em uso, luz natural',
    aspect: 'portrait',
  },
  {
    slot: 'instagram/06',
    alt: 'Publicação do Instagram da Daniel Joias — composição de peças',
    brief: 'Post 6 — composição de 3 peças',
    aspect: 'square',
  },
];
