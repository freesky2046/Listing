"use client";

import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      }}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-background text-destructive text-sm font-medium px-4 h-9 hover:bg-destructive/5 transition-colors w-full"
    >
      <LogOut className="size-4" />
      Sign Out
    </button>
  );
}
