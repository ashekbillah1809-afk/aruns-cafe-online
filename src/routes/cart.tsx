import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { CURRENCY, DELIVERY_CHARGE, DELIVERY_RADIUS_KM, FREE_DELIVERY_OVER, WHATSAPP_NUMBER } from "@/lib/menu";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Arun's Cafe" },
      { name: "description", content: "Review your order and check out for home delivery from Arun's Cafe." },
      { property: "og:title", content: "Your Cart — Arun's Cafe" },
      { property: "og:description", content: "Review your order and check out." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, count, setQty, remove, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_CHARGE;
  const total = subtotal + deliveryFee;

  if (count === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add a few delicious things from our menu to get started.</p>
        <Link to="/menu" className="btn-primary px-6 py-3">Browse menu <ArrowRight className="w-4 h-4" /></Link>
      </div>
    );
  }

  const checkout = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!/^[0-9+\s-]{8,}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number";
    if (form.address.trim().length < 10) errs.address = "Enter your full delivery address";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const lines = detailed.map((d) => `• ${d.qty} × ${d.item.name} — ${CURRENCY}${d.lineTotal}`).join("\n");
    const message =
      `*New order — Arun's Cafe*\n\n` +
      `${lines}\n\n` +
      `Subtotal: ${CURRENCY}${subtotal}\n` +
      `Delivery: ${deliveryFee === 0 ? "FREE" : CURRENCY + deliveryFee}\n` +
      `*Total: ${CURRENCY}${total}*\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Address: ${form.address}\n` +
      (form.notes ? `Notes: ${form.notes}\n` : "");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-script neon-text text-5xl sm:text-6xl text-center mb-10">Your Order</h1>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Items */}
        <div className="space-y-4">
          {detailed.map((d) => (
            <div key={d.item.id} className="bg-card border border-border rounded-2xl p-4 flex gap-4 items-center">
              <img src={d.item.image} alt={d.item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{d.item.name}</div>
                <div className="text-sm text-muted-foreground">{CURRENCY}{d.item.price} each</div>
              </div>
              <div className="inline-flex items-center gap-2 bg-secondary rounded-full p-1">
                <button onClick={() => setQty(d.item.id, d.qty - 1)} className="w-8 h-8 rounded-full bg-background hover:bg-muted inline-flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                <span className="font-semibold w-5 text-center">{d.qty}</span>
                <button onClick={() => setQty(d.item.id, d.qty + 1)} className="w-8 h-8 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="hidden sm:block w-20 text-right font-bold text-primary">{CURRENCY}{d.lineTotal}</div>
              <button onClick={() => remove(d.item.id)} aria-label="Remove" className="w-9 h-9 rounded-full hover:bg-secondary inline-flex items-center justify-center text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">Clear cart</button>
        </div>

        {/* Summary + checkout */}
        <aside className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-semibold text-lg mb-4">Order summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{CURRENCY}{subtotal}</span></div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery (within {DELIVERY_RADIUS_KM} km)</span>
              <span>{deliveryFee === 0 ? <span className="text-emerald-400 font-medium">FREE</span> : `${CURRENCY}${deliveryFee}`}</span>
            </div>
            {deliveryFee !== 0 && (
              <div className="text-xs text-muted-foreground">Add {CURRENCY}{FREE_DELIVERY_OVER - subtotal} more for free delivery</div>
            )}
            <div className="border-t border-border my-3"></div>
            <div className="flex justify-between text-base font-bold"><span>Total</span><span className="text-primary">{CURRENCY}{total}</span></div>
          </div>

          <form onSubmit={checkout} className="mt-6 space-y-3">
            <Field label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} />
            <Field label="Phone number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} placeholder="e.g. +91 9XXXXXXXXX" />
            <Field label="Delivery address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} error={errors.address} textarea placeholder="House / flat, street, landmark, area" />
            <Field label="Notes (optional)" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} placeholder="Less spicy, extra ketchup..." />
            <button type="submit" className="btn-primary w-full py-3 text-base mt-2">
              Place order via WhatsApp
            </button>
            <p className="text-[11px] text-muted-foreground text-center">We'll confirm your order on WhatsApp & deliver within ~30–45 min.</p>
          </form>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, error, type = "text", placeholder, textarea,
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string;
  type?: string; placeholder?: string; textarea?: boolean;
}) {
  const cls = `w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary transition ${error ? "border-destructive" : "border-border"}`;
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={`${cls} mt-1 resize-none`} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} mt-1`} />
      )}
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  );
}
