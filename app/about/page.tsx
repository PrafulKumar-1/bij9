import Link from "next/link";

import { CtaStrip } from "@/components/sections/cta-strip";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About GlobalMerch Export",
  description: "Learn our sourcing network, mission, and trust-first export process for international buyers.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-20 pt-10">
      <SectionHeading
        description="A high-trust merchant exporter combining sourcing agility with disciplined export execution."
        eyebrow="About"
        title="Built for long-term global buying relationships"
      />

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Our Story",
            body: "GlobalMerch Export was built to bridge buyer-specific requirements with quality-focused supplier networks in India.",
          },
          {
            title: "Mission",
            body: "Deliver reliable product quality, transparent documentation, and predictable logistics for every shipment cycle.",
          },
          {
            title: "Sourcing Network",
            body: "Our sourcing network spans agro, spices, dehydrated and industrial categories with qualification and inspection controls.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="space-y-3 p-6">
              <h2 className="text-2xl text-white">{item.title}</h2>
              <p className="text-sm leading-7 text-[var(--gm-color-text-muted)]">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-6 md:p-8">
        <h2 className="mb-4 text-3xl text-white">Why buyers trust us</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {[
            "Specification-driven sourcing",
            "Pre-shipment quality checks",
            "Documentation expertise for customs",
            "Flexible mixed-product consignments",
            "Commercial clarity with responsive communication",
            "Sustainable and compliant supplier alignment",
          ].map((point) => (
            <li className="rounded-md border border-[var(--gm-color-border)] bg-white/5 p-3 text-sm text-[var(--gm-color-text-muted)]" key={point}>
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/request">Send Requirement</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Become a Buyer</Link>
          </Button>
        </div>
      </section>

      <CtaStrip />
    </div>
  );
}
