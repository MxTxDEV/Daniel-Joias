'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Figure } from '@/components/ui/Figure';
import { CloseIcon, WhatsappIcon } from '@/components/ui/Icons';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatPriceCompact } from '@/lib/format';
import { useOverlay } from '@/hooks/useOverlay';
import { useShop, type CartEntry } from '@/lib/shop/ShopContext';
import { whatsappLink } from '@/lib/whatsapp';
import { siteConfig } from '@/data/site';

/** Mensagem de pedido enviada ao especialista. */
function orderMessage(entries: CartEntry[], subtotal: number): string {
  const lines = entries.map(
    (entry) =>
      `• ${entry.product.name} — ${entry.product.material}${
        entry.size ? ` — ${entry.size}` : ''
      } — ${entry.quantity}x`,
  );

  return [
    'Olá, Daniel Joias. Gostaria de finalizar o pedido da minha seleção:',
    '',
    ...lines,
    '',
    `Subtotal: ${formatPrice(subtotal)}`,
  ].join('\n');
}

/**
 * Sacola lateral. Interface leve: fotografia pequena, nome, material, preço.
 * A finalização acontece com um especialista pelo WhatsApp — a estrutura já
 * está pronta para receber um checkout próprio no lugar deste CTA.
 */
export function CartDrawer() {
  const { cartOpen, closeCart, entries, subtotal, setQuantity, removeFromCart, itemCount } = useShop();
  const containerRef = useOverlay(cartOpen, closeCart);

  return (
    <AnimatePresence>
      {cartOpen ? (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Fechar sacola"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full cursor-default bg-ink/60 backdrop-blur-[2px]"
          />

          <motion.aside
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Sua seleção"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[27rem] flex-col border-l-hairline border-bone/10 bg-ink-800"
          >
            <div className="flex items-start justify-between gap-6 px-7 pb-6 pt-8">
              <div>
                <p className="eyebrow text-gold">Sua seleção</p>
                <p className="mt-3 text-micro uppercase tracking-editorial text-bone/55">
                  {itemCount === 0
                    ? 'Nenhuma peça'
                    : `${itemCount} ${itemCount === 1 ? 'peça' : 'peças'}`}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Fechar sacola"
                className="-mr-2 p-2 text-bone/65 transition-colors duration-400 hover:text-gold"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="no-scrollbar flex-1 overflow-y-auto px-7">
              {entries.length === 0 ? (
                <div className="flex h-full flex-col justify-center gap-8 pb-24">
                  <p className="font-display text-display-xs font-light text-bone/70">
                    Sua sacola está vazia.
                  </p>
                  <Button href="/colecoes" variant="outline" size="sm" withArrow onClick={closeCart}>
                    Explorar coleções
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col">
                  {entries.map((entry) => (
                    <motion.li
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-5 border-b-hairline border-bone/10 py-6 first:pt-0"
                    >
                      <Link
                        href={`/produto/${entry.product.slug}`}
                        onClick={closeCart}
                        aria-label={`Ver ${entry.product.name}`}
                        className="shrink-0"
                      >
                        <Figure
                          image={entry.product.images[0]}
                          aspect="square"
                          sizes="88px"
                          className="w-[5.5rem]"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col gap-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/produto/${entry.product.slug}`}
                              onClick={closeCart}
                              className="link-underline font-display text-body-lg font-light text-bone"
                            >
                              {entry.product.name}
                            </Link>
                            <p className="mt-1.5 text-micro uppercase tracking-editorial text-bone/55">
                              {entry.product.material}
                              {entry.size ? ` · ${entry.size}` : ''}
                            </p>
                          </div>
                          <p className="whitespace-nowrap text-body-sm font-light text-bone/75">
                            {formatPriceCompact(entry.lineTotal)}
                          </p>
                        </div>

                        <div className="mt-1 flex items-center justify-between gap-4">
                          <QuantityStepper
                            value={entry.quantity}
                            onChange={(value) => setQuantity(entry.id, value)}
                            size="sm"
                            label={`Quantidade de ${entry.product.name}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeFromCart(entry.id)}
                            className="text-micro uppercase tracking-editorial text-bone/55 transition-colors duration-400 hover:text-gold"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {entries.length > 0 ? (
              <div className="border-t-hairline border-bone/10 px-7 pb-8 pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-micro uppercase tracking-editorial text-bone/60">Subtotal</span>
                  <span className="font-display text-display-xs font-light text-bone">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="mt-4 text-[0.6875rem] font-light leading-relaxed text-bone/55">
                  Frete e condições de pagamento confirmados no atendimento.
                  {siteConfig.catalogIsPlaceholder
                    ? ' Valores exibidos são de demonstração até a publicação do catálogo oficial.'
                    : ''}
                </p>

                <Button
                  href={whatsappLink(orderMessage(entries, subtotal))}
                  external
                  variant="solid"
                  size="md"
                  fullWidth
                  className="mt-6"
                >
                  Finalizar pedido
                </Button>

                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-3 text-micro uppercase tracking-editorial text-bone/60 transition-colors duration-400 hover:text-gold"
                >
                  <WhatsappIcon size={14} />
                  Falar com especialista
                </a>
              </div>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
