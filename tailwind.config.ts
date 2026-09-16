import type { Config } from 'tailwindcss';

/**
 * Design system Daniel Joias.
 *
 * Todos os valores visuais do projeto vivem aqui (e em app/globals.css como
 * custom properties). Componentes não devem usar valores arbitrários —
 * se um token não existe, ele é criado neste arquivo.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#080808',
          900: '#080808',
          800: '#111111',
          700: '#181818',
          600: '#222222',
          500: '#2E2E2E',
        },
        bone: {
          DEFAULT: '#F5F2EC',
          100: '#FBFAF7',
          200: '#F5F2EC',
          300: '#EAE5DB',
          400: '#DDD6C8',
        },
        gold: {
          DEFAULT: '#C6A15B',
          light: '#D8BD7A',
          dark: '#8F6D32',
          /**
           * Variação do dourado escuro reservada a TEXTO sobre off-white:
           * mantém a leitura da marca e atinge 4.58:1 (WCAG AA) — o
           * `dark` continua valendo para linhas, bordas e ícones.
           */
          text: '#8A6830',
        },
        silver: {
          DEFAULT: '#BFC0C2',
          light: '#D7D8DA',
          dark: '#8E9092',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        micro: ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.22em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.28em' }],
        'label-sm': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.16em' }],
        label: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.12em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        body: ['1rem', { lineHeight: '1.75', letterSpacing: '0.005em' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.8' }],
        'display-xs': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.005em' }],
        'display-sm': ['2rem', { lineHeight: '1.14', letterSpacing: '-0.01em' }],
        'display-md': ['2.75rem', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-xl': ['5rem', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-2xl': ['6.75rem', { lineHeight: '0.94', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        tightest: '-0.03em',
        wider: '0.12em',
        widest: '0.2em',
        editorial: '0.28em',
        signature: '0.42em',
      },
      spacing: {
        gutter: '1rem',
        'gutter-md': '2.5rem',
        'gutter-lg': '4rem',
        'section-sm': '4.5rem',
        section: '7rem',
        'section-lg': '10rem',
        'section-xl': '13rem',
        header: '5.25rem',
        'header-sm': '4.25rem',
      },
      maxWidth: {
        shell: '100rem',
        content: '68rem',
        prose: '38rem',
        measure: '30rem',
      },
      borderRadius: {
        none: '0',
        xs: '1px',
        sm: '2px',
        DEFAULT: '2px',
        md: '3px',
        pill: '999px',
      },
      borderWidth: {
        hairline: '0.5px',
      },
      boxShadow: {
        hairline: '0 0 0 0.5px rgba(198, 161, 91, 0.28)',
        lift: '0 24px 60px -32px rgba(8, 8, 8, 0.55)',
        'lift-light': '0 24px 60px -36px rgba(8, 8, 8, 0.18)',
        none: 'none',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
        precise: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        160: '160ms',
        260: '260ms',
        400: '400ms',
        600: '600ms',
        900: '900ms',
        1200: '1200ms',
      },
      screens: {
        xs: '375px',
        sm: '430px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      aspectRatio: {
        portrait: '3 / 4',
        editorial: '4 / 5',
        wide: '16 / 9',
        cinema: '21 / 9',
      },
      backgroundImage: {
        'gold-hairline':
          'linear-gradient(90deg, rgba(198,161,91,0) 0%, rgba(198,161,91,0.7) 50%, rgba(198,161,91,0) 100%)',
      },
      keyframes: {
        'hairline-in': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 16px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(-40%)', opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { transform: 'translateY(40%)', opacity: '0' },
        },
      },
      animation: {
        'hairline-in': 'hairline-in 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-up': 'fade-up 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-soft': 'pulse-soft 2.8s ease-in-out infinite',
        'scroll-hint': 'scroll-hint 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
