import Link from "next/link";

import { SectionHeading } from "@/components/sections/section-heading";
import { TrustBadges } from "@/components/sections/trust-badges";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Compliance & Quality",
  description: "Export compliance framework: certifications, quality checks, documentation and inspection workflow.",
  path: "/compliance",
});

const certifications = ["ISO 22000", "HACCP", "FSSAI", "APEDA", "Phytosanitary", "SGS/BV Inspection"];
const workflow = [
  "Supplier pre-qualification",
  "Batch-level quality assessment",
  "Sampling and approval gate",
  "Pre-shipment inspection",
  "Document pack creation",
  "Dispatch compliance verification",
];

export default function CompliancePage() {
  return (
    <div className="space-y-10 pb-20 pt-10">
      <SectionHeading
        description="Control-driven quality and documentation standards designed for cross-border trade confidence."
        eyebrow="Compliance"
        title="Certification-backed quality management"
      />

      <TrustBadges />

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl text-white">Certifications & Standards</h2>
            <ul className="space-y-2">
              {certifications.map((item) => (
                <li className="rounded-md border border-[var(--gm-color-border)] bg-white/5 px-3 py-2 text-sm text-[var(--gm-color-text-muted)]" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-2xl text-white">Inspection Workflow</h2>
            <ol className="space-y-2">
              {workflow.map((step, idx) => (
                <li className="rounded-md border border-[var(--gm-color-border)] bg-white/5 px-3 py-2 text-sm text-[var(--gm-color-text-muted)]" key={step}>
                  {idx + 1}. {step}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-6 text-center">
        <h2 className="text-2xl text-white">Need compliance-ready sourcing for a specific market?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--gm-color-text-muted)]">
          Share destination country and standards. We align sourcing, documentation, and pre-shipment controls accordingly.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Button asChild>
            <Link href="/request">Send Requirement</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Request Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
