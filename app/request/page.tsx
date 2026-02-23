import { RequirementForm } from "@/components/forms/requirement-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { TrustBadges } from "@/components/sections/trust-badges";
import { Card, CardContent } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Send Requirement",
  description: "Send detailed buyer requirements for any product. Our sourcing team responds with a commercial offer.",
  path: "/request",
});

export default function RequestPage() {
  return (
    <div className="space-y-10 pb-20 pt-10">
      <SectionHeading
        description="Share full technical, packaging, and commercial expectations. We source and quote accordingly."
        eyebrow="Buyer Brief"
        title="Send requirement for any product"
      />

      <Card>
        <CardContent className="space-y-8 p-6 md:p-8">
          <TrustBadges />
          <RequirementForm />
        </CardContent>
      </Card>
    </div>
  );
}
