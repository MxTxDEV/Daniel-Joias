'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Logo } from '@/components/layout/Logo';
import { CloseIcon, ChevronIcon, SearchIcon, WhatsappIcon, InstagramIcon } from '@/components/ui/Icons';
import { navigation } from '@/data/navigation';
import { siteConfig } from '@/data/site';
import { useOverlay } from '@/hooks/useOverlay';
import { useShop } from '@/lib/shop/ShopContext';
import { whatsappLink } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';

/**
 * Menu fullscreen do mobile — composição própria, não uma redução do desktop:
 * títulos em serifada grande, sub-links em acordeão e atendimento no rodapé.
 */
export function MobileMenu() {
  const { menuOpen, closeMenu, openSearch } = useShop();
  const containerRef = useOverlay(menuOpen, closeMenu);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {menuOpen ? (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[70] flex flex-col bg-ink lg:hidden"
        >
          <div className="flex h-[var(--header-height)] shrink-0 items-center justify-between px-gutter">
            <Logo size="sm" />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Fechar menu"
              className="-mr-2 p-2 text-bone/70 transition-colors duration-400 hover:text-gold"
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            aria-label="Navegação principal"
            className="no-scrollbar flex-1 overflow-y-auto px-gutter pb-10 pt-6"
          >
            <ul className="flex flex-col">
              {navigation.map((group, index) => {
                const open = expanded === group.label;

                return (
                  <motion.li
                    key={group.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.08 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b-hairline border-bone/10"
                  >
                    <div className="flex items-center justify-between gap-4 py-5">
                      <Link
                        href={group.href}
                        onClick={closeMenu}
                        className="font-display text-display-xs font-light text-bone"
                      >
                        {group.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : group.label)}
                        aria-expanded={open}
                        aria-label={`${open ? 'Recolher' : 'Expandir'} ${group.label}`}
                        className="p-2 text-bone/60 transition-colors duration-400 hover:text-gold"
                      >
                        <ChevronIcon
                          className={cn(
                            'transition-transform duration-600 ease-silk',
                            open ? 'rotate-90 text-gold' : 'rotate-0',
                          )}
                        />
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="flex flex-col gap-4 pb-6 pl-1">
                            {group.columns.flatMap((column) => column.links).map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={closeMenu}
                                  className="text-body-sm font-light text-bone/70"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                openSearch();
              }}
              className="mt-10 flex w-full items-center gap-4 border-b-hairline border-bone/10 pb-5 text-label-sm uppercase tracking-editorial text-bone/70"
            >
              <SearchIcon size={15} />
              Buscar peças
            </button>

            <div className="mt-10 flex flex-col gap-5">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 text-label-sm uppercase tracking-editorial text-gold"
              >
                <WhatsappIcon size={15} />
                Falar com especialista
              </a>
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 text-label-sm uppercase tracking-editorial text-bone/65"
              >
                <InstagramIcon size={15} />
                {siteConfig.social.instagram.handle}
              </a>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
