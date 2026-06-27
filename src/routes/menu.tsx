import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Minus, ShoppingBag, Search } from "lucide-react";
import { MENU, CATEGORIES, CURRENCY, type MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Arun's Cafe | Order Noodles, Fried Rice & Chinese" },
      { name: "description", content: "Browse Arun's Cafe full menu — noodles, fried rice, chilly chicken, lollipops, BBQ wings and combos. Add to cart and order online." },
      { property: "og:title", content: "Menu — Arun's Cafe" },
      { property: "og:description", content: "Order Indo-Chinese online — noodles, fried rice, chilly chicken & combos." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<MenuItem["category"] | "All">("All");
  const [q, setQ] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = useMemo(() => {
    return MENU.filter((m) => {
      if (active !== "All" && m.category !== active) return false;
      if (vegOnly && !m.veg) return false;
      if (q && !m.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [active, q, vegOnly]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">Our menu</div>
        <h1 className="font-display text-4xl sm:text-6xl leading-[0.95] mb-3">Tap. Add. <span className="text-primary">Devour.</span></h1>
        <p className="text-muted-foreground max-w-xl">Wok-tossed fresh, delivered hot within 10 km. Free delivery on orders over ₹299.</p>
      </header>

      {/* Search + veg toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 flex-1 focus-within:border-primary transition">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dishes…"
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
        <button
          onClick={() => setVegOnly((v) => !v)}
          className={`chip ${vegOnly ? "chip-active" : ""}`}
          aria-pressed={vegOnly}
        >
          <span className="veg-dot text-emerald-600" /> Veg only
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8 sticky top-16 z-30 bg-background/85 backdrop-blur-xl py-3 -mx-4 px-4">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`chip ${active === c ? "chip-active" : ""}`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <div className="text-5xl mb-3">🍽️</div>
          <p>No dishes match. Try clearing filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <CartFloater />
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const { items, add, setQty } = useCart();
  const inCart = items.find((i) => i.id === item.id);

  return (
    <article className="card-soft overflow-hidden flex flex-col">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
        <span className={`absolute top-3 left-3 veg-dot bg-card ${item.veg ? "text-emerald-600" : "text-red-600"}`} aria-label={item.veg ? "Veg" : "Non-veg"} />
        {item.price <= 99 && (
          <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
            Under ₹100
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg leading-tight">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1.5 flex-1">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-display text-2xl text-foreground">{CURRENCY}{item.price}</div>
          {inCart ? (
            <div className="inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-full p-1">
              <button onClick={() => setQty(item.id, inCart.qty - 1)} className="w-8 h-8 rounded-full hover:bg-white/15 inline-flex items-center justify-center" aria-label="Decrease">
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold w-6 text-center text-sm">{inCart.qty}</span>
              <button onClick={() => setQty(item.id, inCart.qty + 1)} className="w-8 h-8 rounded-full hover:bg-white/15 inline-flex items-center justify-center" aria-label="Increase">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => add(item.id)} className="font-bold text-sm text-primary border-2 border-primary rounded-full px-5 py-1.5 hover:bg-primary hover:text-primary-foreground transition">
              ADD +
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function CartFloater() {
  const { count, subtotal } = useCart();
  if (count === 0) return null;
  return (
    <Link
      to="/cart"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 btn-primary px-6 py-3.5 shadow-2xl flex items-center gap-3"
    >
      <ShoppingBag className="w-5 h-5" />
      <span className="font-bold">{count} item{count > 1 ? "s" : ""} · {CURRENCY}{subtotal}</span>
      <span className="opacity-80 text-sm">View cart →</span>
    </Link>
  );
}
