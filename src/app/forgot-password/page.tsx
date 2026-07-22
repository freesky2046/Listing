"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    // TODO: send reset link
  };

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

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="h-10 bg-card"
            />
            {error && (
              <p className="mt-1.5 text-xs text-destructive">{error}</p>
            )}
          </div>
          <Button type="submit" variant="default" className="h-11 w-full">
            Send reset link
          </Button>
        </form>

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
