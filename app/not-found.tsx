import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--gm-color-gold)]">404</p>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl text-white">Page not found</h1>
      <p className="max-w-md text-sm text-[var(--gm-color-text-muted)]">
        The page you requested does not exist or may have been moved.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
