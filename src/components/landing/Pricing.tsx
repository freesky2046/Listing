import Link from "next/link";
import { Check } from "lucide-react";
import { CheckoutButton } from "@/components/CheckoutButton";
import { ScrollReveal } from "./ScrollReveal";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic listing generation.",
    features: [
      "5 listings per month",
      "AI title generation",
      "Basic bullet points",
      "Standard search terms",
    ],
    cta: "Get Started Free",
    href: "/auth/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month",
    description: "For serious sellers who need volume and quality.",
    features: [
      "200 listings per month",
      "Advanced AI optimization",
      "A9 keyword analysis",
      "Multi-marketplace support",
      "Priority generation speed",
      "Bulk listing generation",
    ],
    cta: "Start Pro Trial",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For agencies and power sellers managing many products.",
    features: [
      "1,000 listings per month",
      "Custom AI training",
      "API access",
      "Team collaboration",
      "Dedicated support",
      "Advanced analytics",
      "Custom integrations",
    ],
    cta: "Get Started Enterprise",
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID!,
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="reveal-item text-center max-w-2xl mx-auto">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.015em] text-foreground [text-wrap:balance]">
              Simple,{" "}
              <span className="text-primary">transparent</span> pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground [text-wrap:pretty]">
              Start free, upgrade when you need more. No hidden fees, cancel
              anytime.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal staggerDelay={150}>
          <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`reveal-item relative flex flex-col rounded-xl border p-8 transition-all duration-150 ${
                  plan.highlighted
                    ? "border-primary bg-card shadow-sm lg:scale-105"
                    : "border-border bg-card hover:border-primary/30 hover:bg-primary/[0.02]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold px-3 py-1">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-foreground"
                    >
                      <Check className="size-4 mt-0.5 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {"priceId" in plan ? (
                  <CheckoutButton
                    priceId={plan.priceId}
                    label={plan.cta}
                    highlighted={plan.highlighted}
                  />
                ) : (
                  <Link
                    href={plan.href}
                    className={`mt-8 inline-flex items-center justify-center rounded-lg text-sm font-medium px-6 h-11 w-full transition-all duration-150 ${
                      plan.highlighted
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "border border-border bg-background text-foreground hover:bg-card"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
