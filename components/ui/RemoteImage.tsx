'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface RemoteImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Exibido caso a fotografia remota não carregue. */
  fallback: ReactNode;
}

/**
 * Fotografia hospedada fora do projeto.
 *
 * Como a origem é externa, uma indisponibilidade não pode virar caixa
 * quebrada no meio da página: se a imagem falhar, entra o placeholder
 * editorial, exatamente como se a fotografia ainda não existisse.
 */
export function RemoteImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  fallback,
}: RemoteImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      quality={82}
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
    />
  );
}
