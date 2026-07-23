"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CheckoutButton({
  priceId,
  label,
  highlighted,
}: {
  priceId?: string;
  label: string;
  highlighted?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (!priceId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      if (res.status === 401) {
        router.push("/auth/login");
        return;
      }

      const data = await res.json();

      if (data.url) {
        window.location.assign(data.url);
      } else {
        setError(data.error ?? "Unknown error");
        setLoading(false);
      }
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`mt-8 inline-flex items-center justify-center rounded-lg text-sm font-medium px-6 h-11 w-full transition-all duration-150 ${
          highlighted
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "border border-border bg-background text-foreground hover:bg-card"
        }`}
      >
        {loading ? "Redirecting..." : label}
      </button>
      {error && (
        <p className="mt-2 text-xs text-destructive text-center">{error}</p>
      )}
    </div>
  );
}
