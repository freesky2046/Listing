import Link from "next/link";
import { auth } from "@/lib/auth/server";
import { SignOutButton } from "@/components/SignOutButton";
import { getOrCreateSubscription } from "@/lib/subscription";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { upgradeAction } from "./actions";

const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  pro: "Pro",
  enterprise: "Enterprise",
};

const PLAN_PRICES: Record<string, string> = {
  free: "$0",
  pro: "$29",
  enterprise: "$99",
};

export default async function SettingsPage() {
  const result = await auth.getSession();
  const user = result?.data?.user ?? null;

  const sub = user
    ? await getOrCreateSubscription(user.id)
    : null;

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
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plan</h2>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {PLAN_LABELS[sub.plan] ?? sub.plan}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{PLAN_PRICES[sub.plan] ?? "—"}</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
              <span className="text-sm text-muted-foreground">Monthly</span>
            </div>
            {sub.plan === "free" && (
              <form action={upgradeAction.bind(null, user!.id, "pro")}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 text-xs font-medium text-destructive hover:underline transition-colors"
                >
                  Upgrade
                  <ArrowUpRight className="size-3" />
                </button>
              </form>
            )}
            {sub.plan === "pro" && (
              <form action={upgradeAction.bind(null, user!.id, "enterprise")}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 text-xs font-medium text-destructive hover:underline transition-colors"
                >
                  Upgrade to Enterprise
                  <ArrowUpRight className="size-3" />
                </button>
              </form>
            )}
          </div>
        )}

        {user && <SignOutButton />}

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
