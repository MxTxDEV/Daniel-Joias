import type { SVGProps } from 'react';

/**
 * Ícones desenhados em linha de 0.7px — coerentes com as hairlines do
 * design system. Todos herdam `currentColor` e são decorativos por padrão.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 0.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
};

export function SearchIcon({ size = 17, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" {...base} {...props}>
      <circle cx="7.6" cy="7.6" r="5.6" />
      <path d="M11.8 11.8 16 16" />
    </svg>
  );
}

export function HeartIcon({
  size = 17,
  filled = false,
  ...props
}: IconProps & { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" {...base} {...props} fill={filled ? 'currentColor' : 'none'}>
      <path d="M9 15.2C9 15.2 2 11.4 2 6.6A3.7 3.7 0 0 1 9 4.9a3.7 3.7 0 0 1 7 1.7c0 4.8-7 8.6-7 8.6Z" />
    </svg>
  );
}

export function BagIcon({ size = 17, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" {...base} {...props}>
      <path d="M3.2 5.4h11.6l-.9 10.4H4.1L3.2 5.4Z" />
      <path d="M6.6 5.4V4.3a2.4 2.4 0 0 1 4.8 0v1.1" />
    </svg>
  );
}

export function CloseIcon({ size = 16, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base} {...props}>
      <path d="M2.4 2.4 13.6 13.6M13.6 2.4 2.4 13.6" />
    </svg>
  );
}

export function MenuIcon({ size = 20, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...base} {...props}>
      <path d="M1.5 6.5h17M1.5 13.5h17" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 16 8" {...base} {...props}>
      <path d="M0 4h14.4M11.6 1.2 14.8 4l-3.2 2.8" />
    </svg>
  );
}

export function ArrowDownIcon({ size = 14, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" {...base} {...props}>
      <path d="M7 0v13M3 9.4 7 13.4l4-4" />
    </svg>
  );
}

export function ChevronIcon({ size = 12, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" {...base} {...props}>
      <path d="M4 2.5 8 6l-4 3.5" />
    </svg>
  );
}

export function PlusIcon({ size = 12, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" {...base} {...props}>
      <path d="M6 1.4v9.2M1.4 6h9.2" />
    </svg>
  );
}

export function MinusIcon({ size = 12, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" {...base} {...props}>
      <path d="M1.4 6h9.2" />
    </svg>
  );
}

export function WhatsappIcon({ size = 16, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" {...base} {...props}>
      <path d="M9 2a7 7 0 0 0-6 10.6L2.2 16l3.5-.8A7 7 0 1 0 9 2Z" />
      <path d="M6.3 6.6c0 2.6 2.5 5.1 5.1 5.1.6 0 1.1-.5 1.1-1l-1.3-.7-.8.7c-1-.4-2-1.4-2.4-2.4l.7-.8L8 6.2c-.5 0-1.1.1-1.1.7Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 16, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" {...base} {...props}>
      <rect x="2.2" y="2.2" width="13.6" height="13.6" rx="3.4" />
      <circle cx="9" cy="9" r="3.4" />
      <circle cx="13.1" cy="4.9" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ZoomIcon({ size = 16, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" {...base} {...props}>
      <circle cx="7.6" cy="7.6" r="5.6" />
      <path d="M5.4 7.6h4.4M7.6 5.4v4.4M11.8 11.8 16 16" />
    </svg>
  );
}

/** Losango da marca — usado como marcador editorial. */
export function DiamondGlyph({ size = 9, ...props }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" {...base} {...props}>
      <path d="M5 0.5 9.5 5 5 9.5 0.5 5Z" />
    </svg>
  );
}
