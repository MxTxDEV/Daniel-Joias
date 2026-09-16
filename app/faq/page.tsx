import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { faq } from '@/data/faq';
import { whatsappLink } from '@/lib/whatsapp';
import { breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description: 'Dúvidas frequentes sobre peças, medidas, materiais e atendimento.',
  pathname: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqSchema(faq),
            breadcrumbSchema([
              { name: 'Início', pathname: '/' },
              { name: 'FAQ', pathname: '/faq' },
            ]),
          ]),
        }}
      />

      <PageHeader
        eyebrow="FAQ"
        title="Dúvidas frequentes"
        breadcrumbs={[{ label: 'Início', href: '/' }, { label: 'FAQ' }]}
      />

      <section className="bg-ink pb-section-sm md:pb-section">
        <div className="shell max-w-content">
          <div className="flex flex-col">
            {faq.map((entry, index) => (
              <Reveal key={entry.question} delay={index * 0.04}>
                <article className="border-b-hairline border-bone/10 py-10 first:pt-0">
                  <h2 className="font-display text-display-xs font-light text-bone">
                    {entry.question}
                  </h2>
                  <p className="mt-5 max-w-prose text-body-sm font-light leading-relaxed text-bone/65">
                    {entry.answer}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <Button href={whatsappLink()} external variant="outline" size="md" withArrow>
              Não encontrou sua dúvida? Fale com um especialista
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
