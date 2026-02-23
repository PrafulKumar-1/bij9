import { BarChart3, Boxes, ClipboardList, MessageSquare } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getAdminDashboardStats } from "@/lib/data";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-6">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl text-white">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Products", value: stats.products, icon: Boxes },
          { label: "Categories", value: stats.categories, icon: BarChart3 },
          { label: "Enquiries", value: stats.enquiries, icon: MessageSquare },
          { label: "Requirements", value: stats.requirements, icon: ClipboardList },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--gm-color-text-muted)]">{item.label}</p>
                  <p className="mt-2 text-3xl text-white">{item.value}</p>
                </div>
                <Icon className="h-8 w-8 text-[var(--gm-color-gold)]" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
