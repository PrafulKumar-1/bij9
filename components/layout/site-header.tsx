"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--gm-color-border)] bg-[var(--gm-color-bg)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-wide text-white">
          GlobalMerch
          <span className="ml-1 text-[var(--gm-color-gold)]">Export</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-[0.12em] text-[var(--gm-color-text-muted)] transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button asChild size="sm">
            <Link href="/request">Request Quote</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-md border border-[var(--gm-color-border)] p-2 text-white md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-[var(--gm-color-border)] transition-all duration-300 md:hidden",
          open ? "max-h-[400px]" : "max-h-0",
        )}
      >
        <div className="space-y-3 px-4 py-4 sm:px-6">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm uppercase tracking-[0.12em] text-[var(--gm-color-text-muted)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="w-full">
            <Link href="/request" onClick={() => setOpen(false)}>
              Request Quote
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
