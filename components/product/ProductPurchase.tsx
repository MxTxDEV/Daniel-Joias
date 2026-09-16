'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { WishlistButton } from '@/components/product/WishlistButton';
import { WhatsappIcon } from '@/components/ui/Icons';
import { formatPrice } from '@/lib/format';
import { productWhatsappLink } from '@/lib/whatsapp';
import { useShop } from '@/lib/shop/ShopContext';
import { cn } from '@/lib/cn';
import type { Product } from '@/types';

/** Bloco de compra da página de produto: medida, quantidade e ações. */
export function ProductPurchase({ product }: { product: Product }) {
  const { addToCart } = useShop();
  const [size, setSize] = useState<string | undefined>(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const sizeLabel = product.category === 'aneis' || product.category.includes('alianca') ? 'Tamanho' : 'Medida';

  function handleAdd() {
    addToCart(product, { size, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="flex flex-col">
      <p className="mt-8 text-body-lg font-light text-bone/85">{formatPrice(product.price)}</p>

      {product.sizes && product.sizes.length > 0 ? (
        <fieldset className="mt-10">
          <legend className="text-micro uppercase tracking-editorial text-bone/55">
            {sizeLabel}
          </legend>
          <div className="mt-5 flex flex-wrap gap-3">
            {product.sizes.map((option) => {
              const active = option === size;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  aria-pressed={active}
                  className={cn(
                    'min-w-[3.25rem] border-hairline px-4 py-3 text-label-sm transition-colors duration-400 ease-silk',
                    active
                      ? 'border-gold/70 text-gold'
                      : 'border-bone/15 text-bone/70 hover:border-bone/40 hover:text-bone',
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-[0.6875rem] font-light text-bone/55">
            Em dúvida sobre a medida? Nossa equipe orienta pelo WhatsApp.
          </p>
        </fieldset>
      ) : null}

      <div className="mt-10">
        <p className="text-micro uppercase tracking-editorial text-bone/55">Quantidade</p>
        <div className="mt-5">
          <QuantityStepper value={quantity} onChange={setQuantity} />
        </div>
      </div>

      <div className="relative mt-10">
        <Button variant="solid" size="lg" fullWidth onClick={handleAdd}>
          Adicionar à sacola
        </Button>

        <AnimatePresence>
          {added ? (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="status"
              className="absolute -bottom-7 left-0 text-micro uppercase tracking-editorial text-gold"
            >
              Peça adicionada à sacola
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-14 flex flex-col gap-6 border-t-hairline border-bone/10 pt-8">
        <WishlistButton slug={product.slug} productName={product.name} withLabel />

        <a
          href={productWhatsappLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-micro uppercase tracking-editorial text-bone/60 transition-colors duration-400 hover:text-gold"
        >
          <WhatsappIcon size={15} />
          Tenho interesse nesta peça
        </a>
      </div>
    </div>
  );
}
