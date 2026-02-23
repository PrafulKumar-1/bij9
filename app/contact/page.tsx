import Link from "next/link";

import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { TrustBadges } from "@/components/sections/trust-badges";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { env } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact GlobalMerch Export",
  description: "Contact our export desk for product quotes, sourcing support, and buyer onboarding.",
  path: "/contact",
});

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${env.WHATSAPP_NUMBER}`;

  return (
    <div className="space-y-10 pb-20 pt-10">
      <SectionHeading
        description="Connect with our export team for quotations, sampling, and sourcing discussions."
        eyebrow="Contact"
        title="Talk to our global export desk"
      />

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="space-y-5 p-6">
            <TrustBadges />
            <ContactForm />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-5 p-6">
            <h2 className="text-2xl text-white">Direct Channels</h2>
            <div className="space-y-3 text-sm text-[var(--gm-color-text-muted)]">
              <p>Email: {env.ADMIN_EMAIL}</p>
              <p>WhatsApp: +{env.WHATSAPP_NUMBER}</p>
              <p>Coverage: India to Worldwide</p>
            </div>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <a href={whatsappUrl} rel="noreferrer" target="_blank">
                  WhatsApp Us
                </a>
              </Button>
              <Button asChild className="w-full" variant="secondary">
                <Link href="/request">Send Requirement</Link>
              </Button>
            </div>
            <div className="rounded-md border border-[var(--gm-color-border)] bg-white/5 p-3 text-xs uppercase tracking-[0.12em] text-[var(--gm-color-text-muted)]">
              Response target: within 24 business hours
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
