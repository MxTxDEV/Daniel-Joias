/**
 * Configuração central da marca.
 *
 * Tudo que o cliente precisa ajustar (WhatsApp, redes, domínio, avisos)
 * fica neste arquivo — nenhum desses valores deve ser escrito direto em
 * componentes.
 */
export const siteConfig = {
  name: 'Daniel Joias',
  legalName: 'Daniel Joias',
  tagline: 'Joias para momentos que permanecem.',
  title: 'Daniel Joias | Joias em Ouro e Prata',
  description:
    'Descubra anéis, correntes, cordões, alianças e joias em ouro e prata na Daniel Joias.',
  /** Ajustar para o domínio oficial antes do lançamento. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://danieljoias.com.br',
  locale: 'pt-BR',
  currency: 'BRL',

  /** WhatsApp em formato internacional, apenas dígitos. */
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5500000000000',
    /** Exibido enquanto o número oficial não for configurado. */
    isPlaceholder: !process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    greeting: 'Olá, Daniel Joias. Gostaria de falar com um especialista.',
  },

  social: {
    instagram: {
      handle: '@danieljoias',
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/danieljoias',
    },
  },

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contato@danieljoias.com.br',
  },

  /**
   * Catálogo, preços, medidas e depoimentos ainda são registros de
   * estrutura. Mantenha `true` até que o catálogo oficial seja carregado —
   * o site sinaliza isso de forma discreta ao visitante.
   */
  catalogIsPlaceholder: true,
} as const;

export type SiteConfig = typeof siteConfig;
