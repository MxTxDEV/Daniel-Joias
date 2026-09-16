'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/layout/Logo';
import { MegaMenu } from '@/components/layout/MegaMenu';
import { BagIcon, HeartIcon, MenuIcon, SearchIcon } from '@/components/ui/Icons';
import { navigation } from '@/data/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { useShop } from '@/lib/shop/ShopContext';
import { cn } from '@/lib/cn';

/**
 * Header transparente sobre o hero; ao rolar, ganha fundo escuro, blur
 * discreto e uma borda inferior quase imperceptível.
 */
export function Header() {
  const scrolled = useScrolled(32);
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { itemCount, openCart, openSearch, openMenu, lastAdded, hydrated } = useShop();

  // O mega-menu nunca sobrevive a uma troca de rota.
  useEffect(() => {
    setOpenGroup(null);
  }, [pathname]);

  const solid = scrolled || openGroup !== null;
  const activeGroup = navigation.find((group) => group.label === openGroup);

  return (
    <header
      onMouseLeave={() => setOpenGroup(null)}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-600 ease-silk',
        solid ? 'border-b-hairline border-bone/10 bg-ink/85 backdrop-blur-md' : 'border-b-hairline border-transparent',
      )}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-micro focus:uppercase focus:tracking-editorial focus:text-gold"
      >
        Ir para o conteúdo
      </a>

      <div className="shell-wide flex h-[var(--header-height)] items-center gap-6">
        {/* Esquerda — menu no mobile, logo no desktop */}
        <div className="flex flex-1 items-center">
          <button
            type="button"
            onClick={openMenu}
            aria-label="Abrir menu"
            className="-ml-2 p-2 text-bone/80 transition-colors duration-400 hover:text-gold lg:hidden"
          >
            <MenuIcon />
          </button>
          <Logo className="hidden lg:inline-flex" />
        </div>

        {/* Centro — logo no mobile, navegação no desktop */}
        <div className="flex flex-1 justify-center lg:flex-[2_2_0%]">
          <Logo size="sm" className="lg:hidden" />

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {navigation.map((group) => {
                const active = pathname.startsWith(group.href) && group.href !== '/';
                return (
                  <li key={group.label}>
                    <Link
                      href={group.href}
                      onMouseEnter={() => setOpenGroup(group.label)}
                      onFocus={() => setOpenGroup(group.label)}
                      aria-haspopup="true"
                      aria-expanded={openGroup === group.label}
                      data-active={active || openGroup === group.label}
                      className={cn(
                        'link-underline py-2 text-label-sm font-light uppercase transition-colors duration-400 ease-silk',
                        active || openGroup === group.label ? 'text-gold' : 'text-bone/75 hover:text-bone',
                      )}
                    >
                      {group.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Direita — busca, favoritos, sacola */}
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Buscar peças"
            className="hidden items-center gap-3 p-2 text-bone/75 transition-colors duration-400 hover:text-gold sm:inline-flex"
          >
            <SearchIcon />
            <span className="hidden text-micro uppercase tracking-editorial xl:inline">Buscar</span>
          </button>

          <Link
            href="/favoritos"
            aria-label="Favoritos"
            className="hidden p-2 text-bone/75 transition-colors duration-400 hover:text-gold sm:inline-flex"
          >
            <HeartIcon />
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Sacola${hydrated && itemCount > 0 ? `, ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}` : ' vazia'}`}
            className="relative -mr-2 inline-flex items-center gap-3 p-2 text-bone/75 transition-colors duration-400 hover:text-gold"
          >
            <span className="relative">
              <BagIcon />
              <AnimatePresence>
                {hydrated && itemCount > 0 ? (
                  <motion.span
                    key={itemCount}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-2 -top-2 min-w-[14px] rounded-pill bg-gold px-1 text-center text-[0.5625rem] font-medium leading-[14px] text-ink"
                  >
                    {itemCount}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </span>
            <span className="hidden text-micro uppercase tracking-editorial xl:inline">Sacola</span>
            {/* Pulso dourado discreto ao adicionar uma peça. */}
            <AnimatePresence>
              {lastAdded ? (
                <motion.span
                  initial={{ opacity: 0.6, scale: 0.8 }}
                  animate={{ opacity: 0, scale: 1.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="pointer-events-none absolute inset-0 rounded-pill border-hairline border-gold"
                />
              ) : null}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeGroup ? (
          <MegaMenu key={activeGroup.label} group={activeGroup} onNavigate={() => setOpenGroup(null)} />
        ) : null}
      </AnimatePresence>
    </header>
  );
}
