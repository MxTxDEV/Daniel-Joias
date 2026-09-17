'use client';

/**
 * Fronteira de erro da raiz — substitui o <html> inteiro, então não pode
 * depender do layout, das fontes nem do Tailwind. Estilo inline, mínimo,
 * fiel à paleta.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#080808',
          color: '#F5F2EC',
          fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
          fontWeight: 300,
        }}
      >
        <main style={{ padding: '0 1rem', margin: '0 auto', maxWidth: '38rem' }}>
          <p
            style={{
              margin: 0,
              fontSize: '0.6875rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C6A15B',
            }}
          >
            Daniel Joias
          </p>

          <h1
            style={{
              margin: '2rem 0 0',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: 300,
              fontSize: '2.5rem',
              lineHeight: 1.05,
            }}
          >
            Tivemos um problema inesperado.
          </h1>

          <p style={{ margin: '1.75rem 0 0', lineHeight: 1.7, color: 'rgba(245,242,236,0.7)' }}>
            Recarregue a página. Se continuar, tente novamente em alguns instantes.
          </p>

          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '2.5rem',
              padding: '0.9rem 2rem',
              border: 0,
              cursor: 'pointer',
              backgroundColor: '#F5F2EC',
              color: '#080808',
              fontSize: '0.8125rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
            }}
          >
            Tentar novamente
          </button>

          {error.digest ? (
            <p
              style={{
                marginTop: '2rem',
                fontSize: '0.625rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(245,242,236,0.5)',
              }}
            >
              Referência: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
