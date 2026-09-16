import type { MetadataRoute } from 'next';
import { collections } from '@/data/collections';
import { products } from '@/data/products';
import { absoluteUrl } from '@/lib/seo';

const staticRoutes = [
  '/',
  '/colecoes',
  '/busca',
  '/favoritos',
  '/sobre',
  '/contato',
  '/faq',
  '/politica-de-privacidade',
  '/termos',
  '/trocas-e-devolucoes',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: route === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '/' ? 1 : 0.6,
    })),
    ...collections.map((collection) => ({
      url: absoluteUrl(`/colecoes/${collection.slug}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/produto/${product.slug}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
