'use client';

import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * `outline` é para superfícies escuras e `outline-ink` para superfícies
 * claras — currentColor não aceita modificador de opacidade, então cada
 * variante declara as suas cores.
 */
type Variant = 'solid' | 'outline' | 'outline-ink' | 'gold' | 'quiet';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-3 rounded-none font-sans uppercase transition-colors duration-600 ease-silk disabled:cursor-not-allowed disabled:opacity-40';

const variants: Record<Variant, string> = {
  solid: 'bg-bone text-ink hover:bg-white',
  outline: 'border-hairline border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/[0.05]',
  'outline-ink': 'border-hairline border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.03]',
  gold: 'border-hairline border-gold/50 text-gold hover:border-gold hover:bg-gold/[0.07]',
  quiet: 'text-current',
};

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-micro tracking-editorial',
  md: 'px-7 py-3.5 text-label-sm tracking-editorial',
  lg: 'px-9 py-4 text-label tracking-editorial',
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Seta minimalista que avança levemente no hover. */
  withArrow?: boolean;
  fullWidth?: boolean;
}

interface ButtonAsButton extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> {
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  /** Links externos abrem em nova aba. */
  external?: boolean;
  'aria-label'?: string;
  /** Usado, por exemplo, para fechar a sacola ao navegar. */
  onClick?: () => void;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function Content({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      <span className="relative">{children}</span>
      {withArrow ? (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-600 ease-silk group-hover:translate-x-1.5"
        >
          <svg width="16" height="7" viewBox="0 0 16 7" fill="none">
            <path d="M0 3.5h14.2M11.4 0.7 14.9 3.5 11.4 6.3" stroke="currentColor" strokeWidth="0.7" />
          </svg>
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'outline',
    size = 'md',
    className,
    withArrow,
    fullWidth,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  if ('href' in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={rest['aria-label']}
          onClick={rest.onClick}
        >
          <Content withArrow={withArrow}>{children}</Content>
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={rest['aria-label']} onClick={rest.onClick}>
        <Content withArrow={withArrow}>{children}</Content>
      </Link>
    );
  }

  const { children: _children, variant: _v, size: _s, className: _c, withArrow: _a, fullWidth: _f, ...buttonProps } =
    props as ButtonAsButton;

  return (
    <button type="button" {...buttonProps} className={classes}>
      <Content withArrow={withArrow}>{children}</Content>
    </button>
  );
}
