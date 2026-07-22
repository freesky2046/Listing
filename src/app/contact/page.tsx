import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-foreground">Contact Us</h1>
          <p className="mt-4 text-muted-foreground">Contact page — coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
