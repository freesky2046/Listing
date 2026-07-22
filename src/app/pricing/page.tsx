import { Pricing } from "@/components/landing/Pricing";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="pt-24 pb-8 text-center">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.015em] text-foreground [text-wrap:balance]">
            Pricing Plans
          </h1>
          <p className="mt-3 text-muted-foreground">
            Choose the plan that fits your needs.
          </p>
        </div>
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
