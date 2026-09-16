import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductPurchase } from '@/components/product/ProductPurchase';
import { ProductDetails } from '@/components/product/ProductDetails';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { getProduct, getRelatedProducts, products } from '@/data/products';
import { categoryLabels } from '@/lib/catalog';
import { breadcrumbSchema, buildMetadata, productSchema } from '@/lib/seo';
import { siteConfig } from '@/data/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return {};

  return buildMetadata({
    title: `${product.name} — ${product.material}`,
    description: product.description,
    pathname: `/produto/${product.slug}`,
    imageSlot: product.images[0]?.slot,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product.slug);
  const categoryLabel = categoryLabels[product.category] ?? product.category;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            productSchema(product),
            breadcrumbSchema([
              { name: 'Início', pathname: '/' },
              { name: 'Coleções', pathname: '/colecoes' },
              { name: product.name, pathname: `/produto/${product.slug}` },
            ]),
          ]),
        }}
      />

      <section className="bg-ink pb-section-sm pt-[calc(var(--header-height)+3rem)] md:pb-section md:pt-[calc(var(--header-height)+4.5rem)]">
        <div className="shell">
          <nav aria-label="Você está em" className="mb-10 md:mb-14">
            <ol className="flex flex-wrap items-center gap-3 text-micro uppercase tracking-editorial text-bone/55">
              <li>
                <Link href="/" className="transition-colors duration-400 hover:text-gold">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li>
                <Link href="/colecoes" className="transition-colors duration-400 hover:text-gold">
                  Coleções
                </Link>
              </li>
              <li aria-hidden="true">·</li>
              <li aria-current="page" className="text-bone/60">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Coluna de informações — acompanha o scroll no desktop. */}
            <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-height)+2.5rem)] lg:self-start">
              <p className="eyebrow text-gold">{categoryLabel}</p>

              <h1 className="mt-6 font-display text-display-sm font-light leading-[1.05] text-bone md:text-display-md">
                {product.name}
              </h1>

              {product.tagline ? (
                <p className="mt-5 max-w-prose text-body-sm font-light italic text-bone/60">
                  {product.tagline}
                </p>
              ) : null}

              <p className="mt-7 text-micro uppercase tracking-editorial text-bone/60">
                {product.material}
              </p>

              <ProductPurchase product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink pb-section-sm md:pb-section">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-display-xs font-light text-bone md:text-display-sm">
              Sobre a peça
            </h2>
            <p className="mt-8 max-w-prose text-body-sm font-light leading-relaxed text-bone/70">
              {product.description}
            </p>
            {product.isPlaceholder ? (
              <p className="mt-8 max-w-prose text-[0.625rem] uppercase leading-relaxed tracking-editorial text-bone/50">
                Registro de estrutura: descrição, peso e medidas serão substituídos pelas
                informações oficiais da {siteConfig.name}.
              </p>
            ) : null}
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <ProductDetails product={product} />
          </Reveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t-hairline border-bone/10 bg-ink py-section-sm md:py-section">
          <div className="shell">
            <SectionHeading eyebrow="Também pode interessar" title="Peças relacionadas" />
            <ProductGrid products={related} className="mt-14 md:mt-16" />
          </div>
        </section>
      ) : null}
    </>
  );
}
