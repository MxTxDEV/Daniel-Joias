import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { siteConfig } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Termos de Uso',
  description: 'Condições de uso do site da Daniel Joias.',
  pathname: '/termos',
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Institucional"
      title="Termos de Uso"
      breadcrumbLabel="Termos"
      pending={`Condições comerciais — pagamento, prazos, garantia e responsabilidades — serão publicadas conforme definido pela ${siteConfig.name}.`}
    >
      <h2>Uso do site</h2>
      <p>
        O conteúdo deste site — textos, fotografias e identidade visual — pertence à{' '}
        {siteConfig.name} e não pode ser reproduzido sem autorização.
      </p>

      <h2>Peças e informações</h2>
      <p>
        Materiais, medidas e acabamentos são informados na página de cada peça. Por se tratar de
        joalheria, variações mínimas de peso e acabamento podem ocorrer entre unidades.
      </p>

      <h2>Pedidos</h2>
      <p>
        Os pedidos são conduzidos por atendimento direto. A confirmação de disponibilidade, valores
        e prazos acontece durante a conversa com o especialista.
      </p>
    </LegalPage>
  );
}
