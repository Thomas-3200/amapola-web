"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

export type CartItem = {
  codigo: string;      // AMP-001
  nombre: string;      // "Cartera Olivia"
  precio: number;      // 42000
  imagen: string;      // filename.jpg
  cantidad: number;
};

type CartState = { items: CartItem[] };

type Action =
  | { type: "ADD"; item: Omit<CartItem, "cantidad">; cantidad?: number }
  | { type: "REMOVE"; codigo: string }
  | { type: "SET_QTY"; codigo: string; cantidad: number }
  | { type: "CLEAR" }
  | { type: "LOAD"; items: CartItem[] };

const STORAGE_KEY = "amapola_cart_v1";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "LOAD":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.find((i) => i.codigo === action.item.codigo);
      const add = action.cantidad ?? 1;
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.codigo === action.item.codigo ? { ...i, cantidad: i.cantidad + add } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.item, cantidad: add }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.codigo !== action.codigo) };
    case "SET_QTY": {
      if (action.cantidad <= 0) {
        return { items: state.items.filter((i) => i.codigo !== action.codigo) };
      }
      return {
        items: state.items.map((i) =>
          i.codigo === action.codigo ? { ...i, cantidad: action.cantidad } : i
        ),
      };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type CartCtx = {
  items: CartItem[];
  subtotal: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "cantidad">, cantidad?: number) => void;
  removeItem: (codigo: string) => void;
  setQty: (codigo: string, cantidad: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.items)) {
          dispatch({ type: "LOAD", items: parsed.items });
        }
      }
    } catch {}
    setLoaded(true);
  }, []);

  // Persist on change (only after initial load to avoid overwriting with empty)
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch {}
  }, [state.items, loaded]);

  const subtotal = useMemo(
    () => state.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
    [state.items]
  );

  const count = useMemo(
    () => state.items.reduce((acc, i) => acc + i.cantidad, 0),
    [state.items]
  );

  const value: CartCtx = {
    items: state.items,
    subtotal,
    count,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((v) => !v),
    addItem: (item, cantidad) => {
      dispatch({ type: "ADD", item, cantidad });
      setIsOpen(true); // open drawer on add
    },
    removeItem: (codigo) => dispatch({ type: "REMOVE", codigo }),
    setQty: (codigo, cantidad) => dispatch({ type: "SET_QTY", codigo, cantidad }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const fmtARS = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
