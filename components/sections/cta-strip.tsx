import Link from "next/link";

import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";

export function CtaStrip() {
  return (
    <section className="rounded-2xl border border-[var(--gm-color-border)] bg-[radial-gradient(circle_at_top_left,_rgba(198,164,93,0.2),transparent_45%),var(--gm-color-surface)] p-8 md:p-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--gm-color-gold)]">Ready to source</p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl text-white md:text-4xl">
            Share your requirement and receive a commercial response within 24 hours.
          </h2>
          <p className="text-sm text-[var(--gm-color-text-muted)]">
            Flexible sourcing for standard products and buyer-specific custom lines.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/request">Send Requirement</Link>
          </Button>
          <Button asChild variant="secondary">
            <a href={`https://wa.me/${env.WHATSAPP_NUMBER}`} rel="noreferrer" target="_blank">
              WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
