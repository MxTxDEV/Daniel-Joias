'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Figure } from '@/components/ui/Figure';
import { CloseIcon, ZoomIcon } from '@/components/ui/Icons';
import { useOverlay } from '@/hooks/useOverlay';
import { cn } from '@/lib/cn';
import type { ImageRef } from '@/types';

interface LightboxProps {
  images: ImageRef[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  productName: string;
}

/**
 * Visualizador fullscreen: navegação por setas/teclado, zoom em dois níveis e
 * fechamento no Esc. Apenas transform e opacity são animados.
 */
export function Lightbox({
  images,
  index,
  open,
  onClose,
  onIndexChange,
  productName,
}: LightboxProps) {
  const containerRef = useOverlay(open, onClose);
  const [zoomed, setZoomed] = useState(false);

  const go = useCallback(
    (direction: 1 | -1) => {
      setZoomed(false);
      onIndexChange((index + direction + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, go]);

  useEffect(() => {
    if (!open) setZoomed(false);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de ${productName}`}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] flex flex-col bg-ink"
        >
          <div className="flex shrink-0 items-center justify-between px-gutter py-6 md:px-gutter-md">
            <p className="text-micro uppercase tracking-editorial text-bone/60">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomed((value) => !value)}
                aria-pressed={zoomed}
                aria-label={zoomed ? 'Reduzir zoom' : 'Ampliar imagem'}
                className={cn(
                  'p-2 transition-colors duration-400',
                  zoomed ? 'text-gold' : 'text-bone/65 hover:text-gold',
                )}
              >
                <ZoomIcon />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar galeria"
                className="p-2 text-bone/65 transition-colors duration-400 hover:text-gold"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-gutter pb-8 md:px-gutter-lg">
            <motion.div
              key={images[index]?.slot}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: zoomed ? 1.7 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'h-full w-full max-w-[min(92vw,58rem)]',
                zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in',
              )}
              onClick={() => setZoomed((value) => !value)}
            >
              <Figure
                image={images[index]}
                sizes="(min-width: 1024px) 58rem, 92vw"
                fillParent
                priority
                imageClassName="object-contain"
              />
            </motion.div>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Imagem anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-4 text-bone/60 transition-colors duration-400 hover:text-gold md:left-6"
                >
                  <svg width="26" height="10" viewBox="0 0 26 10" fill="none" aria-hidden="true">
                    <path d="M26 5H1.4M4.6 1.4 1 5l3.6 3.6" stroke="currentColor" strokeWidth="0.7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Próxima imagem"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-4 text-bone/60 transition-colors duration-400 hover:text-gold md:right-6"
                >
                  <svg width="26" height="10" viewBox="0 0 26 10" fill="none" aria-hidden="true">
                    <path d="M0 5h24.6M21.4 1.4 25 5l-3.6 3.6" stroke="currentColor" strokeWidth="0.7" />
                  </svg>
                </button>
              </>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
