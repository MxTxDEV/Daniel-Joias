'use client';

import { MinusIcon, PlusIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  tone?: 'dark' | 'light';
  label?: string;
  size?: 'sm' | 'md';
}

/** Contador discreto — hairline, sem preenchimento, sem sombra. */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  tone = 'dark',
  label = 'Quantidade',
  size = 'md',
}: QuantityStepperProps) {
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'inline-flex items-center border-hairline',
        dark ? 'border-bone/20 text-bone' : 'border-ink/15 text-ink',
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
        className={cn(
          'flex items-center justify-center transition-colors duration-400 disabled:opacity-25',
          size === 'md' ? 'h-11 w-11' : 'h-9 w-9',
          dark ? 'hover:text-gold' : 'hover:text-gold-text',
        )}
      >
        <MinusIcon />
      </button>
      <span
        aria-live="polite"
        className={cn(
          'min-w-8 text-center text-label-sm tabular-nums',
          size === 'md' ? 'text-label' : 'text-label-sm',
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
        className={cn(
          'flex items-center justify-center transition-colors duration-400 disabled:opacity-25',
          size === 'md' ? 'h-11 w-11' : 'h-9 w-9',
          dark ? 'hover:text-gold' : 'hover:text-gold-text',
        )}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
