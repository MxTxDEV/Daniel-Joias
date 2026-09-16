/** Formatação de valores — sempre em pt-BR / BRL. */

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Recebe centavos. `R$ 2.890,00` */
export function formatPrice(cents: number): string {
  return currencyFormatter.format(cents / 100);
}

/** Recebe centavos. `R$ 2.890` — para uso em resumos compactos (carrinho). */
export function formatPriceCompact(cents: number): string {
  return compactCurrencyFormatter.format(cents / 100);
}

/** Valor numérico em reais, para schema.org e analytics. */
export function priceToNumber(cents: number): number {
  return Number((cents / 100).toFixed(2));
}
