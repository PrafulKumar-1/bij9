import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustBadges } from "@/components/sections/trust-badges";

export function StickyEnquiry({ productId }: { productId: string }) {
  return (
    <div className="top-24 space-y-4 lg:sticky">
      <Card>
        <CardHeader>
          <CardTitle>Request Quote</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <EnquiryForm compact productId={productId} type="product" />
          <TrustBadges />
        </CardContent>
      </Card>
    </div>
  );
}
