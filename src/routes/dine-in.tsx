import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Loader2, ShieldCheck, AlertTriangle, Utensils, ArrowRight } from "lucide-react";
import { CAFE_LAT, CAFE_LNG, DINEIN_RADIUS_M, TABLE_COUNT } from "@/lib/menu";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/dine-in")({
  head: () => ({
    meta: [
      { title: "Dine-In Ordering — Arun's Cafe" },
      { name: "description", content: "Inside Arun's Cafe? Pick your table number and order straight from your phone — no waiter needed." },
      { property: "og:title", content: "Dine-In Ordering — Arun's Cafe" },
      { property: "og:description", content: "Scan, pick your table, order from your phone." },
    ],
  }),
  component: DineInPage,
});

type Status = "idle" | "checking" | "denied" | "outside" | "inside" | "unsupported" | "error";

// Haversine — distance in metres between two GPS points
function distanceMeters(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function DineInPage() {
  const router = useRouter();
  const { dineIn, startDineIn, endDineIn } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [distance, setDistance] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [table, setTable] = useState<number | "">("");

  const verify = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("checking");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const d = distanceMeters(pos.coords.latitude, pos.coords.longitude, CAFE_LAT, CAFE_LNG);
        // Generous: factor in GPS accuracy reported by the device
        const allowed = DINEIN_RADIUS_M + Math.min(pos.coords.accuracy ?? 0, 80);
        setDistance(d);
        setStatus(d <= allowed ? "inside" : "outside");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setStatus("denied");
        else {
          setErrorMsg(err.message || "Could not read your location.");
          setStatus("error");
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    );
  };

  // If user already has an active dine-in session, skip the geofence
  useEffect(() => {
    if (dineIn) setStatus("inside");
  }, [dineIn]);

  const confirmTable = () => {
    if (!table || table < 1 || table > TABLE_COUNT) return;
    startDineIn(Number(table));
    router.navigate({ to: "/menu" });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
          <Utensils className="w-4 h-4" /> In-Cafe Service
        </div>
        <h1 className="font-display text-4xl sm:text-6xl leading-[0.95]">
          Order from your <span className="text-primary">table</span>.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Skip the queue, no waiter needed. Verify you're at the cafe, pick your table
          number, order anything from the menu and pay right from your phone.
        </p>
      </header>

      {/* Active session */}
      {dineIn && (
        <div className="bg-card border border-primary/40 rounded-2xl p-6 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/15 text-primary inline-flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="font-bold">You're seated at Table {dineIn.tableNumber}</div>
            <div className="text-xs text-muted-foreground">Session active. Order anything from the menu — bill goes straight to your table.</div>
          </div>
          <Link to="/menu" className="btn-primary px-4 py-2 text-sm">Open menu <ArrowRight className="w-4 h-4" /></Link>
        </div>
      )}

      {/* Step 1 — Verify location */}
      {!dineIn && (
        <section className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl mb-1">Step 1 — Verify you're at the cafe</h2>
              <p className="text-sm text-muted-foreground mb-4">
                We use your phone's location to make sure dine-in orders only come from
                inside Arun's Cafe. Your location isn't stored or shared.
              </p>

              {status === "idle" && (
                <button onClick={verify} className="btn-primary px-5 py-2.5">
                  <MapPin className="w-4 h-4" /> Check my location
                </button>
              )}

              {status === "checking" && (
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" /> Checking your location…
                </div>
              )}

              {status === "inside" && (
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-500">
                  <ShieldCheck className="w-4 h-4" /> You're inside the cafe ({distance ? Math.round(distance) : 0} m away). Pick your table below.
                </div>
              )}

              {status === "outside" && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-rose-500">
                    <AlertTriangle className="w-4 h-4 mt-0.5" />
                    <div>
                      You're about {distance ? Math.round(distance) : "?"} m away — too far for dine-in.
                      Dine-in ordering only works when you're physically inside Arun's Cafe.
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={verify} className="text-sm px-4 py-2 rounded-md border border-border hover:bg-secondary">Try again</button>
                    <Link to="/menu" className="text-sm px-4 py-2 rounded-md border border-border hover:bg-secondary">Order delivery instead</Link>
                  </div>
                </div>
              )}

              {status === "denied" && (
                <div className="text-sm text-rose-500">
                  Location access is blocked. Please allow location for this site in your browser settings, then{" "}
                  <button onClick={verify} className="underline font-semibold">try again</button>.
                </div>
              )}

              {status === "unsupported" && (
                <div className="text-sm text-rose-500">
                  Your browser doesn't support location. Please ask staff for assistance.
                </div>
              )}

              {status === "error" && (
                <div className="text-sm text-rose-500">
                  Couldn't read your location: {errorMsg}{" "}
                  <button onClick={verify} className="underline font-semibold">Retry</button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Step 2 — Pick table */}
      {!dineIn && (
        <section className={`bg-card border border-border rounded-2xl p-6 transition ${status === "inside" ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center flex-shrink-0 font-bold">2</div>
            <div className="flex-1">
              <h2 className="font-display text-xl mb-1">Step 2 — Pick your table</h2>
              <p className="text-sm text-muted-foreground mb-4">
                We have {TABLE_COUNT} tables. Tap the number that matches the card on your table.
              </p>

              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 mb-5">
                {Array.from({ length: TABLE_COUNT }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setTable(n)}
                    aria-pressed={table === n}
                    className={`aspect-square rounded-xl border-2 font-bold text-sm transition ${
                      table === n
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/60"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <button
                onClick={confirmTable}
                disabled={status !== "inside" || !table}
                className="btn-primary px-6 py-3 disabled:opacity-50"
              >
                Start ordering at Table {table || "—"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {dineIn && (
        <div className="text-center mt-6">
          <button onClick={endDineIn} className="text-xs text-muted-foreground hover:text-destructive underline">
            End dine-in session
          </button>
        </div>
      )}
    </div>
  );
}
