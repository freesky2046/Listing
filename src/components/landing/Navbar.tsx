"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

const isHome = (pathname: string | null) => pathname === "/";

const resolveHref = (pathname: string | null, hash: string) =>
  isHome(pathname) ? hash : `/${hash}`;

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-primary"
        >
          <Logo className="size-7" />
          ListGen
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(pathname, link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <Link
              href="/settings"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Settings
            </Link>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium px-4 h-9 hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-foreground rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 pb-6 pt-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(pathname, link.href)}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            {isLoggedIn ? (
              <Link
                href="/settings"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium px-4 h-9 hover:opacity-90 transition-opacity"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
