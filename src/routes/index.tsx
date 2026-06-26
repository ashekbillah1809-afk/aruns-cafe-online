import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bike, Clock, Sparkles } from "lucide-react";
import storefront from "@/assets/storefront.jpeg.asset.json";
import { MENU, DELIVERY_RADIUS_KM, CURRENCY, FREE_DELIVERY_OVER } from "@/lib/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arun's Cafe — Cafe & Restaurant, Order Online" },
      { name: "description", content: "Cosy neighbourhood cafe serving fresh sandwiches, burgers, pizzas, shakes & coffee. Home delivery within 10 km of Arun's Cafe." },
      { property: "og:title", content: "Arun's Cafe — Cafe & Restaurant" },
      { property: "og:description", content: "Order fresh cafe food online. Delivery within 10 km." },
      { property: "og:image", content: storefront.url },
      { name: "twitter:image", content: storefront.url },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = MENU.slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={storefront.url} alt="Arun's Cafe storefront with neon sign" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-36 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary mb-6">
            <Sparkles className="w-4 h-4" /> Cafe & Restaurant
          </div>
          <h1 className="font-script neon-text text-6xl sm:text-8xl leading-none mb-6">
            Arun's Cafe
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Warm vibes, fresh food, late-night cravings sorted.
            Order online and we'll deliver to your door — anywhere within {DELIVERY_RADIUS_KM} km.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/menu" className="btn-primary text-base px-6 py-3">
              Order Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/about" className="btn-ghost text-base px-6 py-3">Our Story</Link>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid sm:grid-cols-3 gap-4">
        {[
          { icon: Bike, title: `Delivery within ${DELIVERY_RADIUS_KM} km`, desc: `Flat fee, free on orders over ${CURRENCY}${FREE_DELIVERY_OVER}.` },
          { icon: Clock, title: "Open 10 AM – 11 PM", desc: "All days of the week. Yes, even Mondays." },
          { icon: Sparkles, title: "Made fresh, every order", desc: "Hand-crafted by our chefs the moment you order." },
        ].map((f) => (
          <div key={f.title} className="bg-card border border-border rounded-2xl p-6">
            <f.icon className="w-6 h-6 text-primary mb-3" />
            <div className="font-semibold mb-1">{f.title}</div>
            <div className="text-sm text-muted-foreground">{f.desc}</div>
          </div>
        ))}
      </section>

      {/* Featured menu */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Popular picks</div>
            <h2 className="text-3xl sm:text-4xl font-bold">Crowd favourites</h2>
          </div>
          <Link to="/menu" className="hidden sm:inline-flex items-center gap-2 text-sm text-primary hover:underline">
            See full menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((m) => (
            <Link key={m.id} to="/menu" className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition">
              <div className="aspect-square overflow-hidden">
                <img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-4">
                <div className="font-semibold mb-1 line-clamp-1">{m.name}</div>
                <div className="text-primary font-bold">{CURRENCY}{m.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-3xl neon-border p-10 sm:p-14 text-center bg-card/60">
          <h2 className="font-script neon-text text-5xl sm:text-6xl mb-4">Hungry yet?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Browse the full menu, add your favourites to the cart, and check out in seconds. We'll bring it to you hot.
          </p>
          <Link to="/menu" className="btn-primary text-base px-6 py-3">
            View the Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
