'use client';

import { cn } from '@/lib/cn';

/** Indicador de scroll do hero: linha dourada em movimento vertical contínuo. */
export function ScrollCue({ label = 'Rolar', className }: { label?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="relative block h-16 w-[0.5px] overflow-hidden bg-bone/15">
        <span className="absolute inset-x-0 top-0 h-6 animate-scroll-hint bg-gold" />
      </span>
    </div>
  );
}
