/**
 * FOTOGRAFIAS REMOTAS — TEMPORÁRIAS.
 *
 * Imagens hospedadas fora do projeto, usadas para apresentar a experiência
 * enquanto a produção fotográfica da Daniel Joias não acontece. Quem busca e
 * otimiza cada arquivo é o otimizador da Vercel (AVIF/WebP, srcset, cache),
 * então o repositório não engorda.
 *
 * Regras:
 *   · a chave é o slot (mesma nomenclatura de public/images/README.md);
 *   · um arquivo local em public/images SEMPRE tem prioridade sobre a URL
 *     remota — basta publicar a foto oficial para a remota sair de cena;
 *   · o domínio precisa estar liberado em `images.remotePatterns`
 *     (next.config.mjs);
 *   · nada aqui é fotografia das peças reais da marca. Substituir antes de
 *     tratar o catálogo como oficial.
 */
export const remoteImages: Record<string, string> = {
  // Preenchido quando as URLs forem definidas.
  // Ex.: 'editorial-01': 'https://images.unsplash.com/photo-...',
};
