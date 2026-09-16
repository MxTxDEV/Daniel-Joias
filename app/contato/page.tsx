import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { PendingNote } from '@/components/ui/Prose';
import { InstagramIcon, WhatsappIcon } from '@/components/ui/Icons';
import { siteConfig } from '@/data/site';
import { whatsappLink } from '@/lib/whatsapp';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contato',
  description: 'Fale com a Daniel Joias por WhatsApp, Instagram ou e-mail.',
  pathname: '/contato',
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Início', pathname: '/' },
              { name: 'Contato', pathname: '/contato' },
            ]),
          ),
        }}
      />

      <PageHeader
        eyebrow="Atendimento"
        title={
          <>
            Fale com um
            <span className="block italic">especialista.</span>
          </>
        }
        description="Medidas, acabamentos, disponibilidade e pedidos — o atendimento é direto, sem formulários."
        breadcrumbs={[{ label: 'Início', href: '/' }, { label: 'Contato' }]}
      />

      <section className="bg-ink pb-section-sm md:pb-section">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <ul className="flex flex-col">
              <li className="border-t-hairline border-bone/10 py-8">
                <p className="text-micro uppercase tracking-editorial text-bone/55">WhatsApp</p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-3 font-display text-display-xs font-light text-bone transition-colors duration-400 hover:text-gold"
                >
                  <WhatsappIcon size={16} />
                  Iniciar conversa
                </a>
                {siteConfig.whatsapp.isPlaceholder ? (
                  <p className="mt-4 text-[0.625rem] uppercase tracking-editorial text-bone/50">
                    Número a configurar em NEXT_PUBLIC_WHATSAPP_NUMBER
                  </p>
                ) : null}
              </li>

              <li className="border-t-hairline border-bone/10 py-8">
                <p className="text-micro uppercase tracking-editorial text-bone/55">Instagram</p>
                <a
                  href={siteConfig.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-3 font-display text-display-xs font-light text-bone transition-colors duration-400 hover:text-gold"
                >
                  <InstagramIcon size={16} />
                  {siteConfig.social.instagram.handle}
                </a>
              </li>

              <li className="border-y-hairline border-bone/10 py-8">
                <p className="text-micro uppercase tracking-editorial text-bone/55">E-mail</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-4 inline-block font-display text-display-xs font-light text-bone transition-colors duration-400 hover:text-gold"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7">
            <h2 className="font-display text-display-xs font-light text-bone md:text-display-sm">
              Endereço e horários
            </h2>
            <PendingNote>
              Endereço, horários de atendimento e demais canais serão publicados quando fornecidos
              pela {siteConfig.name}.
            </PendingNote>

            <div className="mt-14">
              <Button href={whatsappLink()} external variant="gold" size="md" withArrow>
                Falar agora
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
