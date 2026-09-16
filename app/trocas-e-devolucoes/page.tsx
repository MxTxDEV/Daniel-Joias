import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { siteConfig } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Trocas e Devoluções',
  description: 'Como funcionam trocas e devoluções na Daniel Joias.',
  pathname: '/trocas-e-devolucoes',
});

export default function ReturnsPage() {
  return (
    <LegalPage
      eyebrow="Institucional"
      title="Trocas e Devoluções"
      breadcrumbLabel="Trocas e Devoluções"
      pending={`Prazos, condições e procedimento de troca serão publicados exatamente como definidos pela ${siteConfig.name}. Até então, trate cada caso pelo atendimento.`}
    >
      <h2>Ajuste de medida</h2>
      <p>
        Anéis e alianças podem exigir ajuste de aro. Antes de concluir o pedido, confirme a medida
        com o atendimento — é o caminho mais simples para evitar uma troca.
      </p>

      <h2>Como solicitar</h2>
      <ul>
        <li>Fale com o atendimento informando o pedido e a peça.</li>
        <li>Mantenha a peça sem uso, com a embalagem original.</li>
        <li>Aguarde a orientação de envio ou de atendimento presencial.</li>
      </ul>
    </LegalPage>
  );
}
