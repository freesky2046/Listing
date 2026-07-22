import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your dashboard — coming soon.
        </p>
        <div className="mt-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
