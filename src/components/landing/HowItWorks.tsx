import { ClipboardList, Sparkles, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Enter Product Details",
    description:
      "Tell us what you're selling — product name, key features, category. The more detail, the better the output.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Generates Your Listing",
    description:
      "Our AI creates a complete listing optimized for Amazon's A9 algorithm — title, bullets, description, and search terms.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Publish & Start Selling",
    description:
      "Review, tweak if needed, and copy straight to Amazon Seller Central. Your listing is live in minutes.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-card to-primary/[0.02] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.015em] text-foreground [text-wrap:balance]">
            Three steps to a{" "}
            <span className="text-primary">publish-ready listing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground [text-wrap:pretty]">
            No complicated dashboards. No manual keyword research. Just input,
            generate, publish.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-border/60 bg-card p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04] transition-all duration-200"
            >
              {/* Step number — top-right watermark */}
              <div className="absolute top-4 right-5 text-6xl font-bold text-muted/20 select-none pointer-events-none tabular-nums">
                {step.number}
              </div>

              {/* Icon with glow */}
              <div className="relative inline-flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <div className="absolute inset-0 rounded-xl bg-primary/15 blur-md scale-75" />
                <step.icon className="relative size-6" />
              </div>

              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector arrow (not last) */}
              {i < steps.length - 1 && (
                <ArrowRight className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 size-5 text-border group-hover:text-primary/40 transition-colors duration-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
