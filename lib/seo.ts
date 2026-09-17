import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { priceToNumber } from '@/lib/format';
import { resolveImage, resolveRef } from '@/lib/images';
import type { Product } from '@/types';

export function absoluteUrl(pathname = '/'): string {
  // Fotografias remotas já vêm com o endereço completo.
  if (/^https?:\/\//.test(pathname)) return pathname;

  const base = siteConfig.url.replace(/\/$/, '');
  return `${base}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

interface MetadataInput {
  title: string;
  description: string;
  pathname: string;
  /** Slot de imagem para Open Graph, quando houver fotografia disponível. */
  imageSlot?: string;
}

/** Monta metadata consistente (canonical, Open Graph, Twitter). */
export function buildMetadata({
  title,
  description,
  pathname,
  imageSlot,
}: MetadataInput): Metadata {
  const url = absoluteUrl(pathname);
  // Quando a fotografia oficial existe, ela é a imagem de compartilhamento;
  // caso contrário vale a imagem gerada em app/opengraph-image.tsx.
  const photo = imageSlot ? resolveImage(imageSlot) : null;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url,
      siteName: siteConfig.name,
      title,
      description,
      ...(photo
        ? { images: [{ url: absoluteUrl(photo), alt: title }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(photo ? { images: [absoluteUrl(photo)] } : {}),
    },
  };
}

/* ------------------------------------------------------------------ *
 * Dados estruturados (schema.org)
 * ------------------------------------------------------------------ */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl('/opengraph-image'),
    sameAs: [siteConfig.social.instagram.url],
    email: siteConfig.contact.email,
    currenciesAccepted: siteConfig.currency,
    areaServed: 'BR',
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'pt-BR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/busca')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Schema de produto.
 *
 * `offers` só é publicado quando o catálogo oficial estiver ativo
 * (`siteConfig.catalogIsPlaceholder === false`) — não expomos preços de
 * estrutura como se fossem preços reais.
 */
export function productSchema(product: Product) {
  const image = product.images
    .map((ref) => resolveRef(ref))
    .filter((src): src is string => Boolean(src))
    .map((src) => absoluteUrl(src));

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: absoluteUrl(`/produto/${product.slug}`),
    material: product.material,
    category: product.category,
    brand: { '@type': 'Brand', name: siteConfig.name },
  };

  if (image.length > 0) schema.image = image;

  if (!siteConfig.catalogIsPlaceholder && !product.isPlaceholder) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: siteConfig.currency,
      price: priceToNumber(product.price),
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(`/produto/${product.slug}`),
      seller: { '@type': 'Organization', name: siteConfig.name },
    };
  }

  return schema;
}

export function breadcrumbSchema(items: { name: string; pathname: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.pathname),
    })),
  };
}

export function faqSchema(entries: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}
