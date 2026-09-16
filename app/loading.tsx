/** Loading elegante: uma linha dourada que pulsa, sem spinner. */
export default function Loading() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center bg-ink">
      <span className="sr-only">Carregando</span>
      <span aria-hidden="true" className="block h-[0.5px] w-24 animate-pulse-soft bg-gold" />
    </div>
  );
}
