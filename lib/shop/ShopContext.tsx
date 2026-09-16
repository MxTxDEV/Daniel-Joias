'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import { getProduct } from '@/data/products';
import type { CartLine, Product } from '@/types';

/* ------------------------------------------------------------------ *
 * Estado da loja: sacola, favoritos e overlays.
 * Persistido em localStorage — pronto para ser trocado por um backend
 * de checkout sem alterar a interface dos componentes.
 * ------------------------------------------------------------------ */

const CART_KEY = 'dj.cart.v1';
const WISHLIST_KEY = 'dj.wishlist.v1';

type CartAction =
  | { type: 'hydrate'; lines: CartLine[] }
  | { type: 'add'; line: CartLine }
  | { type: 'remove'; id: string }
  | { type: 'quantity'; id: string; quantity: number }
  | { type: 'clear' };

export function lineId(line: CartLine): string {
  return `${line.productSlug}::${line.size ?? 'unico'}`;
}

function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'hydrate':
      return action.lines;
    case 'add': {
      const id = lineId(action.line);
      const existing = state.find((line) => lineId(line) === id);
      if (existing) {
        return state.map((line) =>
          lineId(line) === id
            ? { ...line, quantity: Math.min(line.quantity + action.line.quantity, 20) }
            : line,
        );
      }
      return [...state, action.line];
    }
    case 'remove':
      return state.filter((line) => lineId(line) !== action.id);
    case 'quantity':
      return state
        .map((line) =>
          lineId(line) === action.id
            ? { ...line, quantity: Math.max(0, Math.min(action.quantity, 20)) }
            : line,
        )
        .filter((line) => line.quantity > 0);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export interface CartEntry extends CartLine {
  id: string;
  product: Product;
  lineTotal: number;
}

interface ShopContextValue {
  /** Linhas da sacola já resolvidas com o produto. */
  entries: CartEntry[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, options?: { size?: string; quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;

  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;

  /** Slug da última peça adicionada — dispara o feedback visual. */
  lastAdded: string | null;
  hydrated: boolean;
}

const ShopContext = createContext<ShopContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* modo privado / storage cheio: a sessão segue em memória. */
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, [] as CartLine[]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  // Hidratação a partir do localStorage (uma vez, no cliente).
  useEffect(() => {
    dispatch({ type: 'hydrate', lines: readStorage<CartLine[]>(CART_KEY, []) });
    setWishlist(readStorage<string[]>(WISHLIST_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(CART_KEY, lines);
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  // O feedback de “adicionado” se apaga sozinho.
  useEffect(() => {
    if (!lastAdded) return;
    const timeout = window.setTimeout(() => setLastAdded(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [lastAdded]);

  const entries = useMemo<CartEntry[]>(
    () =>
      lines.flatMap((line) => {
        const product = getProduct(line.productSlug);
        if (!product) return [];
        return [
          {
            ...line,
            id: lineId(line),
            product,
            lineTotal: product.price * line.quantity,
          },
        ];
      }),
    [lines],
  );

  const addToCart = useCallback<ShopContextValue['addToCart']>((product, options) => {
    dispatch({
      type: 'add',
      line: {
        productSlug: product.slug,
        size: options?.size,
        quantity: options?.quantity ?? 1,
      },
    });
    setLastAdded(product.slug);
    setCartOpen(true);
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }, []);

  const value = useMemo<ShopContextValue>(
    () => ({
      entries,
      itemCount: entries.reduce((total, entry) => total + entry.quantity, 0),
      subtotal: entries.reduce((total, entry) => total + entry.lineTotal, 0),
      addToCart,
      removeFromCart: (id) => dispatch({ type: 'remove', id }),
      setQuantity: (id, quantity) => dispatch({ type: 'quantity', id, quantity }),
      clearCart: () => dispatch({ type: 'clear' }),
      wishlist,
      toggleWishlist,
      isWishlisted: (slug) => wishlist.includes(slug),
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      menuOpen,
      openMenu: () => setMenuOpen(true),
      closeMenu: () => setMenuOpen(false),
      lastAdded,
      hydrated,
    }),
    [entries, addToCart, wishlist, toggleWishlist, cartOpen, searchOpen, menuOpen, lastAdded, hydrated],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop precisa estar dentro de <ShopProvider>.');
  return context;
}
