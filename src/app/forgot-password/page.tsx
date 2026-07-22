import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Subtle ambient glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-primary/[0.03] blur-[160px] pointer-events-none" />
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-primary"
        >
          <Logo className="size-7" />
          ListGen
        </Link>
        <h1 className="mt-8 text-2xl font-semibold text-foreground">
          Reset your password
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email
            </label>
            <div className="h-10 w-full rounded-lg border border-border bg-card px-3 flex items-center">
              <span className="text-sm text-muted-foreground">
                you@example.com
              </span>
            </div>
          </div>
          <Button variant="default" className="h-11 w-full">Send reset link</Button>
        </div>

        <p className="mt-6 text-sm text-center text-muted-foreground">
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            &larr; Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
