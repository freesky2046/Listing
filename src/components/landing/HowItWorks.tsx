import { ClipboardList, Sparkles, Rocket } from "lucide-react";

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
    <section id="how-it-works" className="py-24 sm:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6">
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

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line (hidden on mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-border">
                  <div className="absolute right-0 -top-[3px] size-2 rotate-45 border-r border-t border-border" />
                </div>
              )}

              <div className="inline-flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <step.icon className="size-8" />
              </div>

              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 mb-3">
                {step.number}
              </div>

              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
