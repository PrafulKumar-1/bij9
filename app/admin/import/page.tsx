import { CsvImportForm } from "@/components/admin/csv-import-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminImportPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Import Products (CSV)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-[var(--gm-color-text-muted)]">
          CSV columns: title, slug, categorySlug, shortDescription, description, originCountry, moqValue, moqUnit,
          packagingOptions, leadTimeDays, certifications, hsCode, featured, status, images, brochureUrl.
        </p>
        <CsvImportForm />
      </CardContent>
    </Card>
  );
}
