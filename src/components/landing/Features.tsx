import {
  FileText,
  ListChecks,
  Search,
  Globe,
  BarChart3,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const features = [
  {
    icon: FileText,
    title: "AI Title Generator",
    description:
      "Craft attention-grabbing titles that include high-volume keywords and follow Amazon's best practices — automatically.",
  },
  {
    icon: ListChecks,
    title: "Bullet Point Optimization",
    description:
      "Five persuasive bullet points that highlight benefits over features, structured for scan-reading shoppers.",
  },
  {
    icon: Search,
    title: "Backend Search Terms",
    description:
      "Automatically extract and populate hidden search terms from your product data to maximize discoverability.",
  },
  {
    icon: Globe,
    title: "Multi-Marketplace Support",
    description:
      "Generate listings optimized for Amazon US, UK, DE, JP, and more — with locale-aware phrasing and keywords.",
  },
  {
    icon: BarChart3,
    title: "A9 Algorithm Optimized",
    description:
      "Every listing is built with Amazon's ranking algorithm in mind — keyword density, placement, and relevance.",
  },
  {
    icon: Zap,
    title: "Generate in Under 60 Seconds",
    description:
      "From product details to publish-ready listing — faster than you can brew a cup of coffee.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="reveal-item text-center max-w-2xl mx-auto">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.015em] text-foreground [text-wrap:balance]">
              Everything you need to{" "}
              <span className="text-primary">sell more</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground [text-wrap:pretty] max-w-prose mx-auto">
              From title to backend search terms — one tool generates every part
              of your Amazon listing, optimized for conversions.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="reveal-item mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-8 hover:border-primary/40 hover:bg-primary/[0.06] hover:shadow-md transition-all duration-200"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
