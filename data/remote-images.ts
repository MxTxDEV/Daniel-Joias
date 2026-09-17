/**
 * FOTOGRAFIAS REMOTAS — TEMPORÁRIAS.
 *
 * Imagens do Unsplash (licença livre para uso comercial) usadas para
 * apresentar a experiência enquanto a produção fotográfica da Daniel Joias
 * não acontece. Não são as peças da marca.
 *
 * Quem busca, converte para AVIF/WebP e serve com cache é o otimizador da
 * Vercel — o repositório não guarda nenhum arquivo. Um arquivo local em
 * `public/images` SEMPRE tem prioridade sobre a URL remota, então publicar a
 * foto oficial aposenta a temporária sem nenhuma outra alteração.
 *
 * Origem de cada imagem (página no Unsplash):
 *   aldDZePniqg  colar de corrente de ouro sobre superfície branca
 *   wOfSP_0MO_g  close de anel sobre superfície preta
 *   SmnqtLFnNnw  close de anel de ouro sobre superfície branca
 *   m33sWIBoLJA  par de anéis sobre a mesa
 *   WHUG4KXCbuI  duas alianças de ouro em fundo branco
 *   h4b0XnHlF2g  mão estendida com anel
 *   41PGxdWN0xo  mão segurando anel com pedra verde
 *   UktGGAIwQyQ  anel sobre tecido preto
 *   3Oh8wSikf_8  composição de joias sobre superfície brilhante
 */

/** Endpoint público de download do Unsplash: redireciona para o CDN. */
function unsplash(id: string, width: number): string {
  return `https://unsplash.com/photos/${id}/download?w=${width}`;
}

const PHOTO = {
  correnteOuroClara: 'aldDZePniqg',
  anelFundoPreto: 'wOfSP_0MO_g',
  anelOuroClaro: 'SmnqtLFnNnw',
  parDeAneis: 'm33sWIBoLJA',
  aliancasBrancas: 'WHUG4KXCbuI',
  maoComAnel: 'h4b0XnHlF2g',
  anelPedraVerde: '41PGxdWN0xo',
  anelTecidoPreto: 'UktGGAIwQyQ',
  composicaoJoias: '3Oh8wSikf_8',
} as const;

export const remoteImages: Record<string, string> = {
  // Abertura — fotografia crítica, em largura maior.
  'hero/principal': unsplash(PHOTO.anelTecidoPreto, 2560),

  // Seções cinematográficas
  'colecoes/ouro': unsplash(PHOTO.anelFundoPreto, 2560),
  'colecoes/prata': unsplash(PHOTO.anelOuroClaro, 2560),
  'casamento/principal': unsplash(PHOTO.maoComAnel, 2560),
  'casamento/detalhe': unsplash(PHOTO.aliancasBrancas, 1600),

  // Coleções — fundo escuro nas três primeiras, claro em casamento
  'colecoes/masculino': unsplash(PHOTO.anelFundoPreto, 1600),
  'colecoes/feminino': unsplash(PHOTO.correnteOuroClara, 1600),
  'colecoes/casamento': unsplash(PHOTO.parDeAneis, 1600),
  'colecoes/presentes': unsplash(PHOTO.anelPedraVerde, 1600),
  'colecoes/novidades': unsplash(PHOTO.composicaoJoias, 1600),
  'colecoes/mais-vendidos': unsplash(PHOTO.correnteOuroClara, 1600),

  // Mega-menu
  'menu/masculino': unsplash(PHOTO.anelTecidoPreto, 1200),
  'menu/feminino': unsplash(PHOTO.correnteOuroClara, 1200),
  'menu/casamento': unsplash(PHOTO.aliancasBrancas, 1200),

  // Institucional
  'marca/atelier': unsplash(PHOTO.composicaoJoias, 1600),

  // Presentes
  'presentes/para-ele': unsplash(PHOTO.anelFundoPreto, 1200),
  'presentes/para-ela': unsplash(PHOTO.correnteOuroClara, 1200),
  'presentes/aniversario': unsplash(PHOTO.composicaoJoias, 1200),
  'presentes/data-especial': unsplash(PHOTO.anelOuroClaro, 1200),
  'presentes/pedido-de-namoro': unsplash(PHOTO.anelPedraVerde, 1200),
  'presentes/pedido-de-casamento': unsplash(PHOTO.parDeAneis, 1200),

  // Instagram
  'instagram/01': unsplash(PHOTO.anelTecidoPreto, 1200),
  'instagram/02': unsplash(PHOTO.maoComAnel, 1200),
  'instagram/03': unsplash(PHOTO.aliancasBrancas, 1200),
  'instagram/04': unsplash(PHOTO.anelOuroClaro, 1200),
  'instagram/05': unsplash(PHOTO.anelPedraVerde, 1200),
  'instagram/06': unsplash(PHOTO.composicaoJoias, 1200),

  /**
   * Conjuntos usados pelo catálogo.
   * Cada peça escolhe uma variação de forma estável, então peças vizinhas na
   * grade não repetem a mesma fotografia.
   */
  'categorias/aneis-01': unsplash(PHOTO.anelFundoPreto, 1600),
  'categorias/aneis-02': unsplash(PHOTO.anelTecidoPreto, 1600),
  'categorias/aneis-03': unsplash(PHOTO.anelOuroClaro, 1600),
  'categorias/aneis-04': unsplash(PHOTO.anelPedraVerde, 1600),
  'categorias/correntes-01': unsplash(PHOTO.correnteOuroClara, 1600),
  'categorias/correntes-02': unsplash(PHOTO.composicaoJoias, 1600),
  'categorias/cordoes-01': unsplash(PHOTO.correnteOuroClara, 1600),
  'categorias/cordoes-02': unsplash(PHOTO.composicaoJoias, 1600),
  'categorias/colares-01': unsplash(PHOTO.correnteOuroClara, 1600),
  'categorias/colares-02': unsplash(PHOTO.maoComAnel, 1600),
  'categorias/pulseiras-01': unsplash(PHOTO.composicaoJoias, 1600),
  'categorias/pulseiras-02': unsplash(PHOTO.correnteOuroClara, 1600),
  'categorias/aliancas-01': unsplash(PHOTO.aliancasBrancas, 1600),
  'categorias/aliancas-02': unsplash(PHOTO.parDeAneis, 1600),
  'categorias/par-de-aliancas-01': unsplash(PHOTO.parDeAneis, 1600),
  'categorias/par-de-aliancas-02': unsplash(PHOTO.aliancasBrancas, 1600),
  'categorias/noivado-01': unsplash(PHOTO.anelPedraVerde, 1600),
  'categorias/noivado-02': unsplash(PHOTO.maoComAnel, 1600),
  'categorias/solitarios-01': unsplash(PHOTO.anelOuroClaro, 1600),
  'categorias/solitarios-02': unsplash(PHOTO.anelPedraVerde, 1600),

  // Conjunto genérico: cobre qualquer slot sem fotografia própria.
  'editorial-01': unsplash(PHOTO.anelTecidoPreto, 1600),
  'editorial-02': unsplash(PHOTO.anelFundoPreto, 1600),
  'editorial-03': unsplash(PHOTO.correnteOuroClara, 1600),
  'editorial-04': unsplash(PHOTO.anelOuroClaro, 1600),
  'editorial-05': unsplash(PHOTO.parDeAneis, 1600),
  'editorial-06': unsplash(PHOTO.aliancasBrancas, 1600),
  'editorial-07': unsplash(PHOTO.maoComAnel, 1600),
  'editorial-08': unsplash(PHOTO.anelPedraVerde, 1600),
  'editorial-09': unsplash(PHOTO.composicaoJoias, 1600),
};
