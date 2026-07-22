import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/[0.03] via-primary/[0.01] to-transparent">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-8">
              <Sparkles className="size-3.5 text-accent" />
              AI-Powered Listing Generator
            </div>

            <h1 className="text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] text-foreground [text-wrap:balance]">
              Generate Amazon listings
              <br />
              <span className="text-primary">in seconds, not hours</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-lg [text-wrap:pretty]">
              Turn a few product details into a complete, high-converting Amazon
              listing — title, bullet points, description, and backend search
              terms. Optimized for the A9 algorithm.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground text-base font-medium px-8 h-12 hover:opacity-90 transition-all duration-150"
              >
                Generate Your First Listing
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background text-foreground text-base font-medium px-8 h-12 hover:bg-card transition-all duration-150"
              >
                See How It Works
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-accent" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex size-1.5 rounded-full bg-success" />
                Free plan available
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:flex lg:justify-end">
            <div className="relative rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-secondary/50">
                <div className="size-2.5 rounded-full bg-destructive/30" />
                <div className="size-2.5 rounded-full bg-warning/30" />
                <div className="size-2.5 rounded-full bg-success/30" />
                <span className="ml-3 text-xs text-muted-foreground">
                  Listing Generator
                </span>
              </div>
              <div className="p-6 space-y-4">
                {/* Product input mock */}
                <div className="space-y-2">
                  <div className="h-3 w-20 rounded-sm bg-muted" />
                  <div className="h-10 rounded-lg border border-border bg-background px-3 flex items-center text-sm text-muted-foreground">
                    Stainless Steel Water Bottle 32oz
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 rounded-sm bg-muted" />
                  <div className="h-24 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                    BPA-free, double-wall insulated, keeps drinks cold 24h or
                    hot 12h...
                  </div>
                </div>
                {/* Generated output mock */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">
                      AI Generated
                    </span>
                  </div>
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
                    <div>
                      <div className="h-2.5 w-16 rounded-sm bg-primary/15 mb-1" />
                      <div className="h-4 w-full rounded-sm bg-primary/15" />
                      <div className="h-4 w-3/4 rounded-sm bg-primary/10 mt-1" />
                    </div>
                    <div className="space-y-1.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="h-2.5 rounded-sm bg-primary/10"
                          style={{ width: `${85 - i * 5}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 size-24 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 size-32 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
