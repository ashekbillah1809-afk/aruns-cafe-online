import { createFileRoute, Link } from "@tanstack/react-router";
import storefront from "@/assets/storefront.jpeg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Arun's Cafe" },
      { name: "description", content: "Arun's Cafe is your neighbourhood cafe & restaurant — warm vibes, fresh food, and home delivery within 10 km." },
      { property: "og:title", content: "About Arun's Cafe" },
      { property: "og:description", content: "A neighbourhood cafe with warm vibes and fresh food." },
      { property: "og:image", content: storefront.url },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <div className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Our story</div>
        <h1 className="font-script neon-text text-5xl sm:text-6xl">About Arun's Cafe</h1>
      </header>
      <div className="rounded-3xl overflow-hidden border border-border mb-12">
        <img src={storefront.url} alt="Arun's Cafe storefront" className="w-full h-auto" />
      </div>
      <div className="max-w-none text-muted-foreground space-y-5 text-base leading-relaxed">
        <p>
          Arun's Cafe started with a simple idea — make the kind of food and coffee you'd want to share with a friend, at prices that don't make you flinch. From slow-brewed masala chai to wood-fired pizzas and indulgent cold coffees, every dish on our menu is made fresh, the moment you order.
        </p>
        <p>
          Step in and you'll be greeted by our golden neon sign, twinkling wings on the wall, and the smell of butter on the grill. Can't make it down? No problem — order online and we'll deliver your favourites straight to your door, anywhere within 10 km of the cafe.
        </p>
        <p>
          Whether it's a quick chai break, a long lazy brunch, or a midnight craving — we've got you. Thanks for stopping by.
        </p>
      </div>
      <div className="text-center mt-12">
        <Link to="/menu" className="btn-primary px-6 py-3 text-base">See the menu</Link>
      </div>
    </div>
  );
}
