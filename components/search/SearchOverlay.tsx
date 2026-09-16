'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Figure } from '@/components/ui/Figure';
import { CloseIcon, SearchIcon } from '@/components/ui/Icons';
import { formatPrice } from '@/lib/format';
import { searchProducts, searchSuggestions } from '@/lib/search';
import { useOverlay } from '@/hooks/useOverlay';
import { useShop } from '@/lib/shop/ShopContext';

/**
 * Busca em overlay fullscreen. Resultados em tempo real, sem recarregar a
 * página; a rota /busca continua disponível para links diretos e SEO.
 */
export function SearchOverlay() {
  const { searchOpen, closeSearch } = useShop();
  const containerRef = useOverlay(searchOpen, closeSearch);
  const [query, setQuery] = useState('');

  const results = useMemo(() => searchProducts(query, 6), [query]);
  const hasQuery = query.trim().length >= 2;

  return (
    <AnimatePresence>
      {searchOpen ? (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Buscar peças"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] flex flex-col bg-ink backdrop-blur-md"
        >
          <div className="flex h-[var(--header-height)] shrink-0 items-center justify-end px-gutter md:px-gutter-md">
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Fechar busca"
              className="-mr-2 p-2 text-bone/70 transition-colors duration-400 hover:text-gold"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="no-scrollbar flex-1 overflow-y-auto">
            <div className="shell max-w-content pb-24 pt-8 md:pt-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <label htmlFor="busca-overlay" className="eyebrow text-gold">
                  Busca
                </label>
                <div className="mt-6 flex items-center gap-5 border-b-hairline border-bone/20 pb-5 focus-within:border-gold/60">
                  <SearchIcon size={20} className="shrink-0 text-bone/55" />
                  <input
                    id="busca-overlay"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Anel, corrente, aliança, ouro…"
                    autoComplete="off"
                    className="w-full bg-transparent font-display text-display-xs font-light text-bone outline-none placeholder:text-bone/50 md:text-display-sm"
                  />
                </div>
              </motion.div>

              {!hasQuery ? (
                <div className="mt-12">
                  <p className="text-micro uppercase tracking-editorial text-bone/55">
                    Buscas frequentes
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                    {searchSuggestions.map((suggestion) => (
                      <li key={suggestion}>
                        <button
                          type="button"
                          onClick={() => setQuery(suggestion)}
                          className="link-underline text-body-sm font-light text-bone/70 hover:text-bone"
                        >
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-12">
                  <p className="text-micro uppercase tracking-editorial text-bone/55">
                    {results.length === 0
                      ? 'Nenhuma peça encontrada'
                      : `${results.length} ${results.length === 1 ? 'peça' : 'peças'}`}
                  </p>

                  {results.length === 0 ? (
                    <p className="mt-6 max-w-prose text-body-sm font-light text-bone/60">
                      Tente outro termo — anel, corrente, cordão, aliança, ouro, prata ou presente.
                    </p>
                  ) : (
                    <ul className="mt-8 flex flex-col">
                      {results.map(({ product }, index) => (
                        <motion.li
                          key={product.slug}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.45,
                            delay: index * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="border-b-hairline border-bone/10"
                        >
                          <Link
                            href={`/produto/${product.slug}`}
                            onClick={closeSearch}
                            className="group flex items-center gap-6 py-5"
                          >
                            <Figure
                              image={product.images[0]}
                              aspect="square"
                              sizes="80px"
                              className="w-16 shrink-0 sm:w-20"
                              imageClassName="transition-transform duration-1200 ease-silk group-hover:scale-[1.04]"
                            />
                            <span className="flex flex-1 flex-col gap-1">
                              <span className="font-display text-body-lg font-light text-bone">
                                {product.name}
                              </span>
                              <span className="text-micro uppercase tracking-editorial text-bone/55">
                                {product.material}
                              </span>
                            </span>
                            <span className="text-body-sm font-light text-bone/65">
                              {formatPrice(product.price)}
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
