"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Sparkles,
  FileText,
  Image,
  Copy,
  Check,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/CheckoutButton";
import { authClient } from "@/lib/auth/client";
import { generateListingAction, type QuotaReason } from "./_actions";

type Tab = "listing" | "aplus";

const categories = [
  "Home & Kitchen",
  "Electronics",
  "Sports & Outdoors",
  "Health & Household",
  "Beauty & Personal Care",
  "Toys & Games",
  "Clothing & Accessories",
  "Automotive",
  "Office Products",
  "Pet Supplies",
];

const mockAPlus = {
  headline: "Premium Hydration, Engineered for Life",
  modules: [
    {
      title: "Feels Cold. Stays Cold.™",
      body: "Our patented ThermaLock double-wall vacuum technology creates an impenetrable barrier between your drink and the outside world. Ice cubes still intact after 24 hours — we've tested it in Phoenix summer heat, Himalayan base camps, and everything in between. No gimmicks, just physics done right.",
    },
    {
      title: "Built for the Long Haul",
      body: "18/8 surgical-grade stainless steel. BPA-free. Phthalate-free. Lead-free. Every AQUAFORGE bottle is crafted from materials that are as clean as the water you put inside. The electropolished interior is smoother than glass — nothing sticks, nothing stains, nothing lingers.",
    },
    {
      title: "Designed Around Your Day",
      body: "From the 5 AM gym session to the midnight deadline, AQUAFORGE moves with you. The ergonomic contour fits car cup holders, backpack pockets, and bike cages. The FlexSip lid opens with one hand and locks with an audible click. Wide mouth means easy ice loading, easy cleaning, and easy infusion.",
    },
  ],
};

type GeneratedData = {
  title: string;
  bullets: string[];
  description: string;
  searchTerms: string;
};

export function ListingClient({
  initialUsed,
  initialLimit,
}: {
  initialUsed: number;
  initialLimit: number;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("listing");
  const [copied, setCopied] = useState<string | null>(null);
  const [generated, setGenerated] = useState<GeneratedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [quotaModal, setQuotaModal] = useState<{ reason: QuotaReason; used?: number; limit?: number } | null>(null);
  const { data: sessionData } = authClient.useSession();
  const loggedIn = !!sessionData?.user;

  // Track usage locally so the counter updates instantly after each generation
  const [used, setUsed] = useState(initialUsed);
  const [limit, setLimit] = useState(initialLimit);

  // Sync with server when props change (e.g. after upgrade via webhook + router.refresh)
  useEffect(() => {
    setUsed(initialUsed);
    setLimit(initialLimit);
  }, [initialUsed, initialLimit]);

  const remaining = Math.max(0, limit - used);
  const usedPercent = limit > 0 ? (used / limit) * 100 : 100;
  const isNearLimit = remaining <= 3 && remaining > 0;
  const isExhausted = remaining <= 0;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleGenerate = useCallback(async () => {
    if (!title.trim() && !description.trim()) return;
    setLoading(true);
    setQuotaModal(null);

    try {
      const result = await generateListingAction(title, category, description);

      if (!result.allowed) {
        setQuotaModal(result as { reason: QuotaReason; used?: number; limit?: number });
        return;
      }

      if ("data" in result && result.data) {
        setGenerated(result.data);
        setUsed((u) => u + 1);
        setActiveTab("listing");
      }
    } finally {
      setLoading(false);
    }
  }, [title, category, description]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-14">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-primary"
          >
            <Logo className="size-7" />
            ListGen
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/settings"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Settings
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-[-0.015em]">
              AI Listing Generator
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your product details and generate a complete Amazon listing in seconds.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back
          </Link>
        </div>

        {/* Usage Bar — only for logged-in users */}
        {loggedIn && (
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Listings Remaining
            </span>
            <span className={`text-sm font-medium ${
              isExhausted ? "text-destructive" : isNearLimit ? "text-amber-500" : "text-foreground"
            }`}>
              {remaining} / {limit}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isExhausted ? "bg-destructive" : isNearLimit ? "bg-amber-500" : "bg-primary"
              }`}
              style={{ width: `${Math.min(usedPercent, 100)}%` }}
            />
          </div>
          {isExhausted && (
            <div className="mt-3 space-y-2">
              {limit < 100 ? (
                <>
                  <p className="text-xs text-destructive font-medium">
                    You&apos;ve reached your {limit}-listing limit. Upgrade to Pro for 100/month.
                  </p>
                  <CheckoutButton
                    priceId={process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!}
                    label="Upgrade to Pro"
                  />
                </>
              ) : (
                <>
                  <p className="text-xs text-destructive font-medium">
                    You&apos;ve used all {limit} listings this month. Upgrade to Enterprise for 300/month.
                  </p>
                  <CheckoutButton
                    priceId={process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID!}
                    label="Upgrade to Enterprise"
                  />
                </>
              )}
            </div>
          )}
          {isNearLimit && (
            <p className="mt-2 text-xs text-amber-500 font-medium">
              Almost there — only {remaining} generation{remaining === 1 ? "" : "s"} left.
            </p>
          )}
        </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 lg:min-h-[calc(100vh-14rem)]">
          {/* Left: Input Card */}
          <div className="rounded-xl border border-border bg-card">
            <div className="px-6 py-5 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">
                Product Details
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Fill in the details below to generate your listing
              </p>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Stainless Steel Insulated Water Bottle 32oz"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 bg-no-repeat bg-[right_0.75rem_center]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundSize: "1.25rem",
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product — materials, features, benefits..."
                  rows={5}
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 resize-none"
                />
              </div>

              <Button
                variant="default"
                className="h-11 w-full gap-2"
                onClick={handleGenerate}
                disabled={(!title.trim() && !description.trim()) || loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate Listing
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right: Results Card */}
          <div className="rounded-xl border border-border bg-card flex flex-col">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Generated Content
              </h2>
              {generated && (
                <span className="inline-flex items-center gap-1.5 text-xs text-success font-medium">
                  <Sparkles className="size-3" />
                  AI Generated
                </span>
              )}
            </div>

            {generated ? (
              <>
                <div className="flex border-b border-border">
                  <button
                    onClick={() => setActiveTab("listing")}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === "listing"
                        ? "text-primary border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    <FileText className="size-4" />
                    Listing
                  </button>
                  <button
                    onClick={() => setActiveTab("aplus")}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === "aplus"
                        ? "text-primary border-primary"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    <Image className="size-4" />
                    A+ Content
                  </button>
                </div>

                <div className="flex-1 p-6 overflow-auto">
                  {activeTab === "listing" ? (
                    <div className="space-y-6">
                      <ResultSection label="Product Title" onCopy={() => handleCopy(generated.title, "title")} copied={copied === "title"}>
                        <p className="text-sm text-foreground leading-relaxed">{generated.title}</p>
                      </ResultSection>

                      <ResultSection label="Bullet Points" onCopy={() => handleCopy(generated.bullets.join("\n"), "bullets")} copied={copied === "bullets"}>
                        <ul className="space-y-2.5">
                          {generated.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-foreground leading-relaxed">
                              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </ResultSection>

                      <ResultSection label="Product Description" onCopy={() => handleCopy(generated.description, "description")} copied={copied === "description"}>
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{generated.description}</p>
                      </ResultSection>

                      <ResultSection label="Backend Search Terms" onCopy={() => handleCopy(generated.searchTerms, "searchTerms")} copied={copied === "searchTerms"}>
                        <p className="text-sm text-muted-foreground leading-relaxed break-all">{generated.searchTerms}</p>
                      </ResultSection>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {mockAPlus.modules.map((mod, i) => (
                        <div key={i} className="rounded-lg border border-border bg-background p-5">
                          <div className="aspect-[3/2] rounded-lg bg-muted flex items-center justify-center mb-4">
                            <div className="text-center">
                              <Image className="size-8 text-muted-foreground mx-auto mb-2" />
                              <span className="text-xs text-muted-foreground">Product Image {i + 1}</span>
                            </div>
                          </div>
                          <h4 className="text-base font-semibold text-foreground">{mod.title}</h4>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{mod.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <Sparkles className="size-10 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Enter your product details and click Generate to see results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Quota Modal */}
      {quotaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setQuotaModal(null)} />
          <div className="relative w-full max-w-sm mx-4 rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
                <AlertTriangle className="size-6 text-destructive" />
              </div>
              {quotaModal.reason === "login" ? (
                <>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Sign in Required</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    You need to sign in before generating listings.
                  </p>
                  <Link
                    href="/auth/sign-in"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium px-6 h-10 hover:opacity-90 transition-all"
                  >
                    Sign In
                    <ArrowUpRight className="size-4" />
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Quota Exceeded</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    You&apos;ve used all {quotaModal.limit} of your listing generations.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {quotaModal.limit && quotaModal.limit < 100
                      ? "Upgrade to Pro for 100 listings/month."
                      : "Upgrade to Enterprise for 300 listings/month."}
                  </p>
                  <div className="flex flex-col gap-2">
                    <CheckoutButton
                      priceId={
                        quotaModal.limit && quotaModal.limit < 100
                          ? process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID
                          : process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID
                      }
                      label={
                        quotaModal.limit && quotaModal.limit < 100
                          ? "Upgrade to Pro"
                          : "Upgrade to Enterprise"
                      }
                    />
                    <button
                      onClick={() => setQuotaModal(null)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
                    >
                      Dismiss
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultSection({
  label,
  children,
  onCopy,
  copied,
}: {
  label: string;
  children: React.ReactNode;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </label>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <><Check className="size-3.5" />Copied</>
          ) : (
            <><Copy className="size-3.5" />Copy</>
          )}
        </button>
      </div>
      {children}
    </div>
  );
}
