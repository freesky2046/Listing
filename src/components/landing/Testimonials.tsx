import { ScrollReveal } from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "ListGen cut my listing creation time from 2 hours to 2 minutes. The A9 optimization is spot-on — my products started ranking on page 1 within a week.",
    author: "Sarah Chen",
    role: "Amazon FBA Seller, $50k/mo",
    color: "from-primary/8 to-primary/2",
  },
  {
    quote:
      "I manage 200+ SKUs across 5 marketplaces. This tool saves me 20 hours a week. The multi-marketplace keyword localization is a game-changer.",
    author: "Marcus Johnson",
    role: "E-commerce Agency Owner",
    color: "from-accent/8 to-accent/2",
  },
  {
    quote:
      "Was skeptical at first — but the AI-generated bullets converted 40% better than my manually written ones. The free tier is genuinely useful.",
    author: "Priya Patel",
    role: "New Amazon Seller",
    color: "from-primary/8 to-accent/2",
  },
];

export function Testimonials() {
  return (
    <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-card">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="reveal-item text-center">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.015em] text-foreground [text-wrap:balance]">
              Trusted by{" "}
              <span className="text-primary">thousands</span> of sellers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground [text-wrap:pretty]">
              Don&apos;t take our word for it — hear from sellers who use
              ListGen every day.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="relative rounded-2xl border border-border/60 bg-gradient-to-br p-8 flex flex-col"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${t.color.split(" ")[0].replace("from-", "var(--")}, ${t.color.split(" ")[1].replace("to-", "var(--")})`,
                }}
              >
                {/* Quote mark */}
                <div className="text-5xl font-serif text-primary/20 leading-none mb-4 select-none">
                  &ldquo;
                </div>

                <blockquote className="text-sm text-foreground/85 leading-relaxed flex-1">
                  {t.quote}
                </blockquote>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="text-sm font-semibold text-foreground">
                    {t.author}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
