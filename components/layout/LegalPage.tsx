import type { ReactNode } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Prose, PendingNote } from '@/components/ui/Prose';
import { Reveal } from '@/components/ui/Reveal';

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbLabel: string;
  children: ReactNode;
  pending?: ReactNode;
}

/** Estrutura comum das páginas institucionais e legais. */
export function LegalPage({
  eyebrow,
  title,
  description,
  breadcrumbLabel,
  children,
  pending,
}: LegalPageProps) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={[{ label: 'Início', href: '/' }, { label: breadcrumbLabel }]}
      />

      <section className="bg-ink pb-section-sm md:pb-section">
        <div className="shell">
          <Reveal>
            <Prose>{children}</Prose>
            {pending ? <PendingNote>{pending}</PendingNote> : null}
          </Reveal>
        </div>
      </section>
    </>
  );
}
