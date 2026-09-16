import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Figure } from '@/components/ui/Figure';
import { Prose, PendingNote } from '@/components/ui/Prose';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { brandStory } from '@/data/brand';
import { siteConfig } from '@/data/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Sobre',
  description:
    'A Daniel Joias trabalha com peças em ouro 18K e prata 925, com atendimento consultivo.',
  pathname: '/sobre',
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Início', pathname: '/' },
              { name: 'Sobre', pathname: '/sobre' },
            ]),
          ),
        }}
      />

      <PageHeader
        eyebrow={brandStory.eyebrow}
        title={
          <>
            {brandStory.titleTop}
            <span className="block italic">{brandStory.titleBottom}</span>
          </>
        }
        breadcrumbs={[{ label: 'Início', href: '/' }, { label: 'Sobre' }]}
      />

      <section className="bg-ink pb-section-sm md:pb-section">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Prose>
              {brandStory.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}

              <h2>Materiais</h2>
              <p>
                Trabalhamos com ouro 18K e prata 925. Cada peça informa o material, o acabamento e,
                quando disponível, o peso na sua própria página.
              </p>

              <h2>Atendimento</h2>
              <p>
                O atendimento é consultivo e acontece por WhatsApp — da escolha da medida à
                finalização do pedido.
              </p>
            </Prose>

            <PendingNote>
              Conteúdo institucional em aberto: história, localização, formas de pagamento e
              eventuais certificados serão publicados exatamente como fornecidos pela{' '}
              {siteConfig.name}. Nada aqui é presumido.
            </PendingNote>

            <div className="mt-14">
              <Button href="/contato" variant="outline" size="md" withArrow>
                Falar com a Daniel Joias
              </Button>
            </div>
          </Reveal>

          <Reveal variant="clip" className="lg:col-span-5 lg:col-start-8">
            <Figure
              image={brandStory.image}
              aspect="editorial"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />

            <dl className="mt-10 flex flex-col">
              {brandStory.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 border-b-hairline border-bone/10 py-5"
                >
                  <dt className="text-micro uppercase tracking-editorial text-bone/55">
                    {fact.label}
                  </dt>
                  <dd className="text-body-sm font-light text-bone/70">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
