import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bike, Clock, Search, Star, Flame, Leaf, ShieldCheck } from "lucide-react";
import storefront from "@/assets/storefront.jpeg.asset.json";
import { MENU, CATEGORIES, DELIVERY_RADIUS_KM, CURRENCY, FREE_DELIVERY_OVER } from "@/lib/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arun's Cafe — Order Noodles, Fried Rice & Chinese Online" },
      { name: "description", content: "Order fresh Indo-Chinese — noodles, fried rice, chilly chicken & combos. Home delivery within 10 km of Atghara, Basirhat. Free delivery over ₹299." },
      { property: "og:title", content: "Arun's Cafe — Order Online" },
      { property: "og:description", content: "Hot Indo-Chinese delivered to your door. Free delivery over ₹299." },
      { property: "og:image", content: storefront.url },
      { name: "twitter:image", content: storefront.url },
    ],
  }),
  component: HomePage,
});

const CATEGORY_META: Record<string, { emoji: string; tag: string }> = {
  Noodles: { emoji: "🍜", tag: "Wok-tossed" },
  "Chinese Side Dish": { emoji: "🍗", tag: "Spicy & crispy" },
  "Fried Rice": { emoji: "🍚", tag: "Aromatic" },
  Combo: { emoji: "🥡", tag: "Best value" },
};

function HomePage() {
  const featured = MENU.slice(0, 8);
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 pt-10 sm:pt-16 pb-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Open now · 10 AM – 11 PM
            </div>
            <h1 className="font-display text-5xl sm:text-7xl leading-[0.95] mb-5">
              Hot. Spicy.<br />
              <span className="text-primary">Delivered.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-7 max-w-md">
              Fresh wok-tossed noodles, fried rice & Indo-Chinese — straight from <span className="font-semibold text-foreground">Arun's Cafe</span> to your doorstep. Free delivery over {CURRENCY}{FREE_DELIVERY_OVER}.
            </p>

            {/* Search bar (decorative — links to menu) */}
            <Link to="/menu" className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 max-w-md shadow-sm hover:border-primary transition">
              <Search className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground flex-1 text-sm">Search "chicken noodles", "fried rice"…</span>
              <span className="btn-primary text-xs px-3 py-1.5">Browse</span>
            </Link>

            <div className="flex flex-wrap gap-5 mt-7 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Star className="w-4 h-4 text-accent fill-accent" /> 4.6 local favourite</span>
              <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> ~30 min delivery</span>
              <span className="inline-flex items-center gap-2"><Bike className="w-4 h-4 text-primary" /> {DELIVERY_RADIUS_KM} km radius</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-border bg-card">
              <img src={storefront.url} alt="Arun's Cafe storefront" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" style={{ background: "linear-gradient(to top, oklch(0.16 0.02 150 / 0.6), transparent 60%)" }} />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="bg-background/95 backdrop-blur rounded-2xl p-3 flex items-center gap-3 flex-1">
                  <Flame className="w-5 h-5 text-primary" />
                  <div className="text-xs">
                    <div className="font-display text-sm leading-tight">Today's hot pick</div>
                    <div className="text-muted-foreground">Chilly Chicken Gravy · {CURRENCY}130</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating sticker */}
            <div className="absolute -top-4 -right-2 sm:-right-6 bg-accent text-accent-foreground rounded-2xl px-4 py-3 font-display text-sm rotate-6 shadow-xl">
              FREE delivery<br />over {CURRENCY}{FREE_DELIVERY_OVER}
            </div>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">What's cooking</div>
            <h2 className="text-3xl sm:text-4xl">Pick a craving</h2>
          </div>
          <Link to="/menu" className="text-sm text-primary font-semibold hover:underline hidden sm:inline-flex items-center gap-1">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => (
            <Link key={c} to="/menu" className="card-soft p-5 text-left group">
              <div className="text-4xl mb-3">{CATEGORY_META[c]?.emoji ?? "🍽️"}</div>
              <div className="font-display text-lg leading-tight">{c}</div>
              <div className="text-xs text-muted-foreground mt-1">{CATEGORY_META[c]?.tag}</div>
              <div className="mt-3 text-primary text-sm font-semibold inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                Order <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured dishes */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">Top sellers</div>
            <h2 className="text-3xl sm:text-4xl">Crowd favourites</h2>
          </div>
          <Link to="/menu" className="text-sm text-primary font-semibold hover:underline inline-flex items-center gap-1">
            Full menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featured.map((m) => (
            <Link key={m.id} to="/menu" className="card-soft overflow-hidden flex flex-col group">
              <div className="aspect-square overflow-hidden relative">
                <img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className={`absolute top-2 left-2 veg-dot bg-card ${m.veg ? "text-emerald-600" : "text-red-600"}`} aria-label={m.veg ? "Veg" : "Non-veg"} />
              </div>
              <div className="p-3 sm:p-4 flex flex-col gap-1 flex-1">
                <div className="font-display text-sm leading-tight line-clamp-2">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.category}</div>
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <div className="font-display text-lg text-primary">{CURRENCY}{m.price}</div>
                  <span className="text-xs font-bold text-primary border border-primary rounded-full px-2.5 py-1 group-hover:bg-primary group-hover:text-primary-foreground transition">ADD</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promises strip */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Bike, title: `${DELIVERY_RADIUS_KM} km delivery`, desc: `Free over ${CURRENCY}${FREE_DELIVERY_OVER}, flat ${CURRENCY}40 otherwise.` },
            { icon: ShieldCheck, title: "Fresh, every order", desc: "Cooked the moment you tap order." },
            { icon: Leaf, title: "Veg & Non-veg", desc: "Clearly labelled — pick what you love." },
          ].map((f) => (
            <div key={f.title} className="card-soft p-6">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-soft text-primary mb-3">
                <f.icon className="w-5 h-5" />
              </div>
              <div className="font-display text-lg mb-1">{f.title}</div>
              <div className="text-sm text-muted-foreground">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center" style={{ background: "var(--ink)" }}>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-3">Hungry?</div>
            <h2 className="font-display text-4xl sm:text-6xl text-white mb-4 leading-[0.95]">
              Skip the queue.<br /><span className="text-primary">Tap. Order. Eat.</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Add your favourites, pick a payment method, and we'll bring it hot to your door.
            </p>
            <Link to="/menu" className="btn-primary text-base px-7 py-3.5">
              Open the menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
