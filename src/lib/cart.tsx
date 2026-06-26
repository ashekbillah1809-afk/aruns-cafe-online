import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { MENU, type MenuItem } from "./menu";

export type CartItem = { id: string; qty: number };

type CartContextValue = {
  items: CartItem[];
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: Array<{ item: MenuItem; qty: number; lineTotal: number }>;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aruns-cafe-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add = (id: string) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id, qty: 1 }];
    });

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const setQty = (id: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );

  const clear = () => setItems([]);

  const detailed = items
    .map((ci) => {
      const item = MENU.find((m) => m.id === ci.id);
      if (!item) return null;
      return { item, qty: ci.qty, lineTotal: item.price * ci.qty };
    })
    .filter(Boolean) as Array<{ item: MenuItem; qty: number; lineTotal: number }>;

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = detailed.reduce((s, d) => s + d.lineTotal, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, subtotal, detailed }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
