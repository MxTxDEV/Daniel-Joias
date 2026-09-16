'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchIcon } from '@/components/ui/Icons';

/** Campo de busca da rota /busca — mantém o termo na URL (links e SEO). */
export function SearchForm({ initialQuery = '' }: { initialQuery?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        const term = value.trim();
        router.push(term ? `/busca?q=${encodeURIComponent(term)}` : '/busca');
      }}
      className="w-full max-w-content"
    >
      <label htmlFor="busca" className="sr-only">
        Buscar peças
      </label>
      <div className="flex items-center gap-5 border-b-hairline border-bone/20 pb-5 focus-within:border-gold/60">
        <SearchIcon size={18} className="shrink-0 text-bone/55" />
        <input
          id="busca"
          name="q"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Anel, corrente, aliança, ouro…"
          autoComplete="off"
          className="w-full bg-transparent font-display text-display-xs font-light text-bone outline-none placeholder:text-bone/50"
        />
        <button
          type="submit"
          className="shrink-0 text-micro uppercase tracking-editorial text-bone/60 transition-colors duration-400 hover:text-gold"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
