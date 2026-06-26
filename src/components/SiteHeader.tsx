import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const nav = (
    <>
      <Link to="/" className="hover:text-primary transition" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} onClick={() => setOpen(false)}>
        Home
      </Link>
      <Link to="/menu" className="hover:text-primary transition" activeProps={{ className: "text-primary" }} onClick={() => setOpen(false)}>
        Menu
      </Link>
      <Link to="/about" className="hover:text-primary transition" activeProps={{ className: "text-primary" }} onClick={() => setOpen(false)}>
        About
      </Link>
      <Link to="/contact" className="hover:text-primary transition" activeProps={{ className: "text-primary" }} onClick={() => setOpen(false)}>
        Contact
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/75 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-script neon-text text-3xl leading-none">Arun's</span>
          <span className="font-script neon-text text-3xl leading-none">Cafe</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">{nav}</nav>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary transition">
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
          <nav className="flex flex-col px-4 py-4 gap-4 text-base font-medium">{nav}</nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-script neon-text text-3xl mb-2">Arun's Cafe</div>
          <p className="text-muted-foreground">Cafe & Restaurant — fresh food, warm vibes, delivered to your doorstep within 10 km.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Visit</div>
          <ul className="text-muted-foreground space-y-1">
            <li>Champapukur Road, Atghara</li>
            <li>Basirhat, West Bengal 743291</li>
            <li className="pt-1">📞 7001983447</li>
            <li>📞 8250202652</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Hours & Links</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>Mon – Sun · 10 AM – 11 PM</li>
            <li><Link to="/menu" className="hover:text-primary">Order online</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact us</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Arun's Cafe. All rights reserved.
      </div>
    </footer>
  );
}

