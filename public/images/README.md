# Fotografias — Daniel Joias

Este site foi construído para receber **fotografia real de joalheria**. Enquanto os
arquivos oficiais não existem, cada imagem é substituída por um *placeholder editorial*
que descreve o shot esperado — nada de imagem genérica, banco de imagens improvisado
ou textura gerada por IA fingindo ser uma joia.

## Como publicar uma fotografia

**Caminho recomendado — o script cuida de redimensionar e comprimir:**

1. Crie a pasta `fotos/` na raiz do projeto.
2. Jogue as fotografias lá, nomeando cada arquivo com o slot de destino:
   `hero-principal.jpg`, `colecoes-masculino.jpg`, `editorial-01.jpg`…
   (também funciona em subpastas: `fotos/hero/principal.jpg`).
3. Rode `npm run images:import`.
4. Rode `npm run build`.

O script corrige a orientação, redimensiona para a largura que o site usa,
remove os metadados, converte para AVIF e grava em `public/images/`.
A pasta `fotos/` não vai para o repositório.

**Caminho manual:** salve o arquivo direto em `public/images/<slot>.<ext>`
(`.avif`, `.webp`, `.jpg`, `.png`; para a logo, também `.svg`) e rode
`npm run images:manifest`.

**Subindo pela interface do GitHub** (onde não dá para criar subpastas): use o
nome plano com hífen no lugar da barra. `hero-principal.jpg` vale como
`hero/principal`, `colecoes-masculino.jpg` vale como `colecoes/masculino`, e
assim por diante. Arquivos sem prefixo de pasta, como `editorial-01.jpg`,
já ficam no lugar certo.

## Poucas fotos preenchem o site inteiro

Nenhum slot precisa existir para o site ficar apresentável. Quando a
fotografia própria de um slot não existe, a resolução segue esta ordem:

1. o slot exato — ex.: `produtos/anel-signature-01`
2. o conjunto da categoria da peça — `categorias/aneis-01`, `-02`, `-03`…
3. o conjunto do metal — `materiais/ouro-01`…, `materiais/prata-01`…
4. o conjunto genérico — `editorial-01`, `editorial-02`…
5. o placeholder editorial, com o briefing do shot

A escolha dentro de um conjunto é estável: a mesma peça mostra sempre a mesma
fotografia, e peças diferentes se distribuem pelo conjunto em vez de repetir a
mesma imagem lado a lado.

Na prática: **8 a 12 arquivos `editorial-NN` já deixam o site inteiro
fotografado**, inclusive o catálogo. Depois é só ir substituindo pelos shots
definitivos, slot por slot, sem tocar em código.

Pronto: o `next/image` passa a servir a fotografia com AVIF/WebP, `srcset` responsivo e
lazy loading. Nenhum componente precisa ser alterado.

> O manifest (`data/image-manifest.json`) é regenerado automaticamente em `predev`
> e `prebuild`. Não edite o arquivo à mão.

## Especificação técnica

| Item | Recomendação |
| --- | --- |
| Resolução | lado maior entre 2400px e 3000px |
| Proporções | 4:5 (produto), 3:4 (coleção), 21:9 (hero e faixas cinematográficas), 1:1 (Instagram) |
| Cor | sRGB, sem perfil exótico |
| Fundo | preto `#080808`–`#111111` para as peças em ouro; off-white `#F5F2EC` para prata |
| Luz | estúdio, reflexos naturais do metal, sem HDR agressivo |
| Peso | comprima antes de subir (AVIF/WebP ≤ 400 KB por imagem) |

A imagem `hero/principal` é a **LCP** do site: entregue-a otimizada e, de preferência,
em AVIF.

## Slots

### Marca

| Slot | Uso |
| --- | --- |
| `marca/logo-claro` | logo oficial para fundos escuros (header, footer, menu) |
| `marca/logo-escuro` | logo oficial para fundos claros |
| `marca/atelier` | seção institucional da home e da página Sobre |

Ao salvar os dois arquivos de logo (idealmente `.svg`), o logotipo tipográfico
provisório é substituído automaticamente em todas as aplicações, sem distorção:
a altura é fixa e a largura acompanha a proporção original.

### Home e navegação

| Slot | Uso |
| --- | --- |
| `hero/principal` | fotografia de abertura (macro de anel em ouro, fundo preto) |
| `casamento/principal` | faixa cinematográfica da seção Casamento |
| `casamento/detalhe` | imagem sobreposta da seção Casamento |
| `menu/masculino`, `menu/feminino`, `menu/casamento` | destaque do mega-menu |

### Coleções

`colecoes/masculino`, `colecoes/feminino`, `colecoes/casamento`, `colecoes/presentes`,
`colecoes/ouro`, `colecoes/prata`, `colecoes/novidades`, `colecoes/mais-vendidos`

### Presentes

`presentes/para-ele`, `presentes/para-ela`, `presentes/aniversario`,
`presentes/data-especial`, `presentes/pedido-de-namoro`, `presentes/pedido-de-casamento`

### Instagram

`instagram/01` … `instagram/06`

### Produtos

Cada peça usa cinco ângulos: `produtos/<slug>-01` a `produtos/<slug>-05`.

1. `-01` foto principal
2. `-02` macro do acabamento
3. `-03` vista lateral
4. `-04` peça em uso
5. `-05` detalhe do polimento

Slugs do catálogo atual (de estrutura — serão substituídos pelo catálogo oficial):

```
anel-signature            anel-solitario          alianca-essencial
par-de-aliancas-classico  corrente-veneziana      cordao-cubano
colar-ponto-de-luz        pulseira-elos           anel-aparador
anel-sello                corrente-cartier        cordao-grumet
pulseira-veneziana        colar-medalha           anel-noivado-halo
corrente-figaro
```

Exemplo: `public/images/produtos/anel-signature-01.avif`

## Texto alternativo

O `alt` de cada imagem vive junto do slot, em `data/` — descreva a peça, o material e o
contexto. Ao trocar a fotografia, revise o `alt` correspondente.
