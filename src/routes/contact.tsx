import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import { DELIVERY_RADIUS_KM, WHATSAPP_NUMBER } from "@/lib/menu";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Arun's Cafe" },
      { name: "description", content: "Get in touch with Arun's Cafe for orders, reservations or feedback. Open 10 AM – 11 PM, every day." },
      { property: "og:title", content: "Contact Arun's Cafe" },
      { property: "og:description", content: "Reach Arun's Cafe by phone or WhatsApp." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const phone = "+" + WHATSAPP_NUMBER;
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <div className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Say hi</div>
        <h1 className="font-script neon-text text-5xl sm:text-6xl">Contact Us</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Questions, bulk orders, or just want to chat? We're around.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card icon={Phone} title="Call us" lines={[phone]} href={`tel:${phone}`} cta="Tap to call" />
        <Card icon={MessageCircle} title="WhatsApp" lines={["Quickest way to reach us"]} href={`https://wa.me/${WHATSAPP_NUMBER}`} cta="Open WhatsApp" />
        <Card icon={Clock} title="Hours" lines={["Mon – Sun", "10:00 AM – 11:00 PM"]} />
        <Card icon={MapPin} title="Delivery" lines={[`Anywhere within ${DELIVERY_RADIUS_KM} km of the cafe`]} />
      </div>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        For dine-in directions, please call us — we'll guide you straight to the door.
      </div>
    </div>
  );
}

function Card({
  icon: Icon, title, lines, href, cta,
}: { icon: any; title: string; lines: string[]; href?: string; cta?: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <Icon className="w-6 h-6 text-primary mb-3" />
      <div className="font-semibold mb-1">{title}</div>
      {lines.map((l) => <div key={l} className="text-muted-foreground text-sm">{l}</div>)}
      {href && cta && (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm font-medium text-primary hover:underline">{cta} →</a>
      )}
    </div>
  );
}
