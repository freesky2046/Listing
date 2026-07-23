import Link from "next/link";
import { auth } from "@/lib/auth/server";
import { SignOutButton } from "@/components/SignOutButton";
import { getOrCreateSubscription, getPlanName, isActive } from "@/lib/subscription";
import { ArrowUpRight, ArrowRight, ArrowLeft, Check, Zap, Clock } from "lucide-react";
import { manageSubscriptionAction } from "./actions";
export default async function SettingsPage() {
  const result = await auth.getSession();
  const user = result?.data?.user ?? null;

  const sub = user
    ? await getOrCreateSubscription(user.id)
    : null;

  const active = isActive(sub);
  const planName = getPlanName(sub?.stripePriceId);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-foreground text-center">Account Settings</h1>

        {user ? (
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Profile</h2>
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</span>
              <p className="mt-1 text-sm font-medium text-foreground">{user.name ?? "—"}</p>
            </div>
            <div className="border-t border-border" />
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</span>
              <p className="mt-1 text-sm font-medium text-foreground">{user.email ?? "—"}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center">Not logged in.</p>
        )}

        {sub && (
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plan</h2>
              {active && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
                  <Check className="size-3" />
                  Active
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold ${
                active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {planName}
              </span>
              {sub.stripePriceId && (
                <span className="text-sm text-muted-foreground">
                  $29/month
                </span>
              )}
            </div>

            {active && sub.currentPeriodEnd && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="size-4 mt-0.5 shrink-0" />
                <span>
                  Current period ends on{" "}
                  <span className="font-medium text-foreground">
                    {sub.currentPeriodEnd.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </span>
              </div>
            )}

            {active && (
              <div className="border-t border-border pt-4">
                <form action={manageSubscriptionAction}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-colors"
                  >
                    Manage Subscription
                    <ArrowUpRight className="size-3" />
                  </button>
                </form>
              </div>
            )}

            {!active && sub.status === "free" && (
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-colors"
              >
                View Plans
                <ArrowUpRight className="size-3" />
              </Link>
            )}
          </div>
        )}

        {user && (
          <>
            <Link
              href="/listing"
              className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/[0.04] p-5 hover:bg-primary/[0.08] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Generate Listings</p>
                  <p className="text-xs text-muted-foreground">Create AI-powered Amazon listings</p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
            </Link>

            <SignOutButton />
          </>
        )}

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
