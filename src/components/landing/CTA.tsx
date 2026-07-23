import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection({ hasActivePlan = false }: { hasActivePlan?: boolean }) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-2xl bg-primary/[0.04] px-8 py-16 sm:px-16 sm:py-20 text-center overflow-hidden">
          <div className="relative">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.015em] text-foreground [text-wrap:balance]">
              Ready to{" "}
              <span className="text-accent">speed up</span> your listings?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground [text-wrap:pretty] max-w-prose mx-auto">
              Join thousands of Amazon sellers who generate high-converting
              listings in seconds. Start free — no credit card required.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/listing"
                className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground text-base font-medium px-8 h-12 hover:opacity-90 transition-all duration-150"
              >
                Generate Your First Listing
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {!hasActivePlan && (
              <p className="mt-6 text-sm text-muted-foreground">
                Free plan includes 5 listings per month. No credit card required.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
