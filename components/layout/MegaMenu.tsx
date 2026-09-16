'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Figure } from '@/components/ui/Figure';
import { ArrowRightIcon } from '@/components/ui/Icons';
import type { NavGroup } from '@/types';

interface MegaMenuProps {
  group: NavGroup;
  onNavigate: () => void;
}

/**
 * Painel do mega-menu (desktop). Composição editorial: colunas de links à
 * esquerda, peça em destaque à direita. Entra em fade + translate curto.
 */
export function MegaMenu({ group, onNavigate }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full hidden border-t-hairline border-bone/10 bg-ink backdrop-blur-md lg:block"
    >
      <div className="shell-wide grid grid-cols-12 gap-12 py-14">
        <div className="col-span-3 flex flex-col gap-4">
          <p className="eyebrow text-gold/85">{group.label}</p>
          <Link
            href={group.href}
            onClick={onNavigate}
            className="link-underline w-fit font-display text-display-xs font-light text-bone"
          >
            Ver tudo
          </Link>
        </div>

        {group.columns.map((column) => (
          <div key={column.title ?? column.links[0]?.label} className="col-span-2 flex flex-col gap-6">
            {column.title ? (
              <p className="text-micro uppercase tracking-editorial text-bone/55">{column.title}</p>
            ) : null}
            <ul className="flex flex-col gap-4">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="link-underline text-body-sm font-light text-bone/70 transition-colors duration-400 ease-silk hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {group.feature ? (
          <Link
            href={group.feature.href}
            onClick={onNavigate}
            data-cursor="Explorar"
            className="group col-span-4 col-start-9 flex gap-6"
          >
            <Figure
              image={group.feature.image}
              aspect="editorial"
              sizes="(min-width: 1440px) 220px, 180px"
              className="w-[9.5rem] shrink-0"
              imageClassName="transition-transform duration-1200 ease-silk group-hover:scale-[1.03]"
            />
            <span className="flex flex-col justify-end gap-3 pb-2">
              <span className="eyebrow text-gold/85">{group.feature.label}</span>
              <span className="font-display text-display-xs font-light leading-tight text-bone">
                {group.feature.title}
              </span>
              <span className="mt-2 inline-flex items-center gap-3 text-micro uppercase tracking-editorial text-bone/60 transition-colors duration-400 group-hover:text-gold">
                Ver peças
                <ArrowRightIcon className="transition-transform duration-600 ease-silk group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        ) : null}
      </div>
    </motion.div>
  );
}
