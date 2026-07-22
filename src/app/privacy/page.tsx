import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.015em] text-foreground [text-wrap:balance]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: July 2026
          </p>

          <div className="mt-12 space-y-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:text-muted-foreground [&_ul]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
            <section>
              <h2>1. Information We Collect</h2>
              <p className="mt-3">
                When you use ListGen, we collect information you provide directly,
                including your name, email address, and product data you submit
                for listing generation. We also collect usage data such as pages
                visited, features used, and generation history to improve our
                service.
              </p>
            </section>

            <section>
              <h2>2. How We Use Your Information</h2>
              <p className="mt-3">
                We use your information to provide and improve the ListGen service:
              </p>
              <ul className="mt-3">
                <li>Generate and optimize your Amazon listings</li>
                <li>Send account-related communications and support responses</li>
                <li>Analyze usage patterns to improve our AI models</li>
                <li>Ensure security and prevent fraudulent activity</li>
              </ul>
            </section>

            <section>
              <h2>3. Data Storage and Security</h2>
              <p className="mt-3">
                Your data is stored on secure servers with encryption at rest and
                in transit. We implement industry-standard security measures
                including regular security audits, access controls, and
                monitoring. Product data submitted for listing generation is
                processed but never shared with third parties.
              </p>
            </section>

            <section>
              <h2>4. Data Sharing</h2>
              <p className="mt-3">
                We do not sell your personal information. We may share data with
                service providers who assist in operating our platform (cloud
                hosting, AI model providers) under strict data processing
                agreements. We may disclose information if required by law or to
                protect our rights.
              </p>
            </section>

            <section>
              <h2>5. Cookies</h2>
              <p className="mt-3">
                We use essential cookies for authentication and session
                management. We may use analytics cookies to understand how our
                service is used. You can control cookie preferences through your
                browser settings.
              </p>
            </section>

            <section>
              <h2>6. Your Rights</h2>
              <p className="mt-3">
                You have the right to access, correct, or delete your personal
                data. You may export your data or request account deletion at any
                time. To exercise these rights, contact us at
                privacy@listgen.com.
              </p>
            </section>

            <section>
              <h2>7. Changes to This Policy</h2>
              <p className="mt-3">
                We may update this Privacy Policy from time to time. We will
                notify you of material changes via email or through the
                platform. Continued use of ListGen after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2>8. Contact Us</h2>
              <p className="mt-3">
                If you have questions about this Privacy Policy or our data
                practices, please contact us at{" "}
                <a
                  href="mailto:privacy@listgen.com"
                  className="text-primary font-medium hover:underline"
                >
                  privacy@listgen.com
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
