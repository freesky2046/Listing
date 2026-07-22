"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // TODO: auth logic
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
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back. Enter your credentials to continue.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
          {/* Google Sign-In */}
          <button
            type="button"
            className="h-11 w-full rounded-lg border border-border bg-background flex items-center justify-center gap-3 hover:bg-card transition-colors"
          >
            <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium text-foreground">
              Continue with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              or continue with email
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
              className="h-10 bg-card"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined })); }}
              className="h-10 bg-card"
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked === true)}
              />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-primary font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="default" className="h-11 w-full">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
