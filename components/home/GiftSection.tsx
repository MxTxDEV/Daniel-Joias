import Link from 'next/link';
import { Figure } from '@/components/ui/Figure';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, Stagger } from '@/components/ui/Reveal';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { giftOccasions } from '@/data/brand';

/** Presentes por ocasião — grid claro, respiro amplo. */
export function GiftSection() {
  return (
    <section
      aria-labelledby="secao-presentes"
      className="bg-bone py-section-sm md:py-section lg:py-section-lg"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Presentes"
          title={
            <>
              Um presente
              <span className="block italic">que permanece.</span>
            </>
          }
          description="Escolha pela ocasião — ou fale com um especialista para uma seleção sob medida."
          tone="light"
          size="lg"
          titleId="secao-presentes"
        />

        <Stagger
          className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-14"
          staggerChildren={0.06}
        >
          {giftOccasions.map((occasion) => (
            <Reveal key={occasion.label} asChild>
              <Link
                href={occasion.href}
                data-cursor="Explorar"
                className="group flex flex-col"
              >
                <div className="overflow-hidden">
                  <Figure
                    image={occasion.image}
                    aspect="portrait"
                    sizes="(min-width: 768px) 30vw, 46vw"
                    tone="light"
                    imageClassName="transition-transform duration-1200 ease-silk group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="font-display text-body-lg font-light text-ink">
                    {occasion.label}
                  </span>
                  <span className="translate-x-[-6px] text-ink/60 opacity-0 transition-all duration-600 ease-silk group-hover:translate-x-0 group-hover:text-gold-text group-hover:opacity-100">
                    <ArrowRightIcon />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
