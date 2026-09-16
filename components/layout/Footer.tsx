import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';
import { InstagramIcon, WhatsappIcon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { footerNavigation } from '@/data/navigation';
import { siteConfig } from '@/data/site';
import { whatsappLink } from '@/lib/whatsapp';

/** Resolve os links especiais de atendimento. */
function resolveHref(href: string): { href: string; external: boolean } {
  if (href === 'whatsapp') return { href: whatsappLink(), external: true };
  if (href === 'instagram') return { href: siteConfig.social.instagram.url, external: true };
  return { href, external: false };
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-hairline border-bone/10 bg-ink">
      <div className="shell py-section-sm md:py-section">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5 lg:col-span-4">
            {/* Em fundo escuro é usada a versão clara da logo. */}
            <Logo tone="light" size="lg" />
            <p className="mt-8 max-w-measure font-display text-display-xs font-light italic leading-snug text-bone/65">
              {siteConfig.tagline}
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-3 text-micro uppercase tracking-editorial text-bone/60 transition-colors duration-400 hover:text-gold"
              >
                <WhatsappIcon size={14} />
                Falar com especialista
              </a>
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-3 text-micro uppercase tracking-editorial text-bone/60 transition-colors duration-400 hover:text-gold"
              >
                <InstagramIcon size={14} />
                {siteConfig.social.instagram.handle}
              </a>
            </div>
          </Reveal>

          {footerNavigation.map((column, index) => (
            <Reveal
              key={column.title}
              delay={0.06 * (index + 1)}
              className="md:col-span-4 lg:col-span-2 lg:col-start-auto"
            >
              <h2 className="text-micro uppercase tracking-editorial text-gold/85">
                {column.title}
              </h2>
              <ul className="mt-7 flex flex-col gap-4">
                {column.links.map((link) => {
                  const resolved = resolveHref(link.href);

                  return (
                    <li key={link.label}>
                      {resolved.external ? (
                        <a
                          href={resolved.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-body-sm font-light text-bone/65 transition-colors duration-400 hover:text-bone"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={resolved.href}
                          className="link-underline text-body-sm font-light text-bone/65 transition-colors duration-400 hover:text-bone"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-section-sm flex flex-col gap-6 border-t-hairline border-bone/10 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="text-micro uppercase tracking-editorial text-bone/55">
            © {year} {siteConfig.name}
          </p>

          {siteConfig.catalogIsPlaceholder ? (
            <p className="max-w-[46ch] text-[0.625rem] font-light leading-relaxed text-bone/50">
              Catálogo, fotografias e depoimentos em fase de implantação: as peças e valores
              exibidos são registros de estrutura e serão substituídos pelo catálogo oficial da
              Daniel Joias.
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
