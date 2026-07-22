"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Sparkles,
  FileText,
  Image,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

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

const mockListing = {
  title: "Stainless Steel Insulated Water Bottle 32oz — BPA-Free, Double-Wall Vacuum, Keeps Drinks Cold 24h Hot 12h — Leak-Proof Lid, Wide Mouth, Sports & Travel — Midnight Navy",
  bullets: [
    "ALL-DAY TEMPERATURE CONTROL — Double-wall vacuum insulation keeps beverages ice-cold for up to 24 hours or piping hot for 12 hours. No condensation, no sweating — your bag stays dry and your drink stays perfect.",
    "PREMIUM 18/8 STAINLESS STEEL — Crafted from food-grade, BPA-free stainless steel that won't rust, retain odors, or leave a metallic aftertaste. Built to survive drops, dings, and daily use.",
    "LEAK-PROOF, ONE-HAND LID — Patented FlexSip lid seals completely when closed and opens with a single thumb press. Drink while driving, hiking, or working without worrying about spills.",
    "WIDE MOUTH FOR EASY CLEANING — Fits ice cubes, fruit infusions, and most bottle brushes. Dishwasher safe (top rack) for no-hassle cleanup.",
    "LIFETIME SATISFACTION GUARANTEE — Love it or we'll replace it. Every bottle includes a 100% lifetime warranty. Join 50,000+ happy customers.",
  ],
  description:
    "Stay hydrated in style with the AQUAFORGE 32oz Insulated Water Bottle. Engineered for athletes, commuters, and outdoor enthusiasts, this premium stainless steel bottle combines cutting-edge temperature retention with a sleek, ergonomic design. Whether you're crushing a workout, conquering a trail, or powering through a workday, your water stays ice-cold from sunrise to sunset.\n\nThe wide-mouth opening lets you add ice cubes, lemon slices, or your favorite fruit infusions effortlessly. The leak-proof FlexSip lid delivers a smooth flow without splashing, and the powder-coated exterior provides a non-slip grip even with sweaty hands. Powder coating is chip-resistant and available in 12 vibrant colors.\n\nEvery AQUAFORGE bottle comes with a bonus cleaning brush, a spare silicone lid seal, and our famous lifetime warranty. Click 'Add to Cart' and taste the difference premium hydration makes.",
  searchTerms:
    "water bottle stainless steel insulated 32oz BPA free reusable sports bottle travel mug leak proof vacuum sealed gym camping hiking gift for men women",
};

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

export default function ListingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("listing");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

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
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
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
              Enter your product details and generate a complete Amazon listing
              in seconds.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back
          </Link>
        </div>

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
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Title
                </label>
                <div className="relative rounded-lg border border-border bg-background px-3.5 py-2.5 flex items-center min-h-[42px]">
                  <span className="text-sm text-muted-foreground">
                    Stainless Steel Insulated Water Bottle 32oz
                  </span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <div className="relative rounded-lg border border-border bg-background px-3.5 py-2.5 flex items-center justify-between min-h-[42px] cursor-pointer">
                  <span className="text-sm text-foreground">
                    Home & Kitchen
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Description
                </label>
                <div className="rounded-lg border border-border bg-background px-3.5 py-2.5 min-h-[120px]">
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    BPA-free, double-wall vacuum insulated water bottle. Keeps
                    drinks cold for 24 hours or hot for 12 hours. Leak-proof lid
                    with one-hand operation. Wide mouth for easy cleaning and ice
                    cubes. Powder-coated exterior in multiple colors. 18/8
                    stainless steel, dishwasher safe.
                  </span>
                </div>
              </div>

              {/* Generate Button */}
              <Button variant="default" className="h-11 w-full gap-2">
                <Sparkles className="size-4" />
                Generate Listing
              </Button>
            </div>
          </div>

          {/* Right: Results Card */}
          <div className="rounded-xl border border-border bg-card flex flex-col">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Generated Content
              </h2>
              <span className="inline-flex items-center gap-1.5 text-xs text-success font-medium">
                <Sparkles className="size-3" />
                AI Generated
              </span>
            </div>

            {/* Tabs */}
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

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-auto">
              {activeTab === "listing" ? (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Product Title
                      </label>
                      <button
                        onClick={() =>
                          handleCopy(mockListing.title, "title")
                        }
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copied === "title" ? (
                          <>
                            <Check className="size-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {mockListing.title}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Bullet Points
                      </label>
                      <button
                        onClick={() =>
                          handleCopy(
                            mockListing.bullets.join("\n"),
                            "bullets"
                          )
                        }
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copied === "bullets" ? (
                          <>
                            <Check className="size-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <ul className="space-y-2.5">
                      {mockListing.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground leading-relaxed"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Product Description
                      </label>
                      <button
                        onClick={() =>
                          handleCopy(mockListing.description, "description")
                        }
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copied === "description" ? (
                          <>
                            <Check className="size-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                      {mockListing.description}
                    </p>
                  </div>

                  {/* Search Terms */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Backend Search Terms
                      </label>
                      <button
                        onClick={() =>
                          handleCopy(mockListing.searchTerms, "searchTerms")
                        }
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copied === "searchTerms" ? (
                          <>
                            <Check className="size-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed break-all">
                      {mockListing.searchTerms}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* A+ Headline */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {mockAPlus.headline}
                    </h3>
                  </div>

                  {/* A+ Modules */}
                  {mockAPlus.modules.map((mod, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-background p-5"
                    >
                      {/* Image placeholder */}
                      <div className="aspect-[3/2] rounded-lg bg-muted flex items-center justify-center mb-4">
                        <div className="text-center">
                          <Image className="size-8 text-muted-foreground mx-auto mb-2" />
                          <span className="text-xs text-muted-foreground">
                            Product Image {i + 1}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-base font-semibold text-foreground">
                        {mod.title}
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {mod.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
