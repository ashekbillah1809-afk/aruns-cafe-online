import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu as MenuIcon, X, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { ADDRESS_LINE_1, ADDRESS_LINE_2, PHONE_PRIMARY, PHONE_SECONDARY } from "@/lib/menu";

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
      <Link to="/dine-in" className="hover:text-primary transition" activeProps={{ className: "text-primary" }} onClick={() => setOpen(false)}>
        Dine-In
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/85 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground font-display text-xl">A</span>
          <span className="font-display text-xl tracking-tight leading-none">
            Arun's<span className="text-primary">.</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">{nav}</nav>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative inline-flex items-center gap-2 px-3 h-10 rounded-full bg-ink text-primary-foreground hover:opacity-90 transition" style={{ background: "var(--ink)" }}>
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-semibold hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
          <nav className="flex flex-col px-4 py-4 gap-4 text-base font-semibold">{nav}</nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-primary-foreground" style={{ background: "var(--ink)" }}>
      <div className="max-w-6xl mx-auto px-4 py-14 grid sm:grid-cols-3 gap-10 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground font-display text-xl">A</span>
            <span className="font-display text-2xl tracking-tight">Arun's Cafe</span>
          </div>
          <p className="text-white/70 leading-relaxed">Fresh wok-tossed noodles, fried rice & spicy Indo-Chinese — delivered hot within 10 km.</p>
        </div>
        <div>
          <div className="font-display text-base mb-3 text-white">Visit us</div>
          <ul className="text-white/70 space-y-1.5">
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary" /> <span>{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</span></li>
            <li className="flex items-center gap-2 pt-1"><Phone className="w-4 h-4 text-primary" /> {PHONE_PRIMARY.replace("+91", "+91 ")}</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {PHONE_SECONDARY.replace("+91", "+91 ")}</li>
          </ul>
        </div>
        <div>
          <div className="font-display text-base mb-3 text-white">Hours & Links</div>
          <ul className="space-y-1.5 text-white/70">
            <li>Mon – Sun · 10 AM – 11 PM</li>
            <li><Link to="/menu" className="hover:text-primary">Order online</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact us</Link></li>
            <li><Link to="/about" className="hover:text-primary">Our story</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Arun's Cafe · Cooked with love in Basirhat.
      </div>
    </footer>
  );
}
