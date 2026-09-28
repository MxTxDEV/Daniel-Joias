/**
 * FOTOGRAFIAS REMOTAS — mecanismo disponível, sem URLs ativas no momento.
 *
 * Um teste em produção confirmou que os links de download do Unsplash usados
 * anteriormente aqui não são servidos pelo otimizador de imagem (a Vercel
 * também não alcança aquele endpoint). O site está atualmente ilustrado com
 * imagens geradas por IA, salvas localmente em `public/images` — ver o aviso
 * em `public/images/README.md`.
 *
 * Este arquivo continua funcional: qualquer slot listado aqui com uma URL
 * `https://` de um domínio liberado em `images.remotePatterns`
 * (next.config.mjs) é buscado e otimizado pela Vercel, exatamente como
 * antes. Um arquivo local no mesmo slot sempre tem prioridade.
 */
export const remoteImages: Record<string, string> = {};
