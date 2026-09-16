import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { siteConfig } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Política de Privacidade',
  description: 'Como a Daniel Joias trata os dados de quem navega neste site.',
  pathname: '/politica-de-privacidade',
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Institucional"
      title="Política de Privacidade"
      breadcrumbLabel="Política de Privacidade"
    >
      <h2>O que este site armazena</h2>
      <p>
        A navegação neste site não exige cadastro. Para que a sua sacola e a sua lista de favoritos
        permaneçam disponíveis entre visitas, as seleções são guardadas localmente no seu próprio
        navegador (armazenamento local). Esses dados não são enviados para servidores da{' '}
        {siteConfig.name} e podem ser apagados a qualquer momento ao limpar os dados do navegador.
      </p>

      <h2>Contato por WhatsApp</h2>
      <p>
        Ao iniciar uma conversa pelos botões de atendimento, você é direcionado ao WhatsApp. A
        partir daí, o tratamento dos dados segue as políticas da plataforma e as informações que
        você decidir compartilhar no atendimento.
      </p>

      <h2>Cookies e medição</h2>
      <p>
        Este site não instala cookies de publicidade. Caso ferramentas de medição de audiência sejam
        adotadas, esta política será atualizada antes da ativação.
      </p>

      <h2>Seus direitos</h2>
      <p>
        Você pode solicitar informações sobre os seus dados, correção ou exclusão pelos canais de
        atendimento.
      </p>
    </LegalPage>
  );
}
