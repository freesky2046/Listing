import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.015em] text-foreground [text-wrap:balance]">
            About ListGen
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            ListGen is an AI-powered Amazon listing generator built for sellers
            who value their time. We combine advanced language models with Amazon
            A9 algorithm expertise to produce listings that rank higher and
            convert better.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our mission is to make professional-grade listing optimization
            accessible to every Amazon seller — from solo entrepreneurs to
            established brands.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
