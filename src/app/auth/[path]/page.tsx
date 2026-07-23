import Link from "next/link";
import { AuthView } from "@neondatabase/auth/react/ui";
import { authViewPaths } from "@neondatabase/auth/react/ui/server";
import { Logo } from "@/components/Logo";
import { ArrowLeft } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-2.5">
        <Logo className="size-8" />
        <span className="text-xl font-semibold tracking-tight text-primary">
          ListGen
        </span>
      </div>
      <AuthView pathname={path} socialLayout="vertical" callbackURL="/" />
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>
    </div>
  );
}
