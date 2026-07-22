import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold text-foreground">Account Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Settings page — coming soon.
        </p>
        <div className="mt-8">
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            &larr; Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
