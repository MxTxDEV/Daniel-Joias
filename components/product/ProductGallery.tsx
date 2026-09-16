'use client';

import { useState } from 'react';
import { Figure } from '@/components/ui/Figure';
import { Lightbox } from '@/components/product/Lightbox';
import { ZoomIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';
import type { ImageRef } from '@/types';

interface ProductGalleryProps {
  images: ImageRef[];
  productName: string;
}

/**
 * Galeria da página de produto: fotografia principal grande + miniaturas.
 * Clique abre o visualizador fullscreen com zoom e navegação.
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6">
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="Ampliar"
        aria-label={`Ampliar fotografia de ${productName}`}
        className="group relative block w-full overflow-hidden"
      >
        <Figure
          image={images[active]}
          aspect="editorial"
          sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 50vw, 100vw"
          priority
          imageClassName="transition-transform duration-1200 ease-silk group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-5 right-5 hidden text-bone/60 transition-colors duration-400 group-hover:text-gold lg:block">
          <ZoomIcon size={18} />
        </span>
      </button>

      {/* Miniaturas: linha no mobile, coluna no desktop. */}
      <ul className="no-scrollbar -mx-gutter flex shrink-0 gap-3 overflow-x-auto px-gutter lg:mx-0 lg:w-[5.5rem] lg:flex-col lg:overflow-visible lg:px-0">
        {images.map((image, index) => (
          <li key={image.slot} className="w-[4.5rem] shrink-0 lg:w-full">
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ver fotografia ${index + 1} de ${images.length}`}
              aria-current={index === active}
              className={cn(
                'block w-full overflow-hidden border-hairline transition-colors duration-400 ease-silk',
                index === active ? 'border-gold/60' : 'border-transparent hover:border-bone/25',
              )}
            >
              <Figure
                image={image}
                aspect="square"
                sizes="88px"
                imageClassName={cn(
                  'transition-opacity duration-600',
                  index === active ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                )}
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        images={images}
        index={active}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setActive}
        productName={productName}
      />
    </div>
  );
}
