import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.015em] text-foreground [text-wrap:balance]">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: July 2026
          </p>

          <div className="mt-12 space-y-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:text-muted-foreground [&_ul]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p className="mt-3">
                By accessing or using ListGen, you agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do
                not use our service.
              </p>
            </section>

            <section>
              <h2>2. Description of Service</h2>
              <p className="mt-3">
                ListGen provides an AI-powered Amazon listing generation tool.
                Our service generates product titles, bullet points, descriptions,
                and search terms based on information you provide.
              </p>
            </section>

            <section>
              <h2>3. User Accounts</h2>
              <p className="mt-3">
                You are responsible for maintaining the confidentiality of your
                account credentials. You agree to provide accurate and complete
                information when creating your account. You must be at least 18
                years old to use our service.
              </p>
            </section>

            <section>
              <h2>4. Acceptable Use</h2>
              <p className="mt-3">You agree not to:</p>
              <ul className="mt-3">
                <li>
                  Use the service for any unlawful purpose or in violation of
                  Amazon&apos;s policies
                </li>
                <li>
                  Attempt to reverse engineer, decompile, or extract the
                  underlying AI models
                </li>
                <li>
                  Use automated means to access the service beyond normal usage
                </li>
                <li>
                  Submit content that infringes on intellectual property rights
                </li>
              </ul>
            </section>

            <section>
              <h2>5. Intellectual Property</h2>
              <p className="mt-3">
                The AI-generated content produced through our service belongs
                to you. ListGen retains ownership of the platform, its underlying
                technology, and all associated intellectual property. You grant
                us a limited license to use submitted content solely to provide
                and improve our service.
              </p>
            </section>

            <section>
              <h2>6. Limitation of Liability</h2>
              <p className="mt-3">
                ListGen is provided on an &quot;as is&quot; basis. We do not
                guarantee specific results, rankings, or sales outcomes from
                using our generated listings. We are not liable for any damages
                arising from your use of the service, to the maximum extent
                permitted by law.
              </p>
            </section>

            <section>
              <h2>7. Termination</h2>
              <p className="mt-3">
                We reserve the right to suspend or terminate accounts that
                violate these terms. You may terminate your account at any time
                by contacting us or through your account settings.
              </p>
            </section>

            <section>
              <h2>8. Changes to Terms</h2>
              <p className="mt-3">
                We may modify these terms at any time. Material changes will be
                communicated via email or platform notification. Continued use
                after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2>9. Contact</h2>
              <p className="mt-3">
                For questions about these Terms, contact us at{" "}
                <a
                  href="mailto:legal@listgen.com"
                  className="text-primary font-medium hover:underline"
                >
                  legal@listgen.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
