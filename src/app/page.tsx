import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { auth } from "@/lib/auth/server";
import { getOrCreateSubscription, isActive } from "@/lib/subscription";

export default async function Home() {
  const result = await auth.getSession();
  const user = result?.data?.user ?? null;
  const isLoggedIn = !!user;

  const sub = user ? await getOrCreateSubscription(user.id) : null;
  const hasActivePlan = isActive(sub);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="flex-1">
        <Hero isLoggedIn={isLoggedIn} />
        <Features />
        <HowItWorks />
        {!hasActivePlan && <Pricing />}
        <FAQ />
        <CTASection hasActivePlan={hasActivePlan} />
      </main>
      <Footer />
    </>
  );
}
