"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";

interface RazorpayCheckout {
  new (options: Record<string, unknown>): { open(): void };
}

export function PremiumCheckout() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

  async function startCheckout() {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "premium" }),
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Could not start payment.");
      }

      const data = (await res.json()) as {
        orderId: string;
        keyId: string;
        amount: number;
        currency: string;
      };

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const Checkout = (window as { Razorpay?: RazorpayCheckout }).Razorpay;
        if (!Checkout) {
          setMessage("Payment could not load. Please try again.");
          setBusy(false);
          return;
        }
        const rzp = new Checkout({
          key_id: data.keyId,
          order_id: data.orderId,
          amount: data.amount,
          currency: data.currency,
          name: "ClauseIt",
          description: "Premium plan",
          theme: { color: "#143A3A" },
          handler: () => {
            setPaid(true);
            setMessage("Payment received in test mode. Your plan is upgrading.");
            router.refresh();
          },
          modal: {
            ondismiss: () => setBusy(false),
          },
        });
        rzp.open();
      };
      script.onerror = () => {
        setMessage("Payment could not load. Please try again.");
        setBusy(false);
      };
      document.body.appendChild(script);
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Could not start payment."
      );
      setBusy(false);
    }
  }

  if (paid) {
    return (
      <div className="rounded-xl border border-sage/30 bg-sage-soft px-5 py-4 text-sm text-ink">
        <span className="font-semibold text-sage">Payment done (test mode).</span>{" "}
        Your plan will update within a minute. Refresh to see Premium active.
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={startCheckout}
        disabled={busy}
        className="gradient-bg inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-all hover:brightness-110 disabled:opacity-60"
      >
        <Lock className="h-4 w-4" aria-hidden="true" />
        {busy ? "Starting payment..." : "Get Premium — ₹599/month"}
      </button>
      {message ? (
        <p className="mt-4 max-w-md text-sm text-ink-soft">{message}</p>
      ) : (
        <p className="mt-4 flex max-w-md items-start gap-2 text-sm text-ink-soft">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
          Test mode is on, so no real money moves. Switch it off when billing
          goes live.
        </p>
      )}
    </div>
  );
}
