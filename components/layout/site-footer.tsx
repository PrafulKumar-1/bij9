import Link from "next/link";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";

export function SiteFooter({ contactEmail, whatsappNumber }: { contactEmail: string; whatsappNumber: string }) {
  const whatsappHref = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="mt-24 border-t border-[var(--gm-color-border)] bg-[var(--gm-color-surface)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4 lg:col-span-2">
          <h3 className="font-[family-name:var(--font-heading)] text-3xl text-white">GlobalMerch Export</h3>
          <p className="max-w-xl text-sm leading-7 text-[var(--gm-color-text-muted)]">
            Premium merchant exporter from India sourcing and shipping buyer-specific products worldwide with robust
            compliance, documentation, and logistics execution.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/request">Send Requirement</Link>
            </Button>
            <Button asChild variant="secondary">
              <a href={whatsappHref} rel="noreferrer" target="_blank">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm uppercase tracking-[0.18em] text-[var(--gm-color-gold)]">Quick Links</h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link className="text-sm text-[var(--gm-color-text-muted)] hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm uppercase tracking-[0.18em] text-[var(--gm-color-gold)]">Contact</h4>
          <div className="space-y-2 text-sm text-[var(--gm-color-text-muted)]">
            <p>Email: {contactEmail}</p>
            <p>WhatsApp: +{whatsappNumber}</p>
            <p>Base: India | Operations: Worldwide</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--gm-color-border)] px-4 py-6 text-center text-xs uppercase tracking-[0.2em] text-[var(--gm-color-text-muted)]">
        © {new Date().getFullYear()} GlobalMerch Export. Built for global B2B trade.
      </div>
    </footer>
  );
}
