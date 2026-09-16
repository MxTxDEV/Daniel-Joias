import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { WishlistGrid } from '@/components/product/WishlistGrid';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Favoritos',
    description: 'As peças que você salvou na Daniel Joias.',
    pathname: '/favoritos',
  }),
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Favoritos"
        title="Suas peças salvas"
        description="A seleção fica salva neste navegador. Fale com um especialista quando quiser avançar."
      />

      <section className="bg-ink pb-section-sm md:pb-section">
        <div className="shell">
          <WishlistGrid />
        </div>
      </section>
    </>
  );
}
