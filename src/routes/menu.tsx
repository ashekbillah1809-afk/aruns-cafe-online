import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus, ShoppingBag, Leaf } from "lucide-react";
import { MENU, CATEGORIES, CURRENCY, type MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Arun's Cafe | Order Online" },
      { name: "description", content: "Browse Arun's Cafe full menu — sandwiches, burgers, pizzas, shakes, coffee, desserts. Add to cart and order for home delivery." },
      { property: "og:title", content: "Menu — Arun's Cafe" },
      { property: "og:description", content: "Order sandwiches, burgers, pizzas, shakes & desserts online." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<MenuItem["category"] | "All">("All");
  const filtered = active === "All" ? MENU : MENU.filter((m) => m.category === active);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-10 text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Our menu</div>
        <h1 className="font-script neon-text text-5xl sm:text-6xl mb-3">Order Online</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">Fresh, hand-crafted and delivered within 10 km. Tap + to add items to your cart.</p>
      </header>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 sticky top-16 z-30 bg-background/70 backdrop-blur py-3 -mx-4 px-4">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              active === c
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      <CartFloater />
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const { items, add, setQty } = useCart();
  const inCart = items.find((i) => i.id === item.id);

  return (
    <article className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/60 transition">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
        {item.veg && (
          <span className="absolute top-3 left-3 bg-background/85 backdrop-blur rounded-md px-2 py-1 text-[10px] font-bold text-emerald-400 inline-flex items-center gap-1">
            <Leaf className="w-3 h-3" /> VEG
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 flex-1">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold text-primary">{CURRENCY}{item.price}</div>
          {inCart ? (
            <div className="inline-flex items-center gap-3 bg-secondary rounded-full p-1">
              <button onClick={() => setQty(item.id, inCart.qty - 1)} className="w-8 h-8 rounded-full bg-background hover:bg-muted inline-flex items-center justify-center" aria-label="Decrease">
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold w-5 text-center">{inCart.qty}</span>
              <button onClick={() => setQty(item.id, inCart.qty + 1)} className="w-8 h-8 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center" aria-label="Increase">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => add(item.id)} className="btn-primary text-sm px-4 py-2">
              <Plus className="w-4 h-4" /> Add
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
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 btn-primary px-5 py-3 shadow-2xl flex items-center gap-3"
    >
      <ShoppingBag className="w-5 h-5" />
      <span className="font-semibold">{count} item{count > 1 ? "s" : ""} · {CURRENCY}{subtotal}</span>
      <span className="opacity-80">View cart →</span>
    </Link>
  );
}
