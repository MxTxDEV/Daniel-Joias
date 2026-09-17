# Daniel Joias

Site oficial da **Daniel Joias** — joalheria de peças em ouro 18K e prata 925.

Não é uma landing page: é a base de uma experiência de e-commerce premium, preparada
para receber catálogo real, checkout, WhatsApp, Instagram e integrações futuras.

```
Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion
```

## Começando

```bash
npm install
npm run dev     # http://localhost:3000
```

| Script | O que faz |
| --- | --- |
| `npm run dev` | ambiente de desenvolvimento |
| `npm run build` | build de produção |
| `npm run start` | serve o build |
| `npm run lint` | ESLint (config do Next) |
| `npm run typecheck` | TypeScript sem emissão |
| `npm run images:manifest` | remapeia `public/images` (roda sozinho em dev/build) |

Copie `.env.example` para `.env.local` e preencha o número do WhatsApp, o domínio e as
redes antes de publicar.

## Arquitetura

```
app/                 rotas (App Router), metadata, sitemap, robots, OG
components/
  layout/            Header, MegaMenu, MobileMenu, Footer, PageHeader, Logo
  home/              Hero, Collections, Gold, Silver, Wedding, Gift, Brand, Instagram…
  product/           ProductCard, ProductGrid, Gallery, Lightbox, Purchase, Details
  cart/  search/  ui/
data/                catálogo, coleções, navegação, conteúdo institucional
lib/                 seo, motion, busca, catálogo, imagens, formatação, estado da loja
hooks/               scroll, media query, overlay (foco + Esc), parallax
types/               contratos de Product, Collection, ImageRef…
```

Regra do projeto: **componentes não carregam conteúdo**. Texto, preço, imagem e
navegação vêm de `data/`; estilo vem dos tokens; comportamento vem de `lib/` e `hooks/`.

## Design system

Todos os valores visuais estão em `tailwind.config.ts` (cores, tipografia, espaçamentos,
raios, sombras, breakpoints, easings) e em `app/globals.css` (tokens de motion lidos em
runtime). Nada de valor arbitrário espalhado pelos componentes.

| Token | Valor |
| --- | --- |
| Preto | `#080808` / `#111111` |
| Off-white | `#F5F2EC` |
| Dourado | `#C6A15B` · claro `#D8BD7A` · escuro `#8F6D32` |
| Prata | `#BFC0C2` |
| Serifada | Cormorant Garamond (títulos editoriais) |
| Sans | Inter (interface, labels em caixa alta espaçada) |

O dourado é **accent**: linhas, ícones, hover, indicadores — nunca superfície.

## O que ainda depende do cliente

Nada foi inventado. Os pontos abaixo estão marcados no código e sinalizados de forma
discreta na interface (rodapé, página de produto, seção de depoimentos):

- **Fotografias** — ver [`public/images/README.md`](public/images/README.md).
  Cada imagem tem um *slot*; ao salvar o arquivo, ela entra no lugar do placeholder.
- **Logo oficial** — salve `marca/logo-claro` e `marca/logo-escuro`; o header, o footer,
  o menu e o favicon passam a usá-la automaticamente, sem distorcer a arte.
- **Catálogo** — `data/products.ts` traz registros de estrutura (`isPlaceholder: true`)
  para definir rotas, filtros, busca, sacola e SEO. Substitua pelos dados reais (ou
  aponte para um CMS/API mantendo o mesmo shape) e ajuste `catalogIsPlaceholder` em
  `data/site.ts` para `false`. Enquanto isso, o schema.org de produto não publica preço.
- **Depoimentos** — `data/testimonials.ts` reserva o espaço editorial; nenhum depoimento
  foi escrito.
- **História da marca, endereço, prazos e políticas** — `data/brand.ts`, `data/faq.ts` e
  as páginas institucionais trazem placeholders explícitos.

## Decisões de implementação

**Motion.** Movimento lento e preciso: apenas `opacity`, `transform` e `clip-path`,
entre 400ms e 1200ms, com easings do design system. `prefers-reduced-motion` desliga
praticamente todo o motion (CSS e Framer Motion). Sem JavaScript, os reveals não
escondem conteúdo (`@media (scripting: none)`).

**Performance.** Fontes auto-hospedadas via `next/font`; AVIF/WebP e `srcset` pelo
`next/image`; `priority` apenas na fotografia do hero; proporção reservada em todo
container de imagem (sem layout shift); páginas de coleção e produto pré-renderizadas.
Medido no build de produção (desktop, sem throttling): **CLS 0** em todas as rotas,
FCP ~0,15s e LCP ~1,0s na home. A entrada do hero anima apenas `scale` — animar
`opacity` a partir de zero adiaria o LCP, porque o navegador só conta o elemento
depois que ele fica visível.

**Erros.** `app/error.tsx` (fronteira por rota, com “tentar novamente” e atendimento)
e `app/global-error.tsx` (raiz, sem depender de layout, fontes ou Tailwind), além do
404 em `app/not-found.tsx`.

**Cabeçalhos.** `next.config.mjs` aplica `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy` e HSTS em todas as rotas. Uma
Content-Security-Policy ainda **não** foi adicionada: para não quebrar os scripts
inline do Next ela precisa de nonce por requisição via middleware — é uma etapa
própria, a fazer antes de abrir o domínio oficial.

**Acessibilidade.** Navegação por teclado em todos os overlays (foco preso, Esc fecha,
foco devolvido), foco visível em dourado, `aria-label`/`aria-expanded`/`aria-pressed`
nos controles, skip link, contraste conferido nas superfícies escura e clara.

**SEO.** Canonical por rota, Open Graph e Twitter, `sitemap.xml`, `robots.txt`,
dados estruturados de `JewelryStore`, `WebSite`, `BreadcrumbList`, `Product` e `FAQPage`,
URLs amigáveis em português.

**Sacola e favoritos.** Estado em contexto React persistido em `localStorage`
(`lib/shop/ShopContext.tsx`). A finalização hoje acontece com um especialista pelo
WhatsApp; trocar esse CTA por um checkout próprio não exige mudar os componentes.
