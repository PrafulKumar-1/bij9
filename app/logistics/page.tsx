import Link from "next/link";

import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Logistics Process",
  description: "Structured export logistics workflow from enquiry to shipping and documentation.",
  path: "/logistics",
});

const steps = [
  "Inquiry",
  "Sourcing",
  "Sampling",
  "Quality Control",
  "Packing",
  "Shipping",
  "Documentation",
];

export default function LogisticsPage() {
  return (
    <div className="space-y-10 pb-20 pt-10">
      <SectionHeading
        description="A transparent process timeline ensuring commercial clarity and shipment confidence."
        eyebrow="Logistics"
        title="Inquiry to dispatch in seven controlled steps"
      />

      <section className="rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-6 md:p-8">
        <div className="relative">
          <div className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-[var(--gm-color-border)] md:block" />
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <Card className="bg-[var(--gm-color-bg)]" key={step}>
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gm-color-gold)] text-xs text-[var(--gm-color-gold)]">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl text-white">{step}</h3>
                    <p className="mt-1 text-sm text-[var(--gm-color-text-muted)]">
                      {step === "Inquiry"
                        ? "Capture buyer specs, target market, and commercial scope."
                        : step === "Sourcing"
                          ? "Identify and validate matching supply options from qualified partners."
                          : step === "Sampling"
                            ? "Submit samples for quality approval and benchmark matching."
                            : step === "Quality Control"
                              ? "Perform inspections and lot-level checks before shipment."
                              : step === "Packing"
                                ? "Apply buyer-approved packaging and labeling standards."
                                : step === "Shipping"
                                  ? "Coordinate freight, route, and dispatch milestones."
                                  : "Issue full export documentation set for smooth clearance."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-6 text-center">
        <h2 className="text-2xl text-white">Plan your shipment with us</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-[var(--gm-color-text-muted)]">
          Send your quantity, destination, and delivery terms for a tailored sourcing and logistics plan.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Button asChild>
            <Link href="/request">Send Requirement</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">WhatsApp / Contact</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
